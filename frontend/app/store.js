import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import commentSlice from './slices/commentSlice';
import activitiesReducer from './slices/activitiesSlice';
import userReducer from './slices/userSlice';
import companySlice from './slices/companySlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        comment: commentSlice,
        activities: activitiesReducer,
        user: userReducer,
        company: companySlice
    },
    devTools: true,
});