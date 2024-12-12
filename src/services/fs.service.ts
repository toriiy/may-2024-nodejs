import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/user.interface";

const readFile = async (): Promise<string> => {
  try {
    return await fs.readFile(
      path.join(process.cwd(), "db", "users.json"),
      "utf-8",
    );
  } catch (e) {
    console.log(e.message);
  }
};

const writeFile = async (users: IUser[]): Promise<void> => {
  try {
    await fs.writeFile(
      path.join(process.cwd(), "db", "users.json"),
      JSON.stringify(users),
    );
  } catch (e) {
    console.log(e.message);
  }
};

export { readFile, writeFile };
