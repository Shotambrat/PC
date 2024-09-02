import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('your_database_name');
    const collection = db.collection('test');
    const data = await collection.find({}).toArray();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response('Error connecting to MongoDB', { status: 500 });
  }
}
