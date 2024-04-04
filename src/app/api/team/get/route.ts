import { connectDB } from "@/lib/connectDB";
import { Team } from "@/models/team.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();
    const team = await Team.findOne({ email });

    if (!team) {
      return NextResponse.json({
        success: false,
        msg: "Team not found!",
      });
    }

    return NextResponse.json({
      success: true,
      msg: "Team found successfully",
      team,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
