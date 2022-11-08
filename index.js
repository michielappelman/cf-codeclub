export default {
  async fetch(request, env) {
    console.log(env);
    switch (request.method) {
      case "GET":
        return new Response("Hello to GET a worker!", {
          headers: {
            "content-type": "text/plain",
          },
        });
      case "POST": {
        let response = { message: "Hello to POST worker", error: false };
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json",
          },
        });
      }
      // I need curly braces here because the `response` variable is already
      // declared above and is not scoped to the `case` block by default.
      default: {
        let response = { message: "Unsupported HTTP method", error: true };
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "text/plain",
          },
        });
      }
    }
  },
};
