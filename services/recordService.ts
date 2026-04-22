import { MedicalRecord } from "@/types/models";
import { request } from "./apiConstants";

export async function postRecord(
  userId: string,
  petId: string,
  medicalRecord: Omit<MedicalRecord, "id" | "petId">,
): Promise<MedicalRecord> {
  return request<MedicalRecord>(`/users/${userId}/pets/${petId}/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicalRecord),
  });
}

export async function putRecord(
  userId: string,
  petId: string,
  medicalRecord: Omit<MedicalRecord, "petId">,
): Promise<MedicalRecord> {
  return request<MedicalRecord>(
    `/users/${userId}/pets/${petId}/records/${medicalRecord.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicalRecord),
    },
  );
}
export async function deleteRecord(
  userId: string,
  petId: string,
  medicalRecord: MedicalRecord,
): Promise<void> {
  return request<void>(
    `/users/${userId}/pets/${petId}/records/${medicalRecord.id}`,
    {
      method: "DELETE",
    },
  );
}
