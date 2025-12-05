declare const errorHandler: (err: any, req: any, res: any, next: any) => any;
export default errorHandler;
/**
 * 모든 커스텀 에러의 기본이 되는 클래스
 * HTTP 상태 코드와 메시지를 포함하여 Global Error Handler가 쉽게 처리할 수 있도록 합니다.
 */
export declare class CustomError extends Error {
    constructor(statusCode?: number, message?: string, data?: {});
}
export declare const globalErrorHandler: (err: any, req: any, res: any, next: any) => void;
//# sourceMappingURL=errorHandler.d.ts.map