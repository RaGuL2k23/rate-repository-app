import express from 'express';
import getRepositories from './getRepositories';

const router = express.Router();

router.get('/', getRepositories);

export default router;
