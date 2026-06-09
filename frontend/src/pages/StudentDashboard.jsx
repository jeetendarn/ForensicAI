import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const studentProfiles = [
  { name: "ravi", studentId: "STU-2026-002" },
  { name: "ccc", studentId: "STU-2026-003" },
  { name: "Test Student", studentId: "STU-2026-001" }
];

const learningModules = [
  {
    title: "Cyber Security Basics",
    description: "Learn passwords, safe browsing, and account protection.",
    level: "Beginner"
  },
  {
    title: "Digital Forensics Basics",
    description: "Understand evidence, metadata, and investigation flow.",
    level: "Core"
  },
  {
    title: "Safe Internet Practices",
    description: "Stay alert against phishing, fraud, and fake links.",
    level: "Essential"
  },
  {
    title: "Student Data Protection",
    description: "Keep your files, devices, and personal data secure.",
    level: "Important"
  }
];

const awarenessCards = [
  {
    title: "Phishing Alert",
    text: "Do not click unknown links or open suspicious attachments."
  },
  {
    title: "OTP Safety",
    text: "Never share OTPs, passwords, or PINs with anyone."
  },
  {
    title: "Password Safety",
    text: "Use strong, unique passwords for every account."
  },
  {
    title: "Message Verification",
    text: "Check the sender before replying, sharing, or forwarding."
  }
];

const liveIncidents = [
  {
    title: "Suspicious Link Detected",
    text: "A fake login page was reported in a student message today."
  },
  {
    title: "OTP Warning",
    text: "Students were reminded not to share OTPs with anyone."
  },
  {
    title: "Safe Browsing Reminder",
    text: "Unknown download links should be avoided."
  }
];

const contacts = [
  { label: "Police Emergency", value: "112" },
  { label: "Cyber Helpline", value: "1930" },
  { label: "Cyber Crime Portal", value: "cybercrime.gov.in" },
  { label: "Campus Help Desk", value: "Add local number" }
];

const complaintTypes = [
  "Phishing Email",
  "Fake Link",
  "OTP Fraud",
  "Cyber Bullying",
  "Account Hack",
  "Other"
];

