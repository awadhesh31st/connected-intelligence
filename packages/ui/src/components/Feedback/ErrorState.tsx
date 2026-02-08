"use client";

import React from "react";

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex justify-center animate-chatbot-fade-in">
      <div className="flex flex-col items-center gap-2 rounded-chatbot border border-chatbot-error/20 bg-chatbot-error/5 px-4 py-3 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-chatbot-error">
          <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
        <p className="text-chatbot-sm text-chatbot-error">{error.message || "Something went wrong"}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-chatbot bg-chatbot-error px-3 py-1 text-chatbot-sm text-white hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
