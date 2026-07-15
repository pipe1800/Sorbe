import React from 'react';

// Snowflake-like particles falling down
const Snowfall = () => {
  const flakes = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 4 + Math.random() * 8,
    delay: `${Math.random() * 5}s`,
    duration: `${4 + Math.random() * 6}s`,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-white animate-fall"
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDelay: f.delay,
            animationDuration: f.duration,
            top: '-10px',
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
