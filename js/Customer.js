function sortPY(username) {
	var a = new Array();
	var b = new Array();
	var c = new Array();
	var d = new Array();
	var e = new Array();
	var f = new Array();
	var g = new Array();
	var h = new Array();
	var i = new Array();
	var j = new Array();
	var k = new Array();
	var l = new Array();
	var m = new Array();
	var n = new Array();
	var o = new Array();
	var p = new Array();
	var q = new Array();
	var r = new Array();
	var s = new Array();
	var t = new Array();
	var u = new Array();
	var v = new Array();
	var w = new Array();
	var x = new Array();
	var y = new Array();
	var z = new Array();
	var other = new Array();
	for(var index = 0; index < username.length; index++) {
		var str = makePy(username[index]);

		var result = str[0].charAt(0);

		switch(result) {
			case "a":
			case "A":
				a.push(username[index]);
				break;
			case "b":
			case "B":
				b.push(username[index]);
				break;
			case "c":
			case "C":
				c.push(username[index]);
				break;
			case "d":
			case "D":
				d.push(username[index]);
				break;
			case "e":
			case "E":
				e.push(username[index]);
				break;
			case "f":
			case "F":
				f.push(username[index]);
				break;
			case "g":
			case "G":
				g.push(username[index]);
				break;
			case "h":
			case "H":
				h.push(username[index]);
				break;
			case "i":
			case "I":
				i.push(username[index]);
				break;
			case "j":
			case "J":
				j.push(username[index]);
				break;
			case "k":
			case "K":
				k.push(username[index]);
				break;
			case "l":
			case "L":
				l.push(username[index]);
				break;
			case "m":
			case "M":
				m.push(username[index]);
				break;
			case "n":
			case "N":
				n.push(username[index]);
				break;
			case "o":
			case "O":
				o.push(username[index]);
				break;
			case "p":
			case "P":
				p.push(username[index]);
				break;
			case "q":
			case "Q":
				q.push(username[index]);
				break;
			case "r":
			case "R":
				r.push(username[index]);
				break;
			case "s":
			case "S":
				s.push(username[index]);
				break;
			case "t":
			case "T":
				t.push(username[index]);
				break;
			case "u":
			case "U":
				u.push(username[index]);
				break;
			case "v":
			case "V":
				v.push(username[index]);
				break;
			case "w":
			case "W":
				w.push(username[index]);
				break;
			case "x":
			case "X":
				x.push(username[index]);
				break;
			case "y":
			case "Y":
				y.push(username[index]);
				break;
			case "z":
			case "Z":
				z.push(username[index]);
				break;
			default:
				other.push(username[index]);
				break;
		}
	}
	var linkList = new LinkedList();
	linkList.add(other);
	linkList.add(a);
	linkList.add(b);
	linkList.add(c);
	linkList.add(d);
	linkList.add(e);
	linkList.add(f);
	linkList.add(g);
	linkList.add(h);
	linkList.add(i);
	linkList.add(j);
	linkList.add(k);
	linkList.add(l);
	linkList.add(m);
	linkList.add(n);
	linkList.add(o);
	linkList.add(p);
	linkList.add(q);
	linkList.add(r);
	linkList.add(s);
	linkList.add(t);
	linkList.add(u);
	linkList.add(v);
	linkList.add(w);
	linkList.add(x);
	linkList.add(y);
	linkList.add(z);

	return linkList;

}
//单链表节点
function Entry(next, data) {
	this.next = next;
	this.data = data;
}
//链表
function LinkedList() {
	var length = 0;
	this.head = new Entry(null, null);
	this.end = new Entry(null, null);
	this.add = function(data) {
		var newentry = new Entry(null, data);
		if(this.head.data) {
			this.end.next = newentry;
			this.end = newentry;
		} else {
			this.head = newentry;
			this.end = newentry;
		}
		length += 1;
	};
	this.show = function() {
		var temp = this.head;
		for(; temp != null; temp = temp.next) {
			console.log(temp.data);
		}
	};
	this.size = function() {
		return length;
	};
	this.getVal = function(index) {
		var current;
		current = this.head;
		if(index > 0 || index < length) {
			for(var i = 0; i < index; i++) {
				current = current.next;
			}
		} else if(index >= length || index < 0) {
			return;
		}
		return current;
	};
}

function getDB() {
	if(window.localStorage) {
		var db = openDatabase("yixingxiao", "1.0", "it's to save data !", 1024 * 1024);
		return db;
	} else {
		alert('This browser does NOT support localStorage');
		return ;
	}

}

