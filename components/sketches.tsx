/**
 * Hand-drawn figures. Each stroke carries pathLength={1} so the "draw" class can
 * animate it on; the shared #pencil filter (see PencilDefs) roughens the line.
 */
import type { CSSProperties, ReactNode } from "react";

type SketchProps = {
  viewBox: string;
  className?: string;
  label?: string;
  draw?: boolean;
  children: ReactNode;
};

function Sketch({ viewBox, className = "", label, draw = false, children }: SketchProps) {
  return (
    <svg
      viewBox={viewBox}
      className={`sketch ${draw ? "draw" : ""} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g filter="url(#pencil)">{children}</g>
    </svg>
  );
}

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Filter definitions shared by every sketch on the page. */
export function PencilDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="pencil" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

/** A dense bipartite graph with a perfect matching picked out: a product of singlets. */
export function SingletGraph({ className, draw }: { className?: string; draw?: boolean }) {
  const left = [24, 64, 104, 144].map((y) => ({ x: 40, y }));
  const right = [24, 64, 104, 144].map((y) => ({ x: 180, y }));
  const matching = [1, 0, 3, 2];
  const missing = new Set(["0-3", "3-0", "1-2"]);
  const edges: [number, number][] = [];
  left.forEach((_, a) => right.forEach((_, b) => !missing.has(`${a}-${b}`) && edges.push([a, b])));
  return (
    <Sketch viewBox="0 0 220 170" className={className} draw={draw} label="A dense bipartite graph with a perfect matching highlighted">
      {edges.map(([a, b], n) =>
        matching[a] === b ? null : (
          <line key={`${a}${b}`} className="ink" pathLength={1} style={i(n)} opacity={0.35} strokeWidth={0.9}
            x1={left[a].x} y1={left[a].y} x2={right[b].x} y2={right[b].y} />
        ),
      )}
      {matching.map((b, a) => (
        <line key={`m${a}`} className="ink accent" pathLength={1} style={i(14 + a)} strokeWidth={2}
          x1={left[a].x} y1={left[a].y} x2={right[b].x} y2={right[b].y} />
      ))}
      {[...left, ...right].map((p, n) => (
        <circle key={n} cx={p.x} cy={p.y} r={4.2} className="ink" pathLength={1} style={i(n)} fill="var(--color-paper)" strokeWidth={1.3} />
      ))}
    </Sketch>
  );
}

/** The Petersen graph: outer pentagon, inner pentagram, five spokes. */
export function PetersenGraph({ className, draw }: { className?: string; draw?: boolean }) {
  const pt = (r: number, k: number) => {
    const t = ((-90 + 72 * k) * Math.PI) / 180;
    return { x: 60 + r * Math.cos(t), y: 62 + r * Math.sin(t) };
  };
  const outer = [0, 1, 2, 3, 4].map((k) => pt(48, k));
  const inner = [0, 1, 2, 3, 4].map((k) => pt(22, k));
  const edges = [
    ...outer.map((p, k) => [p, outer[(k + 1) % 5]]),
    ...outer.map((p, k) => [p, inner[k]]),
    ...inner.map((p, k) => [p, inner[(k + 2) % 5]]),
  ];
  return (
    <Sketch viewBox="0 0 120 120" className={className} draw={draw} label="The Petersen graph">
      {edges.map(([a, b], n) => (
        <line key={n} className="ink" pathLength={1} style={i(n)} strokeWidth={1.1} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
      ))}
      {[...outer, ...inner].map((p, n) => (
        <circle key={n} cx={p.x} cy={p.y} r={3.2} className="ink" pathLength={1} fill="var(--color-paper)" strokeWidth={1.1} />
      ))}
    </Sketch>
  );
}

/** A torus with a meridian and a longitude, the generators of its fundamental group. */
export function Torus({ className, draw }: { className?: string; draw?: boolean }) {
  return (
    <Sketch viewBox="0 0 200 120" className={className} draw={draw} label="A torus with its two generating loops">
      <ellipse className="ink" pathLength={1} style={i(0)} cx={100} cy={60} rx={88} ry={44} strokeWidth={1.3} />
      <path className="ink" pathLength={1} style={i(2)} strokeWidth={1.2} d="M62 56 Q100 80 138 56" />
      <path className="ink" pathLength={1} style={i(3)} strokeWidth={1.2} d="M70 61 Q100 45 130 61" />
      <path className="ink accent" pathLength={1} style={i(6)} strokeWidth={1.6} d="M100 16 C 90 24, 90 46, 100 53" />
      <path className="ink accent" style={{ ...i(7), strokeDasharray: "3 3" }} strokeWidth={1} opacity={0.7} d="M100 16 C 110 24, 110 46, 100 53" />
      <ellipse className="ink accent" pathLength={1} style={i(9)} cx={100} cy={60} rx={63} ry={26} strokeWidth={1.3} opacity={0.75} />
    </Sketch>
  );
}

/** Elements I.1: an equilateral triangle constructed on a segment with two circles. */
export function EuclidI1({ className, draw }: { className?: string; draw?: boolean }) {
  const r = 50;
  const A = { x: 75, y: 85 };
  const B = { x: 125, y: 85 };
  const C = { x: 100, y: 85 - (r * Math.sqrt(3)) / 2 };
  return (
    <Sketch viewBox="0 0 200 150" className={className} draw={draw} label="Euclid's construction of an equilateral triangle">
      <circle className="ink" pathLength={1} style={i(0)} cx={A.x} cy={A.y} r={r} strokeWidth={0.9} opacity={0.55} />
      <circle className="ink" pathLength={1} style={i(3)} cx={B.x} cy={B.y} r={r} strokeWidth={0.9} opacity={0.55} />
      <path className="ink" pathLength={1} style={i(6)} strokeWidth={1.4} d={`M${A.x} ${A.y} L${B.x} ${B.y}`} />
      <path className="ink accent" pathLength={1} style={i(9)} strokeWidth={1.6} d={`M${A.x} ${A.y} L${C.x} ${C.y} L${B.x} ${B.y}`} />
      <g fontFamily="var(--font-display)" fontStyle="italic" fontSize="11" fill="currentColor" stroke="none">
        <text x={A.x - 12} y={A.y + 12}>A</text>
        <text x={B.x + 5} y={B.y + 12}>B</text>
        <text x={C.x - 3.5} y={C.y - 6}>C</text>
      </g>
    </Sketch>
  );
}

/** A loose pencil underline. */
export function PencilUnderline({ className, draw }: { className?: string; draw?: boolean }) {
  return (
    <Sketch viewBox="0 0 300 14" className={className} draw={draw}>
      <path className="ink accent" pathLength={1} strokeWidth={2} d="M3 9 C 60 4, 140 5, 200 6 S 280 9, 297 4" />
      <path className="ink accent" pathLength={1} style={i(8)} strokeWidth={1} opacity={0.5} d="M40 12 C 110 8, 190 9, 260 10" />
    </Sketch>
  );
}

/** A hand-ruled divider with a small centred mark. */
export function PencilRule({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-pencil ${className ?? ""}`} aria-hidden="true">
      <Sketch viewBox="0 0 200 6" className="h-1.5 flex-1">
        <path className="ink" strokeWidth={0.8} opacity={0.6} d="M2 3 C 50 2, 120 4.5, 198 3" />
      </Sketch>
      <span className="font-display text-sm">⁂</span>
      <Sketch viewBox="0 0 200 6" className="h-1.5 flex-1">
        <path className="ink" strokeWidth={0.8} opacity={0.6} d="M2 3 C 70 4.5, 140 2, 198 3" />
      </Sketch>
    </div>
  );
}
