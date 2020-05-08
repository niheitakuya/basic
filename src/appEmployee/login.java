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
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class login
 */
@WebServlet("/login")
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());

		response.setContentType("text/html;charset=UTF-8");

		HttpSession session = request.getSession(true);//sessionの生成,これが準備、一番最初


		String LoginStatus = (String) session.getAttribute("login");//キーからvalue

		
		if(LoginStatus == null){
		
		}else{
			
			//社員一覧表示
		}



		String loginRequest = request.getParameter("loginRequest");
		System.out.println(loginRequest);

		PrintWriter pw = response.getWriter();

		if(status == null) {
			if(loginRequest != null &&  loginRequest.equals("login")) {
				session.setAttribute("login", "ok");
				pw.append(new ObjectMapper().writeValueAsString("ログイン完了。"));

				String sql = "select \n" +
						"ei.EMPID, \n" +
						"ei.NAME \n" +
						"from \n" +
						"EMP_INFO ei \n";

					System.out.println(sql);

			}else {
				pw.append(new ObjectMapper().writeValueAsString("ログインして下さい。"));
			}
		}else {
			if (loginRequest != null && loginRequest.equals("logout")){
				session.removeAttribute("login");
				pw.append(new ObjectMapper().writeValueAsString("ログアウト完了。"));
			}else {
				//pw.append(new ObjectMapper().writeValueAsString("ログイン済み"));
				// JDBCドライバの準備
				try {

					// JDBCドライバのロード
					Class.forName("oracle.jdbc.driver.OracleDriver");

				} catch (ClassNotFoundException e) {
					// ドライバが設定されていない場合はエラーになります
					throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
				}


				String sql = "select \n" +
						"ei.EMPID ee, \n" +
						"ei.NAME en \n" +
						"from \n" +
						"EMP_INFO ei \n";

					System.out.println(sql);

					String url = "jdbc:oracle:thin:@localhost:1521:XE";
					String user = "webapp";
					String pass = "webapp";


					//リストの作成
					List <emp> empList =  new ArrayList<>();

					try (
							// データベースへ接続します
							Connection con = DriverManager.getConnection(url, user, pass);

							// SQLの命令文を実行するための準備をおこないます
							Statement stmt = con.createStatement();

							// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
							ResultSet rs1 = stmt.executeQuery(sql);
							) {
						    // SQL実行後の処理内容

						while (rs1.next()) {
							emp e1 = new emp();
							//System.out.println(e1);
							e1.setEmpId(rs1.getString("ee"));
							e1.setEmpName(rs1.getString("en"));
							empList.add(e1);
							System.out.println("サーブレット");
							System.out.println(e1.getEmpId());
							System.out.println(e1.getEmpName());
						}

					} catch (Exception e) {
						throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
					}
					// アクセスした人に応答するためのJSONを用意する

					PrintWriter pww = response.getWriter();//出力ストリーム
					pww.append(new ObjectMapper().writeValueAsString(empList));
					System.out.println(empList);
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
