import { NextRequest, NextResponse } from "next/server";
import { File } from "@/models/file.model";
import { connectDB } from "@/lib/connectDB";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const params = req.nextUrl.searchParams;
    const id = params.get("id");

    const deletedFile = await File.findByIdAndDelete(id);

    if (deletedFile) {
      return NextResponse.json({
        msg: "File Deleted Successfully!",
        success: true,
      });
    } else {
      return NextResponse.json({
        msg: "Something went wrong!",
        success: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      msg: error.message,
      success: false,
    });
  }
}
