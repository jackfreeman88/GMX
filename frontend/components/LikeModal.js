import React, { useEffect, useRef, useState } from 'react'
import { Button, Figure, ListGroup, Modal } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ASSETS_URL } from '../config/server.config';
import FollowingListItem from './FollowingListItem';
import FollowerListItem from './FollowerListItem';

const baseColor = "#202020";
const highlightColor = "#444"

const LikeModal = ({ show, hide, likes, likesCount, fetchMoreLikes, handleFollowerFollowingCount, ...props }) => {
    return (
        <Modal show={show} onHide={hide} className="modal-dark custom-modal" centered scrollable={true} >
            <Modal.Header closeButton>
                <Modal.Title>{likesCount} Likes</Modal.Title>
            </Modal.Header>
            <Modal.Body id="scrollableDiv">
                <ListGroup variant="flush" className="list-dark">
                    <InfiniteScroll
                        dataLength={likes.length}
                        next={() => fetchMoreLikes()}
                        hasMore={likesCount > likes.length ? true : false}
                        loader={[...Array(10)].map((arrayData, index) => {
                            return (
                                <div key={index + "skeleton"} className="d-flex justify-content-between align-items-center px-3 list-group-item">
                                    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                                        <div className="d-flex align-items-center">
                                            <Skeleton circle={true} height={40} width={40} className="mb-0 me-3" />
                                            <Skeleton width={200} height={20} />
                                        </div>
                                        <Skeleton width={120} height={30} className="me-2" />
                                    </SkeletonTheme>
                                </div>
                            )
                        })}
                        scrollableTarget="scrollableDiv"
                    >
                        {likes.length > 0 ?
                            likes.map((like, index) => {
                                return (
                                    <ListGroup.Item>
                                        <FollowerListItem follower={{ followerUser: like.user }} />
                                    </ListGroup.Item>
                                )
                            })
                            :
                            <div className="d-flex justify-content-center align-items-center fs-16 fw-500 p-2">
                                No records found!
                            </div>
                        }
                    </InfiniteScroll>
                </ListGroup>
            </Modal.Body >
        </Modal >
    )
}

export default LikeModal