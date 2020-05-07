package appEmployee;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/Employee_info_newadd_Servlet")
public class Employee_info_newadd_Servlet extends HttpServlet {

	/********************************************************************************
	 * 以下のdoGet/doPostを実装して下さい。
	 * importなどは自由に行って下さい。
	 * @throws IOException
	 ********************************************************************************/

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException  {
		//文字化け防止
		response.setContentType("text/html; charset=Windows-31J");
		// TODO 必須機能「趣味参照機能」
		// アクセス元のHTMLでitemCdに設定された値を取得して、String型の変数itemCdに代入

		String q = request.getParameter("q");//新ID
		String name = request.getParameter("name");//田中
		String age = request.getParameter("age");
		String sex = request.getParameter("sex");
		String postcode = request.getParameter("postcode");
		String pref = request.getParameter("pref");
		String address = request.getParameter("address");
		String department= request.getParameter("department");
		String startdate = request.getParameter("startdate");
		String retirementdate = request.getParameter("retirementdate");

		System.out.println("-------");
		System.out.println(q);
		System.out.println(name);
		System.out.println(age);
		System.out.println(sex);
		System.out.println(postcode);
		System.out.println(pref);
		System.out.println(address);
		System.out.println(department);
		System.out.println(startdate);
		System.out.println(retirementdate);
		System.out.println("-------");


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

		String sql;
		sql = "insert into \n" +
				"EMP_INFO \n" +
				"(EMPID,NAME,AGE,SEX,POSTCODE,PREF,ADDRESS,DEPARTID,STARTDATE,RETIREMENTDATE) \n" +
				"values \n" +
				"('"+q+"','"+name+"',"+20+",'"+sex+"','"+postcode+"','"+pref+"','"+address+"','"+department+"','"+startdate+"','"+retirementdate+"')";

		System.out.println(sql);

		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();
				) {

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				int rs1 = stmt.executeUpdate(sql);

			    // SQL実行後の処理内容

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する

		PrintWriter pw = response.getWriter();//出力ストリーム
		// JSONで出力する
		//pw.println("a");
		pw.append(new ObjectMapper().writeValueAsString("更新されました"));
		// -- ここまで --
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		// TODO 任意機能「趣味投稿機能に挑戦する場合はこちらを利用して下さい」

		// -- ここまで --
	}

}//最終

