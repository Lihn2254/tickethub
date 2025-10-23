export async function login(email: string, password: string): Promise<User> {
  const res = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email, password}),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Invalid credentials.");
  }

  return res.json();
}