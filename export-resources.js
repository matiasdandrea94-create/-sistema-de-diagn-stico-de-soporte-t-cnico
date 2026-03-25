// ════════════════════════════════════════════════════════════════════════════
// TECHDIAG v2.6 - PDF & EXTERNAL RESOURCES
// ════════════════════════════════════════════════════════════════════════════

// 7️⃣ EXPORTAR COMO HTML IMPRIMIBLE (PDF)
function exportProgressHTML() {
  const stats = getDetailedStats();
  const solvedProblems = Array.from(solvedIds)
    .map(id => problems.find(p => p.id === id))
    .filter(p => p);

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechDiag - Reporte de Diagnósticos</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 40px 20px; }
    .container { background: white; max-width: 900px; margin: 0 auto; padding: 50px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .header { border-bottom: 3px solid #0084d4; margin-bottom: 30px; padding-bottom: 15px; }
    h1 { color: #0084d4; font-size: 32px; margin-bottom: 5px; }
    .subtitle { color: #999; font-size: 14px; }
    h2 { color: #333; margin-top: 30px; margin-bottom: 15px; font-size: 18px; border-left: 4px solid #00e5ff; padding-left: 12px; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
    .stat-box { background: linear-gradient(135deg, #f5f7fa 0%, #eff2f5 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #0084d4; }
    .stat-number { font-size: 36px; font-weight: bold; color: #0084d4; line-height: 1; }
    .stat-label { font-size: 12px; color: #666; text-transform: uppercase; margin-top: 8px; letter-spacing: 1px; }
    .stat-critical .stat-number { color: #d94456; border-color: #d94456; }
    .stat-medium .stat-number { color: #ffc107; }
    .stat-low .stat-number { color: #00ff88; }
    .problems-list { margin-top: 15px; }
    .problem-item { background: #f9f9f9; border-left: 4px solid #00e5ff; padding: 15px; margin-bottom: 12px; border-radius: 4px; page-break-inside: avoid; }
    .problem-title { font-weight: bold; color: #333; font-size: 15px; }
    .problem-desc { color: #666; font-size: 13px; margin-top: 5px; }
    .problem-info { font-size: 11px; color: #999; margin-top: 8px; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 3px; font-size: 10px; margin-right: 5px; }
    .badge-critical { background: #ffebee; color: #d94456; }
    .badge-medium { background: #fff3e0; color: #ff9800; }
    .badge-low { background: #e8f5e9; color: #4caf50; }
    .empty { text-align: center; color: #999; padding: 30px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 11px; color: #999; text-align: center; }
    .print-hint { background: #e3f2fd; border: 1px solid #2196F3; padding: 10px; border-radius: 4px; margin-bottom: 20px; font-size: 12px; }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; padding: 40px; page-break-after: avoid; }
      .print-hint { display: none; }
      .problem-item { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 TechDiag - Reporte de Diagnósticos</h1>
      <p class="subtitle">Sistema de Diagnóstico de Soporte Técnico</p>
    </div>

    <div class="print-hint">
      💡 <strong>Tip:</strong> Presiona Ctrl+P (Cmd+P en Mac) para imprimir como PDF
    </div>
    
    <h2>📈 Resumen General</h2>
    <div class="stats">
      <div class="stat-box">
        <div class="stat-number">${stats.total}</div>
        <div class="stat-label">Problemas</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${stats.solved}</div>
        <div class="stat-label">Resueltos</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">${stats.successRate}%</div>
        <div class="stat-label">Tasa Éxito</div>
      </div>
    </div>

    <h2>⚠️ Distribución por Severidad</h2>
    <div class="stats">
      <div class="stat-box stat-critical">
        <div class="stat-number">${stats.criticalCount}</div>
        <div class="stat-label">🔴 Críticos</div>
      </div>
      <div class="stat-box stat-medium">
        <div class="stat-number">${stats.mediumCount}</div>
        <div class="stat-label">🟡 Medios</div>
      </div>
      <div class="stat-box stat-low">
        <div class="stat-number">${stats.lowCount}</div>
        <div class="stat-label">🟢 Bajos</div>
      </div>
    </div>

    <h2>📂 Categorías</h2>
    <div class="stats" style="grid-template-columns: repeat(5, 1fr); font-size: 12px;">
      <div class="stat-box"><div style="font-size: 20px; color: #0084d4;">${stats.categories.red}</div><div class="stat-label">Red</div></div>
      <div class="stat-box"><div style="font-size: 20px; color: #0084d4;">${stats.categories.hardware}</div><div class="stat-label">Hardware</div></div>
      <div class="stat-box"><div style="font-size: 20px; color: #0084d4;">${stats.categories.software}</div><div class="stat-label">Software</div></div>
      <div class="stat-box"><div style="font-size: 20px; color: #0084d4;">${stats.categories.seguridad}</div><div class="stat-label">Seguridad</div></div>
      <div class="stat-box"><div style="font-size: 20px; color: #0084d4;">${stats.categories.rendimiento}</div><div class="stat-label">Rendimiento</div></div>
    </div>

    <h2>✅ Problemas Resueltos</h2>
    <div class="problems-list">
      ${solvedProblems.length > 0 
        ? solvedProblems.map(p => `
            <div class="problem-item">
              <div class="problem-title">${p.icon} ${p.title}</div>
              <div class="problem-desc">${p.desc}</div>
              <div class="problem-info">
                <span class="badge badge-${p.severity}">${p.severity.toUpperCase()}</span>
                <span style="color: #999;">• Categoría:</span> <strong>${p.cat}</strong>
                <span style="color: #999; margin-left: 15px;">• Tiempo estimado:</span> <strong>${p.time}</strong>
              </div>
            </div>
          `).join('')
        : '<div class="empty"><p>No hay problemas resueltos aún.</p><p style="font-size: 12px; margin-top: 10px;">¡Comienza a practicar para ver tus logros aquí!</p></div>'
      }
    </div>

    <div class="footer">
      <p><strong>Generado:</strong> ${new Date().toLocaleString('es-AR')}</p>
      <p><strong>Versión:</strong> TechDiag v2.6 | <strong>Tasa Éxito:</strong> ${stats.successRate}%</p>
      <p style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;">
        Si necesitas convertir esto a PDF: abre en navegador → Ctrl+P → Guarda como PDF
      </p>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `techdiag-reporte-${new Date().getTime()}.html`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert('✅ Reporte generado como HTML\n\nPista: Abre el archivo и presiona Ctrl+P para convertir a PDF');
}

// 8️⃣ BASE DE RECURSOS EXTERNOS POR PROBLEMA
const externalResources = {
  'p1': [
    { name: 'Solucionar problemas de conexión (Microsoft)', url: 'https://support.microsoft.com/es-es/help/4025955' },
    { name: 'DNS Público Google', url: 'https://developers.google.com/speed/public-dns' },
    { name: 'DNS Cloudflare', url: 'https://1.1.1.1/' }
  ],
  'p2': [
    { name: 'Analizador de Pantalla Azul (Nirsoft)', url: 'https://www.nirsoft.net/utils/blue_screen_view.html' },
    { name: 'Guía BSOD (Microsoft)', url: 'https://support.microsoft.com/es-es/help/14238' },
    { name: 'WhoCrashed', url: 'https://www.resplendence.com/whocrashed' }
  ],
  'p3': [
    { name: 'WinDirStat', url: 'https://windirstat.net/' },
    { name: 'CCleaner', url: 'https://www.ccleaner.com/es-es' },
    { name: 'Disk Usage Analyzer', url: 'https://www.splitter.com/' }
  ],
  'p5': [
    { name: 'HWMonitor', url: 'https://www.cpuid.com/softwares/hwmonitor.html' },
    { name: 'Core Temp', url: 'https://www.alcpu.com/CoreTemp/' },
    { name: 'GPU-Z', url: 'https://www.techpowerup.com/gpuz/' }
  ],
  'p6': [
    { name: 'Malwarebytes', url: 'https://www.malwarebytes.com/es/malwarebytes' },
    { name: 'HitmanPro', url: 'https://www.hitmanpro.com/es-es' },
    { name: 'Windows Defender Offline', url: 'https://www.microsoft.com/es-es/windows/comprehensive-security' }
  ],
  'p10': [
    { name: 'DisplayDriverUninstaller', url: 'https://www.guru3d.com/files-details/display-driver-uninstaller-download.html' },
    { name: 'Nvidia Drivers', url: 'https://www.nvidia.com/es-es/geforce/drivers/' },
    { name: 'AMD Drivers', url: 'https://www.amd.com/es/technologies/radeon-drivers' }
  ],
  'p12': [
    { name: 'Afterburner', url: 'https://www.msi.com/page/afterburner' },
    { name: 'FPS Counter', url: 'https://github.com/clsid2/dx12info' }
  ]
};

// MOSTRAR RECURSOS EN EL PANEL
function getResourcesHTML(problemId) {
  const resources = externalResources[problemId];
  if (!resources || resources.length === 0) return '';
  
  let html = '<div style="margin-top: 16px; padding: 12px; background: rgba(123,97,255,0.08); border-left: 3px solid #7b61ff; border-radius: 4px;">';
  html += '<strong style="color: #7b61ff; display: block; margin-bottom: 10px; font-size: 0.8rem;">📚 Recursos Útiles:</strong>';
  
  resources.forEach(res => {
    html += `<a href="${res.url}" target="_blank" style="display: block; color: #00e5ff; text-decoration: none; font-size: 0.73rem; margin: 6px 0; padding: 4px 0; border-radius: 2px; transition: all 0.2s;">→ ${res.name}</a>`;
  });
  
  html += '</div>';
  return html;
}

// INTEGRAR RECURSOS AL DIAGNOST PANEL
const originalOpenDiag = openDiag;
window.openDiag = function(problem) {
  originalOpenDiag(problem);
  
  setTimeout(() => {
    const diagBody = document.getElementById('diag-body');
    if (diagBody && !diagBody.querySelector('.resources-section')) {
      const resourcesHTML = getResourcesHTML(problem.id);
      if (resourcesHTML) {
        const resourcesDiv = document.createElement('div');
        resourcesDiv.className = 'resources-section';
        resourcesDiv.innerHTML = resourcesHTML;
        diagBody.appendChild(resourcesDiv);
      }
    }
  }, 100);
};

// AGREGAR BOTONES DE EXPORT
function addExportButtonsToHeader() {
  const originalInit = window.init;
  window.init = function() {
    originalInit();
    
    // Esperar a que el DOM esté listo
    setTimeout(() => {
      const diagHeader = document.querySelector('.diag-header');
      if (diagHeader && !document.getElementById('export-controls')) {
        const exportDiv = document.createElement('div');
        exportDiv.id = 'export-controls';
        exportDiv.style.cssText = 'display:flex; gap:8px; margin-top:12px; justify-content:flex-end;';
        exportDiv.innerHTML = `
          <button onclick="exportProgressJSON()" style="padding:6px 12px; font-size:0.7rem; background:rgba(123,97,255,0.2); color:#7b61ff; border:1px solid #7b61ff; border-radius:3px; cursor:pointer; font-family:monospace; font-weight:600;">📥 JSON</button>
          <button onclick="exportProgressHTML()" style="padding:6px 12px; font-size:0.7rem; background:rgba(0,255,136,0.15); color:#00ff88; border:1px solid #00ff88; border-radius:3px; cursor:pointer; font-family:monospace; font-weight:600;">📄 HTML+PDF</button>
        `;
        diagHeader.appendChild(exportDiv);
      }
    }, 500);
  };
}

// INICIALIZAR EXPORT BUTTONS
addExportButtonsToHeader();

console.log('✅ TechDiag v2.6 - Exportación PDF y Recursos Externos activados');
