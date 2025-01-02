import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { passwordRepository } from "../repositories/password.repository";

const handler = async () => {
  try {
    const date = timeHelper.subtractCurrentByParams(180, "days");
    const count = await passwordRepository.deleteBeforeDate(date);
    console.log(`Deleted ${count} old passwords`);
  } catch (e) {
    console.error(e.message);
  }
};

export const removeOldPasswords = new CronJob("*/30 * * * * *", handler);
