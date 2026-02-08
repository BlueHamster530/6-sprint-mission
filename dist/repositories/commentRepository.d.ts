declare function findAll(take: number, cursor: number | undefined, productId: number | undefined, articleId: number | undefined): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    productId: number | null;
    articleId: number | null;
}[]>;
declare function findById(id: number): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    productId: number | null;
    articleId: number | null;
}>;
declare function create(content: string, userId: number, productId?: number, articleId?: number): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    productId: number | null;
    articleId: number | null;
}>;
declare function update(id: number, content: string): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    productId: number | null;
    articleId: number | null;
}>;
declare function deleteComment(id: number): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    productId: number | null;
    articleId: number | null;
}>;
declare function findProductOwner(productId: number): Promise<{
    name: string;
    userId: number;
} | null>;
declare function findArticleOwner(articleId: number): Promise<{
    userId: number;
    title: string;
} | null>;
declare function createNotification(userId: number, content: string): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    isRead: boolean;
}>;
declare const _default: {
    findAll: typeof findAll;
    findById: typeof findById;
    create: typeof create;
    update: typeof update;
    findProductOwner: typeof findProductOwner;
    findArticleOwner: typeof findArticleOwner;
    createNotification: typeof createNotification;
    delete: typeof deleteComment;
};
export default _default;
//# sourceMappingURL=commentRepository.d.ts.map