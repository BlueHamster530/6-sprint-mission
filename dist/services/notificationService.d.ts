declare class NotificationService {
    getNotifications(userId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        isRead: boolean;
    }[]>;
    getUnreadCount(userId: number): Promise<{
        count: number;
    }>;
    readNotification(userId: number, notificationId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        content: string;
        isRead: boolean;
    }>;
}
export declare const notificationService: NotificationService;
export {};
//# sourceMappingURL=notificationService.d.ts.map