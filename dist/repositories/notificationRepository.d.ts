declare function findAll(userId: number): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    isRead: boolean;
}[]>;
declare function countUnread(userId: number): Promise<number>;
declare function findById(id: number): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    isRead: boolean;
} | null>;
declare function markAsRead(id: number): Promise<{
    id: number;
    createdAt: Date;
    userId: number;
    content: string;
    isRead: boolean;
}>;
declare const _default: {
    findAll: typeof findAll;
    countUnread: typeof countUnread;
    findById: typeof findById;
    markAsRead: typeof markAsRead;
};
export default _default;
//# sourceMappingURL=notificationRepository.d.ts.map