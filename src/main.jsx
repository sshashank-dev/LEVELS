import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from '@studio-freight/lenis'
import './index.css'
import App from './App.jsx'

function Root() {
  useEffect(() => {
    // We target the main-content-area specifically
    const scrollEl = document.getElementById('main-content-area');
    if (!scrollEl) return;

    const lenis = new Lenis({
      wrapper: scrollEl,       // The container that clips
      content: scrollEl.firstElementChild, // The long content inside
      duration: 2.2,           // Long duration for "slow" feel
      lerp: 0.04,              // Low lerp for "heavy" feel
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)