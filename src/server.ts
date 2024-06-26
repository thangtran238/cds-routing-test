import { application } from "./app";
import * as cron from "node-cron";
import { systemRunner } from "./helpers/runner";
import { executeDecreaseLeaveDay } from "./helpers/leaveDayCalculation";
export class Server {
    public static async run() {
        const app = await application();

        // Run the server.
        const port = process.env.PORT || 3001;
        app.listen(port, async () => {
            cron.schedule("59 59 23 * * *", async () => {
                await systemRunner();
            });
            cron.schedule("0 0 0 * * *", async () => {
                await executeDecreaseLeaveDay();
            });
            console.info(`Server is listing at http://localhost:${port}`);
        });
    }
}

Server.run();
