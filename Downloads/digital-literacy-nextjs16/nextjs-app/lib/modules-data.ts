import { Module } from '@/lib/types';

export const modulesData: Module[] = [
  {
   id: 'mod-1',
title: 'Understanding Fake News & Disinformation',
category: 'Media Literacy Basics',
duration: '40 mins',
description:
  'Learn to define, identify, and dissect fake news and disinformation networks spreading on social media platforms like TikTok, Instagram, and WhatsApp.',
sections: [
  {
    id: 'mod1-sec1',
    title: 'Anatomy of Disinformation & Social Media Spread',
    description:
      'Explore what fake news is, how it spreads, and why social media algorithms amplify emotional content.',
    videoUrl: 'https://www.youtube.com/embed/gLoI9hAX9dw',
    content: `### 1. Introduction to Fake News
"Fake News" is a broad term that refers to false or misleading information presented as trustworthy news. To analyze this effectively, scholars divide it into three primary categories:
*   **Misinformation**: False information shared *without* harmful intent (e.g., a friend forwarding an outdated warning on WhatsApp, genuinely believing it is helpful).
*   **Disinformation**: False information deliberately created and shared to deceive, cause harm, or achieve political or financial gains (e.g., fabricated stories designed to manipulate election outcomes).
*   **Malinformation**: Genuine information shared out of context or with malicious intent to cause harm (e.g., leaking private photos or emails to damage someone's reputation).

### 2. How Misinformation Spreads on Modern Platforms
Social media platforms (TikTok, Instagram, WhatsApp, X) are designed to maximize user engagement. 

Here is how different platforms amplify misinformation:
*   **TikTok & Instagram (Short-form Video)**: Algorithms prioritize high-retention, emotionally charged videos. Misinformation is often packaged in highly engaging, short-form clips utilizing spliced audio, text overlays, and dramatic music that triggers immediate outrage, fear, or excitement.
*   **WhatsApp & Telegram (Private Messaging)**: Unlike public platforms, private chats are end-to-end encrypted. This creates "dark social" networks where messages circulate without external scrutiny, making fake health advice, missing-child hoaxes, and conspiracy theories incredibly difficult to track and debunk.
*   **X & Facebook (Link-sharing & Comments)**: Retweets and shares allow stories to spread exponentially within seconds. Sensationalist clickbait headlines are frequently shared by users who have only read the title and not the actual article.

### 3. Real-World Social Media Examples
*   **The WhatsApp Salt Water Hoax**: During a health crisis, viral audio messages urged people to gargle concentrated salt water to prevent infection. This led to multiple hospitalizations for sodium poisoning.
*   **Deepfakes on TikTok**: Artificially manipulated videos showing political figures saying things they never said have gone viral, amassing millions of views before being flagged by moderators.
*   **Out-of-context Disaster Footage**: Old videos of explosions or natural disasters are frequently reposted as "live footage" of current, breaking geopolitical conflicts to farm views and engagement.`,
        keyPoints: [
          'Differentiate clearly between misinformation (unintentional) and disinformation (deliberate).',
          'Understand how short-form video algorithms exploit emotions (outrage, fear, awe) to drive viral engagement.',
          'Recognize WhatsApp and messaging apps as primary channels for "dark social" misinformation.',
          'Identify common red flags in viral videos, such as spliced audio and dramatic out-of-context footage.'
        ],
        quiz: [
          {
            id: 'm1s1-q1',
            question: 'What is the key difference between "misinformation" and "disinformation"?',
            type: 'single-choice',
            options: [
              'Misinformation spreads on websites, while disinformation spreads exclusively on video-sharing apps.',
              'Disinformation is intentionally created and shared to deceive or cause harm, while misinformation is shared without malicious intent.',
              'Misinformation is illegal, whereas disinformation is protected by public speech policies.',
              'There is no actual difference; the terms are complete synonyms.'
            ],
            correctAnswers: [1],
            explanation: 'Disinformation is characterized by its malicious intent to deceive, manipulate, or harm. Misinformation, on the other hand, is simply incorrect information shared by someone who believes it to be true.'
          },
          {
            id: 'm1s1-q2',
            question: 'Which of the following tactics are frequently used to propagate disinformation on TikTok and Instagram? (Select all that apply)',
            type: 'multiple-choice',
            options: [
              'Using spliced audio or deepfaked visuals to misrepresent a public figure.',
              'Including academic peer-reviewed citations in the description box.',
              'Employing dramatic music and high-contrast text overlays to provoke emotional reactions.',
              'Coordinating bot networks to artificially inflate likes, shares, and comments in the first few minutes.'
            ],
            correctAnswers: [0, 2, 3],
            explanation: 'Deepfakes, emotional music triggers, and coordinated bot networks are staple tactics of disinformation campaigns. Peer-reviewed citations are rarely used because disinformation relies on emotion rather than verified facts.'
          },
          {
            id: 'm1s1-q3',
            question: 'If a WhatsApp message has a "Forwarded many times" tag, what does this indicate about its credibility?',
            type: 'true-false',
            options: [
              'True (It means the information has been verified by thousands of users and is highly reliable).',
              'False (It simply means it has spread rapidly, which is a common trait of sensational rumors).'
            ],
            correctAnswers: [1],
            explanation: 'The "Forwarded many times" tag is a speed warning indicator added by WhatsApp. It does not imply verification; indeed, viral rumors and sensational hoaxes are the most common candidates for rapid forwarding.'
          },
          {
            id: 'm1s1-q4',
            question: 'Which psychological bias explains our tendency to readily accept fake news that aligns with our political views?',
            type: 'single-choice',
            options: [
              'Confirmation Bias (the tendency to favor information that confirms pre-existing beliefs)',
              'Dunning-Kruger Effect (overestimating one\'s own competence in a subject area)',
              'Framing Effect (reacting differently depending on how information is presented)',
              'Bandwagon Effect (believing things because many other people do)'
            ],
            correctAnswers: [0],
            explanation: 'Confirmation bias is a powerful cognitive filter. It makes us highly receptive to information—even false information—that supports our current beliefs, while making us overly skeptical of contrary facts.'
          },
          {
            id: 'm1s1-q5',
            question: 'Select the signs that indicate a social media breaking news account might NOT be a trustworthy source during a crisis: (Select all that apply)',
            type: 'multiple-choice',
            options: [
              'The account has a history of posting unrelated viral memes and suddenly shifted to war reporting.',
              'Every post urges users to "Share quickly before it gets deleted!"',
              'The account posts claims that are not corroborated by any established, named journalists or news agencies.',
              'The account is verified on the platform by paying a monthly subscription fee.'
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: 'All of these are major red flags. Crisis reporting accounts that lack credentials, use high-urgency clickbait language, post uncorroborated reports, or use paid-for verification (which anyone can buy) should be treated with extreme caution.'
          }
        ]
      },
      {
       id: 'mod1-sec2',
title: 'Fact-Checking Techniques & Information Verification',
description:
  'Master the practical tools and skills used by professional journalists to verify claims, images, and sources.',
videoUrl: 'https://www.youtube.com/embed/Go9-DIsX6Y8',
content: `### 1. Distinguishing Reliable vs. Unreliable Sources
Navigating the modern web requires moving past "surface indicators" like a professional logo or a secure padlock icon (HTTPS). 
*   **The Padlock Fallacy**: Secure HTTPS connection simply means that your data is encrypted between your browser and the server. It does *not* mean the website\'s owners are telling the truth. Phishing and fake news sites use HTTPS encryption as well.
*   **Visual Polish**: Bad actors frequently copy the visual themes, typography, and layout of premium news sites to deceive readers. 

### 2. Fact-Checking Methodologies
Professional fact-checkers use a series of highly effective habits:
*   **Lateral Reading**: Instead of reading a suspicious article from top to bottom, professional fact-checkers immediately *read laterally*. They open new browser tabs and search for information *about* the source: Who funds them? What is their track record? What do other independent organizations say about their claims?
*   **Reverse Image Search**: Disinformation often relies on recycled images from older events. By uploading a suspicious image to Google Images, TinEye, or Yandex, you can see where and when the photo was originally published, exposing attempts to misrepresent old events.
*   **Primary Source Verification**: Always track a claim back to its origin. If a blog post says "Scientific study proves X," find the actual academic paper. Does the paper actually support the claim, or has the media completely misrepresented the findings?

### 3. Practical Fact-Checking Toolkits
Familiarize yourself with trusted, non-partisan fact-checking platforms:
*   **Snopes.com**: The oldest and most comprehensive archive of internet rumors, urban legends, and viral hoaxes.
*   **PolitiFact & FactCheck.org**: Focus heavily on verifying statements made by politicians, political ads, and policy claims.
*   **Reuters Fact Check & AP Fact Check**: Fast, global fact-checking divisions run by the world's leading news wire services.`,
        keyPoints: [
          'Understand that a website\'s visual design and HTTPS lock do not equal credibility.',
          'Practice lateral reading: exit the suspicious page immediately to verify the host entity in other tabs.',
          'Use reverse image searching to find the original publication dates and contexts of suspect photos.',
          'Cultivate a habit of tracing claims back to their primary scientific, governmental, or eyewitness source.'
        ],
        quiz: [
          {
            id: 'm1s2-q1',
            question: 'What does "lateral reading" involve when evaluating a webpage?',
            type: 'single-choice',
            options: [
              'Reading the article slowly from left to right while highlighting key vocabulary.',
              'Opening other browser tabs to search for independent information about the source\'s funding, credibility, and claims.',
              'Scrolling straight to the comments section to see if other readers agree with the content.',
              'Reading only the vertical margins and footer of the page to find copyright details.'
            ],
            correctAnswers: [1],
            explanation: 'Lateral reading means moving "sideways" across tabs to research the source\'s reputation, funding, and agenda using other trusted sites, rather than trusting what the source says about itself.'
          },
          {
            id: 'm1s2-q2',
            question: 'Does a padlock icon in your browser URL bar (HTTPS) prove that a news website is a reliable source of facts?',
            type: 'true-false',
            options: [
              'True (The padlock guarantees that the content of the website has been vetted and approved as truthful).',
              'False (The padlock only means the communication between your browser and the site is encrypted, not that the content is accurate).'
            ],
            correctAnswers: [1],
            explanation: 'The padlock indicates a secure connection (HTTPS). It ensures that third parties cannot intercept your traffic, but it tells you nothing about the honesty or factual accuracy of the website\'s creators.'
          },
          {
            id: 'm1s2-q3',
            question: 'Which of the following are legitimate methods to verify if an image of a natural disaster is real and current? (Select all that apply)',
            type: 'multiple-choice',
            options: [
              'Running a Google or TinEye Reverse Image Search to locate its earliest online appearance.',
              'Examining details in the photo like license plates, street signs, weather, and foliage to cross-reference the alleged location.',
              'Copying and pasting the image into a word processor to see if a verification watermark appears automatically.',
              'Checking the metadata (EXIF data) of the file, if available, to verify the date, time, and camera model used.'
            ],
            correctAnswers: [0, 1, 3],
            explanation: 'Reverse image searching, geological/environmental analysis, and EXIF metadata checks are highly effective forensic methods. Pasting into a word processor does not reveal verification watermarks.'
          },
          {
            id: 'm1s2-q4',
            question: 'If an article claims "A brand new study proves that eating chocolate cures insomnia," what is the most robust way to verify this claim?',
            type: 'single-choice',
            options: [
              'Checking if the article has been liked and shared by famous health influencers on Instagram.',
              'Searching for the original, peer-reviewed scientific paper to read its methodology, sample size, and actual conclusions.',
              'Reading the comment section to see if other people had success eating chocolate before bed.',
              'Assuming it is true because the article includes a photo of a scientist in a white lab coat.'
            ],
            correctAnswers: [1],
            explanation: 'Tracing a sensational science claim back to its primary source—the peer-reviewed academic study—is the gold standard of scientific fact-checking. It prevents you from falling victim to exaggerated media summaries.'
          },
          {
            id: 'm1s2-q5',
            question: 'Which of the following organizations are recognized, non-partisan fact-checking entities? (Select all that apply)',
            type: 'multiple-choice',
            options: [
              'Snopes',
              'PolitiFact',
              'FactCheck.org',
              'Reuters Fact Check'
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: 'All four are reputable, non-partisan entities that adhere to strict factual standards and transparent methodology when debunking rumors and verifying public claims.'
          }
        ]
      }
    ]
  },
  {
  id: 'mod-2',
title: 'Echo Chambers, Algorithms & Cognitive Safeguards',
category: 'Advanced Verification',
duration: '35 mins',
description:
  'Understand the feedback loops that keep us locked in informational bubbles, and how to build digital safeguards to protect your critical thinking.',
sections: [
  {
    id: 'mod2-sec1',
    title: 'The Mechanics of Algorithmic Feedback Loops',
    description:
      'Analyze how social media search and news feed algorithms curate personalized content and create dangerous filter bubbles.',
    videoUrl: 'https://www.youtube.com/embed/B8ofWFx525s',
    content: `### 1. Algorithms and Attention Economy
The business model of major social media networks relies on keeping your eyes on the screen for as long as possible to maximize advertising revenue. 
*   **The Engagement Loop**: Algorithms analyze your behavior—what you click, hover over, watch, comment on, and search. They then feed you more of the exact same content to keep you engaged.
*   **Filter Bubbles**: Over time, you are only shown viewpoints that align with your past behavior. Other viewpoints are quietly filtered out, leaving you in an isolated bubble where you assume "everyone agrees with me."

### 2. Echo Chambers vs. Filter Bubbles
While these terms are used interchangeably, they represent different phenomena:
*   **Filter Bubble**: A state of intellectual isolation created by *algorithms* that predict what information we would like to see. It is passive; you do not actively choose it.
*   **Echo Chamber**: A social structure where alternative viewpoints are actively discredited, mocked, or banned. It is active and highly ideological, creating an "us vs. them" mentality.

### 3. Escalating Radicalization
Because algorithms favor outrageous, extreme, and hyper-partisan views (which generate the most clicks and comments), they can slowly steer a moderate user toward highly radicalized conspiracy theories. A user searching for basic nutritional advice might be slowly guided by recommendation algorithms toward extreme, scientifically dangerous health sects.`,
        keyPoints: [
          'Describe how personalization algorithms create passive "filter bubbles" to maximize screen engagement.',
          'Distinguish between passive algorithmic filter bubbles and active, ideological echo chambers.',
          'Understand how engagement-driven recommendation engines can gradually radicalize user views.'
        ],
        quiz: [
          {
            id: 'm2s1-q1',
            question: 'What is a "filter bubble"?',
            type: 'single-choice',
            options: [
              'A physical protective filter applied to laptop screens to prevent glare.',
              'An intellectually isolated state created when recommendation algorithms selectively guess what information a user wants to see.',
              'A specific security sandbox used to isolate computer viruses from spreading.',
              'A forum moderator group that filters out vulgar language from comment boards.'
            ],
            correctAnswers: [1],
            explanation: 'A filter bubble is a passive state of information isolation. Algorithms feed you content they know you like, shield you from opposing views, and distort your perception of reality.'
          },
          {
            id: 'm2s1-q2',
            question: 'How does an "echo chamber" differ from a "filter bubble"?',
            type: 'single-choice',
            options: [
              'An echo chamber is a passive algorithmic result, while a filter bubble requires active user participation.',
              'An echo chamber is a social group where opposing voices are actively discredited or excluded; a filter bubble is a passive curation of content by algorithms.',
              'Echo chambers only occur in face-to-face meetings, while filter bubbles only occur on the internet.',
              'There is no difference; they refer to the exact same technical mechanism.'
            ],
            correctAnswers: [1],
            explanation: 'Echo chambers are social and psychological structures where outsiders and opposing opinions are actively distrusted and discredited. Filter bubbles are passive collections of personalized search/feed results curated by computer systems.'
          },
          {
            id: 'm2s1-q3',
            question: 'Which algorithmic behaviors directly contribute to the spread of fake news? (Select all that apply)',
            type: 'multiple-choice',
            options: [
              'Prioritizing content that generates high emotional outrage and click-through rates.',
              'Serving personalized recommendations based solely on prior user engagement profiles.',
              'Automatically downranking articles that contain logical fallacies or lack scientific sources.',
              'Encouraging extreme and provocative content because it triggers high debate and long session durations.'
            ],
            correctAnswers: [0, 1, 3],
            explanation: 'Algorithms favor outrage, user engagement, and dramatic debate because they drive platform revenue. They do not naturally screen for logical fallacies or peer-reviewed facts.'
          }
        ]
      },
      {
       id: 'mod2-sec2',
title: 'Cognitive Safeguards & Digital Hygiene',
description:
  'Cultivate proactive habits to interrupt emotional sharing loops, diversify your news diet, and practice safe digital hygiene.',
videoUrl: 'https://www.youtube.com/embed/pLlv2o6UfTU',
content: `### 1. The Power of Pause: Cognitive SIFT
When encountering high-impact news, use the SIFT method developed by digital literacy expert Mike Caulfield:
*   **S - Stop**: Before you click share, retweet, or comment—stop. Check your emotions. Are you sharing because you verified it, or because you are angry/excited?
*   **I - Investigate the source**: Look up who is posting. Are they an expert? A comedian? A brand?
*   **F - Find trusted coverage**: See if Snopes, Reuters, or another reliable source has already fact-checked the claim.
*   **T - Trace claims back to original context**: Find the original quote, image, or video. Was it edited or taken out of context?

### 2. Diversifying Your News Feed
To puncture filter bubbles, you must actively train your algorithms:
*   **Search for dissenting views**: Periodically search for topics outside your normal bubble to disrupt automated personalization profiles.
*   **Use RSS readers or curated newsletters**: Rely on diverse, human-curated media feeds rather than relying on social media scrolls.
*   **Follow raw wires**: Read international news agencies (Associated Press, Reuters, Agence France-Presse) which focus heavily on objective, non-opinionated reporting.

### 3. Responsible Sharing
The ultimate digital safeguard is personal responsibility. 
If you are not 100% sure an article is true, **do not share it.** 
By sharing unverified rumors "just in case," you become an active link in the disinformation supply chain. Your share adds credibility and puts your friends at risk of being deceived.`,
        keyPoints: [
          'Deploy the SIFT methodology (Stop, Investigate, Find, Trace) when assessing viral claims.',
          'Actively diversify your digital feed to disrupt recommendation profiles and burst filter bubbles.',
          'Acknowledge personal responsibility in breaking disinformation chains: when in doubt, do not share.'
        ],
        quiz: [
          {
            id: 'm2s2-q1',
            question: 'What do the letters in the SIFT model stand for?',
            type: 'single-choice',
            options: [
              'Search, Inspect, Filter, Trust',
              'Stop, Investigate the source, Find trusted coverage, Trace claims back to original context',
              'Share immediately, Ignore critics, Forward to contacts, Tell everyone',
              'Sift, Isolate, Finalize, Transmit'
            ],
            correctAnswers: [1],
            explanation: 'SIFT stands for: Stop; Investigate the source; Find trusted coverage; and Trace claims, quotes, and media back to their original context.'
          },
          {
            id: 'm2s2-q2',
            question: 'What is the most effective way to actively break out of an algorithmic filter bubble?',
            type: 'single-choice',
            options: [
              'Deleting your internet browser and only reading print books.',
              'Deliberately searching for, reading, and interacting with high-quality media sources from opposing viewpoints to retrain personalization systems.',
              'Sharing every post you see regardless of its content to confuse the system.',
              'Clicking "Like" on every single post that appears on your home feed.'
            ],
            correctAnswers: [1],
            explanation: 'To break filter bubbles, you must actively feed the recommendation engines diverse data. Interacting with high-quality sources that present alternative views tells the algorithm you appreciate diverse material.'
          },
          {
            id: 'm2s2-q3',
            question: 'Which statements align with "responsible sharing hygiene"? (Select all that apply)',
            type: 'multiple-choice',
            options: [
              'Sharing a shocking claim with the caption "Not sure if true, but sharing just in case!"',
              'Taking 30 seconds to run a quick reverse image search before forwarding a sensational photo.',
              'Refusing to share breaking news updates until reputable news organizations have corroborated the reports.',
              'Deleting a post immediately if you learn it contains inaccurate or out-of-context facts.'
            ],
            correctAnswers: [1, 2, 3],
            explanation: 'Sharing "just in case" actually accelerates misinformation. Responsible hygiene involves verification before sharing, relying on corroborated reports, and deleting/correcting mistakes promptly.'
          }
        ]
      }
    ]
  }
];