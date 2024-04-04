import { connectDB } from "@/lib/connectDB";
import { Team } from "@/models/team.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { createdBy } = await req.json();
    const team = await Team.find({ createdBy });

    if (team && team.length) {
      return NextResponse.json({
        success: true,
        msg: "Team found successfully",
        team,
      });
    }

    return NextResponse.json({
      success: false,
      msg: "Team not found!",
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
