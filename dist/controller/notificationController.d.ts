import { ExpressRequest, ExpressResponse } from '../libs/constants';
export default class NotificationController {
    GetNotifications: (req: ExpressRequest, res: ExpressResponse) => Promise<void>;
    GetUnreadCount: (req: ExpressRequest, res: ExpressResponse) => Promise<void>;
    ReadNotification: (req: ExpressRequest, res: ExpressResponse) => Promise<void>;
}
//# sourceMappingURL=notificationController.d.ts.map