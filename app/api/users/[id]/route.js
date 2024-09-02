// app/api/users/[id]/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import User from "@/lib/models/User";
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection("users").findOne({ _id: new ObjectId(params.id) });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await req.json();

    const updatedUser = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: body },
      { returnDocument: "after" }
    );

    return NextResponse.json(updatedUser.value);
  } catch (error) {
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection("users").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}
