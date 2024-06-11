import { Context } from 'hono';
import { getComments, createComment, updateComment, deleteComment } from './comment.service';

// Controller to handle HTTP requests for comments
export const handleGetComments = async (c: Context) => {
    try {
        const comments = await getComments();
        return c.json(comments);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to fetch comments', details: message }, 500);
    }
}

export const handleCreateComment = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const newComment = await createComment(comment);
        return c.json(newComment);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to create comment', details: message }, 500);
    }
}

export const handleUpdateComment = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const commentInfo = await c.req.json();

        // Validate commentInfo
        if (!commentInfo || Object.keys(commentInfo).length === 0) {
            return c.json({ error: 'No values to update' }, 400);
        }

        const updatedComment = await updateComment(Number(id), commentInfo);
        return c.json(updatedComment);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to update comment', details: message }, 500);
    }
}

export const handleDeleteComment = async (c: Context) => {
    try {
        const { id } = c.req.param();
        const deletedComment = await deleteComment(Number(id));
        return c.json(deletedComment);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return c.json({ error: 'Failed to delete comment', details: message }, 500);
    }
}
