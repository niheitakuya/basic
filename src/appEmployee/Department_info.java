package appEmployee;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
		response.getWriter().append("Served at: ").append(request.getContextPath());

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
					"dk.DEPARTID, \n" +
					"dk.DEPARTNAME \n" +
					"from  \n" +
					"DEPART_KBN dk";

			System.out.println(sql);








	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
