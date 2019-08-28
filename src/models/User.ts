import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string; 
  email: string; 
  password: string; 
};

export const UserSchema = new mongoose.Schema({
  name: {
    type:String, required: true
  },
  email: {
    type:String, required: true
  },
  password: {
    type:String, required: true, min: 6
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;