import { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Menu,
  X,
  Search,
  ArrowUp,
  Leaf,
  Droplets,
  Wind,
  Mountain,
  TreePine,
  Globe,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  AlertTriangle,
  Mail,
  Phone,
  Thermometer,
  BarChart2,
  BookOpen,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: number;
}

interface Region {
  id: string;
  name: string;
  description: string;
  problems: string[];
  landmarks: string[];
  area: string;
  population: string;
  image: string;
  ecoScore: number;
  color: string;
}

interface Initiative {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "active" | "planned" | "completed";
  participants: number;
  date: string;
  image: string;
  location: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Ледники Кыргызстана сократились на 27% за последние 50 лет",
    excerpt:
      "Новые исследования института гляциологии показывают критическое ускорение таяния горных ледников в Тянь-Шане. Под угрозой оказались источники пресной воды для миллионов людей.",
    category: "Климат",
    date: "12 июня 2025",
    image:
      "https://images.unsplash.com/photo-1603017412441-eb5669f87e75?w=600&h=400&fit=crop&auto=format",
    readTime: 5,
  },
  {
    id: 2,
    title: "Бишкек занял 3-е место по загрязнению воздуха в Центральной Азии",
    excerpt:
      "По данным мониторинга IQAir за 2024 год, среднегодовой уровень PM2.5 в столице составил 42 мкг/м³, что в 8 раз превышает норму ВОЗ.",
    category: "Воздух",
    date: "8 июня 2025",
    image:
      "https://images.unsplash.com/photo-1551189496-17e968f1d52a?w=600&h=400&fit=crop&auto=format",
    readTime: 4,
  },
  {
    id: 3,
    title: "Волонтеры посадили 50 000 деревьев в долине реки Чу",
    excerpt:
      "Крупнейшая акция по восстановлению лесов в истории Кыргызстана объединила более 3000 добровольцев из всех регионов страны.",
    category: "Инициативы",
    date: "3 июня 2025",
    image:
      "https://images.unsplash.com/photo-1551189783-e226306fd8a1?w=600&h=400&fit=crop&auto=format",
    readTime: 3,
  },
  {
    id: 4,
    title: "Иссык-Куль: угроза туристической инфраструктуры экосистеме",
    excerpt:
      "Несанкционированные стройки на берегах озера привели к загрязнению прибрежных вод. Экологи требуют немедленного введения охранной зоны.",
    category: "Вода",
    date: "28 мая 2025",
    image:
      "https://images.unsplash.com/photo-1689788648053-cd482d1acd9c?w=600&h=400&fit=crop&auto=format",
    readTime: 6,
  },
  {
    id: 5,
    title: "Нарынский заповедник расширил охраняемую территорию на 45 000 га",
    excerpt:
      "Правительство утвердило расширение биосферного заповедника, что обеспечит защиту снежного барса и 200 видов редких растений.",
    category: "Природа",
    date: "22 мая 2025",
    image:
      "https://images.unsplash.com/photo-1608497735578-11912e18ed9f?w=600&h=400&fit=crop&auto=format",
    readTime: 4,
  },
  {
    id: 6,
    title: "Переработка отходов в Кыргызстане: итоги 2024 года",
    excerpt:
      "Доля переработанных отходов выросла до 12% — рекорд для страны. Новые предприятия открылись в Оше и Бишкеке.",
    category: "Отходы",
    date: "15 мая 2025",
    image:
      "https://images.unsplash.com/photo-1689788648186-60a2b9e1ad71?w=600&h=400&fit=crop&auto=format",
    readTime: 5,
  },
];

