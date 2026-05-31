export const generateImage = async (prompt: string) => {
  const response = await fetch("http://localhost:5000/api/generate/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);

  return data.imageUrl;
};