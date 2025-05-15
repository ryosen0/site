// Professional background animation
const PARTICLE_COUNT = 45;
const CONNECTION_DISTANCE = 180;
const PARTICLE_COLORS = ['#6be0ff22', '#ffb4e622', '#ffe06622'];
const BASE_SIZE = 2;

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';
document.querySelector('.pixel-stars').appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];
let mousePosition = { x: 0, y: 0 };
let isMouseMoving = false;
let mouseTimer = null;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = BASE_SIZE + Math.random() * 1.5;
    this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.targetSize = this.size;
  }

  update() {
    // Smooth movement
    this.x += this.vx;
    this.y += this.vy;

    // Boundary check with smooth transition
    if (this.x < 0 || this.x > canvas.width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.vy *= -1;
    }

    // Mouse interaction
    if (isMouseMoving) {
      const dx = mousePosition.x - this.x;
      const dy = mousePosition.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < CONNECTION_DISTANCE) {
        const force = (CONNECTION_DISTANCE - distance) / CONNECTION_DISTANCE;
        this.targetSize = BASE_SIZE + 3 * force;
        
        // Gentle repulsion
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 0.02;
        this.vy -= Math.sin(angle) * force * 0.02;
      } else {
        this.targetSize = this.size;
      }
    }

    // Smooth size transition
    this.size += (this.targetSize - this.size) * 0.1;

    // Speed limit
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 1.5) {
      this.vx = (this.vx / speed) * 1.5;
      this.vy = (this.vy / speed) * 1.5;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  ctx.strokeStyle = '#ffffff08';
  ctx.lineWidth = 1;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < CONNECTION_DISTANCE) {
        const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.15;
        ctx.strokeStyle = `rgba(107, 224, 255, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function drawGradientOverlay() {
  const gradient = ctx.createRadialGradient(
    canvas.width * 0.3, canvas.height * 0.3, 0,
    canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.7
  );
  
  gradient.addColorStop(0, 'rgba(46, 42, 90, 0.2)');
  gradient.addColorStop(0.5, 'rgba(26, 26, 64, 0.1)');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawGradientOverlay();
  drawConnections();
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animate);
}

function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  mousePosition.x = e.clientX - rect.left;
  mousePosition.y = e.clientY - rect.top;
  isMouseMoving = true;
  
  clearTimeout(mouseTimer);
  mouseTimer = setTimeout(() => {
    isMouseMoving = false;
  }, 2000);
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize);

createParticles();
animate(); 