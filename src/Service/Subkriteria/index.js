import SubkriteriaModel from "../../Model/Subkriteria/index.js";

const SubkriteriaService = {
    findByKriteriaId: async (payload) => {
        try {
            const Result = await SubkriteriaModel.findByKriteriaId(payload)
            if (Result.length == 0) return "Data Not Found";

            return Result
        } catch (error) {
            throw error
        }
    }
};

export default SubkriteriaService;