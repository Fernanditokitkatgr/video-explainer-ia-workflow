// Entrada SEPARADA para pruebas de concepto: no toca src/Root.tsx (que make_tsx.py reescribe).
// Render: npx remotion render src/pruebas/index.ts ShortAnimadoChatgpt out/short_animado_chatgpt.mp4
import {registerRoot} from 'remotion';
import {PruebasRoot} from './Root';

registerRoot(PruebasRoot);
