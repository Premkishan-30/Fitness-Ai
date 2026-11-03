import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Droplets,
  FileSearch,
  Flame,
  Heart,
  HeartPulse,
  LayoutDashboard,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  ScanLine,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Watch,
  Zap,
} from 'lucide-react';
import './app.css';

const navigation = [
  { path: '/app', label: 'Home', icon: LayoutDashboard },
  { path: '/app/sleep', label: 'Sleep', icon: Moon },
  { path: '/app/recovery', label: 'Recovery', icon: HeartPulse },
  { path: '/app/activity', label: 'Strain & Activity', icon: Activity },
  { path: '/app/biomarkers', label: 'Biomarkers', icon: Stethoscope },
  { path: '/app/coach', label: 'AI Health Assistant', icon: Sparkles },
  { path: '/app/scanner', label: 'Scan Product', icon: ScanLine },
  { path: '/app/devices', label: 'Connected Devices', icon: Watch },
  { path: '/app/settings', label: 'Profile & Settings', icon: Settings },
];

const pages = {
  '/app': { title: 'Home', section: 'Your health, in context' },
  '/app/sleep': { title: 'Sleep', section: 'Sleep & recovery' },
  '/app/recovery': { title: 'Recovery', section: 'Sleep & recovery' },
  '/app/activity': { title: 'Strain & Activity', section: 'Movement' },
  '/app/nutrition': { title: 'Nutrition & Goals', section: 'Daily habits' },
  '/app/biomarkers': { title: 'Biomarkers', section: 'Health insights' },
  '/app/coach': { title: 'AI Health Assistant', section: 'Health insights' },
  '/app/scanner': { title: 'Scan Product', section: 'Health insights' },
  '/app/devices': { title: 'Connected Devices', section: 'Your account' },
  '/app/settings': { title: 'Profile & Settings', section: 'Your account' },
};

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function routeFor(pathname) {
  if (pages[pathname]) return pathname;
  return '/app';
}

function navigateLink(event, path, onNavigate) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="workspace-page-heading">
      <div>
        <p className="workspace-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="workspace-page-description">{description}</p>}
      </div>
      {children && <div className="workspace-heading-actions">{children}</div>}
    </div>
  );
}

function Card({ className = '', children }) {
  return <section className={`workspace-card ${className}`}>{children}</section>;
}

function CardTitle({ title, detail, action }) {
  return (
    <div className="workspace-card-title">
      <div>
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
      </div>
      {action}
    </div>
  );
}

function Badge({ tone = 'blue', children }) {
  return <span className={`workspace-badge workspace-badge--${tone}`}>{children}</span>;
}

