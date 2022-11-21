import { unauthorized } from "@worker-tools/response-creators";
import { JSONResponse } from "@worker-tools/json-fetch";

export interface Env {
  DEBUG: boolean;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (env.DEBUG) {
      console.log(request.cf?.botManagement.score);
    }
    if (request.cf?.botManagement.score == 99) {
      return fetch("https://week2.michielcloud.workers.dev");
    }
    if (request.cf?.botManagement.score == 1) {
      return new JSONResponse(
        { message: "NO! Bad Bot!", error: true },
        unauthorized()
      );
    }
    return fetch("http://worldtimeapi.org/api/ip", {
      cf: { cacheTtl: 30, cacheEverything: true },
    });
  },
};
