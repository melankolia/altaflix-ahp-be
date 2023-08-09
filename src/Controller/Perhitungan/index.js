import Responses from "../../Utils/Helper/Response.js";
import PerhitunganService from "../../Service/Perhitungan/index.js";


const PerhitunganController = {
    findPerhitunganKriteria: async (req, res, next) => {
        try {
            const Result  = await PerhitunganService.getPerhitunganKriteria();
            return Responses.success(res, Result)
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    },
    insertNilai: async (req, res, next) => {
        try {
            if (!req.body?.matriks) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const bobot = req.body?.bobot;
            const matriks = req.body?.matriks;

            const Result = await PerhitunganService.insertPerhitunganKriteria({
                bobot,
                matriks
            })
            return Responses.success(res, Result)
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    },
    deleteNilai: async (req, res, next) => {
        try {
            const Result = await PerhitunganService.deletePerhitunganKriteria();

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    },
    findPerhitunganSubkriteria: async (req, res, next) => {
        try {
            if (!req.params?.kriteria_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const payload = {
                kriteria_id: req.params?.kriteria_id
            }

            const Result  = await PerhitunganService.getPerhitunganSubkriteria(payload);
            return Responses.success(res, Result)
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    },
    insertNilaiSub: async (req, res, next) => {
        try {
            if (!req.body?.matriks) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const matriks = req.body?.matriks;
            const bobot = req.body?.bobot;

            const Result = await PerhitunganService.insertPerhitunganSubkriteria({
                matriks,
                bobot
            })
            return Responses.success(res, Result)
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    },
    deleteNilaiSub: async (req, res, next) => {
        try {
            if (!req.params?.kriteria_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }
        try {

            const kriteria_id = req.params?.kriteria_id;

            const Result = await PerhitunganService.deletePerhitunganSubkriteria(kriteria_id);

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next);
        }
    },
}

export default PerhitunganController;