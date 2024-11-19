import { useEffect, useState } from 'react';
import init, { Timer, BreathingCycle } from '../lib.rs';

export const useWasmTimer = (initialDuration: number) => {
  const [timer, setTimer] = useState<Timer | null>(null);
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const initWasm = async () => {
      await init();
      setTimer(new Timer(initialDuration));
    };
    initWasm();
  }, [initialDuration]);

  useEffect(() => {
    if (!timer) return;

    let animationFrame: number;
    const updateTime = () => {
      if (timer.is_active()) {
        const remaining = timer.get_remaining_time(performance.now());
        setRemainingTime(remaining);
        animationFrame = requestAnimationFrame(updateTime);
      }
    };

    if (isActive) {
      timer.start(performance.now());
      animationFrame = requestAnimationFrame(updateTime);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [timer, isActive]);

  const toggleTimer = () => {
    if (!timer) return;

    if (isActive) {
      timer.pause(performance.now());
    } else {
      timer.start(performance.now());
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (!timer) return;
    timer.reset(initialDuration);
    setRemainingTime(initialDuration);
    setIsActive(false);
  };

  return { remainingTime, isActive, toggleTimer, resetTimer };
};

export const useWasmBreathing = () => {
  const [cycle, setCycle] = useState<BreathingCycle | null>(null);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const initWasm = async () => {
      await init();
      setCycle(new BreathingCycle());
    };
    initWasm();
  }, []);

  useEffect(() => {
    if (!cycle) return;

    let animationFrame: number;
    const updatePhase = () => {
      if (cycle.is_active()) {
        const currentPhase = cycle.get_phase(performance.now());
        setPhase(
          currentPhase === 0 ? 'inhale' :
          currentPhase === 1 ? 'hold' : 'exhale'
        );
        animationFrame = requestAnimationFrame(updatePhase);
      }
    };

    if (isActive) {
      cycle.start(performance.now());
      animationFrame = requestAnimationFrame(updatePhase);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [cycle, isActive]);

  const toggleBreathing = () => {
    if (!cycle) return;

    if (isActive) {
      cycle.stop();
    } else {
      cycle.start(performance.now());
    }
    setIsActive(!isActive);
  };

  return { phase, isActive, toggleBreathing };
};