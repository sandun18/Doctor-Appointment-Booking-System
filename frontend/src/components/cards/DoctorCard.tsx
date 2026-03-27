import { Link } from "react-router-dom";

export type Doctor = {
  id: number | string;
  name: string;
  speciality: string;
  image: string;
  available?: boolean;
};

type DoctorCardProps = {
  doctor: Doctor;
  href?: string;
};

export default function DoctorCard({ doctor, href }: DoctorCardProps) {
  const content = (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="bg-[#eef2ff]">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-56 w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
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
    </div>
  );

  return href ? (
    <Link to={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}