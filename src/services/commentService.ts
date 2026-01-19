import commentRepository from '../repositories/commentRepository';
import { CustomError } from '../libs/Handler/errorHandler';

class CommentService {
    async getComments(take: number, cursor: number | undefined, productId: number | undefined, articleId: number | undefined) {
        const comments = await commentRepository.findAll(take, cursor, productId, articleId);
        let nextCursor = null;
        if (comments.length > 0 && comments.length === take) {
            nextCursor = comments[comments.length - 1]!.id;
        }

        return { comments, nextCursor };
    }

    async getCommentById(id: number) {
        return await commentRepository.findById(id);
    }

    async createComment(content: string, productId?: number, articleId?: number) {
        if ((productId && articleId) || (!productId && !articleId)) {
            throw new CustomError(400, 'Comment must belong to EITHER a Product OR an Article.');
        }
        if (!content || content.trim() === '') {
            throw new CustomError(400, 'Content cannot be empty.');
        }

        return await commentRepository.create(content, productId, articleId);
    }

    async updateComment(id: number, content: string) {
        if (content !== undefined && content.trim() === '') {
            throw new CustomError(400, 'Content cannot be empty.');
        }

        return await commentRepository.update(id, content);
    }

    async deleteComment(id: number) {
        return await commentRepository.delete(id);
    }
}

export const commentService = new CommentService();