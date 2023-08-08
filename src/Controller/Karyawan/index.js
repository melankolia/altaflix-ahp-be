import Responses from "../../Utils/Helper/Response.js";
import KaryawanService from "../../Service/Karyawan/index.js";

const Karyawan = {
    findAllKaryawan: async (req, res, next) => {
        // try {
        //
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }

        try {
            const Result = await KaryawanService.findAll();
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    },
    findByKaryawanId: async (req, res, next) => {
        try {
            if (!req.params?.karyawan_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const karyawan_id = req.params?.karyawan_id;

            const Result = await KaryawanService.findByKaryawanId(karyawan_id);
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    }
    ,
    createKaryawan: async (req, res, next) => {
        try {
            if (!req.body?.nik ||
                !req.body?.nama 
            ) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            let payload = {
                nik: req.body?.nik,
                nama: req.body?.nama,
                jenis_kelamin: req.body?.jenis_kelamin,
                tempat_lahir: req.body?.tempat_lahir,
                tanggal_lahir: req.body?.tanggal_lahir,
                agama: req.body?.agama,
                status_pernikahan: req.body?.status_pernikahan,
                alamat: req.body?.alamat,
                no_telpon: req.body?.no_telpon,
                pendidikan_terakhir: req.body?.pendidikan_terakhir,
                status_karyawan: req.body?.status_karyawan,
                projek_id: req.body?.projek_id,
                divisi_id: req.body?.divisi_id,
                jabatan: req.body?.jabatan,
                no_ktp: req.body?.no_ktp,
                npwp: req.body?.npwp,
                tanggal_masuk: req.body?.tanggal_masuk,
                image: req.body?.image
            }
            let Result;
            if (!req.body?.karyawan_id)  {
                Result = await KaryawanService.createKaryawan(payload);
            } else {
                payload = {...payload, karyawan_id: req.body?.karyawan_id}
                Result = await KaryawanService.updateKaryawan(payload);
            }
            return Responses.success(res, Result);
        } catch (error) {
            if (error == 'Username is Already Taken') return Responses.badRequest(res, error, next);
            return Responses.failed(res, error, next);
        }

    },
    deleteKaryawan: async (req, res, next) => {
        try {
            if (!req.params?.karyawan_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                karyawan_id: +req.params.karyawan_id
            };

            const Result = await KaryawanService.deleteKaryawan(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }

    }
}

export default Karyawan;