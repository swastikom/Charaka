import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();
  const { email, item } = await request.json();

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      user.itemList.push(item);
      await user.save();

      return NextResponse.json({ message: "User Registered" }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
