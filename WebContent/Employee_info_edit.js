

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
	 param = GetQueryString();//{q: "EMP0001", name: "tanaka",age:"10"}
//   target = document.getElementById("param");
//   target.innerHTML = param["q"];Retirementdate


	 $('#js-edit_q').append('<input type="text" name="name1" id = "js-edit-qq" value = "'+param.q+'">');
	 //consle.log(param.q);
	 $('#js-edit_name').append('<input type="text" name="name" id = "js-edit-namename"  value = "'+param.name+'">');
	 $('#js-edit_age').append('<input type="text" name="name" id = "js-edit-ageage"    value = "'+param.age+'">');
	//性別
	 $('#js-edit_sex').append('<input type="radio" name="gender" id = "js-edit-sexsex" value ="男性">男性');
	 $('#js-edit_sex').append('<input type="radio" name="gender" id = "js-edit-sexsex" value ="女性">女性');

	 $('#js-edit_postcode').append('<input type="text" name="name" id = "js-edit-postcodepostcode"  value = "'+param.postcode+'">');
	 //都道府県


	 $('#js-edit_address').append('<input type="text" name="name" id = "js-edit-addressaddress" value = "'+param.address+'">');

	 //部署
	 $('#js-edit_depatment').append('<option  value="D01">総務部</option>');
	 $('#js-edit_depatment').append('<option  value="D02">営業部</option>');
	 $('#js-edit_depatment').append('<option  value="D03">研究開発部</option>');


	 $('#js-edit_startdate').append('<input type="text" name="name" id = "js-edit-startdatestartdate"  value = "'+param.startdate+'">');
	 $('#js-edit_retirementdate').append('<input type="text" name="name"  id = "js-edit-retirementdateretirementdate"      value = "'+param.Retirementdate+'">');


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
		$("#js-edit_button").click(edit_button);
});


var edit_button = function(){
	// console.log('paramは旧ID：'+param.id);
	// var a = GetQueryString();
	// console.log('paramは旧ID：'+a);
	 param = GetQueryString();//{q: "EMP0001", name: "tanaka",age:"10"}
	 var oldID = param.q;

	console.log('設定ボタンを押しました');
	console.log('param:'+param);
	 console.log(param);

	console.log('旧ID：'+oldID);


	//Ajaxを以下に書く
	//param = GetQueryString();
	//console.log(param);//連想配列として表示

//	const t1 = document.name1.value;
//	console.log(t1);


//
	 var editq =$('#js-edit-qq').val();  //id
	 console.log(editq);

	 var editname =$('#js-edit-namename').val();//名前
	 console.log(editname);

	 var editage =$('#js-edit-ageage').val();//年齢
	 console.log(editage);

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



	 // var input_message = document.getElementById('js-edit_qq').value;
	 //console.log(input_message);

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
			 	Retirementdate:editRetirementdate,
			 	oldid:oldID
			};

			$.ajax({
				Type : 'GET',
				url : '/Employee_info/Employee_info_edit2_Servlet',  //サーブレットを確認
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

};
