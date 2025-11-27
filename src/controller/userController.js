import { userService } from '../services/userService.js';


export async function register(req, res) {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await userService.getUser(email, password);
    const accessToken = userService.createToken(user);
    const refreshToken = userService.createToken(user, 'refresh');
    await userService.updateUser(user.id, { refreshToken });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    return res.status(200).json({ accessToken });
}
export async function refresh(req, res) {
    const { refreshToken } = req.cookies;
    const { userId } = req.auth;
    const { accessToken, newRefreshToken } = await userService.refreshToken(userId, refreshToken); // 변경
    await userService.updateUser(userId, { refreshToken: newRefreshToken }); // 추가
    res.cookie('refreshToken', newRefreshToken, { // 추가
        path: '/token/refresh',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    return res.json({ accessToken });
}