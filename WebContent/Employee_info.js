// AjaxでJSONを取得する
function executeAjax () {
	'use strict';

	// ?以降のパラメータを取得
	// 今回で言うとhttp://localhost:8080/wt1/hobby.html?q=0001でいう0001が取得される
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	parameter = parameter.split('=')[1];

	// --------------- TODO 編集ここから---------------
	var requestQuery = {
		shainId : parameter
	};
	$.ajax({
		Type : 'GET',
		url : '/Employee_info/a',//サーブレットを確認
		dataType : 'json',
		data : requestQuery,
		success : function(pw) {
			console.log(pw);

			for(var i = 0;i<pw.length; i++){
				var pwemp = pw[i];
				var edit ='<td><input type="button">編集</input></td>'
				var del= ' <td><input type="button" class = "js-delete-button" onclick ="deleteEmp()"  >削除</input></td>'
				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
	// ---------------ここまで---------------
}


function test(){
	console.log('a');
}

//var deleteEmp = function(){
	function deleteEmp(){
		console.log('ab');
'use strict';
	$.ajax({
		Type : 'GET',
		url : '/Employee_info/DatabaseTest5',//サーブレットを確認
		dataType : 'json',
		//data : requestQuery,
		success : function(pw) {
			console.log(pw);

			//$('#empTable').empty();
			for(var i = 0;i<pw.length; i++){
				var pwemp = pw[i];
				var edit ='<td><button type="button"   >編集</button></td>'
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



$(document).ready(function () {
	'use strict';

	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);

});


//---------------ここから削除機能---------------
//var deleteEmp = function(){
//	'use strict';
//	cconsole.log('aaaa');
//
//
//	$.ajax({
//		Type : 'GET',
//		url : '/Employee_info/DatabaseTest5',//サーブレットを確認
//		dataType : 'json',
//		data : requestQuery,
//		success : function(pw) {
//			console.log(pw);
//
//			for(var i = 0;i<pw.length; i++){
//				var pwemp = pw[i];
//				var edit ='<td><button type="button"   >編集</button></td>'
//				var del= ' <td><button type="button" class = "js-delete-button" >削除</button></td>'
//				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');
//				}
//
//		},
//		error : function(XMLHttpRequest, textStatus, errorThrown) {
//			// サーバーとの通信に失敗した時の処理
//			alert('データの通信に失敗しました');
//			console.log(errorThrown)
//		}
//	});
//}//var deleteEmp = functionの最後
//
//$(document).ready(function () {
//	'use strict';
//
//	$('.js-delete-button').click(deleteEmp);
//});
//
//
//
//
//
//
//
//
