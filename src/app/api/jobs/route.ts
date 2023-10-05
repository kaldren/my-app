import { poolPromise } from '../../db';
const sql = require('mssql');// Assuming you're using the mssql package.

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Name', sql.NVarChar, req.Name)
      .input('YearFounded', sql.Int, req.YearFounded)
      .input('Employees', sql.Int, req.Employees)
      .input('Address', sql.NVarChar, req.Address)
      .input('Website', sql.NVarChar, req.Website)
      .input('Facebook', sql.NVarChar, req.Facebook)
      .input('LinkedIn', sql.NVarChar, req.LinkedIn)
      .input('ShortDescription', sql.NVarChar, req.ShortDescription)
      .query(
        'INSERT INTO Company (Name, YearFounded, Employees, Address, Website, Facebook, LinkedIn, ShortDescription) VALUES (@Name, @YearFounded, @Employees, @Address, @Website, @Facebook, @LinkedIn, @ShortDescription)'
      );
      return Response.json({ result })
  } catch (err: any) {
    return new Response(`${err}`, {
        status: 500
      })
  }
}
