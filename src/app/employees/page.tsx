import AddEmployee from "./addEmployee";
import DeleteEmployee from "./deleteEmployee";

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  position: string;
};

async function getEmployee() {
  const res = await fetch("http://localhost:9000/employee", {
    method: "get",
    cache: "no-store",
  });
  return res.json();
}

export default async function EmployeeList() {
  const employeeData: Employee[] = await getEmployee();
  return (
    <div className="py-10 px-10">
      <div className="mb-10">
        <AddEmployee />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Karyawan</th>
            <th>Nomor Telepon</th>
            <th>Posisi</th>
          </tr>
        </thead>

        <tbody>
          {employeeData.map((Employee, index) => (
            <tr key={Employee.id}>
              <td>{index + 1}</td>
              <td>
                {Employee.first_name} {Employee.last_name}
              </td>
              <td>{Employee.phone}</td>
              <td>{Employee.position}</td>
              <td>
                <div></div>
                <DeleteEmployee {...Employee} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
