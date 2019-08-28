import { JsonController, Post, BodyParam } from 'routing-controllers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { loginValidation, registerValidation } from '../middleware/validation';

// Import models
import User from '../models/User'

@JsonController()
export class UserController{
    @Post('/register')
    async register(
        @BodyParam('name') name: string,
        @BodyParam('email') email: string,
        @BodyParam('password') password: string,    
    ) {
        const { error } = registerValidation(name, email, password);
        if(error) {
            return { message: error.details[0].message };
        }

        const existingUser = await User.find({ email: email });

        if(existingUser.length) {
            return 'Email alredy registered';
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            });
    
            newUser.save();

            const token = jwt.sign({ _id: newUser._id }, 'foryoureyezonly');

            return {token: token};
        }
    }

    @Post('/login')
    async login(
        @BodyParam('email') email: string,
        @BodyParam('password') password: string
    ) {
        const { error } = loginValidation(email, password);
        if(error) {
            return { message: error.details[0].message };
        }

        const user = await User.findOne({ email: email });

        if(!user) {
            return 'User does not exist';
        } 

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return 'Invalid Password';
        }

        const token = jwt.sign({ _id: user._id }, 'foryoureyezonly');

        return {token: token};
    }
}