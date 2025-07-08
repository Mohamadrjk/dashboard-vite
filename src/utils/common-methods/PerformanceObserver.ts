// utils/showExternalDomains.ts
export function showExternalDomains(): void {
  const externalDomains = new Set<string>();

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const resource = entry as PerformanceResourceTiming;
      const url = new URL(resource.name);

      // فقط دامین‌هایی غیر از دامین اصلی خودمون
      if (url.hostname !== window.location.hostname) {
        externalDomains.add(url.origin);
      }
    });

    console.log(
      "%c🔗 External Domains Used in this Page:",
      "color: #00b894; font-weight: bold;"
    );
    console.table(Array.from(externalDomains));
    console.log(
      "%c📎 پیشنهاد: اینارو تو layout.tsx با preconnect یا dns-prefetch استفاده کن",
      "color: orange"
    );
  });

  observer.observe({ entryTypes: ["resource"] });
}
