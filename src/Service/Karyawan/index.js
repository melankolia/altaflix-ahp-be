import KaryawanModel from "../../Model/Karyawan/index.js";
import pdf from "pdf-creator-node";
import path from "path";
import fs from "fs";
import Template from "../../Template/index.js"
import TemplateImages from "../../static-img/images/index.js"

const KaryawanService = {
    findAll: async (payload) => {
        try {

            const Result = await KaryawanModel.findAll(payload);
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    findByKaryawanId: async (karyawan_id) => {
        try {
            const [Result] = await KaryawanModel.findByKaryawanId(karyawan_id);
            if (!Result) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    findByNilai: async () => {
        try {

            const Result = await KaryawanModel.findByNilai();
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    createKaryawan: async (PayloadKaryawan) => {
        try {
            const [User] = await KaryawanModel.findByKaryawanNIK(PayloadKaryawan.nik);
            if (User) throw "Karyawan is Already Created";

            const Result = await KaryawanModel.createKaryawan(PayloadKaryawan);
            if (!Result) throw "Error Create Karyawan"

            const Response = {
                ...PayloadKaryawan,
                karyawan_id: Result.insertId
            }
            return Response;
        } catch (error) {
            throw error;
        }
    },
    updateKaryawan: async (PayloadKaryawan) => {
        try {
            const [Karyawan] = await KaryawanModel.findByKaryawanId(PayloadKaryawan.karyawan_id);
            if (!Karyawan) throw "Karyawan is Not Found";

            const Result = await KaryawanModel.updateKaryawan(PayloadKaryawan);
            if (!Result) throw "Error Update"

            return true;
        } catch (error) {
            throw error;
        }
    },
    deleteKaryawan: async (PayloadKaryawan) => {
        try {
            const Karyawan = await KaryawanModel.deleteKaryawan(PayloadKaryawan);
            return true;
        } catch (error) {
            throw error;
        }
    },
    printReport: async () => {
        try {
            const Result = await KaryawanModel.findAll();
            if (Result.length == 0) return "Data Not Found";

            const pathHTML = path.join(Template.getDirname(), "Report_karyawan.html")
            const pathHTMLDownload = path.join(Template.getDirname(), 'Report_karyawan.pdf');
            const bitmap = fs.readFileSync(path.join(Template.getDirname(), 'altaflix.png'));
            const logo = bitmap.toString('base64');

            const html = fs.readFileSync(pathHTML, "utf8");

            const options = {
                format: "A3",
                orientation: "landscape",
                border: "10mm",
            }

            Result.map((e, i) => {
                e.no = i + 1
            })

            const dateNow = new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })

            const document = {
                html: html,
                data: {
                    logo,
                    data: {
                        result: Result,
                        dateNow
                    }
                },
                path: pathHTMLDownload,
                type: "",
            };

            await pdf.create(document, options)
                .then((res) => {

                    console.log(res)
                })
                .catch((error) => {
                    throw "Error creating PDF"
                });

            return pathHTMLDownload
            // await workbook.xlsx.writeFile(pathDataDownload)
        } catch (error) {
            throw error;
        }
    },
    printReportDetail: async (payload) => {
        try {
            const [Result] = await KaryawanModel.findByKaryawanId(payload)
            if (!Result) return "Data Not Found";

            Result.tanggal_lahir = Result.tanggal_lahir && new Date(Result.tanggal_lahir).toLocaleDateString("id-ID", {
                weekday: undefined,
                year: "numeric",
                month: "long",
                day: "numeric"
            })

            Result.tanggal_masuk = Result.tanggal_masuk && new Date(Result.tanggal_masuk).toLocaleDateString("id-ID", {
                weekday: undefined,
                year: "numeric",
                month: "long",
                day: "numeric"
            })

            const pathHTML = path.join(Template.getDirname(), "Report_karyawan_detail.html")
            const pathHTMLDownload = path.join(Template.getDirname(), 'Report_karyawan_detail.pdf');
            const bitmap = fs.readFileSync(path.join(Template.getDirname(), 'altaflix.png'));
            const logo = bitmap.toString('base64');

            const imagePath = Result?.image?.split("/")
            const bitmapPhotoKaryawan = fs.readFileSync(path.join(TemplateImages.getDirnameImages(), imagePath[imagePath.length - 1]))
            const photoKaryawan = bitmapPhotoKaryawan.toString('base64')

            const html = fs.readFileSync(pathHTML, "utf8");

            const options = {
                format: "A3",
                orientation: "potrait",
                border: "10mm",
            }

            const dateNow = new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })

            const document = {
                html: html,
                data: {
                    logo,
                    photoKaryawan,
                    ...Result,
                    dateNow
                },
                path: pathHTMLDownload,
                type: "",
            };

            await pdf.create(document, options)
                .then((res) => {

                    console.log(res)
                })
                .catch((error) => {
                    throw "Error creating PDF"
                });

            return pathHTMLDownload
            // await workbook.xlsx.writeFile(pathDataDownload)
        } catch (error) {
            throw error;
        }
    },
};

export default KaryawanService