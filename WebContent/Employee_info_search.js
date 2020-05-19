/**
 *
 */

$(document).ready(function () {
	'use strict';
	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
	$('#js-serchButton').click(serchButton);
});


var serchButton = function(){
	console.log('ボタンを押しました');
	var ID = $('#js-id').val();
	var name = $('#js-name').val();
	var department = $('#department').val();
	console.log(ID);
	console.log(name);
	console.log(department);

	var requestQuery = {
		ID : ID,
		name:name,
		department:department
	};

	$.ajax({
		Type : 'GET',
		url : '/Employee_info/abb',//サーブレットを確認
		dataType : 'json',
		data : requestQuery,
		
		success : function(pw) {
			console.log(pw);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});

}
