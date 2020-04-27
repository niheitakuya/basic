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


@WebServlet("/DatabaseTest5")
public class DatabaseTest5 extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException{

        response.setContentType("text/html; charset=Shift_JIS");
        PrintWriter out = response.getWriter();
        List <emp> empList =  new ArrayList<>();

//        out.println("<html>");
//        out.println("<head>");
//        out.println("<title>データベーステスト</title>");
//        out.println("</head>");
//        out.println("<body>");

        Connection con = null;
        String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";


        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
             con = DriverManager.getConnection(url, user, pass);

            Statement stmt = con.createStatement();



            // String sql_delete ="delete from EMP_INFO \n where  EMPID = 'EMP0002';commit ";
               String sql_delete ="delete from EMP_INFO \n where  EMPID = 'EMP0002' ";
             //なぜcommitがいならいのか？？


              int num = stmt.executeUpdate(sql_delete);
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

                      ResultSet rs1 = stmt.executeQuery(sql);




            while (rs1.next()) {
				emp e1 = new emp();
				//System.out.println(e1);
				e1.setEmpId(rs1.getString("ee"));
				e1.setEmpName(rs1.getString("en"));
				empList.add(e1);
				//System.out.println(e1.getEmpId());
				System.out.println(e1.getEmpName());
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
        out.append(new ObjectMapper().writeValueAsString(empList));

    }
}