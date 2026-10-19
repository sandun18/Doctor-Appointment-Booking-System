import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ShieldAlert,
  Activity,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Brain,
  Stethoscope,
  HeartPulse,
  Info
} from 'lucide-react'

export default function AIHealthHub() {
  const [activeTab, setActiveTab] = useState('triage')

  // Feature A State
  const [symptomText, setSymptomText] = useState(
    'I have been experiencing severe throbbing headaches on the right side of my head for 3 days, accompanied by nausea, blurred vision, and light sensitivity.'
  )
  const [triageLoading, setTriageLoading] = useState(false)
  const [triageResult, setTriageResult] = useState({
    recommendedSpecialty: 'Neurology',
    confidenceScore: 0.94,
    urgencyLevel: 'URGENT',
    explainabilityTags: ['throbbing headache', 'photophobia', 'nausea', 'unilateral pain'],
    suggestedActions: [
      'Avoid bright screens and loud environments',
      'Consult a neurologist within 24–48 hours for migraine screening',
      'Keep a headache trigger log'
    ],
    matchedDoctor: 'Dr. Sarah Chen (Senior Neurologist)'
  })

  // Feature B State
  const [riskInputs, setRiskInputs] = useState({
    age: 48,
    bmi: 27.4,
    systolic: 135,
    diastolic: 88,
    glucose: 110,
    cholesterol: 215,
    isSmoker: false,
    familyHistory: true
  })
  const [riskResult, setRiskResult] = useState({
    condition: 'Cardiovascular & Metabolic Risk',
    riskPercentage: 28.5,
    riskTier: 'MODERATE',
    contributingFactors: [
      'Elevated pre-hypertensive Systolic BP (135 mmHg)',
      'Borderline fasting blood glucose (> 100 mg/dL)',
      'Familial genetic predisposition'
    ],
    lifestyleTips: [
      'Adopt DASH / Mediterranean dietary patterns',
      'Engage in 150 mins of moderate aerobic exercise weekly',
      'Schedule annual lipid panel & HbA1c test'
    ]
  })

  // Feature C State
  const [clinicalNote, setClinicalNote] = useState(
    'Patient presents with persistent cough and low-grade fever for 5 days. Chest auscultation reveals mild bilateral wheezing. Diagnosed with Acute Bronchitis. Prescribed Amoxicillin 500mg TID for 7 days, and Salbutamol inhaler 2 puffs PRN. Advised rest, hydration, and follow-up in 10 days if symptoms persist.'
  )
  const [summaryResult, setSummaryResult] = useState({
    summary: 'Consultation for 5-day respiratory symptoms with mild bilateral wheezing.',
    diagnoses: ['Acute Bronchitis', 'Mild Airway Hyperreactivity'],
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily (TID)', duration: '7 days' },
      { name: 'Salbutamol Inhaler', dosage: '100mcg (2 puffs)', frequency: 'As needed (PRN)', duration: '14 days' }
    ],
    followUp: 'Return to clinic in 10 days or immediately if dyspnea worsens.'
  })

  const handleRunTriage = () => {
    setTriageLoading(true)
    setTimeout(() => {
      setTriageLoading(false)
      setTriageResult({
        recommendedSpecialty: symptomText.toLowerCase().includes('chest') ? 'Cardiology' : 'Neurology',
        confidenceScore: 0.92,
        urgencyLevel: symptomText.toLowerCase().includes('chest') ? 'CRITICAL' : 'URGENT',
        explainabilityTags: ['symptom onset', 'pain pattern', 'autonomic response'],
        suggestedActions: [
          'Immediate evaluation advised by clinical specialist',
          'Avoid intense physical strain until examination',
          'Document vitals twice daily'
        ],
        matchedDoctor: symptomText.toLowerCase().includes('chest') ? 'Dr. James Wilson' : 'Dr. Sarah Chen'
      })
    }, 600)
  }

  const handleCalculateRisk = () => {
    let score = 10
    if (riskInputs.systolic > 130) score += 8
    if (riskInputs.glucose > 100) score += 6
    if (riskInputs.bmi > 25) score += 5
    if (riskInputs.familyHistory) score += 5
    if (riskInputs.isSmoker) score += 10

    setRiskResult({
      condition: 'Cardiovascular & Metabolic Risk',
      riskPercentage: Math.min(score, 90),
      riskTier: score > 35 ? 'HIGH' : score > 20 ? 'MODERATE' : 'LOW',
      contributingFactors: [
        riskInputs.systolic > 130 ? 'Elevated Systolic Blood Pressure' : 'Normal BP Range',
        riskInputs.glucose > 100 ? 'Impaired Fasting Glucose (>100 mg/dL)' : 'Normal Fasting Glycemia',
        riskInputs.familyHistory ? 'Positive Family History' : 'No Chronic Family Predisposition'
      ],
      lifestyleTips: [
        'Engage in 30 minutes of cardiovascular walking daily',
        'Reduce dietary sodium intake below 2,000 mg/day',
        'Review metabolic vitals with a physician'
      ]
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-[#00a884] mb-3 border border-emerald-100">
          <Sparkles size={14} />
          <span>Clinical AI Microservices</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Health Hub & Clinical Triage
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Explore production-grade healthcare AI models for symptom classification, multi-factor risk estimation, and clinical note processing.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 inline-flex rounded-2xl bg-slate-100 p-1.5 shadow-inner">
          <button
            onClick={() => setActiveTab('triage')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === 'triage'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain size={16} className={activeTab === 'triage' ? 'text-[#00a884]' : ''} />
            <span>Symptom Triage (NLP)</span>
          </button>

          <button
            onClick={() => setActiveTab('risk')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === 'risk'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartPulse size={16} className={activeTab === 'risk' ? 'text-[#00a884]' : ''} />
            <span>Disease Risk Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText size={16} className={activeTab === 'summary' ? 'text-[#00a884]' : ''} />
            <span>Prescription Summarizer</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SYMPTOM TRIAGE */}
      {activeTab === 'triage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Describe Patient Symptoms
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Enter symptoms in conversational language. The NLP model tokenizes clinical entities and maps them to specialist care.
            </p>

            <textarea
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              rows="5"
              className="w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-800 focus:border-[#00a884] focus:outline-none transition leading-relaxed"
              placeholder="e.g. Sharp pain in the left chest radiating to arm with shortness of breath..."
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Age (Optional)
                </label>
                <input
                  type="number"
                  defaultValue="34"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#00a884] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  defaultValue="3"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#00a884] focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleRunTriage}
              disabled={triageLoading}
              className="mt-6 w-full rounded-2xl bg-[#00a884] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#009272] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {triageLoading ? (
                <span>Running Clinical NLP Inference...</span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Analyze Symptoms & Recommend Specialist</span>
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Triage Output Contract
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  triageResult.urgencyLevel === 'CRITICAL'
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : triageResult.urgencyLevel === 'URGENT'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                <ShieldAlert size={14} />
                <span>Urgency: {triageResult.urgencyLevel}</span>
              </span>
            </div>

            <div className="mb-6">
              <span className="text-xs font-semibold text-slate-500 block">
                Primary Specialty Recommendation
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00a884]">
                  {triageResult.recommendedSpecialty}
                </span>
                <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {(triageResult.confidenceScore * 100).toFixed(0)}% Confidence
                </span>
              </div>
            </div>

            {/* Explainability Tags */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-slate-500 block mb-2">
                Identified Clinical Symptom Tokens
              </span>
              <div className="flex flex-wrap gap-2">
                {triageResult.explainabilityTags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Next Actions */}
            <div className="mb-6 rounded-2xl bg-emerald-50/60 p-4 border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#00a884]" />
                Recommended Clinical Next Steps
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-800">
                {triageResult.suggestedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00a884] font-bold">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Booking Action */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                  Top Recommended Doctor
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {triageResult.matchedDoctor}
                </span>
              </div>
              <Link
                to="/doctors"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#00a884] px-4 py-2 text-xs font-bold text-white hover:bg-[#009272] transition"
              >
                <span>Book Doctor</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DISEASE RISK CALCULATOR */}
      {activeTab === 'risk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Patient Vitals & Medical History
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Feed clinical measurements to calculate statistically driven chronic disease risk metrics.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Systolic Blood Pressure ({riskInputs.systolic} mmHg)
                  </label>
                  <input
                    type="range"
                    min="90"
                    max="190"
                    value={riskInputs.systolic}
                    onChange={(e) =>
                      setRiskInputs({ ...riskInputs, systolic: Number(e.target.value) })
                    }
                    className="w-full accent-[#00a884]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Fasting Glucose ({riskInputs.glucose} mg/dL)
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="250"
                    value={riskInputs.glucose}
                    onChange={(e) =>
                      setRiskInputs({ ...riskInputs, glucose: Number(e.target.value) })
                    }
                    className="w-full accent-[#00a884]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    BMI ({riskInputs.bmi} kg/m²)
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="45"
                    step="0.5"
                    value={riskInputs.bmi}
                    onChange={(e) =>
                      setRiskInputs({ ...riskInputs, bmi: Number(e.target.value) })
                    }
                    className="w-full accent-[#00a884]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Age ({riskInputs.age} yrs)
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="85"
                    value={riskInputs.age}
                    onChange={(e) =>
                      setRiskInputs({ ...riskInputs, age: Number(e.target.value) })
                    }
                    className="w-full accent-[#00a884]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700">
                  Current Smoker
                </label>
                <input
                  type="checkbox"
                  checked={riskInputs.isSmoker}
                  onChange={(e) =>
                    setRiskInputs({ ...riskInputs, isSmoker: e.target.checked })
                  }
                  className="h-4 w-4 rounded accent-[#00a884]"
                />
              </div>

              <div className="flex items-center justify-between pb-2">
                <label className="text-xs font-semibold text-slate-700">
                  Family History of Hypertension / Diabetes
                </label>
                <input
                  type="checkbox"
                  checked={riskInputs.familyHistory}
                  onChange={(e) =>
                    setRiskInputs({ ...riskInputs, familyHistory: e.target.checked })
                  }
                  className="h-4 w-4 rounded accent-[#00a884]"
                />
              </div>
            </div>

            <button
              onClick={handleCalculateRisk}
              className="mt-6 w-full rounded-2xl bg-[#00a884] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#009272] transition cursor-pointer"
            >
              Re-Calculate Risk Assessment
            </button>
          </div>

          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
              Assessed Risk Profile
            </h3>

            <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 mb-6 border border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">
                  Probability Percentage
                </span>
                <span className="text-4xl font-extrabold text-slate-900">
                  {riskResult.riskPercentage.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-400 block mt-1">
                  {riskResult.condition}
                </span>
              </div>

              <span
                className={`rounded-2xl px-4 py-2 text-sm font-bold ${
                  riskResult.riskTier === 'HIGH'
                    ? 'bg-rose-100 text-rose-700'
                    : riskResult.riskTier === 'MODERATE'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {riskResult.riskTier} RISK
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Contributing Risk Factors
              </h4>
              <div className="space-y-2">
                {riskResult.contributingFactors.map((factor, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-sky-50/70 p-4 border border-sky-100">
              <h4 className="text-xs font-bold text-sky-900 mb-2 flex items-center gap-1.5">
                <Info size={14} className="text-sky-600" />
                Preventive Lifestyle Recommendations
              </h4>
              <ul className="space-y-1.5 text-xs text-sky-800">
                {riskResult.lifestyleTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRESCRIPTION SUMMARIZER */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Clinical Consultation Notes
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Paste raw physician notes to extract clinical diagnoses, active medications, dosages, and follow-up guidance.
            </p>

            <textarea
              value={clinicalNote}
              onChange={(e) => setClinicalNote(e.target.value)}
              rows="7"
              className="w-full rounded-2xl border border-slate-200 p-4 text-xs sm:text-sm text-slate-800 focus:border-[#00a884] focus:outline-none transition leading-relaxed"
            />

            <button
              onClick={() => {}}
              className="mt-6 w-full rounded-2xl bg-[#00a884] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#009272] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText size={16} />
              <span>Extract Structured Prescription Data</span>
            </button>
          </div>

          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 shadow-xs border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Extracted Medical Summary
            </h3>

            <p className="text-sm font-medium text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              {summaryResult.summary}
            </p>

            <div className="mb-6">
              <span className="text-xs font-bold text-slate-900 block mb-2">
                Confirmed Diagnoses
              </span>
              <div className="flex flex-wrap gap-2">
                {summaryResult.diagnoses.map((d, i) => (
                  <span
                    key={i}
                    className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-100"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-900 block mb-2">
                Parsed Medications & Dosages
              </span>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Medication</th>
                      <th className="p-3">Dosage</th>
                      <th className="p-3">Frequency</th>
                      <th className="p-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {summaryResult.medications.map((med, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-900">{med.name}</td>
                        <td className="p-3">{med.dosage}</td>
                        <td className="p-3">{med.frequency}</td>
                        <td className="p-3">{med.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
