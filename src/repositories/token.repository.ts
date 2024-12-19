import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(user: any): Promise<IToken> {
    return await Token.create(user);
  }

  public async findByParams(params: Partial<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }
}

export const tokenRepository = new TokenRepository();
