import { ProductFindOptions } from '../libs/interfaces';
declare class ProductService {
    likeProduct(userId: number, productId: number): Promise<{
        liked: boolean;
    }>;
    getProductById(productId: number, userId: number): Promise<{
        isLiked: boolean;
        id: number;
        name: string;
        description: string | null;
        price: number;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProducts(findOptions: ProductFindOptions, userId: number): Promise<{
        isLiked: boolean;
        id: number;
        name: string;
        description: string | null;
        price: number;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
export declare const productService: ProductService;
export {};
//# sourceMappingURL=productService.d.ts.map