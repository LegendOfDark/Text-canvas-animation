const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArr = [];

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 130
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse.x, mouse.y)
});

c.fillStyle = 'white';
c.font = '30px Verdanna';
c.fillText('A', 0, 30);
const text_coord = c.getImageData(0, 0, 100, 100);

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.hue = Math.random() * 60 + 240;
        this.density = Math.random() * 30 + 2;
    }
    draw(){
        this.hue += 1;
        c.fillStyle = 'hsl(' + this.hue + ', 100%, 50%)';
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.closePath();
        c.fill();
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);
        let force_x = dx / distance;
        let force_y = dy / distance;
        let maxDistnc = mouse.radius;
        let force = (maxDistnc - distance) / maxDistnc;
        let directionX = force_x * force * this.density;
        let directionY = force_y * force * this.density;
        
        if (distance < mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.defaultX){
                let dx = this.x - this.defaultX;
                this.x -= dx / 7;
            }
            if (this.y !== this.defaultY){
                let dy = this.y - this.defaultY;
                this.y -= dy / 7;
            }
        }
    }

}

let init = () => {
    particleArr = [];
    for (let i = 0; i < 1500; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArr.push(new Particle(x, y));
    }


}
init();
console.log(particleArr);

let animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < particleArr.length; x++){
        particleArr[x].draw();
        particleArr[x].update();
    }
    requestAnimationFrame(animate);
}
animate();