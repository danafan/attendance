import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    ground_list:[],     //内容列表
    remark:"",          //顶部提示
    id:"",              //当前ID
    status:"",          //状态
    title:"",           //页面标题
    href:""
  },
  mutations: {
    //数据列表
    setGroundList (state, ground_list) {  
      state.ground_list = ground_list;
    },
    //提示文字
    setRemark(state, remark) {  
      state.remark = remark;
    },
    //当前ID
    setId(state, id) {  
      state.id = id;
    },
    //当前状态
    setStatus(state, status) {  
      state.status = status;
    },
    //页面标题
    setTitle(state, title) {  
      state.title = title;
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

