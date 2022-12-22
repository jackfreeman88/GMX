import React, { useEffect, useState } from 'react'
import { Col, Figure, Form, Card, Row, Spinner, Container, Collapse, OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, fetchCommentReply, getSinglePost, resetComment, showModal } from '../../app/slices/commentSlice';
import { APP_NAME, APP_URL, ASSETS_URL } from '../../config/server.config';
import { contextCookie, getSingle, isLoggedIn } from '../../services/Auth';
import { dateTimeFormat } from '../../services/Helper';
import ReactPlayer from 'react-player'
import LightboxModal from '../../components/LightboxModal';
import CommentModal from '../../components/CommentModal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrow, faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import RepostModal from '../../components/RepostModal';
import LikeModal from '../../components/LikeModal';
import Notifier from '../../components/Notifier';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import Meta from '../../components/Meta';
import Head from 'next/head';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ReplyList from '../../components/ReplyList';
import CommentList from '../../components/CommentList';
import { roles } from '../../services/Role';
const baseColor = "#202020";
const highlightColor = "#444";

export default function PostDetails({ slug, userImage }) {
    const notifier = new Notifier()
    const dispatch = useDispatch()
    const router = useRouter();
    const { singlePost, comments, createCommentStatus, replyStatus, singlePostId } = useSelector((state) => state.comment)
    const [openReplyBox, setOpenReplyBox] = useState(false)
    const [commentReplyText, setCommentReplyText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [show, setShow] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [individualPostAttachments, setIndividualPostAttachments] = useState([])
    const [replyAttachment, setReplyAttachment] = useState('')

    const [replyText, setReplyText] = useState('')
    const [attachments, setAttachments] = useState([]);
    const [isMediaEnable, setIsMediaEnable] = useState(false)
    const [selectedMediaFile, setSelectedMediaFile] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(0)
    const { isCommentModal } = useSelector((state) => state.comment)
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isReposted, setIsReposted] = useState(false);
    const [repostCount, setRepostCount] = useState(0);
    const [isEnable, setIsEnable] = useState(true)
    const handleCloseCommentModal = () => dispatch(showModal({ modalStatus: false, modalType: 'comment' }));
    const handleShowCommentModal = async (postId, type) => {
        await setSelectedPostId(postId);
        await dispatch(showModal({ modalStatus: true, modalType: type }))
    };

    const replyTextChangeHandler = (event) => {
        const { value } = event.target;
        setReplyText(value)
        if (value !== '' || Object.keys(selectedMediaFile).length > 0) {
            setIsEnable(false)
        } else {
            setIsEnable(true)
        }
    }
    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
        const i = Math.floor(Math.log(bytes) / Math.log(k))
    
        return {valueWithSize: `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`, value: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), size: sizes[i]}
    }
    const attachmentsHandler = (event) => {
        let filesCount = selectedMediaFile.length + event.target.files.length;
        if(filesCount > 10){
            notifier.notify('Please choose up to 10 media.', 'danger')
            return false;
        } else {
            if(filesCount >= 10){
                setIsMediaEnable(true)
            } else {
                setIsMediaEnable(false)
            }
            if (event.target.files.length > 0) {
                setIsEnable(false)
            } else {
                setIsEnable(true)
            }
            const selectedFiles = event.target.files;
            const selectedFilesArray = Array.from(selectedFiles);
            const imagesArray = selectedFilesArray.map((file, index) => {
                return {
                    'previewFile': URL.createObjectURL(file),
                    'size': formatBytes(file.size),
                    'type': file.type.substring(0, 5) === 'image' ? 'image' : 'video',
                    'id': index,
                };
            });
            // videos and images validation
            let previousAndSelectedMediaFile = selectedMediaFile.concat(imagesArray);
            let fileTypeCount = {};
            let videoSize = {};
            let imageSize = {};
            previousAndSelectedMediaFile.map(function(item){
                fileTypeCount[item.type] = (fileTypeCount[item.type] || 0) + 1;
                if(item.type === 'video'){
                    videoSize[item.type] = item.size;
                }
                if(item.type === 'image'){
                    imageSize[item.type] = item.size;
                }
            });
            if(fileTypeCount.video > 1){
                notifier.notify('You can upload only one video.', 'danger')
                return false;
            } else {
                if(videoSize?.video?.size === 'GB' || videoSize?.video?.size === 'TB' || videoSize?.video?.size === 'PB' || videoSize?.video?.size === 'EB' || videoSize?.video?.size === 'ZB' || videoSize?.video?.size === 'YB'){
                    notifier.notify('Max video file limit is 256 MB.', 'danger')
                    return false;
                } else {
                    if(videoSize?.video?.size === 'MB' && videoSize?.video?.value > 256.05) {
                        notifier.notify('Max video file limit is 256 MB.', 'danger')
                        return false;
                    }
                }
            }
            if(imageSize?.image?.size === 'GB' || imageSize?.image?.size === 'TB' || imageSize?.image?.size === 'PB' || imageSize?.image?.size === 'EB' || imageSize?.image?.size === 'ZB' || imageSize?.image?.size === 'YB'){
                notifier.notify('Max image file limit is 5 MB.', 'danger')
                return false;
            } else {
                if(imageSize?.image?.size === 'MB' && imageSize?.image?.value > 5.05) {
                    notifier.notify('Max image file limit is 5 MB.', 'danger')
                    return false;
                }
            }
            setSelectedMediaFile((previousMediaFile) => previousMediaFile.concat(imagesArray));
            //setAttachments((previousattachments) => previousattachments.concat(event.target.files));
            let f = event.target.files;
            let sf = attachments;
            // setAttachments((prevState)=>{
            //     return {...prevState, ...f};
            // })
            //setAttachments((prevState)=> ({prevState, ...f}))
            // setAttachments({ attachments, ...f });
            for(let i=0; i<event.target.files.length; i++){
                setAttachments((prevfiles)=>[...prevfiles,event.target.files[i]])
                // let f = event.target.files[i];
                // setAttachments((prevfiles)=>({...prevfiles, ...f}))
            }
            console.log("event.target.files", event.target.files);
            console.log("attachments", attachments);
        }
    }
    const deleteHandler = (selectedIndex, selectedFile, selectedId) => {
        setSelectedMediaFile(selectedMediaFile.filter((e, index) => index !== selectedIndex));
        const copiedAttachment = [ ...attachments ];
        console.log("copiedAttachment", copiedAttachment);
        delete copiedAttachment[selectedId]
        const newFiles = []
        for(let i = 0; i < copiedAttachment.length; i++){
            if(copiedAttachment[i]) {
                newFiles.push(copiedAttachment[i])
            }    
        }
        console.log("newFiles", newFiles);
        setAttachments(newFiles)
        const imagesArray = newFiles.map((file, index) => {
            return {
                'previewFile': URL.createObjectURL(file),
                'size': formatBytes(file.size),
                'type': file.type.substring(0, 5) === 'image' ? 'image' : 'video',
                'id': index,
            };
        });
        setSelectedMediaFile(imagesArray);
        if (Object.keys(copiedAttachment).length === 0 && replyText === '') {
            setIsEnable(true)
        } else {
            setIsEnable(false)
        }
        URL.revokeObjectURL(selectedFile);
        let filesCount = selectedMediaFile.length - 1;
        console.log('total', filesCount);
        if(filesCount >= 10){
            setIsMediaEnable(true)
        } else {
            setIsMediaEnable(false)
        }
    }
    const handleSubmit = () => {
        if (replyText != '' || Object.keys(attachments).length > 0) {
            setIsEnable(false)
            setIsMediaEnable(false)
        setIsLoading(true)
        let formData = new FormData();
        formData.append('comment', replyText)
        formData.append('postId', parseInt(singlePost[0].parentPost === null ? singlePost[0].id : singlePost[0].parentPost.id))
        for (let key in attachments) {
            formData.append('attachment', attachments[key])
        }
        dispatch(createComment(formData))
            .unwrap()
            .then((result) => {
                if (result.status) {
                    notifier.notify(result.message, 'success');
                }
                setIsLoading(false)
            })
            .catch((rejectedValueOrSerializedError) => {
                setIsLoading(false)
                notifier.notify(rejectedValueOrSerializedError.message, 'danger')
            })
        } else {
            setIsEnable(true)
        }
    }

    const handleClose = () => setShow(false)
    const handleShow = (value, index, id, type) => {
        setActiveIndex(index)
        setShow(true)
        if (type === 'post') {
            setIndividualPostAttachments(singlePost[0].attachments)
        } else {
            let singleComment = comments.find((comment) => comment.postId === id)
            setIndividualPostAttachments(singleComment.attachments)
        }
    }


    useEffect(() => {
        // setShowSkeleton(true)
        dispatch(getSinglePost(slug))
            .unwrap()
            .then((result) => {
                if (result.status) {
                    dispatch(fetchCommentReply({ 'postId': parseInt(result.data[0].parentPost === null ? result.data[0].id : result.data[0].parentPost.id) }))
                    resetForm()
                }
                // setShowSkeleton(false)
            })
            .catch((rejectedValueOrSerializedError) => {
                // setShowSkeleton(false)
                notifier.notify(rejectedValueOrSerializedError.message, 'danger')
                router.push(`/axis-point`);
            })
    }, [dispatch, createCommentStatus, replyStatus])


    useEffect(() => {
        return () => dispatch(resetComment()) //for unmount
    }, [dispatch])

    function resetForm() {
        setReplyText('')
        setAttachments([])
        handleCloseCommentModal()
        setSelectedMediaFile([])
        setIsEnable(true)
    }

    useEffect(() => {
        if (singlePost.length != 0) {
            let [post] = singlePost;
            if (post.type == 2) {
                post = post.parentPost
            }
            setIsLiked(post?.isLiked);
            setLikeCount(post?.likeCount);
            setIsReposted(post?.isReposted);
            setRepostCount(post?.repostCount);
        }
    }, [singlePost])

    const handleLikeClick = async (pId) => {
        let response = await Rest.axiosRequest(
            API.posts + `/handlePostLike`,
            { pId: pId },
            'POST',
            false,
            getSingle('token'),
        )
        let result = response.data
        if (result.status === true) {
            const { hasUserLikedPost, totalLikesOnPost } = result.data;
            setIsLiked(hasUserLikedPost);
            setLikeCount(totalLikesOnPost);
        }
    }

    const handleRepostClick = async ({ postId, post }) => {
        let formData = {
            type: 2,
            repostId: postId,
            post: post,
        }
        const response = await Rest.axiosRequest(API.repost, formData, 'POST')
        let result = response.data
        if (result.status === true) {
            const { hasUserReposted, totalRepostOnPost } = result.data;
            setIsReposted(hasUserReposted);
            setRepostCount(totalRepostOnPost);
        }
    }

    //RepostModal
    const [reposts, setReposts] = useState([])
    const [repostsPage, setRepostsPage] = useState(0)
    const [repostsCount, setRepostsCount] = useState(0)
    const [currentRepostPost, setCurrentRepostPost] = useState(null)

    useEffect(() => {
        const getRepostsBy = async () => {
            let repostRes = await Rest.axiosRequest(
                API.posts +
                '/' +
                currentRepostPost +
                `/reposts?limit=10&page=${repostsPage}`,
                {},
                'GET',
            )
            repostRes = repostRes.data
            if (repostRes.status) {
                const { count, rows } = repostRes.data
                setRepostsCount(count)
                if (rows.length > 0) {
                    setReposts([...reposts, ...rows])
                }
            }
        }
        if (currentRepostPost != null) {
            getRepostsBy()
        }
    }, [currentRepostPost, repostsPage])

    const fetchMoreReposts = () => {
        setRepostsPage(repostsPage + 1)
    }
    const resetRepostModal = () => {
        setCurrentRepostPost(null)
        setReposts([])
        setRepostsPage(0)
        setRepostsCount(0)
    }
    const [showRepostModal, setShowRepostModal] = useState(false);
    const repostsModalClose = () => { setShowRepostModal(false); resetRepostModal(); };
    const repostsModalShow = () => setShowRepostModal(true);
    const repostsClickhandler = (e, postUniqueId) => {
        setCurrentRepostPost(postUniqueId)
        repostsModalShow()
    }
    //LikeModal
    const [likes, setLikes] = useState([])
    const [likesPage, setLikesPage] = useState(0)
    const [likesCount, setLikesCount] = useState(0)
    const [currenLikePost, setCurrentLikePost] = useState(null)
    const fetchMoreLikes = () => {
        setLikesPage(likesPage + 1)
    }

    useEffect(() => {
        const getLikesBy = async () => {
            let likeRes = await Rest.axiosRequest(
                API.posts + '/' + currenLikePost + `/likes?limit=10&page=${likesPage}`,
                {},
                'GET',
            )
            likeRes = likeRes.data
            if (likeRes.status) {
                const { count, rows } = likeRes.data
                setLikesCount(count)
                if (rows.length > 0) {
                    setLikes([...likes, ...rows])
                }
            }
        }
        if (currenLikePost != null) {
            getLikesBy()
        }
    }, [currenLikePost, likesPage])

    const resetLikesModal = () => {
        setCurrentLikePost(null)
        setLikes([]);
        setLikesPage(0);
        setLikesCount(0);
    }
    const [showLikeModal, setShowLikeModal] = useState(false);
    const likesModalClose = () => { setShowLikeModal(false); resetLikesModal(); };
    const likesModalShow = () => setShowLikeModal(true);
    const likesClickHandler = (e, postUniqueId) => {
        setCurrentLikePost(postUniqueId)
        likesModalShow()
    }
    console.log('isEnable---->', isEnable);
    return (
        <section className="bg-black p-30-0-60">
            <Meta title={APP_NAME} keyword={'post'} description={'post'} />
            <Head>
                {/* <meta name="og:url" property="og:url" content={`${shareUrl}`} />
                <meta name="og:type" property="og:type" content="article" />
                <meta name="og:title" property="og:title" content={`${metaTitle}`} />
                <meta name="og:description" property="og:description" content={`${metaDesc}`} />
                <meta name="og:image" property="og:image" content={`${newsData.image}`} />
                <meta name="og:site_name" property="og:site_name" content={`${APP_NAME}`} />
                <meta name="twitter:card" property="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" property="twitter:site" content="@Nandini42491586" />
                <meta name="twitter:creator" property="twitter:creator" content="@Nandini42491586" />
                <meta name="twitter:title" property="twitter:title" content={`${metaTitle}`} />
                <meta name="twitter:description" property="twitter:description" content={`${metaDesc}`} />
                <meta name="twitter:image" property="twitter:image" content={`${newsData.image}`} /> */}
            </Head>
            <Container>
                <Row>
                    <Col lg={11} className="mx-auto">
                        <Card className="card-dark card-post">
                            <Card.Header onClick={() => router.back()}>
                                <div className="d-flex align-items-center">
                                    <a href='#' className="text-white fs-20 me-3">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </a>
                                    <h3 className="text-white fs-18 mb-0">Post</h3>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {
                                    showSkeleton ?
                                        [...Array(1)].map((arrayData, aIndex) => {
                                            return (
                                                <div key={aIndex}>
                                                    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                                                        <Row>
                                                            <Col lg="auto">
                                                                <Skeleton circle={true} height={40} width={40} className="mb-0 me-3" />
                                                            </Col>
                                                            <Col lg>
                                                                <Skeleton width={200} height={20} />
                                                                <Skeleton width={'100%'} count={3} />
                                                            </Col>
                                                        </Row>
                                                    </SkeletonTheme>
                                                </div>
                                            )
                                        })
                                        :
                                        singlePost?.length > 0 &&
                                        singlePost.map((activity, index) => {
                                        let mainPost = activity.type == '2' ? activity.parentPost : activity;
                                        console.log(mainPost);
                                        return (
                                            <>
                                                <Row key={index}>
                                                    {activity.type == '2' &&
                                                        <div>
                                                            <h3 className="text-white fs-18"> <i className="icon icon-reposts"></i> {(getSingle('userId') == activity.user.id) ? 'You' : activity.user.role == '2' ? activity.user.brandName : activity.user.businessName} Reposted</h3>
                                                        </div>
                                                    }
                                                    <Col sm="auto" >
                                                        <Figure className="figure figure-circle figure-gray-2 figure-62">
                                                            <img className="cover" src={ASSETS_URL + mainPost.user?.profilePath ?? "/profile/no-profile-image.jpg"} alt="profile" />
                                                        </Figure>
                                                    </Col>
                                                    <Col>
                                                        <div>
                                                            <Link href={mainPost.user?.role == roles.brand ? `/brand/${mainPost.user.slug}` : `/customer/${mainPost.user.slug}`}>
                                                                <a>
                                                                    <h3 className="text-white fs-18">{mainPost.user?.role == '2' ? mainPost.user?.brandName : mainPost.user?.businessName} <span className="color-a5a5a5 fs-14 fw-normal ms-2">{dateTimeFormat(mainPost.createdAt, 'DD MMM YYYY')}</span></h3>
                                                                </a>
                                                            </Link>
                                                            <p className="color-bfbfbf">{mainPost.post}</p>
                                                        </div>
                                                        <Row>
                                                            {mainPost.attachments?.length > 0 &&
                                                                mainPost.attachments.map((attachmentFile, aIndex) => (
                                                                    <Col lg={3} md={4} sm={6} key={'attachment' + aIndex}>
                                                                        {
                                                                            aIndex <= 3 ?
                                                                                attachmentFile.attachmentType == 2 ?
                                                                                    <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, activity.id, 'post')}>
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
                                                                                        {aIndex == 3 ? <span className="more-images">{mainPost.attachments.length - 4 == 0 ? null : `+${mainPost.attachments.length - 4}`}</span> : null}
                                                                                    </div>
                                                                                    :
                                                                                    <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, activity.id, 'post')}>
                                                                                        <img className="cover" src={ASSETS_URL + attachmentFile.attachment} alt="postedImage" />
                                                                                        {aIndex == 3 ? <span className="more-images">{mainPost.attachments.length - 4 == 0 ? null : `+${mainPost.attachments.length - 4}`}</span> : null}
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
                                                                            </Link>}
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
                                                                            : <Link href={`/sign-in`}><a><i className="icon icon-chat-bubble"></i></a></Link>}
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
                                                                    <OverlayTrigger placement="top" overlay={<Tooltip>Share</Tooltip>}>
                                                                        <OverlayTrigger trigger="click" placement="top" overlay={
                                                                            <Popover id="popover-basic">
                                                                                <Popover.Body>
                                                                                    <ul className="comment-icons nav">
                                                                                        <li><a><FacebookShareButton url={APP_URL + "post/" + mainPost.postUniqueId}><i className="fab fa-facebook-f"></i></FacebookShareButton></a></li>
                                                                                        <li><a><TwitterShareButton url={APP_URL + "post/" + mainPost.postUniqueId}><i className="fab fa-twitter"></i></TwitterShareButton></a></li>
                                                                                        <li><a><LinkedinShareButton url={APP_URL + "post/" + mainPost.postUniqueId}><i className="fab fa-linkedin-in"></i></LinkedinShareButton></a></li>
                                                                                    </ul>
                                                                                </Popover.Body>
                                                                            </Popover>
                                                                        }>
                                                                            <span>
                                                                                <i className="icon icon-share-file"></i>
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </OverlayTrigger>
                                                                </li>
                                                            </ul>
                                                            <ul className="likes-comments nav">
                                                                <li><span className="text-white">{likeCount}</span>
                                                                    {' '}{likeCount > 0 ?
                                                                        isLoggedIn() ?
                                                                            <a className="color-a5a5a5" onClick={(e) => { likesClickHandler(e, mainPost.postUniqueId) }}>Likes</a>
                                                                            : <Link href={`/sign-in`}><a className="color-a5a5a5">Likes</a></Link>
                                                                        : 'Likes'
                                                                    }
                                                                </li>
                                                                <li><span className="text-white">{mainPost.commentCount}</span> Comments</li>
                                                                <li><span className="text-white">{repostCount}</span>
                                                                    {' '}{repostCount > 0 ?
                                                                        isLoggedIn() ?
                                                                            <a className="color-a5a5a5" onClick={(e) => { repostsClickhandler(e, mainPost.postUniqueId) }}>Reposts</a>
                                                                            : <Link href={`/sign-in`}><a className="color-a5a5a5">Reposts</a></Link>
                                                                        : 'Reposts'
                                                                    }</li>
                                                            </ul>
                                                        </div>
                                                        <hr></hr>
                                                        <Row>
                                                            <Col sm="auto">
                                                                <Figure className="figure figure-circle figure-gray-2 figure-62">
                                                                    <img className="cover" src={ASSETS_URL + userImage} alt="profile" />
                                                                </Figure>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group className="form-dark">
                                                                    <Form.Control as="textarea"
                                                                        name='replyText'
                                                                        value={replyText}
                                                                        onChange={replyTextChangeHandler}
                                                                        placeholder="Enter Your Reply" />
                                                                </Form.Group>
                                                                <Form.Group className="form-dark">
                                                                    <div className="d-flex align-items-start flex-wrap">
                                                                        <div className="multimediaFiles">
                                                                            <label htmlFor="multimediaFilesPost" className={`btn btn-outline-gray btn-rounded btn-h-30 me-3 mt-3${(isLoading || isMediaEnable) ? ' disabled' : ''}`}>
                                                                                <span className="color-20da97 me-2"><i className="icon icon-image v-align-middle"></i></span>
                                                                                Media
                                                                            </label>
                                                                            <input type="file"
                                                                                multiple
                                                                                accept="audio/*,video/*,image/*"
                                                                                onChange={attachmentsHandler}
                                                                                id="multimediaFilesPost"
                                                                                className="mediaFiles"
                                                                            />
                                                                            {/* <a href="#" className="btn btn-outline-gray btn-rounded btn-h-30 mt-3">
                                                                                <span className="color-f8bf52 me-2"><i className="icon icon-video v-align-middle"></i></span>
                                                                                Videos
                                                                            </a> */}
                                                                        </div>
                                                                    </div>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col sm="auto">
                                                                <button type="submit"
                                                                    onClick={
                                                                        !isLoading ?
                                                                            () => handleSubmit()
                                                                            : null
                                                                    }
                                                                    disabled={isLoading || isEnable}
                                                                    className="btn btn-outline-gray btn-wh-150-48 btn-rounded mt-3">
                                                                    {isLoading ?
                                                                        <Spinner animation="border" /> :
                                                                        "Reply"
                                                                    }
                                                                </button>
                                                            </Col>
                                                            <Row>
                                                                <Col sm="auto">
                                                                    <div style={{ width: "58px" }}></div>
                                                                </Col>
                                                                <Col className=" mt-3">
                                                                    <div className={selectedMediaFile.length > 0 ? `grid-wrapper` : ``}>
                                                                        {selectedMediaFile &&
                                                                            selectedMediaFile.map((selectedFile, index) => {
                                                                                return (
                                                                                    
                                                                                        <div key={selectedFile + index} className={`gallery-image position-relative` + (selectedFile.type === 'video' ? ` gallery-video` : ``)}>
                                                                                            <Button variant="" className="btn-remove" onClick={() => deleteHandler(index, selectedFile.previewFile, selectedFile.id)}>
                                                                                                <i className="fal fa-times"></i>
                                                                                            </Button>
                                                                                            {
                                                                                                selectedFile.type === 'video' ?
                                                                                                    <video controls>
                                                                                                        <source src={selectedFile.previewFile} type="video/mp4" />
                                                                                                        Sorry, your browser doesn't support embedded videos.
                                                                                                    </video>
                                                                                                    :
                                                                                                    <img className="cover" src={selectedFile.previewFile} alt="upload" />
                                                                                            }
                                                                                        </div>                                    
                                                                                );
                                                                            })}
                                                                    </div>
                                                                </Col>
                                                            </Row >
                                                            {/* <Row className="images">
                                                                {selectedMediaFile &&
                                                                    selectedMediaFile.map((selectedFile, index) => {
                                                                        return (
                                                                            <Col key={selectedFile + index} className="image">
                                                                                <div className="gallery-image position-relative">
                                                                                    <Button variant="" className="btn-remove" onClick={() => deleteHandler(index, selectedFile.previewFile, selectedFile.id)}>
                                                                                        <i className="fal fa-times"></i>
                                                                                    </Button>
                                                                                    {
                                                                                        selectedFile.type === 'video' ?
                                                                                            <video className="gallery-image" controls>
                                                                                                <source src={selectedFile.previewFile} type="video/mp4" />
                                                                                                Sorry, your browser doesn't support embedded videos.
                                                                                            </video>
                                                                                            :
                                                                                            <img className="gallery-image" src={selectedFile.previewFile} alt="upload" />
                                                                                    }
                                                                                </div>
                                                                            </Col>
                                                                        );
                                                                    })}
                                                            </Row> */}
                                                        </Row>
                                                        {
                                                            comments?.length > 0 &&
                                                            comments.map((commentData, cIndex) => (
                                                                (activity.id === commentData.postId || mainPost.id === commentData.postId) ?
                                                                    <CommentList key={cIndex}
                                                                        commentData={commentData}
                                                                        activity={activity}
                                                                        handleShow={handleShow}
                                                                        handleShowCommentModal={handleShowCommentModal}
                                                                    />
                                                                    : null
                                                            ))
                                                        }
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <LightboxModal
                    sliderIndex={activeIndex}
                    images={individualPostAttachments}
                    show={show}
                    handleClose={handleClose}
                />
                <CommentModal
                    showCommentModal={isCommentModal}
                    handleCloseCommentModal={handleCloseCommentModal}
                    postId={selectedPostId}
                    userImage={userImage}
                />
                <RepostModal
                    show={showRepostModal}
                    hide={repostsModalClose}
                    reposts={reposts}
                    repostsCount={repostsCount}
                    fetchMoreReposts={fetchMoreReposts}
                />
                <LikeModal
                    show={showLikeModal}
                    hide={likesModalClose}
                    likes={likes}
                    likesCount={likesCount}
                    fetchMoreLikes={fetchMoreLikes}
                />
            </Container>
        </section>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const userImage = contextCookie(context, 'userImage');
    return {
        props: {
            slug,
            userImage
        }
    }
}