import { poolPromise } from '../../db';
const sql = require('mssql');

export async function GET(request: Request) {
    try {
    const pathSegments = new URL(request.url).pathname.split('/');
    const lang = pathSegments[1];

      const pool = await poolPromise;

      const result = await pool
        .request()
        .input('lang', sql.NVarChar(2), lang) 
        .query(`
              SELECT 
              c.[CountryId]
              ,COALESCE(ct.[TranslatedName], c.[Name]) AS [CountryName]
          FROM [dbo].[Countries] c
          LEFT JOIN [dbo].[CountryTranslations] ct ON c.[CountryId] = ct.[CountryId]
          AND ct.[CountryId] = (SELECT l.[LanguageId] FROM dbo.[Languages] l WHERE l.[LanguageCode] = @lang)
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