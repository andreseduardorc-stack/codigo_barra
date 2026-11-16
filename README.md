# 📦 BodegaScan — Escáner de Códigos & Registro con Campos Adicionales

Aplicación ligera para capturar y registrar códigos de barra y QR en bodegas, control de inventario y activos fijos. Funciona **sin conexión**, como página web (PWA) o como **app Android instalable (APK)**.

---

## 🚀 Cómo funciona

1. **Captura manual bajo demanda.** La cámara está activa para enfocar, pero **nunca guarda sola**: el operario presiona **`📸 Escanear Ahora`**. Si hay varios códigos en cuadro, se toma el más cercano al centro de la mira. Con **`⌨️ Escribir`** se ingresa a mano si la etiqueta está dañada.

2. **Ventana de confirmación con campos adicionales.**
   * Muestra el código (editable) y el **Campo adicional 1**.
   * **`➕ Agregar campo adicional`** suma tantos campos como se necesiten.
   * **Cada campo tiene su botón `📷`**: abre la cámara a pantalla completa y captura un código directamente en ese campo. Sirve para ítems con **más de un código identificador** (por ejemplo: código de producto, número de serie y lote).
   * Si un código ya está en otro campo del mismo registro, el visor lo marca como «Ya capturado».
   * Se guarda solo al presionar **`💾 Guardar`**. Si el código ya existe en la lista, pide confirmación.
   * Un lector Bluetooth que termina con Enter pasa al siguiente campo; en el último, guarda.

3. **Solo fecha (sin hora)**, en la hora local del teléfono (`AAAA-MM-DD`).

4. **Listado limpio**: código, campos adicionales numerados y fecha. El botón `✕` elimina con opción **Deshacer**.

5. **Linterna** `🔦` en equipos que la soportan.

6. **Exportación CSV (Excel)** con columnas dinámicas:
   ```csv
   Codigo,Campo adicional 1,Campo adicional 2,Fecha
   "780123456","Caja sellada","SN-99812","2026-11-16"
   ```
   * Las celdas que empiezan con `=`, `+`, `-` o `@` llevan un apóstrofo delante para que Excel no las ejecute como fórmula.
   * **📲 Compartir** envía el `.csv` por WhatsApp, correo, Drive, etc.
   * En la app Android, **📄 Descargar CSV** lo guarda en `Documentos/BodegaScan/`.

---

## 📱 Versión web (GitHub Pages)

👉 **[https://andreseduardorc-stack.github.io/codigo_barra/](https://andreseduardorc-stack.github.io/codigo_barra/)**

Para usarla sin cobertura hay que abrirla **una vez con internet** (el Service Worker guarda la app en el teléfono). Al publicar cambios, sube `VERSION` en `sw.js` y `APP_VERSION` en `index.html`.

---

## 🤖 App Android (APK, sin PWABuilder)

El APK lleva todos los archivos dentro, así que **abre siempre sin conexión**, incluso la primera vez.

### Instalar en el teléfono
1. Copia `BodegaScan.apk` al teléfono (cable, Drive, WhatsApp…).
2. Ábrelo y acepta **«Instalar apps de origen desconocido»** cuando Android lo pida.
3. La primera vez que se abra, acepta el permiso de **cámara**.

### Generar el APK (Windows)
Requisitos: Node.js, JDK 21 y Android SDK (Android Studio).

> ⚠️ El plugin de Android **no compila en rutas con tildes o eñes** (por ejemplo `San Sebastián`). Se resuelve montando la carpeta como una unidad:
> ```bat
> subst B: "C:\ruta\con\tilde\app_scaneo"
> ```
> y ejecutando todo desde `B:\`.

```bat
npm install
npm run apk
```

El APK queda en `android\app\build\outputs\apk\debug\app-debug.apk`.

* `index.html` en la raíz es la única fuente: `npm run build:web` la copia a `www/` y le agrega el runtime de Capacitor.
* El APK de depuración se firma con la llave de depuración de **este** equipo. Para actualizar la app instalada sin desinstalarla, compila siempre en el mismo equipo (o crea una llave de firma propia).

---

## 🛠️ Tecnologías

* **HTML5 / CSS3 / JavaScript (Vanilla)**, sin build ni frameworks. Todo se procesa en el dispositivo; no se envían datos a servidores.
* **Barcode Detection API** (Android/Chrome) con **ZXing** como respaldo (iPhone y equipos sin detector nativo).
* **PWA**: `manifest.json` + Service Worker (red primero, caché de respaldo).
* **Capacitor 8** para el APK Android (plugins Filesystem y Share).
* **localStorage** para los registros. Si se borran los datos de la app o del navegador, se pierden: exporta el CSV al terminar cada jornada.
