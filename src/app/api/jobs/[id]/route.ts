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
      .query('SELECT * FROM Jobs WHERE JobId = @JobId');

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
