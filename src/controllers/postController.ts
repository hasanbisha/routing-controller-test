import { JsonController, Get, Post, Put, BodyParam, Param, Delete, UseBefore, Req } from 'routing-controllers';
import { verifyToken } from '../middleware/verifyToken';
// import axios from 'axios';
// const uuid = require('uuid');


// Bring mongo schemas
import Article from '../models/Post';

@JsonController()
@UseBefore(verifyToken)
export class PostController {
    @Get('/')
    async getHome(@Req() request: any) {
        // return axios({
        //     method: 'GET',
        //     url: 'http://localhost:3000/posts',
        // })
        // .then(res => {
        //     return res.data;
        // })
        // .catch(err => {
        //     return err;
        // });

        const articles = await Article.find({ authorId: request.user._id });
        if(articles.length > 0) {
            return articles;
        } else {
            return 'No articles found';
        }
    }

    @Get('/post/:id')
    async getPost(@Param('id') id: string) {
        // return axios({
        //     method: 'GET',
        //     url: `http://localhost:3000/posts/${id}`
        // })
        // .then(res => {
        //     return res.data;
        // })
        // .catch(err => {
        //     return 'Could not find post';
        // });

        const article = await Article.find({_id: id});
        if(article.length > 0) {
            return article;
        } else {
            return 'Article not found';
        }
    }

    @Post('/post')
    async addUser(
        @Req() request: any,
        @BodyParam('tittle') tittle: string,
        @BodyParam('body') body: string
    ) {
        // return axios({
        //     method: 'POST',
        //     url: 'http://localhost:3000/posts',
        //     data: {
        //         id: uuid(),
        //         tittle: tittle,
        //         body: body
        //     }
        // })
        // .then(res => {
        //     return `Post from ${body} is added!`;
        // })
        // .catch(err => {
        //     return err;
        // });

        const newArticle = new Article({
            tittle: tittle,
            body: body,
            authorId: request.user._id
        });

        return newArticle.save();
    }

    @Put('/post/:id')
    async editPost(
        @Param('id') id: string,
        @BodyParam('tittle') tittle: string,
        @BodyParam('body') body: string
    ) {
        // return axios({
        //     method: 'PUT',
        //     url: `http://localhost:3000/posts/${id}`,
        //     data: {
        //         tittle: tittle,
        //         body: body
        //     }
        // })
        // .then(res => {
        //     return 'Post updated';
        // })
        // .catch(err => {
        //     return 'Could not update post';
        // });

        return Article.updateOne({ _id: id }, { tittle: tittle, body: body }, {upsert: true});
    }

    @Delete('/post/:id')
    async deletePost(@Param('id') id: string) {
        // return axios({
        //     method: 'DELETE',
        //     url: `http://localhost:3000/posts/${id}`
        // })
        // .then(res => {
        //     return 'Post deleted';
        // })
        // .catch(res => {
        //     return 'Could not delete post';
        // });

        return Article.deleteOne({ _id: id });
    }
}