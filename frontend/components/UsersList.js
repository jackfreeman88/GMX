import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Badge, Card, Figure, Image } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ASSETS_URL } from "../config/server.config";
import { getSingle } from "../services/Auth";
import { dateTimeFormat, Helper } from "../services/Helper";
import { SkeletonOptions } from "../services/SkeletonOptions";

export default function UserList(props) {
    return (
        <Card.Body className='p-0'>
            <Scrollbars style={{ height: 520 }} universal={true}>
                <ul className='nav user_chat_list pe-1'>
                    {
                        props.showSkeleton ?
                            [...Array(5)].map((val, index) => {
                                return (
                                    <li key={index}>
                                        <a>
                                            <div className='d-flex align-items-center w-100'>
                                                <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                    <Skeleton circle={true} height={50} width={50} className="me-2" />
                                                </SkeletonTheme>
                                                <div className="w-100" >
                                                    <h3 className='fs-16 mb-1'>
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton width={300} />
                                                        </SkeletonTheme>
                                                    </h3>
                                                    <p className='fs-14 mb-0 color-dcdcdc'>
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton width={200} />
                                                        </SkeletonTheme>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                )
                            })
                            :
                            props.chatList.length ?
                                props.chatList.map(
                                    (chat, index) => {
                                        let user;
                                        if (chat.sender.id === getSingle('userId')) {
                                            user = 'receiver'
                                        }
                                        else {
                                            user = 'sender'
                                        }
                                        return (
                                            <li key={'chat-' + index} className={props.activeChat === chat[user]['slug'] ? 'active pointer-not-allowed' : ''}>
                                                {/* <a onClick={() => props.getMessages(chat[user]['slug'])}> */}
                                                <a onClick={() => props.updateOpenChat(chat[user]['slug'])}>
                                                    <div className='d-flex align-items-center w-100'>
                                                        <Figure className='user_profile me-2'>
                                                            <Image src={ASSETS_URL + chat[user]['profilePath']} className="cover" />
                                                        </Figure>
                                                        <div className="w-100" >
                                                            {chat.unreadCount ? <Badge>{chat.unreadCount}</Badge> : null}
                                                            {getSingle('role') === '2' ?
                                                                // <h3 className='fs-16 mb-1'>{chat[user]['firstName']+' '+(chat[user]['lastName'] || '')}</h3>
                                                                <h3 className='fs-16 mb-1'>{chat[user]['businessName']}</h3>
                                                                :
                                                                <h3 className='fs-16 mb-1'>{chat[user]['brandName']}</h3>
                                                            }
                                                            <p className='fs-14 mb-0 color-dcdcdc'>
                                                                {chat.isAttachment === '1' ?
                                                                    <>
                                                                        <FontAwesomeIcon icon={faPaperclip} /> Attachment
                                                                    </>
                                                                    : Helper.niceString(chat.message, 45)}
                                                            </p>
                                                            <span className='fs-14 float-end color-dcdcdc'>{dateTimeFormat(chat.lastMsgTime, 'h:mm a')}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    }
                                )
                                : null
                    }
                </ul>
            </Scrollbars>
        </Card.Body>
    )
}