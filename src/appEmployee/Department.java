package appEmployee;

public class Department {

	public Department(){
		//何もしない、デフォルトコンストラクタ
	}

	public String getDepartmentId() {
		return DepartmentId;
	}
	public void setDepartmentId(String departmentId) {
		DepartmentId = departmentId;
	}
	public String getDepartname() {
		return Departname;
	}
	public void setDepartname(String departname) {
		Departname = departname;
	}

	private String DepartmentId;
	private String Departname;


}
