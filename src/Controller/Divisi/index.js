import Responses from "../../Utils/Helper/Response.js";
import DivisiService from "../../Service/Divisi/index.js";

const DivisiController = {
    findAllDivisi: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }

        try {
            const payload = {
                search: req.query?.search || "",
                sort: req.query?.sort || "nama ASC"
            }
            const Result = await DivisiService.findAll(payload);
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    },
    findByDivisiId: async (req, res, next) => {
        try {
            if (!req.params?.divisi_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const divisi_id = req.params?.divisi_id;

            const Result = await DivisiService.findByDivisiId(divisi_id);
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    }
    ,
    createDivisi: async (req, res, next) => {
        try {
            if (!req.body?.code ||
                !req.body?.nama
            ) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            let payload = {
                code: req.body?.code,
                nama: req.body?.nama,
            }
            let Result;
            if (!req.body?.divisi_id)  {
                Result = await DivisiService.createDivisi(payload);
            } else {
                payload = {...payload, divisi_id: req.body?.divisi_id}
                Result = await DivisiService.updateDivisi(payload);
            }
            return Responses.success(res, Result);
        } catch (error) {
            if (error == 'Username is Already Taken') return Responses.badRequest(res, error, next);
            return Responses.failed(res, error, next);
        }

    },
    deleteDivisi: async (req, res, next) => {
        try {
            if (!req.params?.divisi_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                divisi_id: +req.params.divisi_id
            };

            const Result = await DivisiService.deleteDivisi(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }

    }
}

export default DivisiController;