export const constantRoute = [
    {
        path:"/",
        component:()=> import('@/views/layout/index.vue'),
        name:'layout',
        redirect:"/home",
        meta:{
            title:"首页",
            hidden:true,
        },
        children:[
            {
                path:'/home',
                component:()=> import("@/views/home/index.vue"),
                meta:{
                    title:'首页',
                    hidden:false,
                    icon:'home'
                },
            },
            {
                path:'/user',
                component:()=> import("@/views/user/index.vue"),
                meta:{
                    title:'用户管理',
                    hidden:false,
                    icon:'user-group'
                },
            },
            {
                path:'/data',
                name:'data',
                redirect:"/question",
                meta:{
                    title:"数据管理",
                    hidden:false,
                    icon:'storage'
                },
                children:[
                    {
                        path: '/data/question',
                        name: 'question',
                        component: () => import('@/views/question/index.vue'),
                        meta: {
                            title:'问题管理',
                            hidden:false,
                            icon:'question-circle'
                        },
                    },
                    {
                        path: '/data/answers',
                        name: 'answers',
                        component: () => import('@/views/answers/index.vue'),
                        meta: {
                            title:'回答管理',
                            hidden:false,
                            icon:'message'
                        },
                    },
                    {
                        path: '/data/channel',
                        name: 'channel',
                        component: () => import('@/views/channel/index.vue'),
                        meta: {
                            title:'频道管理',
                            hidden:false,
                            icon:'subscribed'
                        },
                    },
                    
                    {
                        path:'/data/answersDetail/:id',
                        name:'answersDetail',
                        component: () => import('@/views/answersDetail/index.vue'),
                        meta:{
                            title:'问题详情',
                            hidden:true,
                            icon:'subscribed'
                        }
                    }
                ]
            },


        ]
    },
    {
        path:"/login",
        component:()=> import("@/views/login/index.vue")
    },

]