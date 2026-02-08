import { ProductFindOptions, ProductPublicData } from '../libs/interfaces';
declare class ProductService {
    likeProduct(userId: number, productId: number): Promise<{
        liked: boolean;
    }>;
    getProductById(productId: number, userId: number): Promise<{
        isLiked: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: number;
        description: string | null;
        price: number;
        tags: string[];
    }>;
    getProducts(findOptions: ProductFindOptions, userId: number): Promise<{
        isLiked: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: number;
        description: string | null;
        price: number;
        tags: string[];
    }[]>;
    createProducts(userFields: ProductPublicData): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: number;
        description: string | null;
        price: number;
        tags: string[];
    }>;
    updateProduct(id: number, userFields: ProductPublicData): Promise<{
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            userId: number;
            description: string | null;
            price: number;
            tags: string[];
        };
        notifications: {
            id: number;
            createdAt: Date;
            userId: number;
            content: string;
            isRead: boolean;
        }[];
    }>;
    deleteProduct(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        userId: number;
        description: string | null;
        price: number;
        tags: string[];
    }>;
}
export declare const productService: ProductService;
export {};
//# sourceMappingURL=productService.d.ts.map