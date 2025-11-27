import { userService } from '../services/userService.js';


export async function register(req, res) {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await userService.getUser(email, password);
    const accessToken = userService.createToken(user);
    return res.status(200).json({ accessToken });
}    
