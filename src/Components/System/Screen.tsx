/* Component for screen size, responsive use */

class Screen {
    windowWidth: number;
    mobileWidth: number;
    constructor() {
        this.windowWidth = window.innerWidth;
        this.mobileWidth = 768; 
    }
}

export default new Screen();