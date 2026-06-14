/* ============================================================================
   realmathmodel.github.io — study hub catalog  (tree structure)
   ----------------------------------------------------------------------------
   EDIT THIS FILE only. index.html + category.html read everything from here.
   ========================================================================== */

const CATALOG = {
  owner: "hasan",
  host: "MathModel",
  categories: [

    /* ===================== UNIVERSITY (by year) ===================== */
    {
      id: "university",
      title: "University",
      tag: "IUG",
      icon: "U",
      accent: "blue",
      blurb: "Computer Engineering & AI — by year",
      children: [

        {
          id: "y1",
          title: "First Year",
          tag: "Y1",
          icon: "1",
          accent: "amber",
          blurb: "current courses",
          children: [

            {
              id: "cpp",
              title: "Programming 1 — C++",
              tag: "CS",
              icon: ">_",
              accent: "blue",
              blurb: "Liang, chapters 1–9 + exams",
              resources: [
                { label: "C++ Mastery — exam quiz (Ch 1–9, Midterm + 2 Finals)", href: "cpp_mastery.html", type: "internal", note: "529 questions · offline" },
                { label: "cppreference.com — language & STL reference", href: "https://en.cppreference.com/", type: "external" },
                { label: "LearnCpp.com — full tutorial", href: "https://www.learncpp.com/", type: "external" },
                { label: "Liang — Intro to C++ (textbook notes)", href: "#", type: "internal", note: "add your PDF link" }
              ]
            },

            {
              id: "calc",
              title: "Calculus B",
              tag: "MATH",
              icon: "∫",
              accent: "purple",
              blurb: "Thomas — series, polar, conics",
              resources: [
                { label: "Calculus B summary (TikZ / pgfplots notes)", href: "#", type: "internal", note: "add your LaTeX PDF" },
                { label: "Paul's Online Math Notes — Calculus II", href: "https://tutorial.math.lamar.edu/Classes/CalcII/CalcII.aspx", type: "external" },
                { label: "Khan Academy — Integral Calculus", href: "https://www.khanacademy.org/math/integral-calculus", type: "external" },
                { label: "3Blue1Brown — Essence of Calculus", href: "https://www.3blue1brown.com/topics/calculus", type: "external" }
              ]
            },

            {
              id: "digital",
              title: "Digital Design",
              tag: "EE",
              icon: "⏚",
              accent: "teal",
              blurb: "Mano — logic, K-maps, FSMs",
              resources: [
                { label: "Digital Design solutions (Mano, Ch 1–6)", href: "#", type: "internal", note: "add your LaTeX PDF" },
                { label: "CircuitVerse — online logic simulator", href: "https://circuitverse.org/", type: "external" },
                { label: "All About Circuits — digital logic", href: "https://www.allaboutcircuits.com/textbook/digital/", type: "external" },
                { label: "Nand2Tetris — build a computer from gates", href: "https://www.nand2tetris.org/", type: "external" }
              ]
            },

            {
              id: "iot",
              title: "IoT / ESP32",
              tag: "EMB",
              icon: "⚛",
              accent: "orange",
              blurb: "PWM, sensors, projects",
              resources: [
                { label: "IoT / ESP32 summary (slide sets + diagrams)", href: "#", type: "internal" },
                { label: "Espressif — ESP-IDF programming guide", href: "https://docs.espressif.com/projects/esp-idf/en/latest/", type: "external" },
                { label: "Random Nerd Tutorials — ESP32 projects", href: "https://randomnerdtutorials.com/projects-esp32/", type: "external" }
              ]
            }

          ]
        },

        {
          id: "y2",
          title: "Second Year",
          tag: "Y2",
          icon: "2",
          accent: "teal",
          blurb: "add courses in catalog.js",
          children: []
        },

        {
          id: "y3",
          title: "Third Year",
          tag: "Y3",
          icon: "3",
          accent: "purple",
          blurb: "add courses in catalog.js",
          children: []
        },

        {
          id: "y4",
          title: "Fourth Year",
          tag: "Y4",
          icon: "4",
          accent: "orange",
          blurb: "add courses in catalog.js",
          children: []
        }

      ]
    },

    /* ===================== PROGRAMMING ===================== */
    {
      id: "programming",
      title: "Programming",
      tag: "DEV",
      icon: ">_",
      accent: "amber",
      blurb: "competitive, web, tooling",
      children: [

        {
          id: "cp",
          title: "Competitive Programming",
          tag: "CP",
          icon: "⚔",
          accent: "amber",
          blurb: "PSIUG handbook + practice",
          resources: [
            { label: "PSIUG — personal CP handbook", href: "#", type: "internal", note: "add your handbook" },
            { label: "CP-Algorithms — algorithm reference", href: "https://cp-algorithms.com/", type: "external" },
            { label: "USACO Guide — structured roadmap", href: "https://usaco.guide/", type: "external" },
            { label: "Codeforces — contests & problemset", href: "https://codeforces.com/", type: "external" },
            { label: "AtCoder — contests", href: "https://atcoder.jp/", type: "external" }
          ]
        }

      ]
    },

    /* ===================== GENERAL MATH IMPROVEMENT ===================== */
    {
      id: "math",
      title: "General Math Improvement",
      tag: "MATH",
      icon: "π",
      accent: "purple",
      blurb: "sharpen intuition & problem-solving",
      resources: [
        { label: "3Blue1Brown — visual math", href: "https://www.3blue1brown.com/", type: "external" },
        { label: "Khan Academy — all math", href: "https://www.khanacademy.org/math", type: "external" },
        { label: "Paul's Online Math Notes", href: "https://tutorial.math.lamar.edu/", type: "external" },
        { label: "Project Euler — math + programming problems", href: "https://projecteuler.net/", type: "external" },
        { label: "Brilliant — guided problem solving", href: "https://brilliant.org/", type: "external" },
        { label: "Art of Problem Solving", href: "https://artofproblemsolving.com/", type: "external" }
      ]
    }

  ]
};

/* make CATALOG available to the pages (browser) and to tooling (Node) */
if (typeof window !== "undefined") window.CATALOG = CATALOG;
if (typeof module !== "undefined" && module.exports) module.exports = CATALOG;
