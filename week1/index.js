export default {
  async fetch(request, env) {
    // Default reply will be a JSON message and if we didn't change it,
    // something probalby went wrong.
    let response = { message: "Something went wrong.", error: true };
    let headers = { "content-type": "application/json" };

    if (env.DEBUG) {
      console.log(`HTTP Method: ${request.method}`);
    }
    switch (request.method) {
      case "GET":
        response = "Hello to you in plain text!";
        headers = { "content-type": "text/plain" };
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

    if (headers["content-type"] == "application/json") {
      return new Response(JSON.stringify(response), { headers: headers });
    } else {
      return new Response(response, { headers: headers });
    }
  },
};
