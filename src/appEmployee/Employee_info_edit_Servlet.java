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


@WebServlet("/Employee_info_edit_Servlet")
public class Employee_info_edit_Servlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException{
    	String testNo = request.getParameter("rgp");
    	System.out.println("リクエストパラメータ::"+testNo);

    	response.setContentType("text/html; charset=Shift_JIS");
    	PrintWriter out = response.getWriter();
        List <emp> empList =  new ArrayList<>();

        Connection con = null;
        String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
             con = DriverManager.getConnection(url, user, pass);

            Statement stmt = con.createStatement();


//
//            String sql =  "select \n" +
//            		"EMP_INFO.EMPID eie,EMP_INFO.NAME ein ,EMP_INFO.AGE eia,EMP_INFO.SEX eis,EMP_INFO.POSTCODE eip,EMP_INFO.PREF eipr,EMP_INFO.ADDRESS eiad,DEPART_KBN.DEPARTNAME dkd,EMP_INFO.STARTDATE eisd,EMP_INFO.RETIREMENTDATE eir \n" +
//            		"from \n" +
//            		"EMP_INFO \n" +
//            		",DEPART_KBN \n" +
//            		"where 1=1 \n" +
//            		"and EMP_INFO.DEPARTID = DEPART_KBN.DEPARTID \n" +
//            		"order by EMP_INFO.EMPID \n";


            String sql ="select \n" +
            		"EMP_INFO.EMPID eie,EMP_INFO.NAME ein ,EMP_INFO.AGE eia,EMP_INFO.SEX eis,EMP_INFO.POSTCODE eip,EMP_INFO.PREF eipr,EMP_INFO.ADDRESS eiad,DEPART_KBN.DEPARTNAME dkd,EMP_INFO.STARTDATE eisd,EMP_INFO.RETIREMENTDATE eir \n" +
            		"from \n" +
            		"EMP_INFO \n" +
            		",DEPART_KBN \n" +
            		"where 1=1 \n" +
            		"and EMP_INFO.DEPARTID = DEPART_KBN.DEPARTID and EMP_INFO.EMPID = '"+testNo+"'" +
            		"order by EMP_INFO.EMPID \n";


                      System.out.println("sql文の直後：："+sql);

                      ResultSet rs1 = stmt.executeQuery(sql);



            while (rs1.next()) {
				emp e1 = new emp();
				System.out.println("while文のなかEmployee_info_edit_Servlet"+e1);

				e1.setEmpId(rs1.getString("eie"));
					System.out.println(e1.getEmpId());
				e1.setEmpName(rs1.getString("ein"));
					System.out.println(e1.getEmpName());
				e1.setEmpAge(rs1.getString("eia"));
					System.out.println(e1.getEmpAge());
				e1.setEmpSex(rs1.getString("eis"));
					System.out.println(e1.getEmpSex());
				e1.setEmpPostcode(rs1.getString("eip"));
					System.out.println(e1.getEmpPostcode());
				e1.setEmpPref(rs1.getString("eipr"));
					System.out.println(e1.getEmpPref());
				e1.setEmpAddress(rs1.getString("eiad"));
					System.out.println(e1.getEmpAddress());
				e1.setEmpDepartname(rs1.getString("dkd"));
					System.out.println(e1.getEmpDepartname());
				e1.setEmpStartdate(rs1.getString("eisd"));
					System.out.println(e1.getEmpStartdate());
				e1.setEmpRetirementdate(rs1.getString("eir"));
					System.out.println(e1.getEmpRetirementdate());

					System.out.println("-------------------------------");

				empList.add(e1);


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
       //out.append(new ObjectMapper().writeValueAsString(empList));
       out.append(new ObjectMapper().writeValueAsString(empList));
       //out.append(new ObjectMapper().writeValueAsString(empList));
       // System.out.println("最後"+empList);
    }
}//public class Employee_info_edit_Servletの最後

