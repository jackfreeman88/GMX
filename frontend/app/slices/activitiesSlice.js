import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import { getSingle } from "../../services/Auth";

const initialState = {
    totalActivites: 0,
    activities: [],
    activityPage: 0,
    status: 'idle',
    error: '',
    addRepost: { status: 'idle', error: "" },
    addLike: { status: 'idle', error: "" },
}

export const fetchActivities = createAsyncThunk('activities/fetch', async (formData, { rejectWithValue }) => {
    const response = await Rest.axiosRequest(API.posts, formData, 'POST')
    if (response.data.status != true) {
        return rejectWithValue(response.data)
    }
    return response.data.data
})

export const fetchAxisPointPost = createAsyncThunk('activities/fetchAxisPointPost', async (formData) => {
    const response = await Rest.axiosRequest(API.axisPointPosts, formData, 'POST')
    return response.data.data
})

export const handleOnRepost = createAsyncThunk('activities/AddRepost', async (formData) => {
    const response = await Rest.axiosRequest(API.repost, formData, 'POST')
    return response.data.data
})

export const handleOnLike = createAsyncThunk('activities/AddLike', async (formData) => {
    const response = await Rest.axiosRequest(
        API.posts + `/handlePostLike`,
        formData,
        'POST',
        false,
        getSingle('token'),
    )
    return response.data.data
})

export const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        resetActivities: (state) => {
            return initialState;
        },
        // fetchMoreActivity: (state) => {
        //     return state.activityPage = state.activityPage + 1;
        // },
        addActivity: (state, action) => {
            state.activities = [action.payload, ...state.activities];
            state.totalActivites = state.totalActivites + 1;
        },
        handleOnComment: (state, action) => {
            const { postId, postCommentCount } = action.payload;
            state.activities.forEach((activity) => {
                if (activity.id == postId) {
                    activity.commentCount = postCommentCount;
                } else if (activity.repostId == postId) {
                    activity.parentPost.commentCount = postCommentCount;
                }
            });
        }
    },
    extraReducers(builders) {
        builders
            .addCase(fetchActivities.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchActivities.fulfilled, (state, action) => {
                const { count, rows } = action.payload;
                state.activities = [...state.activities, ...rows];
                state.totalActivites = count;
                state.status = "succeeded";
                state.error = '';
            })
            .addCase(fetchActivities.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(handleOnRepost.pending, (state, action) => {
                state.addRepost.status = 'loading'
            })
            .addCase(handleOnRepost.fulfilled, (state, action) => {
                const { totalRepostOnPost, hasUserReposted } = action.payload;
                const { repostId } = action.meta.arg;
                const loginUserId = getSingle('userId')
                // if (hasUserReposted == false) {
                //     state.activities = state.activities.filter((activity) => {
                //         return (activity.repostId == null) || (activity.repostId != repostId && activity.userId != loginUserId);
                //     });
                // }
                // state.activities.forEach((activity, index) => {
                //     if (activity.id == repostId) {
                //         activity.repostCount = totalRepostOnPost;
                //         activity.isReposted = hasUserReposted;
                //     } else if (activity.repostId == repostId) {
                //         activity.parentPost.repostCount = totalRepostOnPost;
                //         activity.parentPost.isReposted = hasUserReposted;
                //     }
                // });
                let resetActivities = [];
                for (let i = 0; i < state.activities.length; i++) {
                    let activity = { ...state.activities[i] };
                    if (activity.id == repostId) {
                        activity.repostCount = totalRepostOnPost;
                        activity.isReposted = hasUserReposted;
                    } else if (activity.repostId == repostId) {
                        if (hasUserReposted == false && activity.userId == loginUserId) {
                            continue;
                        }
                        activity.parentPost.repostCount = totalRepostOnPost;
                        activity.parentPost.isReposted = hasUserReposted;
                    }
                    resetActivities[i] = activity;
                }
                state.activities = resetActivities;
                state.addRepost.status = 'succeeded'
                state.addRepost.error = ''
            })
            .addCase(handleOnRepost.rejected, (state, action) => {
                state.addRepost.status = 'failed'
                state.addRepost.error = action.error.message
            })
            .addCase(handleOnLike.pending, (state, action) => {
                state.addLike.status = 'loading'
            })
            .addCase(handleOnLike.fulfilled, (state, action) => {
                const { totalLikesOnPost, hasUserLikedPost } = action.payload;
                const { pId: postId } = action.meta.arg;
                state.activities.forEach((activity) => {
                    if (activity.id == postId) {
                        activity.likeCount = totalLikesOnPost;
                        activity.isLiked = hasUserLikedPost;
                    } else if (activity.repostId == postId) {
                        activity.parentPost.likeCount = totalLikesOnPost;
                        activity.parentPost.isLiked = hasUserLikedPost;
                    }
                });
                state.addLike.status = 'succeeded'
                state.addLike.error = ''
            })
            .addCase(handleOnLike.rejected, (state, action) => {
                state.addLike.status = 'failed'
                state.addLike.error = action.error.message
            })
            .addCase(fetchAxisPointPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAxisPointPost.fulfilled, (state, action) => {
                const { count, rows } = action.payload;
                state.activities = [...state.activities, ...rows];
                state.totalActivites = count;
                state.status = "succeeded";
                state.error = '';
            })
            .addCase(fetchAxisPointPost.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { resetActivities, fetchMoreActivity, addActivity, handleOnComment } = activitiesSlice.actions;

export default activitiesSlice.reducer;