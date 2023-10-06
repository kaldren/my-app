import { poolPromise } from './../../../db';
const sql = require('mssql');

export async function GET(request: Request) {
  try {
    const jobId = request.url.split('/').pop();

    if (!jobId) {
      return new Response(`JobId not provided`, {
          status: 400
        });
    }

    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('JobId', sql.Int, jobId)
    .query(`
        SELECT 
            J.[Position],
            C.[Name] AS CompanyName,
            D.[Name] AS DepartmentName,
            E.[Name] AS EmploymentTypeName,
            L.[Name] AS LocationName,
            J.[Salary],
            J.[Description],
            S.[Name] AS SeniorityName
        FROM 
            [my-app].[dbo].[Jobs] J
        JOIN 
            [my-app].[dbo].[Companies] C ON J.[CompanyId] = C.[CompanyId]
        JOIN 
            [my-app].[dbo].[Departments] D ON J.[DepartmentId] = D.[DepartmentId]
        JOIN 
            [my-app].[dbo].[EmploymentTypes] E ON J.[EmploymentId] = E.[EmploymentId]
        JOIN 
            [my-app].[dbo].[Locations] L ON J.[LocationId] = L.[LocationId]
        JOIN 
            [my-app].[dbo].[Seniority] S ON J.[SeniorityId] = S.[SeniorityId]
        WHERE 
            J.[JobId] = @JobId
    `);


    if (result.recordset.length === 0) {
      return new Response(`No job found with ID: ${jobId}`, {
          status: 404
        });
    }

    return Response.json(result.recordset[0]);
  } catch (err: any) {
    return new Response(`${err}`, {
        status: 500
      });
  }
}
