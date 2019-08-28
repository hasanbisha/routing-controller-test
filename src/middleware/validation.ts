import Joi from '@hapi/joi';

// Register Validation

export const registerValidation = (name: string, email: string, password: string) => {
    const Schema = {
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    // Validate data before a user is created
    return Joi.validate({ name, email, password }, Schema);
}

export const loginValidation = (email: string, password: string) => {
    const Schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
      password: Joi.string()
            .min(6)
            .required()
    }

    // Validate data before we login
    return Joi.validate({ email, password }, Schema);
}

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
