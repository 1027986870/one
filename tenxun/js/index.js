window.onload=function(){
	var oNavcon=document.getElementsByClassName('nav_con')[0]
	var oNav=document.getElementById('nav')
	var dis=0,left;
	oNavcon.addEventListener('touchstart',function(e){
		var sta=e.targetTouches[0].pageX
		left=oNav.offsetLeft
		this.addEventListener('touchmove',function(e){
			dis=e.targetTouches[0].pageX-sta
			if(left+dis<0&&left+dis>$(oNavcon).width()-$('#nav').width()){
				oNav.style.left=left+dis+"px"
			}
		})
		this.addEventListener('touchend',function(e){
			oNav.style.left=left+dis+"px"
			if(oNav.offsetLeft>0){
				oNav.style.left="0px"
			}
			if(oNav.offsetLeft<$(oNavcon).width()-$('#nav').width()){
					oNav.style.left=$(oNavcon).width()-$('#nav').width()+'px'
				}
		})
	})
	var mySwiper = new Swiper ('.swiper-container', {
//		    direction: 'vertical',
		    loop: true,
//		    autoplay:true,
			autoplay: {
		    delay: 3000,
		    stopOnLastSlide: false,
		    disableOnInteraction: false
		    },
		    // 如果需要分页器
		    pagination: {
		      el: '.swiper-pagination',
		    },
	})

	window.onwheel=function(e){
		if(e.deltaY>0){
			$('header').animate({'top':'-85px'},300)
			$('body').animate({'padding-top':'0px'},300)
		}else{
			$('header').animate({'top':'0px'},300)
			$('body').animate({'padding-top':'85px'},300)
		}	
	}
	
}
