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
				var del= ' <td><input type="button" value="'+pwDepartment.departname+'" class = "js-delete-button" onclick = "deleteDepartment(this)"  >削除</input></td>'
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
function deleteDepartment(){

}


//削除用関数
function deleteDepartment(i){
	console.log(i);
	}






$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();
});