const regionsData: Region[] = [
  {
    id: "issyk-kul",
    name: "Иссык-Куль",
    description:
      "Жемчужина Кыргызстана — высокогорное бессточное озеро в обрамлении заснеженных пиков Тянь-Шаня. Регион является центром туризма и биоразнообразия.",
    problems: [
      "Неконтролируемое строительство на берегах",
      "Загрязнение от туристической инфраструктуры",
      "Снижение уровня воды в озере",
    ],
    landmarks: ["Озеро Иссык-Куль", "Каньон Сказка", "Пик Хан-Тенгри"],
    area: "43 144 км²",
    population: "488 000",
    image:
      "https://images.unsplash.com/photo-1689788648053-cd482d1acd9c?w=800&h=500&fit=crop&auto=format",
    ecoScore: 62,
    color: "#0ea5e9",
  },
  {
    id: "naryn",
    name: "Нарын",
    description:
      "Самая высокогорная и малонаселенная область страны. Здесь расположены крупнейшие ледники и биосферные заповедники Кыргызстана.",
    problems: [
      "Деградация пастбищ от перевыпаса",
      "Браконьерство снежного барса",
      "Изменение климата угрожает экосистеме",
    ],
    landmarks: ["Нарынский заповедник", "Озеро Сон-Куль", "Ледник Петрова"],
    area: "45 257 км²",
    population: "280 000",
    image:
      "https://images.unsplash.com/photo-1608497735578-11912e18ed9f?w=800&h=500&fit=crop&auto=format",
    ecoScore: 78,
    color: "#10b981",
  },
  {
    id: "osh",
    name: "Ош",
    description:
      "Южная столица Кыргызстана и один из древнейших городов Центральной Азии. Расположен в Ферганской долине у подножия гор Алай.",
    problems: [
      "Высокий уровень загрязнения воздуха",
      "Нехватка зеленых насаждений в городе",
      "Дефицит чистой питьевой воды",
    ],
    landmarks: ["Гора Сулайман-Тоо", "Долина Алай", "Озеро Кара-Куль"],
    area: "29 200 км²",
    population: "1 100 000",
    image:
      "https://images.unsplash.com/photo-1743036619069-7298db1785ae?w=800&h=500&fit=crop&auto=format",
    ecoScore: 41,
    color: "#f97316",
  },
  {
    id: "jalal-abad",
    name: "Джалал-Абад",
    description:
      "Зеленый регион на юго-западе с богатыми лесными массивами и термальными источниками. Известен крупнейшими в мире ореховыми лесами.",
    problems: [
      "Вырубка и деградация ореховых лесов",
      "Эрозия горных склонов",
      "Загрязнение рек промышленностью",
    ],
    landmarks: [
      "Арсланбобский лес",
      "Водопад Абшир-Ата",
      "Термальные источники",
    ],
    area: "33 701 км²",
    population: "1 100 000",
    image:
      "https://images.unsplash.com/photo-1742914230492-fe4779cc0f60?w=800&h=500&fit=crop&auto=format",
    ecoScore: 55,
    color: "#84cc16",
  },
  {
    id: "chuy",
    name: "Чуйская область",
    description:
      "Административный и экономический центр страны. Долина реки Чу окружена горами Кыргызского хребта и является главной аграрной зоной.",
    problems: [
      "Загрязнение воздуха от транспорта и промышленности",
      "Урбанизация и уничтожение угодий",
      "Деградация реки Чу",
    ],
    landmarks: ["Ущелье Ала-Арча", "Хребет Кыргызский Алатау", "Долина Чу"],
    area: "20 162 км²",
    population: "900 000",
    image:
      "https://images.unsplash.com/photo-1551189496-17e968f1d52a?w=800&h=500&fit=crop&auto=format",
    ecoScore: 38,
    color: "#ef4444",
  },
  {
    id: "talas",
    name: "Талас",
    description:
      "Малонаселенная область на северо-западе с уникальными экосистемами Таласского Алатау. Один из наиболее экологически чистых регионов.",
    problems: [
      "Незаконная вырубка лесов",
      "Браконьерство",
      "Отсутствие системного экомониторинга",
    ],
    landmarks: ["Таласский Алатау", "Долина Таласа", "Озеро Кара-Коль"],
    area: "11 400 км²",
    population: "255 000",
    image:
      "https://images.unsplash.com/photo-1551189783-e226306fd8a1?w=800&h=500&fit=crop&auto=format",
    ecoScore: 71,
    color: "#a855f7",
  },
  {
    id: "batken",
    name: "Баткен",
    description:
      "Самая молодая область страны на юго-западе. Сухой климат, горные пустыни и уникальная флора полупустынных экосистем.",
    problems: [
      "Опустынивание территорий",
      "Дефицит водных ресурсов",
      "Деградация пастбищ",
    ],
    landmarks: [
      "Ляйлякский заповедник",
      "Туркестанский хребет",
      "Река Кара-Дарья",
    ],
    area: "17 000 км²",
    population: "540 000",
    image:
      "https://images.unsplash.com/photo-1694167232441-fd7a2c238d19?w=800&h=500&fit=crop&auto=format",
    ecoScore: 49,
    color: "#eab308",
  },
];

const initiativesData: Initiative[] = [
  {
    id: 1,
    title: "Миллион деревьев",
    description:
      "Масштабная программа по посадке одного миллиона деревьев по всему Кыргызстану к 2027 году. Работаем с местными сообществами и международными партнёрами.",
    category: "Лесовосстановление",
    status: "active",
    participants: 12450,
    date: "2023–2027",
    image:
      "https://images.unsplash.com/photo-1742914230492-fe4779cc0f60?w=600&h=400&fit=crop&auto=format",
    location: "Все регионы",
  },
  {
    id: 2,
    title: "Чистый Иссык-Куль",
    description:
      "Ежегодная программа очистки берегов озера от пластикового мусора. Включает просветительские мероприятия для туристов и местных жителей.",
    category: "Очистка вод",
    status: "active",
    participants: 8300,
    date: "2021–наст. время",
    image:
      "https://images.unsplash.com/photo-1689788648053-cd482d1acd9c?w=600&h=400&fit=crop&auto=format",
    location: "Иссык-Куль",
  },
  {
    id: 3,
    title: "Зеленые школы Кыргызстана",
    description:
      "Программа экологического образования в 500 школах. Установка раздельного сбора отходов, школьные огороды, уроки экологии.",
    category: "Экопросвещение",
    status: "active",
    participants: 125000,
    date: "2022–2026",
    image:
      "https://images.unsplash.com/photo-1551189783-e226306fd8a1?w=600&h=400&fit=crop&auto=format",
    location: "Бишкек, Ош, регионы",
  },
  {
    id: 4,
    title: "Мониторинг ледников",
    description:
      "Научная программа систематического наблюдения за состоянием ледников Тянь-Шаня с применением спутниковых данных и полевых измерений.",
    category: "Наука",
    status: "active",
    participants: 45,
    date: "2020–наст. время",
    image:
      "https://images.unsplash.com/photo-1603017412441-eb5669f87e75?w=600&h=400&fit=crop&auto=format",
    location: "Нарын, Иссык-Куль",
  },
  {
    id: 5,
    title: "Солнечная энергия для сёл",
    description:
      "Установка солнечных панелей в отдалённых сёлах Нарынской области. Снижение зависимости от угля и сокращение выбросов CO₂.",
    category: "Возобновляемая энергия",
    status: "planned",
    participants: 0,
    date: "2025–2028",
    image:
      "https://images.unsplash.com/photo-1608497735578-11912e18ed9f?w=600&h=400&fit=crop&auto=format",
    location: "Нарын",
  },
  {
    id: 6,
    title: "Защита снежного барса",
    description:
      "Программа по сохранению популяции снежного барса. Антибраконьерское патрулирование, работа с пастухами и горными сообществами.",
    category: "Биоразнообразие",
    status: "completed",
    participants: 320,
    date: "2019–2024",
    image:
      "https://images.unsplash.com/photo-1689788648186-60a2b9e1ad71?w=600&h=400&fit=crop&auto=format",
    location: "Нарын, Ош",
  },
];

