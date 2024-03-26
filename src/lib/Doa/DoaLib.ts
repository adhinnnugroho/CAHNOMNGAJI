import DoaServices from "@/Services/Doa";
import instance from "../axios/instance";

export async function retrieveDataDoa() {
    const ResponseEndPointDoa = await instance.get(`${process.env.REST_API_URL_DOA}/doa`);
    return ResponseEndPointDoa;
}

export async function retrieveAllDoa(){
    const ResponseEndPointDoa = DoaServices.getAllDoa();
    return ResponseEndPointDoa.data.data;
}