export default class CinemaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding events
        this.view.bindSelectSeat(this.handleSeatClick.bind(this));
        this.view.bindSelectMovie(this.handleMovieChange.bind(this));
        this.view.bindRoleChange(this.handleRoleChange.bind(this));
        this.view.bindBookTickets(this.handleBooking.bind(this));
        
        // Admin bindings
        this.view.bindAddMovie(this.handleAddMovie.bind(this));
        this.view.bindDeleteMovie(this.handleDeleteMovie.bind(this));
        this.view.bindReset(this.handleReset.bind(this));

        
        this.initView();
    }

    initView() {
        this.renderAll();
    }

    
    renderAll() {
        const movies = this.model.getMovies();
        const currentIdx = this.model.currentMovieIndex;
        this.view.renderMovieOptions(movies, currentIdx);

        const seatStatus = this.model.getSeatStatus();
        
        this.view.renderSeats(seatStatus.totalSeats, seatStatus.occupied, seatStatus.selected);

    
        this.view.updateStats(this.model.getSelectedCount(), this.model.getTotalPrice());
    }

    handleSeatClick(index) {
        this.model.toggleSeatSelection(index);
        this.renderAll(); 
    }

    handleMovieChange(index) {
        this.model.setCurrentMovie(index);
        this.renderAll();
    }

    handleBooking() {
        const success = this.model.bookTickets();
        if (success) {
            alert("Rezervace úspěšná! Sedadla jsou nyní obsazena.");
            this.renderAll();
        } else {
            alert("Vyberte prosím alespoň jedno sedadlo.");
        }
    }

    // --- Adm Functions ---

    handleRoleChange(role) {
        this.view.toggleAdminMode(role === 'admin');
    }

    handleAddMovie() {
        const data = this.view.getNewMovieData();
        if (data) {
            this.model.addMovie(data.title, data.price, data.totalSeats);
            this.renderAll();
            alert(`Film ${data.title} byl přidán.`);
        } else {
            alert("Vyplňte prosím všechna pole.");
        }
    }

    handleDeleteMovie() {
        if(confirm("Opravdu smazat tento film?")) {
            const success = this.model.deleteCurrentMovie();
            if(success) this.renderAll();
        }
    }

    handleReset() {
        if(confirm("Vymazat obsazenost sálu u tohoto filmu?")) {
            this.model.resetCurrentHall();
            this.renderAll();
        }
    }
}