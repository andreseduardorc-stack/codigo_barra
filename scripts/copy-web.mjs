// Copia los archivos de la app web a www/, que es lo que Capacitor mete dentro del APK.
// La raíz del repo sigue sirviendo la versión web (GitHub Pages) sin cambios.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www');
const files = ['zxing.min.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];

rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of files) cpSync(join(root, f), join(out, f));

// Runtime de Capacitor (expone Filesystem y Share al JavaScript de la app)
cpSync(join(root, 'node_modules/@capacitor/core/dist/capacitor.js'), join(out, 'capacitor.js'));

const marker = '<script src="zxing.min.js"></script>';
const html = readFileSync(join(root, 'index.html'), 'utf8');
if (!html.includes(marker)) throw new Error(`index.html no contiene ${marker}`);
writeFileSync(join(out, 'index.html'), html.replace(marker, `<script src="capacitor.js"></script>\n  ${marker}`));

console.log(`www/ listo (${files.length + 2} archivos)`);
