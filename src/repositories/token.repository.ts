import { IToken, ITokenPairWithUserId } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(data: ITokenPairWithUserId): Promise<IToken> {
    return await Token.create(data);
  }

  public async findByParams(params: Partial<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await Token.findOneAndDelete({ userId });
  }
}

export const tokenRepository = new TokenRepository();
