/**
 *
 */

/**
 *
 */
var deleteEmp = function(){
	'use strict';
	$.ajax({
		Type : 'GET',
		url : '/Employee_info/DatabaseTest5',//サーブレットを確認
		dataType : 'json',
		success : function(pw) {
			console.log(pw);

			//$('#empTable').empty();
			for(var i = 0;i<pw.length; i++){
				var pwemp = pw[i];
				var edit ='<td><input type="button">編集</input></td>'
				var del= ' <td><input type="button" class = "js-delete-button" >削除</inuput></td>'
				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');
				}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}//var deleteEmp = functionの最後

$(document).ready(function () {
	'use strict';
	$('.js-delete-button').click(deleteEmp);
});

