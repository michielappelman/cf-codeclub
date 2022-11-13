interface Environment {
  DEBUG: boolean;
}

export default {
  async fetch(request: Request, env: Environment): Promise<Response> {
    let response: string;

    if (env.DEBUG) {
      console.log(`HTTP Method: ${request.method}`);
    }
    switch (request.method) {
      case "GET":
        response = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<title>Michiel's Hi-sayer</title>
<link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/htmx/1.8.4/htmx.min.js"></script>
</head>
<body><header><h1>Allow me to say Hi</h1><hr></header>
<section><form id="nameform" hx-post="/" hx-target="#nameform" hx-swap="outerHTML">
  <label for="name">Your name:</label><br>
  <input type="text" id="name" name="name">
  <button type="submit">Say Hi!</button>
</form></section>
<footer><a href="https://github.com/michielappelman/cf-codeclub/blob/main/week1-typescript/src/index.ts">Source</a></footer>
</body></html>`;
        break;
      case "POST":
        const data = await request.formData();
        const name = data.get("name");
        if (env.DEBUG) {
          console.log(name);
        }

        if (!name) {
          response = "<h2>Please provide your name...</h2>";
          break;
        }

        response = `<h2>Hi, ${name}!</h2>`;
        break;
      default:
        response = "<html><body><h2>Unsupported method</h2></body></html>";
    }

    return new Response(response, {
      headers: { "content-type": "text/html" },
    });
  },
};
