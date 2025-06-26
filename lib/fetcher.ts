export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const text = await res.text(); // ← catch HTML, plain text, JSON etc.
    console.error("API error:", text); // 🔥 THIS WILL TELL YOU WHY
    throw new Error(text || "Something went wrong");
  }

  return res.json();
}
