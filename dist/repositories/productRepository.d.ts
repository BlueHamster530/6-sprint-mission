import { ProductType, ProductFindOptions } from './../libs/interfaces';
declare function findByUserId(userId: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare function findById(id: number, userId: number): Promise<{
    productLikes: {
        id: number;
        createdAt: Date;
        userId: number;
        productId: number;
    }[];
} & {
    id: number;
    name: string;
    description: string | null;
    price: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}>;
declare function findAll(findOptions: ProductFindOptions, userId: number): Promise<({
    productLikes: {
        id: number;
        createdAt: Date;
        userId: number;
        productId: number;
    }[];
} & {
    id: number;
    name: string;
    description: string | null;
    price: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare function update(id: number, data: ProductType): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}>;
declare function create(userFields: ProductType): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}>;
declare function ondelete(id: number): Promise<{
    id: number;
    name: string;
    description: string | null;
    price: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}>;
declare const _default: {
    findById: typeof findById;
    findAll: typeof findAll;
    update: typeof update;
    create: typeof create;
    ondelete: typeof ondelete;
    findByUserId: typeof findByUserId;
};
export default _default;
//# sourceMappingURL=productRepository.d.ts.map