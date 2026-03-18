import { Link } from "react-router-dom";

type Speciality = { name: string; icon: string };
type Doctor = { id: number; name: string; speciality: string; image: string; available?: boolean };

const specialities: Speciality[] = [
  { name: "General Physician", icon: "🩺" },
  { name: "Gynecologist", icon: "👩‍⚕️" },
  { name: "Dermatologist", icon: "🧴" },
  { name: "Pediatrician", icon: "👶" },
  { name: "Neurologist", icon: "🧠" },
  { name: "Gastroenterologist", icon: "💊" },
];

const topDoctors: Doctor[] = [
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

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );

}

function Home() {
  return (
    <div className="bg-[#f8f9fd] text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#5f6fff] via-[#5f6fff] to-[#7b86ff]">
          <div className="grid items-center gap-10 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-14 lg:py-14">
            <div className="text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Available doctors • Quick booking
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                Book appointments
                <br />
                with trusted doctors
              </h1>

              <p className="mt-4 max-w-md text-sm text-white/90 md:text-base">
                Search specialists, view doctor profiles, and book your slot in minutes.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5f6fff] shadow-md transition hover:scale-[1.02]"
                >
                  Find doctors
                </Link>

                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Book appointment
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <StatCard title="Doctors" value="100+" />
                <StatCard title="Specialities" value="20+" />
                <StatCard title="Bookings" value="1K+" />
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-6 rounded-3xl bg-white/15 blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctors"
                  className="relative h-[280px] w-full rounded-3xl object-cover shadow-lg md:h-[360px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specialities */}
        <section className="py-14 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Find by speciality</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Choose a speciality and start booking with verified doctors.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {specialities.map((item) => (
              <div
                key={item.name}
                className="group flex cursor-pointer flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2ff] text-3xl transition group-hover:scale-105">
                  {item.icon}
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top Doctors */}
        <section className="pb-16 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Top doctors to book</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Quick picks based on availability and patient ratings.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {topDoctors.map((doctor) => (
              <Link
                to={`/doctors/${doctor.id}`}
                key={doctor.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-[#eef2ff]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-56 w-full object-cover transition group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
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

                  <h3 className="text-base font-semibold text-slate-900">{doctor.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{doctor.speciality}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/doctors"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-[#e9edff] px-8 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#dbe3ff]"
          >
            View all doctors
          </Link>
        </section>

        {/* CTA Banner */}
        <section className="pb-16">
          <div className="overflow-hidden rounded-3xl bg-[#5f6fff]">
            <div className="grid items-center gap-8 px-8 py-10 md:grid-cols-2 md:px-12">
              <div className="text-white">
                <h2 className="text-2xl font-bold leading-snug md:text-4xl">
                  Create your account
                  <br />
                  and book faster
                </h2>

                <p className="mt-3 text-sm text-white/90 md:text-base">
                  Save your details, manage appointments, and get reminders.
                </p>

                <Link
                  to="/register"
                  className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5f6fff] transition hover:scale-[1.02]"
                >
                  Create account
                </Link>
              </div>

              <div className="flex justify-center md:justify-end">
                <img
                  src="https://images.unsplash.com/photo-1591604025215-2edd4f8a3c06?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor"
                  className="h-[260px] w-full max-w-sm rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;