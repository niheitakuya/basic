/**
 *
 */

$(document).ready(function () {
	$('#js-edit_departmentID').append('<input type="text" name="name1" id = "js-edit_departmentIDID" value = "" >');
	$('#js-edit_departmentName').append('<input type="text" name="name" id = "js-edit_departmentNameName"  value = "">');


	//編集ボタンクリック時、edit_button関数利用
	$("#js-newadd").click(edit_button);


});


var edit_button = function(){
	console.log('編集ボタンを押しました');

	var departmentID = $('#js-edit_departmentIDID').val();
	console.log(departmentID);

	var departmentName = $('#js-edit_departmentNameName').val();
	console.log(departmentName);

	var requestQuery = {
		 	ID:departmentID,
		 	name:departmentName
		 	};

 			console.log(requestQuery);

		$.ajax({
			Type : 'GET',
			url : '/Employee_info/Department_info_newadd_Servlet',  //サーブレットを確認
			dataType : 'json',
			data : requestQuery,

			success : function() {

				//console.log(pw);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				// サーバーとの通信に失敗した時の処理
				alert('データの通信に失敗しましたaa');
				console.log(errorThrown)
			}
		});


}
