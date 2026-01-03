
const container = document.getElementById('seat-map');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const roleSelect = document.getElementById('role-select');
const adminControls = document.getElementById('admin-controls');
const resetBtn = document.getElementById('reset-btn');

// Konfigurace sálu (6 řad, 8 sedadel)
const rows = 6;
const seatsPerRow = 8;

// Načtení ceny filmu z LS nebo defaultní hodnota
let ticketPrice = +movieSelect.value;

// FUNKCE 1: Inicializace a vygenerování sálu
function init() {
    for (let i = 0; i < rows * seatsPerRow; i++) {
        const seat = document.createElement('div');
        
        // Tailwind
        seat.className = 'seat-item flex justify-center items-center group relative';
        
        // Vložíme ikonu
        seat.innerHTML = `
            <span class="material-symbols-outlined text-3xl text-seat-available transition-colors group-hover:text-primary" style="font-variation-settings: 'FILL' 1">
                event_seat
            </span>
        `;

        seat.dataset.index = i;
        
        container.appendChild(seat);
    }
    
    loadData();
}

// FUNKCE 2: Ukládání do LocalStorage
function updateSelectedCount() {
   
    const selectedSeats = document.querySelectorAll('.seat-item.seat-selected');

    // Získáme jejich indexy
    const seatsIndex = [...selectedSeats].map(seat => [...container.children].indexOf(seat));
    console.log(seatsIndex);
    // Uložíme do LS
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    localStorage.setItem('selectedMoviePrice', movieSelect.value);

    // Aktualizace textu na stránce
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// FUNKCE 3: Načtení dat z LocalStorage
function loadData() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        const allSeats = container.querySelectorAll('.seat-item');
        
        selectedSeats.forEach(index => {
            if (allSeats[index]) {
                // Přidáme vizuální třídu
                allSeats[index].classList.add('seat-selected');
                // Změníme barvu ikony uvnitř
                const icon = allSeats[index].querySelector('span');
                icon.classList.remove('text-seat-available');
                icon.classList.add('text-primary', 'drop-shadow-glow');
            }
        });
    }

    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if (selectedMoviePrice !== null) {
        movieSelect.value = selectedMoviePrice;
        ticketPrice = +selectedMoviePrice;
    }
    
    
    updateSelectedCount();
}

// EVENT LISTENER: Kliknutí na sedadlo
container.addEventListener('click', e => {
    // Řešíme kliknutí na ikonu (span) nebo div
    // Použijeme .closest, abychom chytili hlavní div sedadla
    const seatDiv = e.target.closest('.seat-item');

    if (seatDiv && !seatDiv.classList.contains('seat-occupied')) {
        // Toggle třídy pro logiku
        seatDiv.classList.toggle('seat-selected');
        
        // Manipulace s ikonou uvnitř (aby svítila)
        const icon = seatDiv.querySelector('span');
        if (seatDiv.classList.contains('seat-selected')) {
            icon.classList.remove('text-seat-available');
            icon.classList.add('text-primary', 'drop-shadow-glow');
        } else {
            icon.classList.add('text-seat-available');
            icon.classList.remove('text-primary', 'drop-shadow-glow');
        }

        updateSelectedCount();
    }
});

// EVENT LISTENER: Změna filmu
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
});

// EVENT LISTENER: Změna role (Jednoduchá logika pro demo)
roleSelect.addEventListener('change', e => {
    const role = e.target.value;
    if (role === 'admin') {
        adminControls.classList.remove('hidden');
    } else {
        adminControls.classList.add('hidden');
    }
});

// EVENT LISTENER: Reset (Admin)
resetBtn.addEventListener('click', () => {
    if(confirm("Opravdu vymazat všechny rezervace?")) {
        localStorage.clear();
        window.location.reload();
    }
});


init();