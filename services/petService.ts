import { Pet } from "@/types/models";
import { request } from "./apiConstants";

export async function getPets(userId: string): Promise<Pet[]> {
  return request<Pet[]>(`/users/${userId}/pets`, {});
}
export async function getPetById(userId: string, petId: string): Promise<Pet> {
  return request<Pet>(`/users/${userId}/pets/${petId}`, {});
}
export async function postPet(
  userId: string,
  pet: Omit<Pet, "id" | "userId">,
): Promise<Pet> {
  return request<Pet>(`/users/${userId}/pets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
}

export async function putPet(
  userId: string,
  pet: Omit<Pet, "userId">,
): Promise<Pet> {
  return request<Pet>(`/users/${userId}/pets/${pet.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
}
export async function deletePet(userId: string, petId: string): Promise<void> {
  return request<void>(`/users/${userId}/pets/${petId}`, {
    method: "DELETE",
  });
}
