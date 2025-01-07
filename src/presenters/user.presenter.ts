import { config } from "../configs/config";
import { IUser } from "../interfaces/user.interface";

class UserPresenter {
  public toResponse(entity: IUser) {
    return {
      id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      role: entity.role,
      avatar: entity.avatar ? `${config.awsS3Endpoint}/${entity.avatar}` : null,
      phone: entity.phone,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

export const userPresenter = new UserPresenter();
