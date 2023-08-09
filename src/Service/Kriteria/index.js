import KriteriaModel from "../../Model/Kriteria/index.js";
import SubkriteriaModel from "../../Model/Subkriteria/index.js";

const KriteriaService = {
    findAll: async () => {
        try {

            const Result = await KriteriaModel.findAll();
            if (Result.length == 0) return "Data Not Found";

            // Find Subkriteria
            for (let i = 0; i < Result.length; i++) {
                const ResultSub = await SubkriteriaModel.findByKriteriaId(Result[i].kriteria_id)
                Result[i].subkriteria = [ ...ResultSub ];
            }
            return Result;
        } catch (error) {
            throw error
        }
    },
    findByKriteriaId: async (kriteria_id) => {
        try {
            const [Result] = await KriteriaModel.findByKriteriaId(kriteria_id);
            if (!Result) return "Data Not Found";

            // Find Subkriteria
            const ResultSub = await SubkriteriaModel.findByKriteriaId(Result.kriteria_id)
            Result.subkriteria = [ ...ResultSub ];
            return Result;
        } catch (error) {
            throw error
        }
    },
    createKriteria: async (PayloadKriteria) => {
        try {
            const [User] = await KriteriaModel.findByKriteriaCode(PayloadKriteria.code);
            if (User) throw "Kriteria Code is Already Taken";

            const { subkriteria, ...payload } = PayloadKriteria
            const Result = await KriteriaModel.createKriteria(payload);
            if (!Result) throw "Error Create Kriteria"

            // Create Subkriteria
            subkriteria.map(e => {
                e.kriteria_id = Result.insertId
            })

            const ResultSub = await SubkriteriaModel.createSubkriteria(subkriteria)
            if (!ResultSub) throw "Error Create Subkriteria"

            const Response = {
                ...PayloadKriteria,
                kriteria_id: Result.insertId,
                subkriteria: [
                    ...subkriteria
                ]
            }
            return Response;
        } catch (error) {
            throw error;
        }
    },
    updateKriteria: async (PayloadKriteria) => {
        try {
            const [Kriteria] = await KriteriaModel.findByKriteriaId(PayloadKriteria.kriteria_id);
            if (!Kriteria) throw "Kriteria is Not Found";

            const Result = await KriteriaModel.updateKriteria(PayloadKriteria);
            if (!Result) throw "Error Update"

            const { subkriteria, ...payload } = PayloadKriteria;

            subkriteria.map(e => {
                e.kriteria_id = Kriteria.kriteria_id
            })

            let isUpdate = subkriteria.length > 0 && subkriteria.every(e => e.subkriteria_id);
 
            if (isUpdate) {
                for (let i = 0; i < subkriteria.length; i++) {
                    if (subkriteria[i].subkriteria_id) {
                        const Result = await SubkriteriaModel.updateSubkriteria(subkriteria[i]);
                        if (!Result) throw "Error Update"
                    }
                }
            } else {
                // Create Subkriteria
                const ResultSub = await SubkriteriaModel.createSubkriteria(subkriteria)
                if (!ResultSub) throw "Error Create Subkriteria"
            }


            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteKriteria: async (PayloadKriteria) => {
        try {
            const Kriteria = await KriteriaModel.deleteKriteria(PayloadKriteria);
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default KriteriaService