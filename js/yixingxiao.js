//兼容性  事件监听(Element :Element, event :string, fn: function)
function setEvent( el, event, fn ){
	if(el.addEventListener){
		el.addEventListener(event,fn);
	}else{
		el.attachEvent("on"+event,fn);
	}
}

//模拟jquery   事件委托(#id :Element, 选择的className :string, 绑定事件 :string, 回调函数 :function) 
function eventLive( el, ClassName, ev, fn ){
	setEvent(el,ev,function(e){
		e = e || event;
		var src = e.srcElement || e.target;
		var allName = src.className.split(" ");
		var i = 0,
		    len = allName.length;
		for (; i < len; i++) {
			if(allName[i] === ClassName){
				fn(src);
			}
		}
	});
}
