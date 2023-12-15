
import { prisma } from './../utils/prisma/index.js';

export default async (req, res, next) => {
  const user = res.locals.user;
  if( user.type === 1 ){
    const store = await prisma.stores.findUnique({ where: { user_id } });

    if(store) {
      res.locals.store = store;
      next();
    }
    else {
      res.locals.store = null;
      next();
    }
  }
  else {
    return res
        .status(200)
        .json({ message: '사업 권한이 없습니다.' });
  }
}
