package appEmployee;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
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


@WebServlet("/Department_info_delete_Servlet")
public class Department_info_delete_Servlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException{
    	String DepartmenId = request.getParameter("DepartmenId");
		System.out.println(DepartmenId);//記入例、URLには?getDepartmenIdtVal=D01


    	response.setContentType("text/html; charset=Shift_JIS");
    	PrintWriter out = response.getWriter();
        List <emp> empList =  new ArrayList<>();

       // String a = request.getParameter("rgp");
       // System.out.println("jsの値"+a);


        //System.out.println(empList.get(a));


        Connection con = null;
        String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
             con = DriverManager.getConnection(url, user, pass);

            Statement stmt = con.createStatement();

            String sql = "delete from DEPART_KBN \n" +
					"where DEPARTID = '"+DepartmenId+"' \n" ;

            System.out.println(sql);


            int i = stmt.executeUpdate(sql);
             System.out.println("削除したのは"+i+"行");//削除した行数

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
        System.out.println("最後"+empList);
    }




}

