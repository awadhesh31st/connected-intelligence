import { clearApiKey, DEFAULT_MODEL, getApiKey, getModel, setApiKey, setModel } from "../lib/storage";
import { testApiKey } from "../lib/llm";

const form = document.getElementById("settings-form") as HTMLFormElement;
const apiKeyInput = document.getElementById("api-key") as HTMLInputElement;
const modelSelect = document.getElementById("model") as HTMLSelectElement;
const testBtn = document.getElementById("test-btn") as HTMLButtonElement;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;
const statusEl = document.getElementById("status") as HTMLParagraphElement;

function setStatus(message: string, kind: "ok" | "error" | "" = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`.trim();
}

async function load() {
  const [apiKey, model] = await Promise.all([getApiKey(), getModel()]);
  if (apiKey) apiKeyInput.value = apiKey;
  modelSelect.value = model || DEFAULT_MODEL;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    setStatus("Enter an API key first.", "error");
    return;
  }
  await setApiKey(apiKey);
  await setModel(modelSelect.value);
  setStatus("Saved.", "ok");
});

testBtn.addEventListener("click", async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    setStatus("Enter an API key first.", "error");
    return;
  }
  testBtn.disabled = true;
  setStatus("Testing...");
  try {
    const ok = await testApiKey(apiKey);
    setStatus(ok ? "Key works." : "Key was rejected by Google.", ok ? "ok" : "error");
  } catch {
    setStatus("Couldn't reach Gemini. Check your connection.", "error");
  } finally {
    testBtn.disabled = false;
  }
});

clearBtn.addEventListener("click", async () => {
  await clearApiKey();
  apiKeyInput.value = "";
  setStatus("API key cleared.", "ok");
});

load();
