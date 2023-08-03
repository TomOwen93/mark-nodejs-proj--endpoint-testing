import supertest from "supertest";
import app from "./server";
import { MYSTERIOUS_ROBED_FIGURE } from "./constants/characters";
import { CAVE_EXTERIOR } from "./constants/locations";

test("GET / responds with a welcome message from our mysterious robed figure", async () => {
  const response = await supertest(app).get("/");

  expect(response.body).toStrictEqual({
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

test("GET /quest/accept has our mysterious robed figure give a couple of further choices", async () => {
  const response = await supertest(app).get("/quest/accept");

  // check the speaker and location are right
  expect(response.body).toMatchObject({
    location: CAVE_EXTERIOR,
    speech: {
      speaker: MYSTERIOUS_ROBED_FIGURE,
    },
  });

  // check the robed figure is saying something
  expect(typeof response.body.speech.text).toBe("string");

  // check that there are at least two further options
  expect(Object.keys(response.body.options).length).toBeGreaterThanOrEqual(2);
});

test("GET /quest/decline responds with an apocalyptic message", async () => {
  const response = await supertest(app).get("/quest/decline");

  // located in the apocalypse
  expect(response.body.location).toBe("Apocalypse");

  // aggro speaker
  expect(response.body.speech.speaker.name).toBe("Titan, Destroyer of Worlds");

  // some aggro message
  expect(response.body.speech.text).toMatch("FOOL");
  expect(response.body.speech.text).toMatch(/mistake/i);

  // only includes the option to restart
  expect(response.body.options).toStrictEqual({ restart: "/" });
});

test("GET /quest/start/impossible responds with instant 'death'", async () => {
  const response = await supertest(app).get("/quest/start/impossible");

  // there is _some_ location
  expect(response.body.location).toBeDefined();

  // there is _some_ speaker
  expect(response.body.speech.speaker.name).toBeDefined();

  // fiery death
  expect(response.body.speech.text).toMatch(/fireball/i);
  expect(response.body.speech.text).toMatch(/dragon/i);
  expect(response.body.speech.text).toMatch(/excruciating/i);

  // includes option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});

test("GET /help responds with useful game information", async () => {
  const response = await supertest(app).get("/help");

  //expect location:
  expect(response.body.location).toBeDefined();

  // there is _some_ speaker
  expect(response.body.speech.speaker.name).toBeDefined();

  // expect some game information
  expect(response.body.speech.text).toMatch(/simulate/i);
  expect(response.body.speech.text).toMatch(/adventure/i);
  expect(response.body.speech.text).toMatch(/endpoint/i);

  // includes option to restart
  expect(response.body.options).toMatchObject({ backToStart: "/" });
});

test("GET /quest/start/hard responds with veteran related speech and two hard town choices ", async () => {
  const response = await supertest(app).get("/quest/start/hard");

  expect(response.body.speech.speaker.name).toBeDefined();
  expect(response.body.location).toBeDefined();
  expect(response.body.options.town1).toMatch(/kourend/i);
  expect(response.body.speech.text).toMatch(/veteran/i);
});

test("GET /quest/start/easy responds with newbie related speech and two easy town choices", async () => {
  const response = await supertest(app).get("/quest/start/easy");

  expect(response.body.speech.speaker.name).toBeDefined();
  expect(response.body.location).toBeDefined();
  expect(response.body.options.town2).toMatch(/varrock/i);
  expect(response.body.speech.text).toMatch(/newbie/i);
});

test("GET /quest/start/varrock responds with speech from the gypsy lady and a choice of who to speak to from two palace officials", async () => {
  const response = await supertest(app).get("/quest/start/varrock");
  expect(response.body.speech.speaker.name).toBeDefined();
  expect(response.body.location).toMatch(/varrock/i);
  expect(response.body.options.varrockPalace).toMatch(/palace/i);
  expect(response.body.options.edgeville).toMatch(/edge/i);
});

test("GET /quest/start/ardougne responds with speech from an ardy knight and a choice of who to speak to a wizard or pet shop owner", async () => {
  const response = await supertest(app).get("/quest/start/ardougne");
  expect(response.body.speech.speaker.name).toMatch(/knight/i);
  expect(response.body.location).toMatch(/ardougne/i);
  expect(response.body.options.probita).toMatch(/prob/i);
  expect(response.body.options.wizard).toMatch(/wizard/i);
});

test("GET /quest/start/kourend responds with speech from the hosidius architect and a choice of who to speak from house arceuus or shazyien", async () => {
  const response = await supertest(app).get("/quest/start/kourend");
  expect(response.body.speech.speaker.name).toMatch(/hosa/i);
  expect(response.body.location).toMatch(/castle/i);
  expect(response.body.options.arcis).toMatch(/arcis/i);
  expect(response.body.options.shayda).toMatch(/shayda/i);
});
