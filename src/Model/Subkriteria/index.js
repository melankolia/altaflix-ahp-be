import Database from "../../Utils/Configs/db.js"


const SubkriteriaModel = {
    findAll: async (payload) => {
        const sql = `SELECT * FROM subkriteria`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findBySubkriteriaId: async (subkriteria_id) => {
        const sql = `SELECT * FROM subkriteria where subkriteria_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [subkriteria_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByKriteriaId: async (kriteria_id) => {
        const sql = `SELECT * FROM subkriteria where kriteria_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [kriteria_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findBySubkriteriaCode: async (code) => {
        const sql = `SELECT * FROM subkriteria where code = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [code], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    insertNilaiBobotAndEigen: async (payload) => {
        const sql = `UPDATE subkriteria SET
                                eigen = ?,
                                bobot_prioritas = ?
                            where subkriteria_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.eigen, payload.bobot_prioritas, payload.subkriteria_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    createSubkriteria: async (PayloadSubkriteria) => {
        const sql = `INSERT INTO subkriteria (nama, keterangan, nilai, kriteria_id) VALUES ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [PayloadSubkriteria.map(e => [e.nama, e.keterangan, e.nilai, e.kriteria_id])], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    updateSubkriteria: async (PayloadSubkriteria) => {
        const sql = `update subkriteria set 
                            nama = ?,
                            keterangan = ?,
                            nilai = ?,
                            bobot_prioritas = ?,
                            kriteria_id = ?
                        where subkriteria_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [
                                    PayloadSubkriteria.nama, 
                                    PayloadSubkriteria.keterangan, 
                                    PayloadSubkriteria.nilai, 
                                    PayloadSubkriteria.bobot_prioritas, 
                                    PayloadSubkriteria.kriteria_id,
                                    PayloadSubkriteria.subkriteria_id
                                ], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteKriteria: async(payload) => {
        const sql = `DELETE FROM kriteria where subkriteria_id in ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [[[payload.subkriteria_id]]], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};


export default SubkriteriaModel;