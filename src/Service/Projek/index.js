import ProjekModel from "../../Model/Projek/index.js";
import pdf from "pdf-creator-node";
import path from "path";
import fs from "fs";
import Template from "../../Template/index.js"

const ProjekService = {
    findAll: async (payload) => {
        try {

            const Result = await ProjekModel.findAll(payload);
            if (Result.length == 0) return "Data Not Found";

            return Result;
        } catch (error) {
            throw error
        }
    },
    findByProjekId: async (divisi_id) => {
        try {
            const [Result] = await ProjekModel.findByProjekId(divisi_id);
            if (!Result) return "Data Not Found";

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
    updateProjek: async (PayloadProjek) => {
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
    },
    printReport: async () => {
        try {
            const Result = await ProjekModel.findAll();
            console.log(Result);
            if (Result.length == 0) return "Data Not Found";

            const pathHTML = path.join(Template.getDirname(), "Report_proyek.html")
            const pathHTMLDownload = path.join(Template.getDirname(), 'Report_proyek.pdf');
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
};

export default ProjekService