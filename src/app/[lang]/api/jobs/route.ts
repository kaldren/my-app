import { poolPromise } from './../../db';
const sql = require('mssql');

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('CompanyId', sql.Int, req.CompanyId)
      .input('DepartmentId', sql.Int, req.DepartmentId)
      .input('Position', sql.NVarChar, req.Position)
      .input('EmploymentTypeId', sql.Int, req.EmploymentTypeId)
      .input('LocationId', sql.Int, req.LocationId)
      .input('MinSalary', sql.Decimal, req.MinSalary)
      .input('MaxSalary', sql.Decimal, req.MaxSalary)
      .input('IsNegotiable', sql.Bit, req.IsNegotiable)
      .input('CurrencyId', sql.Int, req.CurrencyId)
      .input('Description', sql.NVarChar, req.Description)
      .input('SeniorityId', sql.Int, req.SeniorityId)
      .query(
        `INSERT INTO Jobs (CompanyId, DepartmentId, Position, EmploymentTypeId, LocationId, MinSalary, MaxSalary, IsNegotiable, CurrencyId, Description, SeniorityId)
         OUTPUT INSERTED.JobId
         VALUES (@CompanyId, @DepartmentId, @Position, @EmploymentTypeId, @LocationId, @MinSalary, @MaxSalary, @IsNegotiable, @CurrencyId, @Description, @SeniorityId)`
      );
    // Assuming Id is the column name of the primary key
    const jobId = result.recordset[0].JobId;

    return new Response(JSON.stringify({ jobId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err: any) {
    return new Response(`${err}`, {
        status: 500
      })
  }
}
