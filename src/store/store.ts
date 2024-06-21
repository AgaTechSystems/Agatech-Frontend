import { configureStore } from '@reduxjs/toolkit';
import swapslice from './reducer/swapslice';
const store = configureStore({
    reducer: {
        swapState:swapslice,

    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch