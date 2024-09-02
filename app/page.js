import clientPromise from '@/lib/mongodb';
import Main from '@/app/_components/Main/Main';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db();

  const banners = await db.collection('banners').find({}).toArray();

  const contacts = await db.collection('content').findOne({ slug: 'contacts' });

  return (
    <div>
      <Main banners={banners}contacts={contacts} />
    </div>
  );
}