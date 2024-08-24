import {createSlice} from "@reduxjs/toolkit";
import {createNews, fetchNews} from "./newsThunks";
import {News} from "../../types";


export interface NewsState {
    items: News[];
    itemsFetching: boolean;
    isCreating: boolean;
}

const initialState: NewsState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
}

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.itemsFetching = true;
            })
            .addCase(fetchNews.fulfilled, (state, { payload: news }) => {
                state.itemsFetching = false;
                state.items = news;
            })
            .addCase(fetchNews.rejected, (state) => {
                state.itemsFetching = false;
            });
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
        selectNews: (state) => state.items,
        selectNewsFetching: (state) => state.itemsFetching,
        selectNewsCreating: (state) => state.isCreating,
    },
});

export const newsReducer = newsSlice.reducer;

export const {
    selectNews,
    selectNewsFetching,
    selectNewsCreating,
} = newsSlice.selectors;