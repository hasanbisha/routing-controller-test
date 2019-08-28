import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import mongoose from 'mongoose';

// Controllers
import { PostController } from './controllers/postController';
import { UserController } from './controllers/userController';

// Connect to database
mongoose.connect('mongodb://localhost/RoutingControllers', {useNewUrlParser: true}, (err) => {
    if(err) {;
        console.log(err)
    } else {
        console.log('Connected to database');
    }
});

const app = createExpressServer({
    classTransformer: false,
    controllers: [PostController, UserController] 
});

app.listen(5000, () => console.log('Server started on port 5000'));