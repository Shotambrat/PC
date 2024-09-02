// app/api/content/[slug]/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Content from '@/lib/models/Content';

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const content = await db.collection('content').findOne({ slug: params.slug });

    if (!content) {
      return NextResponse.json({ message: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching content' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const updatedContent = await db.collection('content').findOneAndUpdate(
      { slug: params.slug },
      { $set: body },
      { returnDocument: 'after', upsert: true }
    );

    return NextResponse.json(updatedContent.value);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating content' }, { status: 500 });
  }
}
