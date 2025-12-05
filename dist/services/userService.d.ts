import { UserType, UpdateUserPasswordType } from "./../libs/interfaces";
declare class UserService {
    createUser(user: UserType): Promise<{
        id: number;
        email: string;
        nickname: string;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
        productLikes?: import("./../libs/interfaces").ProductLikeType[];
        articleLikes?: import("./../libs/interfaces").ArticleLikeType[];
    }>;
    filterSensitivceUserData(user: UserType): {
        id: number;
        email: string;
        nickname: string;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
        productLikes?: import("./../libs/interfaces").ProductLikeType[];
        articleLikes?: import("./../libs/interfaces").ArticleLikeType[];
    };
    getUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        nickname: string;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
        productLikes?: import("./../libs/interfaces").ProductLikeType[];
        articleLikes?: import("./../libs/interfaces").ArticleLikeType[];
    }>;
    getUserById(id: number): Promise<{
        id: number;
        email: string;
        nickname: string;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
        productLikes?: import("./../libs/interfaces").ProductLikeType[];
        articleLikes?: import("./../libs/interfaces").ArticleLikeType[];
    }>;
    updateProfile(id: number, data: UserType): Promise<{
        id: number;
        email: string;
        nickname: string;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
        productLikes?: import("./../libs/interfaces").ProductLikeType[];
        articleLikes?: import("./../libs/interfaces").ArticleLikeType[];
    }>;
    updatePassword(id: number, data: UpdateUserPasswordType): Promise<{
        id: number;
        email: string;
        nickname: string;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
        productLikes?: import("./../libs/interfaces").ProductLikeType[];
        articleLikes?: import("./../libs/interfaces").ArticleLikeType[];
    }>;
    getProductsByUserId(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getLikedProductsByUserId(id: number): Promise<({
        product: {
            id: number;
            name: string;
            description: string | null;
            price: number;
            tags: string[];
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        productId: number;
    })[]>;
    updateUser(id: number, data: UserType): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        nickname: string;
        image: string | null;
        password: string;
        refreshToken: string | null;
    }>;
    verifyPassword(inputPassword: string, savedPassword: string): Promise<void>;
    createToken(user: UserType, type?: string): string;
    refreshToken(userId: number, refreshToken: string): Promise<{
        accessToken: string;
        newRefreshToken: string;
    }>;
}
export declare const userService: UserService;
export {};
//# sourceMappingURL=userService.d.ts.map