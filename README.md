# 📦 Escáner de Códigos & Registro con Múltiples Comentarios

Aplicación web ligera para la captura y registro manual de códigos de barra y códigos QR. Diseñada para bodegas, control de inventario y activos fijos, con captura bajo demanda, soporte de múltiples comentarios por código, registro exclusivo de fecha (sin hora) y exportación limpia a Excel o WhatsApp.

---

## 🚀 Cómo Funciona

1. **Captura Manual Bajo Demanda (Cero Duplicados Involuntarios):**
   * La cámara se mantiene activa en pantalla para enfocar, pero **nunca agrega códigos automáticamente**.
   * El operario apunta a la etiqueta y presiona el botón **`📸 Escanear Ahora`**.
   * También se incluye el botón **`⌨️ Escribir`** si la etiqueta está rota o manchada.

2. **Ventana de Confirmación y Múltiples Comentarios:**
   * Al escanear o escribir un código, se abre una ventana limpia que muestra el código y el campo para el primer comentario.
   * Con el botón **`➕ Agregar otro comentario`**, puedes añadir tantos campos de comentarios u observaciones adicionales como requieras (`comentario1`, `comentario2`, etc.).
   * El registro **solo se guarda en la lista si el usuario presiona el botón `💾 Guardar`**. Si presiona `✕ Cancelar`, se descarta.

3. **Solo Fecha (Sin Hora):**
   * La aplicación registra exclusivamente la **fecha** (`AAAA-MM-DD`), omitiendo horas, minutos o segundos para mantener las planillas limpias y consolidadas por día.

4. **Listado Limpio (Sin texto basura):**
   * Cada fila en pantalla muestra:
     * **Código** en tamaño grande y tipografía clara.
     * Lista de comentarios u observaciones asociadas al ítem.
     * **Fecha** de registro (`📅 YYYY-MM-DD`).
     * Botón `✕` para eliminar el registro si hubo una equivocación.

5. **Linterna / Flash:**
   * Botón flotante `🔦` en la cámara para encender la linterna del teléfono en lugares con poca luz.

6. **Exportación Directa CSV (Excel):**
   * Estructura dinámica según los comentarios agregados:
     ```csv
     Codigo,Comentario,comentario1,comentario2,Fecha
     "780123456","Caja sellada","Lote 4","Estante B","2026-11-04"
     ```
   * **📲 Compartir:** Permite enviar el archivo `.csv` directamente por **WhatsApp**, **Correo**, **Google Drive** o guardarlo en el teléfono.

---

## 📱 Acceso Online (GitHub Pages)

La aplicación está disponible en línea en:

👉 **[https://andreseduardorc-stack.github.io/codigo_barra/](https://andreseduardorc-stack.github.io/codigo_barra/)**

---

## 🛠️ Tecnologías

* **HTML5 / CSS3:** Tema oscuro, interfaz táctil pensada para uso con una sola mano.
* **JavaScript (Vanilla):** Sin librerías pesadas, funciona 100% en el dispositivo del usuario sin enviar datos a servidores externos.
* **Soporte PWA & Offline:** Incluye `manifest.json`, Service Worker e íconos para instalar en Android y operar sin conexión a internet.
* **Barcode Detection API & ZXing Library:** Doble motor de lectura rápida.
* **Web Storage API (`localStorage`):** Los códigos guardados no se pierden al recargar o cerrar la página.
