const canvas = document.getElementById("physics-canvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let particles = [];

let mouse = {
    x: -1000,
    y: -1000
};

const mouseRadius = 200;
const mouseStrength = 0.25;


function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}


class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;

        this.radius = Math.random() * 1.5 + 0.5;
    }


    update() {

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );


        if (distance < mouseRadius && distance > 0) {

            const force =
                (1 - distance / mouseRadius) *
                mouseStrength;


            this.vx -=
                (dx / distance) *
                force;


            this.vy -=
                (dy / distance) *
                force;
        }


        this.x += this.vx;
        this.y += this.vy;


        const maxSpeed = 2.2;

        const speed = Math.sqrt(
            this.vx * this.vx +
            this.vy * this.vy
        );


        if (speed > maxSpeed) {

            this.vx =
                (this.vx / speed) *
                maxSpeed;


            this.vy =
                (this.vy / speed) *
                maxSpeed;
        }


        if (this.x < 0 || this.x > width) {
            this.vx *= -1;
        }


        if (this.y < 0 || this.y > height) {
            this.vy *= -1;
        }
    }


    draw() {
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(139, 168, 255, 0.58)";

        ctx.fill();
    }
}


function createParticles() {

    const count =
        Math.min(
            80,
            Math.floor(width / 15)
        );


    particles = [];


    for (let i = 0; i < count; i++) {

        particles.push(
            new Particle()
        );

    }
}


function connectParticles() {

    const maxDistance = 140;


    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx =
                particles[i].x -
                particles[j].x;


            const dy =
                particles[i].y -
                particles[j].y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < maxDistance) {

                const opacity =
                    1 -
                    distance / maxDistance;


                ctx.beginPath();


                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );


                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );


                ctx.strokeStyle =
                    `rgba(135, 206, 235, ${opacity * 0.12})`;


                ctx.lineWidth = 1;

                ctx.stroke();
            }
        }
    }
}


function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(particle => {

        particle.update();

        particle.draw();

    });


    connectParticles();


    requestAnimationFrame(
        animate
    );
}


window.addEventListener(
    "mousemove",
    (event) => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);


window.addEventListener(
    "mouseleave",
    () => {

        mouse.x = -1000;
        mouse.y = -1000;

    }
);


window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        createParticles();

    }
);


resizeCanvas();

createParticles();

animate();