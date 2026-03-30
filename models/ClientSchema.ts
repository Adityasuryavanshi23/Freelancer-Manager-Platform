import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Client =
  mongoose.models.Client || mongoose.model("Client", ClientSchema);
