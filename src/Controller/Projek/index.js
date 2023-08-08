import Responses from "../../Utils/Helper/Response.js";
import ProjekService from "../../Service/Projek/index.js";

const ProjekController = {
    findAllProjek: async (req, res, next) => {
        // try {
            
        // } catch (error) {
        //     return Responses.badRequest(res, error, next)
        // }

        try {
            const Result = await ProjekService.findAll();
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    },
    findByProjekId: async(req, res, next) => {
        try {
            if (!req.params?.projek_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const projek_id = req.params?.projek_id;

            const Result = await ProjekService.findByProjekId(projek_id);
            return Responses.success(res, Result);
        } catch (error) {
            Responses.failed(res, error, next)
        }
    }
    ,
    createProjek: async(req, res, next) => {
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
                divisi_id: req.body?.divisi_id
            }
            let Result;
            if (!req.body?.projek_id)  {
                Result = await ProjekService.createProjek(payload);
            } else {
                payload = {...payload, projek_id: req.body?.projek_id}
                Result = await ProjekService.updateProjek(payload);
            }
            return Responses.success(res, Result);
        } catch (error) {
            if (error == 'Projek Name is Already Taken') return Responses.badRequest(res, error, next);
            return Responses.failed(res, error, next);
        }

    },
    deleteProjek: async(req, res, next) => {
        try {
            if (!req.params?.projek_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                projek_id: +req.params.projek_id
            };

            const Result = await ProjekService.deleteProjek(payload);
            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }

    }
}

export default ProjekController;