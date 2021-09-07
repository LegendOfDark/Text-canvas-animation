const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArr = [];

let AdjustX = 2;
let AdjustY = -10;

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
c.font = '30px Arial';
c.fillText('Ali', 7, 35);
const text_coord = c.getImageData(0, 0, 400, 300);

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.defaultX = this.x;
        this.defaultY = this.y;
        this.hue = 240;
        this.density = Math.random() * 30 + 2;
    }
    draw(){
        this.hue += 1;
        c.fillStyle = 'hsl(' + this.hue + ', 100%, 80%)';
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.closePath();
        c.fill();
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let mouse_distance = Math.hypot(dx, dy);
        let force_x = +dx / mouse_distance;
        let force_y = +dy / mouse_distance;
        let maxDistnc = mouse.radius;
        let force = (maxDistnc - mouse_distance) / maxDistnc;
        let directionX = force_x * force * this.density;
        let directionY = force_y * force * this.density;
        
        if (mouse_distance < mouse.radius){
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
        console.log(mouse_distance);
        let opacity = 1;
        for (let i = 0; i < particleArr.length; i++){
            if (this === particleArr[i]) continue;
            let dx = this.x - particleArr[i].x;
            let dy = this.y - particleArr[i].y;
            let distance = Math.hypot(dx, dy);
            if (distance < 40){
                opacity = 1 - (distance / 50);
                c.strokeStyle = 'hsl(' + this.hue + ', 100%,' + 75 + '%)'; 
                c.lineWidth = 2;
                c.beginPath();
                c.moveTo(this.x, this.y)
                c.lineTo(particleArr[i].x, particleArr[i].y)
                c.stroke();
                c.closePath();
                
            }
        }
        this.draw();
    }

}

let init = () => {
    particleArr = [];    
    console.log(text_coord); 
    let counter = 3;                                                
    for (let y = 3, y2 = text_coord.height; y < y2; y++){
        for (let x = 0, x2 = text_coord.width; x < x2; x++){
            if (text_coord.data[counter] > 128){
                let position_x = x + AdjustX;
                let position_y = y + AdjustY;
                particleArr.push(new Particle(position_x * 25, position_y * 25));
            }
            counter += 4;
        }
    }                                               
}
init();
console.log(particleArr);

let animate = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < particleArr.length; x++){
        particleArr[x].update();
    }
    requestAnimationFrame(animate);
}
animate();