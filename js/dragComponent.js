(function(w, d) {
	function Drag(setting) { //setting : data,stageEle,index
		this.setting = {};
		//	遍历传入信息
		for(val in setting) {
			this.setting[val] = setting[val];
		}
		//初始化，把data放入到stage里面
		if(this.setting.data != null && this.setting.stageEle != null) {
			var i = 0,
				len = this.setting.data.length,
				str = null,
				stageEleHtml = this.setting.stageEle.innerHTML;
			if(this.setting.index != null) {
				for(; i < len; i++) {
					var str = '<div class="dragVal" data-index="' + this.setting.index[i] + '">' + this.setting.data[i] + '</div>';
					stageEleHtml = stageEleHtml + str;
				}
			} else {
				for(; i < len; i++) {
					var str = '<div class="dragVal">' + this.setting.data[i] + '</div>';
					stageEleHtml = stageEleHtml + str;
				}
			}

			this.setting.stageEle.innerHTML = stageEleHtml;

			this.setWidth(); //自动计算dragVal和drag的width并建立

		}

	}
	//自动计算width
	Drag.prototype.setWidth = function() {
		var dragVal = document.getElementsByClassName("dragVal");
		var Width = 100 / dragVal.length;
		var i = 0,
			len = dragVal.length;
		for(; i < len; i++) {
			dragVal[i].style.width = Width + "%";
		}
		var dragDiv = dragVal[0].previousElementSibling;
		dragDiv.style.width = Width + "%";
		setHtml(dragDiv, dragVal[0]); //初始化选中名称

	}

	//拖拽开始
	Drag.prototype.drag = function(dragEle) {
		//console.log("进来了");
		var _this = this;
		var dragVal = document.getElementsByClassName("dragVal");
		if(!this.setting.stageEle) {
			throw Error("this is not defined stageEle");
		} else {
			mui("#selectWriting").on("dragstart",".drag",function(e){
				
//			dragEle.addEventListener("mousedown", function(e) {

				var e = e.detail || event;
				var disx = e.touches[0].clientX - this.offsetLeft;
				var disy = e.touches[0].clientY - this.offsetTop;
				var dragging = true;
				var Left = 0;
				var Top = 0;

				//阻止默认事件
				preventDefault(e);

				//阻止冒泡
				stopPro(e);
			mui("#selectWriting").on("drag", ".drag", function(e) {
			//	d.addEventListener("mousemove", function(e) {
					if(dragging) {
						var e = e.detail || event;
						Left = e.touches[0].clientX - disx;
						Top = e.touches[0].clientX - disy;

						if(Left < 2) {
							Left = 2;
						} else if(Left > _this.setting.stageEle.clientWidth - dragEle.offsetWidth - 2) {
							Left = _this.setting.stageEle.clientWidth - dragEle.offsetWidth - 2;
						}

						if(Top < 2) {
							Top = 2;
						} else if(Top > _this.setting.stageEle.clientHeight - dragEle.offsetHeight - 2) {
							Top = _this.setting.stageEle.clientHeight - dragEle.offsetHeight - 2;
						}
						//console.log(Math.round(Left/dragEle.offsetWidth));
						//转换drag中的文字
						var index = Math.round(Left / dragEle.offsetWidth);

						setHtml(dragEle, dragVal[index]);

						dragEle.style.left = Left + 'px';
						dragEle.style.top = Top + 'px';
					}
				});
					
				mui("#selectWriting").on("dragend", ".drag", function(e) {
				//document.addEventListener("mouseup", function() {
					dragging = false;
					var index = Math.round(Left / dragEle.offsetWidth);
					//console.log(dragEle.offsetWidth);
					//console.log(_this.setting.stageEle.clientWidth);
					if(index == 0) {
						dragEle.style.left = (index * dragEle.offsetWidth + 2) + 'px';
					} else if(index == dragVal.length - 1) {
						dragEle.style.left = (index * dragEle.offsetWidth - 2) + 'px';
					} else {
						dragEle.style.left = index * dragEle.offsetWidth + 'px';
					}

				});

			});
		}

	}

	/*兼容性   设置text*/
	function setHtml(ele, setEle) { //ele被设置对象,setEle设置对象
		if(ele.textContent != null) {
			ele.textContent = setEle.textContent;
		} else {
			ele.innerText = setEle.innerText;
		}
	}

	/*兼容性  阻止默认事件*/
	function preventDefault(e) {
		var e = e || window.event;
		if(e.preventDefault && e) {
			e.preventDefault()
		} else {
			window.event.returnValue = false;
		}
	}

	/*兼容性  阻止冒泡*/
	function stopPro(e) {
		var e = e || window.event;
		if(e.stopPropagation && e) {
			e.stopPropagation();
		} else {
			window.event.cancelBubble = true;
		}
	}

	window.Drag = Drag;

})(window, document)