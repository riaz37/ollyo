'use client';

import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0f1419] text-white overflow-hidden">
      <Sidebar />
      <Canvas />
    </div>
  );
}
