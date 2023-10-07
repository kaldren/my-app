import { poolPromise } from './../../db';
const sql = require('mssql');

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('CompanyId', sql.Int, 1)
      .input('DepartmentId', sql.Int, 1)
      .input('Position', sql.NVarChar, "software developer")
      .input('EmploymentTypeId', sql.Int, 1)
      .input('LocationId', sql.Int, 1)
      .input('Salary', sql.NVarChar, "6000-9000")
      .input('Description', sql.NVarChar, "Write some .NET code!")
      .query(
        'INSERT INTO Jobs (CompanyId, DepartmentId, Position, EmploymentTypeId, LocationId, Salary, Description) VALUES (@CompanyId, @DepartmentId, @Position, @EmploymentTypeId, @LocationId, @Salary, @Description)'
      );
      return Response.json({ result })
  } catch (err: any) {
    return new Response(`${err}`, {
        status: 500
      })
  }
}
