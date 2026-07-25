import { Link } from 'react-router-dom'
import { Stethoscope, Phone, Mail, MapPin, Globe, Share2, Camera, Briefcase } from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '#' },
    { label: 'Blog', to: '#' },
  ],
  Services: [
    { label: 'Find Doctors', to: '/doctors' },
    { label: 'Book Appointment', to: '/doctors' },
    { label: 'Specialities', to: '/doctors' },
    { label: 'Emergency', to: '#' },
  ],
  Support: [
    { label: 'Help Center', to: '#' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Cookie Policy', to: '#' },
  ],
}

const socials = [
  { icon: Globe,    href: '#', label: 'Website' },
  { icon: Share2,   href: '#', label: 'Twitter' },
  { icon: Camera,   href: '#', label: 'Instagram' },
  { icon: Briefcase,href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
                <Stethoscope size={18} />
              </span>
              <span className="text-base font-bold text-slate-900">
                Health<span className="text-primary">Care</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm text-slate-500 leading-relaxed">
              Book appointments with trusted doctors instantly. Quality healthcare at your fingertips.
            </p>

            <div className="mt-5 flex flex-col gap-2 text-sm text-slate-500">
              <span className="flex items-center gap-2"><Phone size={14} className="text-primary" /> +94 11 234 5678</span>
              <span className="flex items-center gap-2"><Mail size={14} className="text-primary" /> support@healthcare.lk</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Colombo, Sri Lanka</span>
            </div>

            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="mb-4 text-sm font-semibold text-slate-900">{section}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-slate-500 transition hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="mt-10 border-slate-100" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} HealthCare. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built with ❤️ in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  )
}
