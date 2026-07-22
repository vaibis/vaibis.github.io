const canvas = document.getElementById("physics-canvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let particles = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth * window.devicePixelRatio;
    height = canvas.height = window.innerHeight * window.devicePixelRatio;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    width = window.innerWidth;
    height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;

        this.radius = Math.random() * 1.5 + 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) {
            this.vx *= -1;
        }

        if (this.y < 0 || this.y > height) {
            this.vy *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(184, 168, 255, 0.5)";
        ctx.fill();
    }
}

function createParticles() {
    const count = Math.min(80, Math.floor(width / 15));

    particles = [];

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    const maxDistance = 140;

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {

                const opacity = 1 - distance / maxDistance;

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
                    `rgba(184, 168, 255, ${opacity * 0.12})`;

                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
});

resizeCanvas();
createParticles();
animate();