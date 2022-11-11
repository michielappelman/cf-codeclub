interface Environment {
  DEBUG: boolean;
}

interface JSONResponse {
  message: string;
  error: boolean;
}

type ResponseMessage = string | JSONResponse;

export default {
  async fetch(request: Request, env: Environment): Promise<Response> {
    // Default reply will be a JSON message and if we didn't change it,
    // something probalby went wrong.
    let response: ResponseMessage = {
      message: "Something went wrong.",
      error: true,
    };

    if (env.DEBUG) {
      console.log(`HTTP Method: ${request.method}`);
    }
    switch (request.method) {
      case "GET":
        response = "Hello to you in plain text!";
        break;
      case "POST":
        const name = new URL(request.url).searchParams.get("name");
        if (env.DEBUG) {
          console.log(`name: ${name}`);
        }

        if (!name) {
          response = { message: "Missing parameter `name`", error: true };
          break;
        }

        response = { message: `Hello to you, ${name}!`, error: false };
        break;
      default:
        response = { message: "Unsupported HTTP method", error: true };
    }

    // If the response is an object, it's safe to assume it should be returned
    // as JSON. Otherwise just return it as plain text.
    if (typeof response === "object") {
      return new Response(JSON.stringify(response), {
        headers: { "content-type": "application/json" },
      });
    } else {
      return new Response(response, {
        headers: { "content-type": "text/plain" },
      });
    }
  },
};
