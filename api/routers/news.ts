import express from 'express';
import mysqlDB from '../mysqlDB';
import {ResultSetHeader} from "mysql2";
import {News, NewsMutation} from "../types";
import {imagesUpload} from '../multer';
const newsRouter = express.Router();

newsRouter.get('/', async (req, res,next) => {
    try {
        const result = await mysqlDB.getConnection().query(''+
            'SELECT * FROM news'
        );
        const newNews = result[0] as News[];
        return res.send(newNews)
    } catch (e){
        next(e);
    }
});

newsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await mysqlDB.getConnection().query(
        `SELECT * FROM news WHERE id = ?`,
        [id]
    );
    const news = result[0] as News[];

    if(news.length === 0){
        return res.status(404).send({error: 'News not found'});
    }

    return res.send(news[0]);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({error: 'title and description required!'});
    }

    const newsData: NewsMutation = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };

    const insertResult = await mysqlDB.getConnection().query(
        'INSERT INTO news (title, description, image) VALUES (?, ?, ?)',
        [newsData.title, newsData.description, newsData.image],
    );
    const resultHeader = insertResult[0] as ResultSetHeader;
    console.log(resultHeader.insertId);

    const getNewResult = await mysqlDB.getConnection().query(
        'SELECT * FROM news WHERE id = ?',
        [resultHeader.insertId],
    );

    const news = getNewResult[0] as News[];

    return res.send(news[0]);
});

newsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const [deleteCommentsResult] = await mysqlDB.getConnection().query(
        'DELETE FROM comments.ts WHERE news_id = ?',
        [id]
    );

    const [deleteResult] = await mysqlDB.getConnection().query(
        'DELETE FROM news WHERE id = ?',
        [id]
    );

    const deleteNewsResultHeader = deleteResult as ResultSetHeader;
    const deleteCommentsResultHeader = deleteCommentsResult as ResultSetHeader;

    if (deleteNewsResultHeader.affectedRows === 0) {
        return res.status(404).send({ error: 'News not found or deleted' });
    }
    if (deleteCommentsResultHeader.affectedRows === 0) {
        return res.status(404).send({ error: 'Comment not found or deleted' });
    }

    return res.send({ message: 'news deleted' });

});

export default newsRouter;