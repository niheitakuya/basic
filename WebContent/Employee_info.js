

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
		url : '/Employee_info/a',  //サーブレットを確認
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
				 console.log('for文内あ'+pwemp.empName);

				var edit ='<td><input type="button"value="'+pwemp.empId+'" class = "js-edit-button" onclick = "deleteEdit(this)" >編集</input></td>'
				var del= ' <td><input type="button" value="'+pwemp.empId+'" class = "js-delete-button" onclick = "deleteEmp(this)"  >削除</input></td>'
				//???これがなぜエラーなのか→var del= ' <td><input type="button" value="削除" class = "js-delete-button" onclick = "deleteEmp('+pwemp.empId+')  >削除</input></td>'

				$('#empTable').append('<tr>'+'<td>'+pwemp.empId+'</td>'+'<td>'+pwemp.empName+'</td>'+edit +del+'</tr>');

				console.log('for文内い'+pwemp.empId);
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
			console.log('deleteEmpのajax:'+ pw);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました__Employee_info.js');
			console.log(errorThrown)
		}
	});
}//var deleteEmp = functionの最後


	function deleteEdit(i){
		var f =$(i).val();
		console.log("deleteEmpのなか"+i);
		console.log("deleteEmpのなかf"+f);


		var rq = {rgp:f}//ここからサーブレットに渡す
		console.log("var rqは"+f);
		'use strict';
		$.ajax({
			Type : 'GET',
			url : '/Employee_info/Employee_info_edit_Servlet',//サーブレットを確認
			dataType : 'json',
			data : rq,

			success : function(pw) {


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

															//編集ページへ移動
															//window.location.href = "./Employee_info_edit.html?q="+pwemp1.empId;//編集ページへ移動

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				// サーバーとの通信に失敗した時の処理
				alert('データの通信に失敗しました__Employee_info.js');
				console.log(errorThrown)
			}
		});
	}//var deleteEdit = functionの最後



	$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

});
