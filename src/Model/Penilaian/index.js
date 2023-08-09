import Database from "../../Utils/Configs/db.js";

const PenilaianModel = {
    insertData: async (payload) => {
        const sql = `INSERT INTO penilaian (subkriteria_id, nilai_id) VALUES ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.map(e => [e.subkriteria_id, e.nilai_id])], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};

export default PenilaianModel;