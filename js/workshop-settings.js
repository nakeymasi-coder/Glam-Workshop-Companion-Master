/* WEBSITE WORKSHOP — CONTENT + TEACHING SOURCE OF TRUTH */
window.WORKSHOP_SETTINGS = {
  workshop: {
    title: "Website Workshop",
    eyebrow: "Glam Workshop Companion",
    description:
      "Plan, build, test, and publish one polished digital product website in a guided three-hour beginner workshop.",
    storageKey: "glam-website-workshop-v5",
  },

  groups: [
    {
      label: "START",
      pages: [
        ["dashboard", "Workshop Dashboard"],
        ["requirements", "Workshop Requirements"],
        ["planner", "Website Planner"],
      ],
    },
    {
      label: "BUILD",
      pages: [
        ["module-plan", "1. Plan"],
        ["module-payhip", "2. Prepare Payhip"],
        ["module-github-connect", "3. Connect GitHub"],
        ["module-build", "4. Build in ChatGPT Sites"],
        ["module-personalize", "5. Personalize + Connect"],
        ["module-test", "6. Test + Fix"],
        ["module-publish", "7. Send to GitHub + Publish"],
      ],
    },
    {
      label: "SUPPORT",
      pages: [
        ["progress-page", "Your Progress"],
        ["fix-later", "Fix Later"],
        ["troubleshooting", "Troubleshooting"],
        ["help-queue", "Help Queue"],
        ["recovery", "Recovery Center"],
        ["notes", "Notebook"],
        ["help", "Quick Help"],
      ],
    },
    {
      label: "AFTER CLASS",
      pages: [
        ["next-steps", "Next Steps"],
        ["completion", "Completion"],
      ],
    },
  ],

  dashboardCards: [
    {
      tag: "Start Here",
      title: "Workshop Requirements",
      text: "Confirm your accounts, Payhip products, images, business information, and GitHub access before class.",
      page: "requirements",
    },
    {
      tag: "Plan",
      title: "Website Planner",
      text: "Fill in your real website information once. The portal will turn it into your ready-to-copy website prompt.",
      page: "planner",
    },
    {
      tag: "Build",
      title: "Continue Workshop",
      text: "Jump directly to your first unfinished workshop step.",
      action: "continue",
    },
    {
      tag: "Support",
      title: "Fix Later",
      text: "Park non-blocking design tweaks here so small details do not steal your workshop time.",
      page: "fix-later",
    },
  ],

  requirements: {
    title: "Workshop Requirements",
    intro:
      "Complete these before class so workshop time stays focused on building, testing, and publishing.",
    sections: [
      {
        title: "Accounts + Access",
        items: [
          "I can log in to ChatGPT.",
          "I can open ChatGPT Sites.",
          "I can log in to Payhip.",
          "I can log in to GitHub.",
          "I know which GitHub account I am using for this workshop.",
          "I tested all required logins before class.",
          "I am using a laptop or desktop computer.",
          "My browser is updated.",
        ],
      },
      {
        title: "Business Information",
        items: [
          "Business or website name",
          "One-sentence business description",
          "Short About paragraph",
          "Contact email",
          "Social media links",
          "Preferred call to action",
          "Email signup link, if using one",
        ],
      },
      {
        title: "Brand Materials",
        items: [
          "Logo or text-based business name",
          "Two or three brand colors",
          "One hero image",
          "One About image",
          "Two or three product images",
          "Images are organized somewhere easy to find",
        ],
      },
      {
        title: "Payhip Products",
        items: [
          "Two or three Payhip products are published",
          "Product names are final enough for class",
          "Prices are correct",
          "Product images are uploaded",
          "Public customer-facing product links are tested",
        ],
      },
    ],
  },

  planner: {
    title: "Website Planner",
    intro:
      "Fill this out once. Your answers save automatically in this browser and feed your generated website prompt.",
    fields: [
      ["websiteName", "Website name"],
      ["productType", "What I sell"],
      ["audience", "Who I help"],
      ["result", "What my products help them accomplish"],
      ["brandColors", "Brand colors"],
      ["visualStyle", "Three visual style words"],
      ["heroHeadline", "Hero headline"],
      ["heroSupport", "Hero supporting sentence"],
      ["heroCta", "Primary button text"],
      ["heroLink", "Primary hero button destination"],
      ["about", "About paragraph"],
      ["contactEmail", "Contact email"],
      ["socialLinks", "Social links"],
      ["emailSignup", "Email signup link"],
    ],
    products: 3,
  },

  sessions: [
    {
      id: "module-plan",
      title: "Module 1 — Plan the Website",
      intro:
        "Make the decisions ChatGPT Sites needs before building. Do not stop to perfect every sentence.",
      instructor: {
        total: "20 minutes",
        teach: "5 min",
        demonstrate: "5 min",
        studentWork: "8 min",
        checkpoint: "2 min",
        watchFor:
          "Students getting stuck polishing taglines or rewriting About copy.",
        say:
          "If it is not perfect, mark it Improve Later and keep moving. We need enough information to build.",
        moveOnWhen:
          "Every student has a website name, hero direction, at least two products, About copy, and contact information.",
      },
      lessons: [
        {
          id: "plan-website",
          tag: "WIN 1",
          title: "Your Website Plan Is Ready",
          instructions:
            "Complete the Website Planner with short, usable answers. The portal will use those answers to build your Master Website Prompt.",
          gate: [
            "Website name is entered.",
            "At least two products are planned.",
            "Hero headline is entered.",
            "About copy is entered.",
            "Contact email is entered.",
          ],
        },
      ],
    },

    {
      id: "module-payhip",
      title: "Module 2 — Prepare Payhip",
      intro:
        "Make sure customers can actually open the products your website will promote.",
      instructor: {
        total: "20 minutes",
        teach: "4 min",
        demonstrate: "6 min",
        studentWork: "8 min",
        checkpoint: "2 min",
        watchFor:
          "Students copying a private editing/dashboard URL instead of the public customer-facing product page.",
        say:
          "If the link does not work while you are logged out, it is not ready for your customer.",
        moveOnWhen:
          "At least two featured products open publicly and their links are saved in the planner.",
      },
      lessons: [
        {
          id: "prepare-payhip",
          tag: "WIN 2",
          title: "Your Products Are Ready to Connect",
          instructions:
            "Open each featured Payhip product, verify the title, price, image, description, and public URL, then test it while logged out.",
          gate: [
            "At least two products are public.",
            "Prices are correct.",
            "Product images load.",
            "Public Payhip links open while logged out.",
            "Links are saved in the Website Planner.",
          ],
        },
      ],
    },

    {
      id: "module-github-connect",
      title: "Module 3 — Connect GitHub",
      intro:
        "Connect the correct GitHub account now so publishing does not become a surprise at the end.",
      instructor: {
        total: "15 minutes",
        teach: "3 min",
        demonstrate: "5 min",
        studentWork: "5 min",
        checkpoint: "2 min",
        watchFor:
          "Students signed into the wrong GitHub account or unsure which account they want to publish from.",
        say:
          "We are connecting GitHub now so the road is clear later. We are not editing code in GitHub.",
        moveOnWhen:
          "Students know the correct GitHub account and the connection is approved or clearly identified for follow-up.",
      },
      lessons: [
        {
          id: "connect-github",
          tag: "CONNECTION",
          title: "Connect the Correct GitHub Account",
          instructions:
            "Confirm the GitHub account you will use, connect or authorize it through the current ChatGPT workflow, and verify the correct account appears before continuing.",
          gate: [
            "I am signed into the correct GitHub account.",
            "I approved the requested GitHub connection.",
            "I know which account/repository destination I will use later.",
          ],
        },
      ],
    },

    {
      id: "module-build",
      title: "Module 4 — Build in ChatGPT Sites",
      intro:
        "Create the full first website before spending time on tiny design details.",
      instructor: {
        total: "50 minutes",
        teach: "5 min",
        demonstrate: "10 min",
        studentWork: "30 min",
        checkpoint: "5 min",
        watchFor:
          "Students changing fonts, button shapes, or animation before confirming the complete section structure.",
        say:
          "Do not decorate an unfinished house. Scroll from top to bottom and make sure the structure exists first.",
        moveOnWhen:
          "The required one-page structure exists and the core business, product, About, contact, and footer content is visible.",
      },
      lessons: [
        {
          id: "build-sites",
          tag: "WIN 3",
          title: "Your First Website Exists",
          instructions:
            "Use the generated Master Website Prompt from your planner. Build the complete first version in ChatGPT Sites, then review the whole page before requesting small changes.",
          generatedPrompt: true,
          gate: [
            "The website preview opens.",
            "All required sections appear in the approved order.",
            "The hero explains what the business sells.",
            "At least two products appear.",
            "About, contact, and footer sections appear.",
            "No fake claims or fake customer reviews were invented.",
          ],
        },
      ],
    },

    {
      id: "module-personalize",
      title: "Module 5 — Personalize and Connect",
      intro:
        "Replace placeholders, upload real images, and connect the website to the student’s real business.",
      instructor: {
        total: "25 minutes",
        teach: "3 min",
        demonstrate: "7 min",
        studentWork: "12 min",
        checkpoint: "3 min",
        watchFor:
          "One giant revision prompt that changes unrelated working sections.",
        say:
          "One clear group of changes at a time. If it already works, protect it.",
        moveOnWhen:
          "The required customer-facing content is real and the product buttons point to the correct Payhip pages.",
      },
      lessons: [
        {
          id: "personalize-connect",
          tag: "WIN 4",
          title: "Your Real Business Is on the Website",
          instructions:
            "Replace placeholder copy, add real images, and connect product, contact, signup, navigation, and social links.",
          prompt: `Keep the current website design and preserve everything that is already working.

Make only these changes:
1. [CHANGE]
2. [CHANGE]
3. [CHANGE]

Do not redesign unrelated sections.
Do not remove approved features.
Do not change working links that I did not mention.`,
          gate: [
            "Business name is correct everywhere.",
            "Hero uses the correct message and image.",
            "Product names and prices match Payhip.",
            "Product buttons use the correct public Payhip URLs.",
            "About and contact information are real.",
            "Required customer-facing placeholder text is gone.",
          ],
        },
      ],
    },

    {
      id: "module-test",
      title: "Module 6 — Test and Fix",
      intro:
        "Test what customers need. Cosmetic issues that do not block the sale go into Fix Later.",
      instructor: {
        total: "20 minutes",
        teach: "3 min",
        demonstrate: "5 min",
        studentWork: "10 min",
        checkpoint: "2 min",
        watchFor:
          "Students trying to perfect spacing or animation instead of testing links and mobile usability.",
        say:
          "Functional first. Pretty second. If it does not block a customer, park it in Fix Later.",
        moveOnWhen:
          "All critical links, navigation, product buttons, images, and mobile layout pass.",
      },
      lessons: [
        {
          id: "test-fix",
          tag: "WIN 5",
          title: "Your Website Passed Testing",
          instructions:
            "Run the Final Audit Prompt and complete the testing checklist before publishing.",
          prompt: `Audit this website without redesigning it.

Check:
- spelling and missing text
- unfinished placeholders
- broken or incorrect buttons
- Payhip product URLs
- desktop responsiveness
- mobile responsiveness
- text or images that overlap
- awkward image cropping
- missing accessibility labels
- sections that are difficult to read
- anything that could prevent a customer from viewing or buying a product

Fix only confirmed problems.
Preserve every approved section, feature, image, button, link, and design choice that is already working.
Then give me a short list of what you fixed.`,
          gate: [
            "All required customer-facing tests pass.",
            "Payhip product buttons work.",
            "Navigation works.",
            "Mobile layout is usable.",
            "Remaining non-blocking issues are in Fix Later.",
          ],
        },
      ],
    },

    {
      id: "module-publish",
      title: "Module 7 — Send to GitHub and Publish",
      intro:
        "Send the finished tested website to GitHub, publish it, and verify the public site.",
      instructor: {
        total: "20 minutes",
        teach: "3 min",
        demonstrate: "7 min",
        studentWork: "8 min",
        checkpoint: "2 min",
        watchFor:
          "Wrong GitHub account, wrong repository, or assuming the site is live before testing the public URL.",
        say:
          "We are not done because GitHub received it. We are done when another person can open the live website and the buttons work.",
        moveOnWhen:
          "The public URL opens while logged out and the main product links work.",
      },
      lessons: [
        {
          id: "publish-github",
          tag: "WIN 6",
          title: "YOU'RE LIVE",
          instructions:
            "Use the GitHub connection/publishing option available in the current ChatGPT Sites interface. Confirm the correct account and destination, complete the handoff, publish, and test the public URL while logged out.",
          gate: [
            "The correct GitHub account was used.",
            "The website project reached GitHub.",
            "The public website opens without the owner’s login.",
            "The mobile version works.",
            "Payhip buttons open the intended products.",
            "The public website URL is saved in the portal.",
          ],
        },
      ],
    },
  ],

  testingChecklist: [
    "Business name is spelled correctly.",
    "Hero headline is complete.",
    "Product names and prices are correct.",
    "Contact email is correct.",
    "No required section contains placeholder text.",
    "No fake testimonials, statistics, or claims appear.",
    "Header navigation moves to the correct sections.",
    "Primary hero button works.",
    "Every product button opens the correct Payhip page.",
    "Email signup link works, if included.",
    "Contact and social links work.",
    "Popup closes correctly, if included.",
    "Images load.",
    "Nothing overlaps or extends off-screen.",
    "Mobile navigation works.",
    "Product cards stack correctly on mobile.",
    "There is no sideways scrolling.",
  ],

  troubleshooting: [
    {
      category: "Payhip",
      problem: "My Payhip button does not work",
      classification: "Blocker",
      checks: [
        "Open the Payhip URL in a private browser window.",
        "Confirm it is the public product page and not an editing/dashboard page.",
        "Compare the website button URL with the planner.",
      ],
      fix:
        "Replace only that button with the correct full public Payhip URL and test again.",
      workaround:
        "Temporarily link to the public Payhip storefront if the exact product URL is not ready.",
    },
    {
      category: "Mobile",
      problem: "Something looks wrong on mobile",
      classification: "Blocker if unreadable",
      checks: [
        "Open the mobile preview.",
        "Look for cut-off headlines, sideways scrolling, overlapping cards, or hidden buttons.",
      ],
      fix:
        "Request a mobile-only correction for the named section while preserving desktop.",
      workaround:
        "Shorten overly long copy or use a simpler layout for that section.",
    },
    {
      category: "Images",
      problem: "My image is not showing correctly",
      classification: "Workaround",
      checks: [
        "Confirm the image finished uploading.",
        "Confirm the correct image was selected.",
        "Check whether the issue is missing image versus awkward crop.",
      ],
      fix:
        "Replace only the named section image and preserve the rest of the layout.",
      workaround:
        "Use the current placeholder and put the image correction in Fix Later.",
    },
    {
      category: "GitHub",
      problem: "GitHub will not connect",
      classification: "Publishing blocker",
      checks: [
        "Confirm the student is signed into the intended GitHub account.",
        "Confirm the requested connection was approved.",
        "Reconnect if the wrong account is showing.",
      ],
      fix:
        "Reconnect the correct GitHub account and retry the handoff.",
      workaround:
        "Finish testing the website in ChatGPT Sites and complete publishing during troubleshooting time.",
    },
    {
      category: "Publishing",
      problem: "My published website is not updating",
      classification: "Workaround",
      checks: [
        "Open the live site in a private browser window.",
        "Refresh after the publishing process finishes.",
        "Confirm the newest version was actually sent.",
      ],
      fix:
        "Send the updated finished version again and retest the public URL.",
      workaround:
        "Use the last working published version while the update completes.",
    },
  ],

  resources: [
    {
      title: "ChatGPT",
      description:
        "Plan, build, revise, test, and prepare your website for publishing.",
      url: "https://chatgpt.com/",
    },
    {
      title: "Payhip",
      description:
        "Manage products and copy public customer-facing product links.",
      url: "https://payhip.com/",
    },
    {
      title: "GitHub",
      description:
        "Receive the finished website project and publish the website.",
      url: "https://github.com/",
    },
  ],

  help: [
    {
      title: "Where do I begin?",
      text:
        "Open Workshop Requirements first, complete your Website Planner, then follow the numbered modules in order.",
    },
    {
      title: "Do I need coding experience?",
      text:
        "No. This workshop uses ChatGPT Sites for the complete website build and revision process.",
    },
    {
      title: "Do I need VS Code?",
      text: "No. VS Code is not part of this workshop.",
    },
    {
      title: "Do I need a ZIP file?",
      text:
        "No. Students do not download, unzip, or manually edit a website project folder.",
    },
    {
      title: "Why are we connecting GitHub before publishing?",
      text:
        "Connecting it early removes a common publishing blocker. GitHub is still the publishing destination, not the editing workspace.",
    },
    {
      title: "What if my website is not perfect?",
      text:
        "Publish the smallest complete working version first. Put optional design improvements into Fix Later.",
    },
  ],

  nextSteps: {
    title: "Next Steps",
    intro:
      "Keep improving the working website without rebuilding the entire thing.",
    sections: [
      [
        "Today",
        "Finish any incomplete required content and save your public website URL.",
      ],
      [
        "This Week",
        "Ask two trusted people to test the website on different phones. Fix broken links, confusing wording, and awkward mobile sections.",
      ],
      [
        "Next",
        "Add optional testimonials, email signup, a custom domain, and more products only after the core website is working.",
      ],
    ],
  },

  completion: {
    title: "Website Workshop Complete",
    message:
      "You planned your website, prepared Payhip, connected GitHub, built and personalized the site in ChatGPT Sites, tested it, sent it to GitHub, and verified the public website.",
    buttonText: "View My Certificate",
    diplomaUrl: "diploma.html",
  },
};