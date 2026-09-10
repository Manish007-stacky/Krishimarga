import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import "./App.css";

import Home from "./pages/Home";
import Disease from "./pages/Disease";
import DiseaseResult from "./pages/DiseaseResult";
import Sell from "./pages/Sell/Sell";
import Education from "./pages/Education";
import Admin from "./pages/Admin";

const LOCAL_TRANSLATIONS = {
  hi: {
    Home: "होम",
    Disease: "रोग",
    Selling: "बिक्री",
    Education: "शिक्षा",
    Market: "बाज़ार",
    "Weather Insights": "मौसम जानकारी",
    "Live forecast": "लाइव पूर्वानुमान",
    Today: "आज",
    Humidity: "नमी",
    Wind: "हवा",
    "Min Temp": "न्यूनतम तापमान",
    "Max Temp": "अधिकतम तापमान",
    "Latest Updates": "ताज़ा अपडेट",
    "Farmer News & Market Trends": "किसान समाचार और बाज़ार रुझान",
    "Current Crop Prices": "वर्तमान फसल कीमतें",
    "Live Mandi Prices": "लाइव मंडी कीमतें",
    "Select Crop": "फसल चुनें",
    "Select State": "राज्य चुनें",
    District: "जिला",
    State: "राज्य",
    Variety: "किस्म",
    "Min / kg": "न्यूनतम / किलो",
    "Modal / kg": "सामान्य / किलो",
    "Max / kg": "अधिकतम / किलो",
    "Disease Identification": "रोग पहचान",
    "Choose Image": "छवि चुनें",
    "Detect Disease": "रोग पहचानें",
    "Education Hub": "शिक्षा केंद्र",
    Library: "लाइब्रेरी",
    User: "उपयोगकर्ता",
    Admin: "एडमिन",
    "Quick Links": "त्वरित लिंक",
    "Our Services": "हमारी सेवाएं",
    "Contact Us": "संपर्क करें",
    "Follow Us": "हमें फॉलो करें",
  },

  kn: {
    Home: "ಮುಖಪುಟ",
    Disease: "ರೋಗ",
    Selling: "ಮಾರಾಟ",
    Education: "ಶಿಕ್ಷಣ",
    Market: "ಮಾರುಕಟ್ಟೆ",
    "Weather Insights": "ಹವಾಮಾನ ಮಾಹಿತಿ",
    "Live forecast": "ನೇರ ಮುನ್ಸೂಚನೆ",
    Today: "ಇಂದು",
    Humidity: "ಆರ್ದ್ರತೆ",
    Wind: "ಗಾಳಿ",
    "Min Temp": "ಕನಿಷ್ಠ ತಾಪಮಾನ",
    "Max Temp": "ಗರಿಷ್ಠ ತಾಪಮಾನ",
    "Latest Updates": "ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು",
    "Farmer News & Market Trends": "ರೈತ ಸುದ್ದಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ",
    "Current Crop Prices": "ಪ್ರಸ್ತುತ ಬೆಳೆ ಬೆಲೆಗಳು",
    "Live Mandi Prices": "ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    "Select Crop": "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    "Select State": "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    District: "ಜಿಲ್ಲೆ",
    State: "ರಾಜ್ಯ",
    Variety: "ತಳಿ",
    "Min / kg": "ಕನಿಷ್ಠ / ಕೆಜಿ",
    "Modal / kg": "ಸಾಮಾನ್ಯ / ಕೆಜಿ",
    "Max / kg": "ಗರಿಷ್ಠ / ಕೆಜಿ",
    "Disease Identification": "ರೋಗ ಗುರುತಿಸುವಿಕೆ",
    "Choose Image": "ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ",
    "Detect Disease": "ರೋಗ ಪತ್ತೆ ಮಾಡಿ",
    "Education Hub": "ಶಿಕ್ಷಣ ಕೇಂದ್ರ",
    Library: "ಗ್ರಂಥಾಲಯ",
    User: "ಬಳಕೆದಾರ",
    Admin: "ನಿರ್ವಾಹಕ",
    "Quick Links": "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    "Our Services": "ನಮ್ಮ ಸೇವೆಗಳು",
    "Contact Us": "ಸಂಪರ್ಕಿಸಿ",
    "Follow Us": "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",
  },
};

