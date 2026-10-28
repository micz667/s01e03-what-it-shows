import { writeFileSync } from 'node:fs';
import { createServer } from 'vite';
import { render } from 'svelte/server';

const page = '/src/routes/kb/incidents/4471-causes/+page.svx';
const out = new URL('../src/routes/kb/incidents/4471-causes/as-the-desk-sees-it.html', import.meta.url);

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const mod = await vite.ssrLoadModule(page);
  const rendered = render(mod.default);
  const body = rendered.body ?? rendered.html ?? '';
  const head = rendered.head ?? '';
  const css = rendered.css?.code ?? '';
  const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${head}
${css ? `<style>${css}</style>` : ''}
</head>
<body>
${body}
</body>
</html>
`;
  writeFileSync(out, doc);
  console.log('wrote', out.pathname);
  console.log('body chars', body.length, 'css chars', css.length);
} finally {
  await vite.close();
}
