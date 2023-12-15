import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import { goodsApi } from './sliceQuery';

// const store = configureStore({
//     reducer: {
//         page: userReducer,
//     },
// })

const store = configureStore({
    reducer: {
        [goodsApi.reducerPath]: goodsApi.reducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(goodsApi.middleware) 
})

export default store;

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;