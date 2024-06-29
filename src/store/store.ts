import { configureStore } from '@reduxjs/toolkit';
import swapslice from './reducer/swapslice';
import wallet from "./reducer/walletslice"
const store = configureStore({
    reducer: {
        swapState:swapslice,
        wallet
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch