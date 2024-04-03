import { connectDB } from "@/lib/connectDB";
import { User } from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, image } = await req.json();

    // prevent copy of user in db
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json({
        success: true,
        msg: "User already exist in db",
        user: existingUser,
      });

    // make entry in db
    const createdUser = await User.create({
      name,
      email,
      image,
    });

    if (createdUser)
      return NextResponse.json(
        {
          success: true,
          msg: "User created Successfully",
          user: createdUser,
        },
        { status: 201 }
      );
  } catch (error: any) {
    console.log(error.message);
  }
}
