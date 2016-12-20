function createContactTable(db) {
	db.transaction(function(tx) {
		tx.executeSql(
			"create table if not exists Contact (contactName TEXT, sex TEXT, department TEXT, positions TEXT, tel TEXT, phone TEXT, eMail TEXT, birthday TEXT, hobby TEXT, remark TEXT)", [],
			function(tx, result) {
				console.log('创建customer表成功');
				
			},
			function(tx, error) {
				console.log('创建customer表失败:' + error.message);
			});
	});
}

function InsertContact(db, Contact) {
	db.transaction(function(tx) {
		var index;
		var newIndex;
		tx.executeSql(
			"Insert into Contact values (?,?,?,?,?,?,?,?,?,?)", [Contact.contactName, Contact.sex, Contact.department, Contact.positions, Contact.tel, Contact.phone, Contact.eMail, Contact.birthday, Contact.hobby, Contact.remark],
			function(tx, result) {				
             	console.log('插入成功');	
         
			},
			function(tx, error) {
				alert("添加失败");
				
				console.log('插入失败' + error.message);
				
			});
	});
}

function deleteContact(db, id) {
	db.transaction(function(tx) {
		tx.executeSql(
			"Delete from Contact where rowid = ?", [id],
			function(tx, result) {
				console.log('删除成功');
			},
			function(tx, error) {
				console.log('删除失败' + error.message);
			});
	});
}

function selectContactName(db) {
	db.transaction(function(tx) {
		tx.executeSql(
			"select contactName,rowid,phone from Contact", [],
			function(tx, result) {
				if(result.rows.length != 0) {
					for(var i = 0; i < result.rows.length; i++) {
						var Inner = "";
						if(result.rows.item(i).phone.length>0){ 
							Inner = '<li class="mui-table-view-cell">' +
							'<div class="mui-slider-right mui-disabled">' +
							'<a class="mui-btn mui-btn-red">删除</a></div>' +
							'<div class="mui-slider-handle">' + result.rows.item(i).contactName + '<a class="mui-icon mui-icon-phone mui-pull-right"></a></div><label>' +  result.rows.item(i).rowid + '</label></li>';
							
						}else{
							 Inner = '<li class="mui-table-view-cell">' +
							'<div class="mui-slider-right mui-disabled">' +
							'<a class="mui-btn mui-btn-red">删除</a></div>' +
							'<div class="mui-slider-handle">' + result.rows.item(i).contactName + '</div><label>' +  result.rows.item(i).rowid + '</label></li>';
						}
                          
						$("#ContactList").append(Inner);//把姓名显示在页面上
					}
				}
               
				console.log('读取成功');
			},
			function(tx, error) {
				console.log('读取失败' + error.message);
			});
	});
}

function getIndex(){
	var index = localStorage.getItem("index");
	if(index==null){
		localStorage.setItem("index","1");
		return "1";
	}
	return index;
}


function selectFromId(db,id){
	db.transaction(function(tx) {
		tx.executeSql(
			"select * from Contact where rowid = ?", [id],
			function(tx, result) {
				if(result.rows.length != 0) {
					
					$("#Username").val(result.rows.item(0).contactName);
					var sex = result.rows.item(0).sex;
					if(sex=="1"){
						$("input[value='1']").prop("checked",true);
					}else if(sex=="2"){
						$("input[value='2']").prop("checked",true);
					}
					$("#department").val(result.rows.item(0).department);
					$("#positions").val(result.rows.item(0).positions);
					$("#tel").val(result.rows.item(0).tel);
					$("#phone").val(result.rows.item(0).phone);
					$("#eMail").val(result.rows.item(0).eMail);
					$("#birthday").val(result.rows.item(0).birthday);
					$("#hobby").val(result.rows.item(0).hobby);
					$("#remark").val(result.rows.item(0).remark);
					
              }
				console.log('读取成功');
			},
			function(tx, error) {
				console.log('读取失败' + error.message);
			});
	});
}

function updateContact(db,Contact){
	db.transaction(function(tx) {
		var index;
		var newIndex;
		tx.executeSql(		                                                                                              
			"update Contact set contactName = ?,sex = ?, department = ?, positions = ?, tel = ?, phone = ?, eMail = ?, birthday = ?, hobby = ?, remark = ? where rowid = ?",
			[Contact.contactName, Contact.sex, Contact.department, Contact.positions, Contact.tel, Contact.phone, Contact.eMail, Contact.birthday, Contact.hobby, Contact.remark, Contact.id],
			function(tx, result) {	
				//console.log(Contact.eMail);
             	console.log('修改成功');	
         
			},
			function(tx, error) {
				
				console.log('修改失败' + error.message);
				
			});
	});
}


function DropContact(db){
	db.transaction(function(tx){
					tx.executeSql("drop table Contact",[],function(tx,rs){
						console.log("删除成功");
					},function(){
						console.log("删除失败");
					})
				});
}
