import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { File } from "@/models/file.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { teamId, fileName, createdBy, archive, document, whiteboard } =
      await req.json();

    const files = await File.find({ teamId, createdBy });

    // if files are more than 4 in db
    if (files && files.length > 4) {
      return NextResponse.json({
        success: false,
        msg: "You have reached your plan's file limit!",
      });
    }

    // create new file
    const createdFile = await File.create({
      fileName,
      teamId,
      createdBy,
      archive,
      document,
      whiteboard,
    });

    if (createdFile) {
      const allFiles = await File.find({
        teamId,
        createdBy,
      }).sort({ createdAt: -1 });

      if (allFiles && allFiles.length > 0) {
        return NextResponse.json({
          success: true,
          allFiles,
          msg: "File created successfully!",
        });
      }
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      msg: error.message,
    });
  }
}
