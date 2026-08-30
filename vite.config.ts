// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

function zoneEditor() {
  return {
    name: "local-zone-editor",
    apply: "serve" as const,
    configureServer(server: { middlewares: { use: (path: string, handler: (req: any, res: any) => void) => void } }) {
      server.middlewares.use("/__save-zone", async (req, res) => {
        if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }
        let body = "";
        req.on("data", (chunk: string) => { body += chunk; });
        req.on("end", async () => {
          try {
            const { id, shape } = JSON.parse(body);
            if (typeof id !== "string" || !Array.isArray(shape) || shape.some((p: unknown) => !Array.isArray(p) || p.length !== 2)) throw new Error("Invalid shape");
            const file = resolve(process.cwd(), "src/routes/masterplan.tsx");
            const source = await readFile(file, "utf8");
            const zone = new RegExp(`(id: "${id}"[\\s\\S]*?shape: \\[)([\\s\\S]*?)(\\r?\\n    \\],)`).exec(source);
            if (!zone) throw new Error("Zone not found");
            const points = shape.map((p: number[], i: number) => `\n      [${Number(p[0].toFixed(2))}, ${Number(p[1].toFixed(2))}], // point ${i}`).join("");
            await writeFile(file, source.replace(zone[0], `${zone[1]}${points}${zone[3]}`), "utf8");
            res.statusCode = 200; res.end(JSON.stringify({ ok: true }));
          } catch (error) { res.statusCode = 400; res.end(JSON.stringify({ error: String(error) })); }
        });
      });
    },
  };
}

export default defineConfig({
  vite: { plugins: [zoneEditor()] },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
