package appEmployee;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
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
 * Servlet implementation class Department_info_edit_Servlet
 */
@WebServlet("/Department_info_edit_Servlet")
public class Department_info_edit_Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public Department_info_edit_Servlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=Shift_JIS");

		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());

		String testNo = request.getParameter("DepartmentId");
    	System.out.println("リクエストパラメータ::"+testNo);


    	PrintWriter out = response.getWriter();
        List <Department> DepartmentList =  new ArrayList<>();

        Connection con = null;
        String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";


		try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
             con = DriverManager.getConnection(url, user, pass);

            Statement stmt = con.createStatement();

            String sql ="select \n" +
            		"dk.DEPARTID ddi, \n" +
            		"dk.DEPARTNAME ddn \n" +
            		"from \n" +
            		"DEPART_KBN dk \n" +
            		"where  \n" +
            		"dk.DEPARTID = '"+testNo+"' ";


                      System.out.println("sql文の直後：："+sql);

                      ResultSet rs1 = stmt.executeQuery(sql);



            while (rs1.next()) {
            	Department d1 = new Department();
				System.out.println("while文のなかDepartment_info_edit_Servlet"+d1);

				d1.setDepartmentId(rs1.getString("ddi"));
					System.out.println(d1.getDepartmentId());
				d1.setDepartname(rs1.getString("ddn"));
					System.out.println(d1.getDepartname());

					System.out.println("-------------------------------");

					DepartmentList.add(d1);

            }

            rs1.close();
            stmt.close();

        }catch (ClassNotFoundException e){
            out.println("ClassNotFoundException:" + e.getMessage());
        }catch (SQLException e){
            out.println("SQLException!!:" + e.getMessage());
        }catch (Exception e){
            out.println("Exception:" + e.getMessage());
        }finally{
            try{
                if (con != null){
                    con.close();
                }
            }catch (SQLException e){
                out.println("SQLException:" + e.getMessage());
            }
        }
      out.append(new ObjectMapper().writeValueAsString(DepartmentList));

       System.out.println(DepartmentList);
       System.out.println("最後"+DepartmentList);
    }


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
