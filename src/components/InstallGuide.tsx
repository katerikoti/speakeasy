const STEPS = [
  "Open the app in your phone's browser.",
  "On iPhone or iPad: tap the Share button, then choose \"Add to Home Screen\".",
  "On Android: open it in Chrome, tap the ⋮ menu, then choose \"Add to Home Screen\" (or \"Install app\").",
  "Find the Speakeasy icon on your home screen and tap it to open the app.",
];

export function InstallGuide() {
  return (
    <ol className="flex flex-col gap-2">
      {STEPS.map((step, index) => (
        <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linen text-xs font-semibold text-ink ring-1 ring-bone/60">
            {index + 1}
          </span>
          <span className="text-ink">{step}</span>
        </li>
      ))}
    </ol>
  );
}
