import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mapImage from '../../assets/map.webp';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

// Geographical checkpoint locations on the map
const checkpoints = [
  {
    id: 'north-america',
    position: { x: 18, y: 35 },
    icon: '📍'
  },
  {
    id: 'south-america',
    position: { x: 25, y: 70 },
    icon: '📍'
  },
  {
    id: 'europe',
    position: { x: 50, y: 25 },
    icon: '📍'
  },
  {
    id: 'africa',
    position: { x: 52, y: 55 },
    icon: '📍'
  },
  {
    id: 'asia',
    position: { x: 72, y: 35 },
    icon: '📍'
  },
  {
    id: 'australia',
    position: { x: 82, y: 72 },
    icon: '📍'
  },
  {
    id: 'greenland',
    position: { x: 35, y: 12 },
    icon: '📍'
  }
];

const achievements = [
  {
    id: 1,
    year: '1147',
    title: 'The Founding',
    description: 'Lord Aldric united the scattered warriors under one banner, forging the Belmonts clan in the fires of brotherhood.',
    icon: '🏰',
    checkpoint: 'europe',
    position: { x: 50, y: 25 }
  },
  {
    id: 2,
    year: '1203',
    title: 'Battle of Shadow\'s Peak',
    description: 'Against impossible odds, the Belmonts held the mountain pass for seven days, earning legendary status.',
    icon: '⚔',
    checkpoint: 'asia',
    position: { x: 72, y: 35 }
  },
  {
    id: 3,
    year: '1289',
    title: 'The Great Alliance',
    description: 'Formed alliances with three neighboring kingdoms, expanding influence across the northern territories.',
    icon: '🤝',
    checkpoint: 'north-america',
    position: { x: 18, y: 35 }
  },
  {
    id: 4,
    year: '1356',
    title: 'Library of Lore',
    description: 'Established the grand library, preserving ancient knowledge and magical texts for future generations.',
    icon: '📚',
    checkpoint: 'africa',
    position: { x: 52, y: 55 }
  },
  {
    id: 5,
    year: '1442',
    title: 'Tournament of Champions',
    description: 'Hosted the legendary tournament where warriors from across the realm competed for honor and glory.',
    icon: '🏆',
    checkpoint: 'south-america',
    position: { x: 25, y: 70 }
  },
  {
    id: 6,
    year: '1598',
    title: 'The Dragon Treaty',
    description: 'Negotiated peace with the ancient dragons, securing the skies and establishing mutual respect.',
    icon: '🐉',
    checkpoint: 'australia',
    position: { x: 82, y: 72 }
  },
  {
    id: 7,
    year: '1723',
    title: 'Expansion Era',
    description: 'Extended clan influence to coastal regions, establishing new strongholds and trade routes.',
    icon: '⛵',
    checkpoint: 'greenland',
    position: { x: 35, y: 12 }
  },
];

export default function Timeline() {
  const sectionRef = useRef();
  const mapRef = useRef();
  const itemsRef = useRef([]);
  const svgRef = useRef();
  const [focusedId, setFocusedId] = useState(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate map entrance
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.95,
        });
      }

      // Animate constellation points
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
            opacity: 0,
            scale: 0,
            delay: index * 0.1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Draw connecting lines between stars
  useEffect(() => {
    if (!svgRef.current || !mapRef.current) return;

    const svg = svgRef.current;
    const container = mapRef.current;
    
    // Clear previous lines
    const existingLines = svg.querySelectorAll('.constellation-line');
    existingLines.forEach(line => line.remove());

    // Create SVG paths between consecutive points
    for (let i = 0; i < achievements.length - 1; i++) {
      const current = achievements[i];
      const next = achievements[i + 1];

      const x1 = (current.position.x / 100) * container.offsetWidth;
      const y1 = (current.position.y / 100) * container.offsetHeight;
      const x2 = (next.position.x / 100) * container.offsetWidth;
      const y2 = (next.position.y / 100) * container.offsetHeight;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      line.setAttribute('class', 'constellation-line');
      line.setAttribute('d', `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 + 30} ${x2} ${y2}`);
      line.setAttribute('stroke', '#8b7355');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('fill', 'none');
      line.setAttribute('opacity', '0.6');
      line.setAttribute('stroke-dasharray', '5,5');

      svg.appendChild(line);
    }
  }, []);

  return (
    <section id="timeline" className="timeline" ref={sectionRef}>
      <div className="timeline-container">
        <h2 className="section-title">
          <span className="title-accent">━━━</span>
          Constellation of History
          <span className="title-accent">━━━</span>
        </h2>

        <p className="timeline-intro">
          A celestial map of glory written in the stars, marking moments of legend and triumph across the ages
        </p>

        {/* Constellation Map */}
        <div className="constellation-map" ref={mapRef} style={{ backgroundImage: `url(${mapImage})` }}>
          {/* SVG for hand-drawn lines */}
          <svg
            ref={svgRef}
            className="constellation-lines"
            width="100%"
            height="100%"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid slice"
          ></svg>

          {/* Geographical Checkpoints */}
          {checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className="map-checkpoint"
              style={{
                left: `${checkpoint.position.x}%`,
                top: `${checkpoint.position.y}%`,
              }}
              title={checkpoint.name}
            >
              <div className="checkpoint-marker">
                <div className="checkpoint-pulse"></div>
                <div className="checkpoint-icon">{checkpoint.icon}</div>
              </div>
              <div className="checkpoint-label">{checkpoint.name}</div>
            </div>
          ))}

          {/* Constellation stars/points */}
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`constellation-point ${focusedId === achievement.id ? 'focused' : ''}`}
              ref={el => itemsRef.current[index] = el}
              style={{
                left: `${achievement.position.x}%`,
                top: `${achievement.position.y}%`,
              }}
              onMouseEnter={() => setFocusedId(achievement.id)}
              onMouseLeave={() => setFocusedId(null)}
            >
              {/* Wax pin */}
              <div className="wax-pin">
                <div className="pin-head">
                  <span className="pin-icon">{achievement.icon}</span>
                </div>
                <div className="pin-seal"></div>
              </div>

              {/* Event popup */}
              <div className="event-popup">
                <div className="popup-year">{achievement.year}</div>
                <h3 className="popup-title">{achievement.title}</h3>
                <p className="popup-description">{achievement.description}</p>
                <div className="popup-ornament">◈ ━ ◈</div>
              </div>
            </div>
          ))}

          {/* Compass rose decoration */}
          <div className="compass-rose">
            {/* Outer ring */}
            <div className="compass-outer-ring"></div>
            
            {/* Cardinal directions */}
            <div className="compass-direction north">N</div>
            <div className="compass-direction east">E</div>
            <div className="compass-direction south">S</div>
            <div className="compass-direction west">W</div>
            
            {/* Inner star */}
            <div className="compass-inner">
              <div className="compass-star">✦</div>
            </div>
            
            {/* Decorative lines to edges */}
            <div className="compass-line north-line"></div>
            <div className="compass-line east-line"></div>
            <div className="compass-line south-line"></div>
            <div className="compass-line west-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
