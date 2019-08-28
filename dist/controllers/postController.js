"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const verifyToken_1 = require("../middleware/verifyToken");
// import axios from 'axios';
// const uuid = require('uuid');
// Bring mongo schemas
const Post_1 = __importDefault(require("../models/Post"));
let PostController = class PostController {
    async getHome(request) {
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
        const articles = await Post_1.default.find({ authorId: request.user._id });
        if (articles.length > 0) {
            return articles;
        }
        else {
            return 'No articles found';
        }
    }
    async getPost(id) {
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
        const article = await Post_1.default.find({ _id: id });
        if (article.length > 0) {
            return article;
        }
        else {
            return 'Article not found';
        }
    }
    async addUser(request, tittle, body) {
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
        const newArticle = new Post_1.default({
            tittle: tittle,
            body: body,
            authorId: request.user._id
        });
        return newArticle.save();
    }
    async editPost(id, tittle, body) {
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
        return Post_1.default.updateOne({ _id: id }, { tittle: tittle, body: body }, { upsert: true });
    }
    async deletePost(id) {
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
        return Post_1.default.deleteOne({ _id: id });
    }
};
__decorate([
    routing_controllers_1.Get('/'),
    __param(0, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getHome", null);
__decorate([
    routing_controllers_1.Get('/post/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    routing_controllers_1.Post('/post'),
    __param(0, routing_controllers_1.Req()),
    __param(1, routing_controllers_1.BodyParam('tittle')),
    __param(2, routing_controllers_1.BodyParam('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addUser", null);
__decorate([
    routing_controllers_1.Put('/post/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.BodyParam('tittle')),
    __param(2, routing_controllers_1.BodyParam('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "editPost", null);
__decorate([
    routing_controllers_1.Delete('/post/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    routing_controllers_1.JsonController(),
    routing_controllers_1.UseBefore(verifyToken_1.verifyToken)
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=postController.js.map