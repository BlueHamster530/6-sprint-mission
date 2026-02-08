"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./libs/constants");
const cors_1 = __importDefault(require("cors"));
const routerManager_1 = require("./Routers/routerManager");
const corsSetUp_1 = require("./libs/corsSetUp");
const errorHandler_1 = __importDefault(require("./libs/Handler/errorHandler"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, constants_1.EXPRESS)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: (0, corsSetUp_1.getCorsOrigin)(), // Express에서 쓰던 것과 똑같이 맞춰주세요
        methods: ["GET", "POST"],
        credentials: true
    }
});
io.use((socket, next) => {
    const token = socket.handshake.auth.accessToken;
    if (!token) {
        return next(new Error('Authentication error'));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        socket.data.userId = payload.userId;
        next();
    }
    catch (e) {
        next(new Error('Authentication error'));
    }
});
app.set('io', io);
app.use((0, cors_1.default)({
    origin: (0, corsSetUp_1.getCorsOrigin)(),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(constants_1.EXPRESS.static('public'));
app.use(constants_1.EXPRESS.json());
app.use(constants_1.EXPRESS.urlencoded({ extended: true }));
app.use('/upload', constants_1.EXPRESS.static('upload'));
app.use('/', routerManager_1.RouterManager);
app.use(errorHandler_1.default);
// --- 소켓 연결 이벤트 (테스트용) ---
io.on('connection', (socket) => {
    console.log('새로운 소켓 연결:', socket.id);
    // 로그인하면 해당 유저의 ID로 방을 만들어줌 (알림 기능을 위해 필수)
    const userId = socket.data.userId;
    if (userId) {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    }
});
httpServer.listen(constants_1.PORT, () => {
    console.log(`Server is running on port ${constants_1.PORT}`);
});
exports.default = app;
//# sourceMappingURL=main.js.map