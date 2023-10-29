import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import StartPage from "../StartPage.vue";
import Customer from '../Customer.vue';
import Merchant from '../Merchant.vue';


const router = createRouter({
    history : createWebHashHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            name:"StartPage",
            component: StartPage
        },
        {
            path: "/Customer/:userId",
            name:"Customer",
            component: Customer
        },
        {
            path: "/Merchant/:userId",
            name:"Merchant",
            component: Merchant
        },
        {
            path: "/StartPage",
            redirect:"/"
        }
    ]
})

export default router