const CACHE_KEY = "krishimarga_auto_translation_cache_v3";

const getCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
  } catch {
    return {};
  }
};

const saveCache = (cache) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const shouldTranslate = (text) => {
  const value = text.trim();
  if (!value) return false;
  if (value.length < 2) return false;
  if (/^[\d\s₹.,:%°/()+-]+$/.test(value)) return false;
  return true;
};

async function autoTranslate(text, lang) {
  if (lang === "en") return text;

  const clean = text.trim();
  const local = LOCAL_TRANSLATIONS[lang]?.[clean];
  if (local) return local;

  const cache = getCache();
  const key = `${lang}::${clean}`;

  if (cache[key]) return cache[key];

  try {
    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
      lang +
      "&dt=t&q=" +
      encodeURIComponent(clean);

    const res = await fetch(url);
    const data = await res.json();

    const translated =
      data?.[0]?.map((item) => item?.[0]).join("") || clean;

    cache[key] = translated;
    saveCache(cache);

    return translated;
  } catch {
    return clean;
  }
}

async function translatePage(lang) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;

      if (
        parent.closest(
          "script, style, noscript, input, textarea, select, option, .no-translate"
        )
      ) {
        return NodeFilter.FILTER_REJECT;
      }

      if (!shouldTranslate(node.nodeValue)) return NodeFilter.FILTER_REJECT;

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  await Promise.all(
    nodes.map(async (node) => {
      const current = node.nodeValue.trim();

      if (!node.__originalText) {
        node.__originalText = current;
      }

      const original = node.__originalText;

      if (lang === "en") {
        node.nodeValue = node.nodeValue.replace(current, original);
        return;
      }

      const translated = await autoTranslate(original, lang);
      node.nodeValue = node.nodeValue.replace(current, translated);
    })
  );

  const placeholderElements = document.querySelectorAll(
    "input[placeholder], textarea[placeholder]"
  );

  await Promise.all(
    Array.from(placeholderElements).map(async (el) => {
      if (!el.dataset.originalPlaceholder) {
        el.dataset.originalPlaceholder = el.placeholder;
      }

      const original = el.dataset.originalPlaceholder;
      el.placeholder =
        lang === "en" ? original : await autoTranslate(original, lang);
    })
  );
}

function AppLayout({ children, language, onLanguageChange }) {
  const translating = useRef(false);

  useEffect(() => {
    const runTranslation = async () => {
      if (translating.current) return;
      translating.current = true;
      await translatePage(language);
      translating.current = false;
    };

    const timer = setTimeout(runTranslation, 120);

    const observer = new MutationObserver(() => {
      clearTimeout(window.__krishiTranslateTimer);
      window.__krishiTranslateTimer = setTimeout(runTranslation, 250);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      clearTimeout(timer);
      clearTimeout(window.__krishiTranslateTimer);
      observer.disconnect();
    };
  }, [language]);

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="app-main">{children}</main>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("krishimarga_language") || "en"
  );

  useEffect(() => {
    const splashSeen = sessionStorage.getItem("krishimarga_splash_seen");
    if (!splashSeen) setShowSplash(true);
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem("krishimarga_splash_seen", "true");
    setShowSplash(false);
  };

  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    localStorage.setItem("krishimarga_language", lang);
    await translatePage(lang);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              language={language}
              onLanguageChange={handleLanguageChange}
            >
              <Home />
            </AppLayout>
          }
        />

        <Route
          path="/disease"
          element={
            <AppLayout
              language={language}
              onLanguageChange={handleLanguageChange}
            >
              <Disease />
            </AppLayout>
          }
        />

        <Route
          path="/disease/result"
          element={
            <AppLayout
              language={language}
              onLanguageChange={handleLanguageChange}
            >
              <DiseaseResult />
            </AppLayout>
          }
        />

        <Route
          path="/sell"
          element={
            <AppLayout
              language={language}
              onLanguageChange={handleLanguageChange}
            >
              <Sell />
            </AppLayout>
          }
        />

        <Route
          path="/education"
          element={
            <AppLayout
              language={language}
              onLanguageChange={handleLanguageChange}
            >
              <Education />
            </AppLayout>
          }
        />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;