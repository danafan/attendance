import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    ground_list:[],     //内容列表
    remark:"",          //顶部提示
    status:"",          //状态
    title:"",           //页面标题
    linkman_id:"",      //联系人ID
    href:""
  },
  mutations: {
    //设置数据
    setData(state, data) { 
      for(let k in data){
        state[k] = data[k];
      }
    },
    //当前地址
    setHref (state, href) {  
      state.href = href;
    },
  },
  actions: {

  }

})
export default store;

