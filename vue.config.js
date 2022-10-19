module.exports = {	
	devServer: {
		proxy: {
			'/attend': {
				target: 'http://test_sample.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		},
		host:"0.0.0.0",  
	}
}