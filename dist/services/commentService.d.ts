declare class CommentService {
    getComments(take: number, cursor: number | undefined, productId: number | undefined, articleId: number | undefined): Promise<{
        comments: {
            id: number;
            createdAt: Date;
            userId: number;
            content: string;
            productId: number | null;
            articleId: number | null;
        }[];
        nextCursor: number | null;
    }>;
    getCommentById(id: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        productId: number | null;
        articleId: number | null;
    }>;
    createComment(userId: number, content: string, productId?: number, articleId?: number): Promise<{
        comment: {
            id: number;
            createdAt: Date;
            userId: number;
            content: string;
            productId: number | null;
            articleId: number | null;
        };
        notification: {
            id: number;
            createdAt: Date;
            userId: number;
            content: string;
            isRead: boolean;
        } | null;
    }>;
    updateComment(id: number, content: string): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        productId: number | null;
        articleId: number | null;
    }>;
    deleteComment(id: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        productId: number | null;
        articleId: number | null;
    }>;
}
export declare const commentService: CommentService;
export {};
//# sourceMappingURL=commentService.d.ts.map