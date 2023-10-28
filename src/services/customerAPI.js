import API from "./API";

class customerAPI {
    static getWarehouse(userId){
        return API().get("/warehouse",{
            params: {
                userId: userId
            }
        })
    }
}

class rolltableAPI {
    static getPrize() {
        return API().get("/warehouse/rolltable")
    }

    static winPrize(userId) {
        return API().post("/warehouse/rolltable", {
            userId: userId
        })
    }
}