import Database from "../../Utils/Configs/db.js"


const UserModel = {
    findAll: async (payload) => {
        const sql = `SELECT * FROM user`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByUsername: async (username) => {
        const sql = `SELECT * FROM user where username = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [username], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    createUser: async (PayloadUser) => {
        const sql = `INSERT INTO user SET ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, PayloadUser, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteUser: async(payload) => {
        const sql = `DELETE FROM user where user_id in ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [[[payload.user_id]]], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};


export default UserModel;