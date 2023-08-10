import PerhitunganModel from "../../Model/Perhitungan/index.js";
import KriteriaModel from "../../Model/Kriteria/index.js";
import SubkriteriaModel from "../../Model/Subkriteria/index.js";
import useFullFunction from "../../Utils/Helper/UsefullFunction.js";

const PerhitunganService = {
    getPerhitunganKriteria: async () => {
        try {
            const Result = await PerhitunganModel.getKriteria();
            const ResultKriteria = await KriteriaModel.findAll();

            // console.log(Result, ResultKriteria);

            let listKriteria = []
            ResultKriteria.forEach(e => {
                listKriteria = [...listKriteria, {
                    nama: useFullFunction.convertToCamelCase(e.nama),
                    kriteria_id: e.kriteria_id
                }]
            })

            let Perhitungan;

            if (Result.length > 0) {
                Perhitungan = Result.map((e, i) => {
                    let matriks_id = e.matriks_id?.split(',');

                    let obj = {
                        kriteria: e.kategori,
                        kriteria_id: listKriteria[i].kriteria_id,
                        matriks_id: {}
                    };
    
                    e.value?.split(',').map((e, i) => {
                        obj[listKriteria[i].nama] = +e
                        obj.matriks_id[listKriteria[i].nama] = +matriks_id[i]
                    })
    
                    return obj
                })
            } else if (ResultKriteria.length > 0) {
                Perhitungan = ResultKriteria.map((e, i) => {
                    let obj = {
                        kriteria: e.nama,
                        kriteria_id: listKriteria[i].kriteria_id
                    };

                    for (let j = 0; j < ResultKriteria.length; j++) {
                        obj[listKriteria[j].nama] = null
                    }
    
                    return obj
                })
            } else return "Data Not Found"

            return Perhitungan;
        } catch (error) {
            throw error
        }
    },
    insertPerhitunganKriteria: async (payload) => {
        try {
            for (let i = 0; i < payload.bobot.length; i++) {
                const Result = await KriteriaModel.insertNilaiBobotAndEigen(payload.bobot[i])
                if (!Result) return "Create Error"
            }

            let PayloadKriteria = [];
            let isUpdate = false;

            for (let i = 0; i < payload.matriks.length; i++) {
                let arraObj = []
                const { kriteria, kriteria_id, matriks_id, ...another } = payload.matriks[i];
                Object.keys(another).forEach((e, j) => {
                    let obj = {}

                    // Update Kriteria if matriks_id is present
                    if (matriks_id) {
                        obj = {
                            xIndex: j,
                            yIndex: i,
                            value: another[e] ? another[e] : 0,
                            kriteria_id: kriteria_id,
                            matriks_id: matriks_id[e]
                        }

                        // Toggle update if matriks_id is present
                        isUpdate = true;
                    } else {
                        obj = {
                            xIndex: j,
                            yIndex: i,
                            value: another[e] ? another[e] : 0,
                            kriteria_id: kriteria_id,
                        }
                    }

                    arraObj = [...arraObj, { ...obj }]
                })
                PayloadKriteria = [...PayloadKriteria, ...arraObj]
            }

            // Update kriteria if isUpdate is true
            if (isUpdate) {
                for (let i = 0; i < PayloadKriteria.length; i++) {
                    const Update = await PerhitunganModel.updateMatriksKriteria(PayloadKriteria[i])
                    if (!Update) return "Error Update Matriks"
                }
            } else {
                const Insert = await PerhitunganModel.insertMatriksKriteria(PayloadKriteria)
                if (!Insert) return "Create Matriks Error";
            }

            return true
        } catch (error) {
            throw error
        }
    },
    deletePerhitunganKriteria: async () => {
        try {
            const Deleted = await PerhitunganModel.deleteMatriksKriteria();
            if (!Deleted) return "Delete Matriks Error";

            return true
        } catch (error) {
            throw error
        }
    },
    getPerhitunganSubkriteria: async (payload) => {
        try {
            const Result = await PerhitunganModel.getSubkriteria(payload.kriteria_id);
            const ResultSubkriteria = await SubkriteriaModel.findByKriteriaId(payload.kriteria_id)

            let listSubKriteria = []
            ResultSubkriteria.forEach(e => {
                listSubKriteria = [...listSubKriteria, {
                    nama: useFullFunction.convertToCamelCase(e.nama),
                    kriteria_id: e.kriteria_id,
                    subkriteria_id: e.subkriteria_id
                }]
            })

            let Perhitungan;

            // If Subkriteria is not Present
            if (Result.length > 0) {
                Perhitungan = Result.map((e, i) => {
                    let matriks_id = e.matriks_id?.split(',');

                    let obj = {
                        kriteria: e.kategori,
                        kriteria_id: listSubKriteria[i].kriteria_id,
                        subkriteria_id: listSubKriteria[i].subkriteria_id,
                        matriks_id: {}
                    };
    
                    e.value?.split(',').map((e, i) => {
                        obj[listSubKriteria[i].nama] = +e
                        obj.matriks_id[listSubKriteria[i].nama] = +matriks_id[i]
                    })
    
                    return obj
                })
            // Genereate default Subkriteria values if Subkriteria is not Present
            } else if (ResultSubkriteria.length > 0) {
                Perhitungan = ResultSubkriteria.map((e, i) => {
                    let obj = {
                        kriteria: e.nama,
                        kriteria_id: listSubKriteria[i].kriteria_id,
                        subkriteria_id: listSubKriteria[i].subkriteria_id
                    };
    
                    for (let j = 0; j < ResultSubkriteria.length; j++) {
                        obj[listSubKriteria[j].nama] = null
                    }
    
                    return obj
                })

            } else return "Data Not Found"

            return Perhitungan;
        } catch (error) {
            throw error
        }
    },
    insertPerhitunganSubkriteria: async (payload) => {
        try {
            for (let i = 0; i < payload.bobot.length; i++) {
                const Result = await SubkriteriaModel.insertNilaiBobotAndEigen(payload.bobot[i])
                if (!Result) return "Create Error"
            }

            let PayloadSubkriteria = [];
            let isUpdate = false;

            for (let i = 0; i < payload.matriks.length; i++) {
                let arraObj = []
                const { kriteria, kriteria_id, subkriteria_id, matriks_id, ...another } = payload.matriks[i];
                Object.keys(another).forEach((e, j) => {
                    let obj = {}

                    // Update Kriteria if matriks_id is present
                    if (matriks_id) {
                        obj = {
                            xIndex: j,
                            yIndex: i,
                            value: another[e] ? another[e] : 0,
                            kriteria_id: kriteria_id,
                            subkriteria_id: subkriteria_id,
                            matriks_id: matriks_id[e]
                        }

                        // Toggle update if matriks_id is present
                        isUpdate = true;
                    } else {
                        obj = {
                            xIndex: j,
                            yIndex: i,
                            value: another[e] ? another[e] : 0,
                            kriteria_id: kriteria_id,
                            subkriteria_id: subkriteria_id,
                        }
                    }

                    arraObj = [...arraObj, { ...obj }]
                })
                PayloadSubkriteria = [...PayloadSubkriteria, ...arraObj]
            }

            // Update kriteria if isUpdate is true
            if (isUpdate) {
                for (let i = 0; i < PayloadSubkriteria.length; i++) {
                    const Update = await PerhitunganModel.updateMatriksKriteria(PayloadSubkriteria[i])
                    if (!Update) return "Error Update Matriks"
                }
            } else {
                const Insert = await PerhitunganModel.insertMatriksSubkriteria(PayloadSubkriteria)
                if (!Insert) return "Create Matriks Error";
            }

            return true
        } catch (error) {
            throw error
        }
    },
    deletePerhitunganSubkriteria: async (payload) => {
        try {
            const Deleted = await PerhitunganModel.deleteMatriksSubkriteria(payload);
            if (!Deleted) return "Delete Matriks Error";

            return true
        } catch (error) {
            throw error
        }
    },
};

export default PerhitunganService;