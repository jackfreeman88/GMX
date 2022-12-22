import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Figure from 'react-bootstrap/Figure';
import { saveAs } from 'file-saver';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import { Helper } from '../../services/Helper';
import { contextCookie, getSingle } from '../../services/Auth';
import { ASSETS_URL, REACT_APP_API_BASE_URL } from '../../config/server.config';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActivityList from "../../components/ActivityList";
import { useRouter } from "next/router";
import { addActivity, fetchActivities, handleOnComment, resetActivities } from "../../app/slices/activitiesSlice";
import ActivityPost from '../../services/ActivityPost'
import RepostModal from '../../components/RepostModal';
import LightboxModal from '../../components/LightboxModal';
import LikeModal from '../../components/LikeModal'
import CommentModal from "../../components/CommentModal";
import Notifier from '../../components/Notifier'
import { showModal } from "../../app/slices/commentSlice";

const noti = new Notifier()

function RetailerDetails({ userImage, ...props }) {
    const dispatch = useDispatch();
    const follower = props.retailerData.follower;
    const router = useRouter()
    const { slug } = router.query
    const [followersCount, setFollowersCount] = useState(props.retailerData.followersCount);
    const [isFollowClicked, setIsFollowClicked] = useState(false);
    const [followStatus, setFollowStatus] = useState(follower?.isActive ? 'Following' : 'Follow');
    // Activity state
    const [activityPage, setActivityPage] = useState(0)
    const activities = useSelector(state => state.activities.activities);
    const totalActivities = useSelector(state => state.activities.totalActivites);
    const showActivityLoader = useSelector(state => state.activities.status)

    const [activityComment, setActivityComment] = useState('')
    const [attachments, setAttachments] = useState([]);
    const [selectedMediaFile, setSelectedMediaFile] = useState([]);
    const [isEnable, setIsEnable] = useState(true);
    const [isMediaEnable, setIsMediaEnable] = useState(false);
    const [individualPostAttachments, setIndividualPostAttachments] = useState([])
    const [show, setShow] = useState(false)
    const [showCommentModal, setShowCommentModal] = useState(false);
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
    const [openCommentBox, setOpenCommentBox] = useState(false);
    const fetchMoreReposts = () => {
        setRepostsPage(repostsPage + 1)
    }

    const handleFollow = async () => {
        setIsFollowClicked(true)
        let formData = {
            slug: props.retailerData.slug,
        };
        let response = await Rest.axiosRequest(API.follow, formData)
        response = response.data;
        if (response.status) {
            const follow = response.data.follow;
            setFollowStatus(follow ? "Following" : "Follow");
            setFollowersCount(follow ? ++followersCount : --followersCount);
        } else {
            noti.notify(response.message, "danger");
        }
        setIsFollowClicked(false)
    }
    const downloadFile = (filePath) => {
        saveAs(REACT_APP_API_BASE_URL + '/get/file' + filePath)
    }

    useEffect(() => {
        let formData = {
            page: activityPage,
            limit: 10,
            type: 'retailer',
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
        setActivityComment(value);
        if (value !== '' || Object.keys(selectedMediaFile).length > 0) {
            setIsEnable(false)
        } else {
            setIsEnable(true)
        }
    }
    const submitPost = async () => {
        if (activityComment != '' || Object.keys(attachments).length > 0) {
            let formData = new FormData()
            setIsEnable(false)
            setIsMediaEnable(false)
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
                console.log(response.data.message)
                noti.notify(response.data.message, 'success')
                const activity = response.data.data;
                dispatch(addActivity(activity));
                resetPostForm()
            } else {
                noti.notify('Something went wrong!', 'danger')
            }
        } else {
            setIsEnable(true)
        }
    }
    const resetPostForm = () => {
        console.log('resetPostForm')
        setActivityComment('');
        setAttachments([]);
        setSelectedMediaFile([]);
        setIsEnable(true);
    }


    useEffect(() => {
        return () => dispatch(resetActivities())
    }, [dispatch])

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
    const { createCommentStatus, postId, postCommentCount } = useSelector((state) => state.comment)

    useEffect(() => {
        if (createCommentStatus === 'succeeded') {
            dispatch(handleOnComment({ postId, postCommentCount }))
        }
    }, [dispatch, createCommentStatus])

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


    return (
        <>
            <section className="bg-black p-60-0">
                <Container>
                    <Row>
                        <Col lg={12} className="mx-auto">
                            <div className="m-l-r-30">
                                <div className="box-dark mb-30 overflow-hidden">
                                    <ul className="d-flex justify-start flex-wrap">
                                        <li className="logo-box d-flex justify-content-center align-items-center ">
                                            <Figure className="mb-0 figure-circle figure-green-2 figure-120">
                                                {
                                                    props.retailerData.profilePath ?
                                                        <Figure.Image src={ASSETS_URL + props.retailerData.profilePath} className='cover circle' />
                                                        : <Figure.Image src={ASSETS_URL + '/profile/no-profile-image.jpg'} className='cover circle' />
                                                }
                                            </Figure>
                                        </li>
                                        <li className="seller-detail-wrap">
                                            <ul>
                                                <li className="seller-infor">
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div>
                                                            <h5 className="fs-23 fw-600 color-f3772c">
                                                                <h5 className='fs-24 fw-600 color-f3772c mb-2'> {Helper.niceString(props.retailerData.fullName, 90, true)}</h5>
                                                            </h5>
                                                            <ul className="inline-listing">
                                                                <a className="fs-15 fw-600 color-22a612 text-decoration-none" onClick={() => downloadFile(props.retailerData.licensePath)}><i className="icon-pdf-download"></i><span className="text-decoration-underline">Operating Licenses</span></a>
                                                            </ul>
                                                        </div>
                                                        {!props.isLoggedIn
                                                            ?
                                                            <Link href={`/sign-in`}>
                                                                <a className="btn-wh-150-46 btn btn-primary br-30 position-static top-0 end-0 me-sm-3 mx-auto" style={{ transform: "none" }}><span className='fs-20 v-align-middle'><i className="icon icon-add-friend"></i></span> Follow</a>
                                                            </Link>
                                                            : props.isLoggedIn && props.retailerData.id !== getSingle('userId') &&
                                                            <a className="btn-wh-150-46 btn btn-primary br-30 position-static top-0 end-0 me-sm-3 mx-auto" style={{ transform: "none" }} onClick={handleFollow}><span><i className="icon icon-add-friend"></i></span> {followStatus}</a>
                                                        }
                                                    </div>
                                                    {!props.isLoggedIn ?
                                                        <Link href={`/sign-in`}>
                                                            <a className="btn-wh-150-46 btn btn-secondary br-30"><span className='fs-20 v-align-middle'><FontAwesomeIcon icon={faCommentDots} /></span> Message</a>
                                                        </Link>
                                                        : props.isLoggedIn && getSingle('role') !== '3' ?
                                                            <Link href={`/messages/${props.retailerData.slug}`}>
                                                                <a className="btn-wh-150-46 btn btn-secondary br-30"><span className='fs-20 v-align-middle'><FontAwesomeIcon icon={faCommentDots} /></span> Message</a>
                                                            </Link>
                                                            : null}
                                                </li>
                                                <li>
                                                    <ul className="listing-33p">
                                                        <li>
                                                            <span className="color-777777 fs-16 fw-600 text-center d-block">State</span>
                                                            <p className="fs-18 fw-600 color-white mb-0 text-center">{props.retailerData.state}</p>
                                                        </li>
                                                        <li>
                                                            <span className="color-777777 fs-16 fw-600 text-center d-block">Phone Number</span>
                                                            <p className="fs-18 fw-600 color-white mb-0 text-center">{props.retailerData.phoneNumber}</p>
                                                        </li>
                                                        <li>
                                                            <span className="color-777777 fs-16 fw-600 text-center d-block">Zipcode</span>
                                                            <p className="fs-18 fw-600 color-white mb-0 text-center">{props.retailerData.zipCode}</p>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="listing-50p rating-listing">
                                        <li className="p-3">
                                            {
                                                followersCount > 0 ? <Link href={'/followers/' + props.retailerData.slug}>
                                                    <a>
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">Followers</span>
                                                        <p className="fs-16 fw-500 color-white mb-0 text-center">{followersCount}</p>
                                                    </a>
                                                </Link>
                                                    :
                                                    <div>
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">Followers</span>
                                                        <p className="fs-16 fw-500 color-white mb-0 text-center">{followersCount}</p>
                                                    </div>
                                            }
                                        </li>
                                        <li className="p-3">
                                            {
                                                props.retailerData.followingsCount > 0 ?
                                                    <Link href={'/following/' + props.retailerData.slug}>
                                                        <a>
                                                            <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">Following</span>
                                                            <p className="fs-16 fw-500 color-white mb-0 text-center">{props.retailerData.followingsCount}</p>
                                                        </a>
                                                    </Link>
                                                    :
                                                    <div>
                                                        <span className="fs-16 fw-500 color-777777 d-block mb-6 text-center">Following</span>
                                                        <p className="fs-16 fw-500 color-white mb-0 text-center">{props.retailerData.followingsCount}</p>
                                                    </div>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Card className="card-dark card-post card-axis-point border-gray-1">
                                <Card.Header>
                                    <div className="d-flex align-items-center">
                                        <h3 className="text-white fs-18 fw-500 mb-0 py-1">Activity</h3>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col lg={11} className="mx-auto">
                                            {getSingle('userId') === props.retailerData.id ? (
                                                <ActivityPost
                                                    activityComment={activityComment}
                                                    attachments={attachments}
                                                    attachmentsHandler={attachmentsHandler}
                                                    deleteHandler={deleteHandler}
                                                    postContentHandler={postContentHandler}
                                                    submitPost={submitPost}
                                                    userImage={userImage}
                                                    isEnable={isEnable}
                                                    isMediaEnable={isMediaEnable}
                                                    selectedMediaFile={selectedMediaFile}
                                                />
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <ActivityList
                                        activities={activities}
                                        totalActivities={totalActivities}
                                        fetchMoreActivity={fetchMoreActivity}
                                        handleShow={handleShow}
                                        handleShowCommentModal={handleShowCommentModal}
                                        likesClickHandler={likesClickHandler}
                                        repostsClickhandler={repostsClickhandler}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section >
            <LightboxModal
                sliderIndex={activeIndex}
                images={individualPostAttachments}
                show={show}
                handleClose={handleClose}
            />
            <CommentModal
                showCommentModal={showCommentModal}
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

export default RetailerDetails;

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    try {
        const { slug } = context.params;
        const token = contextCookie(context, 'token');
        const userImage = contextCookie(context, 'userImage')
        const retailerDetails = await Rest.axiosRequest(API.retailerDetails + '/' + slug, {}, 'GET', false, token)
        const response = retailerDetails.data;
        if (response.status) {
            const retailerData = {
                fullName: response.data.fullName ?? '',
                profilePath: response.data.profilePath ?? '',
                phoneNumber: response.data.phoneNumber ?? '',
                zipCode: response.data.zipCode ?? '',
                state: response.data.states.name ?? '',
                licensePath: response.data.licensePath ?? '',
                slug: response.data.slug ?? '',
                id: response.data.id ?? 0,
                followersCount: response.data.followers.length ?? 0,
                followingsCount: response.data.followings.length ?? 0,
                follower: isLoggedIn ? (response.data.followers.find(follower => follower.followerId === contextCookie(context, 'userId')) ?? null) : null
            }
            return {
                props: {
                    retailerData,
                    isLoggedIn,
                    userImage
                }
            }
        } else {
            return {
                notFound: true
            };
        }
    } catch (e) {
        console.log('customer detail', e.message)
        return {
            redirect: {
                destination: '/orders'
            }
        }
    }
}