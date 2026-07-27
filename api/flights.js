/**
  // Módulo de búsqueda de vuelos para Chile en CLP
 */

class FlightService {
    constructor() {
        this.mockFlights = [
            {
                id: "FL-SCL-CJC",
                airline: "LATAM Airlines Chile ✈️",
                flightNumber: "LA150",
                origin: "Santiago (SCL)",
                destination: "Calama / Atacama (CJC)",
                departureTime: "06:15 AM",
                arrivalTime: "08:25 AM",
                duration: "2h 10m (Directo)",
                priceCLP: 45900,
                policyFlexible: true,
                seatsAvailable: 6
            },
            {
                id: "FL-SCL-PNT",
                airline: "SKY Airline ✈️",
                flightNumber: "H2031",
                origin: "Santiago (SCL)",
                destination: "Puerto Natales / Torres del Paine (PNT)",
                departureTime: "07:30 AM",
                arrivalTime: "10:45 AM",
                duration: "3h 15m (Directo)",
                priceCLP: 89900,
                policyFlexible: true,
                seatsAvailable: 4
            },
            {
                id: "FL-SCL-IPC",
                airline: "LATAM Airlines Rapa Nui ✈️",
                flightNumber: "LA841",
                origin: "Santiago (SCL)",
                destination: "Isla de Pascua / Rapa Nui (IPC)",
                departureTime: "09:40 AM",
                arrivalTime: "13:30 PM",
                duration: "5h 50m (Directo)",
                priceCLP: 295000,
                policyFlexible: true,
                seatsAvailable: 3
            },
            {
                id: "FL-SCL-PMC",
                airline: "JetSMART Chile ✈️",
                flightNumber: "JA240",
                origin: "Santiago (SCL)",
                destination: "Puerto Montt / Chiloé (PMC)",
                departureTime: "14:10 PM",
                arrivalTime: "15:55 PM",
                duration: "1h 45m (Directo)",
                priceCLP: 32500,
                policyFlexible: false,
                seatsAvailable: 10
            }
        ];
    }

    /**
     * Realiza la búsqueda de vuelos nacionales en Chile.
     * @param {Object} searchParams 
     * @returns {Promise<Array>}
     */
    async searchFlights(searchParams) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = this.mockFlights.filter(flight => {
                    const matchOrigin = !searchParams.origin || flight.origin.toLowerCase().includes(searchParams.origin.toLowerCase());
                    const matchDest = !searchParams.destination || flight.destination.toLowerCase().includes(searchParams.destination.toLowerCase());
                    return matchOrigin || matchDest;
                });
                resolve(results.length > 0 ? results : this.mockFlights);
            }, 400);
        });
    }

    /**
     * Formatea la cifra en moneda chilena (CLP).
     */
    formatCLP(amount) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    }

    /**
     * Renderizado dinámico de la tarjeta de vuelo.
     */
    renderFlightCard(flight) {
        return `
            <div class="result-card">
                <div>
                    <div class="card-header">
                        <span class="airline-info">${flight.airline}</span>
                        <span class="price-tag">${this.formatCLP(flight.priceCLP)} CLP</span>
                    </div>
                    <div class="card-details">
                        <p><strong>Ruta:</strong> ${flight.origin} ➔ ${flight.destination}</p>
                        <p><strong>Vuelo:</strong> ${flight.flightNumber} | ${flight.duration}</p>
                        <p><strong>Horario:</strong> ${flight.departureTime} a ${flight.arrivalTime}</p>
                        <p><strong>Cupos disponibles:</strong> ${flight.seatsAvailable} asientos</p>
                        <p>
                            ${flight.policyFlexible 
                                ? '<span class="badge badge-success">✓ FlexiCLP - Reembolso 100% o cambio sin multa</span>' 
                                : '<span class="badge badge-warning">⚠ Tarifa Promo - Cambio con cargo</span>'}
                        </p>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="alert('Iniciando reserva en CLP para el vuelo ${flight.flightNumber}')">Reservar Vuelo</button>
            </div>
        `;
    }
}

window.flightService = new FlightService();
