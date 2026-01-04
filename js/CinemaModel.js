export default class CinemaModel {
    constructor() {
        // Load from LS
        const storedMovies = JSON.parse(localStorage.getItem('cinemaMovies'));
        
        if (storedMovies && storedMovies.length > 0) {
            this.movies = storedMovies;
        } else {
            // Default films
            this.movies = [
                { id: 1, title: 'Avengers: Endgame', price: 250, totalSeats: 48, occupied: [2, 3, 10, 11] },
                { id: 2, title: 'Joker', price: 200, totalSeats: 32, occupied: [5, 6, 7] },
                { id: 3, title: 'Toy Story 4', price: 180, totalSeats: 64, occupied: [] }
            ];
        }

        
        this.currentMovieIndex = 0;
        this.selectedSeatsBuffer = []; 
    }

    

    getMovies() {
        return this.movies;
    }

    getCurrentMovie() {
        return this.movies[this.currentMovieIndex];
    }

    setCurrentMovie(index) {
        this.currentMovieIndex = index;
        this.selectedSeatsBuffer = [];
    }

    addMovie(title, price, seats) {
        const newMovie = {
            id: Date.now(), //ID gen
            title: title,
            price: Number(price),
            totalSeats: Number(seats),
            occupied: [] 
        };
        this.movies.push(newMovie);
        this._saveToStorage();
        this.currentMovieIndex = this.movies.length - 1; 
    }

    deleteCurrentMovie() {
        if (this.movies.length <= 1) {
            alert("Nemůžeš smazat poslední film!");
            return false;
        }
        this.movies.splice(this.currentMovieIndex, 1);
        this.currentMovieIndex = 0;
        this._saveToStorage();
        return true;
    }

    // Used for rendering seats status
    getSeatStatus() {
        const movie = this.getCurrentMovie();
        return {
            totalSeats: movie.totalSeats,
            occupied: movie.occupied,          // White (Occupied)
            selected: this.selectedSeatsBuffer // Blue (Selected)
        };
    }

    // Logic for selecting/deselecting seats
    toggleSeatSelection(seatIndex) {
        const movie = this.getCurrentMovie();
        if (movie.occupied.includes(seatIndex)) {
            return; 
        }
        if (this.selectedSeatsBuffer.includes(seatIndex)) {
            this.selectedSeatsBuffer = this.selectedSeatsBuffer.filter(id => id !== seatIndex);
        } else {
            this.selectedSeatsBuffer.push(seatIndex);
        }
    }

    // Reservation from blue => white
    bookTickets() {
        if (this.selectedSeatsBuffer.length === 0) return false;
        const movie = this.getCurrentMovie();
        movie.occupied.push(...this.selectedSeatsBuffer);
        this.selectedSeatsBuffer = [];
        this._saveToStorage();
        return true;
    }

    resetCurrentHall() {
        this.getCurrentMovie().occupied = [];
        this.selectedSeatsBuffer = [];
        this._saveToStorage();
    }

    getTotalPrice() {
        return this.selectedSeatsBuffer.length * this.getCurrentMovie().price;
    }

    getSelectedCount() {
        return this.selectedSeatsBuffer.length;
    }

    _saveToStorage() {
        localStorage.setItem('cinemaMovies', JSON.stringify(this.movies));
    }
}