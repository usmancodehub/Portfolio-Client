import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";


const DataContext = createContext();

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [about, setAbout] = useState(null);
  const [marquee, setMarquee] = useState([]);         // ← NEW
  const [cvUrl, setCvUrl] = useState("");
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [p, s, t, a, cv, hero, m] = await Promise.all([
          API.get("/projects"),
          API.get("/skills"),
          API.get("/tools"),
          API.get("/about"),
          API.get("/settings/cv"),
          API.get("/settings/hero"),
          API.get("/marquee"),  // ← NEW
        ]);
        setProjects(p.data);
        setSkills(s.data);
        setTools(t.data);
        setAbout(a.data);
        setCvUrl(cv.data.value);
        setHeroImage(hero.data.value);
        setMarquee(m.data);  // ← NEW
      } catch (err) {
        console.error("Load error:", err);
      }
    };
    load();
  }, []);

  return (
    <DataContext.Provider
      value={{ projects, skills, tools, about, cvUrl, heroImage, marquee }}
    >
      {children}
    </DataContext.Provider>
  );
}