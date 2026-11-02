
const path = require('path');
const {createRequire} = require('module');
const root = path.resolve(__dirname, '..');
const req = createRequire(path.join(root, 'package.json'));
const {bundle} = req('@remotion/bundler');
const {selectComposition, renderStill} = req('@remotion/renderer');
(async () => {
  const [comp, slug, out, ...secs] = process.argv.slice(2);
  const serveUrl = await bundle({entryPoint: path.join(root, 'src/motor/index.ts'), publicDir: path.join(root, 'public-motor')});
  const composition = await selectComposition({serveUrl, id: comp, inputProps: {slug, plano: null}});
  for (const s of secs) {
    const f = Math.round(Number(s) * composition.fps);
    await renderStill({composition, serveUrl, frame: f, output: path.join(out, `t${s}.png`), inputProps: composition.props});
    console.log('ok', s);
  }
})().catch((e) => { console.error(e); process.exit(1); });
