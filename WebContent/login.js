/**
 *
 */
function executeAjax(){

	//パスワードボタンクリック時、password_button関数利用
	$("#js-login-button").click(password_button);
}

$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

});

function password_button(){
	console.log("ログインボタンを押しました。");



	var empnum = $('#js-login-empnum').val();
	console.log(empnum);

	var password = $('#js-login-password').val();
	console.log(password);


	var rq = {emp:empnum,
			pass:password};

	$.ajax({
		Type : 'GET',
		url : '/Employee_info/LoginServlet',//サーブレットを確認
		dataType : 'json',
		data : rq,

		success : function(pw) {
			console.log(pw);

			if(pw === 'ログイン不正'){
			console.log('ログインできません')
			window.location.href='./NotLogin.html';
			}else {
				console.log('LoginServletから帰ってきた')
				window.location.href='./Employee_info.html';
			};

		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました__login.js');
			console.log(errorThrown)
		}
	});
}



