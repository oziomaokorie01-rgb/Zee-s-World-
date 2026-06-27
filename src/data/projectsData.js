export const districtsData = {
  workshop: {
    name: "The Workshop",
    subtitle: "Smart Contract Development & Architecture",
    characterName: "Zee the Builder",
    // These will point to your transparent character art layers or Midjourney generations
    characterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80", 
    themeColor: "from-cyan-500/20 to-purple-500/10",
    accentGlow: "#00f0ff",
    bio: "Compiling smart contracts, optimizing mobile-first full-stack architectures, and managing automated scripts inside a deep purple cyberpunk terminal terminal.",
    projects: [
      { id: "pred-market", title: "Solana Prediction Market MVP", tag: "Web3" },
      { id: "ussd-agent", title: "USSD Agent-Coordinator", tag: "AI/SME" },
      { id: "mole-bot", title: "The Mole Telegram Game Bot", tag: "Automation" }
    ]
  },
  greenhouse: {
    name: "The Greenhouse",
    subtitle: "Digital Fashion & Retro Anime Lab",
    characterName: "Zee the Alchemist",
    characterImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    themeColor: "from-purple-500/20 to-pink-500/10",
    accentGlow: "#a855f7",
    bio: "Cultivating raw visual assets, styling digital fashion concepts, and generating intricate retro 90s anime illustrations.",
    projects: [
      { id: "airdrop-arcade", title: "Airdrop Arcade Branding", tag: "Design" },
      { id: "retro-fashion", title: "Digital Fashion Showreel", tag: "Art" }
    ]
  },
  // Lab, Court, and Void follow the exact same updated configuration...

lab: { name: "The Research Lab", subtitle: "Deep Tech & Things I'm Learning" },
            court: { name: "The Basketball Quarter", subtitle: "Lessons from the Game" },
              void: { name: "The Void", subtitle: "Abandoned Dreams & Unfinished Systems" }
              };
export const projects = [
                {
                    id: "naysa-tutor",
                        title: "Naysa (Senseii Study Buddy)",
                            district: "workshop",
                                status: "completed",
                                    logo: "🤖", // Replace with path to your logo asset later, e.g., "/assets/naysa.png"
                                        shortDesc: "An AI-powered tutor built to decode localized study notes.",
                                            longDesc: "A specialized system designed to parse, read out, and test users on complex academic materials using intuitive regional voice engines.",
                                                techStack: ["Next.js", "Streamlit", "Gemini API", "ElevenLabs"],
                                                    github: "https://github.com",
                                                        liveLink: "https://google.com"
                                                          },
                                                            {
                                                                id: "zenti-treasury",
                                                                    title: "Zenti Blockchain Treasury",
                                                                        district: "greenhouse",
                                                                            status: "sprout",
                                                                                logo: "📱",
                                                                                    shortDesc: "USSD-accessible treasury tooling for local SMEs.",
                                                                                        longDesc: "Bridging feature phones directly to high-velocity blockchain networks via simple phone dialer codes and automated translation logic.",
                                                                                            techStack: ["Solana", "Africa's Talking API", "Node.js"],
                                                                                                github: "https://github.com",
                                                                                                    liveLink: "https://google.com"
                                                                                                      }
                                                                                                      ];

