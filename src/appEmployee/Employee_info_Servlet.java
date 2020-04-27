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

@WebServlet("/a")
public class Employee_info_Servlet extends HttpServlet {

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
		String shainId = request.getParameter("shainId");
		//System.out.println("shainId=" + shainId);

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

		// 実行するSQL文
//		String sql ="select ef.EMPID ,ef.NAME " +
//					"from DEPART_KBN dk,EMP_INFO ef " +
//					"where 1=1,and dk.DEPARTID = ef.DEPARTID and ef.EMPID = 'EMP0001'" +
//					"order by  ef.EMPID ";
//
		String sql = "select \n" +
				"ef.EMPID ee \n" +
				",ef.NAME en \n" +
				"from \n" +
				"DEPART_KBN dk \n" +
				",EMP_INFO ef \n" +
				"where 1=1 \n" +
				"and dk.DEPARTID = ef.DEPARTID \n" +
				//"and ef.EMPID = 'EMP0002'  \n" +
				"order by  \n" +
				"ef.EMPID \n" +
				" \n";

		//System.out.println(sql);


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
				e1.setEmpId(rs1.getString("ee"));
				e1.setEmpName(rs1.getString("en"));
				empList.add(e1);
				System.out.println(e1.getEmpId());
				System.out.println(e1.getEmpName());

//				h1.setHobby(rs1.getString("mhn")); // SQL文のエイリアス
//				h1.setHobbyCategory(rs1.getString("mcn"));// Item型の変数itemに商品名をセット
//				hobbyList.add(h1);
//				System.out.println(h1.getHobby());
			}
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する

		PrintWriter pw = response.getWriter();//出力ストリーム
		// JSONで出力する
		//pw.println("a");
		pw.append(new ObjectMapper().writeValueAsString(empList));
		// -- ここまで --
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		// TODO 任意機能「趣味投稿機能に挑戦する場合はこちらを利用して下さい」

		// -- ここまで --
	}

}//最終
