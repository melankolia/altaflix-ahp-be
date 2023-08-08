import UserModel from "../../Model/User/index.js";
import JWT from "jsonwebtoken";

const UserService = {
    findAll: async () => {
        try {

            const Result = await UserModel.findAll();
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    findByUserid: async (id) => {
        try {
            const [User] = await UserModel.findByUserid(id);
            if (!User) throw "User's Not Found";

            return User;
        } catch (error) {
            throw error
            
        }
    },
    userLogin: async (PayloadUser) => {
        try {
            const [User] = await UserModel.findByUsername(PayloadUser.username);
            if (!User) throw "User's Not Found";

            if (!(User.password == PayloadUser.password)) throw "Incorrect Password"

            const token = JWT.sign({ username: User.username }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '6h' });

            const Response = {
                ...User,
                token
            }
            return Response;
        } catch (error) {
            throw error;
        }
    },
    registerUser: async (PayloadUser) => {
        try {
            const [User] = await UserModel.findByUsername(PayloadUser.username);
            if (User) throw "Username is Already Taken";

            const Result = await UserModel.createUser(PayloadUser);
            if (!Result) throw "Error Register"

            const token = JWT.sign({ username: PayloadUser.username }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '6h' });

            const Response = {
                ...PayloadUser,
                token
            }
            return Response;
        } catch (error) {
            throw error;
        }
    },
    updateUser: async(PayloadUser) => {
        try {
            const [User] = await UserModel.findByUserid(PayloadUser.user_id);
            if (!User) throw "User is Not Found";

            const Result = await UserModel.updateUser(PayloadUser);
            if (!Result) throw "Error Update"

            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteUser: async (PayloadUser) => {
        try {
            const User = await UserModel.deleteUser(PayloadUser);
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default UserService