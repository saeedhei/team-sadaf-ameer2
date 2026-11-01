

import { Course, Module, UserProgress } from "@/types/course";

/**
 * Display title for the overall training platform/course
 */
export const courseTitle = "Digital Literacy Fundamentals";

/**
 * Mock Digital Literacy Training Platform Course Data
 * Module 1: Fake News & Disinformation (Unlocked)
 * Module 2: Digital Safety & Privacy (Locked)
 * Module 3: Digital Communications & Etiquette (Locked)
 */
export const courseModulesData: Module[] = [
  {
    id: "mod-1",
    title: "Module 1: Identifying Fake News & Disinformation",
    description: "Learn how to spot deepfakes, verify online media, identify misleading headlines, and navigate the modern digital news landscape safely.",
    order: 1,
    status: "unlocked",
    badge: {
      id: "badge-fact-checker",
      title: "Master Fact-Checker",
      description: "Earned by completing Module 1: Identifying Fake News & Disinformation.",
      iconUrl: "/badges/fact-checker.svg",
    },
    sections: [
      {
        id: "mod1-sec-1",
        moduleId: "mod-1",
        title: "Section 1: Foundations of Online Information",
        description: "Understanding the crucial difference between Misinformation, Disinformation, and Malinformation.",
        order: 1,
        status: "unlocked",
        items: [
          {
            id: "item-101",
            title: "Lesson: Spotting Fake News & Clickbait Headlines",
            type: "video",
            order: 1,
            status: "unlocked",
            video: {
              id: "vid-101",
              title: "Spotting Fake News & Clickbait Headlines",
              description: "Learn the core principles of evaluating online sources and identifying emotionally loaded headlines.",
              videoUrl: "https://www.youtube.com/watch?v=cSKGa_7XJkg",
              thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
              durationInSeconds: 420,
              formattedDuration: "07:00",
              transcript: "Welcome to Section 1. In this lesson, we break down how fake news circulates..."
            }
          },
          {
            id: "item-102",
            title: "Quiz: Misinformation vs Disinformation",
            type: "quiz",
            order: 2,
            status: "unlocked",
            quiz: {
              id: "quiz-101",
              title: "Information Assessment Quiz",
              description: "Test your understanding of digital media verification and online misinformation.",
              passingScorePercentage: 75,
              questions: [
                {
                  id: "q-101-1",
                  question: "What is the primary difference between 'Misinformation' and 'Disinformation'?",
                  points: 25,
                  correctOptionId: "opt-2",
                  explanation: "Disinformation is created and spread with the deliberate intention to deceive, whereas misinformation is false info spread without harmful intent.",
                  options: [
                    { id: "opt-1", text: "Misinformation is spread on social media, while disinformation is in newspapers." },
                    { id: "opt-2", text: "Disinformation is intentionally created to deceive, while misinformation is spread without malicious intent." },
                    { id: "opt-3", text: "Misinformation is always written by bots, whereas disinformation is human-written." },
                    { id: "opt-4", text: "There is no difference; both terms mean the exact same thing." }
                  ]
                },
                {
                  id: "q-101-2",
                  question: "Which of the following is a classic red flag of a 'Clickbait' headline?",
                  points: 25,
                  correctOptionId: "opt-3",
                  explanation: "Clickbait often uses sensationalist language and curiosity gaps to trigger emotional clicks.",
                  options: [
                    { id: "opt-1", text: "Citing peer-reviewed studies and primary author sources." },
                    { id: "opt-2", text: "Including clear dates, author credentials, and publishing history." },
                    { id: "opt-3", text: "Using sensationalist language like 'You Won't Believe What Happened Next!'" },
                    { id: "opt-4", text: "Providing a direct, factual, and neutral summary of the news story." }
                  ]
                },
                {
                  id: "q-101-3",
                  question: "What does 'Lateral Reading' refer to when verifying news online?",
                  points: 25,
                  correctOptionId: "opt-1",
                  explanation: "Lateral reading involves opening new browser tabs to search what other reliable sources say about the domain/author.",
                  options: [
                    { id: "opt-1", text: "Opening multiple browser tabs to check what other credible websites say about the source." },
                    { id: "opt-2", text: "Reading an article from left to right twice to catch grammatical errors." },
                    { id: "opt-3", text: "Scanning only the bottom footer of a website for copyright disclaimers." },
                    { id: "opt-4", text: "Checking the page layout and font choices to assess credibility." }
                  ]
                },
                {
                  id: "q-101-4",
                  question: "When encountering an unverified image on social media, which tool helps trace its original context?",
                  points: 25,
                  correctOptionId: "opt-4",
                  explanation: "Reverse Image Search (like Google Images or TinEye) allows you to trace when and where an image was first uploaded.",
                  options: [
                    { id: "opt-1", text: "Text Summarizer" },
                    { id: "opt-2", text: "VPN Service" },
                    { id: "opt-3", text: "Ad Blocker" },
                    { id: "opt-4", text: "Reverse Image Search" }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: "mod1-sec-2",
        moduleId: "mod-1",
        title: "Section 2: Deepfakes and Synthetic Media",
        description: "Understanding manipulated videos, audio cloning, and techniques for spot-checking media authenticity.",
        order: 2,
        status: "unlocked",
        items: [
          {
            id: "item-103",
            title: "Lesson: Detecting AI-Generated Images & Deepfakes",
            type: "video",
            order: 1,
            status: "unlocked",
            video: {
              id: "vid-102",
           title: "Detecting AI-Generated Images & Deepfakes",
description: "Visual indicators and audio cues that expose synthetic media and video deepfakes.",
videoUrl: "https://www.youtube.com/watch?v=7akzhpx0EIU",
thumbnailUrl: "https://img.youtube.com/vi/7akzhpx0EIU/hqdefault.jpg",
              durationInSeconds: 600,
              formattedDuration: "10:00",
              transcript: "Deepfakes are becoming more realistic every day. Look for unnatural blinking patterns and reflections..."
            }
          },
          {
            id: "item-104",
            title: "Quiz: Deepfake Detection & Verification",
            type: "quiz",
            order: 2,
            status: "unlocked",
            quiz: {
              id: "quiz-102",
              title: "Synthetic Media Quiz",
              description: "Evaluate your ability to detect synthetic audio/video manipulations.",
              passingScorePercentage: 75,
              questions: [
                {
                  id: "q-102-1",
                  question: "Which visual glitch is commonly found in current AI-generated face videos?",
                  points: 25,
                  correctOptionId: "opt-2",
                  explanation: "AI video generators often struggle with realistic eye blinking, natural teeth rendering, and smooth lip synchronization.",
                  options: [
                    { id: "opt-1", text: "Black and white monochrome flickering" },
                    { id: "opt-2", text: "Unnatural blinking patterns and lighting inconsistencies around hair edges" },
                    { id: "opt-3", text: "Automatic subtitles appearing on screen" },
                    { id: "opt-4", text: "Perfect high-definition 4K resolution" }
                  ]
                },
                {
                  id: "q-102-2",
                  question: "What is an audio deepfake?",
                  points: 25,
                  correctOptionId: "opt-1",
                  explanation: "Audio deepfakes use machine learning to clone a specific person's voice using recorded sample clips.",
                  options: [
                    { id: "opt-1", text: "Synthetic voice cloning generated from existing recordings of a target person." },
                    { id: "opt-2", text: "Low quality background noise recorded on a mobile device." },
                    { id: "opt-3", text: "A computer virus that mutes your speaker audio." },
                    { id: "opt-4", text: "A ringtone created with digital synthesizer software." }
                  ]
                },
                {
                  id: "q-102-3",
                  question: "Why should you be cautious before sharing breaking news videos online?",
                  points: 25,
                  correctOptionId: "opt-3",
                  explanation: "Old footage from previous events or video games is frequently re-uploaded as brand new crisis footage.",
                  options: [
                    { id: "opt-1", text: "Sharing videos uses up too much mobile data." },
                    { id: "opt-2", text: "Video clips are automatically deleted if shared too many times." },
                    { id: "opt-3", text: "Out-of-context or outdated footage is often repurposed to mislead during active crises." },
                    { id: "opt-4", text: "Social media networks charge fees for sharing media content." }
                  ]
                },
                {
                  id: "q-102-4",
                  question: "What is the best immediate step if an emergency viral voice memo claims a local threat?",
                  points: 25,
                  correctOptionId: "opt-2",
                  explanation: "Always cross-check unverified voice memos or viral messaging forwards against official municipal or emergency services communications.",
                  options: [
                    { id: "opt-1", text: "Forward it instantly to all your family group chats." },
                    { id: "opt-2", text: "Verify the news via trusted local authorities or established journalism outlets before acting." },
                    { id: "opt-3", text: "Post a warning video on your personal profile right away." },
                    { id: "opt-4", text: "Ignore local news entirely and rely only on social comments." }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "mod-2",
    title: "Module 2: Digital Safety, Privacy & Cybersecurity Basics",
    description: "Master password hygiene, two-factor authentication, phishing defense, and securing your personal accounts on public networks.",
    order: 2,
    status: "locked",
    badge: {
      id: "badge-cyber-defender",
      title: "Cyber Shield Guardian",
      description: "Earned by completing Module 2: Digital Safety & Privacy.",
      iconUrl: "/badges/cyber-defender.svg",
    },
    sections: [
      {
        id: "mod2-sec-1",
        moduleId: "mod-2",
        title: "Section 1: Passwords & Authentication Security",
        description: "Building unhackable credentials and enforcing Multi-Factor Authentication (MFA).",
        order: 1,
        status: "locked",
        items: [
          {
            id: "item-201",
            title: "Lesson: Password Managers & Two-Factor Authentication",
            type: "video",
            order: 1,
            status: "locked",
            video: {
              id: "vid-201",
              title: "Password Managers & Two-Factor Authentication",
              description: "Learn how password managers work and why SMS 2FA is weaker than Authenticator Apps.",
           videoUrl: "https://www.youtube.com/watch?v=hhUb5iknVJs",
              thumbnailUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
              durationInSeconds: 510,
              formattedDuration: "08:30"
            }
          },
          {
            id: "item-202",
            title: "Quiz: Authentication Best Practices",
            type: "quiz",
            order: 2,
            status: "locked",
            quiz: {
              id: "quiz-201",
              title: "Security & Authentication Quiz",
              description: "Assess your password and account protection knowledge.",
              passingScorePercentage: 75,
              questions: [
                {
                  id: "q-201-1",
                  question: "Which of these passwords is considered the most secure against brute-force attacks?",
                  points: 25,
                  correctOptionId: "opt-3",
                  explanation: "Long passphrases containing multiple random words, symbols, and numbers offer high entropy.",
                  options: [
                    { id: "opt-1", text: "P@ssword2024!" },
                    { id: "opt-2", text: "Admin1234" },
                    { id: "opt-3", text: "purple-elephant-dancing-99#coffee" },
                    { id: "opt-4", text: "Your birthdate followed by your pet name" }
                  ]
                },
                {
                  id: "q-201-2",
                  question: "Why are Authenticator Apps safer than SMS text message 2FA?",
                  points: 25,
                  correctOptionId: "opt-1",
                  explanation: "SMS 2FA can be intercepted through SIM-swapping attacks, whereas app authenticator seeds stay local to your device.",
                  options: [
                    { id: "opt-1", text: "SMS codes can be hijacked via SIM-swapping attacks by cybercriminals." },
                    { id: "opt-2", text: "SMS text messages cost money to receive." },
                    { id: "opt-3", text: "Authenticator apps don't require an internet connection or phone battery." },
                    { id: "opt-4", text: "SMS codes take 24 hours to generate." }
                  ]
                },
                {
                  id: "q-201-3",
                  question: "What is the main benefit of using a Password Manager?",
                  points: 25,
                  correctOptionId: "opt-4",
                  explanation: "Password managers store unique, highly complex passwords for every single site, removing the bad habit of password reuse.",
                  options: [
                    { id: "opt-1", text: "It bypasses the need for internet connection." },
                    { id: "opt-2", text: "It automatically answers all quiz questions for you." },
                    { id: "opt-3", text: "It blocks all video advertisements on social media." },
                    { id: "opt-4", text: "It securely generates and remembers unique passwords for every account." }
                  ]
                },
                {
                  id: "q-201-4",
                  question: "What should you do if an account service notifies you of a breach password leak?",
                  points: 25,
                  correctOptionId: "opt-2",
                  explanation: "Immediately update your password on that service and on any other service where you reused that same password.",
                  options: [
                    { id: "opt-1", text: "Delete your email account completely." },
                    { id: "opt-2", text: "Change the compromised password immediately and update any other site where it was reused." },
                    { id: "opt-3", text: "Ignore the warning if you haven't logged in recently." },
                    { id: "opt-4", text: "Turn off your computer monitor for 24 hours." }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "mod-3",
    title: "Module 3: Digital Communication & Responsible Online Conduct",
    description: "Learn professional email etiquette, constructive debate online, respecting privacy rights, and preventing digital footprint leaks.",
    order: 3,
    status: "locked",
    badge: {
      id: "badge-digital-citizen",
      title: "Model Digital Citizen",
      description: "Earned by completing Module 3: Digital Communication & Etiquette.",
      iconUrl: "/badges/digital-citizen.svg",
    },
    sections: [
      {
        id: "mod3-sec-1",
        moduleId: "mod-3",
        title: "Section 1: Digital Footprint & Online Reputation",
        description: "Understanding how public posts, data tracking, and metadata affect your long-term reputation.",
        order: 1,
        status: "locked",
        items: [
          {
            id: "item-301",
            title: "Lesson: Managing Your Long-Term Digital Footprint",
            type: "video",
            order: 1,
            status: "locked",
            video: {
              id: "vid-301",
              title: "Managing Your Long-Term Digital Footprint",
              description: "Strategies for controlling public privacy settings, search engine footprints, and online posts.",
           videoUrl: "https://www.youtube.com/watch?v=Z5iWr6Srsj8",
             thumbnailUrl: "https://img.youtube.com/vi/Z5iWr6Srsj8/maxresdefault.jpg",
durationInSeconds: 480,
              formattedDuration: "08:00"
            }
          },
          {
            id: "item-302",
            title: "Quiz: Digital Footprint & Professional Ethics",
            type: "quiz",
            order: 2,
            status: "locked",
            quiz: {
              id: "quiz-301",
              title: "Digital Citizenship Assessment",
              description: "Test your understanding of online ethics and reputation management.",
              passingScorePercentage: 75,
              questions: [
                {
                  id: "q-301-1",
                  question: "What constitutes your 'Active Digital Footprint'?",
                  points: 25,
                  correctOptionId: "opt-1",
                  explanation: "Active digital footprints are created when you intentionally share information online, such as posts, comments, or signups.",
                  options: [
                    { id: "opt-1", text: "Data you deliberately share online like social media posts, comments, and photos." },
                    { id: "opt-2", text: "Your device battery charging cycle logs." },
                    { id: "opt-3", text: "The physical weight of your mobile device." },
                    { id: "opt-4", text: "Automatic server logs generated when your Wi-Fi router restarts." }
                  ]
                },
                {
                  id: "q-301-2",
                  question: "What does 'Doxxing' mean in digital culture?",
                  points: 25,
                  correctOptionId: "opt-3",
                  explanation: "Doxxing is the malicious practice of researching and publicly broadcasting someone's private identifying information online.",
                  options: [
                    { id: "opt-1", text: "Editing a PDF document online." },
                    { id: "opt-2", text: "Organizing files inside cloud folders." },
                    { id: "opt-3", text: "Maliciously publishing someone's private personal details (address, phone) publicly without consent." },
                    { id: "opt-4", text: "Updating your web browser software." }
                  ]
                },
                {
                  id: "q-301-3",
                  question: "What is a safe guideline before posting comments on public forums?",
                  points: 25,
                  correctOptionId: "opt-2",
                  explanation: "Assume anything published online can be saved, screenshotted, and viewed indefinitely by employers or family.",
                  options: [
                    { id: "opt-1", text: "Assume posts disappear permanently after 24 hours." },
                    { id: "opt-2", text: "Assume anything you post online can be permanently archived and linked back to you." },
                    { id: "opt-3", text: "Use offensive language to get more likes." },
                    { id: "opt-4", text: "Never use punctuation or capital letters." }
                  ]
                },
                {
                  id: "q-301-4",
                  question: "How can you reduce unwanted personal data tracking on search engines?",
                  points: 25,
                  correctOptionId: "opt-4",
                  explanation: "Reviewing privacy settings, clearing third-party cookies, and using privacy-focused search tools reduces data profiling.",
                  options: [
                    { id: "opt-1", text: "Turn off your computer speakers." },
                    { id: "opt-2", text: "Change your desktop wallpaper." },
                    { id: "opt-3", text: "Bookmark every website you visit." },
                    { id: "opt-4", text: "Adjust browser privacy controls, limit cross-site tracking cookies, and audit app permissions." }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

/**
 * Initial Course State
 * Combines the course title with the module data, used to seed the dashboard
 */
export const initialCourse: Course = {
  title: courseTitle,
  description:
    "Learn to spot disinformation, secure your accounts, and communicate responsibly online.",
  modules: courseModulesData,
};

/**
 * Initial User Progress State
 * Default setup: Module 1 unlocked, user active on Item 101 (First Lesson)
 */
export const initialUserProgress: UserProgress = {
  userId: "user-student-01",
  currentModuleId: "mod-1",
  currentSectionId: "mod1-sec-1",
  currentItemId: "item-101",
  completedItemIds: [],
  completedSectionIds: [],
  completedModuleIds: [],
  overallProgressPercentage: 0,
  videoProgressMap: {},
  quizResultsMap: {},
  earnedBadges: [],
  updatedAt: new Date().toISOString(),
};