import { model, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 1, max: 120 },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    phone: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const User = model<IUser>("users", UserSchema);
