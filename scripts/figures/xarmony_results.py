#!/usr/bin/env python3
"""Xarmony results figure for the portfolio (public/assets/images/projects/xarmony-results.webp).

Every number is taken from the Xarmony repo's own records (docs/planning/FINAL_ARCHITECTURE.md
section 1.1 and docs/research/T_PROGRAM.md, T1/T2); counts are the repo's, intervals are Wilson
95% intervals computed here. Run:  python3 scripts/figures/xarmony_results.py
Needs matplotlib and Pillow.
"""
from math import sqrt
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from PIL import Image

OUT = Path(__file__).resolve().parents[2] / "public/assets/images/projects/xarmony-results.webp"
SURFACE, INK, MUTED, GRID, MARK = "#fcfcfb", "#1c2b2d", "#5d7073", "#e3e9ea", "#0a8ea6"   # MARK passes the palette validator
plt.rcParams.update({"font.family": ["Liberation Sans", "DejaVu Sans"], "text.color": INK,
                     "axes.labelcolor": MUTED, "xtick.color": MUTED, "ytick.color": MUTED})


def wilson(k, n, z=1.96):
    p = k / n
    d = 1 + z * z / n
    c = (p + z * z / (2 * n)) / d
    h = z * sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d
    return 100 * p, 100 * (c - h), 100 * (c + h)


fig, (a, b) = plt.subplots(1, 2, figsize=(11, 5.2), gridspec_kw={"width_ratios": [1.05, 1], "wspace": 0.3})
fig.patch.set_facecolor(SURFACE)
for ax in (a, b):
    ax.set_facecolor(SURFACE)
    ax.set_ylim(0, 100)
    ax.set_yticks(range(0, 101, 25))
    ax.set_yticklabels([f"{t}%" for t in range(0, 101, 25)])
    ax.grid(axis="y", color=GRID, lw=0.8)
    ax.set_axisbelow(True)
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(GRID)
    ax.tick_params(length=0)

# (a) learning curve: flow policy + 4-step chunks, pooled over seeds (FINAL_ARCHITECTURE.md 1.1)
pts = [(20, 18, 150), (40, 129, 210), (100, 178, 210)]
xs, ys, lo, hi = [], [], [], []
for step, k, n in pts:
    p, l, h = wilson(k, n)
    xs.append(step); ys.append(p); lo.append(p - l); hi.append(h - p)
    a.annotate(f"{p:.1f}%", (step, p), textcoords="offset points", xytext=(11, 2), ha="left", va="center",
               fontsize=11, fontweight="bold")
    a.annotate(f"{k}/{n} episodes", (step, p), textcoords="offset points", xytext=(11, -13), ha="left", va="center",
               fontsize=8.5, color=MUTED)
a.plot([8] + xs, [0] + ys, color=MARK, lw=2, zorder=2)
a.errorbar(xs, ys, yerr=[lo, hi], fmt="none", ecolor=MARK, elinewidth=1.4, capsize=4, zorder=2)
a.scatter([8] + xs, [0] + ys, s=46, color=MARK, edgecolor=SURFACE, linewidth=2, zorder=3)
a.annotate("0%", (8, 0), textcoords="offset points", xytext=(0, 9), ha="center", fontsize=10, fontweight="bold")
a.plot([0, 130], [0, 0], color=MUTED, lw=1.4, ls=(0, (4, 3)), zorder=1)
a.text(129, 6, "SAC: 0 of 10 at every checkpoint (4 runs)", ha="right", fontsize=9, color=MUTED)
a.set_xlim(0, 130)
a.set_xticks([8, 20, 40, 100]); a.set_xticklabels(["8k", "20k", "40k", "100k"])
a.set_xlabel("training steps", fontsize=10)
a.set_title("Success climbs from 0% to 84.8%", loc="left", fontsize=13, fontweight="bold", pad=12)

# (b) ablation at 20k steps: 3 seeds x 100 episodes per arm, deterministic selection (T_PROGRAM.md T1, T2)
arms = [("Flow policy,\n4-step chunks", 84, 300), ("+ critic picks best of 16\nwhen acting and in TD target", 185, 300),
        ("+ multi-horizon\ncritic targets", 252, 300)]
for i, (label, k, n) in enumerate(arms):
    p, l, h = wilson(k, n)
    b.bar(i, p, width=0.56, color=MARK, zorder=2)
    b.errorbar(i, p, yerr=[[p - l], [h - p]], fmt="none", ecolor=INK, elinewidth=1.3, capsize=4, zorder=3)
    b.annotate(f"{p:.1f}%", (i, h), textcoords="offset points", xytext=(0, 7), ha="center", fontsize=11, fontweight="bold")
b.set_xticks(range(3)); b.set_xticklabels([x[0] for x in arms], fontsize=8.8)
b.set_title("Each addition helps (20k steps)", loc="left", fontsize=13, fontweight="bold", pad=12)

fig.text(0.06, 0.935, "LIBERO put-the-bowl-on-the-plate, success rate with 95% intervals", fontsize=10.5, color=MUTED)
fig.text(0.06, 0.025,
         "Left: pooled over seeds, 100k steps. Right: 3 seeds x 100 episodes each (n=300 per arm), deterministic selection; under stochastic "
         "selection the last two arms are level (85.0% vs 84.3%).\nEval noise is about 10 points on 100 episodes, so only the pooled "
         "differences are read as real. Source: Xarmony project records.", fontsize=8, color=MUTED, va="bottom")
fig.subplots_adjust(top=0.82, bottom=0.2, left=0.06, right=0.98)
tmp = OUT.with_suffix(".png")
fig.savefig(tmp, dpi=200, facecolor=SURFACE)
im = Image.open(tmp).convert("RGB")
im.thumbnail((1600, 1600))
im.save(OUT, "WEBP", quality=88, method=6)
tmp.unlink()
print("wrote", OUT, im.size)
