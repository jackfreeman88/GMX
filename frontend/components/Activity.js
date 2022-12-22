import React, { useRef, useState } from 'react'
import { Col, Figure, Row, Overlay, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { APP_URL, ASSETS_URL } from '../config/server.config';
import { getSingle, isLoggedIn } from '../services/Auth';
import { dateTimeFormat } from '../services/Helper';
import Notifier from './Notifier';
import { handleOnLike, handleOnRepost } from '../app/slices/activitiesSlice'
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { roles } from '../services/Role';

const Activity = props => {
    const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

    const dispatch = useDispatch();
    const noti = new Notifier()
    const { activity, handleShow, handleShowCommentModal, likesClickHandler, repostsClickhandler } = props;
    const mainPost = activity.type == '2' ? activity.parentPost : activity;
    const isReposted = mainPost.isReposted;
    const isLiked = mainPost.isLiked;
    const handleRepostClick = async ({ postId, post }) => {
        let formData = {
            type: 2,
            repostId: postId,
            post: post,
        }
        await dispatch(handleOnRepost(formData))
    }
    const handleLikeClick = async (pId) => {
        await dispatch(handleOnLike({ pId }))
    }
    return (
        <Row className='mx-0'>
            <Col sm="auto" >
                <Figure className="figure figure-circle figure-gray-2 figure-62">
                    <img className="cover" src={ASSETS_URL + mainPost.user?.profilePath ?? "/profile/no-profile-image.jpg"} alt="profile" />
                </Figure>
            </Col>
            <Col>
                {activity.type == '2' &&
                    <div>
                        <h3 className="text-white fs-16 fw-normal"> <i className="icon icon-reposts"></i> {(getSingle('userId') == activity.user.id) ? 'You' : activity.user.role == '2' ? activity.user.brandName : activity.user.businessName} Reposted</h3>
                    </div>
                }
                <div>
                    <Link href={mainPost.user?.role == roles.brand ? `/brand/${mainPost.user.slug}` : `/customer/${mainPost.user.slug}`}>
                        <a>
                            <h3 className="text-white fs-18">{mainPost.user?.role == '2' ? mainPost.user?.brandName : mainPost.user?.businessName} <span className="color-a5a5a5 fs-14 fw-normal ms-2">{dateTimeFormat(mainPost.createdAt, 'DD MMM YYYY')}</span></h3>
                        </a>
                    </Link>
                    <Link href={"/post/" + activity.postUniqueId}>
                        <a>
                            <p className="color-bfbfbf">{mainPost.post}</p>
                        </a>
                    </Link>
                </div>
                <Row>
                    {mainPost.attachments?.length > 0 &&
                        mainPost.attachments.map((attachmentFile, aIndex) => (
                            <Col lg={3} md={4} sm={6} key={'attachment' + aIndex}>
                                {
                                    aIndex <= 3 ?
                                        attachmentFile.attachmentType == 2 ?
                                            <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, activity.id)}>
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
                                                {(mainPost.attachments.length > 4 && aIndex == 3) ? <span className="more-images">{mainPost.attachments.length - 4 == 0 ? null : `+${mainPost.attachments.length - 4}`}</span> : null}
                                            </div>
                                            :
                                            <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, activity.id)}>
                                                <img className="cover" src={ASSETS_URL + attachmentFile.attachment} alt="postedImage" />
                                                {(mainPost.attachments.length > 4 && aIndex == 3) ? <span className="more-images">{mainPost.attachments.length - 4 == 0 ? null : `+${mainPost.attachments.length - 4}`}</span> : null}
                                            </div>
                                        : null
                                }
                            </Col>
                        ))
                    }
                </Row>
                <div className="d-sm-flex justify-content-between align-items-center">
                    <ul className="comment-icons nav mb-3">
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip> {!isLiked ? "Like" : "UnLike"}</Tooltip>}>
                                {isLoggedIn() ?
                                    <a onClick={e => handleLikeClick(mainPost.id)}>
                                        {!isLiked ? <span><i className="far fa-triangle"></i></span> : <span className="color-22a612"><i className="fas fa-triangle"></i></span>}
                                    </a>
                                    :
                                    <Link href={`/sign-in`}>
                                        <a><span><i className="far fa-triangle"></i></span></a>
                                    </Link>
                                }
                            </OverlayTrigger>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Comment</Tooltip>}>
                                {isLoggedIn() ?
                                    <a onClick={
                                        () => handleShowCommentModal(mainPost.id, 'comment')}
                                    >
                                        <i className="icon icon-chat-bubble"></i>
                                    </a>
                                    : <Link href={`/sign-in`}><a><i className="icon icon-chat-bubble"></i></a></Link>
                                }
                            </OverlayTrigger>
                        </li>
                        <li>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{!isReposted ? 'Repost' : 'Undo Repost'}</Tooltip>}>
                                {isLoggedIn() ?
                                    <a onClick={() => handleRepostClick({ postId: mainPost.id, post: mainPost.post })}>
                                        {!isReposted ? <span><i className="icon icon-reposts"></i></span> : <span className="color-22a612"><i className="icon icon-reposts"></i></span>}
                                    </a>
                                    :
                                    <Link href={`/sign-in`}>
                                        <a>
                                            <span><i className="icon icon-reposts"></i></span>
                                        </a>
                                    </Link>
                                }
                            </OverlayTrigger>
                        </li>
                        <li>
                            
                                {/* <OverlayTrigger trigger="click" placement="top" overlay={
                                    <Popover id="popover-basic">
                                        <Popover.Body>
                                            <ul className="comment-icons nav">
                                                <li><a><FacebookShareButton url={APP_URL + "post/" + activity.postUniqueId}><i className="fab fa-facebook-f"></i></FacebookShareButton></a></li>
                                                <li><a><TwitterShareButton url={APP_URL + "post/" + activity.postUniqueId}><i className="fab fa-twitter"></i></TwitterShareButton></a></li>
                                                <li><a><LinkedinShareButton url={APP_URL + "post/" + activity.postUniqueId}><i className="fab fa-linkedin-in"></i></LinkedinShareButton></a></li>
                                            </ul>
                                        </Popover.Body>
                                    </Popover>
                                }> */}
                            <div ref={ref}>
                                <Overlay
                                    show={show}
                                    target={target}
                                    placement="bottom"
                                    container={ref}                                    
                                >
                                    <Popover id="popover-contained">                                    
                                        <Popover.Body className="py-2">
                                            <ul className="comment-icons nav">
                                                <li><a><FacebookShareButton url={APP_URL + "post/" + activity.postUniqueId}><i className="fab fa-facebook-f"></i></FacebookShareButton></a></li>
                                                <li><a><TwitterShareButton url={APP_URL + "post/" + activity.postUniqueId}><i className="fab fa-twitter"></i></TwitterShareButton></a></li>
                                                <li><a><LinkedinShareButton url={APP_URL + "post/" + activity.postUniqueId}><i className="fab fa-linkedin-in"></i></LinkedinShareButton></a></li>
                                            </ul>
                                        </Popover.Body>
                                    </Popover>
                                </Overlay>
                                <OverlayTrigger overlay={<Tooltip>Share</Tooltip>}>
                                    <a onClick={handleClick} >
                                        <i className="icon icon-share-file"></i>
                                    </a>
                                </OverlayTrigger>
                            </div>                            
                        </li>
                    </ul>
                    <ul className="likes-comments nav">
                        <li>
                            <span className="text-white">{mainPost.likeCount}</span>
                            {' '}{mainPost.likeCount > 0 ?
                                isLoggedIn() ?
                                    < a className="color-a5a5a5" onClick={(e) => { likesClickHandler(e, mainPost.postUniqueId) }}>Likes</a>
                                    :
                                    <Link href={`/sign-in`}><a className="color-a5a5a5">Likes</a></Link>
                                : 'Likes'}
                        </li>
                        <li>
                            {mainPost.commentCount > 0 ?
                                <div><span className="text-white">{mainPost.commentCount}</span>
                                    <Link href={`/post/${activity.postUniqueId}`}>
                                        <a className="color-a5a5a5"> Comments</a>
                                    </Link>
                                </div>
                                : <div><span className="color-a5a5a5">{mainPost.commentCount}</span> Comments</div>}
                        </li>
                        <li>
                            <span className="text-white">{mainPost.repostCount}</span>
                            {' '}{mainPost.repostCount > 0 ?
                                isLoggedIn() ?
                                    <a className="color-a5a5a5" onClick={(e) => { repostsClickhandler(e, mainPost.postUniqueId) }}>Reposts</a>
                                    :
                                    <Link href={`/sign-in`}><a className="color-a5a5a5">Reposts</a></Link>
                                : 'Reposts'}
                        </li>
                    </ul>
                </div>
            </Col>
        </Row >
    )
}

export default Activity