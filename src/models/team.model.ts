import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String, // email
      required: true,
    },
  },
  { timestamps: true }
);

export const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
