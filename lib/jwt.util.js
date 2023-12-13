// node.js의 내장함수인 util모듈 중에  promisify라는 함수
// 비동기로 돌리려는 함수를 promise로 감싸주지 않고 사용할 수 있다.
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import redisClient from './redis';

const secret = process.env.TOKEN_KEY;

exports = {};
