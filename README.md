# 📦 Escáner de Códigos & Control de Inventario para Bodega

Aplicación web ligera, moderna y completamente *client-side* (sin necesidad de backend ni base de datos externa) diseñada para la captura de códigos de barra y códigos QR en labores de inventario, toma de activos fijos y gestión de bodegas desde teléfonos móviles o computadores.

---

## 🚀 Características Principales

### 1. 📷 Doble Motor de Escaneo en Tiempo Real
* **Motor Nativo (`BarcodeDetector API`):** Utiliza la aceleración por hardware del navegador en dispositivos compatibles (Android / Chrome), brindando lecturas ultrarrápidas y bajo consumo de batería.
* **Motor Universal de Respaldo (`ZXing Library`):** Garantiza compatibilidad en navegadores y plataformas sin soporte nativo (iOS / Safari / navegadores de escritorio).
* **Control de rebote (Cooldown):** Evita capturas accidentales consecutivas del mismo código dentro de una ventana de enfriamiento.

### 2. 📊 Modos de Operación
* **Modo Conteo (Inventario Agrupado):**
  * Al escanear el mismo código repetidas veces, no duplica registros; incrementa la cantidad acumulada (`x1, x2, x3...`) y actualiza la última hora de captura.
  * Incluye controles directos `+` y `−` para ajustar unidades manualmente en pantalla.
* **Modo Trazabilidad (1 a 1):**
  * Registra cada escaneo como una fila independiente con su marca temporal individual exacta.

### 3. 🔦 Control de Linterna (Flash) y Cámaras
* **Linterna integrada:** Botón flotante para activar el flash LED del dispositivo (`track.applyConstraints({ torch })`), facilitando la lectura en pasillos oscuros, estanterías o bodegas sin luz adecuada.
* **Conmutador de cámara:** Permite alternar entre la cámara trasera principal y la cámara frontal.

### 4. ⌨️ Entrada Manual de Códigos
* Campo de texto directo con botón `+ Agregar` para ingresar manualmente códigos cuando una etiqueta esté sucia, rota, arrugada o ilegible para la cámara.

### 5. 📂 Catálogo Maestro de Productos
* Permite cargar un archivo CSV con la base de datos de productos (`codigo,nombre_producto,ubicacion`).
* Al escanear o ingresar un código, la aplicación muestra instantáneamente el **nombre del producto** y su **ubicación física en bodega** (ej. *📍 Pasillo B-12*).
* Los datos del catálogo quedan almacenados localmente en el dispositivo.

### 6. 🔕 Feedback Silencioso (Visual y Háptico)
* **Visual:** La mira de enfoque parpadea en color verde cuando se captura un código.
* **Háptico:** Emite una vibración corta (`navigator.vibrate`) para que el operario sienta la confirmación táctil.
* **Sin sonidos:** Diseñado para operar en entornos donde no se requiera o no se desee emitir pitidos.

### 7. 🗑️ Gestión Individual de Registros
* Botón de eliminación por fila (`✕`) para corregir lecturas erróneas puntuales sin perder el resto del trabajo.
* Botón de vaciado general con solicitud de confirmación.

### 8. 📲 Exportación y Compartir
* **Descarga CSV:** Formato tabular universal optimizado para Microsoft Excel (con cabecera UTF-8 BOM para evitar problemas con acentos o caracteres especiales).
* **Exportación JSON:** Datos estructurados listos para ser consumidos por APIs o integrados en sistemas ERP/WMS.
* **Compartir Directo (Web Share API):** Botón `📲 Compartir` para enviar el archivo `.csv` directamente por **WhatsApp**, **Correo**, **Google Drive** o **OneDrive** desde el móvil.

---

## 📋 Estructura del Archivo de Catálogo (CSV)

Para cargar tu base de datos de bodega, puedes subir un archivo `.csv` o `.txt` con el siguiente formato (con o sin encabezado, usando coma `,` o punto y coma `;` como separador):

```csv
codigo,nombre_producto,ubicacion
7801234567890,Taladro Percutor 20V Inalámbrico,Pasillo B - Rack 4
7809876543210,Caja de Tornillos Drywall 6x1-5/8,Pasillo A - Bandeja 12
7805556667778,Guantes de Seguridad Nitrilo Talla L,Zona EPP - Módulo 2
```

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 & CSS3:** Diseño responsivo *mobile-first*, tema oscuro (*Dark Mode*) de alto contraste para almacenes.
* **JavaScript Moderno (ES6+ Vanilla):** Sin frameworks pesados; carga instantánea y mínima huella en memoria.
* **Barcode Detection API:** API estándar de hardware para escaneo nativo.
* **ZXing JS:** `@zxing/library` para compatibilidad multiplataforma.
* **Web Storage API (`localStorage`):** Persistencia automática de lecturas y catálogo; no se pierden datos al recargar la página o cerrar el navegador.
* **MediaStream ImageCapture API:** Control de cámara, enfoque continuo y activación de antorcha/linterna (*torch*).
* **Web Share API:** Integración con aplicaciones nativas para compartir archivos.

---

## 💻 Cómo Ejecutar Localmente

1. Clona este repositorio o descarga los archivos:
   ```bash
   git clone https://github.com/andreseduardorc-stack/codigo_barra.git
   cd codigo_barra
   ```

2. Inicia un servidor web local (necesario para permitir acceso a la cámara):
   * Con **Python**:
     ```bash
     python -m http.server 8000
     ```
   * O con **Node.js**:
     ```bash
     npx serve .
     ```

3. Abre en tu navegador preferido:
   ```text
   http://localhost:8000
   ```

---

## 📱 Despliegue para Uso en Celulares (HTTPS)

Los navegadores móviles requieren **conexión segura (HTTPS)** para permitir el acceso a la cámara. Puedes publicar esta app de forma inmediata y gratuita mediante:

* **GitHub Pages:**
  1. Ve a los **Settings** de este repositorio en GitHub.
  2. En el menú lateral, selecciona **Pages**.
  3. En *Branch*, elige `main` y la carpeta `/ (root)`, luego guarda.
  4. En unos minutos tendrás tu URL HTTPS lista para abrir desde cualquier celular.
* **Otras opciones:** Arrastrar la carpeta a [Vercel](https://vercel.com) o [Netlify Drop](https://app.netlify.com/drop).
