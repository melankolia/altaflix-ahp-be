import Database from "../../Utils/Configs/db.js"


const ProjekModel = {
    findAll: async (payload) => {
        const sql = `SELECT 	projek_id,
                                projek.code,
                                projek.nama as namaProjek,
                                divisi.divisi_id,
                                divisi.nama as namaDivisi
                            FROM projek 
                            inner join divisi on projek.divisi_id = divisi.divisi_id;`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByProjekId: async (projek_id) => {
        const sql = `SELECT *   FROM projek 
                                left join divisi on projek.divisi_id = divisi.divisi_id
                                where projek_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [projek_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByProjekCode: async (code) => {
        const sql = `SELECT * FROM projek where code = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [code], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    createProjek: async (PayloadProjek) => {
        const sql = `INSERT INTO projek SET ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, PayloadProjek, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    updateProjek: async (PayloadProjek) => {
        const sql = `update projek set 
                            code = ?,
                            nama = ?,
                            divisi_id = ?
                        where projek_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [PayloadProjek.code, PayloadProjek.nama, PayloadProjek.divisi_id, PayloadProjek.projek_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteProjek: async(payload) => {
        const sql = `DELETE FROM projek where projek_id in ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [[[payload.projek_id]]], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};


export default ProjekModel;