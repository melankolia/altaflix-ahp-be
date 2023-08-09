import NilaiModel from "../../Model/Nilai/index.js";
import PenilaianModel from "../../Model/Penilaian/index.js";
import useFullFunction from "../../Utils/Helper/UsefullFunction.js";

const NilaiService = {
    findAll: async (payload) => {
        try {
            const Result = await NilaiModel.findAll();
            if (Result.length == 0) return "Data Not Found";

            for (let i = 0; i < Result.length; i++) {
                let resultSub = [];
                Result[i].subkriteria = Result[i].subkriteria.split(',')
                for (let j = 0; j < Result[i].subkriteria.length; j++) {
                    let subObj = {}
                    const [ResultSub] = await NilaiModel.findBySubkriteriaId(Result[i].subkriteria[j])
                    if (!ResultSub) {
                        subObj = null
                    } else {
                        subObj = {
                            subkriteria_id: ResultSub.subkriteria_id,
                            nama: ResultSub.nama,
                            nilai: ResultSub.nilai,
                            bobot_prioritas: ResultSub.bobot_prioritas,
                            eigen: ResultSub.eigen,
                            kriteria_nama: ResultSub.kriteriaNama
                        }
                    }
                    Result[i][useFullFunction.convertToCamelCase(subObj.kriteria_nama)] = subObj.nilai
                }

                delete Result[i].subkriteria;
            }

            return Result
        } catch (error) {
            throw error
        }
    },
    findById: async (payload) => {
        try {
            const [Result] = await NilaiModel.findById(payload);
            if (!Result) return "Data Not Found";

            Result.subkriteria = Result.subkriteria.split(',')
            for (let j = 0; j < Result.subkriteria.length; j++) {
                let subObj = {}
                const [ResultSub] = await NilaiModel.findBySubkriteriaId(Result.subkriteria[j])
                if (!ResultSub) {
                    subObj = null
                } else {
                    subObj = {
                        subkriteria_id: ResultSub.subkriteria_id,
                        nama: ResultSub.nama,
                        nilai: ResultSub.nilai,
                        bobot_prioritas: ResultSub.bobot_prioritas,
                        eigen: ResultSub.eigen,
                        kriteria_nama: ResultSub.kriteriaNama
                    }
                }
                Result[useFullFunction.convertToCamelCase(subObj.kriteria_nama)] = subObj.nilai
            }

            delete Result.subkriteria;

            return Result
        } catch (error) {
            throw error
        }
    },
    insertData: async (payload) => {
        try {
            const { aspek_penilaian, ...another } = payload;

            console.log(another);

            const Nilai = await NilaiModel.insertData(another)
            if (!Nilai) return "Error Create Data";

            aspek_penilaian.map(e => {
                e.nilai_id = Nilai.insertId
            })

            const Penilaian = await PenilaianModel.insertData(aspek_penilaian);
            if (!Penilaian) return "Error Create Data Penilaian"

            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default NilaiService;