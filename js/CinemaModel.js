export default class CinemaModel {
    constructor() {
        this.selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
        this.moviePrice = +localStorage.getItem('selectedMoviePrice') || 250; // Defaultní cena

        // TODO: This will be editable
        this.occupiedSeats = [3, 4, 18, 19, 45]; 
    }

    
    getSeatsState() {
        return {
            selected: this.selectedSeats,
            occupied: this.occupiedSeats
        };
    }

    getMoviePrice() {
        return this.moviePrice;
    }

    
    setMoviePrice(price) {
        this.moviePrice = price;
        localStorage.setItem('selectedMoviePrice', price);
    }

    
    toggleSeat(index) {
        if (this.occupiedSeats.includes(index)) {
            return; 
        }

        if (this.selectedSeats.includes(index)) {
            this.selectedSeats = this.selectedSeats.filter(seatIndex => seatIndex !== index);
        } else {
            this.selectedSeats.push(index);
        }
        this._saveToLocalStorage();
    }

    getTotalPrice() {
        return this.selectedSeats.length * this.moviePrice;
    }

    getSelectedCount() {
        return this.selectedSeats.length;
    }

    // TODO ADMIN PANEL
    resetAll() {
        this.selectedSeats = [];
        this._saveToLocalStorage();
    }

    
    _saveToLocalStorage() {
        localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
    }
}