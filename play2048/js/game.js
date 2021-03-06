var str=[]
var game={
		data:[],
		score:0,
		state:1,
		running:1,
		playing:2,
		gameOver:0,
		flag:true,
		arr:[],
		scorearr:[],
		start:function(){
			this.data=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
			this.score=0
			this.state=this.running
			$('#gameOver').css('display','none')
			this.randomNum()
			this.randomNum()
			this.dataView()
			if(sessionStorage.close==0){
				$('#bgmusic')[0].play()
			}
		},
		isFull:function(){
			for(var row=0;row<4;row++){
				for(var col=0;col<4;col++){
					if(this.data[row][col]==0){
						return false;
					}
				}
			}
			return true;
		},
		randomNum:function(){
			if(this.isFull()){return;}
			while(true){
				var row=Math.floor(Math.random()*4)
				var col=Math.floor(Math.random()*4)
				if(this.data[row][col]==0){
					this.data[row][col]=Math.random()<0.5?2:4
					break;
				}
			}
		},
		canLeft:function(){//判断能否左移
			for(var row=0;row<4;row++){
				for(var col=1;col<4;col++){
					if(this.data[row][col]!=0){
						if(this.data[row][col-1]==0||this.data[row][col]==this.data[row][col-1]){
							return true;
						}
					}
				}
			}
			return false;
		},
		moveLeft:function(){//左移所有行
			if(this.canLeft){
				for(var row=0;row<4;row++){
					this.moveLeftInRow(row)
				}
				this.state=this.playing;
				animation.start();
				setTimeout(function(){
					game.state=game.running;
					game.randomNum();
				    game.dataView();	
				},animation.times*animation.interval);
			}
		},
		moveLeftInRow:function(row){//左移当前行
			for(var col=0;col<3;col++){
				var nextcol=this.getNextRight(row,col)
				if(nextcol==-1){
					break;
				}else{
					if(this.data[row][col]==0){
						this.data[row][col]=this.data[row][nextcol]
						this.data[row][nextcol]=0
						animation.addTask(''+row+nextcol,''+row+col)
						col--
					}else if(this.data[row][col]==this.data[row][nextcol]){
						this.data[row][col]*=2
						this.data[row][nextcol]=0
						this.score+=this.data[row][col]
						animation.addTask(''+row+nextcol,''+row+col)
					}
				}
			}
		},
		getNextRight:function(row,col){//获得当前行中，指定位置右侧第一个不为0的数，返回一个下标，若无返回-1
			for(var i=col+1;i<4;i++){
				if(this.data[row][i]!=0){
					return i;
				}
			}
			return -1;
		},
		canRight:function(){//判断能否右移
			for(var row=0;row<4;row++){
				for(var col=2;col>=0;col--){
					if(this.data[row][col]!=0){
						if(this.data[row][col+1]==0||this.data[row][col]==this.data[row][col+1]){
							return true;
						}
					}
				}
			}
			return false;
		},
		moveRight:function(){//向右移动所有行
			if(this.canRight()){
				for(var row=0;row<4;row++){
					this.moveRightInRow(row);
				}
				this.state=this.playing;
				animation.start();
				setTimeout(function(){
					game.state=game.running;
					game.randomNum();
				    game.dataView();	
				},animation.times*animation.interval);
			}
		},
		moveRightInRow:function(row){//右移当前行
			for(var col=3;col>0;col--){
				var nextCol=this.getNextLeft(row,col);
				if(nextCol==-1){
					break;
				}else{
					if(this.data[row][col]==0){
						this.data[row][col]=this.data[row][nextCol];
						this.data[row][nextCol]=0;
						animation.addTask(""+row+nextCol,""+row+col);
						col++;
					}else if(this.data[row][col]==this.data[row][nextCol]){
						this.data[row][col]*=2;
						this.score+=this.data[row][col];
						this.data[row][nextCol]=0;
						animation.addTask(""+row+nextCol,""+row+col);
					}
				}
			}
		},
		getNextLeft:function(row,col){//从当前位置向左，找下一个不为0的数
			for(var i=col-1;i>=0;i--){
				if(this.data[row][i]!=0){
					return i;	
				}	
			}		
			return -1;	
		},
		canUp:function(){//判断能否上移
			for(var row=1;row<4;row++){
				for(var col=0;col<4;col++){
					if(this.data[row][col]!=0){
						if(this.data[row-1][col]==0||this.data[row][col]==this.data[row-1][col]){
							return true;
						}
					}
				}
			}
			return false;
		},
		moveUp:function(){//上移所有列
			if(this.canUp()){
			for(var col=0;col<4;col++){
					this.moveUpInCol(col);
				}
				this.state=this.playing;
				animation.start();
				setTimeout(function(){
					game.state=game.running;
					game.randomNum();
				    game.dataView();	
				},animation.times*animation.interval);
			}
		},
		moveUpInCol:function(col){//上移当前列
			for(var row=0;row<3;row++){
				var nextRow=this.getNextDown(row,col);
				if(nextRow==-1){
					break;
				}else{
					if(this.data[row][col]==0){
						this.data[row][col]=this.data[nextRow][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
						row--;
					}else if(this.data[row][col]==this.data[nextRow][col]){
						this.data[row][col]*=2;
						this.score+=this.data[row][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
					}
				}
			}
		},
		getNextDown:function(row,col){//从当前位置向下，找第一个不为0的数
			for(var i=row+1;i<4;i++){
				if(this.data[i][col]!=0){
						return i;
				}
			}
			return -1;
		},
		canDown:function(){//判断能否下移
			for(var row=0;row<3;row++){
				for(var col=0;col<4;col++){
					if(this.data[row][col]!=0){
						if(this.data[row+1][col]==0||this.data[row][col]==this.data[row+1][col]){
							return true;
						}
					}
				}
			}
			return false;
		},
		moveDown:function(){//向下移动所有列
			if(this.canDown()){
				for(var col=0;col<4;col++){
					this.moveDownInCol(col);
				}
				this.state=this.playing;
				animation.start();
				setTimeout(function(){
					game.state=game.running;
					game.randomNum();
				    game.dataView();
				},animation.times*animation.interval);
			}
		},
		moveDownInCol:function(col){//下移当前列
			for(var row=3;row>0;row--){
				var nextRow=this.getNextUp(row,col);
				if(nextRow==-1){
					break;
				}else{
					if(this.data[row][col]==0){
						this.data[row][col]=this.data[nextRow][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
						row++;
					}else if(this.data[row][col]==this.data[nextRow][col]){
						this.data[row][col]*=2;
						this.score+=this.data[row][col];
						this.data[nextRow][col]=0;
						animation.addTask(""+nextRow+col,""+row+col);
					}
				}
			}
		},
		getNextUp:function(row,col){//从当前位置向上，找下一个不为0的数
			for(var i=row-1;i>=0;i--){
				if(this.data[i][col]!=0){
					return i;	
				}	
			}		
			return -1;	
		},
		dataView:function(){
			for(var row=0;row<4;row++){
				for(var col=0;col<4;col++){
					$('#c'+row+col).html(this.data[row][col]==0?"":this.data[row][col])
					$('#c'+row+col)[0].className=this.data[row][col]==0?"cell":"cell n"+this.data[row][col];
				}
			}
			yx()
			$('#score').html(this.score)
			if(this.score>localStorage.hscore){
				localStorage.hscore=this.score
			}
			$('.hscore').html(localStorage.hscore)
			if(this.isGameOver()){
				this.state=this.gameOver
				$('#finishScore').html(this.score)
				$('#gameOver').css('display','block')
			}
			if(this.isGamePass()){
				$('#gamePass').css('display','block')
			}
			this.flag=true
		},
		isGameOver:function(){
			if(!this.isFull()){
				return false;
			}else{
				for(var row=0;row<4;row++){
					for(var col=0;col<4;col++){
						if(col<3){
							if(this.data[row][col]==this.data[row][col+1]){
								return false;
							}
						}
						if(row<3){
							if(this.data[row][col]==this.data[row+1][col]){
								return false;
							}
						}
					}
				}
				failmusic()
				return true;
			}
		},
		isGamePass:function(){
			for(var row=0;row<4;row++){
				for(var col=0;col<4;col++){
					console.log(sessionStorage.grade)
					if(this.data[row][col]==sessionStorage.grade){
						passmusic()
						return true
					}
				}
			}
			return false
		}
	}
	if(!localStorage.hscore){
		localStorage.hscore=0
	}
window.onload=function(){
	
	game.start()
	$('.yes')[0].addEventListener('touchstart',function(){
		if(sessionStorage.grade==16){
			sessionStorage.grade=32
		}else if(sessionStorage.grade==32){
			sessionStorage.grade=3
		}
		if(sessionStorage.close==0){
			if($('#bgmusic')[0].paused){
				$('#bgmusic')[0].play()
			}
		}		
		$('#pass')[0].currentTime=0
		$('#pass')[0].pause()
		$('#gamePass').css('display','none')
	})
	var square = document.querySelector('#gamecon');
	var manager = new Hammer.Manager(square);
	var Swipe = new Hammer.Swipe();
	manager.add(Swipe);
	manager.on('swipe', function(e) {
		var direction = e.offsetDirection;
		if(direction==2){
			game.moveLeft()
		}
		if(direction==4){
			game.moveRight()
		}
		if(direction==8){
			game.moveUp()
		}
		if(direction==16){
			game.moveDown()
		}
    })
	$('.no')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('#gamePass').css('display','none')
		window.location.href='index.html'
	})
	$('.backmenu')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		window.location.href='index.html'
	})
	$('#restart')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('#gameOver').css('display','none')
		game.start()
	})
	$('.reset')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('.clear').css('display','flex')
	})
	$('#clear')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		localStorage.hscore=0
		$('.clear').css('display','none')
		$('.hscore').html(localStorage.hscore)
	})
	$('#not')[0].addEventListener('touchstart',function(e){
		e.preventDefault()
		$('.clear').css('display','none')
	})
}
function passmusic(){
	if(sessionStorage.close==0||sessionStorage.yx==0){
		$('#bgmusic')[0].pause()
		$('#yx')[0].currentTime=0;
		$('#yx')[0].pause()
		$('#pass')[0].play()
	}	
}
function failmusic(){
	if(sessionStorage.close==0||sessionStorage.yx==0){
		$('#bgmusic')[0].currentTime=0;
		$('#bgmusic')[0].pause()
		$('#yx')[0].currentTime=0;
		$('#yx')[0].pause()
		$('#fail')[0].play()
	}
}
function yx(){
	if(sessionStorage.close==1){
		if(sessionStorage.yx==0){
			$('#yx')[0].play()
			setTimeout(function(){
				$('#yx')[0].currentTime=0;
				$('#yx')[0].pause()
			},300)
		}
	}		
}
function getStyle(obj){
	if(obj.currentStyle){
		return obj.currentStyle
	}else{
		return getComputedStyle(obj,null)
	}
}
function Task(obj,topStep,leftStep){
		this.obj=obj
		this.topStep=topStep
		this.leftStep=leftStep
	}
