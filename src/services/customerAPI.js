import API from "./API";
import merchantAPI from "@/services/merchantAPI";

class customerAPI {
    static getProductNum(){
        return API().get("/product")
    }

    static getProduct(page, pagesize){
        return API().get("/product",{
            params: {
                page: page,
                pageSize: pagesize
            }
        })
    }

    static buyProduct(id, quantity){
        return API().post("/product/buy",{
            params: {
                product_id: id,
                quantity: quantity
            }
        })
    }

    static getDetail(id){
        return API().get("/product",{
            params:{
                product_id: id
            }
        })
    }
}

export default customerAPI;