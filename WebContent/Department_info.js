/**
 *
 */

function executeAjax () {
	'use strict';

	$.ajax({
		Type : 'GET',
		url : '/Employee_info/Department_info',  //URLを作成、サーブレットを確認
		dataType : 'json',

		success : function(pw) {
			console.log('返却された:'+pw);
			console.log(pw);

			var pwDepartment = null;

			for(var i = 0;i<pw.length; i++){
				pwDepartment = pw[i];
				console.log('for文内:'+pwDepartment.departmentId);
				console.log('for文内:'+pwDepartment.departname);

				var edit ='<td><input type="button"value="'+pwDepartment.departmentId+'" class = "js-edit-button" onclick = "editDepartment(this)" >編集</input></td>'
				var del= ' <td><input type="button" value="'+pwDepartment.departmentId+'" class = "js-delete-button" onclick = "deleteDepartment(this)"  >削除</input></td>'
				//var del= ' <td><input type="button" value="削除" class = "js-delete-button" onclick = "deleteEmp('+pwemp.empId+')  >削除</input></td>'
				$('#DepartmentTable').append('<tr>'+'<td>'+pwDepartment.departmentId+'</td>'+'<td>'+pwDepartment.departname+'</td>'+edit +del+'</tr>');
				}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});//ここまでAjax
}

//編集用関数
function editDepartment(i){
	console.log(i);//タグ内取得
	var getDepartmentIdtVal =$(i).val();
	console.log('編集用値取得'+getDepartmentIdtVal);

	var rq = {DepartmentId:getDepartmentIdtVal};
	console.log(rq);


	$.ajax({
		Type : 'GET',
		url : '/Employee_info/Department_info_edit_Servlet',//サーブレットを確認
		dataType : 'json',
		data : rq,

		success : function(pw) {


			console.log('前:'+pw);//コンソールでは、後[object Object]となるのか？
			console.log(pw);//連想配列の中身確認


			console.log('--------------');
			var pwemp1 = pw[0];//配列のインデックスを指定する必要がある。
			console.log(pwemp1);


			console.log(pwemp1.empRetirementdate);

//			window.location.href = "./Employee_info_edit.html?q="
//															+pwemp1.empId
//
//															+"&name="
//															+pwemp1.empName;
////
//
												//編集ページへ移動
														//window.location.href = "./Employee_info_edit.html?q="+pwemp1.empId;//編集ページへ移動
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました__Employee_info.js');
			console.log(errorThrown)
		}
	});
}//var deleteEdit = functionの最後








//削除用関数
function deleteDepartment(i){
	console.log(i);//タグ内取得
	var getDepartmenIdtVal =$(i).val();
	console.log('値取得'+getDepartmenIdtVal);

	var rq = {DepartmenId:getDepartmenIdtVal};
	console.log(rq);

	'use strict';
	$.ajax({
		Type : 'GET',
		url : '/Employee_info/Department_info_delete_Servlet',//サーブレットを確認
		dataType : 'json',
		data : rq,

		success : function(pw) {
			console.log('deleteDepartmentのajax:'+ pw);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました__department_info.js');
			console.log(errorThrown)
		}
	});

}//deleteDepartment関数の最後






$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();
});
