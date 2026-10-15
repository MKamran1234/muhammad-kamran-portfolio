import { useEffect, useState, useCallback, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/loadingContext";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading, setLoading } = useLoading();
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasStartedExit = useRef(false);

  // Trigger smooth exit and start landing animations
  const triggerEnter = useCallback(async () => {
    if (hasStartedExit.current) return;
    hasStartedExit.current = true;
    setIsExiting(true);
    try {
      const module = await import("./utils/initialFX");
      module.initialFX?.();
    } catch (error) {
      console.error("Unable to start intro animation:", error);
    } finally {
      window.setTimeout(() => setIsLoading(false), 900);
    }
  }, [setIsLoading]);

  // When progress reaches 100%, mark ready and smoothly enter
  useEffect(() => {
    if (percent < 100 || isReady) return;
    setIsReady(true);
  }, [percent, isReady]);

  // Once the experience is ready, keep the completed state visible briefly
  // so the visual handoff never feels abrupt on fast networks.
  useEffect(() => {
    if (!isReady) return;
    const enterTimer = window.setTimeout(triggerEnter, 180);
    return () => window.clearTimeout(enterTimer);
  }, [isReady, triggerEnter]);

  // Fallback safety timer so visitors never get stuck
  useEffect(() => {
    const safetyTimer = window.setTimeout(() => {
      // The character is an enhancement, not a reason to block the site.
      // Complete the same progress path before entering, even if WebGL stalls.
      setLoading(100);
      setIsReady(true);
    }, 7500);
    return () => window.clearTimeout(safetyTimer);
  }, [setLoading]);

  // Format progress number (e.g. 007%, 045%, 100%)
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  const formattedPercent = clamped < 10 ? `00${clamped}` : clamped < 100 ? `0${clamped}` : `${clamped}`;

  // Dynamic system stage message
  const getStageMessage = () => {
    if (clamped < 25) return "[ 01 / 04 ] Initializing WebGL 3D Engine";
    if (clamped < 55) return "[ 02 / 04 ] Compiling Shaders & Textures";
    if (clamped < 85) return "[ 03 / 04 ] Mounting Interactive Systems";
    if (clamped < 100) return "[ 04 / 04 ] Calibrating Viewport & Assets";
    return "[ READY ] Environment Loaded — Welcome";
  };

  return (
    <div className={`custom-loader ${isExiting ? "loader-exiting" : ""}`}>
      {/* Ambient background glows */}
      <div className="loader-bg-glow1" />
      <div className="loader-bg-glow2" />

      {/* Top Header */}
      <header className="loader-header">
        <div className="loader-brand">
          <div className="loader-logo">
            MK<span>.</span>
          </div>
          <div className="loader-sub-brand">
            Muhammad Kamran · Software Engineer
          </div>
        </div>
        <div className="loader-status-pill">
          <span className="loader-status-dot" />
          <span>{isReady ? "SYSTEM READY" : "BOOTING // STANDBY"}</span>
        </div>
      </header>

      {/* Center Core Display */}
      <main className="loader-center">
        <div className="loader-badge">
          Engineering Portfolio // 2026
        </div>

        <div className="loader-stage-text" aria-live="polite">
          {getStageMessage()}
        </div>

        <div className="loader-counter">
          {formattedPercent}
          <span className="loader-counter-unit">%</span>
        </div>

        {/* Progress Track */}
        <div
          className="loader-track"
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={clamped}
        >
          <div
            className="loader-fill"
            style={{ width: `${clamped}%` }}
          />
        </div>

        {/* Telemetry info */}
        <div className="loader-telemetry">
          <span>PIPELINE: ACTIVE</span>
          <span>FPS TARGET: 60</span>
          <span>ASSETS: {clamped}% SYNCED</span>
        </div>

        {/* Optional Action Area */}
        <div className="loader-action-area">
          {isReady && (
            <button
              className="loader-enter-btn"
              onClick={triggerEnter}
              data-cursor="disable"
            >
              Enter Experience <span>→</span>
            </button>
          )}
        </div>
      </main>

      {/* Technical Footer */}
      <footer className="loader-footer">
        <div className="loader-footer-left">
          KARACHI, PAKISTAN · FULL-STACK & AI
        </div>
        <div className="loader-footer-tags">
          <span>REACT</span> · <span>THREE.JS</span> · <span>NODE.JS</span> · <span>BLOCKCHAIN</span> · <span>AI AGENTS</span>
        </div>
      </footer>
    </div>
  );
};

export default Loading;
