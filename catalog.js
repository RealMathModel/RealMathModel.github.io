/* ============================================================================
   realmathmodel.github.io — study hub catalog
   ----------------------------------------------------------------------------
   EDIT THIS FILE to add/remove study areas and resources. Nothing else needs
   to change — index.html and category.html both read from CATALOG below.

   A category:
     { id, title, tag, icon, accent, blurb, resources:[ ... ] }
       id      : url-safe key (used as category.html?id=ID). keep it unique.
       tag     : short label shown as a chip (e.g. "CS", "MATH").
       icon    : 1–2 chars shown in the tile box (any glyph/emoji).
       accent  : one of  amber | blue | purple | orange | teal | green
       blurb   : one short line under the title.

   A resource:
     { label, href, type, note }
       type : "internal"  -> a page in your own repo (opens same tab)
              "external"  -> an outside site (opens new tab, shown with ↗)
       href : "#" means "not linked yet" (shows as a TODO placeholder)
       note : optional small grey hint (e.g. "offline", "PDF")
   ========================================================================== */

const CATALOG = {
  owner: "hasan",
  host:  "iug",
  categories: [

    { id:"cpp", title:"Programming 1 — C++", tag:"CS", icon:">_", accent:"blue",
      blurb:"Liang, chapters 1–9 + exams",
      resources:[
        { label:"C++ Mastery — exam quiz (Ch 1–9, Midterm + 2 Finals)", href:"cpp_mastery.html", type:"internal", note:"529 questions · offline" },
        { label:"cppreference.com — language & STL reference", href:"https://en.cppreference.com/", type:"external" },
        { label:"LearnCpp.com — full beginner-to-advanced tutorial", href:"https://www.learncpp.com/", type:"external" },
        { label:"Liang — Intro to C++ (course textbook notes)", href:"#", type:"internal", note:"add your PDF link" },
      ]},

    { id:"digital", title:"Digital Design", tag:"EE", icon:"⏚", accent:"teal",
      blurb:"Mano — logic, K-maps, FSMs",
      resources:[
        { label:"Digital Design solutions (Mano, Ch 1–6)", href:"#", type:"internal", note:"add your LaTeX PDF" },
        { label:"CircuitVerse — online logic simulator", href:"https://circuitverse.org/", type:"external" },
        { label:"All About Circuits — digital logic textbook", href:"https://www.allaboutcircuits.com/textbook/digital/", type:"external" },
        { label:"Nand2Tetris — build a computer from gates up", href:"https://www.nand2tetris.org/", type:"external" },
      ]},

    { id:"calc", title:"Calculus B", tag:"MATH", icon:"∫", accent:"purple",
      blurb:"Thomas — series, polar, conics",
      resources:[
        { label:"Calculus B summary (TikZ / pgfplots notes)", href:"#", type:"internal", note:"add your LaTeX PDF" },
        { label:"Paul's Online Math Notes — Calculus II", href:"https://tutorial.math.lamar.edu/Classes/CalcII/CalcII.aspx", type:"external" },
        { label:"Khan Academy — Integral Calculus", href:"https://www.khanacademy.org/math/integral-calculus", type:"external" },
        { label:"3Blue1Brown — Essence of Calculus", href:"https://www.3blue1brown.com/topics/calculus", type:"external" },
      ]},

    { id:"iot", title:"IoT / ESP32", tag:"EMB", icon:"⚛", accent:"orange",
      blurb:"PWM, sensors, projects",
      resources:[
        { label:"IoT / ESP32 summary (slide sets + diagrams)", href:"#", type:"internal" },
        { label:"Espressif — ESP-IDF programming guide", href:"https://docs.espressif.com/projects/esp-idf/en/latest/", type:"external" },
        { label:"Random Nerd Tutorials — ESP32 projects", href:"https://randomnerdtutorials.com/projects-esp32/", type:"external" },
      ]},

    { id:"cp", title:"Competitive Programming", tag:"CP", icon:"⚔", accent:"amber",
      blurb:"PSIUG handbook + practice",
      resources:[
        { label:"PSIUG — personal CP handbook", href:"#", type:"internal", note:"add your handbook" },
        { label:"CP-Algorithms — algorithm reference", href:"https://cp-algorithms.com/", type:"external" },
        { label:"USACO Guide — structured roadmap", href:"https://usaco.guide/", type:"external" },
        { label:"Codeforces — contests & problemset", href:"https://codeforces.com/", type:"external" },
      ]},

    { id:"islamic", title:"Islamic Studies", tag:"DIN", icon:"☪", accent:"green",
      blurb:"Tajweed & Tafseer",
      resources:[
        { label:"Tajweed & Tafseer notes (typeset Arabic)", href:"#", type:"internal" },
        { label:"Quran.com — text, recitation & tafsirs", href:"https://quran.com/", type:"external" },
        { label:"Tanzil — Quran navigator", href:"https://tanzil.net/", type:"external" },
      ]},

    { id:"firstaid", title:"First Aid", tag:"MED", icon:"✚", accent:"teal",
      blurb:"Arabic first-aid reference",
      resources:[
        { label:"Arabic First-Aid summary (OCR + typeset)", href:"#", type:"internal" },
        { label:"IFRC — International first aid guidelines", href:"https://www.ifrc.org/", type:"external" },
      ]},

    { id:"audit", title:"Internal Auditing & PM", tag:"ADM", icon:"§", accent:"blue",
      blurb:"Humanitarian programme work",
      resources:[
        { label:"Internal Auditing self-study (7 ch · 140 MCQs)", href:"#", type:"internal" },
        { label:"UNRWA Project Procedures — analysis report", href:"#", type:"internal" },
        { label:"The IIA — Institute of Internal Auditors", href:"https://www.theiia.org/", type:"external" },
      ]},

  ]
};

/* make CATALOG available to the pages (browser) and to tooling (Node) */
if (typeof window !== "undefined") window.CATALOG = CATALOG;
if (typeof module !== "undefined" && module.exports) module.exports = CATALOG;
