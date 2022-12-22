import React, { useEffect, useState } from 'react'
import API from '../config/endpoints.config'
import Rest from '../config/rest.config'
import Notifier from './Notifier'
import SingleReply from './SingleReply'

export default function ReplyList({ commentData, commentId }) {
    const notifier = new Notifier()
    const [reply, setReply] = useState(commentData)
    const [replies, setReplies] = useState()
    const [page, setPage] = useState(0)
    const [commId, setCommId] = useState(0)
    const [count, setCount] = useState('')


    const handleHideReplies = async (id) => {
        const formData = {
            'commentId': id,
            "limit": 3,
            "page": 0,
        }
        setPage(0)
        const response = await Rest.axiosRequest(API.singleCommentReplies, formData, 'POST')
        if (response.status === 201) {
            setReply(response.data.data.rows)
        } else {
            notifier.notify(response.data.message, "danger");
        }
    }

    const handleShowReplies = async (id) => {        
        setCommId(id)
        const formData = {
            'commentId': id,
            "limit": 10,
            "page": page,
        }
        const response = await Rest.axiosRequest(API.singleCommentReplies, formData, 'POST')
        if (response.status === 201) {
            setCount(response.data.data.count)
            var ids = new Set(reply.map(d => d.id));
            // var finalReply = [...reply, ...response.data.data.rows.filter(d => !ids.has(d.id))];
            setReply([...reply, ...response.data.data.rows.filter(d => !ids.has(d.id))])
            setPage(page + 1)
        } else {
            notifier.notify(response.data.message, "danger");
        }
    }

    useEffect(() => {
        setReply(commentData)
    }, [commentData])

    return (
        <div className="timeline-comment">
            {
                reply?.length > 0 &&
                reply.map((replyData, rIndex) => (
                    <SingleReply
                        key={rIndex}
                        rIndex={rIndex}
                        count={count}
                        reply={reply}
                        handleShowReplies={handleShowReplies}
                        handleHideReplies={handleHideReplies}
                        replyData={replyData} />
                ))
            }
        </div>
    )
}
