'use client';

import { useAppStore } from '../store';
import Toggle from './Toggle';
import Slider from './Slider';

export default function FanDevice() {
  const { fanSettings, updateFanSettings } = useAppStore();
  const { power, speed } = fanSettings;

  // Animation speed based on power and speed
  const animationDuration = power ? 3 - (speed / 100) * 2 : 0; // 1-3 seconds

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Fan Visual */}
      <div className="relative">
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="transition-all duration-300"
        >
          <defs>
            <linearGradient id="fanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          
          {/* Fan blades */}
          <g
            style={{
              transformOrigin: '80px 80px',
              animation: power
                ? `spin ${animationDuration}s linear infinite`
                : 'none',
            }}
          >
            {/* Blade 1 */}
            <path
              d="M 80 80 L 80 30 L 100 80 Z"
              fill={power ? 'url(#fanGradient)' : '#4B5563'}
              stroke="#6B7280"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            {/* Blade 2 */}
            <path
              d="M 80 80 L 130 80 L 80 100 Z"
              fill={power ? 'url(#fanGradient)' : '#4B5563'}
              stroke="#6B7280"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            {/* Blade 3 */}
            <path
              d="M 80 80 L 80 130 L 60 80 Z"
              fill={power ? 'url(#fanGradient)' : '#4B5563'}
              stroke="#6B7280"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            {/* Blade 4 */}
            <path
              d="M 80 80 L 30 80 L 80 60 Z"
              fill={power ? 'url(#fanGradient)' : '#4B5563'}
              stroke="#6B7280"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          </g>
          
          {/* Center circle */}
          <circle
            cx="80"
            cy="80"
            r="15"
            fill="#1a1f2e"
            stroke="#6B7280"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Control Panel */}
      <div className="w-full max-w-sm bg-black/40 backdrop-blur-sm rounded-xl p-6 space-y-6 border border-gray-700/50">
        {/* Power Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Power</span>
          <Toggle
            checked={power}
            onChange={(checked) => updateFanSettings({ power: checked })}
          />
        </div>

        {/* Speed Slider */}
        <Slider
          value={speed}
          onChange={(value) => updateFanSettings({ speed: value })}
          min={0}
          max={100}
          label="Speed"
          showPercentage={true}
        />
      </div>
    </div>
  );
}

