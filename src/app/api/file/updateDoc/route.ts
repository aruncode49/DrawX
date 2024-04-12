import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { File } from "@/models/file.model";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { fileId, document } = await req.json();

    const updatedDocument = await File.findByIdAndUpdate(fileId, { document });

    if (updatedDocument) {
      return NextResponse.json({
        msg: "File Saved Successfully",
        success: true,
        updatedDocument,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      msg: error.message,
    });
  }
}
