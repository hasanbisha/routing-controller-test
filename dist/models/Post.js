"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
exports.PostSchema = new mongoose_1.default.Schema({
    tittle: {
        type: String, required: true
    },
    body: {
        type: String, required: true
    },
    authorId: {
        type: String, required: true
    }
});
const Post = mongoose_1.default.model('Post', exports.PostSchema);
exports.default = Post;
//# sourceMappingURL=Post.js.map