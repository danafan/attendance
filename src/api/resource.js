import http from './request.js'
let path = {	
	getConfig:'clothes/ding/getConfig',						//获取钉钉鉴权信息
	dingAuth:'clothes/ding/auth',							//钉钉鉴权
	getUserInfo:'attend/query/userattendinfo',				//获取用户信息
	editUserAttendInfo:'attend/query/edituserattendinfo',	//用户确认
}								
export default{
	//获取钉钉鉴权信息
	getConfig(params){
		return http.get(path.getConfig, params)
	},
	//钉钉鉴权
	dingAuth(params){
		return http.get(path.dingAuth, params)
	},
	//获取用户信息
	getUserInfo(params){
		return http.get(path.getUserInfo, params)
	},
	//用户确认
	editUserAttendInfo(params){
		return http.post(path.editUserAttendInfo, params)
	},
}









