
import CinemaModel from './CinemaModel.js';
import CinemaView from './CinemaView.js';
import CinemaController from './CinemaController.js';


document.addEventListener('DOMContentLoaded', () => {
    const app = new CinemaController(new CinemaModel(), new CinemaView());
});