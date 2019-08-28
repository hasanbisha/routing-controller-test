"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(request, response, next) {
    const token = request.header('Authorization');
    if (!token) {
        response.send('Access Denied');
    }
    try {
        const verifiedUser = jsonwebtoken_1.default.verify(token, 'foryoureyezonly');
        request.user = verifiedUser;
        next();
    }
    catch (error) {
        response.send('Invalid token');
    }
}
exports.verifyToken = verifyToken;
;
//# sourceMappingURL=verifyToken.js.map