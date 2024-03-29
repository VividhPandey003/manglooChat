import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie('token', token,  {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
        sameSite: "strict", //CSRF attack cross site request forgery attacks
        secure: process.env.NODE_ENV !== "development" //https
    });
};

export default generateTokenAndSetCookie;