// src/data/worldContent.js

export const worldContent = {
  // 1. Bedroom Observatory Object Markers & Tiny Overlays
  observatory: {
    roomColor: "#0a0a23", // Classic Serial Experiments Lain Deep Blue
    objects: {
      laptop: { 
        name: "HP Workstation", 
        miniInfo: "Main compilation rig. Powering full-stack architecture and backend servers." 
      },
      books: { 
        name: "Story Blueprints", 
        miniInfo: "A collection of screenplays, digital world building, and narrative scripts." 
      },
      basketball: { 
        name: "Conditioning Sphere", 
        miniInfo: "Calisthenics logs, grip strength gear, and physical court splits." 
      },
      todoList: { 
        name: "System Tasks", 
        miniInfo: "Current Milestone: Deploy decentralized USSD AI Agents globally." 
      }
    }
  },

  // 2. Linear Tour District Progression (Workshop -> Greenhouse -> Lab -> Court -> Void Edge)
  districts: {
    workshop: {
      id: "workshop",
      name: "The Dev Workshop",
      guideName: "Hacker Zee",
      avatar: "🤖",
      dialogue: "Connection established. This terminal node handles my smart contracts and full-stack environments. Take a look at my compiled logic registries.",
      nextDistrict: "greenhouse",
      projects: [
        {
          id: "naysa-tutor",
          title: "Naysa AI Audio Tutor",
          tag: "AI // SPEECH",
          description: "An audio-driven tutor turning educational documents into spoken summaries with specific regional accents.",
          link: "https://github.com/ozzy-sensei",
          isDeployed: true
        },
        {
          id: "ows-agent",
          title: "USSD Treasury AI Agent",
          tag: "WEB3 // OWS",
          description: "Built for the OWS Hackathon, permitting secure financial treasury management via feature phone short-code dialers.",
          link: "https://github.com/ozzy-sensei",
          isDeployed: true
        }
      ]
    },
    greenhouse: {
      id: "greenhouse",
      name: "The Idea Greenhouse",
      guideName: "Artisanal Zee",
      avatar: "🌱",
      dialogue: "Welcome to the incubator. These crystalline formations house visual aesthetics, static media elements, and graphic layout grids.",
      nextDistrict: "lab",
      projects: [
        {
          id: "mysky-gifs",
          title: "MySky Dynamic Visuals",
          tag: "DESIGN // GIF",
          description: "A comprehensive retro-cyberpunk cell-shaded static GIF asset library built for clean ecosystem layout frameworks.",
          link: "https://x.com/Senseii_ciel",
          isDeployed: false
        }
      ]
    },
    lab: {
      id: "lab",
      name: "The Tech Lab",
      guideName: "Researcher Zee",
      avatar: "🧬",
      dialogue: "You've reached the experimental pipeline. This section tracks systems testing and raw blockchain node logic benchmarking.",
      nextDistrict: "court",
      projects: [
        {
          id: "blockchain-orchestra",
          title: "Blockchain Orchestra Core",
          tag: "WEB3 // AUDIO",
          description: "Mapped active on-chain block transactions directly to distinct algorithmic synth notes for real-time reactivity.",
          link: "https://github.com/ozzy-sensei",
          isDeployed: true
        }
      ]
    },
    court: {
      id: "court",
      name: "The Training Court",
      guideName: "Stamina Zee",
      avatar: "🏀",
      dialogue: "Welcome to the court layout. This represents physical execution, workout splits, and creative content sprint mechanics.",
      nextDistrict: "void",
      projects: [
        {
          id: "workout-production",
          title: "High-Intensity Media Splits",
          tag: "CREATIVE // VIDEO",
          description: "High-cadence editing structures engineered for fast-paced short-form creative content distributions.",
          link: "https://x.com/Senseii_ciel",
          isDeployed: true
        }
      ]
    },
    void: {
      id: "void",
      name: "The Fractured Edge",
      guideName: "System Outpost",
      avatar: "👁️",
      dialogue: "Warning: You have reached the physical boundaries of the floating node layout. Complete the security questions to survive the vacuum fall.",
      nextDistrict: null,
      quiz: [
        { question: "Is Web3 entirely dependent on centralized cloud hosting architectures?", answer: "No" },
        { question: "Do smart contracts execute independently once parameters align on-chain?", answer: "Yes" }
      ],
      projects: []
    }
  }
};
