# mFinancialCharts

A real-time crypto charting platform with a custom Canvas rendering engine, built from scratch. Live at charts.m4marvin.com.

## The story

Contract job. Client wanted footprint charts for crypto data — per-trade level visualization showing buy/sell activity at every price level inside each candle. TradingView did not have footprint charts when I built this. Zero references.

Designed and implemented the whole thing alone: backend, frontend, rendering engine, deployment.

## Backend

Raw trade data from Binance and Bybit APIs. Per-trade level processing for maximum accuracy.

Bitcoin alone sees millions of trades a day. Polars (Rust-based DataFrame library) for processing, Parquet with LZ4 compression for storage. 3,664+ parquet files across 818 symbols, fitting in ~6GB.

FastAPI with 14 endpoints: OHLC data, technical indicators (SMA, EMA, RSI, Bollinger Bands, ROC), symbol metadata, file discovery. CLI with 21 commands across 4 groups for ETL, exchange operations, indexing, and benchmarking.

## Frontend

React + TypeScript. Built the entire charting engine on raw HTML5 Canvas API — no TradingView, no Chart.js, no Recharts. 11 custom canvas renderers.

### Footprint chart

~80+ configurable settings. 16 display values (buy/sell volume, trades, percentages, quote volume). Point of Control (POC) markers with extensions for trades, base volume, quote volume. Value Area Range (VAR) with standard and greedy algorithms. Imbalance detection with thresholds and zone plotting. Support/resistance detection. 6 marker types. Color interpolation with lopsided formatting. Candle positioning (left/middle/right).

### Performance

Separate canvases for hover, chart, axes — one canvas kills performance with re-renders. Custom grid system. Text auto-hides below font size 6 to maintain 60fps. Felt more like building a game than a webpage.

## Deployment

Dockerized, running on a beefy Arch desktop (Core Ultra 9, 93GB RAM). Single multi-stage container serving both API and frontend via nginx + FastAPI. Data lake bind-mounted at runtime. Exposed through a Cloudflare tunnel.

## What made it hard

No references. No team. Learned everything by doing — backend architecture, canvas rendering, optimization, deployment. Gave up several times. No guide existed for most of it.