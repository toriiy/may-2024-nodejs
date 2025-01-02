import { IPassword } from "../interfaces/password.interface";
import { Password } from "../models/password.model";

class PasswordRepository {
  public async create(body: Partial<IPassword>): Promise<void> {
    await Password.create(body);
  }

  public async findById(userId: string): Promise<IPassword[]> {
    return await Password.find({ _userId: userId });
  }

  public async deleteBeforeDate(date: Date): Promise<number> {
    const result = await Password.deleteMany({ createdAt: { $lt: date } });
    return result.deletedCount;
  }
}

export const passwordRepository = new PasswordRepository();
