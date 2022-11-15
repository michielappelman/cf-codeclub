import { html, HTMLContent, HTMLResponse } from "@worker-tools/html";

export interface Env {
  DEBUG: boolean;
}

const ricks = [
  1, // regular
  265, // pickle
  220, // mega fruit farmer
  482, // secret service
];

type Rick = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
};

const baseLayout = (content: HTMLContent) => html`<!DOCTYPE html>
  <html>
    <head>
      <title>Random Rick</title>
      <link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css" />
    </head>
    <body>
      <header>
        <h1>Your random Rick is:</h1>
      </header>
      <main>
        ${content}
        <footer>
          <a href="https://github.com/michielappelman/cf-codeclub/blob/main/week2/src/index.ts">Source</a>
        </footer>
      </main>
    </body>
  </html>`;

async function getRick(id: number): Promise<Rick> {
  const rickRequest = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return rickRequest.json();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const randomInt = Math.floor(Math.random() * 4);
    const randomRick = await getRick(ricks[randomInt]);
    return new HTMLResponse(
      baseLayout(
        html`<section>
          <aside>
            <figure><img src="${randomRick.image}" /></figure>
            <br />
            <h3>${randomRick.name}</h3>
          </aside>
        </section>`
      )
    );
  },
};
