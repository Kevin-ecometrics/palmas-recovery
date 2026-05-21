<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sm"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — Palmas Recovery</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f5f5f5; color: #333; }
          header { background: #1a1a1a; color: #fff; padding: 24px 40px; display: flex; align-items: center; gap: 16px; }
          header h1 { font-size: 1.25rem; font-weight: 600; }
          header p { font-size: 0.8rem; color: #999; margin-top: 2px; }
          .container { max-width: 1000px; margin: 36px auto; padding: 0 24px; }
          .stat { display: inline-flex; align-items: center; gap: 10px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 14px 20px; margin-bottom: 24px; }
          .stat-number { font-size: 1.8rem; font-weight: 700; }
          .stat-label { font-size: 0.75rem; color: #888; }
          table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
          thead tr { background: #111; }
          th { padding: 11px 16px; text-align: left; font-size: 0.7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #fff; }
          td { padding: 11px 16px; font-size: 0.82rem; border-bottom: 1px solid #f0f0f0; vertical-align: middle; }
          tr:last-child td { border-bottom: none; }
          tbody tr:hover td { background: #fafafa; }
          a { color: #2563eb; text-decoration: none; word-break: break-all; }
          a:hover { text-decoration: underline; }
          .badge { display: inline-block; padding: 2px 9px; border-radius: 20px; font-size: 0.72rem; font-weight: 600; }
          .high { background: #dcfce7; color: #15803d; }
          .mid  { background: #fef9c3; color: #a16207; }
          .low  { background: #f1f5f9; color: #64748b; }
          footer { text-align: center; padding: 28px; font-size: 0.75rem; color: #bbb; }
        </style>
      </head>
      <body>
        <header>
          <div>
            <h1>Palmas Recovery — XML Sitemap</h1>
            <p>This file is read by search engines. Last updated on every build.</p>
          </div>
        </header>

        <div class="container">
          <div class="stat">
            <span class="stat-number"><xsl:value-of select="count(sm:urlset/sm:url)"/></span>
            <span class="stat-label">URLs indexed</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Priority</th>
                <th>Change Freq</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <xsl:sort select="sm:priority" order="descending" data-type="number"/>
                <tr>
                  <td style="color:#bbb;width:40px"><xsl:value-of select="position()"/></td>
                  <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                  <td>
                    <xsl:variable name="p" select="sm:priority"/>
                    <xsl:choose>
                      <xsl:when test="$p >= 0.9"><span class="badge high"><xsl:value-of select="$p"/></span></xsl:when>
                      <xsl:when test="$p >= 0.7"><span class="badge mid"><xsl:value-of select="$p"/></span></xsl:when>
                      <xsl:otherwise><span class="badge low"><xsl:value-of select="$p"/></span></xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td style="color:#888"><xsl:value-of select="sm:changefreq"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
        <footer>palmasrecovery.com/sitemap.xml</footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
