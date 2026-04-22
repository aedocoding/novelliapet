import { User } from "../types/models";
import { request } from "./apiConstants";

export async function registerUser(username: string): Promise<User> {
  return request<User>("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
}

export async function loginUser(username: string): Promise<User> {
  return request<User>("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
}
export async function logoutUser(userId: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/users/${userId}/logout`, {
    method: "POST",
  });
}
