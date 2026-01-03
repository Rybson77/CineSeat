// js/CinemaView.js
export default class CinemaView {
    constructor() {
        this.container = document.getElementById('seat-map');
        this.countElement = document.getElementById('count');
        this.totalElement = document.getElementById('total');
        this.movieSelect = document.getElementById('movie');
        this.roleSelect = document.getElementById('role-select');
        this.adminControls = document.getElementById('admin-controls');
        this.resetBtn = document.getElementById('reset-btn');
    }

    
    renderSeats(rows, seatsPerRow, seatState) {
        this.container.innerHTML = '';

        for (let i = 0; i < rows * seatsPerRow; i++) {
            const seat = document.createElement('div');
            
            //Styles definiton 
            //TODO move to CSS file
            let seatClasses = 'seat-item flex justify-center items-center group relative';
            let iconClass = 'text-seat-available transition-colors group-hover:text-primary';
            let iconStyle = '';

            
            if (seatState.occupied.includes(i)) {
                seatClasses += ' seat-occupied cursor-not-allowed'; // Occupied (White)
                iconClass = 'text-seat-occupied';
                iconStyle = "font-variation-settings: 'FILL' 1";
            } else if (seatState.selected.includes(i)) {
                seatClasses += ' seat-selected'; // Selected (Blue)
                iconClass = 'text-primary';
                iconStyle = "font-variation-settings: 'FILL' 1";
            } else {
                iconStyle = "font-variation-settings: 'FILL' 0"; // Available (Gray)
            }

            seat.className = seatClasses;
            seat.dataset.index = i; 
            
            seat.innerHTML = `
                <span class="material-symbols-outlined text-3xl ${iconClass}" style="${iconStyle}">
                    event_seat
                </span>
            `;

            this.container.appendChild(seat);
        }
    }

    
    updateStats(count, price) {
        this.countElement.innerText = count;
        this.totalElement.innerText = price;
    }

    
    setMovieSelectValue(price) {
        this.movieSelect.value = price;
    }

    // TODO ADMIN PANEL
    toggleAdminMode(isAdmin) {
        if (isAdmin) {
            this.adminControls.classList.remove('hidden');
        } else {
            this.adminControls.classList.add('hidden');
        }
    }

    // --- BINDING EVENTS ---
    //Passing events to controller

    bindSelectSeat(handler) {
        this.container.addEventListener('click', event => {
            const seatDiv = event.target.closest('.seat-item');
            if (seatDiv) {
                const index = parseInt(seatDiv.dataset.index);
                handler(index);
            }
        });
    }

    bindSelectMovie(handler) {
        this.movieSelect.addEventListener('change', event => {
            handler(+event.target.value);
        });
    }

    bindRoleChange(handler) {
        this.roleSelect.addEventListener('change', event => {
            handler(event.target.value);
        });
    }

    bindReset(handler) {
        this.resetBtn.addEventListener('click', () => {
            if(confirm("Jste si jistí? Smaže to všechny rezervace.")) {
                handler();
            }
        });
    }
}