export function trackAction(event: string, details?: Record<string, any>) {
  if (
    typeof window !== "undefined" &&
    typeof (window as any)?.umami !== "undefined"
  ) {
    (window as any)?.umami.track(event, details);
  }
}

// trackAction('reflection-submitted', { length: input.length });
