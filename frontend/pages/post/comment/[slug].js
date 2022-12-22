import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Figure, Form, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentReply, fetchReply, showModal } from '../../../app/slices/commentSlice';
import { ASSETS_URL } from '../../../config/server.config';
import { contextCookie } from '../../../services/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrow, faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player'
import { customFormat, dateTimeFormat } from '../../../services/Helper';
import LightboxModal from '../../../components/LightboxModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Notifier from '../../../components/Notifier';
import FormValidator from '../../../components/FormValidator';
import CommentModal from '../../../components/CommentModal';
import { roles } from '../../../services/Role';

export default function CommentDetails({ slug, userImage }) {
    // const validator = new FormValidator([
    //     {
    //         field: "username",
    //         method: "isEmpty",
    //         validWhen: false,
    //         message: "Please enter email address.",
    //     },
    //     {
    //         field: "password",
    //         method: "isEmpty",
    //         validWhen: false,
    //         message: "Please enter password.",
    //     }
    // ]);
    const dispatch = useDispatch()
    const router = useRouter();
    const notifier = new Notifier()
    const { replies, replyStatus } = useSelector((state) => state.comment)
    const [show, setShow] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [individualPostAttachments, setIndividualPostAttachments] = useState([])
    // const [replyData, setReplyData] = useState({
    //     commentReplyText: "",
    //     replyAttachment: [],
    // });
    const [commentReplyText, setCommentReplyText] = useState('')
    const [replyAttachment, setReplyAttachment] = useState([])
    const [selectedMediaFile, setSelectedMediaFile] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isMediaEnable, setIsMediaEnable] = useState(false)
    const refReplyAttachment = useRef(null);
    // const [submitted, setSubmitted] = useState(false)
    // const [validation, setValidation] = useState(validator.valid());
    const [selectedCommentId, setSelectedCommentId] = useState(0)
    const { isCommentModal } = useSelector((state) => state.comment)
    const [isEnable, setIsEnable] = useState(true)

    const handleCloseCommentModal = () => dispatch(showModal({ modalStatus: false, modalType: 'reply' }));
    const handleShowCommentModal = async (commentId) => {
        console.log('handleShowCommentModal');
        await setSelectedCommentId(commentId);
        await dispatch(showModal({ modalStatus: true, modalType: 'reply' }));
    };

    const handleClose = () => setShow(false)
    const handleShow = (value, index, id, type) => {
        setActiveIndex(index)
        setShow(true)
        if (type === 'comment') {
            setIndividualPostAttachments(replies[0].attachments)
        } else {
            let singleReply = replies[0].replies.find((replyData) => replyData.id === id)
            setIndividualPostAttachments(singleReply.attachments)
        }
    }
    const commentReplyHandler = (event) => {
        const { value } = event.target;
        setCommentReplyText(value)
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
            let sf = replyAttachment;
            // setAttachments((prevState)=>{
            //     return {...prevState, ...f};
            // })
            //setAttachments((prevState)=> ({prevState, ...f}))
            // setAttachments({ attachments, ...f });
            for(let i=0; i<event.target.files.length; i++){
                setReplyAttachment((prevfiles)=>[...prevfiles,event.target.files[i]])
                // let f = event.target.files[i];
                // setAttachments((prevfiles)=>({...prevfiles, ...f}))
            }
            console.log("event.target.files", event.target.files);
            console.log("replyAttachment", replyAttachment);
        }
        // if (event.target.files.length > 0) {
        //     setIsEnable(false)
        // } else {
        //     setIsEnable(true)
        // }
        // setReplyAttachment(event.target.files)
        // const selectedFiles = event.target.files;
        // const selectedFilesArray = Array.from(selectedFiles);
        // const imagesArray = selectedFilesArray.map((file, index) => {
        //     return {
        //         'previewFile': URL.createObjectURL(file),
        //         'type': file.type.substring(0, 5) === 'image' ? 'image' : 'video',
        //         'id': index,
        //     };
        // });
        // setSelectedMediaFile((previousMediaFile) => previousMediaFile.concat(imagesArray));
    }

    const deleteHandler = (selectedIndex, selectedFile, selectedId) => {
        setSelectedMediaFile(selectedMediaFile.filter((e, index) => index !== selectedIndex));
        const copiedAttachment = [ ...replyAttachment ];
        console.log("copiedAttachment", copiedAttachment);
        delete copiedAttachment[selectedId]
        const newFiles = []
        for(let i = 0; i < copiedAttachment.length; i++){
            if(copiedAttachment[i]) {
                newFiles.push(copiedAttachment[i])
            }    
        }
        console.log("newFiles", newFiles);
        setReplyAttachment(newFiles)
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
        // setSelectedMediaFile(selectedMediaFile.filter((e, index) => index !== selectedIndex));
        // const copiedAttachment = { ...replyAttachment };
        // delete copiedAttachment[selectedId]
        // setReplyAttachment(copiedAttachment)
        // if (Object.keys(copiedAttachment).length === 0 && commentReplyText === '') {
        //     setIsEnable(true)
        // } else {
        //     setIsEnable(false)
        // }
        // URL.revokeObjectURL(selectedFile);
    }
    const handleSubmit = async () => {
        // const validation = validator.validate(replyData)
        // setValidation(validation)
        // setSubmitted(true)
        // if (validation.isValid) {
        if (commentReplyText != '' || Object.keys(replyAttachment).length > 0) {
            setIsEnable(false)
            setIsMediaEnable(false)
        setIsLoading(true)
        let formData = new FormData()
        formData.append('commentId', replies[0].id)
        formData.append('reply', commentReplyText)
        for (const key of Object.keys(replyAttachment)) {
            formData.append('attachment', replyAttachment[key])
        }
        dispatch(createCommentReply(formData))
            .unwrap()
            .then((result) => {
                setIsLoading(false)
                setIsMediaEnable(false);
                if (result.status)
                    resetForm()
                    notifier.notify(result.message, 'success')
            })
            .catch((rejectedValueOrSerializedError) => {
                setIsLoading(false)
                setIsMediaEnable(false);
                notifier.notify(rejectedValueOrSerializedError.message, 'danger')
            })
        } else {
            setIsEnable(true)
        }
        // }
    }

    useEffect(() => {
        if (replyStatus === 'loading') {
            setIsLoading(true)
        } else if (replyStatus === 'succeeded') {
            dispatch(fetchReply({ 'commentUniqueId': slug }))
            setIsLoading(false)
        } else if (replyStatus === 'failed') {
            setIsLoading(false)
        }
    }, [replyStatus])

    useEffect(() => {
        dispatch(fetchReply({ 'commentUniqueId': slug }))
    }, [])

    function resetForm() {
        // console.log("resetForm");
        setCommentReplyText('')
        setReplyAttachment([])
        refReplyAttachment.current.value = null;
        setSelectedMediaFile([])
        setIsEnable(false)
        setIsMediaEnable(false);
    }
    // let checkValidation = submitted ? validator.validate(replyData) : validation

    return (
        <section className="bg-black p-27-0-55">
            <Container>
                <Row>
                    <Col lg={11} className="mx-auto">
                        <Card className="card-dark card-post">
                            <Card.Header>
                                <Link href='#'>
                                    <a className="d-flex align-items-center" onClick={() => router.back()}>
                                        <span className="text-white fs-20 me-3" >
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </span>
                                        <h3 className="text-white fs-18 mb-0">Comment</h3>
                                    </a>
                                </Link>
                            </Card.Header>
                            <Card.Body>
                                {
                            replies?.length > 0 &&
                            replies.map((commentData, cIndex) => (
                                <div key={"comment" + cIndex}>
                                    <Row >
                                        <Col sm="auto">
                                        <Figure className="figure figure-circle figure-gray-2 figure-62">
                                            <img className="cover" src={ASSETS_URL + commentData.user?.profilePath ?? "/profile/no-profile-image.jpg"} alt="profile" />
                                        </Figure>
                                        </Col>
                                        <Col>
                                            <div>
                                                <Link href={commentData.user?.role == roles.brand ? `/brand/${commentData.user.slug}` : `/customer/${commentData.user.slug}`}>
                                                    <a>
                                                        <h3 className="text-white fs-18">{commentData.user?.fullName}<span className="color-a5a5a5 fs-14 fw-normal ms-2">{dateTimeFormat(commentData.createdAt, 'DD MMM YYYY')}</span></h3>
                                                    </a>
                                                </Link>
                                                <p className="color-bfbfbf">{commentData.comment}</p>
                                            </div>
                                            <Row className="gallery-view">
                                                {commentData.attachments?.length > 0 &&
                                                    commentData.attachments.map((attachmentFile, aIndex) => (
                                                        <Col lg={3} md={4} sm={6} key={'aAttachment' + aIndex}>
                                                            {
                                                                aIndex <= 3 ?
                                                                    attachmentFile.attachmentType == 2 ?
                                                                        <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, commentData.id, 'comment')}>
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
                                                                            {aIndex == 3 ? <span className="more-images">{commentData.attachments.length - 4 == 0 ? null : `+${commentData.attachments.length - 4}`}</span> : null}
                                                                        </div>
                                                                        :
                                                                        <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, commentData.id, 'comment')}>
                                                                            <img className="cover" src={ASSETS_URL + attachmentFile.attachment} alt="postedImage" />
                                                                            {aIndex == 3 ? <span className="more-images">{commentData.attachments.length - 4 == 0 ? null : `+${commentData.attachments.length - 4}`}</span> : null}
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
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Comment</Tooltip>}>
                                                            <a onClick={() => handleShowCommentModal(commentData.id)} >
                                                                <i className="icon icon-chat-bubble"></i>
                                                            </a>
                                                        </OverlayTrigger>
                                                    </li>
                                                </ul>
                                                <ul className="likes-comments nav">
                                                    <li><span className="text-white">{commentData.replyCount}</span> Comments</li>
                                                </ul>
                                            </div>
                                            <hr className="mb-4"></hr>
                                            <Row>
                                                <Col sm="auto">
                                                    <Figure className="figure figure-circle figure-gray-2 figure-62">
                                                        <img className="cover" src={ASSETS_URL + userImage} alt="profile" />
                                                    </Figure>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="form-dark">
                                                        <Form.Control onChange={commentReplyHandler} name='commentReplyText' value={commentReplyText} as="textarea" placeholder="Enter Your Reply" />
                                                    </Form.Group>
                                                    <div className="d-flex align-items-start flex-wrap">
                                                        <div className="multimediaFiles">
                                                            <label htmlFor="multimediaFilesCommReply" className={`btn btn-outline-gray btn-rounded btn-h-30 me-3 mt-3${(isLoading || isMediaEnable) ? ' disabled' : ''}`}>
                                                                <span className="color-20da97 me-2"><i className="icon icon-image v-align-middle"></i></span>
                                                                Media
                                                            </label>
                                                            <input type="file"
                                                                ref={refReplyAttachment}
                                                                multiple
                                                                accept="audio/*,video/*,image/*"
                                                                onChange={attachmentsHandler}
                                                                id="multimediaFilesCommReply"
                                                                className="mediaFiles"
                                                            />
                                                        </div>
                                                        {/* <span className="me-3 mt-3">
                                                            {(refReplyAttachment.current !== null && refReplyAttachment.current?.files.length !== 0) ? refReplyAttachment.current.files.length + `${refReplyAttachment.current.files.length > 1 ? ' files' : ' file'}` : null}
                                                        </span> */}
                                                    </div>

                                                </Col>
                                                <Col sm="auto">
                                                    <button
                                                        onClick={
                                                            !isLoading ?
                                                                () => handleSubmit()
                                                                : null
                                                        }
                                                        disabled={isLoading || isEnable}
                                                        type="submit"
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
                                                </Row>
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
                                                <hr></hr>
                                                <div className="timeline-comment">
                                                    {
                                                        commentData.replies.map((replyData, rIndex) => (
                                                            <Row key={"rIndex" + rIndex} className="timeline-row">
                                                                <Col sm="auto">
                                                                    <Figure className="figure figure-circle figure-gray-2 figure-62">
                                                                        <img className="cover" src={ASSETS_URL + replyData.user?.profilePath ?? "/profile/no-profile-image.jpg"} alt="profile" />
                                                                    </Figure>
                                                                </Col>
                                                                <Col>
                                                                    <div>
                                                                        <Link href={replyData.user?.role == roles.brand ? `/brand/${replyData.user.slug}` : `/customer/${replyData.user.slug}`}>
                                                                            <a>
                                                                                <h3 className="text-white fs-18">{replyData.user?.fullName}<span className="color-a5a5a5 fs-14 fw-normal ms-2">{dateTimeFormat(replyData.createdAt, 'DD MMM YYYY')}</span></h3>
                                                                            </a>
                                                                        </Link>
                                                                        <p className="color-bfbfbf">{replyData.reply}</p>
                                                                    </div>
                                                                    <Row className="gallery-view">
                                                                        {replyData.attachments?.length > 0 &&
                                                                            replyData.attachments.map((attachmentFile, aIndex) => (
                                                                                <Col lg={3} md={4} sm={6} key={'attachment' + aIndex}>
                                                                                    {
                                                                                        aIndex <= 3 ?
                                                                                            attachmentFile.attachmentType == 2 ?
                                                                                                <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, replyData.id, 'reply')}>
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
                                                                                                <div className="gallery-image cursor-pointer" onClick={() => handleShow(true, aIndex, replyData.id, 'reply')}>
                                                                                                    <img className="cover" src={ASSETS_URL + attachmentFile.attachment} alt="postedImage" />
                                                                                                    {aIndex == 3 ? <span className="more-images">{replyData.attachments.length - 4 == 0 ? null : `+${replyData.attachments.length - 4}`}</span> : null}
                                                                                                </div>
                                                                                            : null
                                                                                    }
                                                                                </Col>
                                                                            ))
                                                                        }
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        ))
                                                    }
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
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
                    postId={selectedCommentId}
                    userImage={userImage}
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