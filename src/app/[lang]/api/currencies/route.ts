import { poolPromise } from './../../db';
const sql = require('mssql');

export async function GET(request: Request) {
    try {
      // Create a connection pool
      const pool = await poolPromise;

    //   // Run the SQL query
      const result = await pool
        .request()
        .query(`
          SELECT 
            [CurrencyId]
           ,[CurrencyCode]
           ,[CurrencyName]
          FROM [dbo].[Currencies]
        `);


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