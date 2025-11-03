'use client';

import Sidebar from './components/layout/Sidebar';
import Canvas from './components/layout/Canvas';

export default function Home() {
  return (
    <div className="flex h-screen text-white overflow-hidden bg-primary">
      <Sidebar />
      <Canvas />
    </div>
  );
}
