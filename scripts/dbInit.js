import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function initializeDatabase() {
    try {
        // Prisma를 사용한 데이터베이스 초기화 및 마이그레이션 코드 작성
        // 예: prisma.$executeRaw() 또는 prisma.$queryRaw()
        // Prisma를 사용한 데이터베이스 초기화 코드 작성
        await prisma.$executeRaw`YOUR_RAW_SQL_QUERY_HERE`;

        console.log('데이터베이스 초기화 및 마이그레이션 완료');
    } catch (error) {
        console.error('데이터베이스 초기화 오류:', error);
    } finally {
        await prisma.$disconnect();
    }
}

initializeDatabase();
