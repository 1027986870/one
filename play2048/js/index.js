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
	sessionStorage.grade=16
	for(let i=0;i<jb_li.length;i++){
		$(jb_li)[i].addEventListener('touchstart',function(e){
			e.preventDefault()
			stopPropagation()
			$('#menu a:eq(1)').text($(this).text())
			if(i==0){
				sessionStorage.grade=16
			}
			if(i==1){
				sessionStorage.grade=32
			}
			if(i==2){
				sessionStorage.grade=3
			}
			$('.jb').eq(0).css('display','none')
		})
	}
	sessionStorage.close=0
	$('.close div')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		if($(this).css('left')=='0px'){
			$(this).css('left','50%')
			sessionStorage.close=1
		}else{
			$(this).css('left','0px')
			sessionStorage.close=0
		}
		setTimeout(function(){
			$('.jb').eq(1).css('display','none')
		},500)
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
