# Qdata-Octo — Algorithmic Trading Platform

A production-grade algorithmic trading platform. I was the second engineering hire.

## The story

Co-developed from scratch with one other engineer. The platform processes 106,185+ TradingView signals and 5,000+ automated trades per day across multiple accounts. Real money, real risk, real consequences.

## What I built

### Trade execution engine

FastAPI backend talking to MetaTrader 5. Handles parallel multi-account execution, grid-based strategies, dynamic position sizing. Enterprise-grade security from day one — when money is on the line you do not cut corners.

### Signal ingestion pipeline

Real-time pipeline with zero race conditions. Dual-database persistence. Had to handle evolving webhook formats as TradingView changed their schemas — the pipeline adapted without missing a beat.

### Monitoring dashboard

React + TanStack Start. Real-time account visibility, historical trade analytics, and operational insights. The kind of dashboard you stare at nervously when the market moves against you.

### Risk management

Automated circuit breakers, multi-channel alerting. The safety net that catches things before they catch fire.

### Team

Onboarded and mentored 6 engineers. Got them shipping production features within two weeks. Established engineering standards for the platform.

## What made it different

This was not a side project or a demo. Production system handling real money, processing 100k+ signals daily. Every edge case mattered. Every failure mode had to be thought through ahead of time.

## Tech

Python, FastAPI, React, TanStack Start, MetaTrader 5, PostgreSQL