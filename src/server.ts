import express from "express";
import {
  ADVENTURE_ADMIN,
  MYSTERIOUS_ROBED_FIGURE,
} from "./constants/characters";
import { CAVE_EXTERIOR, HANDFORTH_PARISH_COUNCIL } from "./constants/locations";

const app = express();

app.get("/", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text: "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

app.get("/help", (req, res) => {
  res.json({
    location: HANDFORTH_PARISH_COUNCIL,
    speech: {
      speaker: ADVENTURE_ADMIN,
      text: "This is the endpoint adventure! It's based on the classic 'choose your own adventure' books of ye olden 20th century times. When you visit an endpoint, you're presented with a scene and some text, and then you have a few options to choose from - your simulate turning to a new page by hitting a new endpoint.",
    },
    options: {
      backToStart: "/",
    },
  });
});

app.get("/quest/accept", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text: "Ah, yes, that is a wise decision. Now, tell me, what sort of questing experience do you have?",
    },
    options: {
      rookie: "/quest/start/easy",
      pro: "/quest/start/hard",
      "completed it, m8": "/quest/start/impossible",
    },
  });
});

app.get("/quest/decline", (req, res) => {
  res.json({
    location: "Apocalypse",
    speech: {
      speaker: {
        name: "Titan, Destroyer of Worlds",
        description: "A short but fierce looking demon-thing",
      },
      text: "You FOOL! You have made a mistake. Now you will suffer.",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/impossible", (req, res) => {
  res.json({
    location: "Death's Domain",
    speech: {
      speaker: {
        name: "Death",
      },
      text: "It seems you have died a excruciating death from a dragon's fireball! Welcome to my domain...",
    },
    options: {
      restart: "/",
    },
  });
});

app.get("/quest/start/easy", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text: "A newbie adventurer? Ha-ha, this should be interesting! Your quest is to locate a nest of Dragons somewhere in these lands, DON'T ask me why. Which town would you like to start in?",
    },
    options: {
      town1: "/quest/start/lumbridge",
      town2: "/quest/start/varrock",
    },
  });
});

app.get("/quest/start/hard", (req, res) => {
  res.json({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
      text: "A veteran adventurer? Well then... we'll see how you fare with this challenge! Your quest is to locate a nest of Dragons somewhere in these lands, DON'T ask me why. Which town would you like to start in?",
    },
    options: {
      town1: "/quest/start/kourend",
      town2: "/quest/start/ardougne",
    },
  });
});

app.get("/quest/start/ardougne", (req, res) => {
  res.json({
    location: "Ardougne West Bank",
    speech: {
      speaker: {
        name: "Ardougne Knight",
        text: "Have you seen any pickpockets around here?! I keep losing my coins... -oh sorry you want to know about a dragon? Can't say I've seen one near the bank mate! Try Wizard Cromperty or Probita at the pet shop",
      },
    },
    options: {
      wizard: "/quest/ardougne/wizard",
      probita: "/quest/ardougne/probita",
    },
  });
});

app.get("/quest/start/varrock", (req, res) => {
  res.json({
    location: "Varrock Square",
    speech: {
      speaker: {
        name: "Gypsy Lady",
        text: "Would ya like your palms read?? Have I had visions of dragons?... well yes actually, are you a mind reader?! I saw the Varrock knight Sir Prysin and the King's mage Surok Magis fighting one near Edgeville village in my vision.. maybe they're already there?! ",
      },
    },
    options: {
      varrockPalace: "/quest/varrockPalace/",
      edgeville: "/quest/edgeville/",
    },
  });
});

app.get("/quest/start/kourend", (req, res) => {
  res.json({
    location: "Kourend Castle",
    speech: {
      speaker: {
        name: "Hosa - Hosidius architect",
        text: "Are you here about the statue? You're not? --- What's this about dragons?!! Please go and tell one of the other heads of houses immediately! I'd suggest Arcis in Arceuus or Shayda in Shayzien",
      },
    },
    options: {
      arcis: "/quest/kourend/arcis",
      shayda: "/quest/kourend/shayda",
    },
  });
});

export default app;
