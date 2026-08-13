export const TOPIC_CATEGORIES = [
  "everyday",
  "personal",
  "opinions",
  "society",
  "technology",
  "work",
  "communication",
  "relationships",
  "travel",
  "creativity",
  "hypothetical",
  "situational",
  "fun",
] as const;

export type TopicCategory = (typeof TOPIC_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  everyday: "Everyday Life",
  personal: "Personal",
  opinions: "Opinions",
  society: "Society",
  technology: "Technology",
  work: "Work & Career",
  communication: "Communication",
  relationships: "Relationships",
  travel: "Travel & Culture",
  creativity: "Creativity",
  hypothetical: "Hypothetical",
  situational: "Situational",
  fun: "Fun & Random",
};

export const TOPIC_DIFFICULTIES = ["easy", "medium", "challenge"] as const;

export type TopicDifficulty = (typeof TOPIC_DIFFICULTIES)[number];

export const DIFFICULTY_LABELS: Record<TopicDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  challenge: "Challenge",
};

export interface Topic {
  id: string;
  prompt: string;
  category: TopicCategory;
  difficulty: TopicDifficulty;
}

export const TOPICS: Topic[] = [
  // Everyday Life
  {
    id: "everyday-morning-routine",
    prompt: "Describe your typical morning from waking up to leaving the house.",
    category: "everyday",
    difficulty: "easy",
  },
  {
    id: "everyday-favorite-meal",
    prompt: "Describe a typical meal you cook and walk through how you make it.",
    category: "everyday",
    difficulty: "easy",
  },
  {
    id: "everyday-small-habit",
    prompt: "What small habit has improved your day-to-day life, and how did you start it?",
    category: "everyday",
    difficulty: "easy",
  },
  {
    id: "everyday-ideal-weekend",
    prompt: "Describe your ideal weekend from start to finish.",
    category: "everyday",
    difficulty: "easy",
  },
  {
    id: "everyday-good-day",
    prompt: "What does a good day look like for you, and what makes it good?",
    category: "everyday",
    difficulty: "easy",
  },
  {
    id: "everyday-unusual-object",
    prompt: "What is the most unusual thing in your home, and what is its story?",
    category: "everyday",
    difficulty: "medium",
  },
  {
    id: "everyday-routine-change",
    prompt: "How has your daily routine changed compared to five years ago?",
    category: "everyday",
    difficulty: "medium",
  },
  {
    id: "everyday-regular-place",
    prompt: "Describe a place you visit almost every week and what it is like.",
    category: "everyday",
    difficulty: "medium",
  },
  {
    id: "everyday-schedule-change",
    prompt: "If you could change one thing about your everyday schedule, what would it be and why?",
    category: "everyday",
    difficulty: "medium",
  },
  {
    id: "everyday-time-trade",
    prompt: "If you had an extra hour every day, how would you spend it, and why?",
    category: "everyday",
    difficulty: "easy",
  },

  // Personal
  {
    id: "personal-hard-lesson",
    prompt: "What is a lesson you learned the hard way?",
    category: "personal",
    difficulty: "medium",
  },
  {
    id: "personal-proud-moment",
    prompt: "Describe a moment you felt proud of yourself.",
    category: "personal",
    difficulty: "medium",
  },
  {
    id: "personal-changed-belief",
    prompt: "What is something you used to believe that you no longer believe?",
    category: "personal",
    difficulty: "challenge",
  },
  {
    id: "personal-admired-quality",
    prompt: "What personal quality do you admire most in yourself, and when does it show?",
    category: "personal",
    difficulty: "challenge",
  },
  {
    id: "personal-changed-mind",
    prompt: "Describe a time you changed your mind about something important.",
    category: "personal",
    difficulty: "challenge",
  },
  {
    id: "personal-biggest-strength",
    prompt: "What is your biggest strength, and what situation brings it out?",
    category: "personal",
    difficulty: "medium",
  },
  {
    id: "personal-self-improvement",
    prompt: "What is something you are actively working to improve about yourself?",
    category: "personal",
    difficulty: "medium",
  },
  {
    id: "personal-useful-mistake",
    prompt: "Describe a mistake that turned out to be useful in the end.",
    category: "personal",
    difficulty: "medium",
  },
  {
    id: "personal-comforting-memory",
    prompt: "What memory do you return to when you need comfort?",
    category: "personal",
    difficulty: "easy",
  },
  {
    id: "personal-advice-to-younger-self",
    prompt: "If you could give your younger self one piece of advice, what would it be?",
    category: "personal",
    difficulty: "medium",
  },

  // Opinions
  {
    id: "opinions-planning-vs-spontaneity",
    prompt: "Is it better to plan your life carefully or leave room for spontaneity?",
    category: "opinions",
    difficulty: "medium",
  },
  {
    id: "opinions-cities-cars-people",
    prompt: "Should cities prioritize cars or people?",
    category: "opinions",
    difficulty: "challenge",
  },
  {
    id: "opinions-social-media-connection",
    prompt: "Is social media more helpful or harmful for genuine connection?",
    category: "opinions",
    difficulty: "challenge",
  },
  {
    id: "opinions-technology-dependence",
    prompt: "Are we too dependent on technology in our daily lives?",
    category: "opinions",
    difficulty: "medium",
  },
  {
    id: "opinions-school-focus",
    prompt: "Should schools focus more on practical skills or traditional subjects?",
    category: "opinions",
    difficulty: "challenge",
  },
  {
    id: "opinions-remote-vs-office",
    prompt: "Is remote work better than working in an office?",
    category: "opinions",
    difficulty: "medium",
  },
  {
    id: "opinions-money-happiness",
    prompt: "Does money buy happiness? Explain your view.",
    category: "opinions",
    difficulty: "medium",
  },
  {
    id: "opinions-compulsory-voting",
    prompt: "Should voting be compulsory in democratic countries?",
    category: "opinions",
    difficulty: "challenge",
  },
  {
    id: "opinions-fast-food-responsibility",
    prompt: "Should fast food companies be responsible for public health?",
    category: "opinions",
    difficulty: "challenge",
  },
  {
    id: "opinions-expert-vs-generalist",
    prompt: "Is it better to be an expert in one thing or know a little about everything?",
    category: "opinions",
    difficulty: "medium",
  },

  // Society
  {
    id: "society-welcoming-communities",
    prompt: "How can communities become more welcoming to newcomers?",
    category: "society",
    difficulty: "challenge",
  },
  {
    id: "society-generation-challenge",
    prompt: "What is the biggest challenge facing your generation?",
    category: "society",
    difficulty: "challenge",
  },
  {
    id: "society-automation-support",
    prompt: "How should society support people whose jobs disappear because of automation?",
    category: "society",
    difficulty: "challenge",
  },
  {
    id: "society-environment-responsibility",
    prompt: "What responsibility do individuals have toward the environment?",
    category: "society",
    difficulty: "medium",
  },
  {
    id: "society-services-efficiency",
    prompt: "Should public services prioritize efficiency or accessibility?",
    category: "society",
    difficulty: "challenge",
  },
  {
    id: "society-definition-of-home",
    prompt: "How has the meaning of home changed in recent decades?",
    category: "society",
    difficulty: "challenge",
  },
  {
    id: "society-social-media-elections",
    prompt: "What role should social media companies play during elections?",
    category: "society",
    difficulty: "challenge",
  },
  {
    id: "society-encourage-volunteering",
    prompt: "How can we encourage more people to volunteer in their communities?",
    category: "society",
    difficulty: "medium",
  },
  {
    id: "society-four-day-week",
    prompt: "Is a four-day work week a realistic future for most countries?",
    category: "society",
    difficulty: "medium",
  },
  {
    id: "society-cities-climate",
    prompt: "How should cities prepare for the effects of climate change?",
    category: "society",
    difficulty: "challenge",
  },

  // Technology
  {
    id: "technology-memory",
    prompt: "How has technology changed the way we remember things?",
    category: "technology",
    difficulty: "medium",
  },
  {
    id: "technology-month-without-phone",
    prompt: "Could you live a month without a smartphone? How would you manage?",
    category: "technology",
    difficulty: "medium",
  },
  {
    id: "technology-overreliance",
    prompt: "What technology do you think we rely on too heavily?",
    category: "technology",
    difficulty: "medium",
  },
  {
    id: "technology-ai-in-education",
    prompt: "How should artificial intelligence be used in education?",
    category: "technology",
    difficulty: "challenge",
  },
  {
    id: "technology-life-in-20-years",
    prompt: "What will everyday life look like in twenty years because of technology?",
    category: "technology",
    difficulty: "challenge",
  },
  {
    id: "technology-privacy-realism",
    prompt: "Is privacy realistic in the digital age?",
    category: "technology",
    difficulty: "challenge",
  },
  {
    id: "technology-better-life",
    prompt: "What is one technology that has genuinely made your life better?",
    category: "technology",
    difficulty: "easy",
  },
  {
    id: "technology-adoption",
    prompt: "How do you decide which new technologies to adopt?",
    category: "technology",
    difficulty: "medium",
  },
  {
    id: "technology-instant-everything",
    prompt: "What are the downsides of everything being available instantly?",
    category: "technology",
    difficulty: "medium",
  },
  {
    id: "technology-children-screens",
    prompt: "Should children have limits on screen time? Why or why not?",
    category: "technology",
    difficulty: "medium",
  },

  // Work & Career
  {
    id: "work-meaningful-job",
    prompt: "What makes a job meaningful to you?",
    category: "work",
    difficulty: "medium",
  },
  {
    id: "work-ideal-workplace",
    prompt: "Describe a workplace that would bring out the best in people.",
    category: "work",
    difficulty: "medium",
  },
  {
    id: "work-stable-vs-passion",
    prompt: "Is it better to have a stable job or follow your passion?",
    category: "work",
    difficulty: "medium",
  },
  {
    id: "work-difficult-feedback",
    prompt: "How do you handle difficult feedback at work?",
    category: "work",
    difficulty: "challenge",
  },
  {
    id: "work-future-skills",
    prompt: "What skills will matter most in the future workplace?",
    category: "work",
    difficulty: "challenge",
  },
  {
    id: "work-employee-wellbeing",
    prompt: "Should companies care about their employees' wellbeing, or is profit enough?",
    category: "work",
    difficulty: "medium",
  },
  {
    id: "work-best-boss",
    prompt: "Describe the best boss you could imagine.",
    category: "work",
    difficulty: "easy",
  },
  {
    id: "work-salary-vs-satisfaction",
    prompt: "How important is salary compared to job satisfaction?",
    category: "work",
    difficulty: "medium",
  },
  {
    id: "work-restart-career",
    prompt: "What would you do differently if you could start your career again?",
    category: "work",
    difficulty: "challenge",
  },
  {
    id: "work-motivation-unenjoyable",
    prompt: "How do you stay motivated on a task you do not enjoy?",
    category: "work",
    difficulty: "medium",
  },

  // Communication
  {
    id: "communication-good-listener",
    prompt: "What makes someone a good listener?",
    category: "communication",
    difficulty: "medium",
  },
  {
    id: "communication-disagreement",
    prompt: "How do you handle disagreements without damaging the relationship?",
    category: "communication",
    difficulty: "challenge",
  },
  {
    id: "communication-clarity-solved",
    prompt: "Describe a time when clear communication solved a problem.",
    category: "communication",
    difficulty: "medium",
  },
  {
    id: "communication-truth-vs-peace",
    prompt: "Is it better to say what you think or keep the peace?",
    category: "communication",
    difficulty: "medium",
  },
  {
    id: "communication-explain-simply",
    prompt: "How do you explain a complex idea in simple terms?",
    category: "communication",
    difficulty: "medium",
  },
  {
    id: "communication-body-language",
    prompt: "What role does body language play in how we communicate?",
    category: "communication",
    difficulty: "medium",
  },
  {
    id: "communication-digital-honesty",
    prompt: "How has digital communication changed how honest we are with each other?",
    category: "communication",
    difficulty: "challenge",
  },
  {
    id: "communication-silence",
    prompt: "When is silence more powerful than words?",
    category: "communication",
    difficulty: "challenge",
  },
  {
    id: "communication-feedback",
    prompt: "How do you give feedback that people actually hear?",
    category: "communication",
    difficulty: "challenge",
  },
  {
    id: "communication-memorable-speech",
    prompt: "What makes a speech or presentation memorable?",
    category: "communication",
    difficulty: "medium",
  },

  // Relationships
  {
    id: "relationships-lasting-friendship",
    prompt: "What makes a friendship last for decades?",
    category: "relationships",
    difficulty: "medium",
  },
  {
    id: "relationships-long-distance",
    prompt: "How do you maintain relationships when you live far apart?",
    category: "relationships",
    difficulty: "medium",
  },
  {
    id: "relationships-trust",
    prompt: "What does trust look like in a relationship?",
    category: "relationships",
    difficulty: "challenge",
  },
  {
    id: "relationships-support",
    prompt: "Describe a time someone supported you when you really needed it.",
    category: "relationships",
    difficulty: "medium",
  },
  {
    id: "relationships-disagree-often",
    prompt: "Is it healthy to disagree often in a close relationship?",
    category: "relationships",
    difficulty: "challenge",
  },
  {
    id: "relationships-balance",
    prompt: "How do you balance time with others and time alone?",
    category: "relationships",
    difficulty: "medium",
  },
  {
    id: "relationships-partner-quality",
    prompt: "What is the most important quality in a long-term partner?",
    category: "relationships",
    difficulty: "medium",
  },
  {
    id: "relationships-change-with-age",
    prompt: "How do relationships change as people grow older?",
    category: "relationships",
    difficulty: "challenge",
  },
  {
    id: "relationships-friend-let-down",
    prompt: "What would you do if a friend let you down?",
    category: "relationships",
    difficulty: "medium",
  },
  {
    id: "relationships-idea-of-friend",
    prompt: "How has your idea of a good friend changed over time?",
    category: "relationships",
    difficulty: "challenge",
  },

  // Travel & Culture
  {
    id: "travel-place-to-visit",
    prompt: "Describe a place you would love to visit and why.",
    category: "travel",
    difficulty: "easy",
  },
  {
    id: "travel-teaches-about-self",
    prompt: "What does traveling teach you about yourself?",
    category: "travel",
    difficulty: "medium",
  },
  {
    id: "travel-alone-vs-together",
    prompt: "Is it better to travel alone or with others?",
    category: "travel",
    difficulty: "medium",
  },
  {
    id: "travel-culture-tradition",
    prompt: "Describe a tradition from your culture that matters to you.",
    category: "travel",
    difficulty: "medium",
  },
  {
    id: "travel-culture-perspective",
    prompt: "How does experiencing another culture change your perspective?",
    category: "travel",
    difficulty: "challenge",
  },
  {
    id: "travel-year-abroad",
    prompt: "What would you pack and plan for a year abroad?",
    category: "travel",
    difficulty: "medium",
  },
  {
    id: "travel-staying-put",
    prompt: "Is staying in one place underrated compared to traveling?",
    category: "travel",
    difficulty: "challenge",
  },
  {
    id: "travel-cultural-meal",
    prompt: "Describe a meal that represents your culture and its story.",
    category: "travel",
    difficulty: "easy",
  },
  {
    id: "travel-language-preparation",
    prompt: "How do you prepare for a trip to a country with a different language?",
    category: "travel",
    difficulty: "medium",
  },
  {
    id: "travel-experience-once",
    prompt: "What is something everyone should experience at least once in their life?",
    category: "travel",
    difficulty: "medium",
  },

  // Creativity
  {
    id: "creativity-best-ideas",
    prompt: "Where do your best ideas come from?",
    category: "creativity",
    difficulty: "medium",
  },
  {
    id: "creativity-ideal-project",
    prompt: "Describe a creative project you would start if nothing could go wrong.",
    category: "creativity",
    difficulty: "medium",
  },
  {
    id: "creativity-learned-vs-born",
    prompt: "Can creativity be learned, or is it a talent you are born with?",
    category: "creativity",
    difficulty: "challenge",
  },
  {
    id: "creativity-getting-unstuck",
    prompt: "What helps you get unstuck when you have no ideas?",
    category: "creativity",
    difficulty: "medium",
  },
  {
    id: "creativity-constraints",
    prompt: "How do constraints help or hinder creativity?",
    category: "creativity",
    difficulty: "challenge",
  },
  {
    id: "creativity-moving-art",
    prompt: "Describe a piece of art, music, or writing that moved you.",
    category: "creativity",
    difficulty: "easy",
  },
  {
    id: "creativity-boredom",
    prompt: "What role does boredom play in creativity?",
    category: "creativity",
    difficulty: "challenge",
  },
  {
    id: "creativity-create-anything",
    prompt: "If you could create anything regardless of skill, what would it be?",
    category: "creativity",
    difficulty: "easy",
  },
  {
    id: "creativity-capturing-ideas",
    prompt: "How do you capture ideas before you lose them?",
    category: "creativity",
    difficulty: "medium",
  },
  {
    id: "creativity-art-as-adults",
    prompt: "Why do some people stop making art as they grow older?",
    category: "creativity",
    difficulty: "challenge",
  },

  // Hypothetical
  {
    id: "hypothetical-superpower",
    prompt: "If you could have any superpower, which would you choose and why?",
    category: "hypothetical",
    difficulty: "easy",
  },
  {
    id: "hypothetical-time-travel",
    prompt: "If you could travel back in time, where would you go and what would you do?",
    category: "hypothetical",
    difficulty: "medium",
  },
  {
    id: "hypothetical-one-question",
    prompt: "If you could ask one question to anyone in history, who and what would you ask?",
    category: "hypothetical",
    difficulty: "medium",
  },
  {
    id: "hypothetical-year-off",
    prompt: "What would you do with a year off and unlimited money?",
    category: "hypothetical",
    difficulty: "medium",
  },
  {
    id: "hypothetical-master-skill",
    prompt: "If you could instantly master one skill, what would it be and why?",
    category: "hypothetical",
    difficulty: "easy",
  },
  {
    id: "hypothetical-city-design",
    prompt: "If you could design a city from scratch, what would it be like?",
    category: "hypothetical",
    difficulty: "challenge",
  },
  {
    id: "hypothetical-fictional-world",
    prompt: "If you could live in any fictional world, where would you go?",
    category: "hypothetical",
    difficulty: "easy",
  },
  {
    id: "hypothetical-one-wish",
    prompt: "What would you change about the world if you had one wish?",
    category: "hypothetical",
    difficulty: "medium",
  },
  {
    id: "hypothetical-all-languages",
    prompt: "If you could speak every language, how would your life change?",
    category: "hypothetical",
    difficulty: "medium",
  },
  {
    id: "hypothetical-future-self",
    prompt: "If you met your future self, what would you ask them?",
    category: "hypothetical",
    difficulty: "medium",
  },

  // Situational
  {
    id: "situational-call-to-action",
    prompt: "You have two minutes to convince a group of strangers to support a cause you believe in. What do you say?",
    category: "situational",
    difficulty: "challenge",
  },
  {
    id: "situational-acceptance-speech",
    prompt: "You win a surprise award at a ceremony. Deliver your acceptance speech.",
    category: "situational",
    difficulty: "medium",
  },
  {
    id: "situational-explain-to-child",
    prompt: "Explain a topic you know well to a ten-year-old.",
    category: "situational",
    difficulty: "medium",
  },
  {
    id: "situational-lost-without-phone",
    prompt: "You are lost in a new city without your phone. What do you do?",
    category: "situational",
    difficulty: "easy",
  },
  {
    id: "situational-hobby-pitch",
    prompt: "Convince your audience that a hobby you love is worth trying.",
    category: "situational",
    difficulty: "medium",
  },
  {
    id: "situational-wedding-toast",
    prompt: "You must give a toast at a wedding. What do you say?",
    category: "situational",
    difficulty: "medium",
  },
  {
    id: "situational-dream-day-plan",
    prompt: "Describe your dream day to someone who will plan it for you.",
    category: "situational",
    difficulty: "easy",
  },
  {
    id: "situational-found-wallet",
    prompt: "You find a wallet with money and an ID. What happens next?",
    category: "situational",
    difficulty: "easy",
  },
  {
    id: "situational-business-pitch",
    prompt: "Pitch a small business idea to a friend in two minutes.",
    category: "situational",
    difficulty: "challenge",
  },
  {
    id: "situational-introduce-yourself",
    prompt: "You are asked to introduce yourself to a room of strangers. How do you do it?",
    category: "situational",
    difficulty: "medium",
  },

  // Fun & Random
  {
    id: "fun-best-smell",
    prompt: "What is the best smell in the world, and what does it remind you of?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "fun-life-soundtrack",
    prompt: "If your life had a soundtrack, what songs would be on it?",
    category: "fun",
    difficulty: "medium",
  },
  {
    id: "fun-useless-skill",
    prompt: "What is a useless skill you are secretly proud of?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "fun-funniest-moment",
    prompt: "Describe the funniest thing that has ever happened to you.",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "fun-animal-sidekick",
    prompt: "If you could have any animal as a sidekick, what would it be?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "fun-favorite-season",
    prompt: "What are the best and worst parts of your favorite season?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "fun-dream-home",
    prompt: "What would your dream home look like, inside and out?",
    category: "fun",
    difficulty: "medium",
  },
  {
    id: "fun-one-meal",
    prompt: "If you had to eat one meal for the rest of your life, what would it be?",
    category: "fun",
    difficulty: "easy",
  },
  {
    id: "fun-invented-rule",
    prompt: "What is a rule you would invent for everyone to follow?",
    category: "fun",
    difficulty: "medium",
  },
  {
    id: "fun-strangest-dream",
    prompt: "What is the strangest dream you can remember?",
    category: "fun",
    difficulty: "medium",
  },
];
