// src/components/EventsFeature.jsx

import { useState, useEffect, useRef } from "react";
import { getEvents } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Design tokens
const COLOR_MAP = {
  yellow: { bg: "#EAB308", light: "#FEF9C3" },
  rose: { bg: "#F43F5E", light: "#FFF1F2" },
  teal: { bg: "#0D9488", light: "#F0FDFA" },
  orange: { bg: "#F97316", light: "#FFF7ED" },
  blue: { bg: "#3B82F6", light: "#EFF6FF" },
  indigo: { bg: "#4F46E5", light: "#EEF2FF" },
  green: { bg: "#22C55E", light: "#F0FDF4" },
  red: { bg: "#DC2626", light: "#FEF2F2" },
};

// Fallback only, used when there is no dashboard tilt value
const TILT_SEQUENCE = [-2, 1, -1, 2, -2, 0, 1, -1, 2, -2];

// Reads tilt from dashboard fields.
// Change this once if your DB column has a different name.
function getCardTilt(event, fallbackIndex = 0) {
  const candidates = [
    event?.card_tilt_deg,
    event?.tilt_deg,
    event?.tilt,
    event?.rotation,
    event?.rotate,
    event?.angle,
  ];

  const value = candidates.find(
    (item) =>
      item !== undefined &&
      item !== null &&
      item !== "" &&
      !Number.isNaN(Number(item)),
  );

  return value !== undefined
    ? Number(value)
    : TILT_SEQUENCE[fallbackIndex % TILT_SEQUENCE.length];
}

