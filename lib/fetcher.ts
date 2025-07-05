export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", {
      status: res.status,
      statusText: res.statusText,
      body: text,
    });
    throw new Error(text || "Something went wrong");
  }

  return res.json();
}
