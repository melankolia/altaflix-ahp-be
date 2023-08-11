import Responses from "../../Utils/Helper/Response.js";
import KriteriaService from "../../Service/Kriteria/index.js";

const KriteriaController = {
    findAllKriteria: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }

        try {
            const payload = {
                search: req.query?.search || "",
                sort: req.query?.sort || "nama ASC"
            }
            const Result = await KriteriaService.findAll(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    },
    findByKriteriaId: async (req, res, next) => {
        try {
            if (!req.params?.kriteria_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const kriteria_id = req.params?.kriteria_id;

            const Result = await KriteriaService.findByKriteriaId(kriteria_id);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    }
    ,
    createKriteria: async (req, res, next) => {
        try {
            if (!req.body?.code ||
                !req.body?.nama ||
                req.body?.subkriteria.length == 0
            ) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            let payload = {
                code: req.body?.code,
                nama: req.body?.nama,
                subkriteria: [...req.body?.subkriteria]
            }
            let Result;
            if (!req.body?.kriteria_id)  {
                Result = await KriteriaService.createKriteria(payload);
            } else {
                payload = {...payload, kriteria_id: req.body?.kriteria_id}
                Result = await KriteriaService.updateKriteria(payload);
            }
            return Responses.success(res, Result);
        } catch (error) {
            if (error == 'Username is Already Taken') return Responses.badRequest(res, error, next);
            return Responses.failed(res, error, next);
        }

    },
    deleteKriteria: async (req, res, next) => {
        try {
            if (!req.params?.kriteria_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                kriteria_id: +req.params.kriteria_id
            };

            const Result = await KriteriaService.deleteKriteria(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }

    }
}

export default KriteriaController;