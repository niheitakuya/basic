
var result  = null;
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
//            if(paramValue == null){
//            	paramValue = 'a';
//            }
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
	 param = GetQueryString();//{id: "EMP0001", name: "tanaka",age:"10"}
//   target = document.getElementById("param");
//   target.innerHTML = param["q"];
	 console.log('paramは'+param.retirementdate);

	 $('#js-edit_q').append('<input type="text" name="name1" id = "js-edit-qq" value = "'+param.q+'">');
	 $('#js-edit_name').append('<input type="text" name="name" value = "'+param.name+'">');
	 $('#js-edit_age').append('<input type="text" name="name" value = "'+param.age+'">');
	 $('#js-edit_postcode').append('<input type="text" name="name" value = "'+param.postcode+'">');
	 $('#js-edit_address').append('<input type="text" name="name" value = "'+param.address+'">');
	 $('#js-edit_startdate').append('<input type="text" name="name" value = "'+param.startdate+'">');

	 var value = $('#js-edit_retirementdate').val();
	 if(value == undefined){
		 $('#js-edit_retirementdate').append('<input type="text" name="name" value ="'+ +'">');
	 }else{
		 $('#js-edit_retirementdate').append('<input type="text" name="name" value = "'+param.retirementdate+'">');
	 }

	 var pref = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
			 "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
			 "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
			 "静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
			 "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
			 "徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
			 "熊本県","大分県","宮崎県","鹿児島県","沖縄県"
			 ];

	 for (var i  = 0;i<pref.length;i++){
			$('#js-edit_pref').append('<option value="'+pref[i]+'">'+pref[i]+'</option>');
		};

	 $("#js-edit_button").click(edit_button);

});


var edit_button = function(){
	console.log('編集ボタンを押しました');

	//Ajaxを以下に書く
	//param = GetQueryString();
	//console.log(param);//連想配列として表示

//	const t1 = document.name1.value;
//	console.log(t1);



	 var a =$('#js-edit_qq').val();
	 console.log(a);

	 var input_message = document.getElementById('js-edit_q').value;
	 console.log(input_message);



};
