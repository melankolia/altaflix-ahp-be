import JWT from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import Responses from "./Response.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const AuthCheck = {
    token: (req, res, next) => {
        try {
            const { authorization } = req.headers
            const token = authorization?.split(" ")[1];

            JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    if (err.name == 'TokenExpiredError') throw "Token Expired";
                    else if (err.name == 'JsonWebTokenError') throw "Token Not Found";
                    else throw err.name
                } else {
                    next();
                }
            });
        } catch (error) {
            return Responses.tokenError(res, error, next);
        }
    },
    isAdmin: (req, res, next) => {
        try {
            const { authorization } = req.headers
            const token = authorization?.split(" ")[1];

            JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (decoded.type != 'admin') throw "Unauthorized access"
                else next()
            });

        } catch (error) {
            return Responses.tokenError(res, error, next);
        }
    }
}

export default AuthCheck;