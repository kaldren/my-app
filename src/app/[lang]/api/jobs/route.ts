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
      .input('Country', sql.NVarChar, req.Country)
      .input('Province', sql.NVarChar, req.Province)
      .input('Location', sql.NVarChar, req.Location)
      .input('MinSalary', sql.Decimal, req.MinSalary)
      .input('MaxSalary', sql.Decimal, req.MaxSalary)
      .input('IsNegotiable', sql.Bit, req.IsNegotiable)
      .input('CurrencyId', sql.Int, req.CurrencyId)
      .input('Description', sql.NVarChar, req.Description)
      .input('SeniorityId', sql.Int, req.SeniorityId)
      .query(
        `
        -- FROM DB
        DECLARE @NewLocationId AS INT;
        DECLARE @NewProvinceId AS INT;
                
        -- Check if we have that Location and Province in the database
        DECLARE @LocationIdDb AS INT
        DECLARE @ProvinceIdDb AS INT
        DECLARE @CountryIdDb AS INT;
        
		    SELECT 
             @LocationIdDb = l.[LocationId]
            ,@ProvinceIdDb = p.[ProvinceId]
            ,@CountryIdDb = p.[CountryId]
        FROM [dbo].[Provinces] p
        LEFT JOIN [dbo].[Locations] l ON p.[ProvinceId] = l.[ProvinceId] AND l.[Name] = @Location
        WHERE p.[Name] = @Province
                
        -- No location
        IF (@LocationIdDb IS NULL)
        BEGIN
            -- Create location
            INSERT INTO [dbo].[Locations] (Name, CountryId, ProvinceId) VALUES (@Location, @CountryIdDb, @NewProvinceId)
			      SET @LocationIdDb = SCOPE_IDENTITY()
        END

        -- No location & province
        IF (@LocationIdDb IS NULL AND @ProvinceIdDb)
        BEGIN
            -- Create location & province ???
        END

        -- If we don't - create the location and get the id   
                
        INSERT INTO Jobs (CompanyId, DepartmentId, Position, EmploymentTypeId, CountryId, ProvinceId, LocationId, MinSalary, MaxSalary, IsNegotiable, CurrencyId, Description, SeniorityId)
        OUTPUT INSERTED.JobId
        VALUES (@CompanyId, @DepartmentId, @Position, @EmploymentTypeId, @CountryIdDb, @ProvinceIdDb, @LocationIdDb, @MinSalary, @MaxSalary, @IsNegotiable, @CurrencyId, @Description, @SeniorityId)`
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
