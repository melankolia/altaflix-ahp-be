import KaryawanModel from "../../Model/Karyawan/index.js";

const KaryawanService = {
    findAll: async () => {
        try {

            const Result = await KaryawanModel.findAll();
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    findByKaryawanId: async (karyawan_id) => {
        try {
            const Result = await KaryawanModel.findByKaryawanId(karyawan_id);
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    createKaryawan: async (PayloadKaryawan) => {
        try {
            const [User] = await KaryawanModel.findByKaryawanNIK(PayloadKaryawan.nik);
            if (User) throw "Karyawan is Already Created";

            const Result = await KaryawanModel.createKaryawan(PayloadKaryawan);
            if (!Result) throw "Error Create Karyawan"

            const Response = {
                ...PayloadKaryawan,
                karyawan_id: Result.insertId
            }
            return Response;
        } catch (error) {
            throw error;
        }
    },
    updateKaryawan: async (PayloadKaryawan) => {
        try {
            const [Karyawan] = await KaryawanModel.findByKaryawanId(PayloadKaryawan.karyawan_id);
            if (!Karyawan) throw "Karyawan is Not Found";

            const Result = await KaryawanModel.updateKaryawan(PayloadKaryawan);
            if (!Result) throw "Error Update"

            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteKaryawan: async (PayloadKaryawan) => {
        try {
            const Karyawan = await KaryawanModel.deleteKaryawan(PayloadKaryawan);
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default KaryawanService