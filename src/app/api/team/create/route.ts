import { connectDB } from "@/lib/connectDB";
import { Team } from "@/models/team.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { teamName, createdBy } = await req.json();
    const team = await Team.findOne({ teamName, createdBy });

    if (team) {
      return NextResponse.json({
        success: false,
        msg: "Please try different team name!",
      });
    }

    // create team
    const createdTeam = await Team.create({
      teamName,
      createdBy,
    });

    if (createdTeam)
      return NextResponse.json({
        success: true,
        msg: "Team created successfully",
        createdTeam,
      });
  } catch (error: any) {
    console.log(error.message);
  }
}