// Chart data
const temperatureData = [
  { year: "1970", delta: 0.2 },
  { year: "1980", delta: 0.35 },
  { year: "1990", delta: 0.55 },
  { year: "2000", delta: 0.75 },
  { year: "2010", delta: 1.05 },
  { year: "2015", delta: 1.28 },
  { year: "2020", delta: 1.52 },
  { year: "2024", delta: 1.74 },
];

const glacierData = [
  { year: "1970", area: 8076 },
  { year: "1980", area: 7820 },
  { year: "1990", area: 7350 },
  { year: "2000", area: 6900 },
  { year: "2010", area: 6450 },
  { year: "2020", area: 5980 },
  { year: "2024", area: 5623 },
];

const airQualityData = [
  { city: "Бишкек", pm25: 42, norm: 5 },
  { city: "Ош", pm25: 35, norm: 5 },
  { city: "Кант", pm25: 29, norm: 5 },
  { city: "Джалал-Абад", pm25: 24, norm: 5 },
  { city: "Нарын", pm25: 18, norm: 5 },
  { city: "Каракол", pm25: 20, norm: 5 },
  { city: "Талас", pm25: 14, norm: 5 },
];

const forestData = [
  { year: "1990", coverage: 5.8 },
  { year: "2000", coverage: 5.2 },
  { year: "2010", coverage: 4.7 },
  { year: "2015", coverage: 4.4 },
  { year: "2020", coverage: 4.1 },
  { year: "2024", coverage: 3.8 },
];

const wasteData = [
  { name: "Захоронение", value: 82, color: "#ef4444" },
  { name: "Переработка", value: 12, color: "#10b981" },
  { name: "Компостирование", value: 4, color: "#84cc16" },
  { name: "Сжигание", value: 2, color: "#f97316" },
];

const waterData = [
  { year: "2010", volume: 100 },
  { year: "2015", volume: 96 },
  { year: "2018", volume: 91 },
  { year: "2021", volume: 88 },
  { year: "2024", volume: 84 },
];

