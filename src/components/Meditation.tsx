import React from 'react';
import { useWasmTimer } from '../hooks/useWasm';

interface MeditationProps {
  theme: 'day' | 'night';
}

export default function Meditation({ theme }: MeditationProps) {
  const { remainingTime, isActive, toggleTimer, resetTimer } = useWasmTimer(300);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className={`text-5xl font-extralight mb-6 tracking-wider ${
        theme === 'day' ? 'text-slate-700' : 'text-slate-200'
      }`}>
        {formatTime(remainingTime)}
      </div>
      <div className="space-x-3">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-full text-sm transition-all duration-300 ${
            theme === 'day'
              ? 'bg-gradient-to-r from-slate-100 to-blue-100 text-slate-700 hover:from-slate-200 hover:to-blue-200 shadow-md hover:shadow-lg'
              : 'bg-gradient-to-r from-slate-700 to-blue-900 text-slate-200 hover:from-slate-600 hover:to-blue-800 shadow-md shadow-slate-900/20 hover:shadow-lg'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className={`px-8 py-3 rounded-full text-sm transition-all duration-300 ${
            theme === 'day'
              ? 'bg-gradient-to-r from-slate-100 to-rose-100 text-slate-700 hover:from-slate-200 hover:to-rose-200 shadow-md hover:shadow-lg'
              : 'bg-gradient-to-r from-slate-700 to-rose-900 text-slate-200 hover:from-slate-600 hover:to-rose-800 shadow-md shadow-slate-900/20 hover:shadow-lg'
          }`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}