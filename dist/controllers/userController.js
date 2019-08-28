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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validation_1 = require("../middleware/validation");
// Import models
const User_1 = __importDefault(require("../models/User"));
let UserController = class UserController {
    async register(name, email, password) {
        const { error } = validation_1.registerValidation(name, email, password);
        if (error) {
            return { message: error.details[0].message };
        }
        const existingUser = await User_1.default.find({ email: email });
        if (existingUser.length) {
            return 'Email alredy registered';
        }
        else {
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            const newUser = new User_1.default({
                name: name,
                email: email,
                password: hashedPassword
            });
            newUser.save();
            const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, 'foryoureyezonly');
            return { token: token };
        }
    }
    async login(email, password) {
        const { error } = validation_1.loginValidation(email, password);
        if (error) {
            return { message: error.details[0].message };
        }
        const user = await User_1.default.findOne({ email: email });
        if (!user) {
            return 'User does not exist';
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return 'Invalid Password';
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, 'foryoureyezonly');
        return { token: token };
    }
};
__decorate([
    routing_controllers_1.Post('/register'),
    __param(0, routing_controllers_1.BodyParam('name')),
    __param(1, routing_controllers_1.BodyParam('email')),
    __param(2, routing_controllers_1.BodyParam('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    routing_controllers_1.Post('/login'),
    __param(0, routing_controllers_1.BodyParam('email')),
    __param(1, routing_controllers_1.BodyParam('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    routing_controllers_1.JsonController()
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map