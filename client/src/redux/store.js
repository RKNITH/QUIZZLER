import usersSlice from "./userSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loderSlice.js";

const store = configureStore({
    reducer: {
        users: usersSlice,
        loader: loaderSlice
    }
});

export default store;