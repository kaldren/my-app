import { poolPromise } from '../../db';
const sql = require('mssql');// Assuming you're using the mssql package.

export async function POST(request: Request) {

        // try {
        //     // make sure that any items are correctly URL encoded in the connection string
        //     await sql.connect('Server=Kaloyan-Desktop;Database=my-app;User Id=MyAppLogin;Password=Parola123;Encrypt=true')
        //     const result = await sql.query`select * from Companies where CompanyId = 1`
        //     return Response.json({result})
        // } catch (err) {
        //     // ... error checks
        //     return new Response(`Error ${err}`, {
        //         status: 500
        //     })
        // }

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
    return new Response(`Error ${err}`, {
        status: 500
      })
  }
    return Response.json('HI!')
}
