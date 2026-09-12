import { sendRuntimeMessage } from "../lib/protocol";
import type { ChatTurn, Citation } from "../lib/types";

const pageTitleEl = document.getElementById("page-title")!;
const pageUrlEl = document.getElementById("page-url")!;
const refreshBtn = document.getElementById("refresh-btn") as HTMLButtonElement;
const keyBanner = document.getElementById("key-banner") as HTMLDivElement;
const openSettingsBtn = document.getElementById("open-settings-btn") as HTMLButtonElement;
const unavailableBanner = document.getElementById("unavailable-banner") as HTMLDivElement;
const messagesEl = document.getElementById("messages") as HTMLDivElement;
const emptyState = document.getElementById("empty-state") as HTMLDivElement;
const suggestionsEl = document.getElementById("suggestions") as HTMLDivElement;
const composer = document.getElementById("composer") as HTMLFormElement;
const questionInput = document.getElementById("question-input") as HTMLTextAreaElement;
const sendBtn = document.getElementById("send-btn") as HTMLButtonElement;

let currentTabId: number | null = null;
let currentUrl: string | null = null;
let history: ChatTurn[] = [];
let pending = false;

function shortHeadingLabel(text: string, max = 34): string {
  const trimmed = text.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

function renderMessages() {
  messagesEl.querySelectorAll(".msg, .citations").forEach((el) => el.remove());
  emptyState.hidden = history.length > 0;

  for (const turn of history) {
    const bubble = document.createElement("div");
    bubble.className = `msg ${turn.role}`;
    if (turn.role === "assistant" && turn.found === false) bubble.classList.add("not-found");
    bubble.textContent = turn.text;
    messagesEl.appendChild(bubble);

    if (turn.role === "assistant" && turn.citations && turn.citations.length > 0) {
      const row = document.createElement("div");
      row.className = "citations";
      turn.citations.forEach((citation, idx) => {
        row.appendChild(buildCitationChip(citation, idx));
      });
      messagesEl.appendChild(row);
    }
  }
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function buildCitationChip(citation: Citation, idx: number): HTMLButtonElement {
  const chip = document.createElement("button");
  chip.className = "citation-chip";
  const label = citation.quote ? shortHeadingLabel(citation.quote) : `Source ${idx + 1}`;
  chip.textContent = `📍 ${label}`;
  chip.title = citation.quote || "Jump to source";
  chip.addEventListener("click", () => {
    if (currentTabId == null) return;
    sendRuntimeMessage({ type: "HIGHLIGHT", tabId: currentTabId, blockId: citation.blockId });
  });
  return chip;
}

function appendLoadingBubble(): HTMLDivElement {
  const bubble = document.createElement("div");
  bubble.className = "msg loading";
  bubble.textContent = "Reading the page…";
  messagesEl.appendChild(bubble);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return bubble;
}

function setPending(next: boolean) {
  pending = next;
  sendBtn.disabled = pending || questionInput.value.trim().length === 0;
  questionInput.disabled = pending;
}

async function sendQuestion(question: string) {
  if (currentTabId == null || pending) return;
  const priorHistory = [...history];
  history.push({ role: "user", text: question });
  renderMessages();
  questionInput.value = "";
  setPending(true);
  const loadingBubble = appendLoadingBubble();

  const res = await sendRuntimeMessage({
    type: "ASK",
    tabId: currentTabId,
    question,
    history: priorHistory,
  });

  loadingBubble.remove();
  setPending(false);

  if (!res.ok) {
    history.push({ role: "assistant", text: res.error, found: false });
  } else if (res.type === "ASK") {
    history.push({
      role: "assistant",
      text: res.answer.answer,
      citations: res.answer.citations,
      found: res.answer.found,
      sectionTitle: res.answer.sectionTitle,
    });
  }
  renderMessages();
}

async function checkApiKeyBanner() {
  const res = await sendRuntimeMessage({ type: "GET_API_KEY_STATUS" });
  keyBanner.hidden = !(res.ok && res.type === "GET_API_KEY_STATUS" && !res.hasKey);
}

function updateHeader(title: string, url: string) {
  pageTitleEl.textContent = title || "Untitled page";
  pageUrlEl.textContent = url;
  const readable = /^https?:/.test(url);
  unavailableBanner.hidden = readable;
}

async function refreshForTab(tab: chrome.tabs.Tab | undefined) {
  if (!tab || tab.id == null) {
    updateHeader("No page open", "");
    unavailableBanner.hidden = false;
    currentTabId = null;
    return;
  }
  const urlChanged = tab.url !== currentUrl;
  currentTabId = tab.id;
  currentUrl = tab.url ?? null;
  updateHeader(tab.title ?? "", tab.url ?? "");
  if (urlChanged) {
    history = [];
    renderMessages();
  }
}

async function getActiveTab(): Promise<chrome.tabs.Tab | undefined> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

composer.addEventListener("submit", (e) => {
  e.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;
  sendQuestion(question);
});

questionInput.addEventListener("input", () => {
  sendBtn.disabled = pending || questionInput.value.trim().length === 0;
  questionInput.style.height = "auto";
  questionInput.style.height = `${Math.min(questionInput.scrollHeight, 120)}px`;
});

questionInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    composer.requestSubmit();
  }
});

suggestionsEl.addEventListener("click", (e) => {
  const target = (e.target as HTMLElement).closest<HTMLButtonElement>(".chip");
  if (!target) return;
  const prompt = target.dataset.prompt;
  if (prompt) sendQuestion(prompt);
});

refreshBtn.addEventListener("click", async () => {
  if (currentTabId == null) return;
  history = [];
  renderMessages();
  await sendRuntimeMessage({ type: "EXTRACT_PAGE", tabId: currentTabId, force: true });
});

openSettingsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  refreshForTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.status === "complete") {
    refreshForTab(tab);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && "geminiApiKey" in changes) {
    checkApiKeyBanner();
  }
});

sendBtn.disabled = true;

(async function init() {
  await Promise.all([refreshForTab(await getActiveTab()), checkApiKeyBanner()]);
})();
