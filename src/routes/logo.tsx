import { createFileRoute } from "@tanstack/react-router";
import { logoUrl } from "@/components/site/Emblem";

export const Route = createFileRoute("/logo")({
  component: LogoPreview,
});

function LogoPreview() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f8f5f0] p-8">
      <img src={logoUrl} alt="Mandhara logo" className="max-h-[80vh] max-w-full object-contain" />
    </main>
  );
}
