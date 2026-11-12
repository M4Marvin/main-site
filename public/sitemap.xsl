<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sm">

  <xsl:output method="html" encoding="UTF-8" indent="no" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>m4marvin.com — Sitemap</title>
        <style>
          :root {
            color-scheme: light dark;
            --bg: #faf9f7;
            --fg: #18181b;
            --muted: #71717a;
            --line: #e4e4e7;
            --card: #ffffff;
            --accent: #1d4ed8;
            --wash: rgba(29, 78, 216, 0.05);
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #0b0b0d;
              --fg: #e7e7ea;
              --muted: #9a9aa3;
              --line: #26262b;
              --card: #131316;
              --accent: #8ab0ff;
              --wash: rgba(138, 176, 255, 0.07);
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: var(--bg);
            color: var(--fg);
            font: 15px/1.55 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          main { max-width: 56rem; margin: 0 auto; padding: 3.5rem 1.25rem 4rem; }
          .eyebrow {
            margin: 0 0 0.75rem;
            color: var(--accent);
            font: 600 12px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }
          h1 { margin: 0 0 0.5rem; font-size: clamp(2rem, 6vw, 2.75rem); letter-spacing: -0.03em; line-height: 1.1; }
          .meta { margin: 0 0 2rem; color: var(--muted); font-size: 0.875rem; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--card);
            border: 1px solid var(--line);
            border-radius: 12px;
            overflow: hidden;
          }
          thead th {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--line);
            color: var(--muted);
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-align: left;
            text-transform: uppercase;
          }
          tbody td { padding: 0.7rem 1rem; border-bottom: 1px solid var(--line); vertical-align: top; }
          tbody tr:last-child td { border-bottom: 0; }
          tbody tr:hover { background: var(--wash); }
          td.n {
            width: 3rem;
            color: var(--muted);
            font: 12px/1.7 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          }
          a { color: var(--accent); text-decoration: none; overflow-wrap: anywhere; }
          a:hover { text-decoration: underline; text-underline-offset: 3px; }
          .date {
            color: var(--muted);
            white-space: nowrap;
            font: 13px/1.7 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          }
          footer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 1rem;
            margin-top: 1.5rem;
            color: var(--muted);
            font-size: 0.8rem;
          }
          code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.9em; }
          @media (max-width: 640px) {
            main { padding-top: 2.25rem; }
            td.n { width: 2rem; padding-right: 0.25rem; }
            .date, thead th:last-child { display: none; }
          }
        </style>
      </head>
      <body>
        <main>
          <p class="eyebrow">m4marvin.com</p>
          <h1>Sitemap</h1>
          <p class="meta">
            <xsl:value-of select="count(sm:urlset/sm:url)"/>
            <xsl:text> URLs · XML for crawlers, this view for humans</xsl:text>
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">URL</th>
                <th scope="col">Last modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <tr>
                  <td class="n"><xsl:value-of select="position()"/></td>
                  <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                  <td class="date">
                    <xsl:choose>
                      <xsl:when test="sm:lastmod"><xsl:value-of select="sm:lastmod"/></xsl:when>
                      <xsl:otherwise>—</xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <footer>
            <span>Generated by <code>scripts/gen-sitemap.mjs</code></span>
            <a href="/">← Back to m4marvin.com</a>
          </footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
