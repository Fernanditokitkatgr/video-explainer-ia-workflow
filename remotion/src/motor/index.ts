// Entrada PROPIA del motor (no toca src/Root.tsx de producción, que make_tsx.py reescribe).
// Render: scripts/motor_plano.py <slug> --render   (usa la carpeta pública mínima remotion/public-motor)
import {registerRoot} from 'remotion';
import {MotorRoot} from './Root';
import './EscenasMundo'; // escenas de mundo persistente (pueblo): se registran solas en ESCENAS

registerRoot(MotorRoot);
