import Vue from 'vue'
import Router from 'vue-router'
const index = resolve=>System.import('@/pages/index')
const damage = resolve=>System.import('@/pages/damage')
const qr_code = resolve=>System.import('@/pages/qr_code')

Vue.use(Router);

const router = new Router({
	routes: [
	{
		path: '/index',
		name:"首页",
		component: index
	},
	{
		path: '/damage',
		name:"以销毁",
		component: damage
	},
	{
		path: '/qr_code',
		name:"扫码登录",
		component: qr_code
	}
	]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router;
