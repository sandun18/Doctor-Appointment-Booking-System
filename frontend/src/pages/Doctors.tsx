import { useMemo, useState } from "react";
import DoctorCard, { type Doctor } from "../components/cards/DoctorCard";

const SPECIALITIES = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Gastroenterologist",
] as const;

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

export default function Doctors() {
  const [selected, setSelected] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selected === "All") return DOCTORS;
    return DOCTORS.filter((d) => d.speciality === selected);
  }, [selected]);

  return (
    <div className="bg-[#f8f9fd]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-6">
          <h1 className="text-2xl font-bold md:text-3xl">Doctors</h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Browse doctors by speciality and availability.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Speciality</p>

            <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
              <button
                type="button"
                onClick={() => setSelected("All")}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  selected === "All"
                    ? "bg-[#5f6fff] text-white"
                    : "bg-[#eef2ff] text-slate-700 hover:bg-[#e4e9ff]",
                ].join(" ")}
              >
                All
              </button>

              {SPECIALITIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelected(s)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition text-left",
                    selected === s
                      ? "bg-[#5f6fff] text-white"
                      : "bg-[#eef2ff] text-slate-700 hover:bg-[#e4e9ff]",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
          </aside>

          <section>
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
              doctor{filtered.length === 1 ? "" : "s"}
              {selected !== "All" ? (
                <>
                  {" "}
                  in <span className="font-semibold text-slate-900">{selected}</span>
                </>
              ) : null}
            </p>

            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}