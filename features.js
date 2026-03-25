// ════════════════════════════════════════════════════════════════════════════
// TECHDIAG v2.5 - CARACTERÍSTICAS ADICIONALES
// ════════════════════════════════════════════════════════════════════════════

// 1️⃣ DARK/LIGHT MODE TOGGLE
function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-btn');
  if (!themeBtn) return;
  
  const savedTheme = localStorage.getItem('techdiag_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.textContent = '☀️';
  }
  
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('techdiag_theme', isLight ? 'light' : 'dark');
  });
}

// 2️⃣ LOCALSTORAGE - GUARDAR Y RESTAURAR PROGRESO
function saveProgress() {
  const state = {
    solvedIds: Array.from(solvedIds),
    solvedCount: solvedCount,
    currentCat: currentCat,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('techdiag_progress', JSON.stringify(state));
}

function loadProgress() {
  const saved = localStorage.getItem('techdiag_progress');
  if (saved) {
    try {
      const state = JSON.parse(saved);
      solvedIds = new Set(state.solvedIds || []);
      solvedCount = state.solvedCount || 0;
      return true;
    } catch(e) {
      console.warn('No se pudo cargar progreso:', e);
    }
  }
  return false;
}

// 3️⃣ RESET BUTTON - REINICIAR PROGRESO
function setupResetButton() {
  const resetBtn = document.getElementById('reset-btn');
  if (!resetBtn) return;
  
  resetBtn.addEventListener('click', () => {
    if (confirm('¿Reiniciar todo? Se borrarán todos los progresos guardados.')) {
      localStorage.removeItem('techdiag_progress');
      solvedIds.clear();
      solvedCount = 0;
      currentProblem = null;
      currentStep = 0;
      updateCounts();
      renderGrid(problems);
      
      const diagBody = document.getElementById('diag-body');
      if (diagBody) {
        diagBody.innerHTML = `
          <div class="empty-diag">
            <div class="big-icon">⚡</div>
            <p>¡Progreso reiniciado! Listo para comenzar de nuevo.</p>
          </div>`;
      }
      
      const progressSec = document.getElementById('progress-section');
      if (progressSec) progressSec.style.display = 'none';
      
      alert('Progreso restablecido correctamente.');
    }
  });
}

// 4️⃣ CARGAR PROBLEMAS ADICIONALES
async function loadExtraProblems() {
  try {
    const res = await fetch('problems-extra.json');
    if (res.ok) {
      const extraProblems = await res.json();
      problems.push(...extraProblems);
      console.log(`✅ ${extraProblems.length} problemas adicionales cargados. Total: ${problems.length}`);
      updateCounts();
    }
  } catch(e) {
    console.warn('⚠️ Problemas extra no disponibles. Usando solo problemas base.');
  }
}

// 5️⃣ ESTADÍSTICAS DETALLADAS
function getDetailedStats() {
  const criticalCount = problems.filter(p => p.severity === 'critical').length;
  const mediumCount = problems.filter(p => p.severity === 'medium').length;
  const lowCount = problems.filter(p => p.severity === 'low').length;
  
  const savedState = localStorage.getItem('techdiag_progress');
  const lastUpdate = savedState 
    ? new Date(JSON.parse(savedState).timestamp).toLocaleString('es-AR') 
    : 'Nunca';
  
  return {
    total: problems.length,
    solved: solvedCount,
    remaining: problems.length - solvedCount,
    criticalCount: criticalCount,
    mediumCount: mediumCount,
    lowCount: lowCount,
    successRate: Math.round((solvedCount / problems.length) * 100) || 0,
    lastUpdate: lastUpdate,
    categories: {
      red: problems.filter(p => p.cat === 'red').length,
      hardware: problems.filter(p => p.cat === 'hardware').length,
      software: problems.filter(p => p.cat === 'software').length,
      seguridad: problems.filter(p => p.cat === 'seguridad').length,
      rendimiento: problems.filter(p => p.cat === 'rendimiento').length
    }
  };
}

// 6️⃣ EXPORTAR RESULTADOS
function exportProgressJSON() {
  const stats = getDetailedStats();
  const solvedProblems = problems
    .filter(p => solvedIds.has(p.id))
    .map(p => ({
      id: p.id,
      titulo: p.title,
      categoria: p.cat,
      severidad: p.severity,
      tiempo: p.time
    }));
  
  const exportData = {
    version: '2.5',
    estadisticas: stats,
    problemasResueltos: solvedProblems,
    fechaExportacion: new Date().toLocaleString('es-AR'),
    navegador: navigator.userAgent
  };
  
  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `techdiag-resultados-${new Date().getTime()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  console.log('✅ Resultados exportados:', exportData);
}

// 7️⃣ BÚSQUEDA CON SUGERENCIAS
function enhanceSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  
  const originalSearch = searchInput.getAttribute('oninput');
  searchInput.addEventListener('focus', function() {
    if (this.value.length === 0) {
      this.setAttribute('placeholder', 'Escribe para buscar (mín 2 caracteres)');
    }
  });
}

// 8️⃣ AUTO-GUARDAR CADA 5 SEGUNDOS
function enableAutoSave() {
  setInterval(() => {
    if (solvedCount > 0 || solvedIds.size > 0) {
      saveProgress();
    }
  }, 5000);
}

// 9️⃣ INFORMACIÓN DEL SISTEMA
function showSystemInfo() {
  const info = {
    navegador: navigator.userAgent,
    plataforma: navigator.platform,
    linguaje: navigator.language,
    online: navigator.onLine,
    memoria: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'N/A',
    procesadores: navigator.hardwareConcurrency || 'N/A'
  };
  console.log('📊 Info del sistema:', info);
  return info;
}

// 🔟 INICIALIZACIÓN COMPLETA
async function initializeFeatures() {
  console.log('🚀 Inicializando TechDiag v2.5...');
  
  // Temas
  setupThemeToggle();
  
  // Cargar progreso guardado
  const hasProgress = loadProgress();
  if (hasProgress) console.log('📂 Progreso restaurado');
  
  // Cargar problemas extra
  await loadExtraProblems();
  
  // Setup botones
  setupResetButton();
  enhanceSearch();
  
  // Auto-guardar
  enableAutoSave();
  
  // Mostrar stats
  console.log('📈 Estadísticas actuales:', getDetailedStats());
  console.log('✅ TechDiag v2.5 listo');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFeatures);
} else {
  initializeFeatures();
}
