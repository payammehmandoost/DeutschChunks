export interface Phrase {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: string;
  german: string;
  english: string;
  persian: string;
  register: 'formal' | 'informal' | 'neutral';
  difficulty: 1 | 2 | 3 | 4 | 5;
  audio: string;
  audioSlow: string;
  example?: string;
  exampleEnglish?: string;
  examplePersian?: string;
  notes?: string;
  tags: string[];
  lesson: number;
}

export const phrases: Phrase[] = [
  // Lesson 1: Greetings
  {
    id: "a1_001",
    level: "A1",
    category: "Greetings",
    german: "Hallo!",
    english: "Hello!",
    persian: "سلام!",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_001.mp3",
    audioSlow: "/audio/a1/a1_001_slow.mp3",
    example: "Hallo, wie geht's?",
    exampleEnglish: "Hello, how are you?",
    examplePersian: "سلام، حالت چطوره؟",
    notes: "Universal greeting, used in all situations",
    tags: ["greeting", "basic"],
    lesson: 1
  },
  {
    id: "a1_002",
    level: "A1",
    category: "Greetings",
    german: "Guten Morgen!",
    english: "Good morning!",
    persian: "صبح بخیر!",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_002.mp3",
    audioSlow: "/audio/a1/a1_002_slow.mp3",
    example: "Guten Morgen, Herr Müller!",
    exampleEnglish: "Good morning, Mr. Müller!",
    examplePersian: "صبح بخیر، آقای مولر!",
    tags: ["greeting", "morning", "formal"],
    lesson: 1
  },
  {
    id: "a1_003",
    level: "A1",
    category: "Greetings",
    german: "Guten Tag!",
    english: "Good day! / Hello!",
    persian: "روز بخیر! / سلام!",
    register: "formal",
    difficulty: 1,
    audio: "/audio/a1/a1_003.mp3",
    audioSlow: "/audio/a1/a1_003_slow.mp3",
    example: "Guten Tag, ich bin neu hier.",
    exampleEnglish: "Good day, I'm new here.",
    examplePersian: "روز بخیر، من اینجا جدید هستم.",
    notes: "Formal greeting used during the day",
    tags: ["greeting", "formal", "daytime"],
    lesson: 1
  },
  {
    id: "a1_004",
    level: "A1",
    category: "Greetings",
    german: "Guten Abend!",
    english: "Good evening!",
    persian: "عصر بخیر!",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_004.mp3",
    audioSlow: "/audio/a1/a1_004_slow.mp3",
    tags: ["greeting", "evening"],
    lesson: 1
  },
  {
    id: "a1_005",
    level: "A1",
    category: "Greetings",
    german: "Tschüss!",
    english: "Bye!",
    persian: "خداحافظ!",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_005.mp3",
    audioSlow: "/audio/a1/a1_005_slow.mp3",
    example: "Tschüss, bis morgen!",
    exampleEnglish: "Bye, see you tomorrow!",
    examplePersian: "خداحافظ، فردا می‌بینمت!",
    tags: ["greeting", "farewell", "informal"],
    lesson: 1
  },
  {
    id: "a1_006",
    level: "A1",
    category: "Greetings",
    german: "Auf Wiedersehen!",
    english: "Goodbye!",
    persian: "خداحافظ! (رسمی)",
    register: "formal",
    difficulty: 1,
    audio: "/audio/a1/a1_006.mp3",
    audioSlow: "/audio/a1/a1_006_slow.mp3",
    notes: "Formal way to say goodbye",
    tags: ["greeting", "farewell", "formal"],
    lesson: 1
  },
  // Lesson 2: Introductions
  {
    id: "a1_007",
    level: "A1",
    category: "Introductions",
    german: "Wie geht's dir?",
    english: "How are you?",
    persian: "حالت چطوره؟",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_007.mp3",
    audioSlow: "/audio/a1/a1_007_slow.mp3",
    example: "Hallo! Wie geht's dir?",
    exampleEnglish: "Hello! How are you?",
    examplePersian: "سلام! حالت چطوره؟",
    notes: "'Wie geht's' is short for 'Wie geht es'",
    tags: ["question", "greeting", "informal"],
    lesson: 2
  },
  {
    id: "a1_008",
    level: "A1",
    category: "Introductions",
    german: "Wie geht es Ihnen?",
    english: "How are you? (formal)",
    persian: "حال شما چطوره؟ (رسمی)",
    register: "formal",
    difficulty: 1,
    audio: "/audio/a1/a1_008.mp3",
    audioSlow: "/audio/a1/a1_008_slow.mp3",
    notes: "Formal version - use with strangers, elders, in business",
    tags: ["question", "greeting", "formal"],
    lesson: 2
  },
  {
    id: "a1_009",
    level: "A1",
    category: "Introductions",
    german: "Mir geht es gut, danke.",
    english: "I'm fine, thank you.",
    persian: "حالم خوبه، ممنون.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_009.mp3",
    audioSlow: "/audio/a1/a1_009_slow.mp3",
    tags: ["response", "greeting"],
    lesson: 2
  },
  {
    id: "a1_010",
    level: "A1",
    category: "Introductions",
    german: "Ich heiße...",
    english: "My name is...",
    persian: "اسم من ... است.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_010.mp3",
    audioSlow: "/audio/a1/a1_010_slow.mp3",
    example: "Ich heiße Sara.",
    exampleEnglish: "My name is Sara.",
    examplePersian: "اسم من سارا است.",
    tags: ["introduction", "basic"],
    lesson: 2
  },
  {
    id: "a1_011",
    level: "A1",
    category: "Introductions",
    german: "Ich komme aus...",
    english: "I come from...",
    persian: "من اهل ... هستم.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_011.mp3",
    audioSlow: "/audio/a1/a1_011_slow.mp3",
    example: "Ich komme aus dem Iran.",
    exampleEnglish: "I come from Iran.",
    examplePersian: "من اهل ایران هستم.",
    tags: ["introduction", "origin"],
    lesson: 2
  },
  {
    id: "a1_012",
    level: "A1",
    category: "Introductions",
    german: "Freut mich!",
    english: "Nice to meet you!",
    persian: "از آشناییت خوشحالم!",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_012.mp3",
    audioSlow: "/audio/a1/a1_012_slow.mp3",
    notes: "Short for 'Es freut mich, Sie kennenzulernen'",
    tags: ["introduction", "polite"],
    lesson: 2
  },
  // Lesson 3: Basic Questions
  {
    id: "a1_013",
    level: "A1",
    category: "Questions",
    german: "Wie heißt du?",
    english: "What's your name?",
    persian: "اسمت چیه؟",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_013.mp3",
    audioSlow: "/audio/a1/a1_013_slow.mp3",
    tags: ["question", "introduction", "informal"],
    lesson: 3
  },
  {
    id: "a1_014",
    level: "A1",
    category: "Questions",
    german: "Woher kommst du?",
    english: "Where are you from?",
    persian: "اهل کجایی؟",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_014.mp3",
    audioSlow: "/audio/a1/a1_014_slow.mp3",
    tags: ["question", "introduction"],
    lesson: 3
  },
  {
    id: "a1_015",
    level: "A1",
    category: "Questions",
    german: "Wo wohnst du?",
    english: "Where do you live?",
    persian: "کجا زندگی می‌کنی؟",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_015.mp3",
    audioSlow: "/audio/a1/a1_015_slow.mp3",
    tags: ["question", "introduction"],
    lesson: 3
  },
  {
    id: "a1_016",
    level: "A1",
    category: "Questions",
    german: "Sprichst du Englisch?",
    english: "Do you speak English?",
    persian: "انگلیسی صحبت می‌کنی؟",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_016.mp3",
    audioSlow: "/audio/a1/a1_016_slow.mp3",
    tags: ["question", "language", "essential"],
    lesson: 3
  },
  {
    id: "a1_017",
    level: "A1",
    category: "Questions",
    german: "Sprechen Sie Englisch?",
    english: "Do you speak English? (formal)",
    persian: "انگلیسی صحبت می‌کنید؟ (رسمی)",
    register: "formal",
    difficulty: 1,
    audio: "/audio/a1/a1_017.mp3",
    audioSlow: "/audio/a1/a1_017_slow.mp3",
    tags: ["question", "language", "formal", "essential"],
    lesson: 3
  },
  // Lesson 4: Requests & Politeness
  {
    id: "a1_018",
    level: "A1",
    category: "Requests",
    german: "Bitte.",
    english: "Please. / You're welcome.",
    persian: "لطفاً. / خواهش می‌کنم.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_018.mp3",
    audioSlow: "/audio/a1/a1_018_slow.mp3",
    notes: "Multi-purpose: 'please' when asking, 'you're welcome' when responding to thanks",
    tags: ["polite", "basic", "essential"],
    lesson: 4
  },
  {
    id: "a1_019",
    level: "A1",
    category: "Requests",
    german: "Danke schön!",
    english: "Thank you very much!",
    persian: "خیلی ممنون!",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_019.mp3",
    audioSlow: "/audio/a1/a1_019_slow.mp3",
    tags: ["polite", "basic", "essential"],
    lesson: 4
  },
  {
    id: "a1_020",
    level: "A1",
    category: "Requests",
    german: "Entschuldigung!",
    english: "Excuse me! / Sorry!",
    persian: "ببخشید!",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_020.mp3",
    audioSlow: "/audio/a1/a1_020_slow.mp3",
    example: "Entschuldigung, wo ist der Bahnhof?",
    exampleEnglish: "Excuse me, where is the train station?",
    examplePersian: "ببخشید، ایستگاه قطار کجاست؟",
    tags: ["polite", "essential"],
    lesson: 4
  },
  {
    id: "a1_021",
    level: "A1",
    category: "Requests",
    german: "Können Sie mir helfen?",
    english: "Can you help me? (formal)",
    persian: "می‌تونید کمکم کنید؟ (رسمی)",
    register: "formal",
    difficulty: 2,
    audio: "/audio/a1/a1_021.mp3",
    audioSlow: "/audio/a1/a1_021_slow.mp3",
    tags: ["request", "help", "formal"],
    lesson: 4
  },
  // Lesson 5: Time & Numbers
  {
    id: "a1_022",
    level: "A1",
    category: "Time",
    german: "Wie spät ist es?",
    english: "What time is it?",
    persian: "ساعت چنده؟",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_022.mp3",
    audioSlow: "/audio/a1/a1_022_slow.mp3",
    tags: ["question", "time"],
    lesson: 5
  },
  {
    id: "a1_023",
    level: "A1",
    category: "Time",
    german: "Es ist drei Uhr.",
    english: "It's three o'clock.",
    persian: "ساعت سه است.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_023.mp3",
    audioSlow: "/audio/a1/a1_023_slow.mp3",
    tags: ["time", "statement"],
    lesson: 5
  },
  {
    id: "a1_024",
    level: "A1",
    category: "Time",
    german: "Heute ist Montag.",
    english: "Today is Monday.",
    persian: "امروز دوشنبه است.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_024.mp3",
    audioSlow: "/audio/a1/a1_024_slow.mp3",
    tags: ["time", "days"],
    lesson: 5
  },
  // Lesson 6: Shopping
  {
    id: "a1_025",
    level: "A1",
    category: "Shopping",
    german: "Was kostet das?",
    english: "How much does that cost?",
    persian: "این چقدر هزینه داره؟",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_025.mp3",
    audioSlow: "/audio/a1/a1_025_slow.mp3",
    tags: ["shopping", "question", "essential"],
    lesson: 6
  },
  {
    id: "a1_026",
    level: "A1",
    category: "Shopping",
    german: "Ich möchte das kaufen.",
    english: "I'd like to buy that.",
    persian: "می‌خوام این رو بخرم.",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_026.mp3",
    audioSlow: "/audio/a1/a1_026_slow.mp3",
    tags: ["shopping", "request"],
    lesson: 6
  },
  {
    id: "a1_027",
    level: "A1",
    category: "Shopping",
    german: "Kann ich mit Karte bezahlen?",
    english: "Can I pay by card?",
    persian: "می‌تونم با کارت پرداخت کنم؟",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_027.mp3",
    audioSlow: "/audio/a1/a1_027_slow.mp3",
    tags: ["shopping", "payment", "essential"],
    lesson: 6
  },
  // Lesson 7: Restaurant
  {
    id: "a1_028",
    level: "A1",
    category: "Restaurant",
    german: "Einen Tisch für zwei, bitte.",
    english: "A table for two, please.",
    persian: "یک میز برای دو نفر، لطفاً.",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_028.mp3",
    audioSlow: "/audio/a1/a1_028_slow.mp3",
    tags: ["restaurant", "request"],
    lesson: 7
  },
  {
    id: "a1_029",
    level: "A1",
    category: "Restaurant",
    german: "Die Speisekarte, bitte.",
    english: "The menu, please.",
    persian: "منو، لطفاً.",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_029.mp3",
    audioSlow: "/audio/a1/a1_029_slow.mp3",
    tags: ["restaurant", "request"],
    lesson: 7
  },
  {
    id: "a1_030",
    level: "A1",
    category: "Restaurant",
    german: "Ich hätte gern...",
    english: "I'd like to have...",
    persian: "من ... می‌خواستم.",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_030.mp3",
    audioSlow: "/audio/a1/a1_030_slow.mp3",
    example: "Ich hätte gern ein Wasser, bitte.",
    exampleEnglish: "I'd like a water, please.",
    examplePersian: "یک آب می‌خواستم، لطفاً.",
    notes: "Polite way to order - uses Konjunktiv II",
    tags: ["restaurant", "ordering", "polite"],
    lesson: 7
  },
  // Lesson 8: Directions
  {
    id: "a1_031",
    level: "A1",
    category: "Directions",
    german: "Wo ist der Bahnhof?",
    english: "Where is the train station?",
    persian: "ایستگاه قطار کجاست؟",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_031.mp3",
    audioSlow: "/audio/a1/a1_031_slow.mp3",
    tags: ["directions", "question", "travel", "essential"],
    lesson: 8
  },
  {
    id: "a1_032",
    level: "A1",
    category: "Directions",
    german: "Geradeaus und dann links.",
    english: "Straight ahead and then left.",
    persian: "مستقیم و بعد به چپ.",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_032.mp3",
    audioSlow: "/audio/a1/a1_032_slow.mp3",
    tags: ["directions", "navigation"],
    lesson: 8
  },
  {
    id: "a1_033",
    level: "A1",
    category: "Directions",
    german: "Ich habe mich verlaufen.",
    english: "I'm lost.",
    persian: "من گم شدم.",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_033.mp3",
    audioSlow: "/audio/a1/a1_033_slow.mp3",
    tags: ["directions", "travel", "essential"],
    lesson: 8
  },
  // Bonus phrases
  {
    id: "a1_034",
    level: "A1",
    category: "Small Talk",
    german: "Das Wetter ist heute schön.",
    english: "The weather is nice today.",
    persian: "امروز هوا خوبه.",
    register: "neutral",
    difficulty: 2,
    audio: "/audio/a1/a1_034.mp3",
    audioSlow: "/audio/a1/a1_034_slow.mp3",
    tags: ["small talk", "weather"],
    lesson: 9
  },
  {
    id: "a1_035",
    level: "A1",
    category: "Small Talk",
    german: "Ich verstehe nicht.",
    english: "I don't understand.",
    persian: "متوجه نمی‌شم.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_035.mp3",
    audioSlow: "/audio/a1/a1_035_slow.mp3",
    tags: ["essential", "communication"],
    lesson: 9
  },
  {
    id: "a1_036",
    level: "A1",
    category: "Small Talk",
    german: "Können Sie das wiederholen?",
    english: "Can you repeat that? (formal)",
    persian: "می‌تونید تکرار کنید؟ (رسمی)",
    register: "formal",
    difficulty: 2,
    audio: "/audio/a1/a1_036.mp3",
    audioSlow: "/audio/a1/a1_036_slow.mp3",
    tags: ["essential", "communication", "formal"],
    lesson: 9
  },
  {
    id: "a1_037",
    level: "A1",
    category: "Small Talk",
    german: "Ich lerne Deutsch.",
    english: "I'm learning German.",
    persian: "دارم آلمانی یاد می‌گیرم.",
    register: "neutral",
    difficulty: 1,
    audio: "/audio/a1/a1_037.mp3",
    audioSlow: "/audio/a1/a1_037_slow.mp3",
    tags: ["introduction", "language"],
    lesson: 9
  },
  {
    id: "a1_038",
    level: "A1",
    category: "Small Talk",
    german: "Alles klar!",
    english: "All clear! / Got it!",
    persian: "همه چی واضحه! / فهمیدم!",
    register: "informal",
    difficulty: 1,
    audio: "/audio/a1/a1_038.mp3",
    audioSlow: "/audio/a1/a1_038_slow.mp3",
    notes: "Very common in spoken German - means 'understood' or 'everything's fine'",
    tags: ["expression", "informal", "common"],
    lesson: 9
  }
];

