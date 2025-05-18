import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
export function AerialFormation({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const formation = {
      jets: 5,
      spacing: 40,
      baseY: canvas.height * 0.3,
      speed: 0.5,
      oscillationSpeed: 0.002,
      oscillationHeight: 30,
      smokeTrails: true,
      smokeLength: 100,
      smokeInterval: 3,
      colors: {
        leadJet: "#F8FAFC",
        wingJets: "#94A3B8",
        cockpit: "#7DD3FC",
        cockpitHighlight: "#FFFFFF",
        smoke: ["rgba(255,255,255,0.7)", "rgba(220,220,250,0.5)"],
        afterburner: ["#FF4500", "#FFBF00"],
      },
      showAfterburners: true,
    };

    const smokeParticles = [];

    let flashTimer = 0;
    const flashInterval = 200;
    const flashDuration = 5;

    let animationFrame;
    let time = 0;

    const drawJet = (x, y, scale, isLead, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      const jetColor = isLead
        ? formation.colors.leadJet
        : formation.colors.wingJets;

      if (formation.showAfterburners) {
        const burstLength = 3 + Math.sin(time * 0.2) * 2;
        const burstWidth = 3 + Math.sin(time * 0.3) * 1;

        ctx.beginPath();
        const gradient = ctx.createLinearGradient(-20, 0, -5, 0);
        gradient.addColorStop(0, formation.colors.afterburner[0]);
        gradient.addColorStop(1, formation.colors.afterburner[1]);
        ctx.fillStyle = gradient;
        ctx.ellipse(-15, 0, burstLength, burstWidth, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.lineTo(36, -3);
      ctx.lineTo(36, 7);
      ctx.lineTo(2, 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(12, 2);
      ctx.lineTo(2, 18);
      ctx.lineTo(24, 18);
      ctx.lineTo(28, 2);
      ctx.fill();

      ctx.fillStyle = jetColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(10, -4, 20, -6, 35, -5);
      ctx.lineTo(35, 5);
      ctx.bezierCurveTo(20, 6, 10, 4, 0, 0);
      ctx.closePath();
      ctx.fill();

      const bodyHighlight = ctx.createLinearGradient(0, -5, 35, -5);
      bodyHighlight.addColorStop(0, "rgba(255,255,255,0)");
      bodyHighlight.addColorStop(0.3, "rgba(255,255,255,0.4)");
      bodyHighlight.addColorStop(0.7, "rgba(255,255,255,0.2)");
      bodyHighlight.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = bodyHighlight;
      ctx.beginPath();
      ctx.moveTo(0, -1);
      ctx.bezierCurveTo(10, -5, 20, -7, 35, -6);
      ctx.bezierCurveTo(30, -4, 15, -3, 0, -1);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(2, 15);
      ctx.lineTo(22, 15);
      ctx.lineTo(27, 0);
      ctx.closePath();

      const wingGradient = ctx.createLinearGradient(2, 8, 22, 8);
      wingGradient.addColorStop(0, jetColor);
      wingGradient.addColorStop(1, "rgba(255,255,255,0.7)");
      ctx.fillStyle = wingGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(-3, -10);
      ctx.lineTo(2, -13);
      ctx.lineTo(10, 0);
      ctx.closePath();
      ctx.fillStyle = jetColor;
      ctx.fill();

      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(22, 15);
      ctx.stroke();

      const cockpitGradient = ctx.createRadialGradient(23, 0, 1, 23, 0, 5);
      cockpitGradient.addColorStop(0, formation.colors.cockpitHighlight);
      cockpitGradient.addColorStop(0.5, formation.colors.cockpit);
      cockpitGradient.addColorStop(1, "rgba(70,130,180,0.6)");

      ctx.fillStyle = cockpitGradient;
      ctx.beginPath();
      ctx.ellipse(23, 0, 6, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      if (time % flashInterval < flashDuration && isLead) {
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.ellipse(23, 0, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, "#0B4F82");
      skyGradient.addColorStop(1, "#87CEEB");

      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 5; i++) {
        const cloudX = (time * 0.1 + (i * canvas.width) / 5) % canvas.width;
        const cloudY = canvas.height * (0.1 + i * 0.15);
        const cloudWidth = canvas.width * 0.3;

        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.beginPath();
        ctx.ellipse(
          cloudX,
          cloudY,
          cloudWidth,
          cloudWidth * 0.2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      for (let i = 0; i < formation.jets; i++) {
        const isCenter = i === Math.floor(formation.jets / 2);
        const offset = i - Math.floor(formation.jets / 2);
        const spacing = formation.spacing;

        const baseX = ((time * formation.speed) % (canvas.width + 500)) - 250;
        const x = baseX + offset * spacing * 1.5;

        if (x < -50 || x > canvas.width + 50) {
          continue;
        }

        const oscillation =
          Math.sin(time * formation.oscillationSpeed) *
          formation.oscillationHeight;
        const y =
          formation.baseY +
          Math.abs(offset) * 15 +
          (isCenter ? 0 : oscillation);

        const angle = isCenter
          ? 0
          : Math.sin(time * formation.oscillationSpeed) * 0.1 +
            (offset < 0 ? -0.05 : 0.05);

        const scale = isCenter ? 1.3 : 1.0;
        drawJet(x, y, scale, isCenter, angle);

        if (formation.smokeTrails && time % formation.smokeInterval === 0) {
          const smokeColor =
            formation.colors.smoke[
              Math.floor(Math.random() * formation.colors.smoke.length)
            ];
          smokeParticles.push({
            x: x - 15 * scale,
            y: y,
            alpha: 0.4 + Math.random() * 0.3,
            size: (2 + Math.random() * 2) * scale,
            color: smokeColor,
            speedX: -0.2 - Math.random() * 0.3,
            speedY: (Math.random() - 0.5) * 0.4,
          });
        }
      }

      for (let i = 0; i < smokeParticles.length; i++) {
        const particle = smokeParticles[i];

        particle.alpha -= 0.002 + Math.random() * 0.001;
        particle.size += 0.1 + Math.random() * 0.05;
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.alpha <= 0) {
          smokeParticles.splice(i, 1);
          i--;
        }
      }

      ctx.globalAlpha = 1;

      if (smokeParticles.length > formation.smokeLength) {
        smokeParticles.splice(0, smokeParticles.length - formation.smokeLength);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
