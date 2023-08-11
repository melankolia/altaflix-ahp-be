import DivisiModel from "../../Model/Divisi/index.js";

const DivisiService = {
    findAll: async (payload) => {
        try {

            const Result = await DivisiModel.findAll(payload);
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    findByDivisiId: async (divisi_id) => {
        try {
            const [Result] = await DivisiModel.findByDivisiId(divisi_id);
            if (!Result) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    createDivisi: async (PayloadDivisi) => {
        try {
            const [User] = await DivisiModel.findByDivisiCode(PayloadDivisi.code);
            if (User) throw "Divisi Code is Already Taken";

            const Result = await DivisiModel.createDivisi(PayloadDivisi);
            if (!Result) throw "Error Create Divisi"

            const Response = {
                ...PayloadDivisi,
                divisi_id: Result.insertId
            }
            return Response;
        } catch (error) {
            throw error;
        }
    },
    updateDivisi: async(PayloadDivisi) => {
        try {
            const [Divisi] = await DivisiModel.findByDivisiId(PayloadDivisi.divisi_id);
            if (!Divisi) throw "Divisi is Not Found";

            const Result = await DivisiModel.updateDivisi(PayloadDivisi);
            if (!Result) throw "Error Update"

            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteDivisi: async (PayloadDivisi) => {
        try {
            const Divisi = await DivisiModel.deleteDivisi(PayloadDivisi);
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default DivisiService