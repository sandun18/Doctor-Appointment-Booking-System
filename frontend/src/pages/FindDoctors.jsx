import { useState } from 'react'
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  X,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Activity
} from 'lucide-react'

const allDoctors = [
  {
    id: 1,
    name: 'Dr. James Wilson',
    specialty: 'Cardiology',
    hospital: 'Cardiovascular Care Hospital, New York',
    rating: 4.9,
    reviewsCount: 142,
    fee: '$120',
    availableDate: 'Today',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: 'Specialist in preventative cardiology, coronary artery disease, and lipid management with 15+ years of clinical excellence.'
  },
  {
    id: 2,
    name: 'Dr. Sarah Chen',
    specialty: 'Neurology',
    hospital: 'Metro Health Medical Center, Boston',
    rating: 4.95,
    reviewsCount: 198,
    fee: '$150',
    availableDate: 'Tomorrow',
    image: 'https://images.unsplash.com/photo-1594824813566-788812678687?auto=format&fit=crop&q=80&w=400',
    bio: 'Renowned expert in neurological migraines, sleep medicine, and autonomic nervous system disorders.'
  },
  {
    id: 3,
    name: 'Dr. Michael Ross',
    specialty: 'Orthopedics',
    hospital: 'St. Jude Sports & Joint Center, Chicago',
    rating: 4.85,
    reviewsCount: 110,
    fee: '$130',
    availableDate: 'Oct 22',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Specializing in minimally invasive arthroscopic joint repair and post-injury musculoskeletal rehabilitation.'
  },
  {
    id: 4,
    name: 'Dr. Elena Rodriguez',
    specialty: 'Dermatology',
    hospital: 'Aesthetic & Clinical Skin Care, Miami',
    rating: 4.8,
    reviewsCount: 88,
    fee: '$110',
    availableDate: 'Today',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    bio: 'Expert in clinical dermatology, inflammatory skin conditions, and advanced laser dermatologic therapies.'
  },
]

export default function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [bookedSuccess, setBookedSuccess] = useState(false)

  const specialties = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology']

  const filteredDoctors = allDoctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Find & Book Verified Specialists
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Book certified clinical consultations with leading healthcare physicians.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors, clinical specialties, hospital..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00a884] focus:outline-none shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-[#00a884] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="rounded-3xl bg-white p-6 shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="h-20 w-20 rounded-2xl object-cover shadow-xs border border-slate-100 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[#00a884]">
                      {doc.specialty}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star size={14} className="fill-current" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{doc.hospital}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-6">
                {doc.bio}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-[11px] font-medium text-slate-400 block">
                  Consultation Fee
                </span>
                <span className="text-base font-extrabold text-slate-900">
                  {doc.fee}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedDoctor(doc)
                  setBookedSuccess(false)
                }}
                className="rounded-2xl bg-[#00a884] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#009272] transition cursor-pointer flex items-center gap-2"
              >
                <Calendar size={14} />
                <span>Book Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Confirm Booking</h3>
                <p className="text-xs text-[#00a884] font-medium">{selectedDoctor.name}</p>
              </div>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {bookedSuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-[#00a884] mb-4">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Appointment Confirmed!</h4>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  You are scheduled with {selectedDoctor.name}. A confirmation SMS and calendar invite has been sent to your phone.
                </p>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="w-full rounded-2xl bg-[#00a884] py-3 text-xs font-bold text-white hover:bg-[#009272]"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Earliest Slot:</span>
                  <span className="font-bold text-slate-900">Tomorrow at 10:30 AM</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Sandun Perera"
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-[#00a884] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+94 77 123 4567"
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-[#00a884] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setBookedSuccess(true)}
                    className="w-full rounded-2xl bg-[#00a884] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#009272] transition cursor-pointer"
                  >
                    Confirm Booking ({selectedDoctor.fee})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
