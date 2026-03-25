// ═══════════════════════════════════════════════════════════════════════════
// EXTENSIÓN DE FUNCIONALIDAD - NUEVAS CARACTERÍSTICAS
// ═══════════════════════════════════════════════════════════════════════════

// 🎨 DARK/LIGHT MODE
function setupThemeToggle() {
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.textContent = '☀️';
  }
  
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// 💾 LOCALSTORAGE - GUARDAR PROGRESO
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
    const state = JSON.parse(saved);
    solvedIds = new Set(state.solvedIds);
    solvedCount = state.solvedCount;
    currentCat = state.currentCat;
    return true;
  }
  return false;
}

// 🔄 RESET BUTTON
function setupResetButton() {
  const resetBtn = document.getElementById('reset-btn');
  resetBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro? Se borrarán todos los progresos.')) {
      localStorage.removeItem('techdiag_progress');
      solvedIds.clear();
      solvedCount = 0;
      currentProblem = null;
      currentStep = 0;
      updateCounts();
      renderGrid(problems);
      document.getElementById('diag-body').innerHTML = `
        <div class="empty-diag">
          <div class="big-icon">⚡</div>
          <p>Progreso reiniciado. ¡Listo para empezar de nuevo!</p>
        </div>`;
      document.getElementById('progress-section').style.display = 'none';
    }
  });
}

// 🎯 OVERRIDE INIT FUNCTION
const originalInit = init;
function init() {
  // Cargar tema guardado
  setupThemeToggle();
  
  // Cargar progreso
  loadProgress();
  
  // Ejecutar init original
  originalInit();
  
  // Setup reset button
  setupResetButton();
  
  // Guardar progreso cada segundo
  setInterval(saveProgress, 5000);
  
  // Actualizar contador cada vez que se resuelve un problema
  const originalAdvanceStep = advanceStep;
  window.advanceStep = function(choice) {
    originalAdvanceStep(choice);
    saveProgress();
  };
}

// 📊 ESTADÍSTICAS MEJORADAS
function showStats() {
  const criticalProblems = problems.filter(p => p.severity === 'critical').length;
  const mediumProblems = problems.filter(p => p.severity === 'medium').length;
  const lowProblems = problems.filter(p => p.severity === 'low').length;
  
  const savedState = localStorage.getItem('techdiag_progress');
  const lastUpdate = savedState ? new Date(JSON.parse(savedState).timestamp).toLocaleString('es-AR') : 'Nunca';
  
  return {
    total: problems.length,
    solved: solvedCount,
    remaining: problems.length - solvedCount,
    criticalCount: criticalProblems,
    mediumCount: mediumProblems,
    lowCount: lowProblems,
    lastUpdate: lastUpdate,
    successRate: Math.round((solvedCount / problems.length) * 100)
  };
}

// 🔍 BÚSQUEDA MEJORADA CON SUGERENCIAS
function getSearchSuggestions(query) {
  if (!query || query.length < 2) return [];
  
  const q = query.toLowerCase();
  return problems
    .filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.desc.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      title: p.title,
      icon: p.icon
    }));
}

// 📥 EXPORTAR RESULTADOS COMO JSON
function exportResults() {
  const stats = showStats();
  const data = {
    estadisticas: stats,
    problemasResueltos: Array.from(solvedIds),
    detalles: solvedIds.size > 0 
      ? problems.filter(p => solvedIds.has(p.id)).map(p => ({
          id: p.id,
          titulo: p.title,
          categoria: p.cat,
          severidad: p.severity
        }))
      : [],
    fechaExporta: new Date().toLocaleString('es-AR')
  };
  
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `techdiag_resultados_${new Date().getTime()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// 🎬 AGREGAR ANIMACIONES MEJORADAS
function enhanceAnimations() {
  // Fade-in mejorado en tarjetas
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slide-in-left {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
}

// ⚙️ INICIALIZAR EXTENSIONES
document.addEventListener('DOMContentLoaded', () => {
  enhanceAnimations();
});