// Skeleton card
function EventCardSkeleton() {
  return (
    <div style={{ flexShrink: 0, width: 200, padding: "20px 14px" }}>
      <div
        style={{
          background: "white",
          border: "3px solid #e5e7eb",
          padding: 8,
          boxShadow: "4px 4px 0 rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ aspectRatio: "1 / 1", background: "#f3f4f6" }} />
        <div
          style={{
            padding: "10px 4px 6px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              height: 10,
              width: 48,
              background: "#e5e7eb",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              height: 16,
              width: 80,
              background: "#f3f4f6",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              height: 10,
              width: 64,
              background: "#f9fafb",
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Single polaroid card
function PolaroidCard({
  event,
  tiltDeg,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  layoutId,
}) {
  const c = COLOR_MAP[event?.color] || COLOR_MAP.yellow;
  const tagLabel = event?.tag || "Featured";
  const title = event?.title || "Untitled";
  const location = event?.location || "Location TBA";
  const dateBadge = (event?.date || "").split(" ")[0] || "Soon";

  const openFromKeyboard = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={openFromKeyboard}
      role="button"
      tabIndex={0}
      aria-label={`Open featured photo: ${title}`}
      style={{
        flexShrink: 0,
        width: 200,
        padding: "20px 14px",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <motion.div
        layoutId={layoutId}
        initial={false}
        animate={{
          rotate: isHovered ? 0 : tiltDeg,
          y: isHovered ? -14 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 24,
          mass: 0.85,
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          position: "relative",
          background: "white",
          border: "3px solid black",
          padding: 8,
          boxShadow: isHovered
            ? "8px 8px 0 rgba(0,0,0,1)"
            : "4px 4px 0 rgba(0,0,0,0.85)",
          transition: "box-shadow 0.25s ease",
          willChange: "transform",
          transformOrigin: "center center",
        }}
      >
        {/* Date badge */}
        <div
          style={{
            position: "absolute",
            top: -14,
            right: -14,
            zIndex: 20,
            width: 40,
            height: 40,
            background: "white",
            border: "2px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "1px 1px 0 black",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, sans-serif",
              fontWeight: 900,
              fontSize: 9,
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            {dateBadge}
          </span>
        </div>

        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            border: "2px solid black",
            background: c.light,
          }}
        >
          {event?.image_url ? (
            <img
              src={event.image_url}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                transition: "filter 0.5s ease, transform 0.5s ease",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: '"Impact", sans-serif',
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: c.bg,
                opacity: 0.6,
              }}
            >
              No Photo
            </div>
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: c.bg,
              mixBlendMode: "multiply",
              opacity: isHovered ? 0 : 0.18,
              transition: "opacity 0.4s ease",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ padding: "10px 4px 4px" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "white",
              padding: "2px 6px",
              background: c.bg,
              border: "1px solid black",
              marginBottom: 4,
            }}
          >
            {tagLabel}
          </span>

          <p
            style={{
              fontFamily: '"Barabara", "Impact", "Arial Black", sans-serif',
              fontSize: 14,
              textTransform: "uppercase",
              lineHeight: 1.15,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </p>

          <p
            style={{
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 10,
              color: "#6b7280",
              margin: "3px 0 0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {location}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Main component
export default function EventsFeature() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  const SPEED = 0.5; // px per frame

  useEffect(() => {
    getEvents()
      .then((data) => {
        const filtered = (data ?? []).filter(
          (e) => e.is_featured === true && e.is_active === true,
        );
        setEvents(filtered);
      })
      .catch((err) => setError(err?.message || "Failed to load events"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    pausedRef.current = Boolean(selectedEvent) || hoveredIdx !== null;
  }, [selectedEvent, hoveredIdx]);

  useEffect(() => {
    if (!selectedEvent) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
        setHoveredIdx(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedEvent]);

  // Infinite rAF scroll loop
  useEffect(() => {
    if (!events.length) return;
    const track = trackRef.current;
    if (!track) return;

    let loopWidth = 0;

    const measure = () => {
      loopWidth = track.scrollWidth / 4;
    };

    const animate = () => {
      if (!pausedRef.current) {
        offsetRef.current += SPEED;

        if (loopWidth > 0 && offsetRef.current >= loopWidth) {
          offsetRef.current -= loopWidth;
        }

        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    measure();
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
    };
  }, [events]);

  const closeModal = () => {
    setSelectedEvent(null);
    setHoveredIdx(null);
  };

  const displayEvents = events.length
    ? [...events, ...events, ...events, ...events]
    : [];

  const modalColor =
    COLOR_MAP[selectedEvent?.color] || COLOR_MAP.yellow;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: 56,
        background: "#FFFBEB",
        borderTop: "4px solid black",
        borderBottom: "4px solid black",
        overflow: "hidden",
      }}
    >
      {/* Dot texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(3,126,243,0.10) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            height: 8,
            background:
              "linear-gradient(to right, #EF3340, #FFD100, #00A651, #009BD6, #F58220)",
            border: "2px solid black",
            borderTop: "none",
            marginBottom: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "28px 0 24px",
            borderBottom: "4px solid black",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: '"Barabara", "Impact", "Arial Black", sans-serif',
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "black",
                  background: "#FFD100",
                  padding: "3px 14px",
                  border: "2px solid black",
                  borderRadius: 999,
                  boxShadow: "3px 3px 0 black",
                }}
              >
                📸 Throwback Collection
              </span>
            </div>

            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#EF3340",
                  transform: "translate(6px, 7px) skewX(-2deg)",
                  border: "3px solid black",
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#FFD100",
                  transform: "translate(3px, 4px) skewX(-1deg)",
                  border: "3px solid black",
                  borderRadius: 4,
                }}
              />
              <div
                style={{
                  position: "relative",
                  background: "#20a2ec",
                  border: "3px solid black",
                  borderRadius: 4,
                  padding: "10px 24px 10px 20px",
                  transform: "skewX(-1.5deg)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 10,
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #FFD100 0px, #FFD100 3px, transparent 3px, transparent 9px)",
                    borderLeft: "2px solid black",
                  }}
                />
                <h2
                  style={{
                    fontFamily:
                      '"Barabara", "Impact", "Arial Black", sans-serif',
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    lineHeight: 1,
                    margin: 0,
                    color: "white",
                    transform: "skewX(1.5deg)",
                    display: "inline-block",
                    textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  Featured <span style={{ color: "#FFD100" }}>Photos</span>
                </h2>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#EF3340",
                transform: "translate(6px, 6px)",
                border: "3px solid black",
                borderRadius: 6,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFD100",
                transform: "translate(3px, 3px)",
                border: "3px solid black",
                borderRadius: 6,
              }}
            />
            <button
              type="button"
              style={{
                position: "relative",
                padding: "12px 24px",
                background: "#009BD6",
                border: "3px solid black",
                borderRadius: 6,
                fontFamily: '"Barabara", "Impact", "Arial Black", sans-serif',
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                cursor: "pointer",
                color: "white",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translate(-2px,-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translate(0,0)")
              }
            >
              View All Photos ✦
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            textAlign: "center",
            color: "#EF3340",
            fontWeight: 700,
            fontSize: 13,
            padding: "0 0 24px",
          }}
        >
          Couldn't load photos: {error}
        </p>
      )}

      {/* Edge fade masks */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 100,
          zIndex: 20,
          background: "linear-gradient(to right, #FFFBEB 30%, transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 100,
          zIndex: 20,
          background: "linear-gradient(to left, #FFFBEB 30%, transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Carousel */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {[1, 2, 3, 4].map((n) => (
              <EventCardSkeleton key={n} />
            ))}
          </div>
        ) : events.length === 0 && !error ? (
          <p
            style={{
              textAlign: "center",
              padding: "64px 0",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#9ca3af",
            }}
          >
            No featured photos yet — check back soon!
          </p>
        ) : (
          <div
            ref={trackRef}
            style={{
              display: "flex",
              alignItems: "center",
              willChange: "transform",
              padding: "8px 0 20px",
            }}
          >
            {displayEvents.map((event, i) => {
              const originalIdx = i % events.length;
              const tiltDeg = getCardTilt(event, originalIdx);
              const layoutId = `event-card-${event.id}-${i}`;

              return (
                <PolaroidCard
                  key={`${event.id}-${i}`}
                  layoutId={layoutId}
                  event={event}
                  tiltDeg={tiltDeg}
                  isHovered={hoveredIdx === i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() =>
                    setSelectedEvent({
                      ...event,
                      layoutId,
                      tiltDeg,
                    })
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={closeModal}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(4px)",
                cursor: "pointer",
              }}
            />

            <motion.div
              layoutId={selectedEvent.layoutId}
              initial={false}
              animate={{ rotate: 0, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
                mass: 0.9,
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedEvent.title || "Featured photo"}
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                maxWidth: 720,
                background: "#FFFBEB",
                border: "4px solid black",
                borderRadius: 12,
                boxShadow: "8px 8px 0 rgba(0,0,0,1)",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  zIndex: 20,
                  width: 42,
                  height: 42,
                  borderRadius: "999px",
                  border: "2px solid black",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "2px 2px 0 rgba(0,0,0,1)",
                }}
              >
                <X size={20} color="black" />
              </button>

              <div
                style={{
                  height: 10,
                  background: modalColor.bg,
                  borderBottom: "3px solid black",
                }}
              />

              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  background: "#e5e7eb",
                  borderBottom: "4px solid black",
                  overflow: "hidden",
                }}
              >
                {selectedEvent.image_url ? (
                  <img
                    src={selectedEvent.image_url}
                    alt={selectedEvent.title || "Featured photo"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: '"Barabara", "Impact", "Arial Black", sans-serif',
                      color: "#9ca3af",
                      fontSize: 24,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                    }}
                  >
                    No Photo
                  </div>
                )}

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: modalColor.bg,
                    mixBlendMode: "multiply",
                    opacity: 0.08,
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    bottom: 16,
                    background: "white",
                    border: "2px solid black",
                    padding: "6px 10px",
                    boxShadow: "3px 3px 0 rgba(0,0,0,1)",
                    maxWidth: "calc(100% - 90px)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "white",
                      padding: "3px 8px",
                      background: modalColor.bg,
                      border: "1px solid black",
                      marginBottom: 6,
                    }}
                  >
                    {selectedEvent.tag || "Featured"}
                  </span>

                  <div
                    style={{
                      fontFamily:
                        '"Barabara", "Impact", "Arial Black", sans-serif',
                      fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                      lineHeight: 1,
                      textTransform: "uppercase",
                      color: "black",
                    }}
                  >
                    {selectedEvent.title || "Untitled"}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "24px 24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 12,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: "#fff",
                      border: "2px solid black",
                      padding: "6px 10px",
                    }}
                  >
                    {selectedEvent.date || "Date TBA"}
                  </span>

                  <span
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 12,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: "#fff",
                      border: "2px solid black",
                      padding: "6px 10px",
                    }}
                  >
                    {selectedEvent.location || "Location TBA"}
                  </span>

                  <span
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: 12,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: modalColor.light,
                      border: "2px solid black",
                      padding: "6px 10px",
                    }}
                  >
                    Tilt: {Number(selectedEvent.tiltDeg).toFixed(0)}°
                  </span>
                </div>

                <div
                  style={{
                    height: 2,
                    background: "black",
                    opacity: 0.12,
                    width: "100%",
                  }}
                />

                <p
                  style={{
                    margin: 0,
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#374151",
                  }}
                >
                  {selectedEvent.description || "No description available yet."}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}