import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { ShowcasePanel } from "@/components/site/HoverShowcase";
import { Eyebrow, Reveal, Section, SplitText } from "@/components/site/primitives";
import { img } from "@/lib/images";
import { CLUB, LAKE, NICQE, VILLAS } from "@/lib/project";

export const Route = createFileRoute("/masterplan")({
  head: () => ({
    meta: [
      { title: "Mandhara Masterplan — Five Zones, One Landscape" },
      {
        name: "description",
        content:
          "Explore the Mandhara masterplan: the Nicqe and Orion villa enclaves, the Rime resort, the Gemini club and event space, and Sheen Lake at the centre.",
      },
      { property: "og:title", content: "Mandhara Masterplan" },
      {
        property: "og:description",
        content: "An interactive look at the five zones that shape Mandhara.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Masterplan,
});

type Zone = {
  id: string;
  name: string;
  purpose: string;
  overview: string;
  features: string[];
  image: string;
  to: string;
  hash: string;
  linkLabel: string;
  secondary?: { to: string; label: string };
  /** Centroid of `shape`, in percent — tooltip/marker anchor and hub-line endpoint. */
  x: number;
  y: number;
  /** Zone boundary as [x%, y%] pairs against the masterplan image, clockwise. */
  shape: [number, number][];
};

const NICQE_FACTS = { ...NICQE, villas: VILLAS.nicqe };

/**
 * Zone roles come straight from the brochure masterplan (p.2). RIME is the
 * resort and GEMINI is the club/event space — the reverse of what this page
 * shipped with, which sent visitors looking for the wedding venue into resort
 * suite content and vice versa. ORION is the revenue-sharing villa enclave, not
 * an events venue.
 *
 * The x/y/shape values below are traced from the client's annotated aerial
 * (brochure masterplan with the five zone outlines drawn on it), registered
 * against this page's own masterplan image via shared landmarks — the lake,
 * the cricket ground, the clubhouse/pool cluster, and the spine road. That
 * source draws one boundary for the whole Nicqe+Orion villa sweep with no
 * line between them (Orion's 54 villas vs. Nicqe's 294 — see VILLAS), so the
 * split here is an estimate along the internal loop road, not a traced edge;
 * nudge `orion`/`nicqe` if it reads wrong against the real plot lines.
 */
const ZONES: Zone[] = [
  {
    id: "sheen",
    name: "SHEEN LAKE",
    purpose: "The Heart",
    overview:
      "The still centre of Mandhara — six acres of water with five landscaped islands, held by a kilometre of promenade.",
    features: [
      `${LAKE.acres} acres of water`,
      `${LAKE.islands} landscaped islands`,
      `${LAKE.promenadeKm} km promenade`,
      `${LAKE.aerators} water aerators`,
    ],
    image: img.evening,
    to: "/amenities",
    hash: "",
    linkLabel: "Walk the lakeside",
    x: 32.01,
    y: 18.46,
    // Shape points are zero-based: the first coordinate is point 0, then 1, 2, etc.
    // The debug view displays the same numbers as `sheen:0`, `sheen:1`, and so on.
    // Point numbers are zero-based and match the debug labels for this zone.
    shape: [
      [17.17, 10.9], // point 0
      [18.13, 9.06], // point 1
      [19.46, 7.8], // point 2
      [20.66, 6.79], // point 3
      [22.29, 6.37], // point 4
      [23.98, 6.21], // point 5
      [25.6, 5.79], // point 6
      [26.81, 4.53], // point 7
      [27.77, 3.27], // point 8
      [28.61, 2.52], // point 9
      [29.4, 1.34], // point 10
      [30.3, 0.92], // point 11
      [31.57, 0.67], // point 12
      [32.34, 1.7], // point 13
      [33.34, 2.7], // point 14
      [34.1, 4.28], // point 15
      [35.34, 4.7], // point 16
      [36.54, 4.7], // point 17
      [37.84, 5.7], // point 18
      [38.13, 6.88], // point 19
      [38.19, 8.47], // point 20
      [38.01, 10.4], // point 21
      [37.11, 11.82], // point 22
      [36.75, 13], // point 23
      [36.02, 14.09], // point 24
      [35.7, 15], // point 25
      [36.41, 16.55], // point 26
      [37.41, 15.55], // point 27
      [39.63, 14.63], // point 28
      [40.52, 14.14], // point 29
      [41.35, 13.32], // point 30
      [42.47, 13.75], // point 31
      [43.25, 14], // point 32
      [44.16, 13.58], // point 33
      [44.88, 13.16], // point 34
      [47.11, 11.57], // point 35
      [46.25, 12.25], // point 36
      [48.32, 10.2], // point 37
      [47.67, 11.02], // point 38
      [48.97, 10.36], // point 39
      [49.14, 12], // point 40
      [48.86, 13], // point 41
      [49.22, 14.67], // point 42
      [49.4, 16.27], // point 43
      [50.24, 16.6], // point 44
      [51.57, 17.36], // point 45
      [52.11, 18.61], // point 46
      [51.99, 20.21], // point 47
      [50.56, 21.78], // point 48
      [48.86, 22.64], // point 49
      [47.35, 23.64], // point 50
      [45.78, 24.23], // point 51
      [44.28, 24.9], // point 52
      [42.41, 25.82], // point 53
      [40.54, 27.08], // point 54
      [39.04, 27.75], // point 55
      [37.29, 28.51], // point 56
      [35.66, 29.43], // point 57
      [33.92, 30.18], // point 58
      [32.17, 30.85], // point 59
      [30.42, 31.27], // point 60
      [28.8, 32.03], // point 61
      [26.87, 32.78], // point 62
      [23.37, 34.29], // point 63
      [25.12, 33.28], // point 64
      [21.33, 34.96], // point 65
      [19.76, 35.46], // point 66
      [18.25, 35.21], // point 67
      [16.99, 34.63], // point 68
      [16.33, 34.12], // point 69
      [15.66, 32.95], // point 70
      [15.9, 31.19], // point 71
      [15.9, 30.01], // point 72
      [15.48, 28.59], // point 73
      [15.36, 26.91], // point 74
      [13.92, 24.82], // point 75
      [15, 25.74], // point 76
      [13.31, 24.65], // point 77
      [11.87, 24.23], // point 78
      [10.42, 23.56], // point 79
      [9.22, 22.47], // point 80
      [8.86, 21.04], // point 81
      [8.8, 18.95], // point 82
      [9.94, 17.02], // point 83
      [11.02, 16.1], // point 84
      [12.29, 14.67], // point 85
      [14.1, 13.83], // point 86
      [16.02, 12.83], // point 87
    ],
  },
  {
    id: "gemini",
    name: "GEMINI",
    purpose: "Club & Event Space",
    overview:
      "The celebration side of the estate: the event ground, the banquet hall, the celebration lawns and the Pavilion Club, with their own access and parking.",
    features: [
      "Event Ground",
      `Banquet Hall — ${CLUB.banquetSqFt}`,
      "Outdoor Restaurant",
      "Celebration Lawns",
      "Pavilion Club — cricket ground, pool, wedding rooms, gym",
    ],
    image: img.banquet,
    to: "/club",
    hash: "venues",
    linkLabel: "Open club venues",
    x: 30.12,
    y: 37.54,
    // Point numbers are zero-based and match the debug labels for this zone.
    shape: [
      [32.19, 29.62], // point 0
      [33.76, 29.19], // point 1
      [35.65, 28.16], // point 2
      [37.54, 27.29], // point 3
      [38.9, 27.29], // point 4
      [39.42, 29.04], // point 5
      [39.63, 31.52], // point 6
      [39.63, 34], // point 7
      [39.42, 36.63], // point 8
      [39.63, 39.25], // point 9
      [39.32, 41.73], // point 10
      [39, 44.21], // point 11
      [37.96, 48.15], // point 12
      [37.01, 51.51], // point 13
      [36.38, 55.6], // point 14
      [35.65, 59.1], // point 15
      [34.6, 62.02], // point 16
      [31.87, 63.04], // point 17
      [29.78, 60.56], // point 18
      [28.2, 58.81], // point 19
      [26.32, 56.33], // point 20
      [24.64, 53.84], // point 21
      [23.38, 51.8], // point 22
      [22.65, 49.32], // point 23
      [21.91, 46.55], // point 24
      [22.02, 44.07], // point 25
      [21.91, 40.86], // point 26
      [21.49, 37.5], // point 27
      [21.81, 34.73], // point 28
      [24.43, 32.54], // point 29
      [26.11, 32.1], // point 30
      [27.79, 31.37], // point 31
      [29.57, 30.21], // point 32
    ],
  },
  {
    id: "nicqe",
    name: "NICQE",
    purpose: "Villa Enclave",
    overview:
      "The main residential enclave — villas set along garden valleys, with two clubhouses of its own at the centre.",
    features: [
      `${NICQE_FACTS.villas} Villas`,
      `${NICQE_FACTS.clubhouses} Clubhouses`,
      `${NICQE_FACTS.gardenValleys} Garden Valleys`,
    ],
    image: img.villaValley,
    to: "/villas",
    hash: "nicqe",
    linkLabel: "Open the villa enclave",
    x: 67.98,
    y: 37.6,
    // Point numbers are zero-based and match the debug labels for this zone.
    shape: [
      [36.68, 55.9], // point 0
      [37.21, 53.68], // point 1
      [37.92, 51.7], // point 2
      [38.69, 50.14], // point 3
      [39.28, 48.25], // point 4
      [39.63, 46.61], // point 5
      [40.17, 44.64], // point 6
      [40.64, 42.58], // point 7
      [41.05, 40.61], // point 8
      [41.17, 39.21], // point 9
      [41.05, 37.32], // point 10
      [40.82, 35.43], // point 11
      [40.52, 30.74], // point 12
      [40.76, 33.21], // point 13
      [40.28, 28.69], // point 14
      [40.93, 27.21], // point 15
      [42.76, 26.47], // point 16
      [44.42, 25.24], // point 17
      [46.01, 24.66], // point 18
      [47.49, 23.92], // point 19
      [48.85, 22.94], // point 20
      [50.62, 22.36], // point 21
      [52.45, 21.05], // point 22
      [54.16, 20.06], // point 23
      [55.7, 18.99], // point 24
      [57.71, 17.68], // point 25
      [58.83, 16.85], // point 26
      [60.6, 15.62], // point 27
      [62.43, 14.8], // point 28
      [63.85, 13.32], // point 29
      [64.97, 12.17], // point 30
      [65.85, 11.82], // point 31
      [66.89, 12.11], // point 32
      [68.36, 12.84], // point 33
      [69.41, 12.99], // point 34
      [70.46, 14.16], // point 35
      [72.03, 14.74], // point 36
      [73.29, 15.62], // point 37
      [74.55, 16.35], // point 38
      [76.02, 17.22], // point 39
      [76.96, 17.95], // point 40
      [77.69, 18.39], // point 41
      [79.06, 19.26], // point 42
      [80.42, 19.99], // point 43
      [81.57, 20.58], // point 44
      [82.73, 21.6], // point 45
      [83.98, 22.77], // point 46
      [84.61, 23.79], // point 47
      [85.45, 25.68], // point 48
      [86.4, 25.98], // point 49
      [87.65, 26.85], // point 50
      [89.12, 27], // point 51
      [90.28, 27.58], // point 52
      [91.22, 28.46], // point 53
      [92.37, 29.77], // point 54
      [93.84, 30.21], // point 55
      [99.5, 32.4], // point 56
      [99.5, 58.95], // point 57
      [95.1, 71.79], // point 58
      [94.03, 75.05], // point 59
      [89.07, 88.28], // point 60
      [87.66, 89.35], // point 61
      [86.24, 88.78], // point 62
      [84.41, 88.37], // point 63
      [82.58, 87.54], // point 64
      [81.04, 87.21], // point 65
      [79.44, 86.97], // point 66
      [77.73, 86.72], // point 67
      [76.08, 86.8], // point 68
      [74.48, 86.89], // point 69
      [73.24, 86.64], // point 70
      [71.65, 87.21], // point 71
      [69.99, 87.63], // point 72
      [68.28, 88.04], // point 73
      [66.63, 88.61], // point 74
      [65.33, 88.2], // point 75
      [63.91, 86.72], // point 76
      [62.49, 84.34], // point 77
      [61.43, 82.2], // point 78
      [60.31, 80.31], // point 79
      [58.83, 78.5], // point 80
      [57.47, 76.53], // point 81
      [56.76, 74.88], // point 82
      [55.35, 73.32], // point 83
      [54.22, 72.34], // point 84
      [52.92, 71.27], // point 85
      [51.51, 70.2], // point 86
      [49.62, 68.8], // point 87
      [46.49, 66.5], // point 88
      [47.96, 67.82], // point 89
      [45.07, 65.51], // point 90
      [43.35, 64.61], // point 91
      [41.58, 63.71], // point 92
      [40.05, 62.97], // point 93
      [38.57, 61.9], // point 94
      [36.86, 61.16], // point 95
      [35.74, 60.83], // point 96
      [34.67, 59.76], // point 97
      [35.09, 58.77], // point 98
      [35.62, 57.54], // point 99
    ],
  },
  {
    id: "orion",
    name: "ORION",
    purpose: "Villa Enclave — Revenue Sharing",
    overview:
      "The investment product: villas owned outright but operated by the resort team, with access to the club amenities rather than a clubhouse of their own.",
    features: [
      `${VILLAS.orion} Villas`,
      "Access to Club Amenities",
      "Managed by Resort",
      "Revenue-sharing ownership",
    ],
    image: img.villaLake,
    to: "/villas",
    hash: "orion",
    linkLabel: "Open the revenue-sharing villas",
    secondary: { to: "/revenue", label: "See the revenue model" },
    x: 62.33,
    y: 62.22,
    // Point numbers are zero-based and match the debug labels for this zone.
    shape: [
      [43, 43.21],
      [50.1, 46.86],
      [58.22, 51.24],
      [66.33, 55.62],
      [74.44, 60],
      [81.54, 63.65],
      [87.63, 68.76],
      [80.53, 74.6],
      [73.43, 79.71],
      [66.33, 84.09],
      [61.76, 87.01],
      [63.29, 68.76],
      [60.24, 62.92],
      [55.68, 58.54],
      [50.1, 55.62],
      [44.02, 53.87],
      [43, 43.21],
    ],
  },
  {
    id: "rime",
    name: "RIME",
    purpose: "The Resort",
    overview:
      "The retreat: wellness, dining, pool and suites gathered on the estate's southern edge, open to guests and residents alike.",
    features: [
      "Retreat & Wellness Center",
      "Gym & Indoor Games",
      "Boutique + Specialty Restaurant",
      "Swimming Pool",
      "Outdoor Event Lawn",
      "Presidential, Standard & Junior Suites",
    ],
    image: img.resort,
    to: "/resort",
    hash: "facilities",
    linkLabel: "Open resort facilities",
    x: 31.77,
    y: 71.54,
    shape: [
      [18.25, 37.73], // point 0
      [16.87, 44.85], // point 1
      [10, 92.22], // point 2
      [10.36, 93.73], // point 3
      [11.45, 94.06], // point 4
      [12.83, 94.4], // point 5
      [38.25, 95.57], // point 6
      [39.7, 95.49], // point 7
      [58.67, 86.18], // point 8
      [57.89, 84.34], // point 9
      [57.05, 82.58], // point 10
      [56.33, 81.24], // point 11
      [55.84, 80.57], // point 12
      [55.3, 79.64], // point 13
      [54.52, 78.39], // point 14
      [53.49, 77.04], // point 15
      [52.53, 75.62], // point 16
      [51.27, 74.45], // point 17
      [49.76, 72.85], // point 18
      [48.19, 71.76], // point 19
      [46.39, 70.92], // point 20
      [44.76, 69.75], // point 21
      [43.07, 69.25], // point 22
      [41.51, 68.41], // point 23
      [39.58, 67.32], // point 24
      [37.89, 66.48], // point 25
      [36.2, 65.64], // point 26
      [34.46, 65.14], // point 27
      [33.07, 65.48], // point 28
      [31.57, 64.97], // point 29
      [30.06, 64.05], // point 30
      [28.55, 62.54], // point 31
      [27.47, 61.03], // point 32
      [26.2, 59.36], // point 33
      [25.04, 57.9], // point 34
      [24.07, 55.91], // point 35
      [23.25, 53.57], // point 36
      [22.47, 51.31], // point 37
      [21.75, 49.38], // point 38
      [21.2, 47.12], // point 39
      [20.9, 45.19], // point 40
      [20.9, 43.01], // point 41
      [20.9, 40.41], // point 42
      [21.02, 38.06], // point 43
    ],
  },
];

/**
 * Sits inside the Nicqe/Orion sweep with no boundary of its own in the source
 * reference — shown as a static label to match, not a clickable zone.
 */
const LAGOON_LABEL = { name: "LAGOON", purpose: "Club Area", x: 61.76, y: 47.88 };

function Masterplan() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [clicked, setClicked] = useState<string | null>(null);
  const [debugPoints] = useState(() =>
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("debug"),
  );
  const [debugSelected, setDebugSelected] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [editedShapes, setEditedShapes] = useState<Record<string, number[][]>>({});
  const [dragging, setDragging] = useState<{ id: string; index: number } | null>(null);
  const active = ZONES[index]!;

  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (clickTimer.current) clearTimeout(clickTimer.current);
  }, []);

  // Deep-link: read #zone-<id> on mount and keep the URL in sync with selection.
  useEffect(() => {
    const id = window.location.hash.replace("#zone-", "");
    const i = ZONES.findIndex((z) => z.id === id);
    if (i >= 0) setIndex(i);
  }, []);

  const select = useCallback((i: number, focusMarker = false) => {
    setIndex(i);
    if (debugPoints) {
      setDebugSelected(ZONES[i]!.id);
      setSelectedPoint(null);
    } else {
      setClicked(ZONES[i]!.id);
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => setClicked(null), 5000);
    }
    const next = `${window.location.pathname}#zone-${ZONES[i]!.id}`;
    window.history.replaceState(null, "", next);
    if (focusMarker) markerRefs.current[i]?.focus();
  }, []);

  const onMapKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((index + 1) % ZONES.length, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((index - 1 + ZONES.length) % ZONES.length, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(ZONES.length - 1, true);
    }
  };

  const preview = hovered ? ZONES.find((z) => z.id === hovered)! : active;
  const dialogZone = debugPoints ? null : clicked ?? hovered;
  const debugZone = debugSelected ?? hovered;
  const shapeFor = (z: Zone) => editedShapes[z.id] ?? z.shape;
  const saveShape = async (id: string) => {
    const shape = editedShapes[id];
    if (!shape) return;
    setSaveStatus("Saving points…");
    try {
      const response = await fetch("/__save-zone", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, shape }) });
      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Save failed");
      }
      setSaveStatus("Points saved");
    } catch (error) {
      setSaveStatus(error instanceof Error ? error.message : "Could not save points");
    }
  };
  const addPoint = () => {
    if (!debugZone) return;
    const z = ZONES.find((zone) => zone.id === debugZone)!;
    const shape = [...shapeFor(z)];
    const insertAt = selectedPoint ?? 0;
    const a = shape[insertAt] ?? [50, 50];
    const b = shape[(insertAt + 1) % shape.length] ?? a;
    const point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    shape.splice(insertAt + 1, 0, point);
    setEditedShapes((current) => ({ ...current, [z.id]: shape }));
    setSelectedPoint(insertAt + 1);
  };
  const deletePoint = () => {
    if (!debugZone || selectedPoint === null) return;
    const z = ZONES.find((zone) => zone.id === debugZone)!;
    const shape = [...shapeFor(z)];
    if (shape.length <= 3) return;
    shape.splice(selectedPoint, 1);
    setEditedShapes((current) => ({ ...current, [z.id]: shape }));
    setSelectedPoint(Math.min(selectedPoint, shape.length - 1));
  };

  return (
    <>
      <PageHero
        eyebrow="Masterplan"
        title="Five zones. One continuous landscape."
        intro="Hover any zone for its tooltip, click it to read the detail, or use the arrow keys to move between zones. Every road, valley and shoreline was drawn from the existing contour."
        image={img.masterplan}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div
              role="group"
              aria-label="Mandhara masterplan zones. Use arrow keys to move between zones."
              onKeyDown={onMapKeyDown}
              className="group relative overflow-hidden rounded-4xl soft-shadow outline-none"
            >
              {/*
                aspect-[] pinned to the photo's own ratio (1425x1024), not a fixed
                height + object-cover — the zone shapes below are traced in the
                photo's own percent space, and object-cover would crop the image
                to fill an arbitrary box while the SVG overlay stretches to fill
                that same box uncropped, drifting the two apart whenever the
                container's ratio doesn't match the photo's.
              */}
              <img
                src={img.masterplan}
                alt="Mandhara masterplan aerial"
                loading="lazy"
                className="aspect-[1425/1024] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.012_60)]/55 to-transparent" />

              {/* zone hotspots — the traced plot boundary is the hit area, not just the marker */}
              <svg
                ref={svgRef}
                onPointerMove={(e) => {
                  if (!dragging) return;
                  const rect = svgRef.current!.getBoundingClientRect();
                  const point = [Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)), Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))];
                  setEditedShapes((current) => { const next = [...(current[dragging.id] ?? shapeFor(ZONES.find((z) => z.id === dragging.id)!))]; next[dragging.index] = point; return { ...current, [dragging.id]: next }; });
                }}
                onPointerUp={() => setDragging(null)}
                aria-hidden={!debugPoints}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {ZONES.map((z, i) => {
                  // Hover/focus only — the map shouldn't keep the initial or
                  // last-clicked zone permanently lit; that's the detail panel's job.
                  const show = !debugPoints && (hovered === z.id || clicked === z.id);
                  return (
                    <polygon
                      key={z.id}
                    points={shapeFor(z).map(([px, py]) => `${px},${py}`).join(" ")}
                      onClick={() => select(i)}
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        pointerEvents: "all",
                        cursor: "pointer",
                        fill: "var(--brand-glow)",
                        fillOpacity: show ? 0.18 : 0,
                        stroke: "var(--brand-glow)",
                        strokeOpacity: show ? 0.7 : 0,
                        strokeWidth: 0.3,
                        vectorEffect: "non-scaling-stroke",
                        transition: "fill-opacity 500ms ease, stroke-opacity 500ms ease",
                      }}
                    />
                  );
                })}
                {debugPoints && debugZone && ZONES.filter((z) => z.id === debugZone).map((z) =>
                  shapeFor(z).map(([x, y], pointIndex) => (
                    <g key={`${z.id}-point-${pointIndex}`} pointerEvents="none">
                      <circle cx={x} cy={y} r="0.8" fill="#fff" stroke="#000" strokeWidth="0.25" pointerEvents="all" onPointerDown={(e) => { e.stopPropagation(); setSelectedPoint(pointIndex); setDragging({ id: z.id, index: pointIndex }); }} />
                      <text
                        x={x + 1}
                        y={y - 1}
                        fill="#fff"
                        fontSize="1.5"
                        paintOrder="stroke"
                        stroke="#000"
                        strokeWidth="0.45"
                      >
                        {pointIndex}
                      </text>
                    </g>
                  )),
                )}
              </svg>
              {debugPoints && debugZone && (
                <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 rounded-xl bg-black/75 p-2 text-xs text-white backdrop-blur-md">
                  <button type="button" onClick={addPoint} className="rounded-md bg-accent px-2 py-1 text-black">Add point</button>
                  <button type="button" onClick={deletePoint} disabled={selectedPoint === null || shapeFor(ZONES.find((z) => z.id === debugZone)!).length <= 3} className="rounded-md border border-red-300/60 px-2 py-1 text-red-100 disabled:cursor-not-allowed disabled:opacity-40">Delete point</button>
                  <button type="button" onClick={() => saveShape(debugZone)} className="rounded-md border border-white/40 px-2 py-1">Save to source</button>
                  {saveStatus && <span className="px-1 text-accent">{saveStatus}</span>}
                </div>
              )}

              {ZONES.map((z, i) => {
                // `on` only governs which marker is the roving tabindex target and
                // which one screen readers hear as current — not what's visually lit.
                // The visible highlight is hover/focus only (`show`), so the map never
                // looks permanently "stuck" on the zone the detail panel happens to show.
                const on = active.id === z.id;
                const show = !debugPoints && (hovered === z.id || clicked === z.id);
                return (
                  <div
                    key={z.id}
                    style={{ left: `${z.x}%`, top: `${z.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      ref={(el) => {
                        markerRefs.current[i] = el;
                      }}
                      type="button"
                      tabIndex={on ? 0 : -1}
                      onClick={() => select(i)}
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(z.id)}
                      onBlur={() => setHovered(null)}
                      aria-label={`${z.name} — ${z.purpose}`}
                      aria-current={on ? "true" : undefined}
                      aria-describedby={show ? `tip-${z.id}` : undefined}
                      className={`block whitespace-nowrap rounded-full border px-3 py-1 outline-none backdrop-blur-md transition-all duration-300 ${
                        dialogZone && dialogZone !== z.id ? "pointer-events-none opacity-0" : ""
                      } ${
                        show
                          ? "border-accent/60 bg-[oklch(0.17_0.012_60)]/85"
                          : "border-white/15 bg-[oklch(0.17_0.012_60)]/70 hover:border-white/30"
                      }`}
                    >
                      <span className={`label ${show ? "text-accent" : "text-white"}`}>
                        {z.name}
                      </span>
                    </button>

                    <AnimatePresence>
                      {show && (
                        <motion.div
                          id={`tip-${z.id}`}
                          role="tooltip"
                          initial={{ opacity: 0, y: 8, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-white/15 bg-[oklch(0.17_0.012_60)]/90 p-4 text-left backdrop-blur-xl"
                        >
                          <p className="label text-accent">{z.purpose}</p>
                          <p className="display mt-1 text-xl text-[oklch(0.97_0.01_84)]">
                            {z.name}
                          </p>
                          <p className="mt-2 text-[0.7rem] font-light leading-relaxed text-white/65">
                            {z.overview}
                          </p>
                          <p className="mt-3 label text-accent">{z.linkLabel} →</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Lagoon Club Area sits inside the Nicqe/Orion sweep with no boundary
                  of its own in the source reference, so it's a static label, not a zone. */}
              <div
                aria-hidden="true"
                style={{ left: `${LAGOON_LABEL.x}%`, top: `${LAGOON_LABEL.y}%` }}
                className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[oklch(0.17_0.012_60)]/70 px-3 py-1 backdrop-blur-md transition-opacity duration-300 ${
                  dialogZone ? "opacity-0" : ""
                }`}
              >
                <span className="label text-accent">{LAGOON_LABEL.name}</span>
                <span className="label ml-1.5 text-white/70">{LAGOON_LABEL.purpose}</span>
              </div>
            </div>

            {/* Jump to zone detail only does anything once the map and detail panel
                are no longer side by side — hidden at lg, where they already are. */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => detailRef.current?.focus({ preventScroll: false })}
                className="btn-pill btn-label border border-border transition-colors duration-500 hover:border-primary hover:text-primary lg:hidden"
              >
                Jump to zone detail
              </button>
              <span className="label text-muted-foreground">← → to move between zones</span>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`zone-${active.id}`}
              ref={detailRef}
              tabIndex={-1}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="self-center scroll-mt-32 outline-none"
            >
              <p className="eyebrow">{active.purpose}</p>
              <h2 className="display mt-4 text-5xl md:text-6xl">{active.name}</h2>
              <p className="mt-6 body-copy text-muted-foreground">{active.overview}</p>
              <ul className="mt-8 space-y-3">
                {active.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-4 border-b border-border/70 pb-3 body-copy"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={active.to}
                  {...(active.hash ? { hash: active.hash } : {})}
                  className="btn-pill btn-label bg-primary text-primary-foreground transition-colors duration-500 hover:bg-accent hover:text-accent-foreground"
                >
                  {active.linkLabel}
                </Link>
                {active.secondary && (
                  <Link
                    to={active.secondary.to}
                    className="btn-pill btn-label border border-primary/50 text-primary transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                  >
                    {active.secondary.label}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => markerRefs.current[index]?.focus()}
                  className="btn-pill btn-label border border-border transition-colors duration-500 hover:border-primary hover:text-primary"
                >
                  Return to the map
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      <Section className="bg-muted/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-28">
              <ShowcasePanel
                item={{
                  id: preview.id,
                  title: preview.name,
                  meta: preview.purpose,
                  image: preview.image,
                }}
                height="h-[30rem] md:h-[36rem]"
                index={ZONES.findIndex((z) => z.id === preview.id)}
                total={ZONES.length}
              />
            </div>
          </div>

          <div>
            <Eyebrow>Zone Index</Eyebrow>
            <SplitText
              text="Every zone, at a glance."
              className="display mb-8 mt-6 text-4xl md:text-6xl"
            />
            <ul>
              {ZONES.map((z, i) => {
                const on = preview.id === z.id;
                return (
                  <li key={z.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(z.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(z.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => {
                        select(i);
                        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`group relative block w-full border-t py-7 text-left outline-none transition-colors duration-500 ${
                        on ? "border-primary/60" : "border-border"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 h-px bg-primary transition-all duration-700 ${
                          on ? "w-full" : "w-0"
                        }`}
                      />
                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <p className="label text-primary">{z.purpose}</p>
                          <h3
                            className={`display mt-2 text-3xl transition-all duration-500 ${
                              on ? "translate-x-1 text-primary" : ""
                            }`}
                          >
                            {z.name}
                          </h3>
                          <p className="mt-2 max-w-md body-copy text-muted-foreground">
                            {z.overview}
                          </p>
                        </div>
                        <span
                          className={`label transition-opacity duration-500 ${
                            on ? "opacity-100 text-primary" : "opacity-0"
                          }`}
                        >
                          View
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* <CtaBand
        title="See the plan on the ground."
        text="We'll walk the zone that interests you most, at the hour it looks best."
        label="Book a masterplan tour"
        image={img.masterplan}
        points={[
          [
            "NICQE & ORION",
            `${VILLAS.total} villas — ${VILLAS.nicqe} in Nicqe with ${NICQE.clubhouses} clubhouses and ${NICQE.gardenValleys} garden valleys, ${VILLAS.orion} revenue-sharing in Orion`,
          ],
          ["RIME & GEMINI", "The resort, and the club and event space"],
          [
            "SHEEN LAKE",
            `${LAKE.acres} acres of water, ${LAKE.islands} islands, ${LAKE.promenadeKm} km promenade`,
          ],
        ]}
      /> */}
    </>
  );
}
