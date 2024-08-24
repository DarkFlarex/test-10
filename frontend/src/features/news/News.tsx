import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const News = () => {
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
        </Grid>
    );
};

export default News;