import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Figure, ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrow, faArrowLeft, } from '@fortawesome/free-solid-svg-icons';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Meta from '../components/Meta';
import { APP_NAME, ASSETS_URL } from '../config/server.config';
import { contextCookie, getSingle } from '../services/Auth'
import ActivityPost from '../services/ActivityPost'
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, fetchAxisPointPost, handleOnComment, resetActivities } from '../app/slices/activitiesSlice';
import ActivityList from '../components/ActivityList';
import Rest from '../config/rest.config';
import API from '../config/endpoints.config';
import Notifier from '../components/Notifier'
import LightboxModal from '../components/LightboxModal';
import RepostModal from '../components/RepostModal';
import LikeModal from '../components/LikeModal';
import CommentModal from '../components/CommentModal';
import { showModal } from '../app/slices/commentSlice'
import { fetchUserById } from '../app/slices/userSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import Scrollbars from "react-custom-scrollbars";
import { fetchUsersWiseCompany, resetCompanies } from '../app/slices/companySlice';
import CompanyList from '../components/CompanyList';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Link from 'next/link';
const baseColor = "#202020";
const highlightColor = "#444";

function AxisPoint({ isLoggedIn, userImage }) {
    const noti = new Notifier();
    // const userImage = getSingle('userImage');
    const dispatch = useDispatch();

    const [activityPage, setActivityPage] = useState(0)
    const [companyPage, setCompanyPage] = useState(0)
    const activities = useSelector(state => state.activities.activities);
    const { companies, totalCompanies } = useSelector(state => state.company);
    const { user, followersCount, followingsCount, userSlug } = useSelector(state => state.user);
    const totalActivities = useSelector(state => state.activities.totalActivites);
    const showActivityLoader = useSelector(state => state.activities.status)
    const [activityComment, setActivityComment] = useState('')
    const [attachments, setAttachments] = useState([])
    const [selectedMediaFile, setSelectedMediaFile] = useState([]);
    const [individualPostAttachments, setIndividualPostAttachments] = useState([])
    // LightBox Images
    const [show, setShow] = useState(false)
    const [isEnable, setIsEnable] = useState(true)
    const [isMediaEnable, setIsMediaEnable] = useState(false)
    const { isCommentModal } = useSelector((state) => state.comment)
    const [selectedPostId, setSelectedPostId] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPosted, setIsPosted] = useState(false)
    //RepostModal
    const [reposts, setReposts] = useState([])
    const [repostsPage, setRepostsPage] = useState(0)
    const [repostsCount, setRepostsCount] = useState(0)
    const [currentRepostPost, setCurrentRepostPost] = useState(null)
    const resetRepostModal = () => {
        setCurrentRepostPost(null)
        setReposts([])
        setRepostsPage(0)
        setRepostsCount(0)
    }
    const [showRepostModal, setShowRepostModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const repostsModalClose = () => { setShowRepostModal(false); resetRepostModal(); };
    const repostsModalShow = () => setShowRepostModal(true);
    const repostsClickhandler = (e, postUniqueId) => {
        setCurrentRepostPost(postUniqueId)
        repostsModalShow()
    }
    const fetchMoreReposts = () => {
        setRepostsPage(repostsPage + 1)
    }
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

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchUserById({ userId: getSingle('userId') }))
        }
        return () => { dispatch(resetActivities()) }
    }, [dispatch])

    const { createCommentStatus, postId, postCommentCount } = useSelector((state) => state.comment)

    useEffect(() => {
        if (createCommentStatus === 'succeeded') {
            dispatch(handleOnComment({ postId, postCommentCount }))
        }
    }, [dispatch, createCommentStatus])

    useEffect(() => {
        let formData = {
            page: activityPage,
            limit: 10,
        }
        dispatch(fetchAxisPointPost(formData))
    }, [dispatch, activityPage])

    useEffect(() => {
        if (isLoggedIn) {
            let formData = {
                page: companyPage,
                limit: 10,
            }
            setIsLoading(true)
            dispatch(fetchUsersWiseCompany(formData))
                .unwrap()
                .then((result) => {
                    if (result.status)
                        setIsLoading(false)
                    else
                        setIsLoading(false)
                })
                .catch((rejectedValueOrSerializedError) => {
                    setIsLoading(false)
                    noti.notify(rejectedValueOrSerializedError.message, 'danger')
                })
        }
    }, [dispatch, companyPage])

    useEffect(() => {
        return () => dispatch(resetCompanies())
    }, [dispatch])

    const fetchMoreCompanies = () => {
        setCompanyPage(companyPage + 1)
    }

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
        setIsEnable(false)
        setIsMediaEnable(false)
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
            console.log(response.data.message)
            noti.notify(response.data.message, 'success')
            const activity = response.data.data;
            // console.log([activity, ...activities])
            // setActivities([activity, ...activities]);
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
        setActivityComment('')
        setAttachments([])
        setSelectedMediaFile([])
        setIsEnable(true)
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
    //comment	
    const handleCloseCommentModal = () => dispatch(showModal({ modalStatus: false, modalType: 'comment' }));
    const handleShowCommentModal = async (postId) => {
        await setSelectedPostId(postId);
        await dispatch(showModal({ modalStatus: true, modalType: 'comment' }));
    };
    useEffect(()=>{
        console.log("use Effect attachement has been changes", attachments)
    },[attachments]);
    return <>
        <Meta
            title={
                `Axis Point | ${APP_NAME}`
            }
            keyword={''}
            description={''}
        />
        <section className="bg-black p-27-0-55">
            <Container>
                <Row>
                    <Col lg>
                        <Card className="card-dark card-post card-axis-point border-gray-1">
                            <Card.Header>
                                <div className="d-flex align-items-center">
                                    <h3 className="text-white fs-18 mb-0">Axis Point</h3>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                {isLoggedIn && <ActivityPost
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
                                />}
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

                    {isLoggedIn ?
                        <Col lg={3} className="mw-375">
                            <Card className="card-dark card-post bs-none border-gray-1 mb-4">
                                <Card.Body className="p-3">
                                    <div className="text-center">
                                        <Figure className="figure-circle figure-gray-4 figure-100 figure mb-2">
                                            <img className="cover" src={ASSETS_URL + user?.profilePath ?? "/profile/no-profile-image.jpg"} alt="image" />
                                        </Figure>
                                        <h3 className="fs-20 fw-500 text-white">{user.businessName}</h3>
                                    </div>
                                    <hr></hr>
                                    <div>
                                        <ul className="listing-50p">
                                            <li className="border-end">
                                                {
                                                    followersCount > 0 ?
                                                        <Link href={'/followers/' + user.slug} legacyBehavior>

                                                            <span className="color-777777 fs-16 fw-500 text-center d-block">Followers</span>
                                                            <p className="fs-18 fw-600 color-white mb-0 text-center">{followersCount}</p>

                                                        </Link> :
                                                        <div>
                                                            <span className="color-777777 fs-16 fw-500 text-center d-block">Followers</span>
                                                            <p className="fs-18 fw-600 color-white mb-0 text-center">{followersCount}</p>
                                                        </div>
                                                }
                                            </li>
                                            <li>
                                                {
                                                    followingsCount > 0 ?
                                                        <Link href={'/following/' + user.slug} legacyBehavior>

                                                            <span className="color-777777 fs-16 fw-500 text-center d-block">Following</span>
                                                            <p className="fs-18 fw-600 color-white mb-0 text-center">{followingsCount}</p>

                                                        </Link> :
                                                        <div>
                                                            <span className="color-777777 fs-16 fw-500 text-center d-block">Following</span>
                                                            <p className="fs-18 fw-600 color-white mb-0 text-center">{followingsCount}</p>
                                                        </div>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className="card-dark card-post card-axis-point border-gray-1">
                                <Card.Header className="px-4">
                                    <h3 className="text-white fs-18 mb-0">Companies You May know</h3>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <ListGroup variant="flush" className="list-gray">
                                        {
                                            <div id="myScrollable" className='scroll-component' style={{ maxHeight: '450px', minHeight: '100px', overflow: "auto" }}>
                                            <InfiniteScroll
                                                dataLength={companies.length}
                                                next={fetchMoreCompanies}
                                                hasMore={totalCompanies > companies.length ? true : false}
                                                    scrollableTarget="myScrollable"
                                                    loader={
                                                        [...Array(8)].map((arrayData, aIndex) => {
                                                            return (
                                                                <div key={aIndex + "skeleton"} className="d-flex justify-content-between align-items-center px-5 list-group-item">
                                                                    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                                                                        <div className="d-flex align-items-center">
                                                                            <Skeleton circle={true} height={40} width={40} className="mb-0 me-3" />
                                                                            <Skeleton width={200} height={20} />
                                                                        </div>
                                                                        <Skeleton width={100} height={30} className="me-2" />
                                                                    </SkeletonTheme>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                            >

                                                {

                                                        isLoading ?
                                                            [...Array(10)].map((arrayData, index) => {
                                                                return (
                                                                    <div key={index + "skeleton-company"} className="d-flex justify-content-between align-items-center px-5 list-group-item">
                                                                        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                                                                            <div className="d-flex align-items-center">
                                                                                <Skeleton circle={true} height={40} width={40} className="mb-0 me-3" />
                                                                                <Skeleton width={200} height={20} />
                                                                            </div>
                                                                            <Skeleton width={100} height={30} className="me-2" />
                                                                        </SkeletonTheme>
                                                                    </div>
                                                                )
                                                            }) :
                                                            companies.length > 0 ?
                                                                companies.map((company, cIndex) => (
                                                                    <ListGroup.Item key={cIndex}>
                                                                        <CompanyList key={cIndex} company={company} />
                                                            </ListGroup.Item>
                                                        )) :
                                                        <ListGroup.Item className='text-center'>No records found!</ListGroup.Item>
                                                }
                                            </InfiniteScroll>
                                            </div>
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                        : null
                    }
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
    </>;
}
export default AxisPoint

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    const userImage = contextCookie(context, 'userImage');
    if (!isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: { isLoggedIn, userImage },
    };
}