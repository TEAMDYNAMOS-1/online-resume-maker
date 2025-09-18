/* @jsx React.createElement */
const { useState, useEffect, useRef } = React;
const { jsPDF } = window.jspdf;

const emptyExperience = () => ({ role: "", company: "", location: "", start: "", end: "", bullets: [""] });
const emptyEducation = () => ({ school: "", degree: "", start: "", end: "", details: "" });
const emptyProject = () => ({ name: "", link: "", description: "", tech: [] });

const defaultData = {
  meta: { theme: "classic", dark: false },
  profile: {
    name: "Your Name",
    title: "Full-Stack Developer",
    email: "you@example.com",
    phone: "+91-XXXXXXXXXX",
    location: "City, Country",
    website: "https://your-portfolio.dev",
    summary: "Passionate developer with experience building end-to-end web apps using React, Node.js, and cloud services.",
  },
  skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
  experience: [
    {
      role: "Software Engineer",
      company: "Awesome Co",
      location: "Remote",
      start: "2023",
      end: "Present",
      bullets: [
        "Built and scaled a MERN app serving 50k+ users.",
        "Implemented CI/CD and improved deployment speed by 40%.",
      ],
    },
  ],
  education: [
    { school: "Your College", degree: "B.Tech in Computer Science", start: "2019", end: "2023", details: "GPA: 8.5/10 | Relevant Coursework: DSA, DBMS, OS" },
  ],
  projects: [
    { name: "URL Shortener", link: "https://short.ly/yourlink", description: "Custom URL shortener with analytics and QR codes.", tech: ["Next.js", "PostgreSQL", "Prisma", "Razorpay"] },
  ],
};

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      {children}
    </div>
  );
}

function Badge({ children, onClick, outline }) {
  return (
    <span onClick={onClick} className={"cursor-pointer inline-flex items-center px-2 py-0.5 rounded border text-xs " + (outline ? "border-slate-300 text-slate-700" : "bg-slate-800 text-white border-slate-800")}>
      {children}
    </span>
  );
}

