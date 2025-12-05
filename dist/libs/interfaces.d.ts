import { Prisma } from '@prisma/client';
export interface ProductType {
    id: number;
    name: string;
    description?: string;
    price: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    comments?: CommentType[];
    productLikes?: ProductLikeType[];
}
export interface ArticleType {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    comments: CommentType[];
    articleLikes: ArticleLikeType[];
}
export interface CommentType {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    productId?: number;
    articleId?: number;
    product?: ProductType;
    article?: ArticleType;
}
export interface UserType {
    id: number;
    email: string;
    password: string;
    nickname: string;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    refreshToken?: string | null;
    productLikes?: ProductLikeType[];
    articleLikes?: ArticleLikeType[];
}
export interface UpdateUserPasswordType {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export interface ProductLikeType {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    productId: number;
    user: UserType;
    product: ProductType;
}
export interface ArticleLikeType {
    id: number;
    userId: number;
    articleId: number;
    user: UserType;
    article: ArticleType;
    createdAt: Date;
}
export type ProductFindOptions = Prisma.ProductFindManyArgs;
export type ArticleFindOptions = Prisma.ArticleFindManyArgs;
export interface ProductWithLikes extends ProductType {
    productLikes: ProductLikeType[];
}
export interface ProductWithIsLiked extends ProductType {
    isLiked: boolean;
}
//# sourceMappingURL=interfaces.d.ts.map