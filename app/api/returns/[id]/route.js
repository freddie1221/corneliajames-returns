import Airtable from 'airtable';
const base = new Airtable({apiKey: process.env.AIRTABLE_PAT}).base(process.env.AIRTABLE_BASE_ID);

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'No ID provided in path param' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const record = await base('Returns').find(id);
    return new Response(JSON.stringify(record.fields), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Return not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}