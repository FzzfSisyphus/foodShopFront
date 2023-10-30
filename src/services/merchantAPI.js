import API from "./API";

class merchantAPI {
    static getProductCount(userid) {
        return API().get('/product/count', {
            params: {
                userId: userid
            }
        })
    }

    static getProduct(userid, page, pagesize) {
        return API().get('/productList', {
            params: {
                userId: userid,
                page: page,
                pageSize: pagesize
            }
        })
    }
    static createProduct(data) {
        return API().get('/product/count', {
            params: {
                userId: data.shop_owner_id.value,
                pic_path: data.pic_path.value,
                describe: data.describe.value,
                price: data.price.value,
                quantity: data.quantity.value
            }
        })
    }
    static deleteProduct(productid) {
        return API().delete('/product/value', {
            params: {
                product_id: productid
            }
        })
    }
}

export default merchantAPI;
