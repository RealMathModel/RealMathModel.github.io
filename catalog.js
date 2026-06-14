/* ============================================================================
   realmathmodel.github.io — study hub catalog  (tree structure)
   ----------------------------------------------------------------------------
   EDIT THIS FILE only. index.html + category.html read everything from here.

   A NODE is either a BRANCH (holds sub-areas) or a LEAF (holds resources):

     BRANCH: { id, title, tag, icon, accent, blurb, children:[ ...nodes ] }
     LEAF  : { id, title, tag, icon, accent, blurb, resources:[ ...links ] }

   Fields:
     id      : UNIQUE url-safe key across the WHOLE tree (used as ?id=ID).
     tag     : tiny label chip (e.g. "Y1", "CP"). optional.
     icon    : 1-3 chars shown in the tile (any glyph).
     accent  : amber | blue | purple | orange | teal | green
     blurb   : one short line.

   A RESOURCE (inside a leaf's resources[]):
     { label, href, type, note }
       type : "internal" (page in your repo, same tab) | "external" (new tab, ↗)
       href : "#" => not linked yet (shows a dashed TODO row)
       note : optional small grey hint.

   To make a year hold courses: give it children:[ ...course leaves ].
   To make an area a direct list: give it resources:[ ...links ].
   ========================================================================== */

