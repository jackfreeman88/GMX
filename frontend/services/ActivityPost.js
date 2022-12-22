import React, { useState } from "react";
import { Row, Col, Form, Spinner, Button } from "react-bootstrap";
import Figure from 'react-bootstrap/Figure';
import { ASSETS_URL } from "../config/server.config";
import { ImageGrid } from "react-fb-image-video-grid"
export default function ActivityPost(props) {
    return (
        <>
            <Row>
                <Col sm="auto">
                    <Figure className="figure figure-circle figure-gray-2 figure-62">
                        <img className="cover" src={ASSETS_URL + props.userImage} alt="profile" />
                    </Figure>
                </Col>
                <Col>
                    <Form.Group className="form-dark">
                        <Form.Control as="textarea"
                            name='activityComment'
                            value={props.activityComment}
                            onChange={props.postContentHandler}
                            placeholder="What's Happening?" />
                    </Form.Group>
                    <div className="d-flex align-items-start flex-wrap">
                        <div className="multimediaFiles">
                            <label htmlFor="multimediaFiles" className={`btn btn-outline-gray btn-rounded btn-h-30 me-3 mt-3` + ((props.isPostLoading || props.isMediaEnable) ? ` disabled` : ``)}>
                                <span className="color-20da97 me-2"><i className="icon icon-image v-align-middle"></i></span>
                                Media
                            </label>
                            <input type="file"
                                multiple
                                accept="video/*,image/*"
                                onChange={!props.isPostLoading ? props.attachmentsHandler : null}
                                disabled={props.isPostLoading || props.isMediaEnable}
                                id="multimediaFiles"  
                                className="mediaFiles"                      
                            />
                            {/* <a href="#" className="btn btn-outline-gray btn-rounded btn-h-30 mt-3">
                                <span className="color-f8bf52 me-2"><i className="icon icon-video v-align-middle"></i></span>
                                Videos
                            </a> */}
                        </div>
                    </div>
                </Col>
                <Col sm="auto">
                    <button type="submit"
                        className="btn btn-outline-gray btn-wh-150-48 btn-rounded mt-3"
                        onClick={!props.isPostLoading ? props.submitPost : null}
                        disabled={props.isPostLoading || props.isEnable}
                    >
                        {props.isPostLoading ? <Spinner animation="border" /> : "Post"}
                    </button>
                </Col>                
            </Row>
            <Row>
                <Col sm="auto">
                    <div style={{ width: "58px" }}></div>
                </Col>
                <Col className=" mt-3">
                    <div className={props.selectedMediaFile.length > 0 ? `grid-wrapper` : ``}>
                        {props.selectedMediaFile &&
                            props.selectedMediaFile.map((selectedFile, index) => {
                                return (
                                    
                                        <div key={selectedFile + index} className={`gallery-image position-relative` + (selectedFile.type === 'video' ? ` gallery-video` : ``)}>
                                            <Button variant="" className="btn-remove" onClick={() => props.deleteHandler(index, selectedFile.previewFile, selectedFile.id)}>
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
            {/* <Row>
                <Col sm="auto">
                    <div style={{width : "58px"}}></div>
                </Col>
                <Col>
                    <div className="grid-wrapper mt-3">
                        {props.selectedMediaFile &&
                            props.selectedMediaFile.map((selectedFile, index) => {
                                return (
                                    <div className="" key={selectedFile + index}>
                                        <div className="gallery-image">
                                            <Button variant="" className="btn-remove" onClick={() => props.deleteHandler(index, selectedFile.previewFile, selectedFile.id)}>
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
                                    </div>
                                );
                        })}
                    </div>
                </Col>
            </Row> */}
            {/* {
                props.selectedMediaFile.length > 0 ?
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ width: '60vw', height: '30rem' }}>
                                <ImageGrid showModal={false}>
                                    {
                                        props.selectedMediaFile.map((selectedFile, index) => {
                                            return (
                                                <div className="" key={selectedFile + index}>
                                                    <div className="gallery-image">
                                                        <Button variant="" className="btn-remove" onClick={() => props.deleteHandler(index, selectedFile.previewFile, selectedFile.id)}>
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
                                                </div>
                                            );
                                        })
                                    }
                                </ImageGrid>
                            </div>
                        </div>
                    </div> 
                    : null
            } */}
            <hr></hr>
        </>
    );
}
