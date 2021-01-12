import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const routes = [
    {
        path:'/login',
        component: () => import('@/pages/login.vue')
    },
    {
        path:'/productList',
        component: () => import('@/pages/productList.vue')
    }
]

const router = new VueRouter({
    routes
})

const getCurUser = function(){
    return JSON.parse(localStorage.getItem('user'));
}

router.beforeEach((to, from, next) => {
    if(to.path=='/login'){
        next();
        return
    }
    if(getCurUser()){
        next()
    }else{
        //若无user信息退回到login
        next('/login')
        return 
    }
    
})


export default router