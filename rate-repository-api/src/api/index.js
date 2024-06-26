import express from 'express';
import repositories from './repositories';

const router = express.Router();

router.use('/repositories', repositories);

export default router;
