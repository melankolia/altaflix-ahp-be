import Responses from "../../Utils/Helper/Response.js";
import SubkriteriaService from "../../Service/Subkriteria/index.js";

const SubkriteriaController = {
    findByKriteriaId: async (req, res, next) => {
        try {
            if (!req.params?.kriteria_id) throw "Bad Request"
        } catch (error) {
            return Responses.badRequest(res, error, next);
        }

        try {
            const kriteria_id = req.params?.kriteria_id;

            const Result = await SubkriteriaService.findByKriteriaId(kriteria_id);

            return Responses.success(res, Result);
        } catch (error) {
            return Responses.failed(res, error, next)
        }
    }
}

export default SubkriteriaController