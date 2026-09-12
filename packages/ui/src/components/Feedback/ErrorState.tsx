"use client";

import React from "react";

interface ErrorStateProps {
  message?: string;
  error?: Error;
  onRetry?: () => void;
  onDismiss?: () => void;
}

function getFriendlyMessage(error?: Error, message?: string): string {
  if (message) return message;
  if (!error) return "Something went wrong. Please try again.";

  const msg = error.message.toLowerCase();

  if (msg.includes("failed to fetch") || msg.includes("networkerror") || msg.includes("network")) {
    return "Network error. Please check your connection and try again.";
  }
  if (msg.includes("rate limit") || msg.includes("429") || msg.includes("quota") || msg.includes("too many")) {
    return "Too many requests. Please wait a moment and try again.";
  }
  if (msg.includes("401") || msg.includes("api key") || msg.includes("unauthorized") || msg.includes("authentication")) {
    return "Authentication error. The service is temporarily unavailable.";
  }
  if (msg.includes("timeout") || msg.includes("timed out")) {
    return "The request timed out. Please try again.";
  }
  if (msg.includes("503") || msg.includes("service unavailable")) {
    return "The service is temporarily unavailable. Please try again shortly.";
  }
  if (msg.includes("500") || msg.includes("internal server")) {
    return "Something went wrong on our end. Please try again.";
  }

  // If the error message is already user-friendly (starts with uppercase, no stack trace), use it
  if (error.message && error.message[0] === error.message[0].toUpperCase() && !error.message.includes("\n")) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function ErrorState({ error, message, onRetry, onDismiss }: ErrorStateProps) {
  const friendlyMessage = getFriendlyMessage(error, message);

  return (
    <div className="flex justify-center animate-chatbot-fade-in">
      <div className="relative flex flex-col items-center gap-2 rounded-chatbot border border-chatbot-error/20 bg-chatbot-error/5 px-4 py-3 text-center max-w-sm">
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-1.5 right-1.5 p-0.5 text-chatbot-error/50 hover:text-chatbot-error transition-colors"
            aria-label="Dismiss error"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-chatbot-error">
          <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
        <p className="text-chatbot-sm text-chatbot-error">{friendlyMessage}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-chatbot bg-chatbot-error px-3 py-1 text-chatbot-sm text-white hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
