import { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resetPointerTilt, tiltOnPointerMove } from '../utils/tiltMotion';

gsap.registerPlugin(ScrollTrigger);

export default function AiCoach({ onOpenAuth }) {
  const sectionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const animatedMessageCountRef = useRef(0);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'My recovery is 94% today, but I only slept 6.5 hours. Can I still do heavy deadlifts?',
      time: '08:14 AM',
    },
    {
      sender: 'ai',
      text: 'Good morning Alex. Your 94% readiness is driven by strong autonomic tone—your HRV reached 88ms (+12ms above baseline) and resting heart rate dropped to 48 bpm, indicating minimal systemic stress. However, restricted sleep volume limits total central nervous system stamina across high-rep sets.\n\nRecommendation: Proceed with your barbell deadlifts, but cap your top sets at RPE 8.0 (approx. 85% 1RM), eliminate sets taken to muscular failure, and hydrate with 500ml water + 300mg sodium prior to warmups.',
      time: '08:14 AM',
      highlight: 'CNS Capacity: High • Stamina Window: 45 min max',
    },
  ]);

  const presetQuestions = [
    {
      q: 'Why did my recovery drop after Friday’s dinner?',
      a: 'Your continuous glucose monitor logged a late spike to 142 mg/dL at 9:45 PM from high-glycemic carbohydrates. This elevated your nocturnal resting heart rate by 6 bpm and delayed melatonin onset, compressing your deep sleep from your normal 1h 50m down to 42 minutes.',
      highlight: 'Root Cause: Nocturnal Glycemic Excursion & Thermal Delay',
    },
    {
      q: 'Should I do Zone 2 cardio or lift heavy today?',
      a: 'With today’s 88ms HRV and low baseline cortisol, your autonomic nervous system is fully primed for high-threshold recruitment. Lift first today for progressive overload, and preserve Zone 2 steady-state cardio for tomorrow to assist with metabolic clearing.',
      highlight: 'Optimal Choice: Progressive Resistance Training First',
    },
    {
      q: 'How does my 74 mg/dL ApoB impact longevity?',
      a: 'An ApoB of 74 mg/dL places your atherogenic lipoprotein particle count in the optimal 20th percentile. When paired with your ultra-low hs-CRP of 0.38 mg/L, your arterial inflammation index is exceptionally low, corresponding to a biological cardiovascular age 5.4 years younger than your chronological age.',
      highlight: 'Biomarker Status: 20th Percentile Optimal Atherogenic Protection',
    },
    {
      q: 'Adjust my training for a high-stress workday',
      a: 'I detected an elevated daytime sympathetic tone (+18% above median). I have automatically down-regulated today’s target strain from 16.0 to 11.5. Swapped heavy sprints for a 40-minute restorative outdoor walk and 15 minutes of box breathing.',
      highlight: 'Protocol Adjusted: Strain Target Reduced to 11.5',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const messagesToAnimate = Array.from(container.querySelectorAll('.coach-message'))
      .slice(animatedMessageCountRef.current);
    animatedMessageCountRef.current = container.querySelectorAll('.coach-message').length;
    if (!messagesToAnimate.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(messagesToAnimate,
        { autoAlpha: 0, y: 16, clipPath: 'inset(0 0 100% 0 round 18px)' },
        { autoAlpha: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 18px)', duration: 0.58, stagger: 0.16, ease: 'power3.out' }
      );
      messagesToAnimate.forEach((message) => {
        const highlight = message.querySelector('.coach-message__highlight');
        if (highlight) gsap.fromTo(highlight, { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, delay: 0.3, ease: 'power2.out' });
      });
    }, container);

    return () => ctx.revert();
  }, [messages.length, isTyping]);

  const handleSelectQuestion = (item) => {
    if (isTyping) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: item.q,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 50);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: item.a,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          highlight: item.highlight,
        },
      ]);
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 50);
    }, 1000);
  };

  return (
    <section
      id="coach"
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-slate-50/70 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Storytelling & Capabilities (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>24/7 BIOMETRIC REASONING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              An AI coach that understands{' '}
              <span className="text-blue-600">your unique physiology</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Generic workout apps give you pre-recorded templates. Fitness AI reasons
              across your sleep debt, autonomic readiness, CGM glucose spikes, and clinical
              blood labs to deliver physician-grade, context-aware training guidance.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Translates autonomic HRV shifts into exact daily load targets',
                'Detects nutritional sleep disruptions before you wake up tired',
                'Synthesizes annual blood panels into actionable daily habits',
                'Adapts instantly when travel, stress, or illness impacts recovery',
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-blue-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <span>Talk to the Fitness AI Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Chat Preview Window (Col 7) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[580px]" onPointerMove={tiltOnPointerMove} onPointerLeave={resetPointerTilt}>
              {/* Chat Top Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      Fitness Intelligence Agent
                      <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-bold">
                        v3.4
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Context: Today's 94% Recovery • 88ms HRV • 2,420 kcal Budget
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  ACTIVE AGENT
                </span>
              </div>

              {/* Chat Message Scrollable Feed */}
              <div
                ref={chatContainerRef}
                className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-white"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`coach-message flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {msg.sender === 'user' ? 'You' : 'Fitness AI'}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-slate-100 text-slate-900 rounded-tr-sm border border-slate-200'
                          : 'bg-blue-50/70 border border-blue-200/80 text-slate-800 rounded-tl-sm shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {msg.highlight && (
                        <div className="coach-message__highlight mt-3 pt-2.5 border-t border-blue-200/60 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{msg.highlight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col items-start animate-pulse">
                    <div className="text-[10px] text-slate-400 mb-1">Fitness AI is reasoning...</div>
                    <div className="p-3 rounded-2xl rounded-tl-sm bg-blue-50 border border-blue-200 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Preset Clickable Prompts */}
              <div className="p-3 bg-slate-50 border-t border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold">
                  Ask Contextual Question:
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {presetQuestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuestion(item)}
                      className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-all shrink-0 font-medium shadow-2xs"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Placeholder */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask anything about your readiness, fuel, or training..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  disabled
                />
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shrink-0 shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