function ClassicTemplate({ data }) {
  const { profile, skills, experience, education, projects } = data;
  return (
    <div className="p-8 text-sm leading-relaxed">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold tracking-wide">{profile.name}</h1>
        <p className="text-slate-600">{profile.title}</p>
        <p className="mt-1 text-xs">{profile.email} • {profile.phone} • {profile.location}</p>
        <p className="text-xs">{profile.website}</p>
      </header>
      <section className="mb-3">
        <h2 className="font-semibold text-base border-b pb-1">Summary</h2>
        <p className="mt-1">{profile.summary}</p>
      </section>
      <section className="mb-3">
        <h2 className="font-semibold text-base border-b pb-1">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">{skills.map((s, i) => <Badge key={i} outline>{s}</Badge>)}</div>
      </section>
      <section className="mb-3">
        <h2 className="font-semibold text-base border-b pb-1">Experience</h2>
        <div className="mt-2 space-y-2">
          {experience.map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">{e.role} — {e.company}</div>
                <div className="text-xs text-slate-500">{e.start} – {e.end}</div>
              </div>
              <div className="text-xs text-slate-500">{e.location}</div>
              <ul className="list-disc ml-5 mt-1 space-y-1">{e.bullets.filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-3">
        <h2 className="font-semibold text-base border-b pb-1">Projects</h2>
        <div className="mt-2 space-y-2">
          {projects.map((p, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">{p.name} {p.link && <a href={p.link} className="text-blue-600 underline ml-2" target="_blank" rel="noreferrer">{p.link}</a>}</div>
              </div>
              <p className="text-sm">{p.description}</p>
              {p.tech?.length > 0 && <div className="flex flex-wrap gap-2 mt-1">{p.tech.map((t, j) => <Badge key={j} outline>{t}</Badge>)}</div>}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-semibold text-base border-b pb-1">Education</h2>
        <div className="mt-2 space-y-1">
          {education.map((ed, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">{ed.degree} — {ed.school}</div>
                <div className="text-xs text-slate-500">{ed.start} – {ed.end}</div>
              </div>
              {ed.details && <div className="text-sm">{ed.details}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ModernTemplate({ data }) {
  const { profile, skills, experience, education, projects } = data;
  return (
    <div className="p-8 text-sm leading-relaxed">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-slate-600">{profile.title}</p>
        </div>
        <div className="text-right text-xs">
          <div>{profile.email}</div>
          <div>{profile.phone}</div>
          <div>{profile.location}</div>
          <div className="truncate max-w-[220px] ml-auto">{profile.website}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <aside className="col-span-1 space-y-4">
          <section>
            <h2 className="font-semibold text-base">Summary</h2>
            <p className="mt-2 text-sm">{profile.summary}</p>
          </section>
          <section>
            <h2 className="font-semibold text-base">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">{skills.map((s, i) => <Badge key={i}>{s}</Badge>)}</div>
          </section>
        </aside>
        <main className="col-span-2 space-y-4">
          <section>
            <h2 className="font-semibold text-base">Experience</h2>
            <div className="mt-2 space-y-3">
              {experience.map((e, i) => (
                <div key={i} className="bg-slate-100 rounded-xl p-3">
                  <div className="flex items-baseline justify-between">
                    <div className="font-semibold">{e.role} — {e.company}</div>
                    <div className="text-xs text-slate-500">{e.start} – {e.end}</div>
                  </div>
                  <div className="text-xs text-slate-500">{e.location}</div>
                  <ul className="list-disc ml-5 mt-1 space-y-1">{e.bullets.filter(Boolean).map((b, j) => <li key={j}>{b}</li>)}</ul>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-semibold text-base">Projects</h2>
            <div className="mt-2 space-y-2">
              {projects.map((p, i) => (
                <div key={i} className="rounded-xl p-3 border">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{p.name}</div>
                    {p.link && <a href={p.link} className="text-blue-600 underline text-xs" target="_blank" rel="noreferrer">{p.link}</a>}
                  </div>
                  <p className="text-sm">{p.description}</p>
                  {p.tech?.length > 0 && <div className="flex flex-wrap gap-2 mt-1">{p.tech.map((t, j) => <Badge key={j} outline>{t}</Badge>)}</div>}
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-semibold text-base">Education</h2>
            <div className="mt-2 space-y-1">
              {education.map((ed, i) => (
                <div key={i} className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 font-semibold">{ed.degree} — {ed.school}</div>
                  <div className="text-right text-xs text-slate-500">{ed.start} – {ed.end}</div>
                  {ed.details && <div className="col-span-3 text-sm">{ed.details}</div>}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Preview({ data }) {
  return (
    <div className="min-h-[1123px] w-[794px] mx-auto bg-white text-slate-900">
      {data.meta.theme === "modern" ? <ModernTemplate data={data} /> : <ClassicTemplate data={data} />}
    </div>
  );
}

function App() {
  const [data, setData] = useLocalStorage("resume-maker:v1", defaultData);
  const [activeTab, setActiveTab] = useState("profile");
  const previewRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(null); // {id, slug}
  const url = new URL(window.location.href);
  const slugFromPath = url.pathname.startsWith("/p/") ? url.pathname.split("/p/")[1] : null;

  // Public view loader
  useEffect(() => {
    if (slugFromPath) {
      fetch(`/api/public/${slugFromPath}`).then(r => r.ok ? r.json() : null).then(json => {
        if (json?.data) {
          setSaved({ slug: slugFromPath });
          setData(json.data);
          setActiveTab("preview");
        }
      });
    }
  }, [slugFromPath]);

  async function downloadPDF() {
    const node = previewRef.current;
    if (!node) return;
    const canvas = await html2canvas(node, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let y = 0, position = 0;
    while (y < imgHeight) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      y += pdf.internal.pageSize.getHeight();
      if (y < imgHeight) { pdf.addPage(); position -= pdf.internal.pageSize.getHeight(); }
    }
    pdf.save(`${data.profile.name.replace(/\s+/g, "_")}_Resume.pdf`);
  }

  function update(path, value) {
    setData(d => {
      const next = JSON.parse(JSON.stringify(d));
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys.at(-1)] = value;
      return next;
    });
  }

  function addArrayItem(path, newItem) {
    setData(d => {
      const next = JSON.parse(JSON.stringify(d));
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length; i++) cur = cur[keys[i]];
      cur.push(newItem());
      return next;
    });
  }
  function removeArrayItem(path, idx) {
    setData(d => {
      const next = JSON.parse(JSON.stringify(d));
      const keys = path.split(".");
      let cur = next;
      for (let i = 0; i < keys.length; i++) cur = cur[keys[i]];
      cur.splice(idx, 1);
      return next;
    });
  }

  async function saveResume() {
    setSaving(true);
    try {
      const body = saved?.id ? { id: saved.id, data, title: data.profile.name + " - Resume" } : { data, title: data.profile.name + " - Resume" };
      const res = await fetch("/api/resumes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (res.ok) {
        setSaved({ id: json.id, slug: json.slug });
      } else {
        alert(json.error || "Failed to save");
      }
    } catch (e) {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="sticky top-4 bg-white rounded-2xl shadow p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-bold">Resume Builder</h1>
              <div className="flex items-center gap-2">
                <select value={data.meta.theme} onChange={(e)=>update("meta.theme", e.target.value)} className="border rounded px-2 py-1 text-sm">
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                </select>
                <button onClick={()=>setActiveTab("preview")} className="text-sm underline">Preview</button>
              </div>
            </div>
            <div className="grid grid-cols-3 mb-3 text-sm">
              {["profile","experience","projects"].map(t=>(
                <button key={t} onClick={()=>setActiveTab(t)} className={"px-2 py-1 rounded " + (activeTab===t ? "bg-slate-900 text-white" : "bg-slate-100")}>
                  {t[0].toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>

            {activeTab==="profile" && (
              <div className="space-y-3">
                <Field label="Full Name"><input className="w-full border rounded px-2 py-1" value={data.profile.name} onChange={e=>update("profile.name", e.target.value)} /></Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Title"><input className="w-full border rounded px-2 py-1" value={data.profile.title} onChange={e=>update("profile.title", e.target.value)} /></Field>
                  <Field label="Phone"><input className="w-full border rounded px-2 py-1" value={data.profile.phone} onChange={e=>update("profile.phone", e.target.value)} /></Field>
                  <Field label="Email"><input className="w-full border rounded px-2 py-1" value={data.profile.email} onChange={e=>update("profile.email", e.target.value)} /></Field>
                  <Field label="Location"><input className="w-full border rounded px-2 py-1" value={data.profile.location} onChange={e=>update("profile.location", e.target.value)} /></Field>
                  <Field label="Website"><input className="w-full border rounded px-2 py-1" value={data.profile.website} onChange={e=>update("profile.website", e.target.value)} /></Field>
                </div>
                <Field label="Summary">
                  <textarea rows="4" className="w-full border rounded px-2 py-1" value={data.profile.summary} onChange={e=>update("profile.summary", e.target.value)} ></textarea>
                </Field>
                <div>
                  <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium">Skills</span><button className="text-xs underline" onClick={()=>setData(d=>({...d,skills:[]}))}>Clear</button></div>
                  <input placeholder="Add a skill and press Enter" className="w-full border rounded px-2 py-1" onKeyDown={(e)=>{ if(e.key==="Enter" && e.currentTarget.value.trim()){ setData(d=>({...d, skills:[...d.skills, e.currentTarget.value.trim()]})); e.currentTarget.value=""; } }} />
                  <div className="flex flex-wrap gap-2 mt-2">{data.skills.map((s,i)=><Badge key={i} onClick={()=>setData(d=>({...d, skills:d.skills.filter((_,j)=>j!==i)}))}>{s} ✕</Badge>)}</div>
                </div>
              </div>
            )}

            {activeTab==="experience" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between"><h3 className="font-semibold">Experience</h3><button className="text-sm px-2 py-1 rounded bg-slate-900 text-white" onClick={()=>addArrayItem("experience", emptyExperience)}>Add</button></div>
                {data.experience.map((e,i)=>(
                  <div key={i} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center"><div className="font-medium">Item {i+1}</div><button className="text-xs underline" onClick={()=>removeArrayItem("experience", i)}>Remove</button></div>
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="Role" className="border rounded px-2 py-1" value={e.role} onChange={ev=>update(`experience.${i}.role`, ev.target.value)} />
                      <input placeholder="Company" className="border rounded px-2 py-1" value={e.company} onChange={ev=>update(`experience.${i}.company`, ev.target.value)} />
                      <input placeholder="Location" className="border rounded px-2 py-1" value={e.location} onChange={ev=>update(`experience.${i}.location`, ev.target.value)} />
                      <input placeholder="Start (e.g., 2023)" className="border rounded px-2 py-1" value={e.start} onChange={ev=>update(`experience.${i}.start`, ev.target.value)} />
                      <input placeholder="End (e.g., Present)" className="border rounded px-2 py-1" value={e.end} onChange={ev=>update(`experience.${i}.end`, ev.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Bullet Points</label>
                      {e.bullets.map((b,j)=>(
                        <div key={j} className="flex gap-2">
                          <input className="flex-1 border rounded px-2 py-1" value={b} placeholder={`Bullet ${j+1}`} onChange={ev=>update(`experience.${i}.bullets.${j}`, ev.target.value)} />
                          <button className="border rounded px-2" onClick={()=>{
                            setData(d=>{ const n = JSON.parse(JSON.stringify(d)); n.experience[i].bullets.splice(j,1); return n; });
                          }}>✕</button>
                        </div>
                      ))}
                      <button className="text-sm px-2 py-1 rounded bg-slate-100" onClick={()=>{
                        setData(d=>{ const n = JSON.parse(JSON.stringify(d)); n.experience[i].bullets.push(""); return n; });
                      }}>Add Bullet</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab==="projects" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between"><h3 className="font-semibold">Projects</h3><button className="text-sm px-2 py-1 rounded bg-slate-900 text-white" onClick={()=>addArrayItem("projects", emptyProject)}>Add</button></div>
                {data.projects.map((p,i)=>(
                  <div key={i} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center"><div className="font-medium">Project {i+1}</div><button className="text-xs underline" onClick={()=>removeArrayItem("projects", i)}>Remove</button></div>
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="Name" className="border rounded px-2 py-1" value={p.name} onChange={ev=>update(`projects.${i}.name`, ev.target.value)} />
                      <input placeholder="Link" className="border rounded px-2 py-1" value={p.link} onChange={ev=>update(`projects.${i}.link`, ev.target.value)} />
                    </div>
                    <textarea placeholder="Description" className="w-full border rounded px-2 py-1" value={p.description} onChange={ev=>update(`projects.${i}.description`, ev.target.value)} />
                    <div>
                      <label className="text-sm font-medium">Tech (press Enter to add)</label>
                      <input className="w-full border rounded px-2 py-1" placeholder="e.g., React, Node.js" onKeyDown={(e)=>{
                        if(e.key==="Enter" && e.currentTarget.value.trim()){
                          setData(d=>{ const n = JSON.parse(JSON.stringify(d)); (n.projects[i].tech ||= []).push(e.currentTarget.value.trim()); return n; });
                          e.currentTarget.value="";
                        }
                      }} />
                      <div className="flex flex-wrap gap-2 mt-2">{(p.tech||[]).map((t,j)=><Badge key={j} onClick={()=>setData(d=>{ const n = JSON.parse(JSON.stringify(d)); n.projects[i].tech.splice(j,1); return n; })}>{t} ✕</Badge>)}</div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between mt-4">
                  <h3 className="font-semibold">Education</h3>
                  <button className="text-sm px-2 py-1 rounded bg-slate-900 text-white" onClick={()=>addArrayItem("education", emptyEducation)}>Add</button>
                </div>
                {data.education.map((ed,i)=>(
                  <div key={i} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center"><div className="font-medium">Education {i+1}</div><button className="text-xs underline" onClick={()=>removeArrayItem("education", i)}>Remove</button></div>
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="School" className="border rounded px-2 py-1" value={ed.school} onChange={ev=>update(`education.${i}.school`, ev.target.value)} />
                      <input placeholder="Degree" className="border rounded px-2 py-1" value={ed.degree} onChange={ev=>update(`education.${i}.degree`, ev.target.value)} />
                      <input placeholder="Start" className="border rounded px-2 py-1" value={ed.start} onChange={ev=>update(`education.${i}.start`, ev.target.value)} />
                      <input placeholder="End" className="border rounded px-2 py-1" value={ed.end} onChange={ev=>update(`education.${i}.end`, ev.target.value)} />
                    </div>
                    <textarea placeholder="Details (GPA, coursework, etc.)" className="w-full border rounded px-2 py-1" value={ed.details} onChange={ev=>update(`education.${i}.details`, ev.target.value)} />
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="px-3 py-2 rounded bg-slate-900 text-white" onClick={downloadPDF}>Download PDF</button>
              <button className="px-3 py-2 rounded bg-slate-100 border" onClick={saveResume} disabled={saving}>{saving ? "Saving..." : "Save & Get Link"}</button>
            </div>
            {saved?.slug && (
              <div className="mt-2 text-sm">
                Public link: <a className="text-blue-600 underline" href={`/p/${saved.slug}`} target="_blank" rel="noreferrer">/p/{saved.slug}</a>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow p-4 border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Live Preview</h2>
              <div className="text-sm text-slate-500">A4 • 794×1123 px at 96dpi</div>
            </div>
            <div ref={previewRef} className="bg-white rounded-xl shadow overflow-hidden border mx-auto">
              <Preview data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
