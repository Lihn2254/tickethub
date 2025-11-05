export async function login(email: string, password: string): Promise<User> {
  const res = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Invalid credentials.");
  }

  return res.json();
}

// function mapDataToUser(data: any): Client | Organization {
//   if data
  
//   return user;
// }

export async function checkDuplicate(text: string): Promise<boolean> {
  const res = await fetch("http://localhost:8080/api/user/check-duplicate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const isAvailable: boolean = await res.json();
  return isAvailable;
}

export async function register(user: User): Promise<User> {
  const res = await fetch("http://localhost:8080/api/user/register", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return res.json();
}

export async function deleteAccount(user: User): Promise<boolean> {
  const res = await fetch("http://localhost:8080/api/user/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const wasDeleted: boolean = await res.json();
  return wasDeleted;
}