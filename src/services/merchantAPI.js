import API from "./API";

class merchantAPI {
    static getProductCount(userName) {
        return API().get('/product/count', {
            params: {
                username: userName
            }
        })
    }

    static getProduct(userName, page, pagesize) {
        return API().get('/productList', {
            params: {
                userName: userName,
                page: page,
                pageSize: pagesize
            }
        })
    }
    static createProduct(data) {
        return API().post('/product', {
            params: {
                username: data.username,
                pic_path: data.pic_path,
                describe: data.describe,
                price: data.price,
                quantity: data.quantity
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
