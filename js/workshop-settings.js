/* WEBSITE WORKSHOP — EDIT THIS FILE TO CHANGE WORKSHOP CONTENT */
window.WORKSHOP_SETTINGS = {
  workshop: {
    title: "Website Workshop",
    eyebrow: "Glam Workshop Companion",
    description: "Build and publish your own professional website during this workshop.",
    storageKey: "glam-website-workshop-v1",
  },

  dashboardCards: [
    {
      tag: "Start Here",
      title: "Getting Started",
      text: "Review what you need before the workshop begins.",
      page: "getting-started",
    },
    {
      tag: "Workshop",
      title: "Build Your Website",
      text: "Follow seven beginner-friendly lessons from planning through publishing.",
      page: "website-workshop",
    },
    {
      tag: "Keep Going",
      title: "Your Progress",
      text: "Complete each lesson to unlock your completion certificate.",
      page: "completion",
    },
  ],

  gettingStarted: {
    title: "Getting Started",
    intro: "Get everything ready before the live workshop.",
    cards: [
      {
        title: "What You Need",
        text: "A ChatGPT account, a Payhip account, your business information, and the products or services you want to feature.",
      },
      {
        title: "Before We Begin",
        text: "Gather your logo, brand colors, product links, photos, descriptions, and contact information. Missing items can be added later.",
      },
    ],
  },

  sessions: [
    {
      id: "website-workshop",
      title: "Build Your Website",
      intro: "Move from your first idea to a tested, published website.",
      lessons: [
        {
          id: "plan-website",
          tag: "Step 1",
          title: "Plan Your Website",
          instructions: "Answer a few focused questions so ChatGPT can organize your website before you build it.",
          prompt: `You are an experienced website builder helping me plan my website.

Ask me one question at a time and wait for each answer. Ask only what you still need to know, using no more than 8 questions total.

Learn what my business is about, the website's main goal, who it is for, the pages or sections I need, what visitors should do, what products or services must be included, the style I want, and what content I already have.

Use simple language with no technical jargon. Do not ask me to repeat anything I already answered.

After the questions, create a short website plan showing the pages or sections, what belongs in each one, and the main visitor action. Keep it concise, then ask if I approve it before moving forward.`,
        },
        {
          id: "choose-style",
          tag: "Step 2",
          title: "Choose Your Website Style",
          instructions: "Decide how your website should look and organize the content before building it.",
          prompt: `Continue using the website plan we already created in this conversation. Do not restart or ask me to repeat answers.

Help me decide how the website should look. Ask only about important design details that are still missing, one question at a time, with no more than 5 questions.

Then create a short Content and Design Guide covering the overall look, colors and fonts, pages or sections, buttons and links, images, and mobile layout.

Keep it simple. Do not use technical jargon or write code. Ask if I approve the design before we build.`,
        },
        {
          id: "build-sites",
          tag: "Step 3",
          title: "Build in ChatGPT Sites",
          instructions: "Use your approved plan and design guide to create the first working version of your website.",
          prompt: `Use the approved website plan and Content and Design Guide from this conversation to build my website with ChatGPT Sites.

Preserve my wording, brand colors, pages, sections, buttons, and important links. Keep the layout clean, professional, mobile-friendly, and easy to navigate.

Do not add fake reviews, fake statistics, unrelated sections, or features I did not approve. If one essential detail is missing, ask me before building. Otherwise, build the first complete version now.`,
        },
        {
          id: "add-content",
          tag: "Step 4",
          title: "Add Your Business Content",
          instructions: "Replace unfinished wording and images with your real business information.",
          prompt: `Review the website we built and help me finish the real content.

Identify only the sections that still need my wording, images, business details, or links. Ask for one missing item at a time.

When I provide an item, place it in the correct section without redesigning the website or changing approved content. Keep all wording clear, concise, and easy to read.`,
        },
        {
          id: "connect-payhip",
          tag: "Step 5",
          title: "Connect Payhip Products",
          instructions: "Connect website buttons to the correct Payhip product or checkout pages.",
          prompt: `Help me connect my Payhip products to the website we already built.

Ask me for each product name and its correct Payhip link, one product at a time. Then connect the matching website button to that link.

Use clear button wording such as Buy Now, Get Access, or View Product. Open outside checkout links safely in a new tab. Do not change unrelated buttons, pages, wording, or design.`,
        },
        {
          id: "test-website",
          tag: "Step 6",
          title: "Test Desktop and Mobile",
          instructions: "Check the important pages, buttons, links, wording, and mobile layout before publishing.",
          prompt: `Help me test the website before publishing it.

Guide me through one small check at a time. Check that the pages open, navigation works, wording is readable, images display correctly, every button opens the correct link, Payhip links work, and the website looks good on desktop and mobile.

If something is broken, explain one exact fix at a time. Do not redesign the website while testing. When everything passes, tell me it is ready to publish.`,
        },
        {
          id: "publish-website",
          tag: "Step 7",
          title: "Publish Your Website",
          instructions: "Publish the finished website and verify the public link.",
          prompt: `My website has passed testing. Help me publish it using ChatGPT Sites.

Walk me through one step at a time using simple instructions. After publishing, help me open the public link and confirm the main pages, navigation, buttons, Payhip links, images, and mobile view still work.

Do not add a custom domain or make new design changes during this step.`,
        },
      ],
    },
  ],

  resources: [
    {
      title: "ChatGPT",
      description: "Plan, build, revise, and publish your website.",
      url: "https://chatgpt.com/",
    },
    {
      title: "Payhip",
      description: "Create products and copy the correct sales or checkout links.",
      url: "https://payhip.com/",
    },
    {
      title: "Workshop Downloads",
      description: "Add your student download link here when it is ready.",
      url: "#",
    },
  ],

  replays: [
    {
      title: "Website Workshop Replay",
      description: "The workshop replay will be added here after the live session.",
      url: "#",
    },
  ],

  help: [
    {
      title: "Where do I begin?",
      text: "Open Getting Started, gather your information, and begin with Step 1.",
    },
    {
      title: "What if I do not have all my content?",
      text: "Continue with what you have. You can add missing photos, wording, and links later.",
    },
    {
      title: "What if ChatGPT changes something I approved?",
      text: "Tell it to restore the approved section and change only the specific item you requested.",
    },
    {
      title: "Do I need a custom domain?",
      text: "No. A custom domain is not required for this workshop.",
    },
  ],

  completion: {
    title: "Website Workshop Complete",
    message: "You planned, built, tested, and published your website.",
    buttonText: "View My Certificate",
    diplomaUrl: "diploma.html",
  },
};

