import ProjekModel from "../../Model/Projek/index.js";

const ProjekService = {
    findAll: async () => {
        try {

            const Result = await ProjekModel.findAll();
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    findByProjekId: async (divisi_id) => {
        try {
            const Result = await ProjekModel.findByProjekId(divisi_id);
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    createProjek: async (PayloadProjek) => {
        try {
            const [User] = await ProjekModel.findByProjekCode(PayloadProjek.code);
            if (User) throw "Projek Code is Already Taken";

            const Result = await ProjekModel.createProjek(PayloadProjek);
            if (!Result) throw "Error Create Projek"

            const Response = {
                ...PayloadProjek,
                projek_id: Result.insertId
            }
            return Response;
        } catch (error) {
            throw error;
        }
    },
    updateProjek: async(PayloadProjek) => {
        try {
            const [Projek] = await ProjekModel.findByProjekId(PayloadProjek.projek_id);
            if (!Projek) throw "Projek is Not Found";

            const Result = await ProjekModel.updateProjek(PayloadProjek);
            if (!Result) throw "Error Update"

            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteProjek: async (PayloadProjek) => {
        try {
            const Projek = await ProjekModel.deleteProjek(PayloadProjek);
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default ProjekService