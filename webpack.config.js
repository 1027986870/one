var path=require('path')

module.exports={
	entry:'./js/index.js',
	output:{
		path:__dirname+'/dist',
		filename:'main.js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test:/\.(gif|jpg|jpeg|png)$/,
				use:"url-loader?limit=10000&name=[name].[ext]"
			},
			{
				test:/\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
				use:'file-loader'
			}
		]
	},
	resolve:{
		extensions:['.js','.css']
	}
}

