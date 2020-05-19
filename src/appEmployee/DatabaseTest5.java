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
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;


@WebServlet("/DatabaseTest5")
public class DatabaseTest5 extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException{
    	
    	response.setContentType("text/html; charset=Windows-31J");
    	PrintWriter out = response.getWriter();
    	HttpSession session = request.getSession(true);//sessionの生成,これが準備、一番最初
    	
    	String LoginID = (String) session.getAttribute("ID");//キーからvalue受け取る
    	String LoginName = (String) session.getAttribute("Name");//キーからvalue受け取る
    	String LoginPass = (String) session.getAttribute("Pass");//キーからvalue受け取る
    	String LoginPosition = (String) session.getAttribute("Position");//キーからvalue受け取る


    	System.out.println(LoginPosition);

    	if(LoginPosition.equals("Member")){
    		out.append(new ObjectMapper().writeValueAsString("Memberのため削除できません"));
    	}else{



    		String testNo = request.getParameter("rgp");
        	System.out.println("リクエストパラメータ::"+testNo);


        	response.setContentType("text/html; charset=Shift_JIS");

            List <emp> empList =  new ArrayList<>();

            String a = request.getParameter("rgp");
            System.out.println("jsの値"+a);


            //System.out.println(empList.get(a));


            Connection con = null;
            String url = "jdbc:oracle:thin:@localhost:1521:XE";
    		String user = "webapp";
    		String pass = "webapp";

            try {
                Class.forName("oracle.jdbc.driver.OracleDriver");
                 con = DriverManager.getConnection(url, user, pass);

                Statement stmt = con.createStatement();

                String sql_delete ="delete from EMP_INFO where EMPID ='"+testNo+"'" ;//ここを変数にする。

                 int i = stmt.executeUpdate(sql_delete);
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







}

