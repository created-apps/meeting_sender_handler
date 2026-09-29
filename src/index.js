import "dotenv/config";
import { createCalendarClient } from "./calendar.js";
import { readConfig } from "./config.js";
import { MeetingCron } from "./scheduler.js";

try {
  const config = readConfig();
  const calendar = createCalendarClient(config);
  const scheduler = new MeetingCron({
    calendar,
    calendarId: config.calendarId,
    workerUrl: config.workerUrl,
  });
  scheduler.start();
  console.info(
    `[Cron] Polling ${config.calendarId} every minute and dispatching to ${config.workerUrl}`
  );
} catch (error) {
  console.error(`[Cron] Startup failed: ${error.stack || error}`);
  process.exit(1);
}
