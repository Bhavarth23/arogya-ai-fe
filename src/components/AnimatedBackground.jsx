import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function AnimatedBackground() {
  const [init, setInit] = useState(false);

  // Initialize particles engine asynchronously
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = () => {
    // Callback once particles container is loaded
  };

  // Use the exact hex codes from your theme.js for consistency
  // Primary: #6366f1 (Indigo) | Secondary: #38bdf8 (Cyan) | Secondary Text: #94a3b8 (Soft Slate)
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 2,
            opacity: 0.8,
            size: 6,
          },
        },
      },
      particles: {
        // Use the Primary Color for the particle dots
        color: {
          value: "#6366f1",
        },
        links: {
          // Use the Secondary Text Color for subtle connections
          color: "#94a3b8",
          distance: 150,
          enable: true,
          opacity: 0.2, // Slightly more subtle opacity
          width: 1,
        },
        move: {
          direction: "top",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 0.4,
          straight: true,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 50,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
    );
  }

  return <></>;
}

export default AnimatedBackground;
