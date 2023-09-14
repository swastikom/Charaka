import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.json();
  await connectMongoDB();
  await User.create({ email });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
