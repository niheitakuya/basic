/**
 *
 */
function GetQueryString() {
    if (1 < document.location.search.length) {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        console.log(document.location.search);
    	var query = document.location.search.substring(1);
        console.log(query);
        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split('&');
        console.log(parameters);
        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[i].split('=');
            console.log('elementは'+element);
            var paramName = decodeURIComponent(element[0]);
            console.log('element[0]は'+paramName);
            var paramValue = decodeURIComponent(element[1]);
           if(paramValue == null){
            	paramValue = 'a';
            }
            console.log('element[1]は'+paramValue);
            // パラメータ名をキーとして連想配列に追加する
            result[paramName] = paramValue;
        }
        //result = {id: "EMP0001", name: "tanaka",age:"10"}
        return result;
    }
    return null;
}




$(document).ready(function () {


	 $('#js-edit_q').append('<input type="text" name="name1" id = "js-edit-qq" value = "" >');
	 $('#js-edit_name').append('<input type="text" name="name" id = "js-edit-namename"  value = "">');
	 $('#js-edit_age').append('<input type="text" name="name" id = "js-edit-ageage"    value = "">');
	//性別
	 $('#js-edit_sex').append('<input type="radio" name="gender" id = "js-edit-sexsex" value ="男性">男性');
	 $('#js-edit_sex').append('<input type="radio" name="gender" id = "js-edit-sexsex" value ="女性">女性');

	 $('#js-edit_postcode').append('<input type="text" name="name" id = "js-edit-postcodepostcode"  value = "">');
	 //都道府県


	 $('#js-edit_address').append('<input type="text" name="name" id = "js-edit-addressaddress" value = "">');

	 //部署
	 $('#js-edit_depatment').append('<option  value="D01">総務部</option>');
	 $('#js-edit_depatment').append('<option  value="D02">営業部</option>');
	 $('#js-edit_depatment').append('<option  value="D03">研究開発部</option>');


	 $('#js-edit_startdate').append('<input type="text" name="name" id = "js-edit-startdatestartdate"  value = "">');
	 $('#js-edit_retirementdate').append('<input type="text" name="name"  id = "js-edit-retirementdateretirementdate"  value = "">');

	 var pref = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
			 "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
			 "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
			 "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
			 "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
			 "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
			 "熊本県","大分県","宮崎県","鹿児島県","沖縄県"
			 ];

	 for ( var i = 0;i<pref.length;i++){
			$('#js-edit_pref').append('<option  id = "js-edit-prefpref  value="'+pref[i]+'">'+pref[i]+'</option>');
		};


		//編集ボタンクリック時、edit_button関数利用
		$("#js-newadd_button").click(edit_button);

});


var edit_button = function(){
	console.log('編集ボタンを押しました');

	 var editq =$('#js-edit-qq').val();  //id
	 console.log(editq);

	 var editname =$('#js-edit-namename').val();//名前
	 console.log(editname);

	 var editage =$('#js-edit-ageage').val();//年齢
	 console.log("年齢"+editage);

	 var editsex = $('input:radio[name="gender"]:checked').val();//性別
	 console.log(editsex);

	 var editpref = $('#js-edit_pref').val();
	 console.log(editpref);

	 var editpostcode =$('#js-edit-postcodepostcode').val();//郵便番号
	 console.log(editpostcode);


	 var editaddress =$('#js-edit-addressaddress').val();//住所
	 console.log(editaddress);

	 var editdepartment =$('#js-edit_depatment').val();//部署
	 console.log(editdepartment);


	 var editstartdate =$('#js-edit-startdatestartdate').val();//入社日
	 console.log(editstartdate);

	 var editRetirementdate =$('#js-edit-retirementdateretirementdate').val();//退社日
	 console.log(editRetirementdate);


	 //Ajaxを書く
	 var requestQuery = {
			 	q:editq,
			 	name:editname,
			 	age:editage,
			 	sex:editsex,
			 	postcode:editpostcode,
			 	pref:editpref,
			 	address:editaddress,
			 	department:editdepartment,
			 	startdate:editstartdate,
			 	retirementdate:editRetirementdate,
			 	};

	 			console.log(requestQuery);
	 			//?q=0001&name=nihei&age=25

			$.ajax({
				Type : 'GET',
				url : '/Employee_info/Employee_info_newadd_Servlet',  //サーブレットを確認
				dataType : 'json',
				data : requestQuery,

				success : function() {
					location.reload();
					//console.log(pw);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しましたaa');
					console.log(errorThrown)
				}
			});

};