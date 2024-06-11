import {db} from '../drizzle/db';
import { CommentTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Service to handle database operations for comments
export const getComments = async () => {
    return await db.select().from(CommentTable);
}

export const createComment = async (comment: any) => {
    return await db.insert(CommentTable).values(comment).returning();
}

export const updateComment = async (id: number, comment: any) => {
    if (!comment || Object.keys(comment).length === 0) {
        throw new Error('No values to set');
    }

    return await db.update(CommentTable).set(comment).where(eq(CommentTable.id, id)).returning();
}

export const deleteComment = async (id: number) => {
    return await db.delete(CommentTable).where(eq(CommentTable.id, id)).returning();
}