function createTable(dataBase) {
	dataBase.transaction(function(tx) {
		tx.executeSql(
			"create table if not exists customer (id REAL UNIQUE, name TEXT)", [],
			function(tx, result) {
				console.log('创建customer表成功');
			},
			function(tx, error) {
				console.log('创建customer表失败:' + error.message);
			});
	});
}

function createPTable(dataBase) {
	dataBase.transaction(function(tx) {
		tx.executeSql(
			"create table if not exists Pcustomer (id REAL UNIQUE, name TEXT)", [],
			function(tx, result) {
				console.log('创建Pcustomer表成功');
			},
			function(tx, error) {
				console.log('创建Pcustomer表失败:' + error.message);
			});
	});
}

function getCustomer(dataBase) {
	dataBase.transaction(function(tx) {
		tx.executeSql("select * from customer", [],
			function(tx, result) {
				//var username = ["赵丽颖", "李易峰", "陈伟霆", "王者荣耀", "Angularjs", "beats", "成昆", "赵小刀", "1111风云", "Lol", "helloworld", "五杀", "团灭", "发型",
				//	"姓名大全", "分类", "一亿个多", "勇士", "惨淡", "请于", "终于", "重于", "人生", "编程", "Google", "Claire", "hellow", "卢兰", "牛腩", "陆运", "丰田", "北京", "上海", "太平", "跳转", "运行", "工具", "面试", "帮助", "试图", "开发", "赣州", "上官云", "临客", "天下大同", "不屈不挠", "勇往直前", "电灯", "手机", "iphone", "323", "123ddd", "444", "1233aa", "1233xxx", "444fff", "baby", "文件"
				//];
				var username = new Array();
				var LinkList = new LinkedList();
				if(result.rows.length != 0) {
					for(var index = 0; index < result.rows.length; index++) {
						username[index] = result.rows.item(index).name;
						//console.log(result.rows.item(index));		
					}
				} else {
					//console.log("没有任何客户资料");
				}
				LinkList = sortPY(username);
				//LinkList.show();
				createLi(LinkList);
			},
			function() {
				console.log("查询失败")
			}

		);
	})
}

function getPcustomer(dataBase) {
	dataBase.transaction(function(tx) {
		tx.executeSql("select * from Pcustomer", [],
			function(tx, result) {
				var username = ["王者荣耀", "Angularjs", "beats", "成昆", "赵小刀", "1111风云", "Lol", "helloworld", "五杀", "团灭", "发型", "文件"];
				var username = new Array();
			var LinkList = new LinkedList();
				if(result.rows.length != 0) {
					for(var index = 0; index < result.rows.length; index++) {
						username[index] = result.rows.item(index).name;
						console.log(result.rows.item(index).name);
					}
				} else {
					console.log("没有任何客户资料"); 
				}
				LinkList = sortPY(username);
				//LinkList.show();
				createLi(LinkList);
			},
			function() {
				console.log("查询失败")
			}

		);
	})
}

function addPCustomer(dataBase,Cusname) { 
	alert(Cusname);
//	dataBase.transaction(function(tx) {
//		tx.executeSql("Insert into Pcustomer values (?,?)",["4",Cusname],function(tx,rs){ 
//			console.log("保存数据成功");
//		},function(tx,error){
//			console.log("error messages"+error.message);
//		})
//	});
}

function createLi(linkList) {
	var word = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	for(var index = 0; index < linkList.size(); index++) {
		var data = linkList.getVal(index).data;
		if(data.length != 0) {
			$("#nav").append("<a>" + word[index] + "</a>")
			for(var zindex = 0; zindex < data.length; zindex++) {
				if(zindex == 0) {
					$(".mui-table-view").append('<li class="mui-table-view-cell firstBlood">' +
						'<div class="UserName"><p>' + data[zindex] + '</p></div><div class="mui-pull-right xian">' +
						'<img class="mui-pull-left" id="Imgl" src="../img/jian.png" /></div></li>');
				} else {
					$(".mui-table-view").append('<li class="mui-table-view-cell">' +
						'<div class="UserName"><p>' + data[zindex] + '</p></div><div class="mui-pull-right xian">' +
						'<img class="mui-pull-left" id="Imgl" src="../img/jian.png" /></div></li>');
				}

			}
		}

	}

}

function getMask() {
	var mask = mui.createMask();
	mask.show();
}