function MetricCard({ label, value, unit, change, icon: Icon, tone = 'blue', detail }) {
  const changeIsNegative = change?.startsWith('-');
  return (
    <Card className="workspace-metric">
      <div className="workspace-metric-top">
        <span>{label}</span>
        <span className={`workspace-icon workspace-icon--${tone}`}><Icon size={17} /></span>
      </div>
      <div className="workspace-metric-value">
        {value}<small>{unit}</small>
      </div>
      <div className="workspace-metric-foot">
        <span className={changeIsNegative ? 'workspace-change workspace-change--down' : 'workspace-change'}>
          {changeIsNegative ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
          {change}
        </span>
        {detail && <span className="workspace-muted">{detail}</span>}
      </div>
    </Card>
  );
}

function LineChart({ data, labels = weekDays, color = '#3e69e8', height = 184 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(max - min, 1);
  const points = data.map((value, index) => {
    const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
    const y = 42 - ((value - min) / range) * 31;
    return `${x},${y}`;
  }).join(' ');
  const area = `0,46 ${points} 100,46`;

  return (
    <div className="workspace-chart" style={{ height }}>
      <svg viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true">
        {[10, 22, 34, 46].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} className="workspace-chart-grid" />
        ))}
        <polygon points={area} fill={color} opacity="0.08" />
        <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {data.map((value, index) => {
          const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
          const y = 42 - ((value - min) / range) * 31;
          return <circle key={`${labels[index]}-${index}`} cx={x} cy={y} r="1.1" fill={color} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div className="workspace-chart-labels">
        {labels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}
      </div>
    </div>
  );
}

function BarChart({ data, labels = weekDays, color = '#6f8ef0' }) {
  return (
    <div className="workspace-bar-chart">
      {data.map((value, index) => (
        <div className="workspace-bar-column" key={`${labels[index]}-${index}`}>
          <div className="workspace-bar-track">
            <span style={{ height: `${Math.max(8, value)}%`, background: color }} />
          </div>
          <small>{labels[index]}</small>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, tone = 'blue' }) {
  return (
    <div className="workspace-progress" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
      <span className={`workspace-progress-fill workspace-progress-fill--${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="workspace-demo-notice">
      <span className="workspace-demo-dot" />
      <span><strong>Preview data</strong> · Illustrative example, not connected to a real health profile.</span>
    </div>
  );
}

function RouteLink({ to, onNavigate, children, className = '', ...props }) {
  return (
    <a href={to} className={className} onClick={(event) => navigateLink(event, to, onNavigate)} {...props}>
      {children}
    </a>
  );
}

function HomePage({ onNavigate }) {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [showDayOptions, setShowDayOptions] = useState(false);
  return (
    <>
      <PageHeading
        eyebrow="Tuesday, May 21 · Daily overview"
        title="Good morning, Sam"
        description="A clear view of the signals shaping how you feel today."
      >
        <div className="workspace-date-control">
          <button type="button" className="workspace-button workspace-button--subtle" aria-expanded={showDayOptions} onClick={() => setShowDayOptions((current) => !current)}><CalendarDays size={15} /> {selectedDay} <ChevronDown size={14} /></button>
          {showDayOptions && <div className="workspace-date-options">{['Today', 'Yesterday'].map((day) => <button type="button" key={day} onClick={() => { setSelectedDay(day); setShowDayOptions(false); }}>{day}</button>)}</div>}
        </div>
      </PageHeading>

      <Card className="workspace-summary">
        <div className="workspace-summary-copy">
          <Badge tone="green"><span className="workspace-live-dot" /> Daily health score</Badge>
          <h2>A steady start, with room to recharge.</h2>
          <p>Your signals look balanced today. Keep your movement gentle and protect the time you set aside for sleep tonight.</p>
          <RouteLink to="/app/coach" onNavigate={onNavigate} className="workspace-text-link">See your daily insight <ArrowRight size={14} /></RouteLink>
        </div>
        <div className="workspace-score" aria-label="Illustrative health score 77 out of 100">
          <div className="workspace-score-ring"><span><strong>77</strong><small>of 100</small></span></div>
          <span className="workspace-score-caption">Daily health score</span>
        </div>
        <div className="workspace-summary-side">
          <div><span>Readiness</span><strong>Good</strong><Badge tone="green">+6 vs. avg</Badge></div>
          <div><span>Last synced</span><strong>Today, 8:42 AM</strong></div>
        </div>
      </Card>

      <div className="workspace-section-heading">
        <div><h2>Your signals</h2><p>Compared with your illustrative 30-day baseline</p></div>
        <RouteLink to="/app/recovery" onNavigate={onNavigate} className="workspace-text-link">View trends <ArrowRight size={14} /></RouteLink>
      </div>
      <div className="workspace-grid workspace-grid--4">
        <MetricCard label="Sleep" value="7h 42m" unit="" change="+24 min" icon={Moon} tone="violet" detail="82% score" />
        <MetricCard label="Recovery" value="78" unit="%" change="+6%" icon={HeartPulse} tone="green" detail="Good" />
        <MetricCard label="Movement" value="8,240" unit="" change="+12%" icon={Activity} tone="blue" detail="steps" />
        <MetricCard label="Resting heart rate" value="58" unit="bpm" change="-2 bpm" icon={Heart} tone="rose" detail="vs. baseline" />
      </div>

      <div className="workspace-grid workspace-grid--main">
        <Card>
          <CardTitle title="Your week at a glance" detail="Daily readiness score" action={<Badge tone="neutral">Last 7 days</Badge>} />
          <LineChart data={[66, 72, 70, 81, 77, 73, 78]} height={202} />
          <div className="workspace-chart-legend"><span><i /> Daily score</span><span className="workspace-muted">Last 7 days</span></div>
        </Card>
        <Card className="workspace-insight-card">
          <div className="workspace-insight-icon"><Sparkles size={18} /></div>
          <Badge>Daily insight</Badge>
          <h2>A gentler start, a stronger day</h2>
          <p>Your sleep duration is trending up this week. A short outdoor walk can help keep your energy steady without adding extra strain.</p>
          <div className="workspace-insight-meta"><Clock3 size={14} /> Based on your illustrative sleep and activity trends</div>
          <RouteLink to="/app/activity" onNavigate={onNavigate} className="workspace-text-link">Explore your movement <ArrowRight size={14} /></RouteLink>
        </Card>
      </div>

      <div className="workspace-grid workspace-grid--main">
        <Card>
          <CardTitle title="Today’s plan" detail="Small habits, made easier to follow" action={<RouteLink to="/app/nutrition" onNavigate={onNavigate} className="workspace-text-link">All habits <ArrowRight size={14} /></RouteLink>} />
          <div className="workspace-habit-list">
            <Habit time="8:00 AM" title="Start with water" detail="A glass of water before your first coffee" done />
            <Habit time="12:30 PM" title="A balanced lunch" detail="Build your plate around protein and plants" />
            <Habit time="6:00 PM" title="Take a movement break" detail="A relaxed walk to reset after work" />
          </div>
        </Card>
        <Card>
          <CardTitle title="Nutrition & goals" detail="Illustrative daily progress" action={<RouteLink to="/app/nutrition" onNavigate={onNavigate} className="workspace-text-link">Open <ArrowRight size={14} /></RouteLink>} />
          <div className="workspace-goal-row"><div><strong>1,640</strong><span> / 2,100 kcal</span></div><Badge tone="green">On track</Badge></div>
          <ProgressBar value={78} />
          <div className="workspace-goal-breakdown"><span>Protein <b>92g</b></span><span>Carbs <b>168g</b></span><span>Fat <b>54g</b></span></div>
          <div className="workspace-water-row"><Droplets size={16} /><span>Water</span><strong>1.5 L</strong><span className="workspace-muted">of 2.2 L</span></div>
          <ProgressBar value={68} tone="aqua" />
        </Card>
      </div>
    </>
  );
}

function Habit({ time, title, detail, done = false }) {
  return (
    <div className="workspace-habit">
      <span className={`workspace-habit-check ${done ? 'is-done' : ''}`}>{done && <Check size={13} />}</span>
      <div><strong>{title}</strong><p>{detail}</p></div>
      <small>{time}</small>
    </div>
  );
}

function SleepPage() {
  const [range, setRange] = useState('7 days');
  return (
    <>
      <PageHeading eyebrow="Sleep" title="Rest that helps you reset" description="Explore your sleep patterns and the habits that support recovery.">
        <div className="workspace-segmented" aria-label="Sleep trend period">
          {['7 days', '30 days'].map((option) => <button key={option} type="button" className={range === option ? 'is-active' : ''} onClick={() => setRange(option)}>{option}</button>)}
        </div>
      </PageHeading>
      <div className="workspace-grid workspace-grid--4">
        <MetricCard label="Sleep score" value="82" unit=" / 100" change="+4 pts" icon={Moon} tone="violet" detail="Good" />
        <MetricCard label="Time asleep" value="7h 42m" unit="" change="+24 min" icon={Clock3} tone="blue" detail="vs. average" />
        <MetricCard label="Sleep efficiency" value="89" unit="%" change="+3%" icon={Zap} tone="green" detail="Time asleep / in bed" />
        <MetricCard label="Sleep consistency" value="76" unit="%" change="+5%" icon={CalendarDays} tone="amber" detail="Bedtime regularity" />
      </div>
      <div className="workspace-grid workspace-grid--main">
        <Card>
          <CardTitle title="Sleep duration" detail={`Illustrative trend · ${range}`} action={<Badge tone="green">Trending up</Badge>} />
          <LineChart data={range === '7 days' ? [63, 71, 68, 84, 76, 80, 78] : [58, 62, 70, 68, 75, 80, 82]} labels={weekDays} color="#7c75d9" height={225} />
          <div className="workspace-chart-legend"><span><i className="is-violet" /> Hours asleep</span><span className="workspace-muted">Target: 8 hours</span></div>
        </Card>
        <Card>
          <CardTitle title="Last night’s stages" detail="A typical sleep cycle overview" />
          <div className="workspace-stage-total"><strong>7h 42m</strong><span>Time asleep</span></div>
          <div className="workspace-stage-stack" aria-label="Illustrative sleep stages">
            <i style={{ flex: 22 }} className="stage-deep" /><i style={{ flex: 46 }} className="stage-light" /><i style={{ flex: 21 }} className="stage-rem" /><i style={{ flex: 11 }} className="stage-awake" />
          </div>
          <div className="workspace-stage-list">
            <Stage color="deep" label="Deep" value="1h 42m" percent="22%" />
            <Stage color="light" label="Light" value="3h 32m" percent="46%" />
            <Stage color="rem" label="REM" value="1h 37m" percent="21%" />
            <Stage color="awake" label="Awake" value="51m" percent="11%" />
          </div>
        </Card>
      </div>
      <div className="workspace-grid workspace-grid--main">
        <Card><CardTitle title="What may help tonight" detail="Small, practical reminders" /><div className="workspace-recommendations"><Recommendation icon={Moon} title="Keep a consistent wind-down" text="A familiar bedtime routine can make it easier to settle in." /><Recommendation icon={Droplets} title="Hydrate earlier in the day" text="Try to get most of your fluids in before the evening." /><Recommendation icon={Activity} title="Get a little daylight" text="Natural light in the morning supports a steady daily rhythm." /></div></Card>
        <Card className="workspace-soft-card"><Badge tone="violet">Sleep note</Badge><h2>Your bedtime is getting steadier</h2><p>Across this illustrative week, your bedtime varied less than usual. Consistency can be a helpful foundation for restorative rest.</p><span className="workspace-muted">Example insight · Not medical advice</span></Card>
      </div>
    </>
  );
}

function Stage({ color, label, value, percent }) {
  return <div className="workspace-stage-row"><span><i className={`stage-dot stage-dot--${color}`} />{label}</span><strong>{value}</strong><small>{percent}</small></div>;
}

function Recommendation({ icon: Icon, title, text }) {
  return <div className="workspace-recommendation"><span className="workspace-icon workspace-icon--blue"><Icon size={16} /></span><div><strong>{title}</strong><p>{text}</p></div><ChevronRight size={16} /></div>;
}

function RecoveryPage() {
  const [range, setRange] = useState('Week');
  return (
    <>
      <PageHeading eyebrow="Recovery" title="Readiness for the day ahead" description="A balanced view of the signals that can influence how recovered you feel.">
        <div className="workspace-segmented" aria-label="Recovery trend period">{['Week', 'Month'].map((option) => <button key={option} type="button" className={range === option ? 'is-active' : ''} onClick={() => setRange(option)}>{option}</button>)}</div>
      </PageHeading>
      <Card className="workspace-recovery-hero">
        <div><Badge tone="green">Good readiness</Badge><h2>Well placed to take on a steady day.</h2><p>Your recent recovery signals look close to your usual range. Consider how you feel alongside these illustrative metrics.</p></div>
        <div className="workspace-score workspace-score--compact"><div className="workspace-score-ring"><span><strong>78</strong><small>%</small></span></div><span className="workspace-score-caption">Recovery score</span></div>
        <div className="workspace-recovery-factor"><span>Contributors</span><p><b>HRV</b> Within range</p><p><b>Resting heart rate</b> Steady</p><p><b>Sleep</b> Improving</p></div>
      </Card>
      <div className="workspace-grid workspace-grid--4">
        <MetricCard label="Heart rate variability" value="54" unit="ms" change="+4 ms" icon={HeartPulse} tone="blue" detail="Illustrative nightly value" />
        <MetricCard label="Resting heart rate" value="58" unit="bpm" change="-2 bpm" icon={Heart} tone="rose" detail="Illustrative overnight" />
        <MetricCard label="Respiratory rate" value="15.2" unit=" / min" change="Stable" icon={Activity} tone="green" detail="Near baseline" />
        <MetricCard label="Skin temperature" value="+0.1" unit="°C" change="Stable" icon={Zap} tone="amber" detail="Change from baseline" />
      </div>
      <div className="workspace-grid workspace-grid--main">
        <Card><CardTitle title="Recovery trend" detail={`Daily score · ${range.toLowerCase()}`} /><LineChart data={[68, 75, 71, 83, 74, 81, 78]} labels={weekDays} color="#39a77c" height={215} /><div className="workspace-chart-legend"><span><i className="is-green" /> Recovery score</span><span className="workspace-muted">Illustrative range</span></div></Card>
        <Card><CardTitle title="What’s influencing recovery" detail="Context for your latest reading" /><div className="workspace-factor-list"><Factor label="Sleep" value="82%" detail="Above your recent average" tone="green" /><Factor label="HRV" value="54 ms" detail="Within your usual range" tone="blue" /><Factor label="Resting heart rate" value="58 bpm" detail="Slightly below your average" tone="violet" /></div></Card>
      </div>
      <Card className="workspace-note"><Sparkles size={17} /><p><strong>Listen to how you feel.</strong> Wearable signals are only one part of recovery. Rest, hydration, stress, and personal context matter too.</p></Card>
    </>
  );
}

function Factor({ label, value, detail, tone }) {
  return <div className="workspace-factor"><div><strong>{label}</strong><span>{detail}</span></div><Badge tone={tone}>{value}</Badge></div>;
}

function ActivityPage({ onNavigate }) {
  const [period, setPeriod] = useState('This week');
  const [filter, setFilter] = useState('All activities');
  const workouts = [
    { day: 'MON', date: 'May 20', title: 'Easy outdoor walk', type: 'Walk', duration: '32 min', strain: '4.2', icon: Activity },
    { day: 'SUN', date: 'May 19', title: 'Strength session', type: 'Strength', duration: '46 min', strain: '8.6', icon: Zap },
    { day: 'SAT', date: 'May 18', title: 'Recovery ride', type: 'Cycling', duration: '28 min', strain: '5.1', icon: Activity },
  ].filter((workout) => filter === 'All activities' || workout.type === filter);
  return (
    <>
      <PageHeading eyebrow="Strain & activity" title="Move in a way that feels right" description="Your daily movement, training load, and activity goals in one view.">
        <div className="workspace-segmented" aria-label="Activity period">{['This week', '4 weeks'].map((option) => <button key={option} type="button" className={period === option ? 'is-active' : ''} onClick={() => setPeriod(option)}>{option}</button>)}</div>
      </PageHeading>
      <div className="workspace-grid workspace-grid--4">
        <MetricCard label="Daily strain" value="11.4" unit="" change="+1.2" icon={Flame} tone="amber" detail="Moderate effort" />
        <MetricCard label="Steps" value="8,240" unit="" change="+12%" icon={Activity} tone="blue" detail="of 10,000 goal" />
        <MetricCard label="Active time" value="58" unit=" min" change="+8 min" icon={Clock3} tone="green" detail="Today" />
        <MetricCard label="Workouts" value="4" unit=" this week" change="On plan" icon={Zap} tone="violet" detail="Illustrative total" />
      </div>
      <div className="workspace-grid workspace-grid--main">
        <Card><CardTitle title="Daily movement" detail="Steps across the week" action={<Badge>{period}</Badge>} /><BarChart data={[52, 74, 63, 91, 67, 82, 59]} labels={weekDays} /><div className="workspace-goal-row workspace-goal-row--spaced"><div><strong>8,240</strong><span> / 10,000 steps</span></div><span className="workspace-muted">82% of daily goal</span></div><ProgressBar value={82} /></Card>
        <Card><CardTitle title="Activity goal" detail="A flexible target for today" /><div className="workspace-goal-circle"><div className="workspace-goal-circle-inner"><strong>58</strong><span>active min</span></div></div><p className="workspace-center-copy">42 more minutes to reach your 100 minute weekly movement plan.</p><RouteLink to="/app/nutrition" onNavigate={onNavigate} className="workspace-text-link">Review goals and habits <ArrowRight size={14} /></RouteLink></Card>
      </div>
      <Card>
        <CardTitle title="Recent activity" detail="Illustrative workout history" action={<label className="workspace-select-label"><span className="sr-only">Filter activity</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All activities</option><option>Walk</option><option>Strength</option><option>Cycling</option></select><ChevronDown size={14} /></label>} />
        {workouts.length ? <div className="workspace-workout-list">{workouts.map((workout) => <div className="workspace-workout" key={workout.title}><span className="workspace-icon workspace-icon--blue"><workout.icon size={16} /></span><div className="workspace-workout-date"><small>{workout.day}</small><span>{workout.date}</span></div><div className="workspace-workout-name"><strong>{workout.title}</strong><span>{workout.type} · {workout.duration}</span></div><Badge tone="amber">Strain {workout.strain}</Badge><ChevronRight size={16} /></div>)}</div> : <EmptyState title="No activities in this filter" text="Choose another activity type to see the sample history." /> }
      </Card>
    </>
  );
}

function NutritionPage() {
  const [water, setWater] = useState(1500);
  const [mealAdded, setMealAdded] = useState(false);
  const hydrationPercent = Math.min(Math.round((water / 2200) * 100), 100);
  return (
    <>
      <PageHeading eyebrow="Daily habits" title="Nutrition & goals" description="A simple snapshot of the habits and targets you choose to track." />
      <div className="workspace-grid workspace-grid--4">
        <MetricCard label="Energy" value={mealAdded ? '1,920' : '1,640'} unit=" kcal" change="78% of goal" icon={Flame} tone="amber" detail="Example daily total" />
        <MetricCard label="Protein" value={mealAdded ? '108' : '92'} unit=" g" change="On track" icon={Zap} tone="violet" detail="Illustrative target: 120g" />
        <MetricCard label="Carbohydrates" value={168} unit=" g" change="Balanced" icon={Activity} tone="blue" detail="Illustrative total" />
        <MetricCard label="Water" value={(water / 1000).toFixed(1)} unit=" L" change={`${hydrationPercent}% of goal`} icon={Droplets} tone="aqua" detail="Illustrative total" />
      </div>
      <div className="workspace-grid workspace-grid--main">
        <Card><CardTitle title="Daily energy & macros" detail="Illustrative nutrition log" /><div className="workspace-calorie-summary"><div><strong>{mealAdded ? '1,920' : '1,640'}</strong><span> kcal consumed</span></div><div className="workspace-calorie-goal">Goal <strong>2,100 kcal</strong></div></div><ProgressBar value={mealAdded ? 91 : 78} /><div className="workspace-macro-list"><Macro label="Protein" value={mealAdded ? 108 : 92} goal={120} tone="blue" /><Macro label="Carbs" value={168} goal={220} tone="violet" /><Macro label="Fat" value={54} goal={70} tone="amber" /></div><button type="button" className="workspace-button workspace-button--secondary" onClick={() => setMealAdded((current) => !current)}><Plus size={15} /> {mealAdded ? 'Undo sample meal' : 'Add sample meal'}</button></Card>
        <Card><CardTitle title="Hydration" detail="A reminder to sip throughout your day" /><div className="workspace-water-total"><span className="workspace-icon workspace-icon--aqua"><Droplets size={19} /></span><strong>{(water / 1000).toFixed(1)}<small> L</small></strong><span>of 2.2 L goal</span></div><ProgressBar value={hydrationPercent} tone="aqua" /><p className="workspace-hydration-note">{water >= 2200 ? 'You’ve reached your illustrative hydration goal.' : `${((2200 - water) / 1000).toFixed(1)} L to your illustrative daily goal.`}</p><button type="button" className="workspace-button workspace-button--primary workspace-button--full" onClick={() => setWater((current) => Math.min(current + 250, 3000))}><Plus size={15} /> Log 250 ml</button></Card>
      </div>
      <Card><CardTitle title="Daily habits" detail="Small actions you can adjust to fit your routine" /><div className="workspace-habit-list"><Habit time="Morning" title="Start with water" detail="A glass of water after waking" done /><Habit time="Midday" title="Build a balanced plate" detail="Add a colorful fruit or vegetable" /><Habit time="Evening" title="Wind down before bed" detail="Leave a little space between dinner and bedtime" /></div></Card>
    </>
  );
}

function Macro({ label, value, goal, tone }) {
  return <div className="workspace-macro"><div><span>{label}</span><strong>{value}g <small>/ {goal}g</small></strong></div><ProgressBar value={(value / goal) * 100} tone={tone} /></div>;
}

function BiomarkersPage() {
  const [filter, setFilter] = useState('All');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markers = [
    { name: 'Apolipoprotein B (ApoB)', category: 'Heart health', value: '82', unit: 'mg/dL', range: 'Within reference', date: 'May 02, 2025', tone: 'green' },
    { name: 'Vitamin D', category: 'Nutrients', value: '34', unit: 'ng/mL', range: 'Within reference', date: 'May 02, 2025', tone: 'green' },
    { name: 'Hemoglobin A1c', category: 'Metabolic', value: '5.2', unit: '%', range: 'Within reference', date: 'May 02, 2025', tone: 'green' },
    { name: 'hs-CRP', category: 'Inflammation', value: '1.1', unit: 'mg/L', range: 'Review with clinician', date: 'May 02, 2025', tone: 'amber' },
    { name: 'Ferritin', category: 'Nutrients', value: '74', unit: 'ng/mL', range: 'Within reference', date: 'May 02, 2025', tone: 'green' },
  ].filter((marker) => filter === 'All' || marker.category === filter);
  return (
    <>
      <PageHeading eyebrow="Health insights" title="Your biomarkers, in context" description="Understand example lab results and keep questions ready for your healthcare professional.">
        <button type="button" className="workspace-button workspace-button--secondary" onClick={() => window.print()}><FileSearch size={15} /> Print summary</button>
      </PageHeading>
      <Card className="workspace-note workspace-note--blue"><ShieldCheck size={18} /><p><strong>For context, not diagnosis.</strong> These example values are illustrative. Lab ranges vary; review personal results with a qualified healthcare professional.</p></Card>
      <div className="workspace-grid workspace-grid--4">
        <MetricCard label="Biological age" value="31" unit=" years" change="-3 years" icon={HeartPulse} tone="violet" detail="Illustrative estimate" />
        <MetricCard label="Markers reviewed" value="12" unit="" change="+2 this year" icon={Stethoscope} tone="blue" detail="Example record" />
        <MetricCard label="Within reference" value="10" unit=" / 12" change="83%" icon={CheckCircle2} tone="green" detail="Illustrative results" />
        <MetricCard label="Last updated" value="May 02" unit="" change="2025" icon={CalendarDays} tone="amber" detail="Example date" />
      </div>
      <Card className="workspace-bio-age">
        <CardTitle title="Biological age trend" detail="Illustrative estimate over sample check-ins" action={<Badge tone="violet">Example estimate</Badge>} />
        <LineChart data={[35, 34, 33, 32, 32, 31, 31]} labels={['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']} color="#8177cf" height={145} />
        <p className="workspace-bio-age-note">Example estimate only. Biological-age calculations vary and should not be used to diagnose or predict health outcomes.</p>
      </Card>
      <Card>
        <CardTitle title="Biomarker overview" detail="Example lab results · Not connected to a real profile" action={<label className="workspace-select-label"><span className="sr-only">Filter biomarkers</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>Heart health</option><option>Nutrients</option><option>Metabolic</option><option>Inflammation</option></select><ChevronDown size={14} /></label>} />
        <div className="workspace-table-wrap"><table className="workspace-table"><thead><tr><th>Marker</th><th>Example result</th><th>Reference context</th><th>Collection date</th><th><span className="sr-only">Details</span></th></tr></thead><tbody>{markers.map((marker) => <tr key={marker.name}><td><strong>{marker.name}</strong><small>{marker.category}</small></td><td><strong>{marker.value} <span>{marker.unit}</span></strong></td><td><Badge tone={marker.tone}>{marker.range}</Badge></td><td>{marker.date}</td><td><button className="workspace-icon-button" type="button" aria-label={`Learn about ${marker.name}`} aria-expanded={selectedMarker === marker.name} onClick={() => setSelectedMarker((current) => current === marker.name ? null : marker.name)}><ChevronRight size={16} /></button></td></tr>)}</tbody></table></div>
        {selectedMarker && <div className="workspace-marker-detail"><div><strong>{selectedMarker}</strong><p>This illustrative biomarker is one data point. The meaning of a result depends on the lab reference range, your history, and clinical context.</p></div><button type="button" className="workspace-icon-button" aria-label="Close biomarker details" onClick={() => setSelectedMarker(null)}><span aria-hidden="true">×</span></button></div>}
        {!markers.length && <EmptyState title="No markers in this category" text="Choose another filter to see sample results." />}
      </Card>
      <Card className="workspace-insight-card workspace-biomarker-help"><Badge>Learn</Badge><h2>What can biomarkers tell you?</h2><p>Blood markers are one part of your health picture. Trends over time and clinical context are more useful than any single result.</p><span className="workspace-text-link">Bring your questions to your next appointment <ArrowRight size={14} /></span></Card>
    </>
  );
}

function CoachPage() {
  const starterPrompts = [
    'How can I support better sleep tonight?',
    'What does my recovery score mean?',
    'Suggest a gentle activity for today',
  ];
  const cannedAnswers = [
    'A consistent wind-down can help. Try dimming the lights, setting aside screens, and keeping your bedtime comfortable and predictable. This is general guidance, not a medical recommendation.',
    'A recovery score is an estimate based on signals such as sleep and heart-rate patterns. It is not a diagnosis—use it alongside how you feel and your personal context.',
    'A relaxed walk or easy mobility session can be a gentle way to move. Keep the effort comfortable and pause if anything does not feel right.',
  ];
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi Sam. I can help you explore your example health trends and everyday habits. What would you like to understand?' }]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const sendMessage = (text) => {
    const message = text.trim();
    if (!message || loading) return;
    const suggestedIndex = starterPrompts.indexOf(message);
    const responseIndex = suggestedIndex >= 0 ? suggestedIndex : messages.length % cannedAnswers.length;
    setMessages((current) => [...current, { role: 'user', text: message }]);
    setDraft('');
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'assistant', text: cannedAnswers[responseIndex] }]);
      setLoading(false);
    }, 850);
  };
  return (
    <>
      <PageHeading eyebrow="Health insights" title="A thoughtful health companion" description="Ask questions about example trends, daily habits, or wellness topics." />
      <div className="workspace-coach-layout">
        <Card className="workspace-chat-card">
          <div className="workspace-chat-header"><div className="workspace-coach-avatar"><Sparkles size={17} /></div><div><strong>Health Assistant</strong><span><i className="workspace-live-dot" /> Sample conversation · No AI service connected</span></div></div>
          <div className="workspace-chat-messages" aria-live="polite">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`workspace-chat-message workspace-chat-message--${message.role}`}><div>{message.text}</div>{message.role === 'assistant' && index > 0 && <small>Illustrative response · Not medical advice</small>}</div>)}
            {loading && <div className="workspace-chat-message workspace-chat-message--assistant"><span className="workspace-typing"><i /><i /><i /></span><small>Preparing a sample response…</small></div>}
          </div>
          <form className="workspace-chat-form" onSubmit={(event) => { event.preventDefault(); sendMessage(draft); }}>
            <label className="sr-only" htmlFor="coach-message">Ask a question</label>
            <input id="coach-message" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask a wellness question…" />
            <button type="submit" className="workspace-button workspace-button--primary" disabled={!draft.trim() || loading} aria-label="Send message"><Send size={15} /></button>
          </form>
          <p className="workspace-chat-disclaimer">General wellness information only. For medical concerns, consult a qualified professional.</p>
        </Card>
        <div className="workspace-coach-aside">
          <Card><CardTitle title="Suggested questions" detail="Choose a prompt to get started" /><div className="workspace-prompt-list">{starterPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => sendMessage(prompt)} disabled={loading}>{prompt}<ArrowRight size={14} /></button>)}</div></Card>
          <Card className="workspace-soft-card"><div className="workspace-insight-icon"><ShieldCheck size={17} /></div><h2>Your privacy comes first</h2><p>This preview uses local example content only. Conversations are not sent to an AI service or stored on a server.</p></Card>
        </div>
      </div>
    </>
  );
}

function ScannerPage() {
  const [product, setProduct] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedProduct, setAnalyzedProduct] = useState('Everyday Oat Bar');
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const analyze = (event) => {
    event.preventDefault();
    if (!product.trim() || analyzing) return;
    setAnalyzing(true);
    timer.current = window.setTimeout(() => {
      setAnalyzedProduct(product.trim());
      setAnalyzing(false);
    }, 700);
  };
  return (
    <>
      <PageHeading eyebrow="Health insights" title="Know what’s in your products" description="Explore a sample ingredient analysis and make choices that fit your own preferences." />
      <div className="workspace-scanner-layout">
        <Card className="workspace-scan-card">
          <div className="workspace-scan-illustration"><div className="workspace-scan-frame"><ScanLine size={35} /><span /><i /><b /></div><Sparkles className="workspace-scan-spark" size={18} /></div>
          <h2>Scan or look up a product</h2>
          <p>This frontend preview uses sample products. Camera and barcode services are not connected.</p>
          <form className="workspace-product-form" onSubmit={analyze}>
            <label htmlFor="product-search">Product name</label>
            <div className="workspace-search-field"><Search size={16} /><input id="product-search" value={product} onChange={(event) => setProduct(event.target.value)} placeholder="Try a product name" /><button className="workspace-button workspace-button--primary" type="submit" disabled={!product.trim() || analyzing}>{analyzing ? 'Checking…' : 'Analyze'}</button></div>
          </form>
          <div className="workspace-scan-tip"><CircleHelp size={15} /><span>Sample insights are educational examples, not individual dietary advice.</span></div>
        </Card>
        <Card className="workspace-product-card">
          <div className="workspace-product-head"><div className="workspace-product-image"><span>OAT</span><small>BAR</small></div><div><Badge tone="green">Sample analysis</Badge><h2>{analyzedProduct}</h2><p>Illustrative product profile · 1 serving</p></div></div>
          <div className="workspace-product-score"><div><strong>Good fit</strong><p>Based on the sample preferences shown below</p></div><Badge tone="green">78 / 100</Badge></div>
          <div className="workspace-ingredient-list"><Ingredient name="Whole grain oats" note="Primary ingredient" tone="green" /><Ingredient name="Added sugars" note="6g per serving · Review your preferences" tone="amber" /><Ingredient name="Pea protein" note="Plant-based protein source" tone="blue" /></div>
          <div className="workspace-product-footer"><ShieldCheck size={15} /><span>Always check the product packaging for current ingredient information.</span></div>
        </Card>
      </div>
      <Card><CardTitle title="How the sample analysis works" detail="Illustrative interface only" /><div className="workspace-steps"><Step number="01" title="Find a product" text="Use a product name or barcode in the connected experience." /><Step number="02" title="Review ingredients" text="See ingredient and nutrition context in one place." /><Step number="03" title="Make your choice" text="Compare details with your preferences and goals." /></div></Card>
    </>
  );
}

function Ingredient({ name, note, tone }) {
  return <div className="workspace-ingredient"><span className={`workspace-ingredient-dot workspace-ingredient-dot--${tone}`} /><div><strong>{name}</strong><p>{note}</p></div><ChevronRight size={15} /></div>;
}

function Step({ number, title, text }) {
  return <div className="workspace-step"><span>{number}</span><strong>{title}</strong><p>{text}</p></div>;
}

function DevicesPage() {
  const [devices, setDevices] = useState([
    { name: 'Oura Ring', kind: 'Sleep & recovery', status: 'Connected in preview', connected: true, icon: 'O' },
    { name: 'Apple Health', kind: 'Activity & heart health', status: 'Connected in preview', connected: true, icon: 'A' },
    { name: 'WHOOP', kind: 'Recovery & strain', status: 'Available to connect', connected: false, icon: 'W' },
    { name: 'Garmin', kind: 'Activity & training', status: 'Available to connect', connected: false, icon: 'G' },
    { name: 'Fitbit', kind: 'Sleep & activity', status: 'Available to connect', connected: false, icon: 'F' },
    { name: 'Google Fit', kind: 'Activity & wellbeing', status: 'Available to connect', connected: false, icon: 'G' },
  ]);
  const [tab, setTab] = useState('Connect a device');
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const toggleDevice = (name) => {
    setDevices((current) => current.map((device) => device.name === name ? { ...device, connected: !device.connected, status: device.connected ? 'Available to connect' : 'Connected in preview' } : device));
    setSyncMessage('');
  };
  const syncDevices = () => {
    if (syncing) return;
    setSyncing(true);
    setSyncMessage('');
    timer.current = window.setTimeout(() => {
      setSyncing(false);
      setSyncMessage('Preview sync complete. No wearable data was requested or transferred.');
    }, 900);
  };
  const filteredDevices = tab === 'Manage connections' ? devices.filter((device) => device.connected) : devices;
  return (
    <>
      <PageHeading eyebrow="Your account" title="Bring your records into perspective" description="Connect the services you use to create a more complete health picture." />
      <div className="workspace-tabbar" role="tablist" aria-label="Device settings">{['Connect a device', 'Manage connections', 'Sync history'].map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} className={tab === item ? 'is-active' : ''} onClick={() => { setTab(item); setSyncMessage(''); }}>{item}</button>)}</div>
      {tab === 'Sync history' ? (
        <Card><CardTitle title="Recent sync activity" detail="Example activity from this preview" /><div className="workspace-sync-history"><div><span className="workspace-icon workspace-icon--green"><CheckCircle2 size={16} /></span><p><strong>Oura Ring</strong><small>Today, 8:42 AM · Sleep and recovery</small></p><Badge tone="green">Example sync</Badge></div><div><span className="workspace-icon workspace-icon--green"><CheckCircle2 size={16} /></span><p><strong>Apple Health</strong><small>Today, 8:39 AM · Activity and heart rate</small></p><Badge tone="green">Example sync</Badge></div><p className="workspace-muted">These entries are illustrative and do not reflect a real account connection.</p></div></Card>
      ) : (
        <div className="workspace-grid workspace-grid--main workspace-devices-grid">
          <Card><CardTitle title={tab === 'Manage connections' ? 'Connected services' : 'Available integrations'} detail={tab === 'Manage connections' ? 'Manage your illustrative connections' : 'Choose a source to explore the connection flow'} /><div className="workspace-device-list">{filteredDevices.map((device) => <div className="workspace-device" key={device.name}><span className={`workspace-device-logo workspace-device-logo--${device.name.toLowerCase().replaceAll(' ', '-')}`}>{device.icon}</span><div className="workspace-device-copy"><strong>{device.name}</strong><small>{device.kind}</small></div><Badge tone={device.connected ? 'green' : 'neutral'}>{device.connected ? 'Connected' : 'Available'}</Badge><button type="button" className={`workspace-button ${device.connected ? 'workspace-button--secondary' : 'workspace-button--primary'}`} onClick={() => toggleDevice(device.name)}>{device.connected ? 'Manage' : 'Connect'}</button></div>)}</div></Card>
          <Card className="workspace-device-side"><CardTitle title="Connection details" detail="Your data stays in your control" /><div className="workspace-privacy-note"><ShieldCheck size={17} /><p><strong>Review before connecting</strong><span>In a live account, you choose which categories to share and can change access at any time.</span></p></div><div className="workspace-permission-list"><span><Check size={13} /> Sleep and recovery</span><span><Check size={13} /> Health and activity</span><span><Check size={13} /> Sync frequency controls</span></div><button type="button" className="workspace-button workspace-button--primary workspace-button--full" onClick={syncDevices} disabled={syncing}><Activity className={syncing ? 'workspace-spin' : ''} size={15} />{syncing ? 'Checking preview…' : 'Sync preview'}</button>{syncMessage && <p className="workspace-feedback" role="status">{syncMessage}</p>}</Card>
        </div>
      )}
      <Card className="workspace-note"><CircleHelp size={17} /><p><strong>Illustrative integrations.</strong> No real wearable provider is connected in this frontend preview. Device actions only update local interface state.</p></Card>
    </>
  );
}

function SettingsPage() {
  const [tab, setTab] = useState('Profile');
  const [saved, setSaved] = useState(false);
  const [preferences, setPreferences] = useState({ weekly: true, product: false, sleep: true, share: false });
  const [profile, setProfile] = useState({
    firstName: 'Sam',
    lastName: 'Taylor',
    email: 'sam@example.test',
    dateOfBirth: '1992-06-14',
    timeZone: 'Pacific Time (PT)',
    units: 'Metric (kg, cm)',
  });
  const [focuses, setFocuses] = useState(['Consistent sleep', 'More daily movement']);
  const tabs = ['Profile', 'Preferences', 'Notifications', 'Privacy & data', 'Membership'];
  const togglePreference = (key) => setPreferences((current) => ({ ...current, [key]: !current[key] }));
  const updateProfile = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };
  return (
    <>
      <PageHeading eyebrow="Your account" title="Profile & Settings" description="Manage your example profile, preferences, and account details." />
      <div className="workspace-settings-layout">
        <Card className="workspace-settings-nav"><div className="workspace-profile-summary"><div className="workspace-profile-avatar">S</div><div><strong>Sam Taylor</strong><span>Preview profile</span></div></div>{tabs.map((item) => <button key={item} type="button" className={tab === item ? 'is-active' : ''} onClick={() => { setTab(item); setSaved(false); }}>{item}<ChevronRight size={15} /></button>)}</Card>
        <Card className="workspace-settings-panel">
          {tab === 'Profile' && <><CardTitle title="Personal information" detail="These example details stay in this browser preview." /><div className="workspace-form-grid"><Field label="First name" value={profile.firstName} onChange={(value) => updateProfile('firstName', value)} /><Field label="Last name" value={profile.lastName} onChange={(value) => updateProfile('lastName', value)} /><Field label="Email address" value={profile.email} onChange={(value) => updateProfile('email', value)} type="email" /><Field label="Date of birth" value={profile.dateOfBirth} onChange={(value) => updateProfile('dateOfBirth', value)} type="date" /><Field label="Time zone" value={profile.timeZone} onChange={(value) => updateProfile('timeZone', value)} /><Field label="Units" value={profile.units} onChange={(value) => updateProfile('units', value)} /></div><CardTitle title="Goals & habits" detail="Choose what you would like to focus on" /><div className="workspace-goal-tags">{focuses.map((focus, index) => <Badge key={focus} tone={index % 2 ? 'green' : 'blue'}>{focus}</Badge>)}<button type="button" onClick={() => setFocuses((current) => current.includes('More consistent hydration') ? current : [...current, 'More consistent hydration'])}><Plus size={13} /> Add focus</button></div></>}
          {tab === 'Preferences' && <><CardTitle title="Your preferences" detail="Shape the way your health summary is presented." /><SettingToggle title="Sleep & recovery" text="Include recovery signals in your daily overview." checked={preferences.sleep} onChange={() => togglePreference('sleep')} /><SettingToggle title="Nutrition & goals" text="Show illustrative nutrition and hydration progress." checked={preferences.product} onChange={() => togglePreference('product')} /><SettingToggle title="Daily movement" text="Include activity summaries on your home view." checked={preferences.weekly} onChange={() => togglePreference('weekly')} /></>}
          {tab === 'Notifications' && <><CardTitle title="Notifications" detail="Choose the reminders you would like to preview." /><SettingToggle title="Weekly health summary" text="A sample weekly check-in with your health trends." checked={preferences.weekly} onChange={() => togglePreference('weekly')} /><SettingToggle title="Sleep routine reminders" text="A gentle nudge to begin your evening wind-down." checked={preferences.sleep} onChange={() => togglePreference('sleep')} /><SettingToggle title="Product insights" text="Example updates when a saved product has new details." checked={preferences.product} onChange={() => togglePreference('product')} /></>}
          {tab === 'Privacy & data' && <><CardTitle title="Privacy & data" detail="This preview does not store or transmit personal health data." /><div className="workspace-privacy-block"><ShieldCheck size={19} /><div><strong>Local preview only</strong><p>Profile fields and interactions are illustrative and remain in the current page state. No backend or health provider is connected.</p></div></div><SettingToggle title="Share anonymous usage data" text="Control this sample preference. No data will be shared." checked={preferences.share} onChange={() => togglePreference('share')} /><button type="button" className="workspace-button workspace-button--secondary" onClick={() => { setProfile({ firstName: '', lastName: '', email: '', dateOfBirth: '', timeZone: '', units: '' }); setPreferences({ weekly: false, product: false, sleep: false, share: false }); setSaved(true); }}>Clear preview data</button></>}
          {tab === 'Membership' && <><CardTitle title="Your membership, clearly laid out" detail="Example membership state for this interface preview." /><div className="workspace-membership"><Badge tone="green">Preview plan</Badge><h3>Fitness Pro</h3><p>Wearable trend visualization, health insights, and sample goal tracking.</p><div><span>Billing cycle</span><strong>Monthly · Sample</strong></div><div><span>Next renewal</span><strong>Not scheduled</strong></div><div><span>Price</span><strong>Not specified</strong></div></div><CardTitle title="Subscription settings" detail="Billing actions are not enabled in this frontend preview." /><button type="button" className="workspace-button workspace-button--secondary" onClick={() => setSaved(true)}>Review plan details</button></>}
          <div className="workspace-settings-save"><span className={saved ? 'workspace-feedback' : 'workspace-muted'} role="status">{saved ? 'Preview settings updated.' : 'Changes apply to this preview only.'}</span><button type="button" className="workspace-button workspace-button--primary" onClick={() => setSaved(true)}><Check size={15} /> Save changes</button></div>
        </Card>
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return <label className="workspace-field"><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function SettingToggle({ title, text, checked, onChange }) {
  return <div className="workspace-setting-toggle"><div><strong>{title}</strong><p>{text}</p></div><button type="button" role="switch" aria-checked={checked} className={`workspace-switch ${checked ? 'is-on' : ''}`} onClick={onChange}><span /></button></div>;
}

function EmptyState({ title, text }) {
  return <div className="workspace-empty-state"><Search size={20} /><strong>{title}</strong><p>{text}</p></div>;
}

export default function AppWorkspace({ pathname, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const activePath = routeFor(pathname);
  const page = pages[activePath];

  useEffect(() => {
    if (!pages[pathname]) onNavigate('/app', true);
  }, [pathname, onNavigate]);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    setNotificationsOpen(false);
    onNavigate(path);
  };

  const renderPage = () => {
    if (activePath === '/app') return <HomePage onNavigate={onNavigate} />;
    if (activePath === '/app/sleep') return <SleepPage />;
    if (activePath === '/app/recovery') return <RecoveryPage />;
    if (activePath === '/app/activity') return <ActivityPage onNavigate={onNavigate} />;
    if (activePath === '/app/nutrition') return <NutritionPage />;
    if (activePath === '/app/biomarkers') return <BiomarkersPage />;
    if (activePath === '/app/coach') return <CoachPage />;
    if (activePath === '/app/scanner') return <ScannerPage />;
    if (activePath === '/app/devices') return <DevicesPage />;
    return <SettingsPage />;
  };

  return (
    <div className="workspace">
      {menuOpen && <button className="workspace-mobile-scrim" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      <aside className={`workspace-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <RouteLink to="/" onNavigate={handleNavigate} className="workspace-brand">
          <span className="workspace-brand-mark"><HeartPulse size={18} /></span>
          <span>Fitness<small>CONNECTED HEALTH</small></span>
        </RouteLink>
        <p className="workspace-nav-caption">MY WORKSPACE</p>
        <nav className="workspace-nav" aria-label="Main navigation">
          {navigation.map(({ path, label, icon: Icon }) => (
            <RouteLink key={path} to={path} onNavigate={handleNavigate} className={`workspace-nav-link ${activePath === path ? 'is-active' : ''}`} aria-current={activePath === path ? 'page' : undefined}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === 'AI Health Assistant' && <span className="workspace-nav-new">NEW</span>}
            </RouteLink>
          ))}
        </nav>
        <div className="workspace-sidebar-bottom">
          <div className="workspace-sidebar-help"><span><CircleHelp size={16} /></span><div><strong>Need a hand?</strong><small>Explore your health guide</small></div><ChevronRight size={15} /></div>
          <div className="workspace-mini-profile"><div className="workspace-profile-avatar">S</div><div><strong>Sam Taylor</strong><small>Preview account</small></div><MoreHorizontal size={18} /></div>
        </div>
      </aside>

      <div className="workspace-main-shell">
        <header className="workspace-topbar">
          <div className="workspace-breadcrumbs">
            <button type="button" className="workspace-mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
            <span>My Workspace</span><ChevronRight size={14} /><strong>{page.title}</strong>
          </div>
          <div className="workspace-top-actions">
            <Badge tone="neutral"><span className="workspace-live-dot" /> Preview mode</Badge>
            <div className="workspace-notification-wrap">
              <button type="button" className="workspace-icon-button workspace-notifications-button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((current) => !current)}><Bell size={17} /><i /></button>
              {notificationsOpen && <div className="workspace-notification-popover"><strong>You’re all caught up</strong><p>Sample notifications will appear here in your connected account.</p></div>}
            </div>
            <button type="button" className="workspace-user-button" onClick={() => handleNavigate('/app/settings')} aria-label="Open profile and settings"><span className="workspace-profile-avatar">S</span><ChevronDown size={14} /></button>
          </div>
        </header>
        <main className="workspace-content">
          <DemoNotice />
          <div className="workspace-breadcrumb-mobile"><span>{page.section}</span><ChevronRight size={13} /><strong>{page.title}</strong></div>
          {renderPage()}
          <footer className="workspace-footer"><span>Fitness · Health, in context.</span><span>Example data only · Not medical advice</span></footer>
        </main>
      </div>
    </div>
  );
}
