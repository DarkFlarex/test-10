import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectNews} from "./newsSlice";
import {fetchNews} from "./newsThunks";
import {useEffect} from "react";
import NewsItem from "./components/NewsItem";

const News = () => {
    const dispatch = useAppDispatch();
    const News = useAppSelector(selectNews);

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
            <Grid  item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    {News.map((news) => (
                        <NewsItem
                            key={news.id}
                            id={news.id}
                            title={news.title}
                            created_at={news.created_at}
                            image={news.image}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default News;