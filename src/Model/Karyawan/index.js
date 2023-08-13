import Database from "../../Utils/Configs/db.js"


const Karyawan = {
    findAll: async (payload = {
        search: "",
        sort: "karyawan.nama ASC",
        tab: ""
    }) => {
        const sql = `SELECT 
                            karyawan.karyawan_id,
                            karyawan.agama,
                            karyawan.alamat,
                            karyawan.projek_id,
                            karyawan.image,
                            karyawan.jabatan,
                            karyawan.jenis_kelamin,
                            karyawan.nama,
                            karyawan.nik,
                            karyawan.no_ktp,
                            karyawan.no_telpon,
                            karyawan.npwp,
                            karyawan.pendidikan_terakhir,
                            karyawan.projek_id,
                            karyawan.status_karyawan,
                            karyawan.status_pernikahan,
                            karyawan.tanggal_lahir,
                            karyawan.tanggal_masuk,
                            karyawan.tempat_lahir,
                            projek_temp.namaProjek,
                            projek_temp.namaDivisi
                        FROM karyawan
                        inner join (
                            select 	    projek.nama as namaProjek,
                                        divisi.nama as namaDivisi,
                                        divisi.divisi_id,
                                        projek.projek_id
                                        from projek 
                                inner join divisi on projek.divisi_id = divisi.divisi_id
                        ) as projek_temp on projek_temp.projek_id = karyawan.projek_id
                        WHERE 
                            (   
                                karyawan.nama LIKE '%${payload.search}%' OR 
                                projek_temp.namaDivisi LIKE '%${payload.search}%' OR 
                                karyawan.jabatan LIKE '%${payload.search}%' OR
                                projek_temp.namaProjek LIKE '%${payload.search}%'
                            )   
                                AND
                                projek_temp.divisi_id LIKE '%${payload.tab}%'
                        ORDER BY ${payload.sort}`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findByKaryawanId: async (karyawan_id) => {
        const sql = `SELECT 
                            karyawan.karyawan_id,
                            karyawan.agama,
                            karyawan.alamat,
                            karyawan.projek_id,
                            karyawan.image,
                            karyawan.jabatan,
                            karyawan.jenis_kelamin,
                            karyawan.nama,
                            karyawan.nik,
                            karyawan.no_ktp,
                            karyawan.no_telpon,
                            karyawan.npwp,
                            karyawan.pendidikan_terakhir,
                            karyawan.projek_id,
                            karyawan.status_karyawan,
                            karyawan.status_pernikahan,
                            karyawan.tanggal_lahir,
                            karyawan.tanggal_masuk,
                            karyawan.tempat_lahir,
                            projek_temp.namaProjek,
                            projek_temp.namaDivisi,
                            projek_temp.divisi_id
                    FROM karyawan 
                        inner join (
                            select 	    projek.nama as namaProjek,
                                        divisi.nama as namaDivisi,
                                        divisi.divisi_id,
                                        projek.projek_id
                                        from projek 
                                inner join divisi on projek.divisi_id = divisi.divisi_id
                        ) as projek_temp on projek_temp.projek_id = karyawan.projek_id
                    where karyawan_id = ?`;
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
    findByNilai: async (payload) => {
        const sql = ` SELECT 
                            karyawan.karyawan_id,
                            karyawan.agama,
                            karyawan.alamat,
                            karyawan.projek_id,
                            karyawan.image,
                            karyawan.jabatan,
                            karyawan.jenis_kelamin,
                            karyawan.nama,
                            karyawan.nik,
                            karyawan.no_ktp,
                            karyawan.no_telpon,
                            karyawan.npwp,
                            karyawan.pendidikan_terakhir,
                            karyawan.projek_id,
                            karyawan.status_karyawan,
                            karyawan.status_pernikahan,
                            karyawan.tanggal_lahir,
                            karyawan.tanggal_masuk,
                            karyawan.tempat_lahir,
                            projek_temp.namaProjek,
                            projek_temp.namaDivisi
                        FROM karyawan
                        inner join (
                            select 	    projek.nama as namaProjek,
                                        divisi.nama as namaDivisi,
                                        divisi.divisi_id,
                                        projek.projek_id
                                        from projek 
                                inner join divisi on projek.divisi_id = divisi.divisi_id
                        ) as projek_temp on projek_temp.projek_id = karyawan.projek_id
                        left join nilai_karyawan ON karyawan.karyawan_id = nilai_karyawan.karyawan_id
                        where nilai_karyawan.karyawan_id IS NULL
                        ORDER BY karyawan.nama DESC`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
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
                                jabatan = ?,
                                no_ktp = ?,
                                npwp = ?,
                                tanggal_masuk = ?,
                                image = ?
                        where karyawan_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [PayloadKaryawan.nik,
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