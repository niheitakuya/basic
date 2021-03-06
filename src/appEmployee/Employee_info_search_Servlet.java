package appEmployee;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/abb")
public class Employee_info_search_Servlet extends HttpServlet {

	/********************************************************************************
	 * 以下のdoGet/doPostを実装して下さい。
	 * importなどは自由に行って下さい。
	 * @throws IOException
	 ********************************************************************************/

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException  {
		//文字化け防止
		response.setContentType("text/html; charset=Windows-31J");

		String ID = request.getParameter("ID");
		System.out.println("ID=" + ID);
		String name = request.getParameter("name");
		System.out.println("name=" + name);
		String department = request.getParameter("department");
		System.out.println("shainId=" + department);

		// JDBCドライバの準備
		try {

			// JDBCドライバのロード
			Class.forName("oracle.jdbc.driver.OracleDriver");

		} catch (ClassNotFoundException e) {
			// ドライバが設定されていない場合はエラーになります
			throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}

		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";


		String sql = "select \n" +
				"ei.EMPID , \n" +
				"ei.NAME, \n" +
				"ei.AGE, \n" +
				"ei.SEX, \n" +
				"dk.DEPARTNAME \n" +
				"from \n" +
				"EMP_INFO ei, \n" +
				"DEPART_KBN dk \n" +
				"where 1 =1 \n" +
				"and ei.EMPID = '"+ID+"'  \n" +
				"and ei.NAME = '"+name+"' \n" +
				"and ei.DEPARTID = dk.DEPARTID \n";

		System.out.println(sql);


		//リストの作成
		List <emp> empList =  new ArrayList<>();

		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery(sql);
				) {
			    // SQL実行後の処理内容

			// SQL実行結果を保持している変数rsから商品情報を取得
			// rs.nextは取得した商品情報表に次の行があるとき、trueになります
			// 次の行がないときはfalseになります
			while (rs1.next()) {
				emp e1 = new emp();
				//System.out.println(e1);
				e1.setEmpId(rs1.getString("EMPID"));
				e1.setEmpName(rs1.getString("NAME"));
				e1.setEmpAge(rs1.getString("age"));
				e1.setEmpSex(rs1.getString("sex"));
				e1.setEmpDepartname(rs1.getString("DEPARTNAME"));

				empList.add(e1);
				System.out.println(e1.getEmpId());
				System.out.println(e1.getEmpName());
				System.out.println(e1.getEmpAge());
				System.out.println(e1.getEmpSex());
				System.out.println(e1.getEmpDepartname());
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する

		PrintWriter pw = response.getWriter();//出力ストリーム
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(empList));
		// -- ここまで --
	}






	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		// TODO 任意機能「趣味投稿機能に挑戦する場合はこちらを利用して下さい」

		// -- ここまで --
	}

}//最終
