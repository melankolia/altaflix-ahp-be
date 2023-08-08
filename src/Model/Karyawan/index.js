import Database from "../../Utils/Configs/db.js"


const Karyawan = {
    findAll: async (payload) => {
        const sql = `SELECT * FROM karyawan`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByKaryawanId: async (karyawan_id) => {
        const sql = `SELECT * FROM karyawan where karyawan_id = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [karyawan_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByKaryawanNIK: async (nik) => {
        const sql = `SELECT * FROM karyawan where nik = ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, [nik], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    createKaryawan: async (PayloadKaryawan) => {
        const sql = `INSERT INTO karyawan SET ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, PayloadKaryawan, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    updateKaryawan: async (PayloadKaryawan) => {
        const sql = `update karyawan set 
                                nik = ?,
                                nama = ?,
                                jenis_kelamin = ?,
                                tempat_lahir = ?,
                                tanggal_lahir = ?,
                                agama = ?,
                                status_pernikahan = ?,
                                alamat = ?,
                                no_telpon = ?,
                                pendidikan_terakhir = ?,
                                status_karyawan = ?,
                                projek_id = ?,
                                divisi_id = ?,
                                jabatan = ?,
                                no_ktp = ?,
                                npwp = ?,
                                tanggal_masuk = ?,
                                image = ?
                        where karyawan_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [   PayloadKaryawan.nik, 
                                    PayloadKaryawan.nama, 
                                    PayloadKaryawan.jenis_kelamin,
                                    PayloadKaryawan.tempat_lahir, 
                                    PayloadKaryawan.tanggal_lahir, 
                                    PayloadKaryawan.agama,
                                    PayloadKaryawan.status_pernikahan,
                                    PayloadKaryawan.alamat,
                                    PayloadKaryawan.no_telpon,
                                    PayloadKaryawan.pendidikan_terakhir,
                                    PayloadKaryawan.status_karyawan,
                                    PayloadKaryawan.projek_id,
                                    PayloadKaryawan.divisi_id,
                                    PayloadKaryawan.jabatan,
                                    PayloadKaryawan.no_ktp,
                                    PayloadKaryawan.npwp,
                                    PayloadKaryawan.tanggal_masuk,
                                    PayloadKaryawan.image,
                                    PayloadKaryawan.karyawan_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteKaryawan: async (payload) => {
        const sql = `DELETE FROM karyawan where karyawan_id in ?`
        return new Promise((resolve, reject) => {
            Database.query(sql, [[[payload.karyawan_id]]], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    }
};


export default Karyawan;