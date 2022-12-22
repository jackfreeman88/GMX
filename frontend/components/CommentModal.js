import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Figure, Form, Modal, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, createCommentReply, showModal } from '../app/slices/commentSlice'
import { ASSETS_URL } from '../config/server.config'
import Notifier from './Notifier'

export default function CommentModal({ postId, userImage, showCommentModal, handleCloseCommentModal }) {
    const notifier = new Notifier()
    const dispatch = useDispatch()
    const { commentStatus, isCommentModal, message, modalType } = useSelector((state) => state.comment)
    const [replyText, setReplyText] = useState('')
    const [attachments, setAttachments] = useState([])
    const [isMediaEnable, setIsMediaEnable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedMediaFile, setSelectedMediaFile] = useState([]);
    const refModalAttachment = useRef('');
    const [isEnable, setIsEnable] = useState(true)

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
    function handleSubmit() {
        if (replyText != '' || Object.keys(attachments).length > 0) {
            setIsEnable(false)
            setIsMediaEnable(false)
        setIsLoading(true)
        let formData = new FormData();
        if (modalType === 'comment') {
            formData.append('comment', replyText)
            formData.append('postId', parseInt(postId))    
        } else {
            formData.append('reply', replyText)
            formData.append('commentId', parseInt(postId))
        }
        for (let key in attachments) {
            formData.append('attachment', attachments[key])
        }
        if (modalType === 'comment') {
            dispatch(createComment(formData))
                .unwrap()
                .then((result) => {
                    setIsLoading(false)
                    setIsMediaEnable(false)
                    if (result.status) {
                        notifier.notify(result.message, 'success');
                        dispatch(showModal({ modalStatus: false, modalType: 'comment' }));
                        resetForm()
                    }
                })
                .catch((rejectedValueOrSerializedError) => {
                    setIsLoading(false)
                    setIsMediaEnable(false);
                    notifier.notify(rejectedValueOrSerializedError.message, 'danger')
                })
        } else {
            dispatch(createCommentReply(formData))
                .unwrap()
                .then((result) => {
                    setIsLoading(false)
                    if (result.status)
                        notifier.notify(result.message, 'success')
                    dispatch(showModal({ modalStatus: false, modalType: 'reply' }));
                    resetForm()
                })
                .catch((rejectedValueOrSerializedError) => {
                    setIsLoading(false)
                    notifier.notify(rejectedValueOrSerializedError.message, 'danger')
                })
        }
        } else {
            setIsEnable(true)
        }
    }

    // function handleSubmitCommentReply(commentId) {
    //     dispatch(createCommentReply({ commentId: parseInt(commentId), reply: replyText }))
    // }

    useEffect(() => {
        if (commentStatus === 'loading') {
            setIsLoading(true)
        } else if (commentStatus === 'succeeded') {
            setIsLoading(false)
            setIsMediaEnable(false);
            // notifier.notify(message, "success");
        } else if (commentStatus === 'failed') {
            setIsLoading(false)
            setIsMediaEnable(false)
        }
    }, [commentStatus])

    function resetForm() {
        setReplyText('')
        setAttachments([])
        // refModalAttachment.current.value = '';
        setSelectedMediaFile([])
        setIsEnable(true)
        setIsMediaEnable(false);

    }
    return (
        <Modal className='commentModal' size="lg" show={isCommentModal} onHide={handleCloseCommentModal}>
            <Modal.Header closeButton>
                <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body className='py-4'>
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
                                    <label htmlFor="multimediaAttachmentFiles" className={`btn btn-outline-gray btn-rounded btn-h-30 me-3 mt-3${(isLoading || isMediaEnable) ? ' disabled' : ''}`}>
                                        <span className="color-20da97 me-2"><i className="icon icon-image v-align-middle"></i></span>
                                        Media
                                    </label>
                                    <input type="file"
                                        ref={refModalAttachment}
                                        multiple
                                        accept="audio/*,video/*,image/*"
                                        onChange={attachmentsHandler}
                                        id="multimediaAttachmentFiles"
                                        className="mediaFiles"  
                                    />
                                </div>
                                <span className="me-3 mt-3">
                                    {/* {(refModalAttachment.current !== null && refModalAttachment.current?.files.length !== 0) ? refModalAttachment.current.files.length + `${refModalAttachment.current.files.length > 1 ? ' files' : ' file'}` : null} */}
                                </span>
                                {/* <a href="#" className="btn btn-outline-gray btn-rounded btn-h-30 mt-3">
                                    <span className="color-f8bf52 me-2"><i className="icon icon-video v-align-middle"></i></span>
                                    Videos
                                </a> */}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col sm="auto">
                        <button type="submit"
                            onClick={
                                !isLoading ?
                                    handleSubmit
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
                                        <div className='gallery-image position-relative'>
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
            </Modal.Body >
        </Modal >
    )
}
