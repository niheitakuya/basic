



// AjaxでJSONを取得する
function executeAjax () {
	'use strict';

	$.ajax({
		Type : 'GET',
		url : '/Employee_info/a',  //URLを作成、サーブレットを確認
		dataType : 'json',

		success : function(pw) {
			console.log('success : functionの後');
			console.log(pw);
			console.log("pwは"+pw);

			if(pw === "ログイン前"){
				console.log("a");
				document.location.href = "login.html";
			}

			for(var i = 0;i<pw.length; i++){
				var pwemp = pw[i];
				console.log('for文内_編集ボタン、削除ボタンの前'+pwemp.empName);//挙動の確認のため

				var edit ='<td><input type="button"value="'+pwemp.empId+'" class = "js-edit-button" onclick = "EditEmp(this)" >編集</input></td>'
				var del = ' <td><input type="button" value="'+pwemp.empId+'" class = "js-delete-button" onclick = "DeleteEmp(this)"  >削除</input></td>'
				//var del= ' <td><input type="button" value="削除" class = "js-delete-button" onclick = "deleteEmp('+pwemp.empId+')  >削除</input></td>'

				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');

				console.log('for文内_jqueryの編集ボタン、削除ボタンの後'+pwemp.empId);//挙動の確認のため
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました_Employee_info.js');
			console.log(errorThrown)
		}
	});//ここまでAjax


}//executeAjaxの最後

function EditEmp(i){
		var f =$(i).val();
		console.log("deleteEmpのなか"+i);
		console.log("deleteEmpのなかf"+f);


		var rq = {rgp:f}//ここからサーブレットに渡す
		console.log("var rqは"+f);
		'use strict';

		$.ajax({
			Type : 'GET',
			url : '/Employee_info/Employee_info_edit_Servlet',//サーブレットを確認
		//	url : '/Employee_info/a',//サーブレットを確認

			dataType : 'json',
			data : rq,

			success : function(pw) {


				if(pw === "Memberのため編集できません"){
					console.log(pw);
					//編集ページへ移動
					window.location.href = "./notEdit.html";//編集ページへ移動


				}else{
					console.log('前:'+pw);//コンソールでは、後[object Object]となるのか？
					console.log(pw);//連想配列の中身確認


					console.log('--------------');
					var pwemp1 = pw[0];//配列のインデックスを指定する必要がある。
					console.log(pwemp1);

					window.location.href = "./Employee_info_edit.html?q="
																	+pwemp1.empId

																	+"&name="
																	+pwemp1.empName

																	+"&age="
																	+pwemp1.empAge

																	+"&sex="
																	+pwemp1.empSex

																	+"&postcode="
																	+pwemp1.empPostcode

																	+"&pref="
																	+pwemp1.empPref

																	+"&address="
																	+pwemp1.empAddress

																	+"&department="
																	+pwemp1.empDepartname

																	+"&startdate="
																	+pwemp1.empStartdate

																	+"&Retirementdate="
																	+pwemp1.empRetirementdate
																	;

																}




			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				// サーバーとの通信に失敗した時の処理
				alert('データの通信に失敗しました__Employee_info.js');
				console.log(errorThrown)
			}
		});
	}//deleteEdit関数の最後

function DeleteEmp(i){
	var f =$(i).val();
	console.log("deleteEmpのなかでタグを表示："+i);
	console.log("deleteEmpのなかでタグ内のvalue："+f);


	var rq = {rgp:f}//ここからサーブレットに渡す
	console.log("var rqは"+f);

	'use strict';
$.ajax({
	Type : 'GET',
	url : '/Employee_info/DatabaseTest5',//サーブレットを確認
	dataType : 'json',
	data : rq,

	success : function(pw) {
		console.log(pw);

		console.log('deleteEmpのajax:'+ pw);

		if(pw === "Memberのため削除できません"){
			console.log("aaa");
			window.location.href='./notDel.html';
			console.log("aaa");
		}

		//location.reload();//更新機能
	},
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		// サーバーとの通信に失敗した時の処理
		alert('データの通信に失敗しました__Employee_info.js');
		console.log(errorThrown)
	}
});
}//deleteEmp関数の最後




$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();
	$('#js-logout').click(Logout);

});

function Logout(){
	console.log("ログアウトボタンを押しました");


	$.ajax({
		Type : 'GET',
		url : '/Employee_info/LogoutServlet',  //URLを作成、サーブレットを確認
		dataType : 'json',

		success : function(pw) {
			console.log(pw);
			window.location.href='./login.html';

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました_Employee_info.js');
			console.log(errorThrown)
		}
	});//ここまでAjax

}//Logout関数の最後

