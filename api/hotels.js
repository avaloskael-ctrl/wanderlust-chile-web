/**
 * Módulo de Servicio de Integración con Hoteles y Lodges Chilenos
 * Desarrollado para resolver la discusión planteada en Issue #12 (feature/integracion-hoteles)
 * Precios expresados en Pesos Chilenos (CLP)
 */

class HotelService {
    constructor() {
        this.mockHotels = [
            {
                id: "HT-ATC-01",
                name: "Hotel & Spa Tierra Atacama 🏔️",
                location: "San Pedro de Atacama, Antofagasta",
                stars: "⭐⭐⭐⭐⭐",
                pricePerNightCLP: 185000,
                cancellationPolicy: "Cancelación sin costo hasta 48h antes",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
            },
            {
                id: "HT-PNT-02",
                name: "Explora Patagonia Lodge 🌲",
                location: "Parque Nacional Torres del Paine, Magallanes",
                stars: "⭐⭐⭐⭐⭐",
                pricePerNightCLP: 290000,
                cancellationPolicy: "Incluye pase CONAF y reprogramación flexible",
                image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
            },
            {
                id: "HT-PUC-03",
                name: "Hotel Enjoy Pucón & Casino 🌋",
                location: "Pucón, Región de La Araucanía",
                stars: "⭐⭐⭐⭐",
                pricePerNightCLP: 95000,
                cancellationPolicy: "Reembolsable hasta 24h antes del check-in",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80"
            }
        ];
    }

    formatCLP(amount) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    }

    async searchHotels(searchParams) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockHotels);
            }, 500);
        });
    }

    renderHotelCard(hotel) {
        return `
            <div class="result-card">
                <div>
                    <div class="card-header">
                        <span class="hotel-info">${hotel.name}</span>
                        <span class="price-tag">${this.formatCLP(hotel.pricePerNightCLP)} /noche</span>
                    </div>
                    <div class="card-details">
                        <p><strong>Ubicación:</strong> ${hotel.location} (${hotel.stars})</p>
                        <p><strong>Política:</strong> <span class="badge badge-success">${hotel.cancellationPolicy}</span></p>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="alert('Iniciando reserva en ${hotel.name}')">Reservar Hotel</button>
            </div>
        `;
    }
}

window.hotelService = new HotelService();
