import {createSlice} from "@reduxjs/toolkit";
import {createNews} from "./newsThunks";


export interface NewsState {
    isCreating: boolean;
}

const initialState: NewsState = {
    isCreating: false,
}

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(createNews.pending, (state) => {
                state.isCreating = true;
            })
            .addCase(createNews.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createNews.rejected, (state) => {
                state.isCreating = false;
            });
    },
    selectors: {
        selectNewsCreating: (state) => state.isCreating,
    },
});

export const newsReducer = newsSlice.reducer;

export const {
    selectNewsCreating,
} = newsSlice.selectors;