// Confetti effect
export function triggerConfetti(x: number, y: number) {
  const colors = ["#f97316", "#fb923c", "#ea580c", "#fdba74", "#fed7aa"];
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti-particle";

    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 200;

    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 9999;
    `;

    document.body.appendChild(particle);

    let time = 0;
    const gravity = 500;
    const duration = 1000;

    const animate = () => {
      time += 16;
      if (time > duration) {
        particle.remove();
        return;
      }

      const t = time / 1000;
      const newX = x + vx * t;
      const newY = y + vy * t + 0.5 * gravity * t * t;
      const opacity = 1 - time / duration;
      const rotation = time * 0.5;

      particle.style.left = `${newX}px`;
      particle.style.top = `${newY}px`;
      particle.style.opacity = `${opacity}`;
      particle.style.transform = `rotate(${rotation}deg)`;

      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Ripple effect
export function createRipple(event: React.MouseEvent<HTMLElement>) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    border-radius: 50%;
    background: rgba(249, 115, 22, 0.4);
    pointer-events: none;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
  `;

  // Ensure button has position relative
  if (window.getComputedStyle(button).position === "static") {
    button.style.position = "relative";
  }
  button.style.overflow = "hidden";

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Shake animation
export function shakeElement(element: HTMLElement) {
  element.style.animation = "shake 0.5s ease-in-out";
  setTimeout(() => {
    element.style.animation = "";
  }, 500);
}

// Add CSS animations to document if not already present
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    @keyframes pulse-scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `;

  if (!document.head.querySelector('style[data-micro-interactions]')) {
    style.setAttribute('data-micro-interactions', 'true');
    document.head.appendChild(style);
  }
}