export const categories = [
  "Greetings",
  "Introductions",
  "Small Talk",
  "Questions",
  "Requests",
  "Time",
  "Shopping",
  "Restaurant",
  "Directions"
];

export const levels = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;

export const lessons = [
  { id: 1, name: "Greetings", level: "A1", icon: "👋" },
  { id: 2, name: "Introductions", level: "A1", icon: "🤝" },
  { id: 3, name: "Basic Questions", level: "A1", icon: "❓" },
  { id: 4, name: "Requests & Politeness", level: "A1", icon: "🙏" },
  { id: 5, name: "Time & Numbers", level: "A1", icon: "🕐" },
  { id: 6, name: "Shopping", level: "A1", icon: "🛒" },
  { id: 7, name: "Restaurant", level: "A1", icon: "🍽️" },
  { id: 8, name: "Directions", level: "A1", icon: "🗺️" },
  { id: 9, name: "Small Talk", level: "A1", icon: "💬" },
];

export function getPhrasesByLevel(level: string): Phrase[] {
  return phrases.filter(p => p.level === level);
}

export function getPhrasesByCategory(category: string): Phrase[] {
  return phrases.filter(p => p.category === category);
}

export function getPhrasesByLesson(lessonId: number): Phrase[] {
  return phrases.filter(p => p.lesson === lessonId);
}

export function getPhraseById(id: string): Phrase | undefined {
  return phrases.find(p => p.id === id);
}
