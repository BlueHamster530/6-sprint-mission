declare function find(userId: any, productId: any): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    productId: number;
} | null>;
declare function create(userId: any, productId: any): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    productId: number;
}>;
declare function remove(id: any): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    productId: number;
}>;
declare function findLikedProductsByUserId(userId: any): Promise<({
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
declare const _default: {
    find: typeof find;
    create: typeof create;
    remove: typeof remove;
    findLikedProductsByUserId: typeof findLikedProductsByUserId;
};
export default _default;
//# sourceMappingURL=productLikeRepository.d.ts.map