import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchOneNews} from "./newsThunks";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {selectOneNews, selectOneNewsFetching} from "./newsSlice";
import dayjs from "dayjs";

const OneNews = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const News = useAppSelector(selectOneNews);
    const isFetching = useAppSelector(selectOneNewsFetching);

    useEffect(() => {
        dispatch(fetchOneNews(id));
    }, [dispatch, id]);
    return (
        <Grid container direction="column" spacing={2}>
            {isFetching && (
                <Grid item>
                    <CircularProgress />
                </Grid>
            )}
            {News && (
                <>
                    <Grid item component={Typography} variant="h4">
                        {News.title}
                    </Grid>
                    <Grid item component={Typography} variant="h6">
                        {News.description} KGS
                    </Grid>
                    <Grid item component={Typography} variant="body1">
                        At {dayjs(News.created_at).format('DD.MM.YYYY HH:mm:ss')}
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default OneNews;