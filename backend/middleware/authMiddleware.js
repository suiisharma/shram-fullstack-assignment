import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Logger from "../logger/winston_logger.js";

const AuthMiddleWare = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ success: false, message: 'Login Please!' })
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({_id: decodeData.id });
        if (!user) {
            Logger.error(error?.message);
            return res.status(400).json({
                message: 'Some error occurred!'
            });
        }
        req.user=user;
        next();
    } catch (error) {
        Logger.error(error?.message)
        return res.status(401).json({
            message: 'Some error occurred!'
        })
    }
}


export default AuthMiddleWare;