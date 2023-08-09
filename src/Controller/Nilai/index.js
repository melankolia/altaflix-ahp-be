import Responses from "../../Utils/Helper/Response.js";
import NilaiService from "../../Service/Nilai/index.js";

const NilaiController = {
    findAll: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }


        try {
            const Result = await NilaiService.findAll();

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    },
    findById: async (req, res, next) => {
        try {
            if (!req.params?.nilai_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next)
        }


        try {
            const nilai_id = req.params?.nilai_id;

            const Result = await NilaiService.findById(nilai_id);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    },
    insertData: async (req, res, next) => {
        try {
            if (    !req.body?.karyawan_id ||
                    req.body?.aspek_penilaian?.length == 0  ) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next)
        }

        try {
            const payload = { ...req.body };

            const Result = await NilaiService.insertData(payload);

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    },
    deleteData: async (req, res, next) => {
        try {
            if (!req.params?.nilai_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next)
        }

        try {
            const nilai_id = req.params.nilai_id;

            const Result = await NilaiService.deleteData(nilai_id);

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    }
};

export default NilaiController;