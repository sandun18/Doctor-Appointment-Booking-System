import { useState } from 'react';
import { 
  Search, MapPin, Play, ShieldCheck, Star, 
  Heart, Baby, Brain, Eye, Stethoscope, Activity, 
  Users, Calendar, Headphones, ChevronRight 
} from 'lucide-react';

// 1. Specialties Data
const specialties = [
  { id: '1', name: 'Cardiology', icon: Heart },
  { id: '2', name: 'Pediatrics', icon: Baby },
  { id: '3', name: 'Neurology', icon: Brain },
  { id: '4', name: 'Ophthalmology', icon: Eye },
  { id: '5', name: 'Dermatology', icon: Stethoscope },
  { id: '6', name: 'Radiology', icon: Activity },
];

// 2. Doctors Data
const doctors = [
  {
    id: '1',
    name: 'Dr. James Wilson',
    specialty: 'Senior Cardiologist',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
  },
  {
    id: '2',
    name: 'Dr. Sarah Chen',
    specialty: 'Pediatric Specialist',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594824813566-788812678687?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
  },
  {
    id: '3',
    name: 'Dr. Michael Ross',
    specialty: 'Neurologist',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    availableToday: false,
  },
  {
    id: '4',
    name: 'Dr. Elena Rodriguez',
    specialty: 'Dermatology Expert',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    availableToday: true,
  },
];

// 3. Testimonials Data
const testimonials = [
  {
    id: '1',
    quote: "Found a top-rated cardiologist and saw them the same week. Truly a life-saver platform!",
    name: "Robert Fox",
    patientSince: "2023",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: '2',
    quote: "Easy pediatric booking is essential for busy parents. DocCare has become my go-to app.",
    name: "Darlene Robertson",
    patientSince: "2022",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: '3',
    quote: "I've had several consultations and every physician was professional, attentive, and skilled.",
    name: "Albert Flores",
    patientSince: "2021",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
  }
];

export default function Home() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION & SEARCH */}
      <section className="relative bg-gradient-to-br from-blue-50/50 via-white to-sky-50/30 rounded-3xl p-6 lg:p-12 border border-blue-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100/60 px-4 py-1.5 rounded-full text-blue-700 text-sm font-medium">
              <span>Trusted by 2M+ Patients</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Your Health, <br />
              <span className="text-blue-600">Our Priority</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
              Connect with world-class medical professionals and manage your healthcare journey with precision and compassion.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all">
                Book Appointment
              </button>
              <button className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl flex items-center space-x-2 transition-all">
                <Play className="w-4 h-4 fill-current" />
                <span>Watch How It Works</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                alt="Doctor"
                className="w-full h-[420px] object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">100% Verified Experts</p>
                  <p className="text-xs text-gray-500">Clinical precision & care</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Search Bar */}
        <div className="mt-12 bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center" onSubmit={(e) => e.preventDefault()}>
            <div className="md:col-span-5 flex items-center space-x-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search doctor, specialty, or hospital"
                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>
            <div className="md:col-span-4 flex items-center space-x-3 px-3 py-2">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-sm"
              >
                Find Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* EXPLORE SPECIALTIES */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore Top Specialties</h2>
            <p className="text-gray-500 text-sm mt-1">World-class care across 50+ medical fields</p>
          </div>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-1">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedSpecialty === item.name;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSpecialty(isSelected ? null : item.name)}
                className={`p-6 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-3 text-center ${
                  isSelected 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <div className={`p-3 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-sm">{item.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* TOP RATED DOCTORS */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Top Rated Doctors</h2>
          <p className="text-gray-500 text-sm">Highly recommended medical professionals based on verified patient feedback</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative overflow-hidden">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center space-x-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doc.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{doc.specialty}</p>
                </div>
                
                <div className="pt-2 flex items-center justify-between border-t border-gray-50 text-xs">
                  <span className={`px-2 py-1 rounded-md font-medium ${doc.availableToday ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    {doc.availableToday ? 'Available Today' : 'Next Available: Tomorrow'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="bg-gradient-to-r from-blue-50/60 to-slate-50 rounded-3xl p-8 lg:p-12 border border-blue-50/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
              alt="Consultation"
              className="w-full h-[320px] object-cover" 
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Why Thousands of Patients Trust DocCare
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Expert Doctors</h4>
                  <p className="text-sm text-gray-600">Our network consists of top-tier, board-certified medical professionals.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Easy Booking</h4>
                  <p className="text-sm text-gray-600">Schedule appointments instantly without waiting on hold.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Dedicated support team available round-the-clock for emergency needs.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="space-y-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Patients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
              <p className="text-gray-600 text-sm italic">"{t.quote}"</p>
              <div className="flex items-center space-x-3 pt-2">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{t.name}</h4>
                  <p className="text-xs text-gray-400">Patient since {t.patientSince}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-blue-600 rounded-3xl p-8 lg:p-12 text-center text-white space-y-6 shadow-xl shadow-blue-500/20">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to take care of your health?</h2>
        <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
          Join thousands of patients who have already discovered a better way to manage their healthcare.
        </p>
        <div>
          <button className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl shadow-lg transition-all">
            Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
}
