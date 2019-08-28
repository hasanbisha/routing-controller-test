import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  tittle: string; 
  body: string; 
  authorId: string; 
};

export const PostSchema = new mongoose.Schema({
  tittle: {
    type:String, required: true
  },
  body: {
    type:String, required: true
  },
  authorId: {
    type:String, required: true
  }
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;