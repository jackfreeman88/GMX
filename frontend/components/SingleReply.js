import React, { useState } from 'react'
import { Col, Figure, Row } from 'react-bootstrap'
import { ASSETS_URL } from '../config/server.config'
import { dateTimeFormat } from '../services/Helper'
import ReactPlayer from 'react-player'
import Link from 'next/link'
import { roles } from '../services/Role'
import LightboxModal from './LightboxModal'

export default function SingleReply({ replyData, handleShowReplies, reply, rIndex, count, handleHideReplies }) {
    const [show, setShow] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const handleClose = () => setShow(false)
    const [individualReplyAttachments, setIndividualReplyAttachments] = useState([])

    const handleShow = (index) => {
        setActiveIndex(index)
        setShow(true)
        setIndividualReplyAttachments(replyData['attachments'])
    }
    return (
        <Row key={"rIndex" + rIndex} className="timeline-row">
                <Col sm="auto">
                    <Figure className="figure figure-circle figure-gray-2 figure-62">
                        <img className="cover" src={ASSETS_URL + replyData.user?.profilePath ?? "/profile/no-profile-image.jpg"} alt="profile" />
                    </Figure>
                </Col>
                <Col>
                <Link
                    href={replyData.user?.role == roles.brand ? `/brand/${replyData.user.slug}` : `/customer/${replyData.user.slug}`}
                    legacyBehavior>

                    <div>
                        <h3 className="text-white fs-18">{replyData.user?.fullName}<span className="color-a5a5a5 fs-14 fw-normal ms-2">{dateTimeFormat(replyData.createdAt, 'DD MMM YYYY')}</span></h3>
                        <p className="color-bfbfbf">{replyData.reply}</p>
                    </div>

                </Link>
                    <Row className="gallery-view">
                        {replyData.attachments?.length > 0 &&
                            replyData.attachments.map((attachmentFile, aIndex) => (
                                <Col lg={3} md={4} sm={6} key={'attachment' + aIndex}>
                                    {
                                        aIndex <= 3 ?
                                            attachmentFile.attachmentType == 2 ?
                                                <div className="gallery-image cursor-pointer" onClick={() => handleShow(aIndex)}>
                                                    < ReactPlayer
                                                        className='react-player'
                                                        width='100%'
                                                        height='100%'
                                                        url={ASSETS_URL + attachmentFile.attachment}
                                                        playing={false}
                                                        controls={true}
                                                        //volume={5}
                                                        muted={true}
                                                    />
                                                    {aIndex == 3 ? <span className="more-images">{replyData.attachments.length - 4 == 0 ? null : `+${replyData.attachments.length - 4}`}</span> : null}
                                                </div>
                                                :
                                                <div className="gallery-image cursor-pointer" onClick={() => handleShow(aIndex)}>
                                                    <img className="cover" src={ASSETS_URL + attachmentFile.attachment} alt="postedImage" />
                                                    {aIndex == 3 ? <span className="more-images">{replyData.attachments.length - 4 == 0 ? null : `+${replyData.attachments.length - 4}`}</span> : null}
                                                </div>
                                            : null
                                    }
                                </Col>
                            ))
                        }
                    </Row>
                    {
                    reply.length - 1 === rIndex && (reply.length >= 3) ?
                        (count - 1) === rIndex ?
                                <p onClick={() => handleHideReplies(replyData.commentId)} className='color-f3772c'>Hide Replies</p>
                                :
                                <p onClick={() => handleShowReplies(replyData.commentId)} className='color-f3772c'>Show Replies</p>
                            : null
                    }
                </Col>
            <LightboxModal
                sliderIndex={activeIndex}
                images={individualReplyAttachments}
                show={show}
                handleClose={handleClose}
            />
        </Row>
    );
}
