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

	/*兼容性   设置text*/
function setHtml(ele, setEle) { //ele被设置对象,setEle设置对象
		if(ele.textContent != null) {
			ele.textContent = setEle.textContent;
		} else {
			ele.innerText = setEle.innerText;
		}
}

/*模拟jquery添加classname，防止不被覆盖*/
function addClass(ele,classname){ //ele被添加class的element, classname被添加的类名
	var oldClassName = trim(ele.className);
	classname = trim(classname);
	var newClassName = oldClassName + " " + classname;

	ele.className = newClassName;
}

/*模拟jquery删除classname，防止不被覆盖*/
function removeClass(ele,classname){ //ele被添加class的element, classname被添加的类名
	var oldClassName = trim(ele.className);
	var classNameArray = oldClassName.split(" ");
	classname = trim(classname);
		classNameArray.forEach(function(element,index){
			if(element === classname){
				classNameArray.splice(index,1);
			}
		});
	var newClassName = classNameArray.join(" ");
	ele.className = newClassName;
}
function trim(str){ //删除左右两端的空格
　　 return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
