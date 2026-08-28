---
title: "Keeping p99 60fps when Bitcoin prints 2M trades a day"
date: "2026-08-29"
description: "Why the charting engine uses multiple HTML5 canvases, viewport clipping, and a Parquet lake instead of a charting library — and what broke if any of those were skipped."
tags: ["canvas", "performance", "parquet", "polars", "trading"]
---

The desk needed per-trade footprint charts: volume, counts, and buy/sell delta at every price level inside each candle. TradingView did not do that. Charting libraries did not do that on a stream like Bitcoin’s. So the renderer is raw Canvas 2D, and the data path is a lake, not a socket stuffed with JSON.

The hard case is the one the system is built around. Bitcoin averages about two million trades a day, with peaks around thirty million. The lake behind the charts is ~4TB of LZ4-compressed Parquet. The UI still has to hold p99 60fps on Firefox and Chrome with thousands of objects on screen.

Three decisions carried that:

**Don’t draw what isn’t on screen.** Virtualization and viewport clipping matter more than micro-optimizing the draw loop. Canvas performance is mostly about what you skip.

**Don’t put axes, hover, and the chart on one canvas.** Separate canvases mean a hover rewrite doesn’t repaint the footprint bricks. Re-allocating on every frame was the other foot-gun; the hot path reuses buffers.

**Don’t make the browser parse the lake.** FastAPI + Polars read Parquet, aggregate 5-second OHLCV to the interval the client asked for, and return JSON in chunks sized for infinite load. The browser only renders.

The walkthrough — C4, pipeline, lake layout, VAR — is in the [charts case study](/work/charts). The live desk view is at [charts.m4marvin.com](https://charts.m4marvin.com).
