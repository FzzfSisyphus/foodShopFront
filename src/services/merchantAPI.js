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
        return API().post('/product', data)
    }
    static deleteProduct(productid) {
        return API().delete('/product/'+productid)
    }
}

export default merchantAPI;
