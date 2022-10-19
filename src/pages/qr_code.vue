<template>
	<div class="qr_code_container">
		<div class="qr_toast">请用使用手机钉钉扫码查看</div>
		<div id="qrcode" class="qrcode"></div>
	</div>
</template>
<script>
	import QRCode from 'qrcodejs2'  
	export default{
		mounted() {
            this.qrcode();
        },
        computed:{
			href(){
				return this.$store.state.href;
			}
		},
		methods: {
			qrcode() {
				let href = this.href;
				let qrcode = new QRCode('qrcode', {
					width: 162,
					height: 162,
					text: href, 
					colorDark: "#000",
					colorLight: "#fff",
				})
			},
		}
	}
</script>
<style lang="less" scoped>
.qr_code_container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.qr_toast{
		margin-bottom: 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}
	.qrcode {
		display: inline-block;
		width: 162px;
		height: 162px;
		img {
			width: 162px;
			height: 162px;
			background-color: #fff;
		}
	}
}
</style>