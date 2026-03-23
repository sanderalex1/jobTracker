const BASE_URL = "http://localhost:3000/api/v1/applications";

async function request(endpoint = "") {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  try {
    const jsonData = await res.json();
    return jsonData;
  } catch (e) {
    throw new Error("No Json Data");
  }
}
