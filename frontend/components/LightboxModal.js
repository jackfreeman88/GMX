import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { ASSETS_URL } from "../config/server.config";
import { Carousel, Modal } from "react-bootstrap";

export default function LightboxModal(props) {
    const [playing, setPlaying] = useState(true)
    // console.log('props--->', props.images);
    // const [imgHeight, setImgHeight] = useState(0)
    // const [imgWidth, setImgWidth] = useState(0)
    // const imageRef = useRef()
    // const handleZoomOut = () => {
    //     setImgHeight(10)
    //     setImgWidth(10)
    //     const height = imageRef.current.clientHeight
    //     const width = imageRef.current.clientWidth
    // }
    // const handleZoomIn = () => {
    //     console.log('handleZoomIn');
    // }
    const handleSelect = () => {
        setPlaying(false)
    }

    return (
        <div>
            <Modal show={props.show} fullscreen={true} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel 
                        onSelect={() => handleSelect()}
                        slide={false}
                        defaultActiveIndex={props.sliderIndex}
                        indicators={false}>
                        {props.images.map((videoObj, index) => (
                            videoObj.attachmentType == 2
                                ?
                                (
                                    <Carousel.Item key={index}>
                                        <div className='slider_video'>
                                            <ReactPlayer
                                                url={ASSETS_URL + videoObj.attachment}
                                                pip={true}
                                                controls={true}
                                                playing={playing}
                                            />
                                        </div>
                                    </Carousel.Item>
                                ) :
                                (
                                    <Carousel.Item key={index}>
                                        <div className='slider_img'>
                                            <img src={ASSETS_URL + videoObj.attachment} className="mx-auto mw-375"/>
                                        </div>
                                        {/* <span onClick={handleZoomIn}><i className="far fa-search-plus"></i></span>
                                        <span onClick={handleZoomOut}><i className="far fa-search-minus"></i></span> */}
                                    </Carousel.Item>
                                )
                        ))}
                    </Carousel>
                </Modal.Body>
            </Modal>
        </div >
    )
}
