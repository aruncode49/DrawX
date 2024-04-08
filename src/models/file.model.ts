import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String, // email
      required: true,
    },
    archive: Boolean,
    document: String,
    whiteboard: String,
  },
  { timestamps: true }
);

export const File = mongoose.models.File || mongoose.model("File", fileSchema);
