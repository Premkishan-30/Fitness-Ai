import { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Lock 
} from 'lucide-react';

export default function EarlyAccessModal({ isOpen, mode, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [wearable, setWearable] = useState('Apple HealthKit / Apple Watch');
  const [goal, setGoal] = useState('Optimize autonomic recovery & sleep');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl z-10 animate-in zoom-in-95 duration-200 p-6 sm:p-8 text-slate-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {mode === 'signin' ? 'Session Authenticated' : 'Welcome to Fitness'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              {mode === 'signin'
                ? `Signed in as ${email || 'Alex Mercer'}. Loading your connected health cockpit.`
                : `Your invitation token for ${email || 'your account'} has been generated. We've synchronized your simulated profile with ${wearable}.`}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Return to Dashboard Preview
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider font-mono">
                {mode === 'signin' ? 'SECURE PORTAL' : 'EARLY ACCESS ONBOARDING'}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {mode === 'signin' ? 'Sign into your account' : 'Start your unified health journey'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {mode === 'signin'
                ? 'Access your unified biometric streams and AI health coach.'
                : 'Connect your sensors, sync lab tests, and unlock autonomous physiological guidance.'}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode !== 'signin' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@mercer.health"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {mode !== 'signin' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Wearable / Sensor
                    </label>
                    <select
                      value={wearable}
                      onChange={(e) => setWearable(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Apple HealthKit / Apple Watch</option>
                      <option>Whoop 4.0 Strap</option>
                      <option>Oura Ring Gen 3</option>
                      <option>Garmin Epix / Forerunner</option>
                      <option>Dexcom G7 / Abbott Libre CGM</option>
                      <option>Eight Sleep Pod 4</option>
                      <option>Withings Body Scan</option>
                      <option>Multiple / All of the above</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Focus Area
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Optimize autonomic recovery & sleep</option>
                      <option>Cardiovascular endurance & VO2 max</option>
                      <option>Strength progression & CNS fatigue management</option>
                      <option>Metabolic glucose stability & body composition</option>
                      <option>Longevity & biological age minimization</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{mode === 'signin' ? 'Sign In to Cockpit' : 'Request Early Access Key'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Security notice */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero live payment collected. Demonstrative preview environment.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
