import Database from "../../Utils/Configs/db.js"


const KriteriaModel = {
    findAll: async (payload = {
        search: "",
        sort: "code ASC"
    }) => {
        const sql = `SELECT * FROM kriteria 
                                where nama LIKE '%${payload.search}%' OR code LIKE '%${payload.search}%'
                                ORDER BY ${payload.sort}`
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByKriteriaId: async (kriteria_id) => {
        const sql = `SELECT * FROM kriteria where kriteria_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [kriteria_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByKriteriaCode: async (code) => {
        const sql = `SELECT * FROM kriteria where code = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [code], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    insertNilaiBobotAndEigen: async (payload) => {
        const sql = `UPDATE kriteria SET
                                eigen = ?,
                                bobot_prioritas = ?
                            where kriteria_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.eigen, payload.bobot_prioritas, payload.kriteria_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    createKriteria: async (PayloadKriteria) => {
        const sql = `INSERT INTO kriteria SET ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, PayloadKriteria, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    updateKriteria: async (PayloadKriteria) => {
        const sql = `update kriteria set 
                            code = ?,
                            nama = ?
                        where kriteria_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [PayloadKriteria.code, PayloadKriteria.nama, PayloadKriteria.kriteria_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteKriteria: async(payload) => {
        const sql = `DELETE FROM kriteria where kriteria_id in ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [[[payload.kriteria_id]]], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};


export default KriteriaModel;