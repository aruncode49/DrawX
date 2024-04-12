import { NextRequest, NextResponse } from "next/server";
import { File } from "@/models/file.model";
import { connectDB } from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { fileId, teamId, createdBy } = await req.json();

    // get single file
    if (fileId) {
      const file = await File.findById(fileId);
      if (file) {
        return NextResponse.json({
          msg: "File fetched!",
          success: true,
          file,
        });
      } else {
        return NextResponse.json({
          msg: "File not found!",
          success: false,
        });
      }
    }

    const allFiles = await File.find({
      teamId,
      createdBy,
    }).sort({ createdAt: -1 });

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
