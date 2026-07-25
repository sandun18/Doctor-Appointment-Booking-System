import { Link } from 'react-router-dom'
import {
  Stethoscope, Baby, Brain, Heart, Eye, Bone,
  ArrowRight, Star, CheckCircle, Users, Calendar, Award
} from 'lucide-react'

// ─── Data ───────────────────────────────────────────────
const specialities = [
  { name: 'General Physician', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
  { name: 'Gynecologist',      icon: Heart,       color: 'bg-pink-100 text-pink-600' },
  { name: 'Dermatologist',     icon: Star,        color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Pediatrician',      icon: Baby,        color: 'bg-green-100 text-green-600' },
  { name: 'Neurologist',       icon: Brain,       color: 'bg-purple-100 text-purple-600' },
  { name: 'Ophthalmologist',   icon: Eye,         color: 'bg-cyan-100 text-cyan-600' },
  { name: 'Orthopedist',       icon: Bone,        color: 'bg-orange-100 text-orange-600' },
  { name: 'Cardiologist',      icon: Heart,       color: 'bg-red-100 text-red-600' },
]

const doctors = [
  {
    id: 1, name: 'Dr. Richard James', speciality: 'General Physician', rating: 4.9,
    experience: 8, available: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2, name: 'Dr. Sarah Perera', speciality: 'Gynecologist', rating: 4.8,
    experience: 12, available: true,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3, name: 'Dr. Kavindu Silva', speciality: 'Dermatologist', rating: 4.7,
    experience: 6, available: false,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4, name: 'Dr. Nethmi Fernando', speciality: 'Pediatrician', rating: 4.9,
    experience: 10, available: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5, name: 'Dr. Imesha Wickramasinghe', speciality: 'Neurologist', rating: 4.8,
    experience: 15, available: true,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
  },
]

const stats = [
  { icon: Users,    value: '500+', label: 'Verified Doctors' },
  { icon: Calendar, value: '10K+', label: 'Appointments Booked' },
  { icon: Award,    value: '20+',  label: 'Specialities' },
  { icon: Star,     value: '4.9',  label: 'Average Rating' },
]

// ─── Sub-components ─────────────────────────────────────
function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/15 px-6 py-5 text-white backdrop-blur-sm border border-white/20">
      <Icon size={24} className="opacity-90" />
      <span className="text-2xl font-extrabold">{value}</span>
      <span className="text-xs text-white/80 font-medium">{label}</span>
    </div>
  )
}

function DoctorCard({ doctor }) {
  return (
    <Link
      to={`/doctors/${doctor.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden bg-primary-light h-52">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${doctor.available ? 'bg-emerald-500' : 'bg-rose-400'}`} />
          <span className={`text-xs font-medium ${doctor.available ? 'text-emerald-600' : 'text-rose-500'}`}>
            {doctor.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 text-sm leading-tight">{doctor.name}</h3>
        <p className="mt-0.5 text-xs text-slate-500">{doctor.speciality}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Star size={11} className="fill-yellow-400 text-yellow-400" />
            {doctor.rating}
          </span>
          <span>{doctor.experience} yrs exp.</span>
        </div>
      </div>
    </Link>
  )
}

// ─── Main Page ───────────────────────────────────────────
export default function Home() {
  return (
    <div className="bg-bg-light text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#6b78ff] to-[#8b8fff]">
          <div className="grid items-center gap-10 px-6 py-12 md:grid-cols-2 md:px-12 lg:py-16">

            {/* Left */}
            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                500+ Doctors Available Now
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                Book Appointments<br />
                <span className="text-white/80">with Trusted</span><br />
                Doctors
              </h1>

              <p className="mt-4 max-w-md text-sm text-white/85 md:text-base leading-relaxed">
                Search specialists, view doctor profiles, and book your slot in minutes.
                Quality healthcare is just one click away.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-md transition hover:scale-105"
                >
                  Find Doctors <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-white/80">
                {['Verified Doctors', 'Instant Booking', 'Secure & Private'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-emerald-300" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Hero image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=800&q=80"
                  alt="Doctor"
                  className="relative h-72 w-full rounded-3xl object-cover shadow-2xl md:h-96"
                />
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="border-t border-white/10 px-6 pb-8 pt-6 md:px-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(s => <StatCard key={s.label} {...s} />)}
            </div>
          </div>
        </section>

        {/* ── Specialities ── */}
        <section className="py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Browse by Category</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Find by Speciality</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 md:text-base">
            Choose a speciality and book with top-rated, verified doctors near you.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8">
            {specialities.map(({ name, icon: Icon, color }) => (
              <Link
                key={name}
                to={`/doctors?speciality=${encodeURIComponent(name)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${color} transition group-hover:scale-110`}>
                  <Icon size={22} />
                </div>
                <p className="text-center text-xs font-semibold text-slate-700 leading-tight">{name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Top Doctors ── */}
        <section className="pb-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Our Best</p>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl">Top Doctors to Book</h2>
              <p className="mt-2 text-sm text-slate-500">
                Handpicked based on availability, experience, and patient ratings.
              </p>
            </div>
            <Link
              to="/doctors"
              className="hidden items-center gap-1.5 rounded-full bg-primary-light px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-[#dbe3ff] sm:flex"
            >
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {doctors.map(doc => <DoctorCard key={doc.id} doctor={doc} />)}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-6 py-2.5 text-sm font-semibold text-primary"
            >
              View All Doctors <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#8b8fff]">
          <div className="grid items-center gap-8 px-8 py-12 md:grid-cols-2 md:px-14">
            <div className="text-white">
              <h2 className="text-2xl font-bold leading-snug md:text-4xl">
                Create Your Account &<br />Book Appointments Faster
              </h2>
              <p className="mt-3 text-sm text-white/85 md:text-base">
                Save your details, track your appointments, and get reminders — all in one place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-md transition hover:scale-105"
                >
                  Create Free Account <ArrowRight size={16} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1591604025215-2edd4f8a3c06?auto=format&fit=crop&w=600&q=80"
                alt="Healthcare"
                className="h-60 w-full max-w-sm rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
