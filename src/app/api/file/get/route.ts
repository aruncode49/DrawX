import { NextRequest, NextResponse } from "next/server";
import { File } from "@/models/file.model";
import { connectDB } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { teamId, createdBy } = await req.json();

    // create new file
    const allFiles = await File.find({
      teamId,
      createdBy,
    });

    if (allFiles && allFiles.length > 0) {
      return NextResponse.json({
        success: true,
        allFiles,
      });
    } else {
      return NextResponse.json({
        success: false,
        msg: "No file found!",
        allFiles,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      msg: error.message,
    });
  }
}
