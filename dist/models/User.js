"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
exports.UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true, min: 6
    },
});
const User = mongoose_1.default.model('User', exports.UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map