import { createSlice } from '@reduxjs/toolkit'

interface User {
    id: number;
    email: string; // Sửa từ String thành string
    phoneNumber?: string; // Sửa từ String thành string
    username?: string; // Sửa từ String thành string
    avatar?: string; // Sửa từ String thành string
    gender?: string; // Sửa từ String thành string
    dateOfBirth: Date; // Không cần optional vì có giá trị mặc định
    address?: string; // Sửa từ String thành string
    role?: string; // Sửa từ String thành string
    status: boolean;
}
// Define the initial state using that type

const initialState: User =  {
    id: 0,
    email: "",
    phoneNumber: "",
    username: "Dét đẹp trai số 1 thế giới",
    avatar: "",
    gender: "",
    dateOfBirth: new Date('2000-01-01'),
    address: "",
    role: "",
    status:false
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username ;
            state.phoneNumber = action.payload.phoneNumber ;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.address = action.payload.address;
            state.gender = action.payload.gender;
        },
        updateProfile: (state, action) => {
            state.username = action.payload.username ;
            state.avatar = action.payload.avatar
            state.address = action.payload.address;
            state.phoneNumber = action.payload.phone;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.gender = action.payload.gender;
        },
        clearUser:() => initialState,
    },
})

export const {setUser, updateProfile, clearUser} = userSlice.actions
export const selectUser = (state: { user: User }) => state.user;
export default userSlice.reducer;