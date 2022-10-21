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
      // this.$router.push('/index');
      // return;


      //判断是否是手机端
      if(this.isMobile()){  //手机端
        // 获取钉钉鉴权信息
        this.getConfig();
      }else{
        this.$store.commit('setHref',window.location.href);
        this.$router.replace('/qr_code');
      }
    },
    methods:{
      //获取钉钉鉴权信息
      getConfig(){
        resource.getConfig().then(res => {
          if(res.code == 1){
            let data = res.data;
            //钉钉鉴权
            this.dingAuth(data);
          }
        })
      },
      //钉钉鉴权
      dingAuth(data){
        data.url = window.location.href;
        data.corp_id = 'ding7828fff434921f5b';
        resource.dingAuth(data).then(res => {
          //钉钉鉴权
          this.ddConfig(res.data);
        })
      },
      //钉钉鉴权
      ddConfig(data){
        dd.config({
          agentId: data.agentId, // 必填，微应用ID
          corpId: data.corpId,//必填，企业ID
          timeStamp: data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，自定义固定字符串。
          signature: data.signature, // 必填，签名
          jsApiList : [
          'biz.chat.openSingleChat'
          ] // 必填，需要使用的jsapi列表，注意：不要带dd。
        });
        dd.error(function (err) {
          alert('dd error: ' + JSON.stringify(err));
        })
        //钉钉获取code
        this.getDingCode();
      },
      //钉钉获取code
      getDingCode(){
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
                //设置数据
                let store_data = {
                  ground_list:info_list,
                  remark:res.data.remark,
                  id:res.data.id,
                  status:res.data.status,
                  title:res.data.title,
                  linkman_id:res.data.linkman_id
                }
                this.$store.commit('setData',store_data);
                
                this.$router.push('/index');
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
