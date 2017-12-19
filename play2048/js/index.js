$(function(){
	$('#menu>li')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('.introduce').css('display','flex')
		$('.jb').css('display','none')
	})
	$('.introduce .iconfont')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('.introduce').css('display','none')
	})
	$('#menu>li')[1].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('.jb').eq(0).css('display','block')
		$('.jb').eq(1).css('display','none')
	})
	$('#menu>li')[2].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('.jb').eq(1).css('display','block')
	})
	$('#menu>li')[3].addEventListener('touchstart',function(e){
		e.preventDefault()
		window.location.href='game2048.html'
	})
	var jb_li=$('.jb')[0].getElementsByTagName('li')
	localStorage.grade=2048
	for(let i=0;i<jb_li.length;i++){
		$(jb_li)[i].addEventListener('touchstart',function(e){
			e.preventDefault()
			stopPropagation()
			$('#menu a:eq(1)').text($(this).text())
			if(i==0){
				localStorage.grade=2048
			}
			if(i==1){
				localStorage.grade=8192
			}
			if(i==2){
				localStorage.grade=3
			}
			console.log(localStorage.grade)
			$('.jb').eq(0).css('display','none')
		})
	}
	$('.close div')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		if($(this).css('left')=='0px'){
			$(this).css('left','50%')
			localStorage.close=0
		}else{
			$(this).css('left','0px')
			localStorage.close=1
		}
		setTimeout(function(){
			$('.jb').eq(1).css('display','none')
		},500)
		console.log(localStorage.close)
	})
})
function stopPropagation(ev){
	var e=ev||event
	if(e.stopPropagation){
		e.stopPropagation()
	}else{
		e.cancelBubble=true
	}
}
