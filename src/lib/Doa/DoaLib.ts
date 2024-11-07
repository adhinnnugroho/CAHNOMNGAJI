import instance from "@/core/lib/axios/instance";
import DoaServices from "@/services/Doa";


export async function retrieveDataDoa() {
    const ResponseEndPointDoa = await instance.get(`${process.env.REST_API_URL_DOA}/doa`);
    return ResponseEndPointDoa;
}

export async function retrieveAllDoa() {
    const ResponseEndPointDoa = await DoaServices.getAllDoa();
    return ResponseEndPointDoa.data.data;
}