const safetyUpdates = [
  "New phishing link alerts are being reported in student emails.",
  "Fake OTP request messages are increasing in circulation.",
  "Verify unknown WhatsApp forwards before sharing.",
  "Strong passwords and MFA remain the safest daily habit."
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function buildChromeSearchLink(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [profileIndex, setProfileIndex] = useState(0);
  const [name, setName] = useState(studentProfiles[0].name);
  const [studentId, setStudentId] = useState(studentProfiles[0].studentId);

  const [updateIndex, setUpdateIndex] = useState(0);
  const [complaintOpen, setComplaintOpen] = useState(false);
  const [complaintType, setComplaintType] = useState("Phishing Email");
  const [details, setDetails] = useState("");
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [progressValue, setProgressValue] = useState([82, 68, 91, 57]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateIndex((prev) => (prev + 1) % safetyUpdates.length);
      setProgressValue((prev) =>
        prev.map((value, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          return clamp(value + direction, 35, 98);
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const overallSafetyScore = useMemo(() => {
    const sum = progressValue.reduce((a, b) => a + b, 0);
    return Math.round(sum / progressValue.length);
  }, [progressValue]);

  const handleProfileChange = (e) => {
    const index = Number(e.target.value);
    setProfileIndex(index);
    setName(studentProfiles[index].name);
    setStudentId(studentProfiles[index].studentId);
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setComplaintOpen(false);
      setSubmitted(false);
      setComplaintType("Phishing Email");
      setDetails("");
      setEvidenceFile(null);
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-[#07111f] text-white pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-6">
          <div className="flex items-center justify-between mb-5">
            <div className="text-cyan-400 font-bold text-2xl">
              Student Cyber Learning Portal
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-xl font-semibold"
            >
              Logout
            </button>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#0b1324] via-[#0c172b] to-[#07111f] p-6 md:p-8 shadow-2xl shadow-cyan-900/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-3xl">
                <p className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
                  Learn. Stay Safe. Report Quickly.
                </p>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-cyan-400">
                  Student Cyber Learning Portal
                </h1>
                <p className="mt-4 text-gray-300 leading-7">
                  A friendly space for cyber awareness, safe learning modules, live updates,
                  and quick reporting without any fear-based display.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:min-w-[330px]">
                <div className="rounded-2xl border border-cyan-500/20 bg-[#091423] p-4">
                  <p className="text-sm text-gray-400">Safety Score</p>
                  <p className="mt-2 text-3xl font-bold text-white">{overallSafetyScore}%</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-[#091423] p-4">
                  <p className="text-sm text-gray-400">Modules</p>
                  <p className="mt-2 text-3xl font-bold text-white">{learningModules.length}</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-[#091423] p-4">
                  <p className="text-sm text-gray-400">Live Alerts</p>
                  <p className="mt-2 text-3xl font-bold text-white">{liveIncidents.length}</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-[#091423] p-4">
                  <p className="text-sm text-gray-400">Helpline</p>
                  <p className="mt-2 text-3xl font-bold text-white">1930</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-[#091423] p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-semibold">Today’s Safety Update</span>
                <span className="text-gray-300">{safetyUpdates[updateIndex]}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400">
                      Live Incidents
                    </h2>
                    <p className="mt-1 text-gray-400">
                      Simple real-world style awareness incidents for learning.
                    </p>
                  </div>
                  <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-300 border border-red-500/20">
                    Live
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {liveIncidents.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-cyan-500/15 bg-[#091423] p-4 shadow-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                        <h3 className="font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-gray-300 leading-6">
                        {item.text}
                      </p>
                      <p className="mt-4 text-xs text-cyan-300">Updated just now</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400">
                      Learning Modules
                    </h2>
                    <p className="mt-1 text-gray-400">
                      Open a module or learn more in Chrome.
                    </p>
                  </div>
                  <div className="text-sm text-cyan-300 bg-cyan-400/10 border border-cyan-500/20 px-3 py-2 rounded-xl">
                    Open links in browser
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {learningModules.map((module, index) => {
                    const searchLink = buildChromeSearchLink(module.title);
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-cyan-500/15 bg-[#091423] p-5 transition hover:border-cyan-400/50 hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {module.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-300 leading-6">
                              {module.description}
                            </p>
                          </div>
                          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300 whitespace-nowrap">
                            {module.level}
                          </span>
                        </div>

                        <div className="mt-4 h-2 rounded-full bg-[#0a0f1f] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-cyan-400 transition-all"
                            style={{ width: `${progressValue[index]}%` }}
                          />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <button className="flex-1 rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-black transition hover:bg-cyan-400">
                            Open Module
                          </button>

                          <a
                            href={searchLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-center rounded-xl border border-cyan-500/30 bg-[#0a0f1f] px-4 py-2.5 font-semibold text-cyan-300 transition hover:border-cyan-400 hover:text-cyan-200"
                          >
                            Learn on Chrome
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Cyber Awareness
                </h2>
                <p className="mt-1 text-gray-400">
                  Friendly reminders to help students stay safe online.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {awarenessCards.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-cyan-500/15 bg-[#091423] p-5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <h3 className="font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-gray-300 leading-6">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Student Identity
                </h2>
                <p className="mt-2 text-gray-400">
                  Name and student ID are linked together.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Select Profile
                    </label>
                    <select
                      value={profileIndex}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    >
                      {studentProfiles.map((profile, index) => (
                        <option key={profile.studentId} value={index}>
                          {profile.name} - {profile.studentId}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Student Name
                    </label>
                    <input
                      value={name}
                      readOnly
                      className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Student ID
                    </label>
                    <input
                      value={studentId}
                      readOnly
                      className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Raise a Complaint
                </h2>
                <p className="mt-2 text-gray-400">
                  Use the slider button to report a cyber issue.
                </p>

                <button
                  onClick={() => setComplaintOpen(true)}
                  className="mt-6 w-full rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
                >
                  Open Complaint Slider
                </button>

                <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                  <p className="text-sm text-red-200">Quick help</p>
                  <p className="mt-2 text-white leading-6">
                    Report fake links, suspicious messages, or account issues from here.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Emergency Contacts
                </h2>
                <div className="mt-5 space-y-4">
                  {contacts.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border border-cyan-500/15 bg-[#091423] px-4 py-3"
                    >
                      <span className="text-gray-300">{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Today’s Learning Focus
                </h2>
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl bg-[#091423] p-4 border border-cyan-500/15">
                    <p className="text-gray-300 text-sm">Safe Browsing</p>
                    <p className="mt-2 font-semibold text-white">Do not trust unknown links.</p>
                  </div>
                  <div className="rounded-2xl bg-[#091423] p-4 border border-cyan-500/15">
                    <p className="text-gray-300 text-sm">Password Safety</p>
                    <p className="mt-2 font-semibold text-white">Use unique passwords for each account.</p>
                  </div>
                  <div className="rounded-2xl bg-[#091423] p-4 border border-cyan-500/15">
                    <p className="text-gray-300 text-sm">Report Quickly</p>
                    <p className="mt-2 font-semibold text-white">Contact 1930 for cyber fraud help.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-500/20 bg-[#0b1425] p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-cyan-400">
                  Back to Login
                </h2>
                <p className="mt-3 text-gray-300 leading-7">
                  Use this link after finishing your learning session.
                </p>
                <Link to="/" className="mt-4 inline-block text-cyan-300 hover:text-cyan-200 font-semibold">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setComplaintOpen(true)}
          className="fixed bottom-5 right-5 z-50 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-black shadow-2xl transition hover:bg-cyan-400"
        >
          Report / Help
        </button>

        {complaintOpen && (
          <div className="fixed inset-0 z-50 bg-black/60">
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0b1425] border-l border-cyan-500/20 shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-cyan-400">
                  Complaint Slider
                </h3>
                <button
                  onClick={() => setComplaintOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <p className="mt-2 text-gray-400">
                Fill in a small report if you see a cyber issue or suspicious message.
              </p>

              <form onSubmit={handleComplaintSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    value={name}
                    readOnly
                    className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Student ID
                  </label>
                  <input
                    value={studentId}
                    readOnly
                    className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Issue Type</label>
                  <select
                    value={complaintType}
                    onChange={(e) => setComplaintType(e.target.value)}
                    className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  >
                    {complaintTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Attach Evidence
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setEvidenceFile(e.target.files?.[0] || null)}
                    className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white"
                  />
                  {evidenceFile && (
                    <p className="mt-2 text-xs text-cyan-300">
                      Selected: {evidenceFile.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Complaint Details
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows="5"
                    className="w-full rounded-xl bg-[#091423] border border-cyan-500/20 px-4 py-3 text-white outline-none focus:border-cyan-400"
                    placeholder="Describe what happened..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-400 transition"
                >
                  {submitted ? "Submitting..." : "Submit Complaint"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-cyan-500/15 bg-[#091423] p-4">
                <p className="text-sm text-cyan-300">Emergency contacts</p>
                <div className="mt-3 space-y-2 text-sm text-gray-200">
                  <p>Police: 112</p>
                  <p>Cyber Helpline: 1930</p>
                  <p>Cyber Crime Portal: cybercrime.gov.in</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}