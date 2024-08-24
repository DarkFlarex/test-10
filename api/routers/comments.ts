import express from 'express';
import mysqlDB from '../mysqlDB';
import {Comment, CommentMutation,News} from "../types";
import {ResultSetHeader} from "mysql2";
const commentRouter = express.Router();

commentRouter.get('/', async (req, res,next) => {
    try {
        const result = await mysqlDB.getConnection().query(''+
            'SELECT * FROM comments'
        );
        const comments = result[0] as Comment[];
        return res.send(comments)
    } catch (e){
        next(e);
    }
});

commentRouter.post('/', async (req, res) => {
    if (!req.body.text || !req.body.news_id) {
        return res.status(400).send({ error: 'text and news_id required!' });
    }

    const { news_id } = req.body;

    const newsResult = await mysqlDB.getConnection().query(
        'SELECT * FROM news WHERE id = ?',
        [news_id]
    );
    const news = newsResult[0] as News[];

    if (news.length === 0) {
        return res.status(404).send({ error: 'News not found!' });
    }

    const comment: CommentMutation = {
        news_id: req.body.news_id,
        author: req.body.author,
        text: req.body.text,
    };

    const insertResult = await mysqlDB.getConnection().query(
        'INSERT INTO comments (news_id, author, text) VALUES (?, ?, ?)',
        [comment.news_id, comment.author, comment.text]
    );
    const resultHeader = insertResult[0] as ResultSetHeader;
    console.log(resultHeader.insertId);

    const getNewResult = await mysqlDB.getConnection().query(
        'SELECT * FROM comments WHERE id = ?',
        [resultHeader.insertId]
    );

    const comments = getNewResult[0] as Comment[];

    return res.send(comments[0]);
});

commentRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const [deleteResult] = await mysqlDB.getConnection().query(
        'DELETE FROM comments WHERE id = ?',
        [id]
    );
    const resultHeader = deleteResult as ResultSetHeader;
    if (resultHeader.affectedRows === 0) {
        return res.status(404).send({ error: 'Comment not found or deleted' });
    }

    return res.send({ message: 'Comment deleted' });

});

export default commentRouter;