import jwt from 'jsonwebtoken';
import { prisma } from './../utils/prisma/index.js';
export default async (req, res, next, error) => {
    try {
        const { authorization } = req.cookies;
        if (!authorization) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const [tokenType, token] = authorization.split(' ');

        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const id = decodedToken.user_id;
        const user = await prisma.users.findUnique({ where: { id } });

        res.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
