import { faArrowLeft, faCalendarAlt, faDownload, faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Figure, Form, FormControl, Image, InputGroup, Spinner } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import { saveAs } from 'file-saver'
import md5 from 'md5';
import { ASSETS_URL, REACT_APP_API_BASE_URL, SOCKET_URL } from "../config/server.config";
import { getSingle } from "../services/Auth";
import { dateTimeFormat } from "../services/Helper";
import Rest from "../config/rest.config";
import API from "../config/endpoints.config";
import Notifier from "./Notifier";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
const socket = io(SOCKET_URL);

export default function ChatSection(props) {
    const [selectedUser, setSelectedUser] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [updateScroll, setUpdateScroll] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMoreMsgs, setHasMoreMsgs] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const noti = new Notifier();
    const msgInputRef = useRef(null);
    const router = useRouter();
    const downloadFile = (filePath) => {
        saveAs(REACT_APP_API_BASE_URL + '/get/file' + filePath)
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        const { files } = e.target;
        let messageData;
        let isMultipart = false
        if (files) {
            messageData = new FormData();
            messageData.append("slug", selectedUser.slug);
            messageData.append("file", files[0]);
            isMultipart = true
            e.target.value = null;
        } else {
            messageData = {
                slug: selectedUser.slug,
                message: message
            }
            isMultipart = false
        }
        if (files || (!files && message)) {
            setIsDisabled(true)
            const response = await Rest.axiosRequest(API.messages, messageData, 'POST', isMultipart);
            if (response.data.status) {
                setIsDisabled(false)
                setMessage('');
                setUpdateScroll(!updateScroll);
                socket.emit('new_message', {
                    sender: md5(response.data.data.fromId),
                    receiver: md5(response.data.data.toId),
                    msgData: response.data.data
                });
                setMessages([...messages, response.data.data])
                setScrollToBottom();
                setInputFocus();
            } else {
                noti.notify(response.data.message, "danger");
                router.push(`/brand/${selectedUser.slug}`);
            }
        }
    }

    const getMessages = async (anotherUserSlug) => {
        const response = await Rest.axiosRequest(API.getMessages, { anotherUserSlug: anotherUserSlug, offset: 0 });
        if (response.data.status) {
            setMessages(response.data.data.messages);
            setSelectedUser(response.data.data.user);
            setScrollToBottom();
            setInputFocus();
        } else {
            noti.notify(response.data.message, "danger");
            router.push(`/messages`);
        }
    }

    const getPreviousMessages = async (anotherUserSlug) => {
        if (hasMoreMsgs) {
            const response = await Rest.axiosRequest(API.getMessages, { anotherUserSlug: anotherUserSlug, offset: offset });
            if (response.data.status) {
                if (response.data.data.messages.length > 0) {
                    setMessages([...response.data.data.messages, ...messages]);
                    // if (props.scrollbarRefrence.current) {
                    //     props.scrollbarRefrence.current.scrollTop(50)
                    // }
                } else {
                    setHasMoreMsgs(false);
                }
            } else {
                noti.notify(response.data.message, "danger");
            }
        }
    }

    useEffect(() => {
        socket.emit('joinRoom', {
            username: md5(parseInt(getSingle("userId")))
        });
        return () => {
            setMessages([]);
            setSelectedUser([]);
            setMessage('');
        }
    }, []);

    useEffect(() => {
        socket.on('new_message', function (data) {
            if (selectedUser) {
                if (md5(parseInt(selectedUser.id)) === data.sender) {
                    setMessages((messages) => [...messages, data.msgData])
                    if (props.scrollbarRefrence.current) {
                        props.scrollbarRefrence.current.scrollToBottom()
                    }
                }
            }
        });
        return () => {
            socket.off('new_message');
        };
    }, [socket, selectedUser]);

    useEffect(() => {
        if (props.activeChat !== '') {
            getMessages(props.activeChat);
            setHasMoreMsgs(true);
            setOffset(0);
        }
        return () => {
            setMessages([]);
            setSelectedUser([]);
            setMessage('');
        }
    }, [props.activeChat])

    // useEffect(() => {
    //     // setMessages([...messages, ...props.messages])
    //     // setMessages([...messages, props.messages])
    //     // console.log("[...props.messages]", [...props.messages]);
    //     setMessages([...props.messages]);
    //     setHasMoreMsgs(true);
    //     setOffset(0);
    //     // }, [messages])
    // }, [props.messages])

    useEffect(() => {
        if (selectedUser !== undefined && offset !== 0) {
            getPreviousMessages(selectedUser.slug)
        }
    }, [offset])

    const setScrollToBottom = () => {
        if (props.scrollbarRefrence.current) {
            props.scrollbarRefrence.current.scrollToBottom()
        }
    }

    const setInputFocus = () => {
        if (msgInputRef.current) {
            msgInputRef.current.focus();
        }
    }

    const handleOffset = async (scrollValue) => {
        if (scrollValue.top === 0) {
            setOffset((offset) => offset + 1)
        }
    }

    return (
        <Col lg={8} className={props.isOpen ? 'card_chat_box mob_view' : 'card_chat_box close'}>
            <Card className='br-0 bg-color-282828 bs-none border-0'>
                {Object.keys(selectedUser).length ?
                    <>
                        <Card.Header className='px-3'>
                            <div className='d-flex align-items-center'>
                                <Link href="">
                                    <a className='d-lg-none d-block fs-20 color-white me-3' onClick={props.toggleChat}>
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </a>
                                </Link>
                                <Figure className='user_profile me-3 mb-0'>
                                    <Image src={ASSETS_URL + selectedUser.profilePath} className="cover" />
                                </Figure>
                                <div>
                                    {
                                        getSingle('role') === '2' ?
                                            <Link href={`/customer/${selectedUser.slug}`}>
                                                <a>
                                                    <h3 className='fs-16 my-2 color-f3772c'>{selectedUser.fullName}</h3>
                                                </a>
                                            </Link>
                                            :
                                            <Link href={`/brand/${selectedUser.slug}`}>
                                                <a>
                                                    <h3 className='fs-16 my-2 color-f3772c'>{selectedUser.brandName}</h3>
                                                </a>
                                            </Link>
                                    }
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {messages.length > 0 && Object.keys(selectedUser).length > 0 ?
                                <Scrollbars style={{ height: 400 }} ref={props.scrollbarRefrence}
                                    onScrollFrame={(value) => handleOffset(value)}
                                    className="custom-scroll"
                                >
                                    <div className='pe-3'>
                                        {
                                            messages.map((message, index) => {
                                                return (
                                                    message.fromId === parseInt(getSingle('userId')) ?
                                                        <div className="send_msg mb-3" key={message.id}>
                                                            <div>
                                                                <div className='msgbox'>
                                                                    {message.attachment == 1 ?
                                                                        <a onClick={() => downloadFile(message.message)} className="d-flex align-items-center text-white text-start">
                                                                            <text className="fs-35 me-2 text-white"><i className="fas fa-file-download"></i></text>
                                                                            <div><p>{message.fileType.toUpperCase()}</p><span className="fs-16 text-white">{message.fileSize}</span></div></a>
                                                                        : <p>{message.message}</p>
                                                                    }
                                                                </div>
                                                                <span><FontAwesomeIcon icon={faCalendarAlt} /> {dateTimeFormat(message.createdAt, 'MMMM DD, YYYY')} &nbsp;&nbsp; <FontAwesomeIcon icon={faClock} /> {dateTimeFormat(message.createdAt, 'h:mm a')}</span>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="received_msg mb-3" key={message.id}>
                                                            <div className='d-flex'>
                                                                <Figure className='user_profile me-3 mb-0'>
                                                                    <Image src={ASSETS_URL + selectedUser.profilePath} className="cover" />
                                                                </Figure>
                                                                <div>
                                                                    <div className='msgbox'>
                                                                        {message.attachment == 1 ?
                                                                            <a onClick={() => downloadFile(message.message)} className="d-flex align-items-center text-white">
                                                                                <text className="fs-35 me-2 text-white"><i className="fas fa-file-download"></i></text>
                                                                                <div><p>{message.fileType.toUpperCase()}</p><span className="fs-16 text-white">{message.fileSize}</span></div>
                                                                            </a>
                                                                            : <p>{message.message}</p>
                                                                        }
                                                                    </div>
                                                                    <span><FontAwesomeIcon icon={faCalendarAlt} /> {dateTimeFormat(message.createdAt, 'MMMM DD, YYYY')} &nbsp;&nbsp; <FontAwesomeIcon icon={faClock} /> {dateTimeFormat(message.createdAt, 'hh:mm A')}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Scrollbars>
                                : null
                            }
                        </Card.Body>
                        <Card.Footer className='p-3'>
                            <Form className='message_sent_form d-flex' onSubmit={sendMessage}>
                                <InputGroup>
                                    <FormControl
                                        placeholder="Type here..."
                                        aria-label="Type here..."
                                        aria-describedby="basic-addon2"
                                        onChange={(e) => setMessage(e.target.value)}
                                        value={message}
                                        disabled={isDisabled}
                                        ref={msgInputRef}
                                    />
                                    <Button type="submit" variant="primary" id="button-addon2" className='br-6' disabled={isDisabled}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </Button>
                                </InputGroup>
                                <Button variant="outline-primary" id="file-attachment" className='br-10 btn-wh-40 ms-3 file-attachment' disabled={isDisabled}>
                                    <FormControl onChange={(e) => sendMessage(e)} type="file" placeholder="Select File" />
                                    <FontAwesomeIcon icon={faPaperclip} />
                                </Button>
                            </Form>
                        </Card.Footer>
                    </>
                    : null}
            </Card>
        </Col>
    )
}