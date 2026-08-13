/* WEBSITE WORKSHOP — EDIT THIS FILE TO CHANGE WORKSHOP CONTENT */
window.WORKSHOP_SETTINGS = {
  workshop: {
    title: "Website Workshop",
    eyebrow: "Glam Workshop Companion",
    description:
      "Build and publish a polished one-page business or store website in one beginner-friendly workshop.",
    storageKey: "glam-website-workshop-v2",
  },

  dashboardCards: [
    {
      tag: "Start Here",
      title: "Workshop Setup Check",
      text: "Make sure your branding, content, images, product ideas, and accounts are ready before we build.",
      url: "https://canva.link/zjpip29l66bd41u/",
    },
    {
      title: "Payhip Product + Link Sheet",
      description:
        "Use this sheet during class to organize your example Payhip products, prices, descriptions, and product links.",
      url: "https://canva.link/xsrm7bsrix4x5z1",
    },
    {
      title: "Website Testing Checklist",
      description:
        "Use this checklist before publishing to test your layout, buttons, Payhip links, website features, mobile view, and final live site.",
      url: "https://canva.link/lgcrlz9tbn0virl",
    },
    {
      tag: "Workshop",
      title: "Build Your Website",
      text: "Follow the same simple flow from setup and Payhip through Sites, VS Code, testing, and publishing.",
      page: "website-workshop",
    },
    {
      tag: "Keep Going",
      title: "Your Progress",
      text: "Complete each workshop step to unlock your completion certificate.",
      page: "completion",
    },
  ],

  gettingStarted: {
    title: "Workshop Setup Check",
    intro:
      "Before we start building, make sure the basics are ready so the workshop can move quickly and smoothly.",
    cards: [
      {
        title: "Brand + Website Basics",
        text: "Have your business or website name, brand colors, logo if you have one, contact email, social links, a short About section, and a general idea of how you want your website to look.",
      },
      {
        title: "Images + Product Ideas",
        text: "Have a hero image, About image, and images for 2–3 example products. Bring the product names, prices, and short descriptions. We will create the Payhip products during class.",
      },
      {
        title: "Accounts + Tools",
        text: "Make sure you can log in to Payhip, ChatGPT Sites, VS Code, and the publishing platform we will use. No finished website or coding experience is required.",
      },
      {
        title: "Workshop Build",
        text: "Everyone will build the same one-page structure: announcement bar, navigation, hero, marquee, featured products, featured collection, About, carousel, email signup, contact, popup, and footer.",
      },
    ],
  },

  sessions: [
    {
      id: "website-workshop",
      title: "Build Your Website",
      intro:
        "Follow the workshop flow in order: Prep → Payhip → Build → Connect → Test → Publish.",
      lessons: [
        {
          id: "setup-check",
          tag: "Step 1",
          title: "Prep Your Website",
          instructions:
            "Confirm your branding, content, images, product ideas, and links before we start building.",
          prompt: `Help me prepare for a beginner-friendly one-page business or store website workshop.

Keep this fast and simple. Do not give me a long questionnaire. Ask only for the missing information I need for today's build, one item at a time.

I need to have ready:
• Business or website name
• Brand colors
• Logo, if I have one
• Hero image
• About image
• Images for 2–3 example products
• Product names
• Product prices
• Short product descriptions
• Contact email
• Social media links
• Short About text
• General website style or mood

The website we are building will use this shared one-page structure:
• Announcement bar
• Header and navigation
• Hero section
• Marquee
• Featured products
• Featured collection or highlight section
• About section
• Carousel or infinite scroll section
• Email signup
• Contact section
• Popup
• Footer

Do not ask me for Payhip product links yet. We are creating a few Payhip products during the workshop.

When everything needed is ready, give me one short summary of my website direction and end with:
“Your website prep is ready. Continue to Create Your Payhip Products.”`,
        },
        {
          id: "create-payhip-products",
          tag: "Step 2",
          title: "Create Your Payhip Products",
          instructions:
            "Create 2–3 example products, publish them, and save the correct product links for the website.",
          prompt: `Help me create 2–3 example products in Payhip for the website I am building today.

Guide me one small step at a time using beginner-friendly instructions. Do not turn this into a full Payhip course.

For each example product, help me:
• Add the product name
• Add the price
• Add the short description
• Add the product image
• Confirm the product is published and opens correctly
• Copy the correct Payhip product or checkout link
• Match that link to the correct product so I can use it on my website

Do not make me create my entire store. We only need enough products to learn the process and connect them to the website.

When the example products and links are ready, end with:
“Your Payhip products are ready. Continue to Build in Sites.”`,
        },
        {
          id: "build-sites",
          tag: "Step 3",
          title: "Build in Sites",
          instructions:
            "Build the complete one-page website using the shared workshop structure and your own branding, content, products, and images.",
          prompt: `Continue this same website project and build my complete one-page business or store website in ChatGPT Sites.

Use the branding, content, images, product information, and website direction already approved in this conversation. Do not ask me to repeat information I already provided.

Use this shared website structure in this order:
1. Announcement bar
2. Header and navigation
3. Hero section
4. Marquee
5. Featured products
6. Featured collection or highlight section
7. About section
8. Carousel or infinite scroll section
9. Email signup
10. Contact section
11. Popup
12. Footer

Include polished beginner-friendly bells and whistles such as smooth scrolling, hover effects, simple animations, a working marquee, a working carousel or infinite scroll, and a simple popup. Keep the website responsive and mobile-friendly.

Use my real products, images, wording, colors, and links where available. Connect the Payhip product links I created to the correct product buttons.

Do not add fake reviews, fake statistics, unrelated sections, complex JavaScript, fake tech graphics, or features I did not approve.

Keep the design clean, professional, polished, and easy to navigate.

When the website is built and looks close to finished, end with:
“Your website is built in Sites. Continue to Move to VS Code + Connect.”`,
        },
        {
          id: "finish-vscode",
          tag: "Step 4",
          title: "Move to VS Code + Connect",
          instructions:
            "Open the website files in VS Code, understand the basic file roles, connect everything, and make only the final fixes you actually need.",
          prompt: `Continue with the approved website already built in this same project. Do not rebuild or redesign it.

Create a downloadable, beginner-friendly VS Code version using only:

index.html
style.css
script.js
images folder

If the original ChatGPT Sites website uses React or another framework, convert it into plain static HTML, CSS, and JavaScript while preserving the approved design and content.

Do not include React, Next.js, TypeScript, Node.js, npm, Vite, package.json, dependencies, terminal commands, build tools, or framework files.

The website must work after I unzip the folder, open it in VS Code, and select “Open with Live Server.”

Preserve all approved wording, colors, fonts, spacing, images, sections, navigation, buttons, links, marquee, carousel or infinite scroll, popup, email signup area, animations, hover effects, and mobile styling.

Do not remove, rename, replace, or redesign unrelated working content or features.

Place simple editable link settings near the top of script.js for Payhip, contact, website, and social links. Clearly label where each link should be pasted.

Do not pretend the email form collects subscribers if an email service has not been connected. Clearly tell me what signup link or form service is still needed.

Test the files for syntax errors, broken local file paths, missing files, navigation problems, mobile issues, and broken interactions before giving them to me.

Deliver everything in one ZIP folder. After I download it, guide me one small step at a time:

1. Extract the ZIP.
2. Open the complete folder in VS Code.
3. Open index.html with Live Server.

Do not give me multiple steps at once.
”`,
        },
        {
          id: "test-publish",
          tag: "Step 5",
          title: "Test + Publish",
          instructions:
            "Check the complete website, fix only what is broken, publish it, and test the live version one final time.",
          prompt: `Continue with the finished website from this project. Help me test and publish it one small step at a time.

Check:
• Desktop view
• Mobile view
• Navigation
• Every button
• Every Payhip product link
• Social links
• Contact links
• Images
• Marquee
• Carousel or infinite scroll
• Popup
• Email signup
• Simple animations and interactions
• Product names and prices
• Spelling and missing content

If something is broken, explain ONE exact fix at a time. Do not redesign the website while testing and do not change anything unrelated.

After everything passes, help me save a final backup, publish the website using the workshop publishing method, open the live URL, and test the main features again.

When the live website passes the final check, end with:
“Your website is tested, published, and ready to share.”`,
        },
      ],
    },
  ],

  resources: [
    {
      title: "ChatGPT",
      description: "Plan, build, revise, and guide your website workflow.",
      url: "https://chatgpt.com/",
    },
    {
      title: "Payhip",
      description:
        "Create your example products and copy the correct product links.",
      url: "https://payhip.com/",
    },
    {
      title: "VS Code",
      description:
        "Open your website files, make final edits, and connect everything safely.",
      url: "https://code.visualstudio.com/",
    },
    {
      title: "Website Workshop Setup Guide",
      description:
        "Open your beginner-friendly setup guide, visual references, ChatGPT prompts, and workshop checklist.",
      url: "https://canva.link/zjpip29l66bd41u/",
    },
  ],

  replays: [
    {
      title: "Website Workshop Replay",
      description:
        "The workshop replay will be added here after the live session.",
      url: "#",
    },
  ],

  help: [
    {
      title: "Where do I begin?",
      text: "Open Workshop Setup Check first. Then follow the workshop steps in order without jumping ahead.",
    },
    {
      title: "Do my Payhip products need to be ready before class?",
      text: "No. Bring the information and images for 2–3 example products. We will create those products and copy the links together during class.",
    },
    {
      title: "Do I need coding experience?",
      text: "No. Sites does the main build. VS Code is used to understand the files, make final changes, connect links, and fix only what is needed.",
    },
    {
      title: "What if I am missing something?",
      text: "Use a simple placeholder so you can keep moving. Replace it later instead of stopping the entire build.",
    },
    {
      title: "What if something breaks in VS Code?",
      text: "Change only the specific item that needs fixing. Do not replace or redesign unrelated working sections or files.",
    },
  ],

  completion: {
    title: "Website Workshop Complete",
    message:
      "You prepped your website, created Payhip products, built in Sites, finished in VS Code, tested, and published your website.",
    buttonText: "View My Certificate",
    diplomaUrl: "diploma.html",
  },
};
