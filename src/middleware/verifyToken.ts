import jwt from 'jsonwebtoken';

export function verifyToken(request: any, response: any, next: (err?: any) => any): any {
    const token = request.header('Authorization');

    if(!token) {
        response.send('Access Denied');
    }

    try {
        const verifiedUser = jwt.verify(token, 'foryoureyezonly');
        request.user = verifiedUser;
        next();
    } catch (error) {
        response.send('Invalid token');
    }  
};