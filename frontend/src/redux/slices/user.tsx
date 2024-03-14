import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";

const initialStateValue: User = {
    id: -1,
    username: "",
    avatar: "",
    provider_id: "",
}

const userSlice = createSlice({
    name: "user",
    initialState: {value: initialStateValue},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = initialStateValue;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer