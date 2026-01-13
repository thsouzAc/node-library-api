import { verifyToken } from "../services/authService.js";

export const authMiddleware = ( req, res, next ) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) return res.status(401).json({error : "Token não Fornecido"});

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        res.status(403).json({ error : "Token Inválido ou expirado"});
    }
}
