import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Logger from '../logger/winston_logger.js';

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res
        .status(statusCode)
        .cookie('token', token, {
            httpOnly: true,
        maxage: 1000 * 60 * 15,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true
        })
        .json({ success: true, user: { username: user.username, scores: user.scores, highestscore: user.highestscore} });
};

export const register = async (req, res) => {
    const { username, password } =await req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();

        sendTokenResponse(user, 201, res);
    } catch (err) {
        Logger.error(err?.message)
        res.status(500).json({ msg: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } =await  req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

export const logout = (req,res) => {
    res
        .status(200)
        .cookie('token', '', {
            httpOnly: true,
            expires: new Date(Date.now()),
             sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true
        })
        .json({ success: true, msg: 'User logged out' });
};



export const getUser=(req,res)=>{
    const user=req.user;
    res.status(200).json({user:{
        username:user.username,
        highestscore:user.highestscore,
        scores:user.scores
    }
    });
};
