import API from "./API";

class merchantAPI {
    static getProductCount(userName) {
        return API().get('/product/count', {
            params: {
                userName: userName
            }
        })
    }

    static getProduct(userName, page, pageSize) {
        return API().get('/productList', {
            params: {
                userName: userName,
                page: page,
                pageSize: pageSize
            }
        })
    }
    static createProduct(data) {
        return API().post('/product', {
            params: {
                userName: data.username,
                describe: data.describe,
                price: data.price,
                picPath: data.pic_path,
                quantity: data.quantity,
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
