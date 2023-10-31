import API from "./API";
import merchantAPI from "@/services/merchantAPI";

class customerAPI {
    static getProductCount(){
        return API().get("/product/count")
    }

    static getProduct(page, pagesize){
        return API().get("/productList",{
            params: {
                page: page,
                pageSize: pagesize
            }
        })
    }

    static buyProduct(data){
        return API().post("/product/buy",data)
    }

    static updateAddr(key,addrInfo){
        const headers = {
            Authorization: 'Basic '+key,
        };
        return API()
        .post("/product/userbuy",addrInfo,{headers})
    }

    static getDetail(id){
        return API().get("/product",{
            params:{
                productId: id
            }
        })
    }
}

export default customerAPI;