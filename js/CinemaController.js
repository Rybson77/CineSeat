export default class CinemaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // TODO: This will be editable
        this.rows = 6;
        this.seatsPerRow = 8;

        // Event Binding
        this.view.bindSelectSeat(this.handleSeatClick.bind(this));
        this.view.bindSelectMovie(this.handleMovieChange.bind(this));
        this.view.bindRoleChange(this.handleRoleChange.bind(this));
        this.view.bindReset(this.handleReset.bind(this));

        
        this.initView();
    }

    initView() {
        this.view.setMovieSelectValue(this.model.getMoviePrice());
    
        this.updateView();
    }

    updateView() {
        const seatState = this.model.getSeatsState();
        const count = this.model.getSelectedCount();
        const totalPrice = this.model.getTotalPrice();

        this.view.renderSeats(this.rows, this.seatsPerRow, seatState);
        this.view.updateStats(count, totalPrice);
    }


    handleSeatClick(index) {
        this.model.toggleSeat(index);
        this.updateView();
    }

    handleMovieChange(price) {
        this.model.setMoviePrice(price);
        this.updateView();
    }

    handleRoleChange(role) {
        const isAdmin = (role === 'admin');
        this.view.toggleAdminMode(isAdmin);
    }

    handleReset() {
        this.model.resetAll();
        this.updateView();
    }
}