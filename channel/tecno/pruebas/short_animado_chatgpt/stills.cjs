// Fotogramas sueltos de la prueba con UN solo empaquetado (npx remotion still empaqueta cada vez).
// Uso: node channel/tecno/pruebas/short_animado_chatgpt/stills.cjs <carpeta_salida> <escala> f1 f2 ...
const path = require('path');
const {createRequire} = require('module');
const root = path.resolve(__dirname, '../../../../remotion');
const req = createRequire(path.join(root, 'package.json'));
const {bundle} = req('@remotion/bundler');
const {selectComposition, renderStill} = req('@remotion/renderer');

(async () => {
  const [out, scale, ...frames] = process.argv.slice(2);
  const serveUrl = await bundle({entryPoint: path.join(root, 'src/pruebas/index.ts'), publicDir: path.join(root, 'public-pruebas')});
  const composition = await selectComposition({serveUrl, id: 'ShortAnimadoChatgpt'});
  for (const f of frames) {
    await renderStill({composition, serveUrl, frame: Number(f), output: path.join(out, `f${f}.png`), scale: Number(scale)});
    console.log('ok', f);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
