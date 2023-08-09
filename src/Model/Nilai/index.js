import Database from "../../Utils/Configs/db.js";

const NilaiModel = {
    findAll: async (payload) => {
        const sql = `select 	
                                nilai_karyawan.nilai_id,
                                no_penilaian as noPenilaian,
                                tanggal_penilaian as tglPenilaian,
                                nik,
                                karyawan.nama as namaKaryawan,
                                jabatan as namaJabatan,
                                divisi.nama as namaDivisi,
                                periode,
                                nilai_hasil as nilaiHasil,
                                GROUP_CONCAT(penilaian.subkriteria_id) as subkriteria
                        FROM nilai_karyawan
                        inner join karyawan on nilai_karyawan.karyawan_id = karyawan.karyawan_id
                        inner join penilaian on nilai_karyawan.nilai_id = penilaian.nilai_id 
                        inner join divisi on karyawan.divisi_id = divisi.divisi_id
                        GROUP BY nilai_id;`
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
                                nilai_karyawan.nilai_id,
                                no_penilaian as noPenilaian,
                                tanggal_penilaian as tglPenilaian,
                                nik,
                                karyawan.nama as namaKaryawan,
                                jabatan as namaJabatan,
                                divisi.nama as namaDivisi,
                                periode,
                                nilai_hasil as nilaiHasil,
                                image,
                                GROUP_CONCAT(penilaian.penilaian_id) as penilaian_id,
                                GROUP_CONCAT(penilaian.subkriteria_id) as subkriteria
                        FROM nilai_karyawan
                        inner join karyawan on nilai_karyawan.karyawan_id = karyawan.karyawan_id
                        inner join penilaian on nilai_karyawan.nilai_id = penilaian.nilai_id 
                        inner join divisi on karyawan.divisi_id = divisi.divisi_id
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
    }
};

export default NilaiModel;