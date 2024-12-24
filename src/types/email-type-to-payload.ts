import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailCombinedPayloadType } from "./email-combined-payload.type";
import { PickRequired } from "./pick-required.type";

export type EmailTypeToPayloadType = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailCombinedPayloadType,
    "name" | "frontUrl"
  >;
  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailCombinedPayloadType,
    "actionToken" | "name" | "frontUrl"
  >;
  [EmailTypeEnum.OLD_VISIT]: PickRequired<
    EmailCombinedPayloadType,
    "name" | "frontUrl"
  >;
  [EmailTypeEnum.LOG_OUT]: PickRequired<EmailCombinedPayloadType, "name">;
};
