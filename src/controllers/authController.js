import { loginUser } from "../services/authService";

export const login = async ( req, res ) => {
    try {
        const {token, user} = await loginUser(req.body);
        res.json({token, user});
    } catch ( error ) {
        res.status(400).json({ error : error.message});
    }
}