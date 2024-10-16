import instance from "@/lib/axios/instance";

const DoaServices = {
    getAllDoa: () => instance.get(`/api/Doa`),
};

export default DoaServices;
