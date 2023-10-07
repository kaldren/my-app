import { poolPromise } from './../../../db';
const sql = require('mssql');

export async function GET(request: Request) {
  try {
    const companyId = request.url.split('/').pop();

    if (!companyId) {
      return new Response(`CompanyId not provided`, {
        status: 400,
      });
    }

    const pool = await poolPromise;
    const result = await pool.request().input('CompanyId', sql.Int, companyId).query(`
    SELECT 
        C.[CompanyId] AS CompanyId,
        C.[Name] AS Name,
        C.[YearFounded] AS YearFounded,
        C.[Employees] AS Employees,
        C.[Address] AS Address,
        C.[Website] AS Website,
        C.[Facebook] AS Facebook,
        C.[LinkedIn] AS LinkedIn,
        C.[ShortDescription] AS ShortDescription
    FROM 
        [dbo].[Companies] C
    WHERE 
        C.[CompanyId] = @CompanyId
    `);

    if (result.recordset.length === 0) {
      return new Response(`No company found with ID: ${companyId}`, {
        status: 404,
      });
    }

    return Response.json(result.recordset[0]);
  } catch (err: any) {
    return new Response(`${err}`, {
      status: 500,
    });
  }
}
