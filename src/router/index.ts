import { createRouter, createWebHistory } from 'vue-router'
import {constantRoute} from './routes'

// 自动生成routes
// const pageModules = import.meta.glob('../views/**/page.js',
// 	{
// 		eager:true,
// 		import:"default"
// 	}
// )

// const comModules = import.meta.glob('../views/**/index.vue')
// console.log(comModules)

// const routes = Object.entries(pageModules).map(([pagePath, config])=>{
// 	console.log(pagePath, config)
// 	let path = pagePath.replace("../views", '').replace("/page.js", "")
// 	path = path || '/'

// 	const name = path.split('/').filter(Boolean).join('-') || 'index'
// 	const comPath = pagePath.replace('page.js', 'index.vue')


// 	return {
// 		path,
// 		name,
// 		component: comModules[comPath],
// 		meta: config
// 	}
// })


// console.log(routes)
// console.log(pageModules)

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes:constantRoute
	// routes: [
	// 	{
	// 		path:"/",
	// 		component:()=> import('@/views/layout/index.vue'),
	// 		name:'layout',
	// 		redirect:"/home",
	// 		children:[
	// 			{
	// 				path:'/home',
	// 				component:()=> import("@/views/home/index.vue")
	// 			},
	// 			{
	// 				path:'/user',
	// 				component:()=> import("@/views/user/index.vue")
	// 			},
	// 			{
	// 				path: '/question',
	// 				name: 'question',
	// 				component: () => import('@/views/question/index.vue'),
	// 				meta: {
	// 					title:'问题管理',
	// 					hidden:false,
	// 					icon:'<icon-question />'
	// 				},
	// 			},
	// 		]
	// 	},
	// 	{
	// 		path:"/login",
	// 		component:()=> import("@/views/login/index.vue")
	// 	},

	// ]
})



export default router
