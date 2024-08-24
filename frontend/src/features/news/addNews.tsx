import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectNewsCreating} from "./newsSlice";
import {NewsMutation} from "../../types";
import {createNews} from "./newsThunks";
import {Grid, Typography} from "@mui/material";
import NewsForm from "./components/NewsForm";

const AddNews = () => {
    const isCreating = useAppSelector(selectNewsCreating);
    const dispatch = useAppDispatch();

    const handleNewsSubmit =async (newsMutation: NewsMutation) => {
        await dispatch(createNews(newsMutation));
    };
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Add news
            </Typography>

            <Grid item>
                <NewsForm onSubmit={handleNewsSubmit} isLoading={isCreating} />
            </Grid>
        </>
    );
};

export default AddNews;