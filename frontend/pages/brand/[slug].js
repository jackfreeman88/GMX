import React, { useEffect, useState } from 'react'
import {
    Card,
    Col,
    Container,
    Row,
    Table,
    Tabs,
    Tab,
    Button,
    Form,
    Modal,
    ListGroup,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faStar,
    faCommentDots,
    faCalendarAlt,
    faExternalLink,
} from '@fortawesome/free-solid-svg-icons'
import Figure from 'react-bootstrap/Figure'
import API from '../../config/endpoints.config'
import Rest from '../../config/rest.config'
import Notifier from '../../components/Notifier'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { SkeletonOptions } from '../../services/SkeletonOptions'
import { saveAs } from 'file-saver'
import { Helper, customFormat, dateTimeFormat } from '../../services/Helper'
import InfiniteScroll from 'react-infinite-scroll-component'
import moment from 'moment'
import ReactStars from 'react-rating-stars-component'
import {
    APP_NAME,
    ASSETS_URL,
    REACT_APP_API_BASE_URL,
} from '../../config/server.config'
import { useRouter } from 'next/router'
import { contextCookie, getSingle } from '../../services/Auth'
import Meta from '../../components/Meta'
import {
    Table as ResponsiveTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from 'react-super-responsive-table'
import ActivityPost from '../../services/ActivityPost'
import RepostModal from '../../components/RepostModal';
import LightboxModal from '../../components/LightboxModal';
import LikeModal from '../../components/LikeModal'
import CommentModal from '../../components/CommentModal';
import { useSelector, useDispatch } from 'react-redux'
import { fetchActivities, addActivity, resetActivities, setFollowerData, handleOnComment } from '../../app/slices/activitiesSlice'
import ActivityList from '../../components/ActivityList'
import { showModal } from '../../app/slices/commentSlice'

function SellerDetails({ brandDetails, products, userImage, isLoggedIn }) {
    const noti = new Notifier()
    const dispatch = useDispatch();
    const router = useRouter()
    const { slug } = router.query
    const [tabIndex, setTabIndex] = useState(0)
    const [showSkeleton, setShowSkeleton] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isPostLoading, setIsPostLoading] = useState(false)
    const [isFollowClicked, setIsFollowClicked] = useState(false)
    const [followStatus, setFollowStatus] = useState(
        brandDetails.userFollowed ? 'Following' : 'Follow',
    )
    const [followersCount, setFollowersCount] = useState(
        brandDetails.followersCount,
    )
    const [followingsCount, setFollowingsCount] = useState(
        brandDetails.followingsCount,
    )
    const [productQuality, setProductQuality] = useState([])
    const [deliveryTime, setDeliveryTime] = useState([])
    const [general, setGeneral] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState('')
    const [reviewsType, setReviewsType] = useState(1)
    // Activity state
    const [activityPage, setActivityPage] = useState(0)
    // const [activities, setActivities] = useState([])
    // const [totalActivities, setTotalActivities] = useState(0)
    //const [showActivityLoader, setShowActivityLoader] = useState(false)
    const activities = useSelector(state => state.activities.activities);
    const totalActivities = useSelector(state => state.activities.totalActivites);
    const showActivityLoader = useSelector(state => state.activities.status)
    const { isCommentModal } = useSelector((state) => state.comment)

    const [activityComment, setActivityComment] = useState('')
    const [attachments, setAttachments] = useState([])
    const [individualPostAttachments, setIndividualPostAttachments] = useState([])
    // LightBox Images
    // const [photoIndex, setPhotoIndex] = useState(false)
    // const [isOpen, setIsOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [isEnable, setIsEnable] = useState(true)
    const [isMediaEnable, setIsMediaEnable] = useState(false);
    const [selectedMediaFile, setSelectedMediaFile] = useState([]);
    // const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPosted, setIsPosted] = useState(false)
    //RepostModal
    const [reposts, setReposts] = useState([])
    const [repostsPage, setRepostsPage] = useState(0)
    const [repostsCount, setRepostsCount] = useState(0)
    const [currentRepostPost, setCurrentRepostPost] = useState(null)
    //comment	
    const handleCloseCommentModal = () => dispatch(showModal({ modalStatus: false, modalType: 'comment' }));
    const handleShowCommentModal = async (postId) => {
        await setSelectedPostId(postId);
        await dispatch(showModal({ modalStatus: true, modalType: 'comment' }));
    };
    const fetchMoreReposts = () => {
        setRepostsPage(repostsPage + 1)
    }

    useEffect(() => {
        return () => dispatch(resetActivities())
    }, [dispatch])

    const { createCommentStatus, postId, postCommentCount } = useSelector((state) => state.comment)

    useEffect(() => {
        if (createCommentStatus === 'succeeded') {
            dispatch(handleOnComment({ postId, postCommentCount }))
        }
    }, [dispatch, createCommentStatus])

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

    const handleClose = () => setShow(false)
    const handleShow = (value, index, id) => {
        setActiveIndex(index)
        setShow(true)
        let singleActivity = activities.find((data) => data.id === id)
        let mainPost =
            singleActivity.type == '2' ? singleActivity.parentPost : singleActivity
        setIndividualPostAttachments(mainPost.attachments)
    }
    const downloadLicense = () => {
        saveAs(REACT_APP_API_BASE_URL + '/get/file' + brandDetails.licensePath)
    }

    const fetchMoreData = () => {
        setPage(page + 1)
        if (productQuality.length >= count) {
            return;
        } else {
            getReviews()
        }
    }

    const getReviews = async () => {
        setIsLoading(true)
        const review = await Rest.axiosRequest(
            API.reviews + `?slug=${slug}&page=${page}&limit=${5}`,
            {},
            'GET',
        )
        if (review.status === 200) {
            const response = review.data
            setCount(response.data[1].count)
            if (response.data[1].reviews.length) {
                setProductQuality([...productQuality, ...response.data[1].reviews])
                setDeliveryTime([...deliveryTime, ...response.data[2].reviews])
                setGeneral([...general, ...response.data[3].reviews])
                // setHasMore(true)
                //setTimeout(() => {
                    setIsLoading(false)
                //}, 200)
            } else {
                setIsLoading(false)
                // setHasMore(false)
                return
            }
        } else {
            setIsLoading(false)
            noti.notify(review.data.message, 'danger')
        }
    }

    const handleMessage = () => {
        // if(!brandDetails.canMessage){
        //     noti.notify('You can message seller who is in your state only', "danger");
        // } else {
        router.push(`/messages/${slug}`)
        // }
    }

    const handleFollow = async () => {
        setIsFollowClicked(true)
        let formData = {
            slug: brandDetails.userSlug,
        }
        let response = await Rest.axiosRequest(API.follow, formData)
        response = response.data
        if (response.status) {
            const follow = response.data.follow
            setFollowStatus(follow ? 'Following' : 'Follow')
            setFollowersCount(follow ? ++followersCount : --followersCount)
        } else {
            noti.notify(response.message, 'danger')
        }
        setIsFollowClicked(false)
    }

    useEffect(() => {
        let formData = {
            page: activityPage,
            limit: 10,
            type: 'brand',
            slug: slug,
        }
        dispatch(fetchActivities(formData))
    }, [dispatch, activityPage])

    const fetchMoreActivity = () => {
        setActivityPage(activityPage + 1)
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
            noti.notify('Please choose up to 10 media.', 'danger')
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
                noti.notify('You can upload only one video.', 'danger')
                return false;
            } else {
                if(videoSize?.video?.size === 'GB' || videoSize?.video?.size === 'TB' || videoSize?.video?.size === 'PB' || videoSize?.video?.size === 'EB' || videoSize?.video?.size === 'ZB' || videoSize?.video?.size === 'YB'){
                    noti.notify('Max video file limit is 256 MB.', 'danger')
                    return false;
                } else {
                    if(videoSize?.video?.size === 'MB' && videoSize?.video?.value > 256.05) {
                        noti.notify('Max video file limit is 256 MB.', 'danger')
                        return false;
                    }
                }
            }
            if(imageSize?.image?.size === 'GB' || imageSize?.image?.size === 'TB' || imageSize?.image?.size === 'PB' || imageSize?.image?.size === 'EB' || imageSize?.image?.size === 'ZB' || imageSize?.image?.size === 'YB'){
                noti.notify('Max image file limit is 5 MB.', 'danger')
                return false;
            } else {
                if(imageSize?.image?.size === 'MB' && imageSize?.image?.value > 5.05) {
                    noti.notify('Max image file limit is 5 MB.', 'danger')
                    return false;
                }
            }
            setSelectedMediaFile((previousMediaFile) => previousMediaFile.concat(imagesArray));
            let f = event.target.files;
            let sf = attachments;
            for(let i=0; i<event.target.files.length; i++){
                setAttachments((prevfiles)=>[...prevfiles,event.target.files[i]])
            }
            console.log("event.target.files", event.target.files);
            console.log("attachments", attachments);
        }
    }
    function deleteHandler(selectedIndex, selectedFile, selectedId) {
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
        if (Object.keys(copiedAttachment).length === 0 && activityComment === '') {
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
    
    const postContentHandler = (event) => {
        const { value } = event.target
        setActivityComment(value)
        if (value !== '' || Object.keys(selectedMediaFile).length > 0) {
            setIsEnable(false)
        } else {
            setIsEnable(true)
        }
    }
    const submitPost = async () => {
        if (activityComment != '' || Object.keys(attachments).length > 0) {
            setIsEnable(true)
        setIsPostLoading(true)
        let formData = new FormData()
        formData.append('type', 1)
        formData.append('post', activityComment)
        formData.append('attachableType', 'post')
        for (const key of Object.keys(attachments)) {
            formData.append('attachment', attachments[key])
        }
        const response = await Rest.axiosRequest(
            API.postActivity,
            formData,
            'POST',
            true,
        )
        if (response.status === 201) {
            setIsPostLoading(false)
            noti.notify(response.data.message, 'success')
            const activity = response.data.data;
            // console.log([activity, ...activities])
            // setActivities([activity, ...activities]);
            dispatch(addActivity(activity));
            resetPostForm()
        } else {
            setIsPostLoading(false)
            noti.notify('Something went wrong!', 'danger')
            }
        } else {
            setIsEnable(false)
        }
    }
    useEffect(() => {
        getReviews()
    }, [])
    const resetPostForm = () => {
        // console.log('resetPostForm')
        setActivityComment('')
        setAttachments([])
        setSelectedMediaFile([])
        setIsEnable(true)
    }
    return (
        <>
            <Meta
                title={
                    brandDetails.brandName
                        ? brandDetails.brandName + ` | ${APP_NAME}`
                        : ''
                }
                keyword={''}
                description={''}
            />
            <section className="bg-black p-27-0-55">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="m-l-r-30">
                                <div className="box-dark mb-30 overflow-hidden">
                                    <ul className="d-flex justify-start flex-wrap">
                                        <li className="logo-box d-flex justify-content-center align-items-center ">
                                            <Figure className="mb-0 figure-circle figure-green-2 figure-120">
                                                <Figure.Image
                                                    src={ASSETS_URL + brandDetails.brandLogo}
                                                    className="cover circle"
                                                />
                                            </Figure>
                                        </li>
                                        <li className="seller-detail-wrap">
                                            <ul>
                                                <li className="seller-infor">
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div>
                                                            <h5 className="fs-24 fw-600 color-22a612 mb-2">
                                                                {Helper.niceString(
                                                                    brandDetails.brandName,
                                                                    90,
                                                                    true,
                                                                )}
                                                            </h5>
                                                            <ul className="inline-listing">
                                                                {(brandDetails.brandWebsite && 
                                                                    <li>
                                                                        <a
                                                                            href={brandDetails.brandWebsite ?? ''}
                                                                            target="_blank"
                                                                            className="fs-14 fw-500 color-0598ff text-decoration-none"
                                                                        >
                                                                            {
                                                                                <>
                                                                                    <i className="icon-globe"></i>
                                                                                    {Helper.niceString(
                                                                                        brandDetails.brandWebsite,
                                                                                        20,
                                                                                    )}
                                                                                </>
                                                                            }{' '}
                                                                            {!showSkeleton ? (
                                                                                brandDetails.brandWebsite ? (
                                                                                    <FontAwesomeIcon
                                                                                        icon={faExternalLink}
                                                                                    />
                                                                                ) : null
                                                                            ) : null}
                                                                        </a>
                                                                    </li>
                                                                )}
                                                                <li>
                                                                    <a
                                                                        onClick={downloadLicense}
                                                                        className="fs-15 fw-600 color-22a612 text-decoration-none"
                                                                    >
                                                                        <i className="icon-pdf-download"></i>
                                                                        <span className="text-decoration-underline">
                                                                            Operating Licenses
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        {!isLoggedIn
                                                            ? <Link href={`/sign-in`}>
                                                                <a className="btn-wh-150-46 btn btn-primary br-30 position-static top-0 end-0 me-sm-3 mx-auto" style={{ transform: "none" }}><span className='fs-20 v-align-middle'><i className="icon icon-add-friend"></i></span> Follow</a>
                                                            </Link>
                                                            :
                                                            isLoggedIn && getSingle('userId') !== brandDetails.userId && (
                                                                <a
                                                                    className="btn-wh-150-46 btn btn-primary br-30 position-static top-0 end-0 me-sm-3 mx-auto"
                                                                    style={{ transform: 'none' }}
                                                                    onClick={handleFollow}
                                                                >
                                                                    <span>
                                                                        <i className="icon icon-add-friend"></i>
                                                                    </span>{' '}
                                                                    {followStatus}
                                                                </a>
                                                            )}
                                                    </div>
                                                    {!isLoggedIn
                                                        ? <Link href={`/sign-in`}>
                                                            <a className="btn-wh-150-46 btn btn-secondary br-30"><span className='fs-20 v-align-middle'><FontAwesomeIcon icon={faCommentDots} /></span> Message</a>
                                                        </Link>
                                                        :
                                                        (isLoggedIn && getSingle('role') !== '2' ?
                                                            <a
                                                                className="btn-wh-150-46 btn btn-secondary br-30"
                                                                onClick={handleMessage}
                                                            >
                                                                <span>
                                                                    <FontAwesomeIcon icon={faCommentDots} />
                                                                </span>{' '}
                                                                Message
                                                            </a>
                                                            : null)
                                                    }
                                                </li>
                                                <li>
                                                    <ul className="listing-33p">
                                                        <li>
                                                            <>
                                                                <span className="color-777777 fs-14 fw-500 text-center d-block">
                                                                    State
                                                                </span>
                                                                <p className="fs-18 fw-600 color-white mb-0 text-center">
                                                                    {brandDetails.state}
                                                                </p>
                                                            </>
                                                        </li>
                                                        <li>
                                                            <>
                                                                <span className="color-777777 fs-14 fw-500 text-center d-block">
                                                                    Year Founded
                                                                </span>
                                                                <p className="fs-18 fw-600 color-white mb-0 text-center">
                                                                    {brandDetails.year ?? 'N/A'}
                                                                </p>
                                                            </>
                                                        </li>
                                                        <li>
                                                            <>
                                                                <span className="color-777777 fs-14 fw-500 text-center d-block">
                                                                    Average order per month
                                                                </span>
                                                                <p className="fs-18 fw-600 color-white mb-0 text-center">
                                                                    {brandDetails.avgOrder}
                                                                </p>
                                                            </>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="listing-33p rating-listing">
                                        <li>
                                            {
                                                followersCount > 0
                                                    ?
                                                    <Link href={'/followers/' + brandDetails.userSlug}>
                                                        <a>
                                                            <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">
                                                                Followers
                                                            </span>
                                                            <p className="fs-16 fw-500 color-white mb-0 text-center">
                                                                {followersCount}
                                                            </p>
                                                        </a>
                                                    </Link>
                                                    :
                                                    <div>
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">
                                                            Followers
                                                        </span>
                                                        <p className="fs-16 fw-500 color-white mb-0 text-center">
                                                            {followersCount}
                                                        </p>
                                                    </div>
                                            }
                                        </li>
                                        <li>
                                            {
                                                followingsCount > 0
                                                    ?
                                                    <Link href={'/following/' + brandDetails.userSlug}>
                                                        <a>
                                                            <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">
                                                                Following
                                                            </span>
                                                            <p className="fs-16 fw-500 color-white mb-0 text-center">
                                                                {followingsCount}
                                                            </p>
                                                        </a>
                                                    </Link>
                                                    :
                                                    <div>
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">
                                                            Following
                                                        </span>
                                                        <p className="fs-16 fw-500 color-white mb-0 text-center">
                                                            {followingsCount}
                                                        </p>
                                                    </div>
                                            }
                                        </li>
                                        <li>
                                            <span className="fs-16 fw-500 color-white d-block mb-6 text-center">
                                                Brand Scrore
                                            </span>
                                            <p className="mb-0 text-center">
                                                <span className="color-22a612">
                                                    <FontAwesomeIcon icon={faStar} />
                                                </span>
                                                <span className="fs-20 fw-600 color-22a612 m-l-10">
                                                    {brandDetails.avgRating}/15
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <Card className="card-dark border-gray mb-30 overflow-hidden">
                                    <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">
                                        Description
                                    </Card.Header>
                                    <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09 p-20-20-30-20">
                                        {brandDetails.description}
                                    </Card.Body>
                                </Card>
                                <div className="custom-tabs">
                                    <Tabs defaultActiveKey="product">
                                        <Tab eventKey="product" title="Product">
                                            <div className="table-wrap br-t-l-0 br-t-r-0">
                                                {/* <Table bordered hover variant="dark" id="seller_detail"> */}
                                                <ResponsiveTable
                                                    className="table table-bordered table-hover table-dark"
                                                    id="seller_detail"
                                                >
                                                    <Thead>
                                                        {
                                                            <Tr>
                                                                <Th width="180px;">Product Name</Th>
                                                                <Th className="text-center" width="180px;">
                                                                    Category
                                                                </Th>
                                                                <Th className="text-center" width="130px;">
                                                                    Med/Rec
                                                                </Th>
                                                                {/* <Th className="text-center" width="110px;">Price Per lb</Th> */}
                                                                <Th className="text-center" width="100px;">
                                                                    Stain
                                                                </Th>
                                                                <Th className="text-center" width="100px;">
                                                                    THC%
                                                                </Th>
                                                                <Th width="160px;">Dominant Terpene</Th>
                                                                <Th className="text-center" width="100px;">
                                                                    I/O
                                                                </Th>
                                                                <Th className="text-center" width="140px;">
                                                                    Harvested
                                                                </Th>
                                                                <Th className="text-center" width="110px;">Unit Size</Th>
                                                            </Tr>
                                                        }
                                                    </Thead>
                                                    <Tbody>
                                                        {products.length > 0 ? (
                                                            products.map((rowData, keyIndex) => (
                                                                <Tr key={keyIndex + 'product'}>
                                                                    <Td>
                                                                        <Link href={'/product/' + rowData.slug}>
                                                                            <a className="color-f3772c d-inline-block">
                                                                                <OverlayTrigger placement="top" overlay={<Tooltip>{rowData?.title}</Tooltip>}>
                                                                                    <div>
                                                                                        {Helper.niceString(rowData?.title, 15)}                                                                                
                                                                                    </div>
                                                                                </OverlayTrigger>
                                                                            </a>
                                                                        </Link>
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        <Link href="#">
                                                                            <a className="color-white text-decoration-none">
                                                                                {rowData.category?.title}
                                                                            </a>
                                                                        </Link>
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        {rowData.medRec?.title}
                                                                    </Td>
                                                                    {/* <Td className="text-center">{rowData.productPrice}</Td> */}
                                                                    <Td className="text-center">
                                                                        {rowData.strain?.title}
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        {rowData?.thc}%
                                                                    </Td>
                                                                    <Td>
                                                                        {Helper.niceString(rowData.dominant, 15)}
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        {rowData.io?.title}
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        {rowData.niceHarvested}
                                                                    </Td>
                                                                    <Td className="text-center">{rowData.unit}</Td>
                                                                </Tr>
                                                            ))
                                                        ) : (
                                                            <Tr>
                                                                <Td className="text-center" colSpan={10}>
                                                                    No records found!
                                                                </Td>
                                                            </Tr>
                                                        )}
                                                    </Tbody>
                                                </ResponsiveTable>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="activity" title="Activity">
                                            <Card className="p-0 bg-transparent bs-none border-0">
                                                <Card.Body className="p-0">
                                                    <Row>
                                                        <Col lg={11} className="mx-auto">
                                                            {getSingle('userId') === brandDetails.userId ? (
                                                                <ActivityPost
                                                                    activityComment={activityComment}
                                                                    attachments={attachments}
                                                                    attachmentsHandler={attachmentsHandler}
                                                                    postContentHandler={postContentHandler}
                                                                    submitPost={submitPost}
                                                                    userImage={userImage}
                                                                    isPostLoading={isPostLoading}
                                                                    selectedMediaFile={selectedMediaFile}
                                                                    isMediaEnable={isMediaEnable}
                                                                    isEnable={isEnable}
                                                                    deleteHandler={deleteHandler}
                                                                />
                                                            ) : null}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={11} className="mx-auto">
                                                            <ActivityList
                                                                activities={activities}
                                                                totalActivities={totalActivities}
                                                                fetchMoreActivity={fetchMoreActivity}
                                                                handleShow={handleShow}
                                                                handleShowCommentModal={handleShowCommentModal}
                                                                likesClickHandler={likesClickHandler}
                                                                repostsClickhandler={repostsClickhandler}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Tab>
                                        <Tab eventKey="review" title="Review">
                                            <div className="box-dark mb-30 overflow-hidden">
                                                <ul className="listing-33p rating-listing">
                                                    <li className="ps-xl-5">
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6">
                                                            Product Quality
                                                        </span>
                                                        <p className="mb-0">
                                                            <span className="color-22a612">
                                                                {' '}
                                                                <FontAwesomeIcon icon={faStar} />
                                                            </span>
                                                            <span className="star-count">
                                                                {brandDetails.avgProductRating}/5
                                                            </span>
                                                            <span className="fs-14 fw-300 color-white">
                                                                ({brandDetails.reviewsProductCount} Reviews)
                                                            </span>
                                                        </p>
                                                    </li>
                                                    <li className="ps-xl-5">
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6">
                                                            Delivers on Times
                                                        </span>
                                                        <p className="mb-0">
                                                            <span className="color-22a612">
                                                                <FontAwesomeIcon icon={faStar} />
                                                            </span>
                                                            <span className="star-count">
                                                                {brandDetails.avgDOTRating}/5
                                                            </span>
                                                            <span className="fs-14 fw-300 color-white">
                                                                ({brandDetails.reviewsDOTCount} Reviews)
                                                            </span>
                                                        </p>
                                                    </li>
                                                    <li className="ps-xl-5">
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6">
                                                            General
                                                        </span>
                                                        <p className="mb-0">
                                                            <span className="color-22a612">
                                                                <FontAwesomeIcon icon={faStar} />
                                                            </span>
                                                            <span className="star-count">
                                                                {brandDetails.avgGeneralRating}/5
                                                            </span>
                                                            <span className="fs-14 fw-300 color-white">
                                                                ({brandDetails.reviewsGeneralCount} Reviews)
                                                            </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="custom-tabs">
                                                <Tabs defaultActiveKey="product" id="uncontrolled-tab">
                                                    <Tab eventKey="product" title="Product Quality">
                                                        <ul className="comment-listing">
                                                            {isLoading ? (
                                                                [...Array(5)].map((d, index) => {
                                                                    return (
                                                                        <li className="comment-wrap" key={index}>
                                                                            <Figure className="mb-0 w-60 h-60 br-50p">
                                                                                <SkeletonTheme
                                                                                    baseColor={SkeletonOptions.baseColor}
                                                                                    highlightColor={
                                                                                        SkeletonOptions.highlightColor
                                                                                    }
                                                                                >
                                                                                    <Skeleton width={60} height={60} />
                                                                                </SkeletonTheme>
                                                                            </Figure>
                                                                            <div className="comment-detail">
                                                                                <h5 className="fs-16 fw-600 color-white mb-0">
                                                                                    {isLoading ? (
                                                                                        <SkeletonTheme
                                                                                            baseColor={
                                                                                                SkeletonOptions.baseColor
                                                                                            }
                                                                                            highlightColor={
                                                                                                SkeletonOptions.highlightColor
                                                                                            }
                                                                                        >
                                                                                            <Skeleton width={250} />
                                                                                        </SkeletonTheme>
                                                                                    ) : (
                                                                                        <>
                                                                                            'Tina Lee'{' '}
                                                                                            <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                                <FontAwesomeIcon
                                                                                                    icon={faCalendarAlt}
                                                                                                />{' '}
                                                                                                11 Jan'22
                                                                                            </date>
                                                                                        </>
                                                                                    )}
                                                                                </h5>
                                                                                {isLoading ? (
                                                                                    <SkeletonTheme
                                                                                        baseColor={
                                                                                            SkeletonOptions.baseColor
                                                                                        }
                                                                                        highlightColor={
                                                                                            SkeletonOptions.highlightColor
                                                                                        }
                                                                                    >
                                                                                        <Skeleton
                                                                                            width={250}
                                                                                            className="product-rating"
                                                                                        />
                                                                                    </SkeletonTheme>
                                                                                ) : (
                                                                                    <p className="product-rating">
                                                                                        Product Quality{' '}
                                                                                        <span>
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                        </span>
                                                                                    </p>
                                                                                )}
                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">
                                                                                    {isLoading ? (
                                                                                        <SkeletonTheme
                                                                                            baseColor={
                                                                                                SkeletonOptions.baseColor
                                                                                            }
                                                                                            highlightColor={
                                                                                                SkeletonOptions.highlightColor
                                                                                            }
                                                                                        >
                                                                                            <Skeleton count={5} />
                                                                                        </SkeletonTheme>
                                                                                    ) : (
                                                                                        'dummy text'
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            ) : (
                                                                <>
                                                                    <InfiniteScroll
                                                                        dataLength={productQuality.length}
                                                                        next={fetchMoreData}
                                                                        hasMore={hasMore}
                                                                        loader={
                                                                            isLoading
                                                                                ? [...Array(3)].map(
                                                                                    (elementInArray, index) => (
                                                                                        <Card key={index}>
                                                                                            <Card.Header>
                                                                                                <Row>
                                                                                                    <Col>
                                                                                                        <SkeletonTheme
                                                                                                            height={25}
                                                                                                            width={200}
                                                                                                            baseColor={
                                                                                                                SkeletonOptions.baseColor
                                                                                                            }
                                                                                                            highlightColor={
                                                                                                                SkeletonOptions.highlightColor
                                                                                                            }
                                                                                                        >
                                                                                                            <Skeleton />
                                                                                                        </SkeletonTheme>
                                                                                                    </Col>
                                                                                                    <Col>
                                                                                                        <SkeletonTheme
                                                                                                            height={25}
                                                                                                            width={200}
                                                                                                            baseColor={
                                                                                                                SkeletonOptions.baseColor
                                                                                                            }
                                                                                                            highlightColor={
                                                                                                                SkeletonOptions.highlightColor
                                                                                                            }
                                                                                                        >
                                                                                                            <Skeleton />
                                                                                                        </SkeletonTheme>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </Card.Header>
                                                                                        </Card>
                                                                                    ),
                                                                                )
                                                                                : null
                                                                        }
                                                                    >
                                                                        <>
                                                                            {productQuality.length > 0 ? (
                                                                                productQuality.map(
                                                                                    (rowData, keyIndex) => (
                                                                                        <li
                                                                                            key={keyIndex + 'rview'}
                                                                                            className="comment-wrap"
                                                                                        >
                                                                                            <Figure className="mb-0 w-60 h-60 br-50p border-white-2">
                                                                                                <Figure.Image
                                                                                                    src={
                                                                                                        ASSETS_URL +
                                                                                                        (rowData.retailer
                                                                                                            .profilePath ??
                                                                                                            '/profile/no-profile-image.jpg')
                                                                                                    }
                                                                                                    className="cover circle"
                                                                                                />
                                                                                            </Figure>
                                                                                            <div className="comment-detail">
                                                                                                <h5 className="fs-16 fw-600 color-white mb-0">
                                                                                                    {rowData.retailer.fullName}{' '}
                                                                                                    <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                                        <FontAwesomeIcon
                                                                                                            icon={faCalendarAlt}
                                                                                                        />{' '}
                                                                                                        {moment(
                                                                                                            rowData.createdAt,
                                                                                                        ).format(customFormat)}
                                                                                                    </date>
                                                                                                </h5>
                                                                                                <p className="product-rating">
                                                                                                    Product Quality
                                                                                                    <span>
                                                                                                        <ReactStars
                                                                                                            count={5}
                                                                                                            size={13}
                                                                                                            value={rowData.ratings}
                                                                                                            isHalf={true}
                                                                                                            emptyIcon={
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        color: '#8c8c8c',
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {' '}
                                                                                                                    <i className="fas fa-star" />
                                                                                                                </div>
                                                                                                            }
                                                                                                            halfIcon={
                                                                                                                <i className="fa fa-star-half-alt" />
                                                                                                            }
                                                                                                            filledIcon={
                                                                                                                <i className="fa fa-star" />
                                                                                                            }
                                                                                                            activeColor="#22a612"
                                                                                                            edit={false}
                                                                                                        />
                                                                                                    </span>
                                                                                                </p>
                                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">
                                                                                                    {rowData.description}
                                                                                                </p>
                                                                                            </div>
                                                                                        </li>
                                                                                    ),
                                                                                )
                                                                            ) : (
                                                                                <div className="text-center">
                                                                                    {' '}
                                                                                    No records found!{' '}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    </InfiniteScroll>
                                                                </>
                                                            )}
                                                        </ul>
                                                    </Tab>
                                                    <Tab eventKey="deliveryTime" title="Delivery On Time">
                                                        <ul className="comment-listing">
                                                            {isLoading ? (
                                                                [...Array(5)].map((d, index) => {
                                                                    return (
                                                                        <li
                                                                            className="comment-wrap"
                                                                            key={index + 'dot'}
                                                                        >
                                                                            <Figure className="mb-0 w-60 h-60 br-50p">
                                                                                <SkeletonTheme
                                                                                    baseColor={SkeletonOptions.baseColor}
                                                                                    highlightColor={
                                                                                        SkeletonOptions.highlightColor
                                                                                    }
                                                                                >
                                                                                    <Skeleton width={60} height={60} />
                                                                                </SkeletonTheme>
                                                                            </Figure>
                                                                            <div className="comment-detail">
                                                                                <h5 className="fs-16 fw-600 color-white mb-0">
                                                                                    {isLoading ? (
                                                                                        <SkeletonTheme
                                                                                            baseColor={
                                                                                                SkeletonOptions.baseColor
                                                                                            }
                                                                                            highlightColor={
                                                                                                SkeletonOptions.highlightColor
                                                                                            }
                                                                                        >
                                                                                            <Skeleton width={250} />
                                                                                        </SkeletonTheme>
                                                                                    ) : (
                                                                                        <>
                                                                                            'Tina Lee'{' '}
                                                                                            <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                                <FontAwesomeIcon
                                                                                                    icon={faCalendarAlt}
                                                                                                />{' '}
                                                                                                11 Jan'22
                                                                                            </date>
                                                                                        </>
                                                                                    )}
                                                                                </h5>
                                                                                {isLoading ? (
                                                                                    <SkeletonTheme
                                                                                        baseColor={
                                                                                            SkeletonOptions.baseColor
                                                                                        }
                                                                                        highlightColor={
                                                                                            SkeletonOptions.highlightColor
                                                                                        }
                                                                                    >
                                                                                        <Skeleton
                                                                                            width={250}
                                                                                            className="product-rating"
                                                                                        />
                                                                                    </SkeletonTheme>
                                                                                ) : (
                                                                                    <p className="product-rating">
                                                                                        Product Quality{' '}
                                                                                        <span>
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                        </span>
                                                                                    </p>
                                                                                )}
                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">
                                                                                    {isLoading ? (
                                                                                        <SkeletonTheme
                                                                                            baseColor={
                                                                                                SkeletonOptions.baseColor
                                                                                            }
                                                                                            highlightColor={
                                                                                                SkeletonOptions.highlightColor
                                                                                            }
                                                                                        >
                                                                                            <Skeleton count={5} />
                                                                                        </SkeletonTheme>
                                                                                    ) : (
                                                                                        'dummy text'
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            ) : (
                                                                <>
                                                                    <InfiniteScroll
                                                                        dataLength={deliveryTime.length}
                                                                        next={fetchMoreData}
                                                                        hasMore={hasMore}
                                                                        loader={
                                                                            isLoading
                                                                                ? [...Array(3)].map(
                                                                                    (elementInArray, index) => (
                                                                                        <Card
                                                                                            key={index + 'infiniteScroll'}
                                                                                        >
                                                                                            <Card.Header>
                                                                                                <Row>
                                                                                                    <Col>
                                                                                                        <SkeletonTheme
                                                                                                            height={25}
                                                                                                            width={200}
                                                                                                            baseColor={
                                                                                                                SkeletonOptions.baseColor
                                                                                                            }
                                                                                                            highlightColor={
                                                                                                                SkeletonOptions.highlightColor
                                                                                                            }
                                                                                                        >
                                                                                                            <Skeleton />
                                                                                                        </SkeletonTheme>
                                                                                                    </Col>
                                                                                                    <Col>
                                                                                                        <SkeletonTheme
                                                                                                            height={25}
                                                                                                            width={200}
                                                                                                            baseColor={
                                                                                                                SkeletonOptions.baseColor
                                                                                                            }
                                                                                                            highlightColor={
                                                                                                                SkeletonOptions.highlightColor
                                                                                                            }
                                                                                                        >
                                                                                                            <Skeleton />
                                                                                                        </SkeletonTheme>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </Card.Header>
                                                                                        </Card>
                                                                                    ),
                                                                                )
                                                                                : null
                                                                        }
                                                                    >
                                                                        <>
                                                                            {deliveryTime.length > 0 ? (
                                                                                deliveryTime.map(
                                                                                    (rowData, keyIndex) => (
                                                                                        <li
                                                                                            key={keyIndex + 'delivery'}
                                                                                            className="comment-wrap"
                                                                                        >
                                                                                            <Figure className="mb-0 w-60 h-60 br-50p border-white-2">
                                                                                                <Figure.Image
                                                                                                    src={
                                                                                                        ASSETS_URL +
                                                                                                        (rowData.retailer
                                                                                                            .profilePath ??
                                                                                                            '/profile/no-profile-image.jpg')
                                                                                                    }
                                                                                                    className="cover circle"
                                                                                                />
                                                                                            </Figure>
                                                                                            <div className="comment-detail">
                                                                                                <h5 className="fs-16 fw-600 color-white mb-0">
                                                                                                    {rowData.retailer.fullName}{' '}
                                                                                                    <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                                        <FontAwesomeIcon
                                                                                                            icon={faCalendarAlt}
                                                                                                        />{' '}
                                                                                                        {moment(
                                                                                                            rowData.createdAt,
                                                                                                        ).format(customFormat)}
                                                                                                    </date>
                                                                                                </h5>
                                                                                                <p className="product-rating">
                                                                                                    Delivery on Time{' '}
                                                                                                    <span>
                                                                                                        <ReactStars
                                                                                                            count={5}
                                                                                                            size={13}
                                                                                                            value={rowData.ratings}
                                                                                                            isHalf={true}
                                                                                                            emptyIcon={
                                                                                                                <div
                                                                                                                    style={{
                                                                                                                        color: '#8c8c8c',
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {' '}
                                                                                                                    <i className="fas fa-star" />
                                                                                                                </div>
                                                                                                            }
                                                                                                            halfIcon={
                                                                                                                <i className="fa fa-star-half-alt" />
                                                                                                            }
                                                                                                            filledIcon={
                                                                                                                <i className="fa fa-star" />
                                                                                                            }
                                                                                                            activeColor="#22a612"
                                                                                                            edit={false}
                                                                                                        />
                                                                                                    </span>
                                                                                                </p>
                                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">
                                                                                                    {rowData.description}
                                                                                                </p>
                                                                                            </div>
                                                                                        </li>
                                                                                    ),
                                                                                )
                                                                            ) : (
                                                                                <div className="text-center">
                                                                                    {' '}
                                                                                    No records found!{' '}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    </InfiniteScroll>
                                                                </>
                                                            )}
                                                        </ul>
                                                    </Tab>
                                                    <Tab eventKey="general" title="General">
                                                        <ul className="comment-listing">
                                                            {isLoading ? (
                                                                [...Array(5)].map((d, index) => {
                                                                    return (
                                                                        <li
                                                                            key={index + 'list'}
                                                                            className="comment-wrap"
                                                                        >
                                                                            <Figure className="mb-0 w-60 h-60 br-50p">
                                                                                <SkeletonTheme
                                                                                    baseColor={SkeletonOptions.baseColor}
                                                                                    highlightColor={
                                                                                        SkeletonOptions.highlightColor
                                                                                    }
                                                                                >
                                                                                    <Skeleton width={60} height={60} />
                                                                                </SkeletonTheme>
                                                                            </Figure>
                                                                            <div className="comment-detail">
                                                                                <h5 className="fs-16 fw-600 color-white mb-0">
                                                                                    {isLoading ? (
                                                                                        <SkeletonTheme
                                                                                            baseColor={
                                                                                                SkeletonOptions.baseColor
                                                                                            }
                                                                                            highlightColor={
                                                                                                SkeletonOptions.highlightColor
                                                                                            }
                                                                                        >
                                                                                            <Skeleton width={250} />
                                                                                        </SkeletonTheme>
                                                                                    ) : (
                                                                                        <>
                                                                                            'Tina Lee'{' '}
                                                                                            <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                                <FontAwesomeIcon
                                                                                                    icon={faCalendarAlt}
                                                                                                />{' '}
                                                                                                11 Jan'22
                                                                                            </date>
                                                                                        </>
                                                                                    )}
                                                                                </h5>
                                                                                {isLoading ? (
                                                                                    <SkeletonTheme
                                                                                        baseColor={
                                                                                            SkeletonOptions.baseColor
                                                                                        }
                                                                                        highlightColor={
                                                                                            SkeletonOptions.highlightColor
                                                                                        }
                                                                                    >
                                                                                        <Skeleton
                                                                                            width={250}
                                                                                            className="product-rating"
                                                                                        />
                                                                                    </SkeletonTheme>
                                                                                ) : (
                                                                                    <p className="product-rating">
                                                                                        Product Quality{' '}
                                                                                        <span>
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                            <FontAwesomeIcon icon={faStar} />
                                                                                        </span>
                                                                                    </p>
                                                                                )}
                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">
                                                                                    {isLoading ? (
                                                                                        <SkeletonTheme
                                                                                            baseColor={
                                                                                                SkeletonOptions.baseColor
                                                                                            }
                                                                                            highlightColor={
                                                                                                SkeletonOptions.highlightColor
                                                                                            }
                                                                                        >
                                                                                            <Skeleton count={5} />
                                                                                        </SkeletonTheme>
                                                                                    ) : (
                                                                                        'dummy text'
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            ) : (
                                                                <>
                                                                    <InfiniteScroll
                                                                        dataLength={general.length}
                                                                        next={fetchMoreData}
                                                                        hasMore={hasMore}
                                                                        loader={
                                                                            isLoading
                                                                                ? [...Array(3)].map(
                                                                                    (elementInArray, index) => (
                                                                                        <Card key={index + 'infi'}>
                                                                                            <Card.Header>
                                                                                                <Row>
                                                                                                    <Col>
                                                                                                        <SkeletonTheme
                                                                                                            height={25}
                                                                                                            width={200}
                                                                                                            baseColor={
                                                                                                                SkeletonOptions.baseColor
                                                                                                            }
                                                                                                            highlightColor={
                                                                                                                SkeletonOptions.highlightColor
                                                                                                            }
                                                                                                        >
                                                                                                            <Skeleton />
                                                                                                        </SkeletonTheme>
                                                                                                    </Col>
                                                                                                    <Col>
                                                                                                        <SkeletonTheme
                                                                                                            height={25}
                                                                                                            width={200}
                                                                                                            baseColor={
                                                                                                                SkeletonOptions.baseColor
                                                                                                            }
                                                                                                            highlightColor={
                                                                                                                SkeletonOptions.highlightColor
                                                                                                            }
                                                                                                        >
                                                                                                            <Skeleton />
                                                                                                        </SkeletonTheme>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                            </Card.Header>
                                                                                        </Card>
                                                                                    ),
                                                                                )
                                                                                : null
                                                                        }
                                                                    >
                                                                        <>
                                                                            {general.length > 0 ? (
                                                                                general.map((rowData, keyIndex) => (
                                                                                    <li
                                                                                        className="comment-wrap"
                                                                                        key={keyIndex + 'gen'}
                                                                                    >
                                                                                        <Figure className="mb-0 w-60 h-60 br-50p border-white-2">
                                                                                            <Figure.Image
                                                                                                src={
                                                                                                    ASSETS_URL +
                                                                                                    (rowData.retailer
                                                                                                        .profilePath ??
                                                                                                        '/profile/no-profile-image.jpg')
                                                                                                }
                                                                                                className="cover circle"
                                                                                            />
                                                                                        </Figure>
                                                                                        <div className="comment-detail">
                                                                                            <h5 className="fs-16 fw-600 color-white mb-0">
                                                                                                {rowData.retailer.fullName}{' '}
                                                                                                <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                                    <FontAwesomeIcon
                                                                                                        icon={faCalendarAlt}
                                                                                                    />{' '}
                                                                                                    {moment(
                                                                                                        rowData.createdAt,
                                                                                                    ).format(customFormat)}
                                                                                                </date>
                                                                                            </h5>
                                                                                            <p className="product-rating">
                                                                                                Professionalism{' '}
                                                                                                <span>
                                                                                                    <ReactStars
                                                                                                        count={5}
                                                                                                        size={13}
                                                                                                        value={rowData.ratings}
                                                                                                        isHalf={true}
                                                                                                        emptyIcon={
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    color: '#8c8c8c',
                                                                                                                }}
                                                                                                            >
                                                                                                                {' '}
                                                                                                                <i className="fas fa-star" />
                                                                                                            </div>
                                                                                                        }
                                                                                                        halfIcon={
                                                                                                            <i className="fa fa-star-half-alt" />
                                                                                                        }
                                                                                                        filledIcon={
                                                                                                            <i className="fa fa-star" />
                                                                                                        }
                                                                                                        activeColor="#22a612"
                                                                                                        edit={false}
                                                                                                    />
                                                                                                </span>
                                                                                            </p>
                                                                                            <p className="fs-14 fw-300 color-white o-08 mt-6">
                                                                                                {rowData.description}
                                                                                            </p>
                                                                                        </div>
                                                                                    </li>
                                                                                ))
                                                                            ) : (
                                                                                <div className="text-center">
                                                                                    {' '}
                                                                                    No records found!{' '}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    </InfiniteScroll>
                                                                </>
                                                            )}
                                                        </ul>
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
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
        </>
    )
}

export default SellerDetails

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin')
    // if (!isLoggedIn) {
    //     return {
    //         redirect: { destination: '/' },
    //     }
    // }
    try {
        const { slug } = context.params
        let brandDetails = {}
        let products = []
        const token = contextCookie(context, 'token')
        const userImage = contextCookie(context, 'userImage')
        const response = await Rest.axiosRequest(
            API.brandDetails + `/${slug}`,
            {},
            'GET',
            false,
            token,
        )
        if (response.status === 200) {
            brandDetails = {
                brandName: response.data.data.brandData.brandName ?? '',
                brandWebsite: response.data.data.brandData.website ?? '',
                brandLogo:
                    response.data.data.brandData.user.profilePath ??
                    'uploads/profile/seller-default.png',
                state: response.data.data.brandData.user.states.name ?? '',
                year: response.data.data.brandData.year ?? '',
                avgOrder: response.data.data.brandData.avgOrder ?? 0,
                avgProductRating: response.data.data.brandData.avgProductRating ?? 0,
                avgDOTRating: response.data.data.brandData.avgDOTRating ?? 0,
                avgGeneralRating: response.data.data.brandData.avgGeneralRating ?? 0,
                avgRating: response.data.data.brandData.avgRating ?? 0,
                description: response.data.data.brandData.description ?? '',
                // reviewsCount: response.data.data.brandData.reviewsCount ?? 0,
                reviewsDOTCount: response.data.data.brandData.reviewsDOTCount ?? 0,
                reviewsGeneralCount:
                    response.data.data.brandData.reviewsGeneralCount ?? 0,
                reviewsProductCount:
                    response.data.data.brandData.reviewsProductCount ?? 0,
                licensePath: response.data.data.brandData.user.licensePath ?? '',
                canMessage: response.data.data.brandData.canMessage ?? '',
                userSlug: response.data.data.brandData.user.slug ?? '',
                userId: response.data.data.brandData.user.id ?? '',
                userFollowed: isLoggedIn ? (response.data.data.brandData.userFollowed ?? false) : false,
                followersCount:
                    response.data.data.brandData.user?.followers?.length ?? 0,
                followingsCount:
                    response.data.data.brandData.user?.followings?.length ?? 0,
            }
            products = response.data.data.products ?? []
        } else {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                isLoggedIn,
                brandDetails,
                products,
                userImage,
            },
        }
    } catch (e) {
        console.log(e.message)
        return {
            redirect: { destination: '/500' },
        }
    }
}
