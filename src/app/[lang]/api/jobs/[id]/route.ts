import { poolPromise } from './../../../db';
const sql = require('mssql');

export async function GET(request: Request) {
  try {
    const jobId = request.url.split('/').pop();
    const pathSegments = new URL(request.url).pathname.split('/');
    const lang = pathSegments[1];

    if (!jobId) {
      return new Response(`JobId not provided`, {
        status: 400,
      });
    }

    let query = `
    SELECT 
        J.[Position],
        ${lang !== 'en' ? 'DT.[TranslatedName]' : 'D.[Name]'} AS Department,
        ${lang !== 'en' ? 'ET.[TranslatedName]' : 'E.[Name]'} AS EmploymentType,
        ${lang !== 'en' ? 'LT.[TranslatedName]' : 'L.[Name]'} AS Location,
        J.[MinSalary],
        J.[MaxSalary],
        CUR.[CurrencyCode] AS Currency,
        J.[IsNegotiable],
        J.[Description],
        S.[Name] AS Seniority,
        C.[CompanyId] AS CompanyId,
        C.[Name] AS CompanyName,
        C.[YearFounded] AS CompanyYearFounded,
        C.[Employees] AS CompanyEmployees,
        C.[Address] AS CompanyAddress,
        C.[Website] AS CompanyWebsite,
        C.[Facebook] AS CompanyFacebook,
        C.[LinkedIn] AS CompanyLinkedIn,
        C.[ShortDescription] AS CompanyShortDescription
    FROM 
        [dbo].[Jobs] J
    LEFT JOIN
        [dbo].[Currencies] CUR ON J.[CurrencyId] = CUR.[CurrencyId] -- LEFT JOIN to the Currencies table
    JOIN 
        [dbo].[Companies] C ON J.[CompanyId] = C.[CompanyId]
    JOIN 
        [dbo].[Departments] D ON J.[DepartmentId] = D.[DepartmentId]
    JOIN 
        [dbo].[EmploymentTypes] E ON J.[EmploymentTypeId] = E.[EmploymentTypeId]
    JOIN 
        [dbo].[Locations] L ON J.[LocationId] = L.[LocationId]
    JOIN 
        [dbo].[Seniority] S ON J.[SeniorityId] = S.[SeniorityId]
`;

if (lang !== 'en') {
  query += `
      JOIN [dbo].[DepartmentTranslations] DT ON J.[DepartmentId] = DT.[DepartmentId]
      JOIN [dbo].[Languages] DTL ON DT.[LanguageId] = DTL.[LanguageId] AND DTL.[LanguageCode] = @lang

      JOIN [dbo].[EmploymentTypeTranslations] ET ON J.[EmploymentTypeId] = ET.[EmploymentTypeId]
      JOIN [dbo].[Languages] ETL ON DT.[LanguageId] = ETL.[LanguageId] AND ETL.[LanguageCode] = @lang

      JOIN [dbo].[LocationTranslations] LT ON J.[LocationId] = LT.[LocationId]
      JOIN [dbo].[Languages] LTL ON LT.[LanguageId] = LTL.[LanguageId] AND LTL.[LanguageCode] = @lang
    `;
}

  query += `WHERE J.[JobId] = @JobId`;

  console.log(query);

    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('JobId', sql.Int, jobId)
    .input('lang', sql.NVarChar(2), lang)
    .query(query);

    if (result.recordset.length === 0) {
      return new Response(`No job found with ID: ${jobId}`, {
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
