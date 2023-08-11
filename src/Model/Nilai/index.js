import Database from "../../Utils/Configs/db.js";

const NilaiModel = {
    findAll: async (payload = {
        search: '',
        sort: "nilai_hasil ASC",
        tab: ""
    }) => {
        const sql = `SELECT
                                nilai_karyawan.nilai_id,
                                no_penilaian as noPenilaian,
                                tanggal_penilaian as tglPenilaian,
                                nik,
                                karyawan.nama as namaKaryawan,
                                jabatan as namaJabatan,
                                periode,
                                nilai_hasil as nilaiHasil,
                                GROUP_CONCAT(penilaian.subkriteria_id) as subkriteria,
                                projek_temp.namaDivisi,
                                projek_temp.namaProjek,
                                RANK() OVER(ORDER BY nilai_hasil) rangking
                        FROM nilai_karyawan
                        inner join karyawan on nilai_karyawan.karyawan_id = karyawan.karyawan_id
                        inner join penilaian on nilai_karyawan.nilai_id = penilaian.nilai_id 
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
                                karyawan.nik LIKE '%${payload.search}%' OR
                                karyawan.jabatan LIKE '%${payload.search}%' OR
                                periode LIKE '%${payload.search}%' OR
                                projek_temp.namaDivisi LIKE '%${payload.search}%' OR
                                projek_temp.namaProjek LIKE '%${payload.search}%'
                            ) 
                                AND
                                projek_temp.divisi_id LIKE '%${payload.tab}%'
                        GROUP BY nilai_id
                        ORDER BY ${payload.sort}`;
        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findById: async (payload) => {
        const sql = `select 		
                                karyawan.karyawan_id,
                                karyawan.jenis_kelamin,
                                karyawan.tempat_lahir,
                                karyawan.tanggal_lahir,
                                karyawan.tanggal_masuk,
                                karyawan.status_karyawan,
                                nilai_karyawan.nilai_id,
                                no_penilaian as noPenilaian,
                                tanggal_penilaian as tglPenilaian,
                                nik,
                                karyawan.nama as namaKaryawan,
                                jabatan as namaJabatan,
                                periode,
                                nilai_hasil as nilaiHasil,
                                image,
                                projek_temp.namaDivisi,
                                projek_temp.namaProjek,
                                GROUP_CONCAT(penilaian.penilaian_id) as penilaian_id,
                                GROUP_CONCAT(penilaian.subkriteria_id) as subkriteria
                        FROM nilai_karyawan
                        inner join karyawan on nilai_karyawan.karyawan_id = karyawan.karyawan_id
                        inner join penilaian on nilai_karyawan.nilai_id = penilaian.nilai_id 
                        inner join (
                            select 	    projek.nama as namaProjek,
                                        divisi.nama as namaDivisi,
                                        divisi.divisi_id,
                                        projek.projek_id
                                        from projek 
                                inner join divisi on projek.divisi_id = divisi.divisi_id
                        ) as projek_temp on projek_temp.projek_id = karyawan.projek_id 
                        where nilai_karyawan.nilai_id = ?
                        GROUP BY nilai_id;`
        return new Promise((resolve, reject) => {
            Database.query(sql, [payload], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    findBySubkriteriaId: async (payload) => {
        const sql = `select 
                            subkriteria_id,
                            subkriteria.nama as subNama,
                            subkriteria.nilai as nilai,
                            subkriteria.bobot_prioritas as bobot_prioritas,
                            subkriteria.eigen as eigen,
                            kriteria.nama as kriteriaNama
                        from subkriteria
                        inner join kriteria on subkriteria.kriteria_id = kriteria.kriteria_id
                        where subkriteria_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql,[payload], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    insertData: async (payload) => {
        const sql = `INSERT INTO nilai_karyawan SET ?`;
        return new Promise((resolve, reject) => {
            Database.query(sql, payload, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    updateData: async (payload) => {
        const sql = `UPDATE 
                            nilai_karyawan SET
                            nilai_hasil = ?,
                            persentase = ?,
                            lama_kerja = ?,
                            periode = ?,
                            no_penilaian = ?,
                            tanggal_penilaian = ?
                        where nilai_karyawan.nilai_id = ? `;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload.nilai_hasil, payload.persentase, payload.lama_kerja, payload.periode, payload.no_penilaian, payload.tanggal_penilaian, payload.nilai_id], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        });
    },
    deleteData: async (payload) => {
        const sql = `DELETE FROM nilai_karyawan where nilai_id = ?`;

        return new Promise((resolve, reject) => {
            Database.query(sql, [payload], (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        })
    },
    findLatestNilaiId: async () => {
        const sql = `select MAX(nilai_id) as latest_id from nilai_karyawan;`;

        return new Promise((resolve, reject) => {
            Database.query(sql, (err, response) => {
                if (!err) resolve(response)
                else reject(err)
            })
        })  
        
    }
};

export default NilaiModel;