<template>
	<div class="sign">
		<vue-esign class="canvas_back" ref="esign" :width="width" :height="height" :lineWidth="5" lineColor="#000000"/>
		<div class="btn">
			<div class="button clear" @click="cancelFn">取消</div>
			<div class="button clear" @click="clearCanvas">清除</div>
			<div class="button upload" @click="save">上传</div>
		</div>
	</div>
</template>
<script>
	export default{
		props: {
		    // 画布宽度
		    width: {
		    	type: Number,
		    	default: window.innerWidth
		    },
		    // 画布高度
		    height: {
		    	type: Number,
		    	default: window.innerHeight
		    },
		},
		methods: {
		    // 保存图片
		    save () {
		    	this.$refs.esign.generate().then(res => {
		    		let file_name = 'filename_' + new Date().valueOf() + '.png';
		    		let file = this.toFile(res,file_name);
		    		let arg = {
		    			type:'commit',
		    			file:file
		    		}
		    		this.$emit('callback',arg);
		    	}).catch(err => {
		    		this.$toast('请签名!')
		    	})
		    },
		    //图片转成file
		    toFile(urlData, fileName){
		    	let arr = urlData.split(',');
		    	let mime = arr[0].match(/:(.*?);/)[1];
		    	let bytes = atob(arr[1]);
		    	let n = bytes.length
		    	let ia = new Uint8Array(n);
		    	while (n--) {
		    		ia[n] = bytes.charCodeAt(n);
		    	}
		    	return new File([ia], fileName, { type: mime });
		    },
		    //取消
		    cancelFn(){
		    	let arg = {
		    		type:'cancel'
		    	}
		    	this.$emit('callback',arg)
		    },
		    // 清除画布
		    clearCanvas () {
		    	this.$refs.esign.reset()
		    },

		}
	}
</script>
<style type="text/css">
	.canvas_back{
		background: #cccccc!important;
	}
</style>
<style lang="less" scoped>
.sign{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	.btn{
		position: absolute;
		left: 0;
		top: 0;
		width: 120px;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.button {
		border-radius: 10px;
		background: #999;
		width: 160px;
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		color: #fff;
	}

	.clear {
		transform: rotate(90deg);
		background: #999999;
	}
	.upload {
		transform: rotate(90deg);
		background: #03abff;
	}
}
</style>