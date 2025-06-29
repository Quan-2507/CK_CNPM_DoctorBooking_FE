import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Slice/UserSlice'
import {UserReducer} from "../../Pages/Admin/redux/reducer/UserReducer";
import {DepartmentReducer} from "../../Pages/Admin/redux/reducer/DepartmentReducer";
import {SymptomReducer} from "../../Pages/Admin/redux/reducer/SymptomReducer";
import {AppointmentReducer} from "../../Pages/Admin/redux/reducer/AppointmentReducer";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        UserReducer,
        DepartmentReducer,
        SymptomReducer,
        AppointmentReducer
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware()
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;