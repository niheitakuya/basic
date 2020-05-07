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
			console.log(pw);

			var pwemp = null;
			console.log(pwemp);

			for(var i = 0;i<pw.length; i++){
				pwemp = pw[i];
				console.log('for文内あ'+pwemp.empName);

				var edit ='<td><input type="button"value="'+pwemp.empId+'" class = "js-edit-button" onclick = "deleteEdit(this)" >編集</input></td>'
				var del= ' <td><input type="button" value="'+pwemp.empId+'" class = "js-delete-button" onclick = "deleteEmp(this)"  >削除</input></td>'
				//???これがなぜエラーなのか→var del= ' <td><input type="button" value="削除" class = "js-delete-button" onclick = "deleteEmp('+pwemp.empId+')  >削除</input></td>'

				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');

				console.log('for文内い'+pwemp.empId);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});//ここまでAjax
}



$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();
});
