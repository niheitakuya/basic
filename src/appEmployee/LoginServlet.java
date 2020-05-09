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

/**
 * Servlet implementation class login_Servlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }


    private final String id =  "idid";
    private final String pass =  "passpass";

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		response.setContentType("text/html; charset=Windows-31J");

		String ID = request.getParameter("emp");
		String password = request.getParameter("pass");
		 //String aa = "aaa";
		System.out.println(ID);
		System.out.println(password);
		//System.out.println(id);


		//String id = getこれをもらう

		PrintWriter pw = response.getWriter();

		HttpSession session = request.getSession(true);//sessionの生成,これが準備、一番最初


			//jdbcの生成を行う
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
				"EMP_INFO.EMPID eie, \n" +
				"EMP_INFO.NAME ein, \n" +
				"pass.PASS ppa, \n" +
				"pass.POSITION ppo \n" +
				"from \n" +
				"EMP_INFO, \n" +
				"PASS \n" +
				"where 1=1 \n" +
				"and EMP_INFO.EMPID=pass.EMPID \n" +
				"and EMP_INFO.EMPID = 'EMP0000     ' \n";

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
				e1.setEmpId(rs1.getString("eie"));
				e1.setEmpName(rs1.getString("ein"));
				empList.add(e1);
				System.out.println("サーブレット");
				System.out.println(e1.getEmpId());
				System.out.println(e1.getEmpName());
			}

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}







		//パスワードの判定

//		if(password.equals(pass)&&ID.equals(id)){//nullだとエラーになる。
//			session.setAttribute("login", "ok");//渡す
//			pw.append(new ObjectMapper().writeValueAsString("ログイン完了。"));
//			System.out.println("ログイン成功！");
//
//		}else{
//			pw.append(new ObjectMapper().writeValueAsString("ログイン不正。"));
//			System.out.println("ログイン失敗！");
//		};


	}//doGet関数の最後










	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
