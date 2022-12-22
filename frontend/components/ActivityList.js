import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Activity from './Activity'
import ActivitySkeleton from './ActivitySkeleton'

const ActivityList = (props) => {
    const { activities, fetchMoreActivity, totalActivities, handleShow, handleShowCommentModal, likesClickHandler, repostsClickhandler } = props
    return (
        (totalActivities > 0 ?
            <InfiniteScroll
                dataLength={activities.length}
                next={fetchMoreActivity}
                hasMore={totalActivities > activities.length ? true : false}
                loader={[...Array(10)].map((arrayData, index) => <ActivitySkeleton key={index} />
                )}
            >
                {activities.map((activity) => {
                    return (
                        <div key={activity.id}>
                            <Activity key={activity.id} activity={activity} handleShow={handleShow} handleShowCommentModal={handleShowCommentModal} likesClickHandler={likesClickHandler} repostsClickhandler={repostsClickhandler} />
                            <hr></hr>
                        </div>
                    )
                })}
            </InfiniteScroll>
        : 
            <div className="d-flex justify-content-center align-items-center fs-16 fw-500 p-2">
                No records found!
            </div>
        )
    )
}

export default ActivityList
