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

/**
 * Servlet implementation class Department_info
 */
@WebServlet("/Department_info")
public class Department_info extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public Department_info() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());

		response.setContentType("text/html; charset=Windows-31J");

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
					"dk.DEPARTID ddi, \n" +
					"dk.DEPARTNAME ddn \n" +
					"from  \n" +
					"DEPART_KBN dk";

			System.out.println(sql);

			//リストの作成
			List <Department> DepartmentList =  new ArrayList<>();

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
					Department d1 = new Department();
					//System.out.println(d1);//appEmployee.Department@fcdee54
					d1.setDepartmentId(rs1.getString("ddi"));
					//d1.setDepartmentId(rs1.getString("dk.DEPARTID"));
					System.out.println(d1.getDepartmentId());
					d1.setDepartname(rs1.getString("ddn"));
					System.out.println(d1.getDepartname());
					DepartmentList.add(d1);
				}

			} catch (Exception e) {
				throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
			}

			// アクセスした人に応答するためのJSONを用意する

			PrintWriter pw = response.getWriter();//出力ストリーム
			// JSONで出力する
			//pw.println("a");
			pw.append(new ObjectMapper().writeValueAsString(DepartmentList));
			System.out.println(DepartmentList);
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
