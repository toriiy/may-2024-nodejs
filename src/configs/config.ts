import { ObjectCannedACL } from "@aws-sdk/client-s3/dist-types/models/models_0";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri:
    process.env.MONGO_DB_URI || "mongodb://localhost:27017/express-mongo",
  frontUrl: process.env.FRONT_URL || "http://localhost:5000",

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,

  actionForgotPasswordSecret: process.env.ACTION_FORGOT_PASSWORD_SECRET,
  actionForgotPasswordExpiresIn: process.env.ACTION_FORGOT_PASSWORD_EXPIRES_IN,
  actionFEmailVerificationSecret: process.env.ACTION_EMAIL_VERIFICATION_SECRET,
  actionFEmailVerificationExpiresIn:
    process.env.ACTION_EMAIL_VERIFICATION_EXPIRES_IN,

  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,

  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsRegion: process.env.AWS_REGION,
  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
  awsS3ACL: process.env.AWS_S3_ACL as ObjectCannedACL,
  awsS3Endpoint: process.env.AWS_S3_ENDPOINT,
};
