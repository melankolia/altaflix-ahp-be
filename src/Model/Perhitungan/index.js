import Database from "../../Utils/Configs/db.js"

const PerhitunganModel = {
    getKriteria: async () => {
        const sql = `select     	GROUP_CONCAT(value) as value, 
                                    GROUP_CONCAT(DISTINCT nama) as kategori,
                                    GROUP_CONCAT(matriks_id) as matriks_id
                                FROM matriks_perbandingan
                                inner join kriteria on matriks_perbandingan.kriteria_id = kriteria.kriteria_id
                                GROUP BY yIndex
                                ORDER BY yIndex ASC`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    updateMatriksKriteria: async (payload) => {
        const sql = `update matriks_perbandingan set
                            xIndex = ?,
                            yIndex = ?,
                            value = ?
                        where matriks_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.xIndex, payload.yIndex, payload.value, payload.matriks_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    insertMatriksKriteria: async (payload) => {
        const sql = `insert into matriks_perbandingan (xIndex, yIndex, value, kriteria_id) VALUES ? `;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.map(e => [e.xIndex, e.yIndex, e.value, e.kriteria_id])], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteMatriksKriteria: async () => {
        const sql = `DELETE FROM matriks_perbandingan where kriteria_id IS NOT NULL`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    getSubkriteria: async (kriteria_id) => {
            const sql = `select     GROUP_CONCAT(value) as value, 
                                    GROUP_CONCAT(DISTINCT nama) as kategori,
                                    GROUP_CONCAT(DISTINCT subkriteria.kriteria_id) as kriteria_id,
                                    GROUP_CONCAT(matriks_id) as matriks_id
                                FROM matriks_perbandingan
                                inner join subkriteria on matriks_perbandingan.subkriteria_id = subkriteria.subkriteria_id
                                where subkriteria.kriteria_id = ?
                                GROUP BY yIndex
                                ORDER BY yIndex ASC;`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [kriteria_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    insertMatriksSubkriteria: async (payload) => {
        const sql = `insert into matriks_perbandingan (xIndex, yIndex, value, subkriteria_id) VALUES ? `;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.map(e => [e.xIndex, e.yIndex, e.value, e.subkriteria_id])], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteMatriksSubkriteria: async (payload) => {
        const sql = `DELETE FROM matriks_perbandingan where subkriteria_id in ( select subkriteria_id from subkriteria where kriteria_id = ? )`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
};

export default PerhitunganModel;