import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Activity,
  TrendingDown,
  Calendar,
  CalendarCheck,
  Clock,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  FileText,
  AlertCircle,
  X
} from 'lucide-react'

export default function Dashboard() {
  const [selectedRange, setSelectedRange] = useState('90d')
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Chen',
      specialty: 'Neurologist',
      hospital: 'Metro Health Medical Center',
      date: 'Tomorrow, Oct 20',
      time: '10:30 AM',
      type: 'In-Clinic Consultation',
      status: 'Confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. James Wilson',
      specialty: 'Cardiologist',
      hospital: 'Cardiovascular Care Hospital',
      date: 'Friday, Oct 24',
      time: '02:15 PM',
      type: 'Follow-up Check',
      status: 'Scheduled',
    },
  ])

  // Data series for the selected timeline
  const chartDatasets = {
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      line1: 'M 30,55 Q 120,52 220,56 T 420,53 T 620,58 T 850,56',
      area1: 'M 30,55 Q 120,52 220,56 T 420,53 T 620,58 T 850,56 L 850,220 L 30,220 Z',
      line2: 'M 30,108 Q 120,105 220,110 T 420,104 T 620,109 T 850,107',
      area2: 'M 30,108 Q 120,105 220,110 T 420,104 T 620,109 T 850,107 L 850,220 L 30,220 Z',
      bp: '118/76',
      glucose: '94',
    },
    '30d': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      line1: 'M 30,52 Q 180,50 360,56 T 600,60 T 850,62',
      area1: 'M 30,52 Q 180,50 360,56 T 600,60 T 850,62 L 850,220 L 30,220 Z',
      line2: 'M 30,102 Q 180,104 360,109 T 600,112 T 850,115',
      area2: 'M 30,102 Q 180,104 360,109 T 600,112 T 850,115 L 850,220 L 30,220 Z',
      bp: '119/77',
      glucose: '93',
    },
    '90d': {
      labels: ['Month 1', 'Month 2', 'Month 3'],
      // Smooth descent matching the screenshot
      line1: 'M 30,48 C 220,49 460,62 850,66',
      area1: 'M 30,48 C 220,49 460,62 850,66 L 850,220 L 30,220 Z',
      line2: 'M 30,95 C 220,100 480,114 850,120',
      area2: 'M 30,95 C 220,100 480,114 850,120 L 850,220 L 30,220 Z',
      bp: '118/78',
      glucose: '92',
    },
  }

  const currentData = chartDatasets[selectedRange]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Patient Dashboard
          </h1>
          <p className="mt-1 text-base text-slate-500 font-normal">
            Welcome back — here's your health at a glance.
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-2xl bg-[#00a884] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#009272] hover:shadow-md cursor-pointer"
          >
            <Calendar size={18} />
            <span>Book new appointment</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards Row (Exact replica of screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Blood Pressure */}
        <div className="rounded-3xl bg-white p-6 shadow-xs border border-slate-100/80 transition hover:shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <Heart size={24} className="stroke-[2.2]" />
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
              -8%
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-500 block mb-1">
              Blood Pressure
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                {currentData.bp}
              </span>
              <span className="text-sm font-medium text-slate-400">
                mmHg
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Glucose */}
        <div className="rounded-3xl bg-white p-6 shadow-xs border border-slate-100/80 transition hover:shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
              <Activity size={24} className="stroke-[2.2]" />
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
              -10%
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-500 block mb-1">
              Glucose
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                {currentData.glucose}
              </span>
              <span className="text-sm font-medium text-slate-400">
                mg/dL
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: BMI */}
        <div className="rounded-3xl bg-white p-6 shadow-xs border border-slate-100/80 transition hover:shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
              <TrendingDown size={24} className="stroke-[2.2]" />
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
              -7%
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-500 block mb-1">
              BMI
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                24.2
              </span>
              <span className="text-sm font-medium text-slate-400">
                kg/m²
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Chart Section: Health vitals trend (Exact replica of screenshot) */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100 mb-10">
        
        {/* Header & Range Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Health vitals trend
          </h2>

          <div className="inline-flex items-center rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`rounded-lg px-3.5 py-1.5 transition cursor-pointer ${
                  selectedRange === range
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Chart Container */}
        <div className="relative w-full overflow-hidden pt-4 pb-2">
          <svg
            viewBox="0 0 880 230"
            className="w-full h-56 sm:h-72 text-slate-200"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Linear Gradient for Teal Line */}
              <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>

              {/* Linear Gradient for Sky Blue Line */}
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            <g className="stroke-slate-100" strokeDasharray="4 4" strokeWidth="1">
              <line x1="30" y1="35" x2="860" y2="35" />
              <line x1="30" y1="80" x2="860" y2="80" />
              <line x1="30" y1="125" x2="860" y2="125" />
              <line x1="30" y1="170" x2="860" y2="170" />
              <line x1="30" y1="215" x2="860" y2="215" />
            </g>

            {/* Y-Axis Value Labels */}
            <g className="fill-slate-400 text-[11px] font-sans">
              <text x="10" y="38" textAnchor="end">140</text>
              <text x="10" y="83" textAnchor="end">105</text>
              <text x="10" y="128" textAnchor="end">70</text>
              <text x="10" y="173" textAnchor="end">35</text>
            </g>

            {/* Gradient Area Fills */}
            <path
              d={currentData.area1}
              fill="url(#tealGrad)"
              className="transition-all duration-500 ease-in-out"
            />
            <path
              d={currentData.area2}
              fill="url(#skyGrad)"
              className="transition-all duration-500 ease-in-out"
            />

            {/* Teal Line (Systolic BP) */}
            <path
              d={currentData.line1}
              fill="none"
              stroke="#00a884"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out"
            />

            {/* Cyan/Blue Line (Glucose / Diastolic) */}
            <path
              d={currentData.line2}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>

          {/* Chart Legend */}
          <div className="flex items-center justify-end gap-6 mt-3 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#00a884]" />
              <span>Systolic BP (Target &lt; 120 mmHg)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#0ea5e9]" />
              <span>Fasting Blood Glucose (mg/dL)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Two Column Section: Upcoming Appointments & AI Assistant Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Upcoming Appointments */}
        <div className="lg:col-span-2 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Upcoming Appointments
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your scheduled clinical consultations
              </p>
            </div>
            <Link
              to="/doctors"
              className="text-xs font-semibold text-[#00a884] hover:underline flex items-center gap-1"
            >
              Browse all doctors <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-emerald-100/70 text-[#00a884] flex items-center justify-center shrink-0 font-bold">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {appt.doctor}
                    </h3>
                    <p className="text-xs font-medium text-[#00a884]">
                      {appt.specialty} • <span className="text-slate-500">{appt.hospital}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Calendar size={13} className="text-slate-400" />
                        {appt.date}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock size={13} className="text-slate-400" />
                        {appt.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {appt.status}
                  </span>
                  <button
                    onClick={() => {
                      setAppointments(appointments.filter(a => a.id !== appt.id))
                    }}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: AI Health Hub Shortcut Card */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-4 border border-emerald-500/30">
              <Sparkles size={13} />
              <span>AI Health Hub</span>
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white mb-2">
              Check your symptoms with Clinical AI
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Our clinical AI triages your symptoms in real-time, estimates disease risks, and directs you to the exact medical specialty.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-xs bg-white/5 p-3 rounded-xl border border-white/10">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Specialist triage with confidence score</span>
              </div>
              <div className="flex items-center gap-3 text-xs bg-white/5 p-3 rounded-xl border border-white/10">
                <Activity size={16} className="text-cyan-400 shrink-0" />
                <span>Cardiovascular & Diabetes risk assessment</span>
              </div>
            </div>
          </div>

          <Link
            to="/ai-health-hub"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00a884] py-3 text-xs font-bold text-white shadow-md hover:bg-[#009272] transition"
          >
            <span>Launch AI Health Hub</span>
            <ChevronRight size={15} />
          </Link>
        </div>

      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Book New Doctor Appointment
                </h3>
                <p className="text-xs text-slate-500">
                  Select your doctor, preferred date and time slot
                </p>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target
                const newAppt = {
                  id: Date.now(),
                  doctor: form.doctor.value,
                  specialty: form.doctor.value.includes('Wilson') ? 'Cardiology' : 'Neurology',
                  hospital: 'Metro Health Medical Center',
                  date: form.date.value || 'Nov 02',
                  time: form.time.value || '11:00 AM',
                  type: 'In-Clinic Consultation',
                  status: 'Confirmed',
                }
                setAppointments([newAppt, ...appointments])
                setIsBookingModalOpen(false)
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Doctor & Specialty
                </label>
                <select
                  name="doctor"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#00a884] focus:outline-none"
                  required
                >
                  <option value="Dr. James Wilson (Cardiology)">Dr. James Wilson — Cardiology</option>
                  <option value="Dr. Sarah Chen (Neurology)">Dr. Sarah Chen — Neurology</option>
                  <option value="Dr. Michael Ross (Orthopedics)">Dr. Michael Ross — Orthopedics</option>
                  <option value="Dr. Elena Rodriguez (Dermatology)">Dr. Elena Rodriguez — Dermatology</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#00a884] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    name="time"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#00a884] focus:outline-none"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:45 PM">04:45 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Brief description of symptoms (optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Mild chest pain after running, routine health checkup..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-[#00a884] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#00a884] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#009272]"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