Task.prototype.moveStep=function(){
	var style=getStyle(this.obj)
	var top=parseInt(style.top)
	var left=parseInt(style.left)
	this.obj.style.top=top+this.topStep+'px'
	this.obj.style.left=left+this.leftStep+'px'
}
Task.prototype.clear=function(){
	this.obj.style.top=''
	this.obj.style.left=''
}	
var animation={
		times:10,//每个动画10步完成
		interval:10,//10毫秒迈一步	
		timer:null,//保存定时器id的属性
		tasks:[],//保存每次需要移动的任务
		addTask:function(source,target){
			var sourceDiv=document.getElementById("c"+source);
			var targetDiv=document.getElementById("c"+target);
			var sourceStyle=getStyle(sourceDiv);
			var targetStyle=getStyle(targetDiv);
			var topStep=(parseInt(targetStyle.top)-parseInt(sourceStyle.top))/this.times;
			var leftStep=(parseInt(targetStyle.left)-parseInt(sourceStyle.left))/this.times;
			var task=new Task(sourceDiv,topStep,leftStep)
			this.tasks.push(task)
		},
		start:function(){
			this.timer=setInterval(function(){
				for(var i=0;i<animation.tasks.length;i++){
					animation.tasks[i].moveStep()
				}
				animation.times--
				if(animation.times==0){
					for(var i=0;i<animation.tasks.length;i++){
						animation.tasks[i].clear()
					}
					clearInterval(animation.timer)
					animation.times=10
					animation.timer=null
					animation.tasks=[]
				}
			},this.interval)
			
		}
	}

