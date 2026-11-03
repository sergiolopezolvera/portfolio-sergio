# Conectar los formularios a Google Sheets y Drive

Ya existen en tu Drive, dentro de **Seminario SIG para México 2026**:

- la hoja **Registro SIG para México 2026** (aquí caen los registros y las fichas de ponencia),
- la carpeta **Archivos de ponentes** (aquí se guardan las diapositivas).

## 1. Pegar el script (5 minutos)

1. Abre la hoja **Registro SIG para México 2026**.
2. Menú **Extensiones → Apps Script**.
3. Borra lo que haya en `Código.gs` y pega todo el contenido de `Codigo.gs` (este directorio).
4. Guarda (icono de disco).

## 2. Autorizar

1. En la barra de arriba elige la función **preparar** y presiona **Ejecutar**.
2. Google pedirá permisos (hoja, Drive y enviar correo). Acepta con tu cuenta.
   Si aparece "Google no verificó esta app", entra a *Configuración avanzada → Ir a … (no seguro)*: es tu propio script.
3. Revisa la hoja: deben aparecer las pestañas **Registro** y **Ponencias** con sus encabezados.

## 3. Publicar como aplicación web

1. **Implementar → Nueva implementación → Tipo: Aplicación web**.
2. *Ejecutar como*: **Yo**. *Quién tiene acceso*: **Cualquier usuario**.
3. Copia la URL que termina en `/exec`.

## 4. Conectar el sitio

En `app/sig-para-mexico/config.ts` pega la URL:

```ts
export const FORMULARIOS_URL = "https://script.google.com/macros/s/…/exec";
```

Haz commit y push. Vercel publica el cambio.

## 5. Cuando tengas los webinars de Teams

En el script, llena `CONFIG.TEAMS` con el enlace de cada sesión y vuelve a
**Implementar → Gestionar implementaciones → Editar → Versión: nueva**.
Los registros que lleguen después recibirán el enlace en su correo de confirmación.
A quienes se registraron antes, mándales los enlaces desde la hoja (columna Correo).

## Límites a tener en cuenta

- Una cuenta personal de Gmail puede enviar unos **100 correos al día** desde Apps Script.
  La función `preparar` imprime cuántos te quedan. Si el registro crece mucho en un día,
  los correos de confirmación fallarán, pero el registro sí se guarda.
- Archivos de ponentes: hasta **25 MB** (PDF o PowerPoint).
- Si alguien se registra dos veces con el mismo correo, se actualiza su fila en lugar de duplicarla.
