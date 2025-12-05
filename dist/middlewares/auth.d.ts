declare function verifyProduectAuth(req: any, res: any, next: any): Promise<any>;
declare function verifyArticleAuth(req: any, res: any, next: any): Promise<any>;
declare const _default: {
    verifyAccessToken: {
        (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): Promise<void>;
        unless: typeof import("express-unless").unless;
    };
    softVerifyAccessToken: (req: any, res: any, next: any) => void;
    verifyProduectAuth: typeof verifyProduectAuth;
    verifyArticleAuth: typeof verifyArticleAuth;
    verifyRefreshToken: {
        (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction): Promise<void>;
        unless: typeof import("express-unless").unless;
    };
};
export default _default;
//# sourceMappingURL=auth.d.ts.map