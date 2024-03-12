import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  c.text('Hono')
})

export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World!');
  },
};