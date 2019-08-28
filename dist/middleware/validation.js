"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
// Register Validation
exports.registerValidation = (name, email, password) => {
    const Schema = {
        name: joi_1.default.string()
            .min(3)
            .required(),
        email: joi_1.default.string()
            .required()
            .email(),
        password: joi_1.default.string()
            .min(6)
            .required()
    };
    // Validate data before a user is created
    return joi_1.default.validate({ name, email, password }, Schema);
};
exports.loginValidation = (email, password) => {
    const Schema = {
        email: joi_1.default.string()
            .min(6)
            .required()
            .email(),
        password: joi_1.default.string()
            .min(6)
            .required()
    };
    // Validate data before we login
    return joi_1.default.validate({ email, password }, Schema);
};
// export const updateUserValidation = data => {
//     const Schema = {
//         name: Joi.string()
//             .min(3)
//             .required(),
//         password: Joi.string()
//             .min(6)
//             .required(),
//         newPassword: Joi.string()
//             .min(6)
//             .required()
//     };
//     // Validate data before we update
//     return Joi.validate(data, Schema);
// }
//# sourceMappingURL=validation.js.map