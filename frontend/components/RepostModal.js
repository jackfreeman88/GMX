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

const RepostModal = ({ show, hide, reposts, repostsCount, fetchMoreReposts, ...props }) => {
    return (
        <Modal show={show} onHide={hide} className="modal-dark custom-modal" centered scrollable={true} >
            <Modal.Header closeButton>
                <Modal.Title>{repostsCount} Reposts</Modal.Title>
            </Modal.Header>
            <Modal.Body id="scrollableDiv">
                <ListGroup variant="flush" className="list-dark">
                    <InfiniteScroll
                        dataLength={reposts?.length}
                        next={() => fetchMoreReposts()}
                        hasMore={repostsCount > reposts?.length ? true : false}
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
                        {reposts?.length > 0 ?
                            reposts.map((repost, index) => {
                                return (
                                    <ListGroup.Item key={index}>
                                        <FollowerListItem key={index} follower={{ followerUser: repost.user }} />
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

export default RepostModal;