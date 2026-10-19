import { useState } from 'react'
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  FileText,
  AlertCircle,
  Stethoscope,
  Sparkles
} from 'lucide-react'

export default function DoctorPortal() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Michael Scott',
      age: 46,
      time: '09:00 AM',
      reason: 'Chronic Hypertension Follow-up',
      vitals: '138/88 mmHg, 98 mg/dL',
      status: 'In Consultation'
    },
    {
      id: 2,
      name: 'Jessica Adams',
      age: 32,
      time: '10:00 AM',
      reason: 'Migraine with visual aura (AI Triage: URGENT)',
      vitals: '116/74 mmHg, 90 mg/dL',
      status: 'Waiting'
    },
    {
      id: 3,
      name: 'David Kim',
      age: 58,
      time: '11:15 AM',
      reason: 'Type 2 Diabetes Routine Review',
      vitals: '124/80 mmHg, 142 mg/dL',
      status: 'Upcoming'
    }
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#00a884] uppercase tracking-wider block mb-1">
            Clinical Practitioner Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dr. Sarah Chen's Consultation Queue
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Neurology & Internal Medicine • Metro Health Center
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            Clinic Online
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Patient Schedule */}
        <div className="lg:col-span-2 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Today's Patients
          </h2>

          <div className="space-y-4">
            {patients.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {p.name}
                    </h3>
                    <span className="text-xs text-slate-400">
                      ({p.age} yrs)
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        p.status === 'In Consultation'
                          ? 'bg-blue-100 text-blue-700'
                          : p.status === 'Waiting'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {p.reason}
                  </p>

                  <p className="text-[11px] text-slate-400 mt-2 font-mono">
                    Recorded Vitals: {p.vitals}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button className="rounded-xl bg-[#00a884] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#009272] transition cursor-pointer">
                    Open Chart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: AI Note Drafter */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00a884] mb-3">
              <Sparkles size={16} />
              <span>AI Clinical Note Drafter</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Voice & Text Transcription
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Dictate or type during consultation to auto-generate structured ICD diagnoses and pharmacy scripts.
            </p>

            <textarea
              rows="6"
              placeholder="e.g. Patient presents with tension cephalalgia. Normal cranial nerves. Prescribe Ibuprofen 400mg PRN..."
              className="w-full rounded-2xl border border-slate-200 p-3.5 text-xs text-slate-800 focus:border-[#00a884] focus:outline-none leading-relaxed"
            />
          </div>

          <button className="mt-4 w-full rounded-2xl bg-[#00a884] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#009272] transition flex items-center justify-center gap-2">
            <FileText size={15} />
            <span>Generate Prescription</span>
          </button>
        </div>
      </div>
    </div>
  )
}
