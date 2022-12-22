import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import md5 from 'md5';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import Notifier from '../../components/Notifier';
import ChatSection from '../../components/ChatSection';
import UserList from '../../components/UsersList';
import Meta from "../../components/Meta";
import { SOCKET_URL } from '../../config/server.config';
import { contextCookie, getSingle } from '../../services/Auth';
import { useRouter } from 'next/router';
import { APP_NAME } from '../../config/server.config';
const socket = io(SOCKET_URL);

export default function Messages(props) {
    const [chatList, setChatList] = useState([])
    // const [messages, setMessages] = useState([])
    const [activeChat, setActiveChat] = useState('');
    // const [selectedUser, setSelectedUser] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSkeleton, setShowSkeleton] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const noti = new Notifier();
    const scrollbarRef = useRef(null);
    const router = useRouter();
    useEffect(() => {
        getUsersList()
        if (props.slug) {
            // getMessages(props.slug)
            // setActiveChat(props.slug);
            // setIsOpen(true);
            updateOpenChat(props.slug);
        }
        // socket.emit('joinRoom', {
        //     username: md5(parseInt(getSingle("userId")))
        // });

        // socket.on('new_message', function (data) {
        //     if (selectedUser) {
        //         if (md5(parseInt(selectedUser.id)) === data.sender) {
        //             setMessages([...messages, data.msgData])
        //             //setMessages(messages.concat(data.msgData))
        //             // setMessages(prevMessages => ([...prevMessages, data.msgData]));
        //         }
        //     }
        // });
    }, [])

    const updateOpenChat = (userSlug) => {
        setActiveChat(userSlug);
        setIsOpen(true);
    }

    // const getMessages = async (anotherUserSlug) => {
    //     setActiveChat(anotherUserSlug);
    //     setIsOpen(true);
    //     const response = await Rest.axiosRequest(API.getMessages, { anotherUserSlug: anotherUserSlug, offset: 0 });
    //     if (response.data.status) {
    //         setMessages(response.data.data.messages);
    //         setSelectedUser(response.data.data.user);
    //         if (scrollbarRef.current) {
    //             scrollbarRef.current.scrollToBottom()
    //         }
    //     } else {
    //         noti.notify(response.data.message, "danger");
    //         router.push(`/messages`);
    //     }
    // }

    const getUsersList = async (clearSearch = false) => {
        let response;
        if (clearSearch) {
            setSearchQuery('');
            response = await Rest.axiosRequest(API.messagesUsersList + '?searchQuery=', {}, 'GET');
        } else {
            response = await Rest.axiosRequest(API.messagesUsersList + '?searchQuery=' + searchQuery, {}, 'GET');
        }
        if (response.status === 200) {
            setChatList(response.data.data);
            setShowSkeleton(false);
        } else {
            noti.notify(response.data.message, "danger");
        }
    }

    const handleToggleChat = () => {
        setIsOpen(!isOpen)
        setActiveChat('');
    }

    return (
        <>
            <Meta title={`Messages | ${APP_NAME}`} keywords='Messages' description='Messages' />
            <section className="bg-black p-30-0-60">
                <Container>
                    <Row>
                        <Col lg={12} className="mx-auto">
                            <Row className="g-0">
                                <Col lg={4}>
                                    <Card className='br-0 bg-color-191919 bs-none'>
                                        <Card.Header className='p-3'>
                                            <Form className='search_form'>
                                                <div className='d-flex'>
                                                    <Form.Control type="text" placeholder="Search by Name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                                    <Button type='button' variant='outline-primary' className='br-10 btn-wh-40 ms-3' onClick={() => getUsersList()} disabled={searchQuery !== '' ? '' : 'disabled'}><FontAwesomeIcon icon={faSearch} /> </Button>
                                                    {
                                                        searchQuery !== '' ?
                                                            <Button type='button' variant='outline-primary' className='br-10 btn-wh-40 ms-3' onClick={() => { getUsersList(true) }}><FontAwesomeIcon icon={faTimes} /></Button>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </Form>
                                        </Card.Header>
                                        {/* getMessages={getMessages} */}
                                        <UserList chatList={chatList} activeChat={activeChat} updateOpenChat={updateOpenChat} showSkeleton={showSkeleton} />
                                    </Card>
                                </Col>
                                {/* messages={messages} */}
                                {/* user={selectedUser} */}
                                {activeChat != '' ?
                                    <ChatSection activeChat={activeChat} scrollbarRefrence={scrollbarRef} isOpen={isOpen} toggleChat={handleToggleChat} />
                                    : null}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    if (!isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    let slug;
    if (context.params.slug !== undefined) {
        slug = context.params.slug[0]
    } else {
        slug = null
    }
    return {
        props: {
            slug
        },
    };
}