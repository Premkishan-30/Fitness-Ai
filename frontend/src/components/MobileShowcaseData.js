import { Activity, Brain, Flame, Moon, Sparkles } from 'lucide-react';

export const FEATURES = [
  { title: 'Your health, in one view', label: 'OVERVIEW', description: 'See connected signals that matter today, together and without the noise.', icon: Activity, color: 'var(--brand-primary)', metric: '82', unit: 'health score', benefits: ['One clear daily snapshot', 'Signals connected in context'], useCase: 'Start every morning with a calm, useful read on your body.' },
  { title: 'Sleep and recovery, together', label: 'SLEEP + RECOVERY', description: 'Understand sleep quality, HRV, readiness, and patterns across the week.', icon: Moon, color: 'var(--brand-primary)', metric: '84', unit: 'sleep score', benefits: ['Stage-by-stage detail', 'Readiness-led decisions'], useCase: 'Choose the right intensity for how you actually feel.' },
  { title: 'Move, fuel, and progress', label: 'ACTIVITY + NUTRITION', description: 'Turn movement, exercise, calories, hydration, and goals into one plan.', icon: Flame, color: 'var(--brand-primary)', metric: '8,420', unit: 'steps today', benefits: ['Adaptive daily goals', 'Simple nutrition context'], useCase: 'Build consistency without chasing disconnected numbers.' },
  { title: 'A coach that understands context', label: 'AI COACH', description: 'Ask questions and get practical guidance grounded in your own patterns.', icon: Brain, color: 'var(--brand-primary)', metric: '24/7', unit: 'contextual support', benefits: ['Answers from your trends', 'Small steps that stick'], useCase: 'Turn a confusing signal into a practical next action.' },
  { title: 'Everything, connected', label: 'DEVICES + INSIGHTS', description: 'Bring wearables and health data together in one private, useful picture.', icon: Sparkles, color: 'var(--brand-primary)', metric: '360°', unit: 'health context', benefits: ['One connected system', 'Private by design'], useCase: 'Finish the day knowing what your body is telling you.' },
];

export const OVERVIEW_FEATURE = FEATURES[0];
