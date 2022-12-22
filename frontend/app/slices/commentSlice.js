import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/endpoints.config";
import Rest from "../../config/rest.config";

const initialState = {
    comments: [],
    singlePost: [],
    replies: [],
    createCommentStatus: 'idle',
    status: 'idle',
    repliesStatus: 'idle',
    commentStatus: 'idle',
    replyStatus: 'idle',
    error: '',
    message: '',
    postId: 0,
    singlePostId: 0,
    postCommentCount: 0,
    isCommentModal: false,
    modalType: '',
    singleCommentReplies: []
}

export const createComment = createAsyncThunk('post/comment', async (commentData, { rejectWithValue }) => {
    const response = await Rest.axiosRequest(API.addComment, commentData, "POST", true)
    if (response.data.status) {
        return response.data
    } else {
        return rejectWithValue(response.data);
    }
})

export const createCommentReply = createAsyncThunk('reply/comment', async (commentReplyData, { rejectWithValue }) => {
    const response = await Rest.axiosRequest(API.addCommentReply, commentReplyData)
    if (response.data.status) {
        return response.data
    } else {
        return rejectWithValue(response.data);
    }
})

export const fetchCommentReply = createAsyncThunk('get/comment', async (formData) => {
    const response = await Rest.axiosRequest(API.commentList, formData, 'POST')
    return response.data
})

export const fetchReply = createAsyncThunk('get/reply', async (commentUniqueId) => {
    const response = await Rest.axiosRequest(API.replyList, commentUniqueId, 'POST')
    return response.data
})

export const fetchSingleCommentReplies = createAsyncThunk('get/singleCommentReply', async (fromData) => {
    const response = await Rest.axiosRequest(API.singleCommentReplies, fromData, 'POST')
    return response.data
})

export const getSinglePost = createAsyncThunk('get/singlePost', async (postUniqueId) => {
    const response = await Rest.axiosRequest(API.singlePost + postUniqueId, {}, 'Get')
    return response.data
})

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.isCommentModal = action.payload.modalStatus
            state.modalType = action.payload.modalType
        },
        resetComment: (state) => {
            return initialState;
        }
    },
    extraReducers(builders) {
        builders
            .addCase(createComment.pending, (state, action) => {
                state.createCommentStatus = 'loading'
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.createCommentStatus = 'succeeded';
                state.message = action.payload.message;
                state.postCommentCount = action.payload.data.postCommentCount;
                state.postId = action.payload.data.comment.postId
            })
            .addCase(createComment.rejected, (state, action) => {
                state.createCommentStatus = 'failed'
                state.error = action.payload.message
            })

            .addCase(createCommentReply.pending, (state, action) => {
                state.replyStatus = 'loading'
            })
            .addCase(createCommentReply.fulfilled, (state, action) => {
                state.replyStatus = 'succeeded'
            })
            .addCase(createCommentReply.rejected, (state, action) => {
                state.replyStatus = 'failed'
                state.error = action.payload.message
            })

            .addCase(fetchReply.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchReply.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.replies = action.payload.data
            })
            .addCase(fetchReply.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })

            .addCase(fetchCommentReply.pending, (state, action) => {
                state.commentStatus = 'loading'
            })
            .addCase(fetchCommentReply.fulfilled, (state, action) => {
                state.commentStatus = 'succeeded'
                state.comments = action.payload.data.rows
            })
            .addCase(fetchCommentReply.rejected, (state, action) => {
                state.commentStatus = 'failed'
                state.error = action.payload.message
            })

            .addCase(getSinglePost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getSinglePost.fulfilled, (state, action) => {
                const { data } = action.payload
                state.status = 'succeeded'
                state.singlePost = data
                state.singlePostId = parseInt(data[0].parentPost === null ? data[0].id : data[0].parentPost.id)

            })
            .addCase(getSinglePost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.message
            })

            .addCase(fetchSingleCommentReplies.pending, (state, action) => {
                state.repliesStatus = 'loading'
            })
            .addCase(fetchSingleCommentReplies.fulfilled, (state, action) => {
                state.repliesStatus = 'succeeded'
                state.singleCommentReplies = action.payload.data
            })
            .addCase(fetchSingleCommentReplies.rejected, (state, action) => {
                state.repliesStatus = 'failed'
                state.error = action.payload.message
            })
    }
})
export const { resetComment, showModal } = commentSlice.actions;

export default commentSlice.reducer;