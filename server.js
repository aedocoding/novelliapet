const express = require("express");
const { randomUUID } = require("crypto");
const app = express();

app.use(express.json());

const store = {
  users: {}, // { [userId]: User }
  pets: {}, // { [petId]: Pet }
  records: {}, // { [recordId]: MedicalRecord }
};

// --- Users ---

app.post("/users", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username is required" });

  const existing = Object.values(store.users).find(
    (u) => u.username === username,
  );
  if (existing)
    return res.status(409).json({ error: "username already taken" });

  const user = { id: randomUUID(), username };
  store.users[user.id] = user;
  res.status(201).json(user);
});

app.post("/users/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username is required" });

  const user = Object.values(store.users).find((u) => u.username === username);
  if (!user) return res.status(404).json({ error: "user not found" });

  res.json(user);
});

app.post("/users/:userId/logout", (req, res) => {
  if (!store.users[req.params.userId])
    return res.status(404).json({ error: "user not found" });
  res.status(200).json({ message: "logged out" });
});

// --- Pets ---

app.get("/users/:userId/pets", (req, res) => {
  const { userId } = req.params;
  if (!store.users[userId])
    return res.status(404).json({ error: "user not found" });

  const pets = Object.values(store.pets).filter((p) => p.userId === userId);
  res.json(pets);
});

app.post("/users/:userId/pets", (req, res) => {
  const { userId } = req.params;
  if (!store.users[userId])
    return res.status(404).json({ error: "user not found" });

  const { name, animalType, breed, dateOfBirth, photo } = req.body;
  if (!name || !animalType)
    return res.status(400).json({ error: "name and animalType are required" });

  const pet = {
    id: randomUUID(),
    userId,
    name,
    animalType,
    breed,
    dateOfBirth,
    photo,
  };
  store.pets[pet.id] = pet;
  res.status(201).json(pet);
});

app.get("/users/:userId/pets/:petId", (req, res) => {
  const { userId, petId } = req.params;
  const pet = store.pets[petId];
  if (!pet || pet.userId !== userId)
    return res.status(404).json({ error: "pet not found" });

  const records = Object.values(store.records).filter((r) => r.petId === petId);
  res.json({ ...pet, records });
});

app.put("/users/:userId/pets/:petId", (req, res) => {
  const { userId, petId } = req.params;
  const pet = store.pets[petId];
  if (!pet || pet.userId !== userId)
    return res.status(404).json({ error: "pet not found" });

  const { name, animalType, breed, dateOfBirth, photo } = req.body;
  store.pets[petId] = { ...pet, name, animalType, breed, dateOfBirth, photo };
  res.json(store.pets[petId]);
});

app.delete("/users/:userId/pets/:petId", (req, res) => {
  const { userId, petId } = req.params;
  const pet = store.pets[petId];
  if (!pet || pet.userId !== userId)
    return res.status(404).json({ error: "pet not found" });

  delete store.pets[petId];
  Object.values(store.records)
    .filter((r) => r.petId === petId)
    .forEach((r) => delete store.records[r.id]);

  res.status(204).send();
});

// --- Records ---

function pickRecordFields(body) {
  const common = { type: body.type, name: body.name };
  if (body.type === "Vaccine")
    return { ...common, dateAdministered: body.dateAdministered };
  if (body.type === "Allergy")
    return { ...common, reactions: body.reactions, severity: body.severity };
  if (body.type === "Medication")
    return { ...common, dosage: body.dosage, instructions: body.instructions };
}


app.post("/users/:userId/pets/:petId/records", (req, res) => {
  const { userId, petId } = req.params;
  const pet = store.pets[petId];
  if (!pet || pet.userId !== userId)
    return res.status(404).json({ error: "pet not found" });

  const { type } = req.body;
  if (!["Vaccine", "Allergy", "Medication"].includes(type)) {
    return res
      .status(400)
      .json({ error: "type must be Vaccine, Allergy, or Medication" });
  }

  const record = { id: randomUUID(), petId, ...pickRecordFields(req.body) };
  store.records[record.id] = record;
  res.status(201).json(record);
});

app.put("/users/:userId/pets/:petId/records/:recordId", (req, res) => {
  const { userId, petId, recordId } = req.params;
  const pet = store.pets[petId];
  if (!pet || pet.userId !== userId)
    return res.status(404).json({ error: "pet not found" });

  const record = store.records[recordId];
  if (!record || record.petId !== petId)
    return res.status(404).json({ error: "record not found" });

  store.records[recordId] = { ...record, ...pickRecordFields(req.body), id: recordId, petId };
  res.json(store.records[recordId]);
});

app.delete("/users/:userId/pets/:petId/records/:recordId", (req, res) => {
  const { userId, petId, recordId } = req.params;
  const pet = store.pets[petId];
  if (!pet || pet.userId !== userId)
    return res.status(404).json({ error: "pet not found" });

  const record = store.records[recordId];
  if (!record || record.petId !== petId)
    return res.status(404).json({ error: "record not found" });

  delete store.records[recordId];
  res.status(204).send();
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
