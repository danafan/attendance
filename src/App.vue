<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import * as dd from 'dingtalk-jsapi';
  import resource from './api/resource.js'
  export default {
    created(){
      //判断是否是手机端
      if(this.isMobile()){  //手机端
        // 获取钉钉code
        this.getDingCode();
      }else{
        this.$store.commit('setHref',window.location.href);
        this.$router.replace('/qr_code');
      }
    },
    methods:{
      //钉钉获取code
      getDingCode(){
        //获取用户信息
        // this.getUserInfo('code');
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: "ding7828fff434921f5b", 
            onSuccess:  (info) => {
              let code = info.code;
              //获取用户信息
              this.getUserInfo(code);
            }});
        });
      },
      //获取用户信息
      getUserInfo(code){
            let attend_id = window.location.search.split('=')[1]; 
            // let attend_id = '2022101416207505'; 
            let arg = {
              code:code,
              attend_id:attend_id
            }
            resource.getUserInfo(arg).then(res => {
              if(res.code == 1){
                //如果是已销毁
                if(res.data.destroy == '1'){
                  this.$router.replace('/damage');
                  return;
                }
                var data = res.data.data;
                var info_list = [];
                for(let key in data){
                  var info_item = {
                    ground_title:"",
                    children:[]
                  };
                  info_item.ground_title = key;
                  for(let k in data[key]){
                    var child_obj = {};
                    child_obj.lable = k;
                    child_obj.value = data[key][k];
                    info_item.children.push(child_obj)
                  }
                  info_list.push(info_item)
                }
                //页面标题
                this.$store.commit('setTitle',res.data.title);
                //内容列表
                this.$store.commit('setGroundList',info_list);
                //顶部提示
                this.$store.commit('setRemark',res.data.remark);
                //id
                this.$store.commit('setId',res.data.id);
                //状态
                this.$store.commit('setStatus',res.data.status);
              }else{
                this.$toast(res.data.msg)
              }
            })
          },
      //判断是否是手机端
      isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    }
  }
</script>

<style>

</style>
