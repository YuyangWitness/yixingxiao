/*
 *日历插件
 * version 2.1
 * 2016.12.23
 * by Claire
 * jxndyy2014@163.com
 * 
 * 改变功能：可自行修改日历样式
 * */

function DateControl() {
	this.setting = {
		"tBody": null,
		"nowDay": new Date(),
		"getDayFlage": 0,
		"day": 1,
		"YearArray": new Array(),
		"MonthArray": new Array(),
		"DayArray": new Array(),
		"haveDateIndex": 0
	}

	DateControl.prototype.init = function(opt) {
		for(var i in opt) {
			this.setting[i] = opt[i];
		}

		this.getDate();
		this.ClickDate();
	}

	DateControl.prototype.setEvent = function(Event, Obj, fn) {
		if(!document.attachEvent) {
			Obj.addEventListener(Event, fn, false);
		} else {
			Obj.attachEvent("on" + Event, fn);
		}
	}

	DateControl.prototype.deleteAllTr = function() {
		var tBodyFormTr = this.setting.tBody[0].getElementsByTagName("tr");
		for(var i = tBodyFormTr.length - 1; i >= 0; i--) {
			this.setting.tBody[0].removeChild(tBodyFormTr[i]);
		}
	}

	DateControl.prototype.prev = function() {
		this.deleteAllTr();
		this.setting.getDayFlage = 0;
		this.setting.day = 1;
		this.setting.haveDateIndex = 0;
		this.setting.nowDay = new Date(this.setting.nowDay.getFullYear(), this.setting.nowDay.getMonth() - 1, this.setting.nowDay.getDate());
		this.getDate();
		this.ClickDate();
	}
	DateControl.prototype.next = function() {
		this.deleteAllTr();
		this.setting.getDayFlage = 0;
		this.setting.day = 1;
		this.setting.haveDateIndex = 0;
		this.setting.nowDay = new Date(this.setting.nowDay.getFullYear(), this.setting.nowDay.getMonth() + 1, this.setting.nowDay.getDate());
		this.getDate();
		this.ClickDate();
	}

	DateControl.prototype.ClickDate = function() {
		var nowMonth = document.getElementById("CalenderTable").getElementsByClassName("nowMonth");
		var i = 0,
			nowLenth = nowMonth.length,
			_this = this;
		for(; i < nowLenth; i++) {
			this.setEvent("tap", nowMonth[i], function() {
				_this.removeAllNow();
				var oldClassName = this.className;
				this.className = 'now ' + oldClassName;

				_this.ShowDaily();
			});

		}
		this.ShowDaily();

	}
	DateControl.prototype.removeAllNow = function() {
		var now = document.getElementById("CalenderTable").getElementsByClassName("now");
		var i = 0,
			nowLenth = now.length;

		for(; i < nowLenth; i++) {
			var AllClass = now[i].className;
			var AllClassArry = AllClass.split(" ");
			// AllClassArry.remove("now")
			var NewClass = "";
			var j = 0,
				AllClassArrylength = AllClassArry.length;
			for(; j < AllClassArrylength; j++) {
				if(AllClassArry[j] !== "now")
					NewClass = NewClass + " " + AllClassArry[j];
			}

			//console.log(NewClass);
			now[i].className = NewClass;
		}

	}
	DateControl.prototype.ShowDaily = function() {
		//事件信息加载
		var activeDate = document.getElementsByClassName("now")[0];
		var AllDaily = document.getElementsByClassName("Allhave");

		if(activeDate != null) {
			var getId = activeDate.textContent;

			var oDiv = document.getElementById(getId);
			for(var i = 0; i < AllDaily.length; i++) {
				AllDaily[i].style.display = 'none';
			}
			if(oDiv != null) {

				oDiv.style.display = 'block';
			}
		}
	}

	//获取有信息的日期，进行样式的增加
	DateControl.prototype.getHaveDay = function(haveInnerHtml, InnerHtml, haveDate) {
		var x = this.setting.haveDateIndex,
			haveDayLen = haveDate.length;
		//haveDate没有数据的时候不进入循环，则需要直接返回InnerHtml
		var getHtml = InnerHtml;
		var selectButton = document.getElementById("select-button");
		for(; x < haveDayLen; x++) {
			if(this.setting.day.toString() === haveDate[x]) {
				getHtml = haveInnerHtml;
				var newElem = document.createElement("div");
				newElem.id = this.setting.day.toString();
				newElem.className = "Allhave";
				newElem.style.display = 'none';
				selectButton.previousElementSibling.insertAdjacentElement("afterend", newElem);
				var newElemP = document.createElement("p");
				newElemP.textContent = "这是一个客户拜访"+x
				newElem.appendChild(newElemP);

				//newElem.innerHTML = "这是一个客户拜访" + x;
				//daily.appendChild(newElem);
				while(haveDate[++x] === this.setting.day.toString()) {
					var newElemP = document.createElement("p");
					newElemP.textContent = "这是一个客户拜访"+x
					newElem.appendChild(newElemP);
				}
				//下次循环的时候从haveDateIndex开始循环，减少循环次数
				this.setting.haveDateIndex = x - 1;
				//alert(haveDateIndex);
				break;
			} else {
				getHtml = InnerHtml;

			}

		}
		return getHtml;

	}

	DateControl.prototype.getDate = function() {

		document.getElementById("title").textContent = this.setting.nowDay.getFullYear() + "年" + (this.setting.nowDay.getMonth() + 1) + "月";

		var month = this.setting.nowDay.getMonth();
		var year = this.setting.nowDay.getFullYear();
		var week = this.setting.nowDay.getDay();
		var nowDate = new Date();
		var monthAllDay = new Date(year, month + 1, 0);
		var monthStart = new Date(year, month, 1);
		var isOtherMonth = false;
		var haveDate = new Array();
		var z = 0,
			haveDateLen = this.setting.YearArray.length;
		for(; z < haveDateLen; z++) {
			if(this.setting.YearArray[z] === year.toString()) {
				if(this.setting.MonthArray[z] === (month + 1).toString()) {
					haveDate.push(this.setting.DayArray[z]);
				}
			}
		}
		//alert(this.setting.YearArray);
		//alert(this.setting.MonthArray);
		//alert(haveDate);
		//七列信息自动增长
		for(var j = 0; j < 6; j++) { //日历每个界面总共有6行
			//一行信息自动增长
			var innerHtml = "";
			var tr = document.createElement("tr");
			var flage = "";
			//console.log(getDay)
			for(var i = 0; i < 7; i++) { //日历每个界面总共有七列
				if(this.setting.getDayFlage < monthStart.getDay()) { //判断是否上个月
					if(i == 0 || i == 6) { //是否为周末
						innerHtml = '<td class="week otherMonth">' + new Date(year, month, this.setting.getDayFlage - monthStart.getDay() + 1).getDate() + '</td>';
					} else {
						innerHtml = '<td class="otherMonth">' + new Date(year, month, this.setting.getDayFlage - monthStart.getDay() + 1).getDate() + '</td>';
					}

					flage = flage + innerHtml;
					this.setting.getDayFlage++;

				} else {

					if(i == 0 || i == 6) { //是周末
						if(isOtherMonth) { //判断是否为本月
							innerHtml = '<td class="week otherMonth">' + this.setting.day + '</td>';

						} else {

							if(this.setting.day == nowDate.getDate() && nowDate.getMonth() == month) { //判断是否为当天
								//有信息的日期样式
								var haveInnerHtml = '<td class="week now nowMonth"><span class="haveDay"></span>' + this.setting.day + '</td>';
								//无信息的日期样式
								var InnerHtml = '<td class="week now nowMonth">' + this.setting.day + '</td>';
								innerHtml = this.getHaveDay(haveInnerHtml, InnerHtml, haveDate);
							} else {
								var haveInnerHtml = '<td class="week nowMonth"><span class="haveDay"></span>' + this.setting.day + '</td>';
								var InnerHtml = '<td class="week nowMonth">' + this.setting.day + '</td>';
								innerHtml = this.getHaveDay(haveInnerHtml, InnerHtml, haveDate);
							}

						}

					} else { //非周末

						if(isOtherMonth) { //判断是否非本月
							innerHtml = '<td class="otherMonth">' + this.setting.day + '</td>';
						} else {

							if(this.setting.day == nowDate.getDate() && nowDate.getMonth() == month) { //判断是否为当天

								var haveInnerHtml = '<td class="now nowMonth"><span class="haveDay"></span>' + this.setting.day + '</td>';
								var InnerHtml = '<td class="now nowMonth">' + this.setting.day + '</td>';
								innerHtml = this.getHaveDay(haveInnerHtml, InnerHtml, haveDate);
							} else {
								var haveInnerHtml = '<td class="nowMonth"><span class="haveDay"></span>' + this.setting.day + '</td>';
								var InnerHtml = '<td class="nowMonth">' + this.setting.day + '</td>';
								innerHtml = this.getHaveDay(haveInnerHtml, InnerHtml, haveDate);

							}

						}

					}

					flage = flage + innerHtml;

					if(++this.setting.day > monthAllDay.getDate()) {
						//console.log(this.setting.StartDay);
						this.setting.day = 1;
						month++;
						monthAllDay = new Date(year, month + 1, 0);
						isOtherMonth = true;
						//console.log(this.setting.StartDay);

					}
				}

			}

			tr.innerHTML = flage;
			this.setting.tBody[0].appendChild(tr);
		}

	}

}