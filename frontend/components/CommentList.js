import Link from "next/link";
import React from "react";
import { Col, Figure, Row, OverlayTrigger, Tooltip, Popover, Button } from "react-bootstrap";
import { ASSETS_URL } from "../config/server.config";
import { dateTimeFormat } from "../services/Helper";
import ReactPlayer from "react-player";
import ReplyList from "./ReplyList";
import { roles } from "../services/Role";

export default function CommentList({ commentData, handleShow, handleShowCommentModal, activity }) {
    return (
        <div>
            <hr></hr>
            <Row>
                <Col sm="auto">
                    <Figure className="figure figure-circle figure-gray-2 figure-62">
                        <img className="cover" src={ASSETS_URL + commentData.user?.profilePath} alt="profile" />
                    </Figure>
                </Col>
                <Col>
                    <Link
                        href={commentData.user?.role == roles.brand ? `/brand/${commentData.user.slug}` : `/customer/${commentData.user.slug}`}
                        legacyBehavior>

                        <h3 className="text-white fs-18">
                            {commentData.user?.fullName}
                            <span className="color-a5a5a5 fs-14 fw-normal ms-2">{dateTimeFormat(commentData.createdAt, "DD MMM YYYY")}</span>
                        </h3>

                    </Link>
                    <Link href={"/post/comment/" + commentData.commentUniqueId} legacyBehavior>

                        <p className="color-bfbfbf">{commentData.comment}</p>

                    </Link>
                    <Row>
                        {commentData.attachments?.length > 0 &&
                            commentData.attachments.map((attachmentFile, aIndex) => (
                                <Col lg={3} md={4} sm={6} key={"attachment" + aIndex}>
                                    {aIndex <= 3 ? (
                                        attachmentFile.attachmentType == 2 ? (
                                            <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, activity.id, "comment")}>
                                                <ReactPlayer
                                                    className="react-player"
                                                    width="100%"
                                                    height="100%"
                                                    url={ASSETS_URL + attachmentFile.attachment}
                                                    playing={false}
                                                    controls={true}
                                                    muted={true}
                                                />
                                                {aIndex == 3 ? (
                                                    <span className="more-images">
                                                        {commentData.attachments.length - 4 == 0 ? null : `+${commentData.attachments.length - 4}`}
                                                    </span>
                                                ) : null}
                                            </div>
                                        ) : (
                                                <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, activity.id, "comment")}>
                                                <img className="cover" src={ASSETS_URL + attachmentFile.attachment} alt="postedImage" />
                                                {aIndex == 3 ? (
                                                    <span className="more-images">
                                                        {commentData.attachments.length - 4 == 0 ? null : `+${commentData.attachments.length - 4}`}
                                                    </span>
                                                ) : null}
                                                </div>
                                        )
                                    ) : null}
                                </Col>
                            ))}
                    </Row>
                    <div className="d-sm-flex justify-content-between align-items-center">
                        <ul className="comment-icons nav mb-3">
                            <li>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Comment</Tooltip>}>
                                    <a onClick={() => handleShowCommentModal(commentData.id, "reply")} aria-controls={"commentReply"}>
                                        <i className="icon icon-chat-bubble"></i>
                                    </a>
                                </OverlayTrigger>
                            </li>
                        </ul>
                        {commentData.replyCount > 0 ? (
                            (<Link
                            href={"/post/comment/" + commentData.commentUniqueId}
                            className="color-a5a5a5"
                            legacyBehavior>

                                <ul className="likes-comments nav">
                                    <li>
                                        <span className="text-white">{commentData.replyCount}</span> Comments
                                    </li>
                                </ul>

                            </Link>)
                        ) : (
                            <ul className="likes-comments nav">
                                <li>
                                    <span className="text-white">{commentData.replyCount}</span> Comments
                                </li>
                            </ul>
                        )}
                    </div>
                    <ReplyList commentData={commentData.replies} commentId={commentData.id} />
                </Col>
            </Row>
        </div>
    );
}
