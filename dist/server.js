"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const mongoose_1 = __importDefault(require("mongoose"));
// Controllers
const postController_1 = require("./controllers/postController");
const userController_1 = require("./controllers/userController");
// Connect to database
mongoose_1.default.connect('mongodb://localhost/RoutingControllers', { useNewUrlParser: true }, (err) => {
    if (err) {
        ;
        console.log(err);
    }
    else {
        console.log('Connected to database');
    }
});
const app = routing_controllers_1.createExpressServer({
    classTransformer: false,
    controllers: [postController_1.PostController, userController_1.UserController]
});
app.listen(5000, () => console.log('Server started on port 5000'));
//# sourceMappingURL=server.js.map