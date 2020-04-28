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
			console.log('前'+pw);
			var pwemp = null;

			console.log('後'+pw);
			console.log(pwemp);

			for(var i = 0;i<pw.length; i++){
				 pwemp = pw[i];
				 console.log('for文内'+pwemp.empName);

				var edit ='<td><input type="button">編集</input></td>'
				var del= ' <td><input type="button" value="'+pwemp.empId+'" class = "js-delete-button" onclick = "deleteEmp(this)"  >削除</input></td>'
			//???	var del= ' <td><input type="button" value="削除" class = "js-delete-button" onclick = "deleteEmp('+pwemp.empId+')  >削除</input></td>'

				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');


				//	var tmp = document.getElementsByClassName("js-delete-button");
			//	var moji = "testID";
			//	tmp.setAttribute("id","moji"+i);

				console.log('for文内'+pwemp.empId);
				//console.log(input[i]);
			}
			//console.log(pwemp.empId);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
	// ---------------ここまで---------------
}


//function test(){
//	console.log('a');
//}


	function deleteEmp(i){
		var f =$(i).val();
		console.log("deleteEmpのなか"+i);
		console.log("deleteEmpのなかf"+f);


		var rq = {rgp:f}//ここからサーブレットに渡す
		console.log("var rqは"+f);

		'use strict';
	$.ajax({
		Type : 'GET',
		url : '/Employee_info/DatabaseTest5',//サーブレットを確認
		dataType : 'json',
		data : rq,

		success : function(pw) {
			console.log('deleteEmpのajax'+pw);


			//$('#empTable').empty();
//			for(var i = 0;i<pw.length; i++){
//				var pwemp = pw[i];
//				console.log(pwemp);
//				var edit ='<td><button type="button"   >編集</button></td>'
//				var del= ' <td><input type="button" class = "js-delete-button" >削除</inuput></td>'
//				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');
//				}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました__Employee_info.js');
			console.log(errorThrown)
		}
	});
}//var deleteEmp = functionの最後

//$(document).ready(function () {
//	'use strict';
//	$('.js-delete-button').click(deleteEmp);
//});



$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

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
