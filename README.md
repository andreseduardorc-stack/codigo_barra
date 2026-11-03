# 📦 Escáner de Códigos & Registro con Comentarios

Aplicación web ligera para la captura y registro manual de códigos de barra y códigos QR. Diseñada para bodegas, control de inventario y activos fijos, con captura manual bajo demanda, comentarios por código y exportación limpia a Excel o WhatsApp.

---

## 🚀 Cómo Funciona

1. **Captura Manual Bajo Demanda (Cero Duplicados Involuntarios):**
   * La cámara se mantiene activa en pantalla para enfocar, pero **nunca agrega códigos automáticamente**.
   * El operario apunta a la etiqueta y presiona el botón **`📸 Escanear Ahora`**.
   * También se incluye el botón **`⌨️ Escribir`** si la etiqueta está rota o manchada.

2. **Ventana de Confirmación y Comentario:**
   * Al escanear o escribir un código, se abre una ventana limpia que muestra el código y un campo para escribir una **observación o comentario opcional** (ej: *Caja dañada*, *Estante 3*, *Lote 2026*).
   * El registro **solo se guarda en la lista si el usuario presiona el botón `💾 Guardar`**. Si presiona `✕ Cancelar`, se descarta.

3. **Listado Limpio (Sin texto basura):**
   * Cada fila en pantalla muestra únicamente:
     * **Código** en tamaño grande.
     * **Comentario** (si se ingresó uno).
     * **Hora** de registro.
     * Botón `✕` para eliminar el registro si hubo una equivocación.

4. **Linterna / Flash:**
   * Botón flotante `🔦` en la cámara para encender la linterna del teléfono en lugares con poca luz.

5. **Exportación Directa:**
   * **📄 Descargar CSV:** Archivo limpio con columnas `Codigo,Comentario,Fecha_Hora` listo para abrir en Microsoft Excel (UTF-8 con BOM).
   * **📲 Compartir:** Permite enviar el archivo `.csv` directamente por **WhatsApp**, **Correo**, **Google Drive** o guardarlo en el teléfono.

---

## 📱 Acceso Online (GitHub Pages)

La aplicación está disponible en línea en:

👉 **[https://andreseduardorc-stack.github.io/codigo_barra/](https://andreseduardorc-stack.github.io/codigo_barra/)**

---

## 🛠️ Tecnologías

* **HTML5 / CSS3:** Tema oscuro, interfaz táctil pensada para uso con una sola mano.
* **JavaScript (Vanilla):** Sin librerías pesadas, funciona 100% en el dispositivo del usuario sin enviar datos a servidores externos.
* **Barcode Detection API & ZXing Library:** Doble motor de lectura rápida.
* **Web Storage API (`localStorage`):** Los códigos guardados no se pierden al recargar o cerrar la página.
