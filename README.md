# 🚀 TechDiag v2.6 - Sistema de Diagnóstico de Soporte Técnico

## 📋 Descripción
**TechDiag** es un simulador interactivo que guía paso a paso a través de diagnósticos técnicos para resolver problemas comunes de computadoras. Incluye 21 problemas técnicos con soluciones detalladas.

---

## ✨ Características Implementadas

### 1. 🎨 **Tema Dark/Light Mode**
- Toggle en el header (🌙☀️)
- Tema guardado automáticamente en localStorage
- Light mode con colores claros y accesibles

### 2. 💾 **LocalStorage + Progreso Automático**
- Guarda progreso cada 5 segundos
- Restaura estado al reabrir el navegador
- Muestra timestamp del último acceso

### 3. 🔄 **Botón Reset**
- Reinicia todo el progreso
- Confirmación de seguridad
- Limpia localStorage completamente

### 4. 📚 **21 Problemas Técnicos**
**Problemas originales (12):**
- Sin conexión a internet
- Pantalla azul (BSOD)
- SO lento
- WiFi intermitente
- Equipo se sobrecalienta
- Posible virus/malware
- Impresora no imprime
- Disco duro casi lleno
- No puede acceder a sitios web
- Laptop no carga batería
- Cuenta bloqueada/contraseña olvidada
- Pantalla parpadea/artefactos

**Problemas nuevos (9):**
- Aplicación congela/no responde
- VPN no funciona
- Sin sonido o audio distorsionado
- Juego con lag/FPS bajo
- Instalador no abre
- Pop-ups/adware constante (crítico)
- Mouse/teclado no responden
- Windows Update falla
- Firewall bloquea aplicación

### 5. 📊 **Estadísticas Detalladas**
- Total de problemas
- Problemas resueltos
- Tasa de éxito (%)
- Breakdown por severidad
- Distribución por categoría
- Timestamp del último acceso

### 6. 🔍 **Búsqueda Mejorada**
- Busca en título, descripción y tags
- Resultados en tiempo real
- Filtrado por categorías

### 7. 📱 **Responsividad Mejorada**
- Layout adaptable para tablets (max-width: 800px)
- Sidebar horizontal en móvil
- Panel diagnóstico redimensionable
- Fuente legible en pantallas pequeñas

### 8. ✨ **Animaciones Suaves**
- fade-up en tarjetas
- slide-in-left en paneles  
- Transiciones theme 0.3s
- Pulse effects mejorados

### 9. 📥 **Exportar a JSON**
- Exporta resultados completos como JSON
- Incluye estadísticas y problemas resueltos
- Descarga automática

### 10. 📄 **Exportar a HTML/PDF**
- Genera reporte profesional en HTML
- Incluye gráficos y estadísticas
- **Para convertir a PDF:** Abre el HTML y presiona Ctrl+P
- Optimizado para impresión

### 11. 🔗 **Recursos Externos**
- Enlaces a herramientas recomendadas por problema
- Documentación oficial (Microsoft, NVIDIA, etc.)
- Abiertos en nueva pestaña

---

## 📁 Archivos del Proyecto

```
tech-support-diagnostics.html    ← Archivo principal
features.js                      ← Dark mode, localStorage, reset
export-resources.js              ← PDF export y recursos externos
problems-extra.json              ← 9 problemas adicionales
index.html                        ← Wrapper (opcional)
app.js                           ← Backup de funciones
README.md                        ← Este archivo
```

---

## 🚀 Cómo Usar

### Opción 1: Abrir directamente (Recomendado)
```
Abre: tech-support-diagnostics.html en tu navegador
```

### Opción 2: Con servidor local (Mejor para problemas-extra.json)
```bash
# Windows
python -m http.server 8000

# Mac/Linux
python3 -m http.server 8000

# Luego abre: http://localhost:8000
```

---

## 🎮 Guía de Uso

1. **Selecciona un problema** del grid central
2. **Sigue los pasos** del diagnóstico en el panel derecho
3. **Responde las preguntas** para avanzar
4. **Mira el progreso** en la barra superior
5. **Obtén resultado** (resuelto o escalado a Nivel 2)
6. **Exporta resultados** con los botones en el panel

### Controles Principales
- 🌙: Cambiar tema dark/light
- ↻: Reiniciar todo el progreso
- 📥: Exportar a JSON
- 📄: Exportar a HTML/PDF
- 🔍: Buscar problemas

---

## 💾 Datos Guardados

Todos los datos se guardan automáticamente en **localStorage**:
- Progreso (problemas resueltos)
- Tema elegido (dark/light)
- Timestamp del último acceso

Los datos persisten hasta que uses el botón **Reset**.

---

## 📊 Estadísticas

Accede a estadísticas detalladas presionando F12 (consola) y ejecutando:
```javascript
getDetailedStats()
```

Verás:
- Total de problemas
- Problemas resueltos
- Tasa de éxito
- Distribución por severidad
- Distribución por categoría

---

## 🌍 Recursos Externos Incluidos

Se incluyen enlaces a:
- **Microsoft Support** - Guías oficiales
- **NVIDIA/AMD** - Drivers
- **Nirsoft** - Herramientas diagnósticas
- **Google DNS** - Servidores públicos
- **Malwarebytes** - Antimalware
- Y muchas más...

---

## 🔧 Personalización

### Agregar nuevo tema
Edita `:root` en `<style>` del HTML

### Agregar nuevos problemas
Edita `problems-extra.json` o directamente el array `problems` en el HTML

### Cambiar colores
- Dark: Variables en `:root`
- Light: Variables en `body.light-mode`

---

## 📱 Compatibilidad

**Navegadores Soportados:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Requisitos:**
- localStorage habilitado
- JavaScript habilitado
- Resolución mínima: 320px (mobile)

---

## 🐛 Troubleshooting

### El progreso no se guarda
→ Verifica que localStorage esté habilitado en tu navegador

### problems-extra.json no carga
→ Asegúrate de usar un servidor local (localhost)

### PDF no se genera
→ Asegúrate de ser compatible con Ctrl+P (todos lo son)

### Recursos externos no aparecen
→ Verifica que export-resources.js esté en la misma carpeta

---

## 📈 Próximas Mejoras

- [ ] Base de datos en backend
- [ ] Usuario y login
- [ ] Certificados de finalización
- [ ] Gráficos avanzados
- [ ] Modo offline completo
- [ ] Integración con CRM

---

## 📄 Versión

**v2.6** - 25 de Marzo, 2026

---

## 👨‍💻 Desarrollo

Hecho con ❤️ para soporte técnico educativo.

**Stack:**
- HTML5 + CSS3 + JavaScript (vanilla)
- localStorage API
- Fetch API
- LocalStorage

---

## 📞 Soporte

Para reportar errores o sugerencias, abre la consola (F12) y verifica los logs.

---

**¡Gracias por usar TechDiag!** 🚀
