<template>
	<div class="index_container">
		<div class="top_toast">
			<div class="toast_title">温馨提示</div>
			<div class="toast_content">{{remark}}</div>
		</div>
		<div class="center_content">
			<div class="ground_item" v-for="item in ground_list">
				<div class="ground_title">{{item.ground_title}}</div>
				<div class="list_item" v-for="i in item.children">
					<div class="lable">{{i.lable}}</div>
					<div class="value">{{i.value}}</div>
				</div>
			</div>
      <div class="img_time" v-if="status != 1">
        <img class="sign_img" :src="sign_img" v-if="sign_img != ''">
        <div class="aff_time">{{status == 4?'自动确认时间：':''}}{{aff_time}}</div>
      </div>
    </div>
    <div class="bottom_content">
     <div class="button_item" @click="openChat">对考勤有疑问?</div>
     <div class="button_item sign" @click="show_sign = true" v-if="status == 1">
      <img class="sign_icon" src="../static/sign_icon.png">
      <div>签名确认</div>
    </div>
    <div class="red_color" v-else>{{status == 2?'已确认':'已自动确认'}}</div>
  </div>
  <Sign @callback="signCallBack" v-if="show_sign"/>
</div>
</template>
<script>
	import * as dd from 'dingtalk-jsapi';
	import resource from '../api/resource.js'

	import Sign from '../components/sign.vue'
	export default{
		data(){
			return{
        id:"",
				show_sign:false,
        sign_img:"",
        aff_time:""
      }
    },
    computed:{
     ground_list(){
      return this.$store.state.ground_list;
    },
    remark(){
      return this.$store.state.remark;
    },
    status(){
      return this.$store.state.status;
    },
    title(){
      return this.$store.state.title;
    },
    linkman_id(){
      return this.$store.state.linkman_id;
    }
  },
  created(){
      this.id = this.$route.query.id;
			//设置页面标题
			dd.biz.navigation.setTitle({
				title : this.title,
				onSuccess : function(result) {
				},
				onFail : function(err) {}
			});
      //获取签名状态
      this.getAffInfo(); 
    },
    methods:{
      		//签名弹窗回调
      		signCallBack(e){
      			if(e.type == 'cancel'){	//取消
      				this.show_sign = false;
      			}else{					//提交
      				let arg = {
      					id:this.id,
      					file:e.file
      				}
      				resource.editUserAttendInfo(arg).then(res => {
      					if(res.code == 1){
      						this.$toast(res.msg);
                  this.show_sign = false;
                  //获取签名状态
                  this.getAffInfo();
                }else{
                  this.$toast(res.msg)
                }
              })
      			}
      		},
          //获取签名状态
          getAffInfo(){
            let arg = {
              id:this.id
            }
            resource.getAffInfo(arg).then(res => {
              if(res.code == 1){
                let data = res.data;
                this.sign_img = data.img;
                this.aff_time = data.aff_time;
                let store_data = {
                  status:data.status
                }
                this.$store.commit('setData',store_data);
              }else{
                this.$toast(res.msg)
              }
            })
          },
      		//去联系
         openChat(){
          dd.ready(() => {
           dd.biz.chat.openSingleChat({
    					corpId: 'ding7828fff434921f5b', // 企业id,必须是用户所属的企业的corpid
    					userId:this.linkman_id, // 用户的uerid
    					onSuccess : () => {
    					},
    					onFail : function() {}
    				})
         })
        },
      },
      components:{
        Sign
      }
    }
  </script>
  <style lang="less" scoped>
  .index_container{
  	position: absolute;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	display: flex;
  	flex-direction: column;
  	.top_toast{
  		padding: 15px 20px;
  		background: #FFFAE0;
  		width: 100%;
  		color: #333333;
  		.toast_title{
  			margin-bottom: 5px;
  			font-size: 16px;
  			font-weight: bold;
  		}
  		.toast_content{
  			font-size: 14px;
  		}
  	}
  	.center_content{
  		flex: 1;
  		overflow-y: scroll;
  		.ground_item{
  			.ground_title{
  				background: #F4F4F4;
  				height: 40px;
  				line-height: 40px;
  				padding-left: 10px;
  				font-size:18px;
  				color: #97999C;
  			}
  			.list_item{
  				border-bottom: 1px solid #F4F4F4;
  				display: flex;
  				justify-content: space-between;
  				padding: 10px;
  				font-size:18px;
  				color: #333333;
  				.lable{
            width: 140px;
            font-weight: bold;
          }
          .value{
            flex:1;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
      .img_time{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        .sign_img{
          zoom:0.16;
        }
        .aff_time{
          font-size:18px;
          color: #333333;
        }
      }
    }
    .bottom_content{
      border-top: 1px solid #F4F4F4;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .button_item{
       border:1px solid #cccccc;
       border-radius: 5px;
       width: 130px;
       height: 45px;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size:16px;
       color: #333333;
       .sign_icon{
        margin-right: 5px;
        width: 16px;
        height: 16px;
      }
    }
    .sign{
     border:none;
     background: #1F70F4;
     color: #ffffff;
   }
   .red_color{
     color: red;
     font-size:18px;
     font-weight: bold;
   }
 }
}
</style>







