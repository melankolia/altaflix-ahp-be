import Database from "../../Utils/Configs/db.js"


const DivisiModel = {
    findAll: async (payload) => {
        const sql = `SELECT * FROM divisi`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByDivisiId: async (divisi_id) => {
        const sql = `SELECT * FROM divisi where divisi_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [divisi_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByDivisiCode: async (code) => {
        const sql = `SELECT * FROM divisi where code = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [code], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    createDivisi: async (PayloadDivisi) => {
        const sql = `INSERT INTO divisi SET ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, PayloadDivisi, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    updateDivisi: async (PayloadDivisi) => {
        const sql = `update divisi set 
                            code = ?,
                            nama = ?
                        where divisi_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [PayloadDivisi.code, PayloadDivisi.nama, PayloadDivisi.divisi_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteDivisi: async(payload) => {
        const sql = `DELETE FROM divisi where divisi_id in ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [[[payload.divisi_id]]], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};


export default DivisiModel;