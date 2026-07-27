/**
 * Wanderlust Chile Travel - Application Controller
 * Coordinación de cliente, interacciones UI y tarifas en CLP.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configurar fechas por defecto (hoy + 7 días)
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const departureInput = document.getElementById('departure-date');
    const returnInput = document.getElementById('return-date');

    if (departureInput) departureInput.value = today.toISOString().split('T')[0];
    if (returnInput) returnInput.value = nextWeek.toISOString().split('T')[0];

    // Toggle de Modo Oscuro / Claro
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeToggleBtn.textContent = '🌙 Modo Oscuro';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = '☀️ Modo Claro';
        }
    });

    // Control de Banner de Políticas
    const closeBannerBtn = document.getElementById('close-banner');
    const policyBanner = document.getElementById('policy-banner');
    if (closeBannerBtn && policyBanner) {
        closeBannerBtn.addEventListener('click', () => {
            policyBanner.style.display = 'none';
        });
    }

    // Tabs de Búsqueda
    const tabBtns = document.querySelectorAll('.tab-btn');
    const resultsTitle = document.getElementById('results-title');
    let currentMode = 'flights';

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.getAttribute('data-tab');

            if (currentMode === 'flights') {
                resultsTitle.textContent = 'Vuelos Nacionales Disponibles';
                loadFlightResults();
            } else if (currentMode === 'hotels') {
                resultsTitle.textContent = 'Hoteles y Lodges Chilenos';
                loadHotelResults();
            } else {
                resultsTitle.textContent = 'Paquetes Turísticos por Chile';
                loadPackageResults();
            }
        });
    });

    // Formulario de Búsqueda
    const searchForm = document.getElementById('booking-search-form');
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;

        if (currentMode === 'flights') {
            await loadFlightResults({ origin, destination });
        } else if (currentMode === 'hotels') {
            await loadHotelResults({ destination });
        } else {
            await loadPackageResults();
        }
    });

    // Carga Inicial
    loadFlightResults();
});

async function loadFlightResults(params = {}) {
    const container = document.getElementById('results-container');
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">🔍 Buscando vuelos nacionales en CLP...</p>';
    
    if (window.flightService) {
        const flights = await window.flightService.searchFlights(params);
        container.innerHTML = flights.map(f => window.flightService.renderFlightCard(f)).join('');
    }
}

async function loadHotelResults(params = {}) {
    const container = document.getElementById('results-container');
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">🏨 Consultando disponibilidad en lodges y hoteles chilenos...</p>';
    
    if (window.hotelService) {
        const hotels = await window.hotelService.searchHotels(params);
        container.innerHTML = hotels.map(h => window.hotelService.renderHotelCard(h)).join('');
    }
}

async function loadPackageResults() {
    const container = document.getElementById('results-container');
    const formatCLP = (amount) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    container.innerHTML = `
        <div class="result-card">
            <div class="card-header">
                <span class="airline-info">🏔️ Paquete Magia de Atacama (4D/3N)</span>
                <span class="price-tag">${formatCLP(349000)} CLP</span>
            </div>
            <div class="card-details">
                <p><strong>Incluye:</strong> Vuelo Santiago-Calama ida/vuelta LATAM, 3 noches en Lodge San Pedro, Tour Valle de la Luna y Geysers del Tatio.</p>
                <p><span class="badge badge-success">✓ Tarifa Flex - Cambios sin penalización</span></p>
            </div>
            <button class="btn btn-primary" onclick="alert('Iniciando reserva del paquete Atacama')">Reservar Paquete Atacama</button>
        </div>

        <div class="result-card">
            <div class="card-header">
                <span class="airline-info">🌲 Paquete Circuito Torres del Paine (5D/4N)</span>
                <span class="price-tag">${formatCLP(680000)} CLP</span>
            </div>
            <div class="card-details">
                <p><strong>Incluye:</strong> Vuelo Santiago-Puerto Natales, 4 noches en Hotel Explora, pase CONAF incluido y excursiones guiadas.</p>
                <p><span class="badge badge-success">✓ Tarifa Flex - Garantía CONAF 2026</span></p>
            </div>
            <button class="btn btn-primary" onclick="alert('Iniciando reserva del paquete Torres del Paine')">Reservar Paquete Patagonia</button>
        </div>

        <div class="result-card">
            <div class="card-header">
                <span class="airline-info">🗿 Paquete Rapa Nui místico (6D/5N)</span>
                <span class="price-tag">${formatCLP(850000)} CLP</span>
            </div>
            <div class="card-details">
                <p><strong>Incluye:</strong> Vuelo Santiago-Isla de Pascua, Hotel Cabañas Rapa Nui, Tour Ahu Tongariki y trámite de ingreso estandarizado.</p>
                <p><span class="badge badge-success">✓ FlexiCLP - Reembolsable 100%</span></p>
            </div>
            <button class="btn btn-primary" onclick="alert('Iniciando reserva del paquete Rapa Nui')">Reservar Paquete Rapa Nui</button>
        </div>
    `;
}
