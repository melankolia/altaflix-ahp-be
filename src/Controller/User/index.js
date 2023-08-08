import Responses from "../../Utils/Helper/Response.js";
import UserService from "../../Service/User/index.js";

const UserController = {
    findAllUser: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }

        try {
            const Result = await UserService.findAll();
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    },
    findByUserid: async (req, res, next) => {
        try {
            if (!req.params?.user_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next)
        }

        try {
            const user_id = req.params?.user_id;

            const Result = await UserService.findByUserid(user_id);
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    },
    userLogin: async (req, res, next) => {
        try {
            if (!req.body?.username) throw "Username Required";
            else if (!req.body?.password) throw "Password Required";
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                username: req.body?.username,
                password: req.body?.password,
            } 

            const Result = await UserService.userLogin(payload);
            return Responses.success(res, Result)
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    },
    registerUser: async(req, res, next) => {
        try {
            if (!req.body?.username ||
                !req.body?.password ||
                !req.body?.nama_lengkap
            ) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            let payload = {
                username: req.body?.username,
                password: req.body?.password,
                nama_lengkap: req.body?.nama_lengkap,
                email: req.body?.email
            }
            let Result;
            if (!req.body?.user_id)  {
                Result = await UserService.registerUser(payload);
            } else {
                payload = {...payload, user_id: req.body?.user_id}
                Result = await UserService.updateUser(payload);
            }
            return Responses.success(res, Result);
        } catch (error) {
            if (error == 'Username is Already Taken') return Responses.badRequest(res, error, next);
            return Responses.failed(res, error, next);
        }

    },
    deleteUser: async(req, res, next) => {
        try {
            if (!req.params?.user_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                user_id: +req.params.user_id
            };

            console.log(payload);

            const Result = await UserService.deleteUser(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }

    }
}

export default UserController;