import {
  deletePet,
  getPetById,
  getPets,
  postPet,
  putPet,
} from "@/services/petService";
import { deleteRecord, postRecord, putRecord } from "@/services/recordService";
import { MedicalRecord, Pet } from "@/types/models";
import { createContext, useContext, useState } from "react";
interface PetContextType {
  pets: Pet[] | null;
  fetchPets: (userId: string) => Promise<void>;
  fetchPet: (userId: string, petId: string) => Promise<void>;
  createPet: (userId: string, pet: Omit<Pet, "id" | "userId">) => Promise<void>;
  updatePet: (userId: string, pet: Omit<Pet, "userId">) => Promise<void>;
  removePet: (userId: string, petId: string) => Promise<void>;
  createRecord: (
    userId: string,
    petId: string,
    medicalRecord: Omit<MedicalRecord, "id" | "petId">,
  ) => Promise<void>;
  updateRecord: (
    userId: string,
    petId: string,
    medicalRecord: Omit<MedicalRecord, "petId">,
  ) => Promise<void>;
  removeRecord: (
    userId: string,
    petId: string,
    medicalRecord: MedicalRecord,
  ) => Promise<void>;
}

const PetContext = createContext<PetContextType | null>(null);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pets, setPets] = useState<Pet[] | null>(null);

  async function fetchPets(userId: string) {
    const data = await getPets(userId);
    setPets(data);
  }
  async function fetchPet(userId: string, petId: string) {
    const data = await getPetById(userId, petId);
    replacePetInList(data);
  }
  async function createPet(userId: string, pet: Omit<Pet, "id" | "userId">) {
    const newPet = await postPet(userId, pet);
    addPetToList(newPet);
  }

  async function updatePet(userId: string, pet: Omit<Pet, "userId">) {
    const updatedPet = await putPet(userId, pet);
    replacePetInList({ ...updatedPet, records: updatedPet.records ?? pet.records });
  }

  async function removePet(userId: string, petId: string) {
    await deletePet(userId, petId);
    removePetFromList(petId);
  }

  async function createRecord(
    userId: string,
    petId: string,
    medicalRecord: Omit<MedicalRecord, "id" | "petId">,
  ) {
    const newRecord = await postRecord(userId, petId, medicalRecord);
    addRecordToPet(petId, newRecord);
  }

  async function updateRecord(
    userId: string,
    petId: string,
    medicalRecord: Omit<MedicalRecord, "petId">,
  ) {
    const updatedRecord = await putRecord(userId, petId, medicalRecord);
    replaceRecordInPet(petId, updatedRecord);
  }

  async function removeRecord(
    userId: string,
    petId: string,
    medicalRecord: MedicalRecord,
  ) {
    await deleteRecord(userId, petId, medicalRecord);
    removeRecordFromPet(petId, medicalRecord.id);
  }

  function addPetToList(newPet: Pet) {
    setPets((prev) => [...(prev ?? []), newPet]);
  }

  function replacePetInList(updatedPet: Pet) {
    setPets((prev) =>
      (prev ?? []).map((p) => (p.id === updatedPet.id ? updatedPet : p)),
    );
  }

  function removePetFromList(petId: string) {
    setPets((prev) => (prev ?? []).filter((p) => p.id !== petId));
  }

  function addRecordToPet(petId: string, newRecord: MedicalRecord) {
    setPets((prev) =>
      (prev ?? []).map((p) =>
        p.id === petId
          ? { ...p, records: [...(p.records ?? []), newRecord] }
          : p,
      ),
    );
  }

  function replaceRecordInPet(petId: string, updatedRecord: MedicalRecord) {
    setPets((prev) =>
      (prev ?? []).map((p) =>
        p.id === petId
          ? {
              ...p,
              records: (p.records ?? []).map((r) =>
                r.id === updatedRecord.id ? updatedRecord : r,
              ),
            }
          : p,
      ),
    );
  }

  function removeRecordFromPet(petId: string, recordId: string) {
    setPets((prev) =>
      (prev ?? []).map((p) =>
        p.id === petId
          ? {
              ...p,
              records: (p.records ?? []).filter((r) => r.id !== recordId),
            }
          : p,
      ),
    );
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        fetchPets,
        fetchPet,
        updatePet,
        removePet,
        createPet,
        createRecord,
        updateRecord,
        removeRecord,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("usePet must be used within a Pet Provider");
  return ctx;
}
