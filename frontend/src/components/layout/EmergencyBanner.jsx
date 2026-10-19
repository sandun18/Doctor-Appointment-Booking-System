import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function EmergencyBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-[#e11d48] text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm transition-all">
      <div className="flex-1 flex items-center justify-center gap-2 text-center">
        <AlertTriangle size={15} className="shrink-0 text-amber-200" />
        <span>
          Medical emergency? Call <strong className="font-bold underline cursor-pointer">911</strong> or our hotline{' '}
          <strong className="font-bold tracking-wide">1-800-MED-CARE</strong>. This platform is not for emergencies.
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss banner"
        className="shrink-0 ml-3 p-1 rounded-full hover:bg-white/20 transition cursor-pointer text-white/90 hover:text-white"
      >
        <X size={15} />
      </button>
    </div>
  )
}
