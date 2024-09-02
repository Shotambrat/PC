// app/api/banners/[id]/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Banner from '@/lib/models/Banner';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const banner = await db.collection('banners').findOne({ _id: new ObjectId(params.id) });

    if (!banner) {
      return NextResponse.json({ message: 'Banner not found' }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching banner' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const updatedBanner = await db.collection('banners').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: body },
      { returnDocument: 'after', upsert: true }
    );

    return NextResponse.json(updatedBanner.value);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating banner' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection('banners').deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: 'Banner deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting banner' }, { status: 500 });
  }
}
