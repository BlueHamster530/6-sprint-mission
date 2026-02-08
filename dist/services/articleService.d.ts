import { ArticleFindOptions, ArticlePublicData, UpdateArticleData } from './../libs/interfaces';
declare class ArticleService {
    likeArticle(userId: number, articleId: number): Promise<{
        liked: boolean;
    }>;
    getArticleById(articleId: number, userId: number): Promise<{
        isLiked: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
    }>;
    getArticles(findOptions: ArticleFindOptions, userId: number): Promise<{
        isLiked: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
    }[]>;
    postArticle(userFields: ArticlePublicData): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
    }>;
    patchArticleById(id: number, userFields: UpdateArticleData): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
    }>;
    deleteArticleById(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
    }>;
}
export declare const articleService: ArticleService;
export {};
//# sourceMappingURL=articleService.d.ts.map