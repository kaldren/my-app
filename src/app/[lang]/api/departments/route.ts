import { poolPromise } from './../../db';
const sql = require('mssql');

export async function GET(request: Request) {
    try {
    const pathSegments = new URL(request.url).pathname.split('/');
    const lang = pathSegments[1];

      // Create a connection pool
      const pool = await poolPromise;

    //   // Run the SQL query
      const result = await pool
        .request()
        .input('lang', sql.NVarChar(2), lang) 
        .query(`
            SELECT 
                d.DepartmentId,
                COALESCE(dt.TranslatedName, d.Name) AS DepartmentName
            FROM dbo.Departments d
            LEFT JOIN dbo.DepartmentTranslations dt 
                ON d.DepartmentId = dt.DepartmentId
                AND dt.LanguageId = (SELECT l.LanguageId FROM dbo.Languages l WHERE l.LanguageCode = @lang)
        `);


    console.log(result);

      // Return the fetched data
        return new Response(JSON.stringify(result.recordset), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
      console.error('Error fetching departments:', error);
      return {
        status: 500,
        error: 'An error occurred while fetching departments.',
      };
    }
}