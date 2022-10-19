<template>
	<div class="sign">
		<canvas id="canvas" :width="width" :height="height"/>
		<div class="btn">
			<div class="button clear" @click="cancelFn">取消</div>
			<div class="button clear" @click="clearCanvas">清除</div>
			<div class="button upload" @click="save">上传</div>
		</div>
	</div>
</template>
<script>
	export default{
		data () {
			return {
				radius:3,
				color:'#000000',
				fillStyle:'#cccccc'
			}
		},
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
		mounted () {
			this.int();
		},
		methods: {
			// 数据初始化
			int () {
				this.canvas = document.querySelector('#canvas');
				let ctx = this.canvas.getContext('2d');
		      	let move = false; // 按下标识
		      	ctx.fillStyle = this.fillStyle;
		      	ctx.fillRect(0, 0, this.width, this.height);
		      	// 事件兼容PC 移动端
		      	let eventStart = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
		      	let eventMove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
		      	let eventEnd = 'ontouchend' in document ? 'touchend' : 'mouseup';
		      	this.canvas.addEventListener(eventStart, (e) => {
		      		let sx = e.touches ? e.touches[0].pageX : e.pageX;
		      		let sy = e.touches ? e.touches[0].pageY : e.pageY;
		      		move = true;
		      		this.fillCircle(ctx, sx, sy, this.radius);
		      	}, false);
		      	this.canvas.addEventListener(eventMove, (e) => {
		      		let sx = e.touches ? e.touches[0].pageX : e.pageX;
		      		let sy = e.touches ? e.touches[0].pageY : e.pageY;
		      		move && this.fillCircle(ctx, sx, sy, this.radius);
		      	}, false);
		      	this.canvas.addEventListener(eventEnd, (e) => {
		      		move = false;
		      	}, false);
		      },
		      fillCircle (ctx, x, y, radius, fillColor) {
		      	ctx.fillStyle = fillColor || this.color;
		      	ctx.beginPath();
		      	ctx.moveTo(x, y);
		      	ctx.arc(x, y, radius, 0, Math.PI * 2, false); // 标准画圆
		      	ctx.fill();
		      },
		    // 保存图片
		    save () {
		    	let imgBase64 = this.canvas.toDataURL('image/png'); 
		    	let file_name = 'filename_' + new Date().valueOf() + '.png';
		    	let file = this.toFile(imgBase64,file_name);
		    	let arg = {
		    		type:'commit',
		    		file:file
		    	}
		    	this.$emit('callback',arg)
		    },
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
		      	let canvas = this.canvas;
		      	canvas.getContext('2d').fillStyle = this.fillStyle;
		      	canvas.getContext('2d').fillRect(0, 0, this.width, this.height);
		      },

		  }
		}
	</script>
	<style lang="less" scoped>
	.sign{
		position: fixed;
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