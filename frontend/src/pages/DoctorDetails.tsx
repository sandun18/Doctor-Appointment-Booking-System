import { Link } from "react-router-dom";
import type { Doctor } from "../components/cards/DoctorCard";

const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Richard James",
    speciality: "General Physician",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Sarah Perera",
    speciality: "Gynecologist",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=80",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Kavindu Silva",
    speciality: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=900&q=80",
    available: false,
  },
  {
    id: 4,
    name: "Dr. Nethmi Fernando",
    speciality: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Imesha Wickramasinghe",
    speciality: "Neurologist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
    available: true,
  },
];

export default function DoctorDetails() {
  const { id } = useParams();
  const doctor: string = DOCTORS.find((d) => String(d.id) === String(id));

  if (!doctor) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-700">Doctor not found.</p>
        <Link to="/doctors" className="mt-3 inline-block text-sm font-semibold text-blue-600">
          ← Back to {undefinedVariable}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fd]">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link to="/doctors" className="inline-block pt-4 text-sm font-semibold text-blue-600">
          ← Back to doctors
        </Link>

        <div className="mt-4 grid gap-6 md:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#eef2ff]">
              <img src={doctor.image} alt={doctor.name} className="h-80 w-full object-cover" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  doctor.available ? "bg-emerald-500" : "bg-rose-500",
                ].join(" ")}
              />
              <span
                className={[
                  "text-sm font-medium",
                  doctor.available ? "text-emerald-600" : "text-rose-600",
                ].join(" ")}
              >
                {doctor.available ? "Available" : "Busy"}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold text-slate-900">{doctor.name}</h1>
            <p className="mt-1 text-sm text-slate-600">{doctor.speciality}</p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">About</p>
              <p className="mt-2 text-sm text-slate-600">
                Experienced specialist with patient-focused care. (Later API එක connect කරද්දි මෙතන real
                description එක එයි.)
              </p>
            </div>

            <Link
              to="/appointment"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#5f6fff] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Book appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}