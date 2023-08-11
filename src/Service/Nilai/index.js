import NilaiModel from "../../Model/Nilai/index.js";
import PenilaianModel from "../../Model/Penilaian/index.js";
import KriteriaModel from "../../Model/Kriteria/index.js";
import SubkriteriaModel from "../../Model/Subkriteria/index.js";
import useFullFunction from "../../Utils/Helper/UsefullFunction.js";
import ExcelJS from "exceljs"
import path from "path";

const NilaiService = {
    findAll: async (payload) => {
        try {
            const Result = await NilaiModel.findAll(payload);
            console.log(Result);
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
            console.log(Result);
            if (!Result) return "Data Not Found";

            Result.aspek_penilaian = [];
            Result.penilaian_id = Result.penilaian_id.split(',')
            Result.subkriteria = Result.subkriteria.split(',')
            for (let j = 0; j < Result.subkriteria.length; j++) {
                let subObj = {}
                const [ResultSub] = await NilaiModel.findBySubkriteriaId(Result.subkriteria[j])
                if (!ResultSub) {
                    subObj = null
                } else {
                    subObj = {
                        penilaian_id: +Result.penilaian_id[j],
                        subkriteria_id: ResultSub.subkriteria_id,
                        nama: ResultSub.nama,
                        nilai: ResultSub.nilai,
                        bobot_prioritas: ResultSub.bobot_prioritas,
                        eigen: ResultSub.eigen,
                        kriteria_nama: ResultSub.kriteriaNama
                    }
                }
                Result[useFullFunction.convertToCamelCase(subObj.kriteria_nama)] = subObj.nilai
                Result.aspek_penilaian = [ ...Result.aspek_penilaian, { ...subObj } ]
            }

            delete Result.penilaian_id;
            delete Result.subkriteria;

            return Result
        } catch (error) {
            throw error
        }
    },
    insertData: async (payload) => {
        try {
            const { aspek_penilaian, nilai_id, ...another } = payload;

            // Create Data if nilai_id is not provided
            if (!nilai_id) {
                const Nilai = await NilaiModel.insertData(another)
                if (!Nilai) return "Error Create Data";
    
                aspek_penilaian.map(e => {
                    e.nilai_id = Nilai.insertId
                })
    
                const Penilaian = await PenilaianModel.insertData(aspek_penilaian);
                if (!Penilaian) return "Error Create Data Penilaian"
            } else {
                const Nilai = await NilaiModel.updateData({...another, nilai_id})
                if (!Nilai) return "Error Update Data";

                for (let i = 0; i < aspek_penilaian.length; i++) {
                    const Penilaian = await PenilaianModel.updateData(aspek_penilaian[i])
                    if (!Penilaian) return "Error Update Data Penilaian"
                }

            }

            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteData: async (payload) => {
        try {
            const Nilai = await NilaiModel.deleteData(payload);
            return true;
        } catch (error) {
            throw error
        }
    },
    printReport: async (payload) => {
        try {
            const Result = await NilaiService.findAll();
            if (Result.length == 0) return "Data Not Found";

            const pathData = path.join('src', 'Template', 'Laporan.xlsx');
            const pathDataDownload = path.join('src', 'Template', 'Report.xlsx');

            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(pathData);
            const currentWorkSheet = workbook.worksheets[0];

            Result.forEach((e, i) => {
                const { nilai_id, noPenilaian, tglPenilaian, nik, namaKaryawan, namaJabatan, namaDivisi, periode, nilaiHasil, projekNama, ...other } = e;
                currentWorkSheet.getRow(9 + (i + 1)).getCell(3).value = i + 1;
                currentWorkSheet.getRow(9 + (i + 1)).getCell(4).value = noPenilaian;
                currentWorkSheet.getRow(9 + (i + 1)).getCell(5).value = tglPenilaian;
                currentWorkSheet.getRow(9 + (i + 1)).getCell(6).value = nik;
                currentWorkSheet.getRow(9 + (i + 1)).getCell(7).value = namaKaryawan;
                currentWorkSheet.getRow(9 + (i + 1)).getCell(8).value = namaJabatan;
                currentWorkSheet.getRow(9 + (i + 1)).getCell(9).value = projekNama;


                const keys = Object.keys(other);
                keys.forEach((e2, i2) => {
                    currentWorkSheet.getRow(9 + (i + 1)).getCell(9 + (i2 + 1)).value = e[e2];

                    if (i2 == keys.length - 1) {
                        currentWorkSheet.getRow(9 + (i + 1)).getCell(15).value = nilaiHasil
                        console.log(nilaiHasil);
                    }
                })
                
            })

            currentWorkSheet.getCell('L22').value = `Jakarta, ${new Date().toLocaleDateString('id-ID', {
                weekday: undefined, year: "numeric", month: "long", day: "numeric" 
            })}`;


            await workbook.xlsx.writeFile(pathDataDownload)

            return pathDataDownload
        } catch (error) {
            throw error;
        }
    },
    printIndividualReport: async (payload) => {
        try {
            const Result = await NilaiService.findById(payload);
            if (!Result) return "Data Not Found";

            const pathData = path.join('src', 'Template', 'Laporan_Individu.xlsx');
            const pathDataDownload = path.join('src', 'Template', 'Report_Individual.xlsx');

            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(pathData);
            const currentWorkSheet = workbook.worksheets[1]

            currentWorkSheet.getColumn('F').width = 30;

            // NIK
            currentWorkSheet.getCell("F9").value = `: ${Result.nik}`;

            // Nama Lengkap
            currentWorkSheet.getCell("F10").value = `: ${Result.namaKaryawan}`;

            // Jenis Kelamin
            currentWorkSheet.getCell("F11").value = `: ${Result.jenis_kelamin}`;

            // Tempat, Tanggal Lahir
            currentWorkSheet.getCell("F12").value = `: ${Result.tempat_lahir}, ${Result.tanggal_lahir}`;

            // Status Karyawan
            currentWorkSheet.getCell("F13").value = `: ${Result.status_karyawan}`;

            // Jabatan
            currentWorkSheet.getCell("F14").value = `: ${Result.namaJabatan}`;

            // Divisi
            currentWorkSheet.getCell("F15").value = `: ${Result.namaDivisi}`;

            // Projek
            currentWorkSheet.getCell("F16").value = `: ${Result.namaProjek}`;

            // No Penilaian
            currentWorkSheet.getCell("I9").value = `: ${Result.noPenilaian}`;

            // Tanggal Penilaian
            currentWorkSheet.getCell("I10").value = `: ${Result.tglPenilaian}`;

            // Photo
            const image = workbook.addImage({
                filename: path.join('src', 'static-img', 'hamdan.jpeg'),
                extension: 'jpeg',
              });

            //   'B8:C14'
              currentWorkSheet.addImage(image, {
                tl: { col: 1.5, row: 7.5 },
                br: { col: 2.9, row: 15.5 }
              });

            
            // Nilai Subkriteria
            Result.aspek_penilaian.forEach((e, i) => {
                currentWorkSheet.getRow(10 + (i + 1)).getCell(10).value = `=    ${e.nilai}`
            })

            // Hasil Akhir
            currentWorkSheet.getCell('J16').value = `=    ${Result.nilaiHasil}`
            // Tanggal Tanda Tangan 
            currentWorkSheet.getCell('H19').value = `Jakarta, ${new Date().toLocaleDateString('id-ID', {
                weekday: undefined, year: "numeric", month: "long", day: "numeric" 
            })}`;
            await workbook.xlsx.writeFile(pathDataDownload)

            return pathDataDownload
        } catch (error) {
            throw error;
        }
    },
    findAspekPenilaian: async () => {
        try {
            const Result = await KriteriaModel.findAll();
            if (Result.length == 0) return "No Results Found";

            for (let i = 0; i < Result.length; i++) {
                const ResultSub = await SubkriteriaModel.findByKriteriaId(Result[i].kriteria_id)
                if (ResultSub.length > 0) {
                    Result[i].subkriteria = [ ...ResultSub.map(e => ({
                        ...e,
                        bobotKriteria: Result[i].bobot_prioritas 
                    })) ]
                } else {
                    Result[i].subkriteria = null
                }
            }

            return Result;
        } catch (error) {
            throw error;
        }
    },
    findLatestNilaiId: async () => {
        try {
            const [Result] = await NilaiModel.findLatestNilaiId();

            return Result
        } catch (error) {
            throw error;
        }
    }
}

export default NilaiService;