import express from 'express';
import cors from 'cors';
import config from './config';
import mySQLDb from './mysqlDB';
import newsRouter from "./routers/news";
import commentRouter from "./routers/comments";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentRouter);

const run = async () => {
  await mySQLDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(console.error);

