$(function(){
	var n=0
	$('video')[0].addEventListener('touchstart',function(e){
		if(n%2==0){
			this.play()
		}else{
			this.pause()
		}
		n++
	})
	for(var i=0;i<$('.zan').length;i++){
		$('.zan')[i].addEventListener('touchstart',function(e){
			e.preventDefault()
			var a=parseInt($(this).children('span').html())
			a++
			$(this).children('span').html(a)
		})
	}
	
})
	