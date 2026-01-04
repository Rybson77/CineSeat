export default class CinemaView {
    constructor() {
        this.container = document.getElementById('seat-map');
        this.movieSelect = document.getElementById('movie');
        this.countElement = document.getElementById('count');
        this.totalElement = document.getElementById('total');
        this.roleSelect = document.getElementById('role-select');

        // Admin elements
        this.adminPanel = document.getElementById('admin-panel');
        this.adminControls = document.getElementById('admin-controls'); 
        this.inputTitle = document.getElementById('new-movie-name');
        this.inputPrice = document.getElementById('new-movie-price');
        this.inputSeats = document.getElementById('new-movie-seats');
        this.addBtn = document.getElementById('add-movie-btn');
        this.deleteBtn = document.getElementById('delete-movie-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.bookBtn = document.getElementById('book-btn');
    }

    renderMovieOptions(movies, activeIndex) {
        this.movieSelect.innerHTML = '';
        movies.forEach((movie, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = `${movie.title} (${movie.price} Kč)`;
            option.className = "bg-surface-dark text-white";
            this.movieSelect.appendChild(option);
        });
        this.movieSelect.value = activeIndex;
    }

    renderSeats(totalSeats, occupiedList, selectedList) {
        this.container.innerHTML = ''; 
        for (let i = 0; i < totalSeats; i++) {
            const seat = document.createElement('div');
            let seatClasses = 'seat-item flex justify-center items-center group relative';
            let iconClass = 'text-seat-available transition-colors group-hover:text-primary';
            let iconStyle = "font-variation-settings: 'FILL' 1";

            if (occupiedList.includes(i)) {
                // White (occupied)
                seatClasses += ' seat-occupied pointer-events-none'; 
                iconClass = 'text-seat-occupied';
            } else if (selectedList.includes(i)) {
                // Blue (selected)
                seatClasses += ' seat-selected';
                iconClass = 'text-primary drop-shadow-glow';
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

    toggleAdminMode(isAdmin) {
        if (isAdmin) {
            this.adminPanel.classList.remove('hidden');
            this.adminPanel.classList.add('animate-fade-in-down'); 
        } else {
            this.adminPanel.classList.add('hidden');
        }
    }

    getNewMovieData() {
        const title = this.inputTitle.value;
        const price = this.inputPrice.value;
        const seats = this.inputSeats.value;
        
        if(!title || !price || !seats) return null;
        
        this.inputTitle.value = '';
        this.inputPrice.value = '';
        this.inputSeats.value = '';
        
        return { title, price, seats };
    }

    // Binding (Events to Controller)
    bindSelectSeat(handler) {
        this.container.addEventListener('click', e => {
            const seat = e.target.closest('.seat-item');
            if (seat) handler(parseInt(seat.dataset.index));
        });
    }

    bindSelectMovie(handler) {
        this.movieSelect.addEventListener('change', e => {
            handler(parseInt(e.target.value));
        });
    }

    bindRoleChange(handler) {
        this.roleSelect.addEventListener('change', e => handler(e.target.value));
    }

    bindAddMovie(handler) {
        this.addBtn.addEventListener('click', () => handler());
    }

    bindDeleteMovie(handler) {
        this.deleteBtn.addEventListener('click', () => handler());
    }
    
    bindBookTickets(handler) {
        this.bookBtn.addEventListener('click', () => handler());
    }

    bindReset(handler) {
        this.resetBtn.addEventListener('click', () => handler());
    }
}