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

/**
 * Servlet implementation class Department_info_newadd_Servlet
 */
@WebServlet("/Department_info_newadd_Servlet")
public class Department_info_newadd_Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public Department_info_newadd_Servlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());

		String q = request.getParameter("ID");
		String name = request.getParameter("name");

		System.out.println("-------");
		System.out.println(q);
		System.out.println(name);
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
				sql = "insert into DEPART_KBN \n" +
						"(DEPARTID,DEPARTNAME) \n" +
						"values \n" +
						"('"+q+"','"+name+"')";

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








	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
