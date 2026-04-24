
export type AnimalType = "Dog" | "Cat" | "Bird" | "Capybara";
export const AnimalTypeList: AnimalType[] = ["Dog", "Cat", "Bird", "Capybara"]
export type AllergyReaction =
  | "Hives"
  | "Rash"
  | "Swelling"
  | "Vomiting"
  | "Sneezing"
  | "Itching"
  | "Difficulty breathing";
export const AllergyOptions: AllergyReaction[] = [
  "Hives",
  "Rash",
  "Difficulty breathing",
  "Swelling",
  "Vomiting",
  "Sneezing",
  "Itching",
];
export type AllergySeverity = "Mild" | "Severe";
export const AllergySeverityList: AllergySeverity[] = ["Mild", "Severe"]

export interface User {
  id: string;
  username: string;
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  animalType: AnimalType;
  breed: string;
  dateOfBirth: string; // ISO date string
  photo?: string; // URI from camera or gallery
  records: MedicalRecord[];
}

export interface VaccineRecord {
  id: string;
  petId: string;
  type: "Vaccine";
  name: string;
  dateAdministered: string; // ISO date string
}

export interface AllergyRecord {
  id: string;
  petId: string;
  type: "Allergy";
  name: string;
  reactions: AllergyReaction[];
  severity: AllergySeverity;
}

export interface MedicationRecord {
  id: string;
  petId: string;
  type: "Medication";
  name: string;
  dosage: string;
  instructions: string;
}

export type MedicalRecord = VaccineRecord | AllergyRecord | MedicationRecord;

export const mockRecords: MedicalRecord[] = [
  {
    id: "1",
    petId: "pet-1",
    type: "Vaccine",
    name: "Rabies Vaccine",
    dateAdministered: "2023-01-15",
  },
  {
    id: "2",
    petId: "pet-1",
    type: "Allergy",
    name: "Flea Allergy",
    reactions: ["Itching", "Hives"],
    severity: "Mild",
  },
  {
    id: "3",
    petId: "pet-1",
    type: "Medication",
    name: "Pain Medication",
    dosage: "10mg",
    instructions: "Once daily with food",
  },
];
