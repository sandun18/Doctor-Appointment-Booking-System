export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  image: string;
  available: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
  onClick?: () => void;
}

export default function DoctorCard({ doctor, onClick }: DoctorCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{doctor.name}</h3>
        <p className="text-sm text-slate-600">{doctor.speciality}</p>
        <div className="mt-3 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              doctor.available
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {doctor.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>
    </div>
  );
}
