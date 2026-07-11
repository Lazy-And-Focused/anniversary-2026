export type Rank = {
  name: string;
  description: string;
  /** Больше чем невключительно */
  moreThan: number;
  /** Меньше чем включительно */
  lessThan: number;
  /** @default true */
  percens?: boolean;
};

export type Explanation =
  | string
  | {
      lazy: string;
      detailedLink: string;
    };

export type Question = {
  question: string;
  options: string[];
  explanation: Explanation;
  answer: string;
  scores: {
    correct: number;
    wrong: number;
  };
};

export type Questions = Record<string, Question>;

export type Quiz = {
  questions: Questions;
  ranks: Rank[];
  scores: {
    max: number;
    min: number;
  };
};

export const RANKS: Rank[] = [
  {
    name: '🥱 Соня',
    description: 'Вы проспали всю команды и ничего про неё не знаете, может, пора что-то менять?',
    moreThan: -Infinity,
    lessThan: 0,
    percens: false,
  },
  {
    name: '🐢 Ленивец',
    description: 'Вы почти ничего не знаете про команду, попробуйте сфокусироваться',
    moreThan: 0,
    lessThan: 0.1,
  },
  {
    name: '😘 Любитель',
    description: 'Вы неплохо знаете нашу команду, однако можете подтянуть знания',
    moreThan: 0.1,
    lessThan: 0.3,
  },
  {
    name: '🤓 Увлечённый',
    description: 'Вы увлекаетесь нашей командой, это достойно похвалы',
    moreThan: 0.3,
    lessThan: 0.5,
  },
  {
    name: '🎩 Фокусник',
    description: 'Вы знаете нашу команду хорошо, это даже удивительно',
    moreThan: 0.5,
    lessThan: 0.7,
  },
  {
    name: '🔎 Гик',
    description: 'Вы знаете довольно много для обычного пользователя',
    moreThan: 0.7,
    lessThan: 0.8,
  },
  {
    name: '👀 Сталкер',
    description: 'Вы за нами следите?',
    moreThan: 0.8,
    lessThan: 0.9,
  },
  {
    name: '❤️ Лафер',
    description:
      'О, приветствую, участник команды, а если ты не он, то можешь написать нам и мы рассмотрим твоё заявление',
    moreThan: 0.9,
    lessThan: 1,
  },
];

const generateQuestions = (questions: Question[]): Questions => {
  const entries = questions.map((v, i) => [i, v] as const);
  return Object.fromEntries(entries);
};

