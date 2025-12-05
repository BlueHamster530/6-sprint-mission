import { UserType } from "./../libs/interfaces";
declare function findById(id: number): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    nickname: string;
    image: string | null;
    password: string;
    refreshToken: string | null;
} | null>;
declare function findByEmail(email: string): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    nickname: string;
    image: string | null;
    password: string;
    refreshToken: string | null;
} | null>;
declare function save(user: UserType): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    nickname: string;
    image: string | null;
    password: string;
    refreshToken: string | null;
}>;
declare function update(id: number, data: Partial<UserType>): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    nickname: string;
    image: string | null;
    password: string;
    refreshToken: string | null;
}>;
declare const _default: {
    findById: typeof findById;
    findByEmail: typeof findByEmail;
    save: typeof save;
    update: typeof update;
};
export default _default;
//# sourceMappingURL=userRepository.d.ts.map