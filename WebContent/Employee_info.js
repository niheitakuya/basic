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

			// $('#hobbyTable').append('<tr>'+'<td>'+pwhobby.hobbyCategory+'</td>'+'</tr>');
		 	// $('#hobbyTable').append('<td>'+pwhobby.hobby+'</td>'+'</tr>');
				//$('#hobbyTable').append('<td>'+i+1+'</td>');
				$('#empTable').append('<tr>'+'<td>'+(i+1)+'</td>'+'<td>'+'ああああ'+'</td>'+ '<td>'+'いいいいい'+'</td>'+ '</tr>');

				//$('#hobbyTable').append('<tr>'+'</tr>');


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

$(document).ready(function () {
	'use strict';

	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);

});