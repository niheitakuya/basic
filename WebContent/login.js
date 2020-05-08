/**
 *
 */
function executeAjax(){

	//パスワードボタンクリック時、password_button関数利用
	$("#js-login-button").click(password_button);
}

$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

});

function password_button(){
	console.log("ログインボタンを押しました。");



	var empnum = $('#js-login-empnum').val();
	console.log(empnum);

	var password = $('#js-login-password').val();
	console.log(password);


	var rq = {emp:empnum,
			pass:password};



	$.ajax({
		Type : 'GET',
		url : '/Employee_info/login_Servlet',//サーブレットを確認
		dataType : 'json',
		data : rq,

		success : function(pw) {


			console.log('前:'+pw);//コンソールでは、後[object Object]となるのか？
			console.log(pw);//連想配列の中身確認


			console.log('--------------');

			for(var i = 0;i<pw.length; i++){
				pwemp = pw[i];
				console.log('for文内'+pwemp.empName);

				var edit ='<td><input type="button"value="'+pwemp.empId+'" class = "js-edit-button" onclick = "deleteEdit(this)" >編集</input></td>'
				var del= ' <td><input type="button" value="'+pwemp.empId+'" class = "js-delete-button" onclick = "deleteEmp(this)"  >削除</input></td>'

				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');

				console.log('for文内'+pwemp.empId);
			}


			var pwemp1 = pw[0];//配列のインデックスを指定する必要がある。
			console.log(pwemp1);
			console.log(pwemp1.empId);

			window.location.href = "./Employee_info.html?ID="+
														pwemp.empId+
														"name="+
														pwemp.empName;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました__Employee_info.js');
			console.log(errorThrown)
		}
	});
}



