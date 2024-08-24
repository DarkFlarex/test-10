import React from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled} from "@mui/material";
import {API_URL} from "../../../constants";
import imageNotFound from '../../../assets/images/image-not-found.png';
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    id: number;
    title: string;
    image: string | null;
    created_at: string;
    onDelete: VoidFunction;
}

const NewsItem:React.FC<Props> = ({
    id,
    title,
    image,
    created_at,
    onDelete,
}) => {
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }
    return (
        <Grid item sx={{ width: '400px' }}>
            <Card sx={{ height: '100%' }}>
                <CardHeader title={title} />
                <ImageCardMedia image={cardImage} title={title} />
                <CardContent>
                    {dayjs(created_at).format('DD.MM.YYYY HH:mm:ss')}
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={`/products/${id}`}>
                        Read Full post <ArrowForwardIosIcon />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={onDelete}>
                        Delete<DeleteIcon fontSize="inherit" />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default NewsItem;