export const QUESTIONS: Questions = generateQuestions([
  {
    question: 'Как официально расшифровывается LAF?',
    answer: 'Lazy And Focused',
    explanation: {
      lazy: 'Изначально команда была составлена из трёх человек\
, FOCKUSTY, aculaOne, LotTop. Мы решили сложить их первые буквы и составить аббревиатуру\
, которая будет подчёркивать наше умение, однако также учитывать нашу лень\
. К слову, LotTop уже не в команде, а aculaOne сменил псевдоним на lanvalird',
      detailedLink: '/quiz/laf-abbreviation',
    },
    options: [
      'Lazy And Focused',
      'Lazy And Funny',
      'LotTop aculaOne FOCKUSTY',
      'lanvalird Aman FOCKUSTY',
      'Love And Freedom',
      'Loud And Fast',
    ],
    scores: {
      correct: 1,
      wrong: -2,
    },
  },
  {
    question: 'Какой год считается основанием команды?',
    answer: '2024',
    explanation:
      'Команда была собрана по частично случайно. Нам нужна была новая независящая от экосистемы The Void команда, так и потихоньку двигались, это происходило на Discord сервере The Void Community',
    options: ['2021', '2022', '2023', '2024', '2025', '2026'],
    scores: {
      correct: 1,
      wrong: -1,
    },
  },
  {
    question: 'Сколько лет исполнилось LAF в этом году?',
    answer: '2 года',
    explanation: 'Команда была сформирована в 2024 году',
    options: ['2 года', '3 года', '1 год', '0 лет', '4 года', '5 лет'],
    scores: {
      correct: 1,
      wrong: -1,
    },
  },
  {
    question: 'Какой из следующих проектов не принадлежит LAF?',
    answer: 'fbit-field',
    explanation: {
      lazy: 'Этот проект принадлежит CEO LAF и используется в некоторых приложениях от LAF',
      detailedLink: 'https://github.com/FOCKUSTY/bit-field',
    },
    options: ['fbit-field', 'loverry-preview', 'lafka', 'BAD', 'KakDela', 'lasso'],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'Кто был кикнут из команды?',
    answer: 'LotTop',
    explanation:
      'Он ничего не делал в команде, так же почти никак не развивался в сторону программирования',
    options: ['aculaOne', 'lanvalird', 'FOCKUSTY', 'Omonillo', 'beyz1k', 'LotTop'],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'Как раньше назывался репозиторий "site" у LAF?',
    answer: 'laf-info-site',
    explanation: {
      lazy: 'Мы назвали репозиторий laf-info-site, потому что так он отображал, что находилось на сайте, однако потом мы начали двигаться в сторону упрощения',
      detailedLink: 'https://t.me/laf_love/26',
    },
    options: [
      'laf-site',
      'laf-info-site',
      'site-info',
      'resume-site',
      'laf-resume-site',
      'laf--site',
    ],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'Какой у команды девиз?',
    answer: 'From LAF with love',
    explanation:
      'LAF и love созвучны, так стандартная фраза "От меня с любовью" превратилась в наш девиз',
    options: [
      'From LAF with love',
      'Мы — команда молодых, очень ленивых, но увлечённых работой энтузиастов',
      'Быстро, качественно, в срок',
      'Сделаем мир лучше',
      'Лень — двигатель прогресса',
      'Любовь — самая сильный двигатель',
    ],
    scores: {
      correct: 1,
      wrong: -2,
    },
  },
  {
    question: 'На какой платформе размещёны большинство сайтов LAF?',
    answer: 'Vercel',
    explanation: 'Удобно и сердито',
    options: ['Vercel', 'Netlify', 'GitHub Pages', 'Heroku'],
    scores: {
      correct: 1,
      wrong: -1,
    },
  },
  {
    question: 'Что за проект "KakDela"?',
    answer: 'Мессенджер',
    explanation: {
      lazy: 'Мы хотели создать мессенджер с аутентификацией через Discord, а название вдохновилось от HeadHunter',
      detailedLink: 'https://github.com/Lazy-And-Focused/KakDela',
    },
    options: ['Мессенджер', 'Аналог реддит', 'Форум', 'Анонимный чат'],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'Какой язык программирования предпочитает LAF?',
    answer: 'TypeScript + Node.js',
    explanation: {
      lazy: 'TypeScript является одним из самых простых языков, имеющий строгую типизацию и возможность использовать ООП',
      detailedLink: 'https://types.laf-team.ru',
    },
    options: [
      'TypeScript + Node.js',
      'JavaScript + Node.js',
      'JavaScript',
      'PHP',
      'C# (.NET)',
      'C#',
      'Python',
      'HTML/CSS',
    ],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'Какой псевдоним у основателя команды LAF?',
    answer: 'FOCKUSTY',
    explanation:
      'FOCKUSTY — CEO и основатель команды, Discord сервер принадлежит ему, там и была основана команда',
    options: ['FOCKUSTY', 'lanvalird', 'aculaOne', 'Omonillo', 'LotTop'],
    scores: {
      correct: 1,
      wrong: -2,
    },
  },
  {
    question: 'Какой соцсети нет у LAF?',
    answer: 'Twitter (X)',
    explanation: {
      lazy: 'Все наши соцсети доступны в открытом доступе на сайте',
      detailedLink: 'https://www.laf-team.ru/links',
    },
    options: ['BlueSky', 'Telegram', 'GitHub', 'Boosty', 'Patreon', 'Twitter (X)'],
    scores: {
      correct: 1,
      wrong: -1,
    },
  },
  {
    question: 'На какой архитектуре основывается Lafka?',
    answer: 'FAiL',
    explanation: {
      lazy: 'FAiL — Frontend Architecture in LAF',
      detailedLink: 'https://docs.laf-team.ru/architectures/fail',
    },
    options: ['FAiL', 'FSD', 'BAD', 'DDD', 'SPA'],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'На чём основывается Frontend Architecture in LAF?',
    answer: 'Feature-Sliced Design',
    explanation: {
      lazy: 'FAiL был доработан под реалии Next.js, FSD даёт хороший и удобный фундамент',
      detailedLink: 'https://docs.laf-team.ru/architectures/fail',
    },
    options: [
      'Feature-Sliced Design',
      'Single Page Application',
      'Микрофронтенды',
      'Реактивный подход',
      'Model‑View‑Controller',
    ],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'Откуда появилась архитектура Backend After Drinking?',
    answer:
      'Нужно было упростить разработку приложения, чтобы писать меньше шаблонного кода, архитектура предоставляет всё из коробки, после неё остаётся написать только логику',
    explanation: {
      lazy: 'BAD предоставляет готовые решения с помощью своей библиотеки',
      detailedLink: 'https://github.com/Lazy-And-Focused/BAD-Architecture/blob/main/docs/index.md',
    },
    options: [
      'По приколу',
      'Было сложно разрабатывать приложение на Nest.js без единой архитектуры',
      'Нужно было упростить разработку приложения, чтобы писать меньше шаблонного кода, архитектура предоставляет всё из коробки, после неё остаётся написать только логику',
    ],
    scores: {
      correct: 2,
      wrong: -1,
    },
  },
  {
    question: 'Что используется BAD в качестве основы?',
    answer: 'Базовую модульную архитектуру Nest.js',
    explanation: {
      lazy: 'BAD был разработан под Nest.js и его реалии',
      detailedLink:
        'https://github.com/Lazy-And-Focused/BAD-Architecture/blob/main/docs/intoduction.md',
    },
    options: [
      'Базовую модульную архитектуру Nest.js',
      'Монолитную архитектуру',
      'Микросервисную архитектуру',
      'Слоистую архитектуру',
      'Backend for Frontend',
    ],
    scores: {
      correct: 1,
      wrong: -1,
    },
  },
]);

const summarizeScores = (scores: 'correct' | 'wrong') => {
  return Object.keys(QUESTIONS)
    .map((key) => QUESTIONS[key].scores[scores])
    .reduce((p, c) => p + c);
};

export const QUIZ: Quiz = {
  questions: QUESTIONS,
  ranks: RANKS,
  scores: {
    max: summarizeScores('correct'),
    min: summarizeScores('wrong'),
  },
};
