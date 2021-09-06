const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArr = [];

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse.x, mouse.y)
});

c.fillStyle = 'white';
c.font = '30px Verdanna';
c.fillText('A', 0, 30);
const data = c.getImageData(0, 0, 100, 100);


class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.defaultX
    }
}