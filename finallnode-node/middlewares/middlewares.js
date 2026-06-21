import jwt, { decode } from 'jsonwebtoken'

// בדיקה שנשלח טוקן ושהוא תקין ותקף
export const checkAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        // Authorization - הרשאה
        return res.status(401).send('Authorization failed!')
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).send('Authorization failed!')
    }

    // אימות של הטוקן - קיים - תקין ותקף
    // decoded - פיענוח
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            // authentication - אימות
            return res.status(401).send('Authentication failed!')
        }
        if (decoded) {
            // decoded - מכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // במקרה הצורך נשמור את הנתונים באובייקט הבקשה
            next()
        }
    })
}