import { Hono } from 'hono';
import { handleGetComments, handleCreateComment, handleUpdateComment, handleDeleteComment } from './comment.controller';

const commentRouter = new Hono();

// Define routes for comment resource
commentRouter.get('/comments', handleGetComments);
commentRouter.post('/comments', handleCreateComment);
commentRouter.put('/comments/:id', handleUpdateComment);
commentRouter.delete('/comments/:id', handleDeleteComment);

export default commentRouter;