const CATALOG = {
  owner: "hasan",
  host:  "iug",
  categories: [

    /* ===================== UNIVERSITY (by year) ===================== */
    { id:"university", title:"University", tag:"IUG", icon:"U", accent:"blue",
      blurb:"Computer Engineering & AI — by year",
      children:[

        { id:"y1", title:"First Year", tag:"Y1", icon:"1", accent:"amber",
          blurb:"current courses",
          children:[

            { id:"cpp", title:"Programming 1 — C++", tag:"CS", icon:">_", accent:"blue",
              blurb:"Liang, chapters 1–9 + exams",
              resources:[
                { label:"C++ Mastery — exam quiz (Ch 1–9, Midterm + 2 Finals)", href:"cpp_mastery.html", type:"internal", note:"529 questions · offline" },
                { label:"cppreference.com — language & STL reference", href:"https://en.cppreference.com/", type:"external" },
                { label:"LearnCpp.com — full tutorial", href:"https://www.learncpp.com/", type:"external" },
                { label:"Liang — Intro to C++ (textbook notes)", href:"#", type:"internal", note:"add your PDF link" },
              ]},

            { id:"calc", title:"Calculus B", tag:"MATH", icon:"\u222B", accent:"purple",
              blurb:"Thomas — series, polar, conics",
              resources:[
                { label:"Calculus B summary (TikZ / pgfplots notes)", href:"#", type:"internal", note:"add your LaTeX PDF" },
                { label:"Paul's Online Math Notes — Calculus II", href:"https://tutorial.math.lamar.edu/Classes/CalcII/CalcII.aspx", type:"external" },
                { label:"Khan Academy — Integral Calculus", href:"https://www.khanacademy.org/math/integral-calculus", type:"external" },
                { label:"3Blue1Brown — Essence of Calculus", href:"https://www.3blue1brown.com/topics/calculus", type:"external" },
              ]},

            { id:"digital", title:"Digital Design", tag:"EE", icon:"\u23DA", accent:"teal",
              blurb:"Mano — logic, K-maps, FSMs",
              resources:[
                { label:"Digital Design solutions (Mano, Ch 1–6)", href:"#", type:"internal", note:"add your LaTeX PDF" },
                { label:"CircuitVerse — online logic simulator", href:"https://circuitverse.org/", type:"external" },
                { label:"All About Circuits — digital logic", href:"https://www.allaboutcircuits.com/textbook/digital/", type:"external" },
                { label:"Nand2Tetris — build a computer from gates", href:"https://www.nand2tetris.org/", type:"external" },
              ]},

            { id:"iot", title:"IoT / ESP32", tag:"EMB", icon:"\u269B", accent:"orange",
              blurb:"PWM, sensors, projects",
              resources:[
                { label:"IoT / ESP32 summary (slide sets + diagrams)", href:"#", type:"internal" },
                { label:"Espressif — ESP-IDF programming guide", href:"https://docs.espressif.com/projects/esp-idf/en/latest/", type:"external" },
                { label:"Random Nerd Tutorials — ESP32 projects", href:"https://randomnerdtutorials.com/projects-esp32/", type:"external" },
              ]},
          ]},

        { id:"y2", title:"Second Year", tag:"Y2", icon:"2", accent:"teal",
          blurb:"add courses in catalog.js", children:[] },

        { id:"y3", title:"Third Year", tag:"Y3", icon:"3", accent:"purple",
          blurb:"add courses in catalog.js", children:[] },

        { id:"y4", title:"Fourth Year", tag:"Y4", icon:"4", accent:"orange",
          blurb:"add courses in catalog.js", children:[] },
      ]},

    /* ===================== PROGRAMMING ===================== */
    { id:"programming", title:"Programming", tag:"DEV", icon:">_", accent:"amber",
      blurb:"competitive, web, tooling",
      children:[

        { id:"cp", title:"Competitive Programming", tag:"CP", icon:"\u2694", accent:"amber",
          blurb:"PSIUG handbook + practice",
          resources:[
            { label:"PSIUG — personal CP handbook", href:"#", type:"internal", note:"add your handbook" },
            { label:"CP-Algorithms — algorithm reference", href:"https://cp-algorithms.com/", type:"external" },
            { label:"USACO Guide — structured roadmap", href:"https://usaco.guide/", type:"external" },
            { label:"Codeforces — contests & problemset", href:"https://codeforces.com/", type:"external" },
            { label:"AtCoder — contests", href:"https://atcoder.jp/", type:"external" },
          ]},

        { id:"web", title:"Web Development", tag:"WEB", icon:"\u2329\u232A", accent:"blue",
          blurb:"front-end & back-end",
          resources:[
            { label:"MDN Web Docs — HTML / CSS / JS reference", href:"https://developer.mozilla.org/", type:"external" },
            { label:"The Odin Project — full curriculum", href:"https://www.theodinproject.com/", type:"external" },
            { label:"freeCodeCamp", href:"https://www.freecodecamp.org/", type:"external" },
          ]},

        { id:"tools", title:"Git & Tooling", tag:"OPS", icon:"\u2387", accent:"teal",
          blurb:"version control & workflow",
          resources:[
            { label:"Pro Git — the book (free)", href:"https://git-scm.com/book", type:"external" },
            { label:"Learn Git Branching — interactive", href:"https://learngitbranching.js.org/", type:"external" },
            { label:"Overleaf — LaTeX docs & learn", href:"https://www.overleaf.com/learn", type:"external" },
          ]},
      ]},

    /* ===================== GENERAL MATH IMPROVEMENT (leaf) ===================== */
    { id:"math", title:"General Math Improvement", tag:"MATH", icon:"\u03C0", accent:"purple",
      blurb:"sharpen intuition & problem-solving",
      resources:[
        { label:"3Blue1Brown — visual math", href:"https://www.3blue1brown.com/", type:"external" },
        { label:"Khan Academy — all math", href:"https://www.khanacademy.org/math", type:"external" },
        { label:"Paul's Online Math Notes", href:"https://tutorial.math.lamar.edu/", type:"external" },
        { label:"Project Euler — math + programming problems", href:"https://projecteuler.net/", type:"external" },
        { label:"Brilliant — guided problem solving", href:"https://brilliant.org/", type:"external" },
        { label:"Art of Problem Solving", href:"https://artofproblemsolving.com/", type:"external" },
      ]},

    /* ===================== EXTRAS (keep or delete) ===================== */
    { id:"islamic", title:"Islamic Studies", tag:"DIN", icon:"\u262A", accent:"green",
      blurb:"Tajweed & Tafseer",
      resources:[
        { label:"Tajweed & Tafseer notes (typeset Arabic)", href:"#", type:"internal" },
        { label:"Quran.com — text, recitation & tafsirs", href:"https://quran.com/", type:"external" },
        { label:"Tanzil — Quran navigator", href:"https://tanzil.net/", type:"external" },
      ]},

    { id:"firstaid", title:"First Aid", tag:"MED", icon:"\u271A", accent:"teal",
      blurb:"Arabic first-aid reference",
      resources:[
        { label:"Arabic First-Aid summary (OCR + typeset)", href:"#", type:"internal" },
        { label:"IFRC — international first aid guidelines", href:"https://www.ifrc.org/", type:"external" },
      ]},

    { id:"audit", title:"Internal Auditing & PM", tag:"ADM", icon:"\u00A7", accent:"orange",
      blurb:"humanitarian programme work",
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