// ─── UTILITY ──────────────────────────────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handle = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full bg-emerald-500 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all duration-200 hover:scale-110 active:scale-95"
      aria-label="Наверх"
    >
      <ArrowUp size={20} />
    </button>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/research", label: "Исследования" },
  { href: "/regions", label: "Регионы" },
  { href: "/news", label: "Новости" },
  { href: "/initiatives", label: "Инициативы" },
  { href: "/statistics", label: "Статистика" },
  { href: "/about", label: "О проекте" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={`fixed top-0.5 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
            <Leaf size={15} className="text-white" />
          </div>
          <span
            className="font-bold text-white tracking-tight text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Эко{" "}
            <span className="text-emerald-400">Кыргызстан</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          className="lg:hidden text-white/70 hover:text-white p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm transition-all ${
                  isActive
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Leaf size={15} className="text-white" />
              </div>
              <span
                className="font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Эко Кыргызстан
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Цифровая платформа для мониторинга экологического состояния
              Кыргызстана. Объективные данные, научный анализ, реальные действия.
            </p>
          </div>
          <div>
            <h4 className="text-white/60 font-medium text-xs uppercase tracking-widest mb-4">
              Разделы
            </h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/40 hover:text-emerald-400 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/60 font-medium text-xs uppercase tracking-widest mb-4">
              Контакты
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@eco.kg"
                className="flex items-center gap-2 text-white/40 hover:text-emerald-400 text-sm transition-colors"
              >
                <Mail size={13} /> info@eco.kg
              </a>
              <a
                href="tel:+996312000000"
                className="flex items-center gap-2 text-white/40 hover:text-emerald-400 text-sm transition-colors"
              >
                <Phone size={13} /> +996 312 00-00-00
              </a>
              <span className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin size={13} /> г. Бишкек, ул. Чуй 120
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © 2025 Эко Кыргызстан. Все права защищены.
          </p>
          <p className="text-white/25 text-xs">
            Данные: ПРООН, WWF, Министерство природных ресурсов КР
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function SectionTitle({
  tag,
  title,
  subtitle,
  className = "mb-12",
}: {
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest">
        {tag}
      </span>
      <h2
        className="text-3xl md:text-4xl text-white mt-2 leading-tight font-bold"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/40 mt-3 text-sm leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

const categoryColors: Record<string, string> = {
  Климат: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Воздух: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Вода: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Природа: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Инициативы: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Отходы: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 bg-emerald-950 overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium border ${
            categoryColors[item.category] ||
            "text-white/60 bg-white/10 border-white/10"
          }`}
        >
          {item.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors flex-1">
          {item.title}
        </h3>
        <p className="text-white/35 text-xs mt-2 line-clamp-2 leading-relaxed">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <span className="text-white/30 text-xs flex items-center gap-1.5">
            <Calendar size={11} /> {item.date}
          </span>
          <span className="text-white/30 text-xs">{item.readTime} мин</span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── RECHARTS SHARED ──────────────────────────────────────────────────────────

const GRID = "rgba(255,255,255,0.06)";
const AXIS = "rgba(255,255,255,0.28)";
const TOOLTIP_STYLE = {
  background: "#0d1f16",
  border: "1px solid rgba(16,185,129,0.2)",
  borderRadius: 10,
  fontSize: 12,
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

const homeStats = [
  { value: "27%", label: "потеря площади ледников" },
  { value: "5 623", label: "км² ледников осталось" },
  { value: "3.8%", label: "лесного покрова страны" },
  { value: "42", label: "мкг/м³ PM2.5 в Бишкеке" },
];

const homeProblems = [
  {
    icon: Thermometer,
    title: "Изменение климата",
    metric: "+1.74°C",
    desc: "Среднегодовая температура выросла на 1.74°C. Тренд ускоряется каждое десятилетие.",
    colorClass: "text-orange-400",
    borderClass: "border-orange-500/15 bg-orange-500/5",
  },
  {
    icon: Mountain,
    title: "Таяние ледников",
    metric: "−27%",
    desc: "С 1970 года площадь ледников Тянь-Шаня сократилась на 2 453 км². Это источник воды для 3 млн человек.",
    colorClass: "text-blue-400",
    borderClass: "border-blue-500/15 bg-blue-500/5",
  },
  {
    icon: Wind,
    title: "Загрязнение воздуха",
    metric: "8× ВОЗ",
    desc: "PM2.5 в Бишкеке превышает норму ВОЗ в 8 раз зимой. Ежегодно — 2 700 смертей.",
    colorClass: "text-slate-400",
    borderClass: "border-slate-500/15 bg-slate-500/5",
  },
  {
    icon: Droplets,
    title: "Водные ресурсы",
    metric: "−16%",
    desc: "Объём речного стока снизился на 16% за 15 лет. Угроза ирригации и питьевого водоснабжения.",
    colorClass: "text-cyan-400",
    borderClass: "border-cyan-500/15 bg-cyan-500/5",
  },
  {
    icon: TreePine,
    title: "Вырубка лесов",
    metric: "3.8%",
    desc: "Лесной покров — лишь 3.8% территории. Ежегодно теряется до 12 000 га леса.",
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-500/15 bg-emerald-500/5",
  },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950">
          <img
            src="https://images.unsplash.com/photo-1551189496-17e968f1d52a?w=1920&h=1080&fit=crop&auto=format"
            alt="Горы Кыргызстана"
            className="w-full h-full object-cover opacity-45"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-[#060e0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-emerald-400 text-xs font-mono uppercase tracking-widest mb-8 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10"
          >
            Экологический мониторинг · Кыргызская Республика
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Будущее природы<br />
            <em className="text-emerald-400 not-italic">Кыргызстана</em>{" "}
            зависит<br />
            от решений сегодняшнего дня
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/55 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Данные, исследования и инициативы для защиты уникальной экосистемы
            Кыргызстана
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/statistics"
              className="px-8 py-3.5 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-all duration-200 text-sm shadow-lg shadow-emerald-500/25"
            >
              Смотреть данные
            </Link>
            <Link
              to="/initiatives"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all duration-200 text-sm backdrop-blur-sm"
            >
              Инициативы
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 pointer-events-none">
          <span className="text-[10px] font-mono tracking-[0.2em]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-14 border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {homeStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center px-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 font-mono">
                {stat.value}
              </div>
              <div className="text-white/35 text-xs mt-1.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle
          tag="Основные проблемы"
          title="Экологические вызовы страны"
          subtitle="Пять ключевых угроз для природы и населения Кыргызстана, требующих немедленных действий."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {homeProblems.map((prob, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-6 rounded-2xl border ${prob.borderClass} hover:scale-[1.015] transition-transform duration-200`}
            >
              <prob.icon size={26} className={`${prob.colorClass} mb-4`} />
              <div
                className={`text-3xl font-mono font-bold ${prob.colorClass} mb-2`}
              >
                {prob.metric}
              </div>
              <h3 className="text-white font-medium mb-2">{prob.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col justify-between"
          >
            <div>
              <Globe size={26} className="text-emerald-400 mb-4" />
              <h3 className="text-white font-medium mb-2">
                Полный анализ данных
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Изучите все показатели в интерактивном разделе статистики с
                графиками и трендами.
              </p>
            </div>
            <Link
              to="/statistics"
              className="mt-6 flex items-center gap-1.5 text-emerald-400 text-sm font-medium group w-fit"
            >
              Открыть раздел{" "}
              <ChevronRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between">
            <SectionTitle tag="Актуально" title="Последние новости" />
            <Link
              to="/news"
              className="flex items-center gap-1 text-emerald-400 text-sm hover:gap-2 transition-all mt-8 shrink-0"
            >
              Все новости <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsData.slice(0, 3).map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives preview */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between">
          <SectionTitle tag="Действия" title="Активные инициативы" />
          <Link
            to="/initiatives"
            className="flex items-center gap-1 text-emerald-400 text-sm hover:gap-2 transition-all mt-8 shrink-0"
          >
            Все проекты <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiativesData
            .filter((i) => i.status === "active")
            .slice(0, 3)
            .map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="relative h-44 bg-emerald-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/25">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-sm font-medium mb-2 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-white/30 text-xs">
                    <span className="flex items-center gap-1">
                      <Users size={11} />{" "}
                      {item.participants.toLocaleString()} уч.
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {item.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950">
          <img
            src="https://images.unsplash.com/photo-1602529354054-bc1c49cd306c?w=1920&h=700&fit=crop&auto=format"
            alt="Природа Кыргызстана"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center max-w-2xl mx-auto px-6"
        >
          <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest">
            Присоединяйтесь
          </span>
          <h2
            className="text-3xl md:text-5xl text-white font-bold mt-4 mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Стань частью
            <br />
            <em className="text-emerald-400 not-italic">
              экологического движения
            </em>
          </h2>
          <p className="text-white/45 mb-10 leading-relaxed">
            Более 146 000 человек уже участвуют в экологических инициативах
            Кыргызстана. Присоединяйтесь — вместе сохраним природу для будущих
            поколений.
          </p>
          <Link
            to="/initiatives"
            className="px-10 py-4 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-all duration-200 inline-block shadow-lg shadow-emerald-500/25"
          >
            Найти инициативу
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

// ─── RESEARCH PAGE ────────────────────────────────────────────────────────────

const researchTabs = [
  { id: "climate", label: "Климат", icon: Thermometer },
  { id: "glaciers", label: "Ледники", icon: Mountain },
  { id: "air", label: "Воздух", icon: Wind },
  { id: "water", label: "Вода", icon: Droplets },
  { id: "forest", label: "Леса", icon: TreePine },
];

function ResearchPage() {
  const [activeTab, setActiveTab] = useState("climate");

  const tabContent: Record<
    string,
    {
      color: string;
      title: string;
      body: string;
      stats: { label: string; value: string }[];
      chart: React.ReactNode;
    }
  > = {
    climate: {
      color: "#f97316",
      title: "Изменение температуры",
      body: "Среднегодовая температура в Кыргызстане увеличилась на 1.74°C с доиндустриального периода — выше среднемирового показателя. Это напрямую влияет на ледники, водные ресурсы и сельское хозяйство страны.",
      stats: [
        { label: "Рост температуры", value: "+1.74°C" },
        { label: "Доп. жарких дней", value: "+23" },
        { label: "Сезон таяния", value: "+18 дней" },
        { label: "Ледяной период", value: "−15 дней" },
      ],
      chart: (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={temperatureData} margin={{ top: 5, right: 10, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="tG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ ...TOOLTIP_STYLE, borderColor: "rgba(249,115,22,0.25)" }} labelStyle={{ color: "white" }} itemStyle={{ color: "#f97316" }} />
            <Area type="monotone" dataKey="delta" stroke="#f97316" strokeWidth={2.5} fill="url(#tG)" name="°C" />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    glaciers: {
      color: "#60a5fa",
      title: "Состояние ледников",
      body: "Кыргызстан обладает крупнейшими запасами пресной воды в Центральной Азии в виде ледников. С 1970 года их площадь сократилась с 8 076 до 5 623 км². Темпы таяния ускоряются каждое десятилетие.",
      stats: [
        { label: "Площадь 2024", value: "5 623 км²" },
        { label: "Потеря с 1970 г.", value: "2 453 км²" },
        { label: "Ежегодная убыль", value: "~45 км²" },
        { label: "Крупнейший", value: "Петрова 28 км²" },
      ],
      chart: (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={glacierData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} domain={[5000, 8500]} />
            <Tooltip contentStyle={{ ...TOOLTIP_STYLE, borderColor: "rgba(96,165,250,0.25)" }} labelStyle={{ color: "white" }} itemStyle={{ color: "#60a5fa" }} />
            <Area type="monotone" dataKey="area" stroke="#60a5fa" strokeWidth={2.5} fill="url(#gG)" name="км²" />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    air: {
      color: "#f87171",
      title: "Качество воздуха",
      body: "Загрязнение воздуха — острейшая экологическая проблема городов Кыргызстана. Основные источники: угольное отопление, транспорт, промышленность. Бишкек регулярно входит в топ-10 самых загрязненных городов мира.",
      stats: [
        { label: "PM2.5 Бишкек (год)", value: "42 мкг/м³" },
        { label: "Норма ВОЗ", value: "5 мкг/м³" },
        { label: "Превышение нормы", value: "в 8 раз" },
        { label: "Смертей в год", value: "~2 700" },
      ],
      chart: (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={airQualityData} margin={{ top: 5, right: 10, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis dataKey="city" tick={{ fill: AXIS, fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ ...TOOLTIP_STYLE, borderColor: "rgba(248,113,113,0.25)" }} labelStyle={{ color: "white" }} />
            <Legend wrapperStyle={{ fontSize: 11, color: AXIS }} />
            <Bar dataKey="pm25" fill="#f87171" radius={[4, 4, 0, 0]} name="PM2.5" />
            <Bar dataKey="norm" fill="rgba(16,185,129,0.35)" radius={[4, 4, 0, 0]} name="Норма ВОЗ" />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    water: {
      color: "#22d3ee",
      title: "Водные ресурсы",
      body: "Кыргызстан формирует около 25% пресноводных ресурсов Центральной Азии. Из-за изменения климата объём речного стока снижается, угрожая ирригации, энергетике и питьевому водоснабжению.",
      stats: [
        { label: "Рек и водотоков", value: "38 000" },
        { label: "Падение р. Нарын", value: "−18%" },
        { label: "Глубина Иссык-Куля", value: "1 738 м" },
        { label: "Доступ к воде", value: "71%" },
      ],
      chart: (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={waterData} margin={{ top: 5, right: 10, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} domain={[75, 105]} />
            <Tooltip contentStyle={{ ...TOOLTIP_STYLE, borderColor: "rgba(34,211,238,0.25)" }} labelStyle={{ color: "white" }} itemStyle={{ color: "#22d3ee" }} />
            <Line type="monotone" dataKey="volume" stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: "#22d3ee", r: 4, strokeWidth: 0 }} name="% от уровня 2010" />
          </LineChart>
        </ResponsiveContainer>
      ),
    },
    forest: {
      color: "#10b981",
      title: "Лесной фонд",
      body: "Лесной покров Кыргызстана составляет лишь 3.8% — один из самых низких показателей в регионе. Уникальные ореховые леса Джалал-Абадской области (крупнейшие в мире) под угрозой вырубки и вредителей.",
      stats: [
        { label: "Лесной покров", value: "3.8%" },
        { label: "Потеря с 1990 г.", value: "2 млн га" },
        { label: "Ореховые леса", value: "608 000 га" },
        { label: "Восстановлено 2024", value: "82 000 га" },
      ],
      chart: (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={forestData} margin={{ top: 5, right: 10, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="fG2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} domain={[2.5, 7]} />
            <Tooltip contentStyle={{ ...TOOLTIP_STYLE }} labelStyle={{ color: "white" }} itemStyle={{ color: "#10b981" }} />
            <Area type="monotone" dataKey="coverage" stroke="#10b981" strokeWidth={2.5} fill="url(#fG2)" name="%" />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
  };

  const active = tabContent[activeTab];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="Исследования"
        title="Аналитика экологических показателей"
        subtitle="Научные данные о состоянии природной среды Кыргызстана на основе многолетних наблюдений и мониторинга."
      />

      <div className="flex flex-wrap gap-2 mb-12">
        {researchTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : "bg-white/5 text-white/50 hover:text-white hover:bg-white/8 border border-white/5"
            }`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3
            className="text-2xl text-white font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {active.title}
          </h3>
          <p className="text-white/45 leading-relaxed mb-8 text-sm">
            {active.body}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {active.stats.map((s, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div
                  className="text-xl font-mono font-bold mb-1"
                  style={{ color: active.color }}
                >
                  {s.value}
                </div>
                <div className="text-white/50 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
          <h4 className="text-white/50 text-xs font-mono uppercase tracking-wider mb-6">
            Динамика показателей
          </h4>
          {active.chart}
        </div>
      </div>
    </div>
  );
}

// ─── REGIONS PAGE ─────────────────────────────────────────────────────────────

function RegionsPage() {
  const [selected, setSelected] = useState<Region | null>(null);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="Регионы"
        title="Экологическая карта Кыргызстана"
        subtitle="Семь регионов с уникальными природными условиями, экологическими проблемами и природными объектами."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {regionsData.map((region, i) => (
          <motion.div
            key={region.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            onClick={() => setSelected(region)}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300"
          >
            <div className="relative h-48 bg-emerald-950 overflow-hidden">
              <img
                src={region.image}
                alt={region.name}
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                <h3
                  className="text-white font-bold text-xl leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {region.name}
                </h3>
                <div
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full shrink-0 ml-2"
                  style={{
                    color: region.color,
                    background: `${region.color}1a`,
                    border: `1px solid ${region.color}33`,
                  }}
                >
                  {region.ecoScore}
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/[0.02]">
              <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
                {region.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-white/25 text-xs">{region.area}</span>
                <span className="text-emerald-400 text-xs flex items-center gap-1">
                  Подробнее <ChevronRight size={11} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative bg-[#0a1a11] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 bg-emerald-950 shrink-0">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a11] via-transparent to-black/30" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/60 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2
                  className="text-white text-3xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {selected.name}
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Эко-индекс", value: selected.ecoScore.toString() },
                  { label: "Площадь", value: selected.area },
                  { label: "Население", value: selected.population },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="text-center p-3 rounded-xl bg-white/[0.04] border border-white/5"
                  >
                    <div
                      className="font-mono text-lg font-bold"
                      style={{ color: selected.color }}
                    >
                      {s.value}
                    </div>
                    <div className="text-white/35 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {selected.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white/60 text-xs font-mono uppercase tracking-wider mb-3">
                    Экопроблемы
                  </h4>
                  <ul className="space-y-2.5">
                    {selected.problems.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-white/45"
                      >
                        <AlertTriangle
                          size={13}
                          className="text-orange-400 mt-0.5 shrink-0"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white/60 text-xs font-mono uppercase tracking-wider mb-3">
                    Природные объекты
                  </h4>
                  <ul className="space-y-2.5">
                    {selected.landmarks.map((l, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-white/45"
                      >
                        <MapPin
                          size={13}
                          className="text-emerald-400 mt-0.5 shrink-0"
                        />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ─── NEWS PAGE ────────────────────────────────────────────────────────────────

const newsCategories = [
  "Все",
  "Климат",
  "Воздух",
  "Вода",
  "Природа",
  "Инициативы",
  "Отходы",
];

function NewsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");

  const filtered = newsData.filter((item) => {
    const matchCat = category === "Все" || item.category === category;
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="Новости"
        title="Экологическая лента"
        subtitle="Актуальные новости о состоянии природной среды, инициативах и научных исследованиях Кыргызстана."
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Поиск новостей..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white text-sm pl-10 pr-4 py-3 rounded-full focus:outline-none focus:border-emerald-500/40 placeholder:text-white/30 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-150 ${
                category === cat
                  ? "bg-emerald-500 text-white"
                  : "bg-white/5 text-white/45 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-white/30">
          <Search size={32} className="mx-auto mb-4 opacity-40" />
          <p className="text-sm">По вашему запросу ничего не найдено</p>
        </div>
      )}
    </div>
  );
}

// ─── INITIATIVES PAGE ─────────────────────────────────────────────────────────

const initiativeCategories = [
  "Все",
  "Лесовосстановление",
  "Очистка вод",
  "Экопросвещение",
  "Наука",
  "Возобновляемая энергия",
  "Биоразнообразие",
];

const statusConfig: Record<
  string,
  { label: string; colorClass: string }
> = {
  active: {
    label: "Активный",
    colorClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  planned: {
    label: "Планируется",
    colorClass: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
  completed: {
    label: "Завершён",
    colorClass: "text-white/40 bg-white/5 border-white/10",
  },
};

function InitiativesPage() {
  const [category, setCategory] = useState("Все");

  const filtered = initiativesData.filter(
    (item) => category === "Все" || item.category === category
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="Инициативы"
        title="Экологические проекты"
        subtitle="Каталог программ и проектов по защите природы Кыргызстана — от волонтерских акций до долгосрочных научных программ."
      />

      <div className="flex flex-wrap gap-2 mb-10">
        {initiativeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-150 ${
              category === cat
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-white/45 hover:text-white border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => {
          const sc = statusConfig[item.status];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-emerald-500/20 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 bg-emerald-950 overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium border ${sc.colorClass}`}
                  >
                    {sc.label}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-medium mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/35 text-xs leading-relaxed line-clamp-3 flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs text-white/25 border-t border-white/5 pt-4 mt-4">
                  <span className="flex items-center gap-1">
                    <Users size={11} />{" "}
                    {item.participants > 0
                      ? item.participants.toLocaleString() + " уч."
                      : "Набор открыт"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} /> {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {item.date}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── STATISTICS PAGE ──────────────────────────────────────────────────────────

function StatisticsPage() {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="Статистика"
        title="Экологический дашборд"
        subtitle="Интерактивные данные о состоянии природной среды Кыргызстана: ледники, воздух, леса, отходы."
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Площадь ледников",
            value: "5 623 км²",
            trend: "−2.1% / год",
            down: true,
            color: "text-blue-400",
            border: "border-blue-500/10",
          },
          {
            label: "PM2.5 Бишкек",
            value: "42 мкг/м³",
            trend: "−5% за 5 лет",
            down: false,
            color: "text-red-400",
            border: "border-red-500/10",
          },
          {
            label: "Лесной покров",
            value: "3.8%",
            trend: "−0.3% / год",
            down: true,
            color: "text-emerald-400",
            border: "border-emerald-500/10",
          },
          {
            label: "Переработка",
            value: "12%",
            trend: "+2% за год",
            down: false,
            color: "text-yellow-400",
            border: "border-yellow-500/10",
          },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`p-5 rounded-2xl border ${m.border} bg-white/[0.02]`}
          >
            <div className={`text-2xl font-mono font-bold ${m.color} mb-1`}>
              {m.value}
            </div>
            <div className="text-white/45 text-xs mb-2">{m.label}</div>
            <div
              className={`text-xs font-mono ${
                m.down ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {m.trend}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Temperature */}
        <div className="rounded-2xl bg-white/[0.025] border border-white/5 p-6">
          <h4 className="text-white text-sm font-medium mb-1">
            Температурная аномалия
          </h4>
          <p className="text-white/35 text-xs mb-6">
            отклонение от нормы 1961–1990, °C
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={temperatureData} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="sT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ ...TOOLTIP_STYLE, borderColor: "rgba(249,115,22,0.2)" }} labelStyle={{ color: "white" }} itemStyle={{ color: "#f97316" }} />
              <Area type="monotone" dataKey="delta" stroke="#f97316" strokeWidth={2} fill="url(#sT)" name="°C" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Glaciers */}
        <div className="rounded-2xl bg-white/[0.025] border border-white/5 p-6">
          <h4 className="text-white text-sm font-medium mb-1">
            Площадь ледников
          </h4>
          <p className="text-white/35 text-xs mb-6">общая площадь, км²</p>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={glacierData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="sG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} domain={[5000, 8500]} />
              <Tooltip contentStyle={{ ...TOOLTIP_STYLE, borderColor: "rgba(96,165,250,0.2)" }} labelStyle={{ color: "white" }} itemStyle={{ color: "#60a5fa" }} />
              <Area type="monotone" dataKey="area" stroke="#60a5fa" strokeWidth={2} fill="url(#sG)" name="км²" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Air quality */}
        <div className="rounded-2xl bg-white/[0.025] border border-white/5 p-6">
          <h4 className="text-white text-sm font-medium mb-1">PM2.5 по городам</h4>
          <p className="text-white/35 text-xs mb-6">
            среднегодовой показатель, мкг/м³ (норма ВОЗ: 5)
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={airQualityData} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
              <XAxis dataKey="city" tick={{ fill: AXIS, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: AXIS, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ ...TOOLTIP_STYLE, borderColor: "rgba(248,113,113,0.2)" }} labelStyle={{ color: "white" }} />
              <Legend wrapperStyle={{ fontSize: 10, color: AXIS }} />
              <Bar dataKey="pm25" fill="#f87171" radius={[3, 3, 0, 0]} name="PM2.5" />
              <Bar dataKey="norm" fill="rgba(16,185,129,0.35)" radius={[3, 3, 0, 0]} name="Норма ВОЗ" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Waste pie */}
        <div className="rounded-2xl bg-white/[0.025] border border-white/5 p-6">
          <h4 className="text-white text-sm font-medium mb-1">
            Обращение с отходами
          </h4>
          <p className="text-white/35 text-xs mb-6">
            структура утилизации ТКО, %
          </p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={210}>
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={88}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {wasteData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ ...TOOLTIP_STYLE }}
                  itemStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3 flex-1">
              {wasteData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-white/45 text-xs flex-1">{d.name}</span>
                  <span className="text-white font-mono text-xs">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forest */}
      <div className="mt-6 rounded-2xl bg-white/[0.025] border border-white/5 p-6">
        <h4 className="text-white text-sm font-medium mb-1">
          Лесной покров Кыргызстана
        </h4>
        <p className="text-white/35 text-xs mb-6">
          % от общей площади страны, 1990–2024
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={forestData} margin={{ top: 5, right: 10, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="sF" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis dataKey="year" tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: AXIS, fontSize: 11 }} axisLine={false} tickLine={false} domain={[2.5, 7]} />
            <Tooltip contentStyle={{ ...TOOLTIP_STYLE }} labelStyle={{ color: "white" }} itemStyle={{ color: "#10b981" }} />
            <Area type="monotone" dataKey="coverage" stroke="#10b981" strokeWidth={2.5} fill="url(#sF)" name="%" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

const teamMembers = [
  {
    name: "Айгуль Асанова",
    role: "Директор проекта",
    spec: "Климатология, экополитика",
    initials: "АА",
  },
  {
    name: "Бекзат Кочкоров",
    role: "Главный аналитик",
    spec: "Гидрология, ГИС-системы",
    initials: "БК",
  },
  {
    name: "Нуриза Джумабекова",
    role: "Редактор",
    spec: "Научная журналистика",
    initials: "НД",
  },
  {
    name: "Тилек Мамытбеков",
    role: "Разработчик",
    spec: "Визуализация данных",
    initials: "ТМ",
  },
];

const partners = [
  "ПРООН Кыргызстан",
  "WWF Центральная Азия",
  "Greenpeace КР",
  "Министерство природных ресурсов КР",
  "Американский университет ЦА",
  "GIZ Кыргызстан",
];

function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-emerald-950">
          <img
            src="https://images.unsplash.com/photo-1689788647851-3203de944519?w=1920&h=600&fit=crop&auto=format"
            alt="Природа Кыргызстана"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060e0a]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest">
            О проекте
          </span>
          <h1
            className="text-4xl md:text-6xl text-white font-bold mt-4 mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Наша миссия —{" "}
            <em className="text-emerald-400 not-italic">сохранить</em>
            <br />
            природу Кыргызстана
          </h1>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            Эко Кыргызстан — независимая цифровая платформа, объединяющая
            данные, исследования и людей для защиты уникальной экосистемы
            страны.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {/* Goals */}
        <section className="mb-24">
          <SectionTitle tag="Цели" title="Что мы делаем" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart2,
                title: "Мониторинг",
                desc: "Собираем и публикуем данные о состоянии воздуха, воды, лесов и ледников из официальных и научных источников.",
              },
              {
                icon: BookOpen,
                title: "Просвещение",
                desc: "Переводим сложные научные данные в понятный формат. Поддерживаем экологическое образование в школах и вузах.",
              },
              {
                icon: Users,
                title: "Объединение",
                desc: "Создаём пространство для организаций, учёных и активистов. Координируем инициативы по всей стране.",
              },
            ].map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                <g.icon size={28} className="text-emerald-400 mb-5" />
                <h3 className="text-white font-medium mb-3 text-lg">
                  {g.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-24">
          <SectionTitle tag="Команда" title="Люди за проектом" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {teamMembers.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/15 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {m.initials}
                </div>
                <h3 className="text-white text-sm font-medium mb-1">
                  {m.name}
                </h3>
                <p className="text-emerald-400 text-xs mb-2">{m.role}</p>
                <p className="text-white/30 text-xs">{m.spec}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="mb-24">
          <SectionTitle tag="Партнёры" title="Кто нас поддерживает" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center hover:border-white/10 transition-colors"
              >
                <span className="text-white/45 text-sm">{p}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionTitle tag="Контакты" title="Свяжитесь с нами" />
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-white/45 mb-8 leading-relaxed text-sm">
                Если у вас есть данные, исследования или идеи для
                сотрудничества — напишите нам. Мы открыты для партнёрства с
                организациями и учёными.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Mail, text: "info@eco.kg", href: "mailto:info@eco.kg" },
                  {
                    icon: Phone,
                    text: "+996 312 00-00-00",
                    href: "tel:+996312000000",
                  },
                  {
                    icon: MapPin,
                    text: "г. Бишкек, ул. Чуй 120",
                    href: undefined,
                  },
                ].map((c, i) => (
                  <div key={i}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="flex items-center gap-3 text-white/45 hover:text-emerald-400 text-sm transition-colors group"
                      >
                        <c.icon
                          size={17}
                          className="text-emerald-400 shrink-0"
                        />
                        {c.text}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-white/45 text-sm">
                        <c.icon
                          size={17}
                          className="text-emerald-400 shrink-0"
                        />
                        {c.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              {[
                { type: "text", placeholder: "Ваше имя" },
                { type: "email", placeholder: "Email" },
                { type: "text", placeholder: "Тема" },
              ].map((f, i) => (
                <input
                  key={i}
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full bg-white/[0.04] border border-white/8 text-white text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-emerald-500/40 placeholder:text-white/30 transition-colors"
                />
              ))}
              <textarea
                rows={4}
                placeholder="Сообщение"
                className="w-full bg-white/[0.04] border border-white/8 text-white text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-emerald-500/40 placeholder:text-white/30 resize-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/regions" element={<RegionsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/initiatives" element={<InitiativesPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
