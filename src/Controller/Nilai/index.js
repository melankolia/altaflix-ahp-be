import Responses from "../../Utils/Helper/Response.js";
import NilaiService from "../../Service/Nilai/index.js";

const NilaiController = {
    findAll: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }


        try {
            const payload = {
                search: req.query?.search || "",
                sort: req.query?.sort || "nilai_hasil DESC",
                tab: req.query?.tab || ""
            }
            const Result = await NilaiService.findAll(payload);

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
    },
    printReport: async (req, res, next) => {
        try {
            const Result = await NilaiService.printReport();

            return res.download(Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    },
    printIndividualReport: async (req, res, next) => {
        try {
            if (!req.params?.nilai_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next)
        }

        try {
            const nilai_id = req.params.nilai_id;

            const Result = await NilaiService.printIndividualReport(nilai_id);

            return res.download(Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    },
    findAspekPenilaian: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }


        try {
            const Result = await NilaiService.findAspekPenilaian();

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    },
    findLatestNilaiId: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }

        try {
            const Result = await NilaiService.findLatestNilaiId();

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    }
};

export default NilaiController;