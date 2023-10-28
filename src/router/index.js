import
{createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import StartPage from "../StartPage.vue";


const router = createRouter({
    history : createWebHashHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            name:"StartPage",
            component: StartPage
        },
        {
            path: "/StartPage",
            redirect:"/"
        }
    ]
})

export default router