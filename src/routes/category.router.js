import express from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

//카테고리 분류 보기
router.get('', async (req, res, next) => {
  const categories = await prisma.categories.findMany({
    select: {
      name: true,
      image_url:true
    },
  });
  return res.status(201).json({ data:categories});
});

export default router;