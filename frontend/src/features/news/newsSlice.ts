import {createSlice} from "@reduxjs/toolkit";
import {createNews, deleteNews, fetchNews} from "./newsThunks";
import {News} from "../../types";


export interface NewsState {
    items: News[];
    itemsFetching: boolean;
    isCreating: boolean;
    deleteLoading: string | false;
}

const initialState: NewsState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    deleteLoading: false,
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
        builder
            .addCase(deleteNews.pending, (state, { meta: { arg: newsId } }) => {
                    state.deleteLoading = newsId;
                })
            .addCase(deleteNews.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteNews.rejected, (state) => {
                state.deleteLoading = false;
            });
    },
    selectors: {
        selectNews: (state) => state.items,
        selectNewsFetching: (state) => state.itemsFetching,
        selectNewsCreating: (state) => state.isCreating,
        selectDeleteNewsLoading: (state) => state.deleteLoading,

    },
});

export const newsReducer = newsSlice.reducer;

export const {
    selectNews,
    selectNewsFetching,
    selectNewsCreating,
    selectDeleteNewsLoading,
} = newsSlice.selectors;