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
        `DECLARE @CompanyId AS INT = 1
        DECLARE @DepartmentId AS INT = 1
        DECLARE @Position AS NVARCHAR(50) = 'C# Developer'
        DECLARE @EmploymentTypeId AS INT = 1
        DECLARE @Location AS NVARCHAR(MAX) = 'Lyaskovets'
        DECLARE @Province AS NVARCHAR(MAX) = 'Veliko Tarnovo'
        DECLARE @Country AS NVARCHAR(MAX) = 'Bulgaria'
        DECLARE @MinSalary AS DECIMAL = 4500
        DECLARE @MaxSalary AS DECIMAL = 6500
        DECLARE @IsNegotiable AS BIT = 0
        DECLARE @CurrencyId AS INT = 1
        DECLARE @Description AS NVARCHAR(MAX) = 'TOP JOB!!!!'
        DECLARE @SeniorityId AS INT = 1
        
        -- FROM DB
        DECLARE @NewLocationId AS INT;
        DECLARE @NewProvinceId AS INT;
        DECLARE @CountryIdDb AS INT;
        
        -- Check if we have that Location and Province in the database
        DECLARE @LocationIdDb AS NVARCHAR(MAX)
        DECLARE @ProvinceIdDb AS NVARCHAR(MAX)
        
        SELECT 
           @LocationIdDb = l.[LocationId]
          ,@ProvinceIdDb = l.[ProvinceId]
        FROM [dbo].[Locations] l
        JOIN [dbo].[Provinces] p ON l.[ProvinceId] = p.[ProvinceId] AND p.[Name] = @Province
        WHERE l.[Name] = @Location
        
        -- No province & location
        IF (@LocationIdDb IS NULL AND @ProvinceIdDb IS NULL)
        BEGIN
          -- Create province & location
          SELECT @CountryIdDb = [CountryId] FROM [dbo].[Countries] WHERE [Name] = @Country
        
          IF (@CountryIdDb IS NOT NULL)
          BEGIN
            INSERT INTO [dbo].[Provinces] (Name, CountryId) VALUES (@Province, @CountryIdDb)
            SET @NewProvinceId = SCOPE_IDENTITY()
        
            INSERT INTO [dbo].[Locations] (Name, CountryId, ProvinceId) VALUES (@Location, @CountryIdDb, @NewProvinceId)
          END
        END
        
        -- No location
        IF (@LocationIdDb IS NULL)
        BEGIN
          -- Create location
          -- Create province & location
          SELECT @CountryIdDb = [CountryId] FROM [dbo].[Countries] WHERE [Name] = @Country
        
          IF (@CountryIdDb IS NOT NULL)
          BEGIN
            INSERT INTO [dbo].[Locations] (Name, CountryId, ProvinceId) VALUES (@Location, @CountryIdDb, @NewProvinceId)
            SET @NewLocationId = SCOPE_IDENTITY()
        
            INSERT INTO [dbo].[Locations] (Name, CountryId, ProvinceId) VALUES (@Location, @CountryIdDb, @NewProvinceId)
          END
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
