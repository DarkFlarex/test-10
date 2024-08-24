import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectNews } from "./newsSlice";
import {fetchNews, deleteNews} from "./newsThunks";
import {useEffect} from "react";
import NewsItem from "./components/NewsItem";

const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this News?')) {
            await dispatch(deleteNews(id.toString()));
            await dispatch(fetchNews());
        }
    };

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <Grid container>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Posts
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to="/news/addNews">
                        Add product
                    </Button>
                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                {news.map((newsItem) => (
                    <NewsItem
                        key={newsItem.id}
                        id={newsItem.id}
                        title={newsItem.title}
                        created_at={newsItem.created_at}
                        image={newsItem.image}
                        onDelete={() => handleDelete(newsItem.id)}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default News;
