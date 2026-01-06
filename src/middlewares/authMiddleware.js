import { verifyToken } from "../services/authService";

export const authMiddleware = ( req, res, next ) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) return res.status(401).json({error : "Token não Fornecido"});

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        res.status(403).json({ error : "Token Inválido ou expirado"});
    }
}
