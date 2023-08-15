import DivisiModel from "../../Model/Divisi/index.js";
import pdf from "pdf-creator-node";
import path from "path";
import fs from "fs";
import Template from "../../Template/index.js"

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
    updateDivisi: async (PayloadDivisi) => {
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
    },
    printReport: async () => {
        try {
            const Result = await DivisiModel.findAll();
            if (Result.length == 0) return "Data Not Found";

            const pathHTML = path.join(Template.getDirname(), "Report_divisi.html")
            const pathHTMLDownload = path.join(Template.getDirname(), 'Report_divisi.pdf');
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
                timeZone: "Asia/Jakarta",
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
};

export default DivisiService