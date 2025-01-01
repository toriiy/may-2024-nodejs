import { CronJob } from "cron";

const handler = async () => {
  console.log("hello");
};

export const testCron = new CronJob("* * * 12 * *", handler);
