import {createAsyncThunk} from "@reduxjs/toolkit";
import {News, NewsMutation} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchNews = createAsyncThunk<News[]>('news/fetchAll', async () => {
    const { data: news } = await axiosApi.get<News[]>('/news');
    return news;
});

export const createNews = createAsyncThunk<void, NewsMutation>(
    'news/create', async (newsMutation) => {
    const formData = new FormData()
    formData.append('title', newsMutation.title);
    formData.append('description', newsMutation.description);

    if (newsMutation.image) {
        formData.append('image', newsMutation.image);
    }

    await axiosApi.post('/news', formData);
});