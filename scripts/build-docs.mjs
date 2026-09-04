import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const docsDir = path.join(root, 'docs');

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

// Read index.js from dist
import { pathToFileURL } from 'node:url';
const { listCarriers } = await import(pathToFileURL(path.join(dist, 'index.js')).href);
const carriers = listCarriers();

const carriersJson = JSON.stringify(carriers);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@mediabridge-solutions/carrier-icons — Official Carrier Icons & Registry Preview</title>
  <meta name="description" content="Live visual preview, SVG vector badges, tracking URLs, and official brand colors for shipping carriers and freight logistics networks.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📦</text></svg>">
  <style>
    :root {
      --bg: #0b0f19;
      --surface: #111827;
      --surface-border: #1f2937;
      --surface-hover: #1e293b;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --text-dim: #6b7280;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --primary-light: rgba(59, 130, 246, 0.15);
      --success: #10b981;
      --accent: #8b5cf6;
      --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      padding-bottom: 80px;
    }

    a { color: var(--primary); text-decoration: none; }
    a:hover { text-decoration: underline; }

    .header {
      border-bottom: 1px solid var(--surface-border);
      background: rgba(17, 24, 39, 0.85);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: -0.01em;
      color: #fff;
    }

    .nav-brand .icon-logo {
      font-size: 1.4rem;
    }

    .version-pill {
      background: var(--primary-light);
      color: var(--primary);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 9999px;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      border: 1px solid var(--surface-border);
      background: var(--surface);
      color: var(--text);
    }

    .btn:hover {
      background: var(--surface-hover);
      border-color: #374151;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--primary);
      border-color: var(--primary);
      color: #fff;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      border-color: var(--primary-hover);
    }

    .hero {
      padding: 48px 0 32px 0;
      border-bottom: 1px solid var(--surface-border);
      background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08), transparent 70%);
    }

    .hero-title {
      font-size: 2.25rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
      color: #fff;
    }

    .hero-subtitle {
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 760px;
      margin-bottom: 24px;
    }

    .install-box {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: #030712;
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 8px 16px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.9rem;
      color: #e5e7eb;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .install-box .copy-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 4px;
      border-radius: 4px;
    }

    .install-box .copy-btn:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    /* Fallback Simulator Section */
    .playground-section {
      margin: 32px 0;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 24px;
    }

    .playground-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
    }

    .playground-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .playground-input-row {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .playground-input {
      background: #030712;
      border: 1px solid #374151;
      border-radius: 6px;
      padding: 10px 14px;
      color: #fff;
      font-size: 0.95rem;
      min-width: 320px;
      outline: none;
    }

    .playground-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }

    .playground-result {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #090d16;
      border: 1px dashed #374151;
      padding: 8px 16px;
      border-radius: 8px;
      min-height: 48px;
    }

    /* Filter & Controls */
    .controls-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin: 32px 0 20px 0;
    }

    .search-wrap {
      position: relative;
      flex: 1;
      max-width: 420px;
    }

    .search-input {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 8px;
      padding: 10px 14px 10px 38px;
      color: #fff;
      font-size: 0.9rem;
      outline: none;
    }

    .search-input:focus {
      border-color: var(--primary);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-dim);
      pointer-events: none;
    }

    .filter-pills {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-pill {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.825rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .filter-pill:hover {
      background: var(--surface-hover);
      color: #fff;
    }

    .filter-pill.active {
      background: var(--primary-light);
      color: var(--primary);
      border-color: rgba(59, 130, 246, 0.4);
      font-weight: 600;
    }

    .view-toggles {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toggle-btn {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      color: var(--text-muted);
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .toggle-btn.active {
      background: #1f2937;
      color: #fff;
      border-color: #4b5563;
    }

    /* Table Styling */
    .table-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th {
      background: #0f172a;
      color: var(--text-muted);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 14px 18px;
      border-bottom: 1px solid var(--surface-border);
    }

    td {
      padding: 16px 18px;
      border-bottom: 1px solid rgba(31, 41, 55, 0.7);
      vertical-align: middle;
      font-size: 0.9rem;
    }

    tr:hover td {
      background: rgba(30, 41, 59, 0.4);
    }

    /* Badge & Logo Previews */
    .logo-preview-cell {
      min-width: 130px;
    }

    .real-logo-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      padding: 6px 12px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      max-height: 42px;
    }

    .real-logo-container svg {
      display: block;
      height: 28px;
      width: auto;
      max-width: 120px;
      object-fit: contain;
    }

    .inline-badge-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 0;
    }

    .inline-badge-container svg {
      display: block;
      height: 24px;
      width: 100px;
      border-radius: 4px;
    }

    .carrier-title {
      font-weight: 600;
      color: #fff;
      margin-bottom: 4px;
    }

    .code-tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #030712;
      border: 1px solid #1f2937;
      color: #93c5fd;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 0.775rem;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .category-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .cat-parcel { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .cat-freight { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .cat-postal { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .cat-express { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .cat-manual { background: rgba(156, 163, 175, 0.15); color: #d1d5db; border: 1px solid rgba(156, 163, 175, 0.3); }

    .color-chips {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .color-chip {
      width: 22px;
      height: 22px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      cursor: pointer;
      position: relative;
    }

    .color-chip:hover::after {
      content: attr(data-hex);
      position: absolute;
      bottom: 26px;
      left: 50%;
      transform: translateX(-50%);
      background: #000;
      color: #fff;
      font-size: 0.7rem;
      font-family: monospace;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: 10;
      pointer-events: none;
    }

    .alias-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      max-width: 220px;
    }

    .alias-item {
      font-family: monospace;
      font-size: 0.725rem;
      background: #1e293b;
      color: var(--text-dim);
      padding: 1px 5px;
      border-radius: 3px;
    }

    .tracking-link {
      font-family: monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
      max-width: 180px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .actions-cell {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .icon-action-btn {
      background: #1f2937;
      border: 1px solid #374151;
      color: var(--text-muted);
      padding: 5px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .icon-action-btn:hover {
      background: #374151;
      color: #fff;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10b981;
      color: #fff;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      z-index: 999;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>

  <header class="header">
    <div class="container nav">
      <a href="https://mediabridge.solutions" class="nav-brand" target="_blank" rel="noopener" style="text-decoration:none;">
        <span class="icon-logo">🚚</span>
        <span>@mediabridge-solutions/carrier-icons</span>
        <span class="version-pill">v${pkg.version}</span>
      </a>
      <div class="nav-links">
        <a href="https://mediabridge.solutions" class="btn" target="_blank" rel="noopener">
          🌐 mediabridge.solutions
        </a>
        <a href="https://github.com/mediabridge-solutions/carrier-icons" class="btn" target="_blank" rel="noopener">
          <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/@mediabridge-solutions/carrier-icons" class="btn btn-primary" target="_blank" rel="noopener">
          npm Package
        </a>
      </div>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <h1 class="hero-title">Official Carrier Icons & Metadata Registry</h1>
      <p class="hero-subtitle">
        Platform-agnostic vector icons, official brand palettes, tracking URLs, and metadata for shipping carriers, parcel couriers, and European freight logistics networks.
      </p>
      <div class="install-box">
        <span>$ npm install @mediabridge-solutions/carrier-icons</span>
        <button class="copy-btn" onclick="copyText('npm install @mediabridge-solutions/carrier-icons', 'Install command copied!')" title="Copy install command">
          📋
        </button>
      </div>
    </section>

    <!-- Interactive Fallback Tester -->
    <section class="playground-section">
      <div class="playground-header">
        <div>
          <div class="playground-title">
            <span>⚡ Interactive Carrier & Fallback Simulator</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">
            Type any carrier code or an unknown forwarder to see the library resolve or dynamically generate contrast badges on the fly.
          </p>
        </div>
      </div>
      <div class="playground-input-row">
        <input type="text" id="playgroundInput" class="playground-input" placeholder="Type e.g. dhl, 24plus, or custom 'Spedition Meyer'..." value="spedition_mueller" oninput="updatePlayground()">
        <div id="playgroundOutput" class="playground-result">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </section>

    <!-- Controls Row -->
    <div class="controls-row">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" id="searchInput" class="search-input" placeholder="Search by name, code, alias, country (e.g. DE, DHL, 24plus)..." oninput="filterCarriers()">
      </div>

      <div class="filter-pills" id="categoryFilters">
        <button class="filter-pill active" onclick="setCategory('all', this)">All (<span id="totalCount">0</span>)</button>
        <button class="filter-pill" onclick="setCategory('parcel', this)">Parcel</button>
        <button class="filter-pill" onclick="setCategory('freight', this)">Freight</button>
        <button class="filter-pill" onclick="setCategory('postal', this)">Postal</button>
        <button class="filter-pill" onclick="setCategory('express', this)">Express</button>
        <button class="filter-pill" onclick="setCategory('manual', this)">Manual</button>
      </div>
    </div>

    <!-- Table of Icons -->
    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>Real Logo</th>
            <th>Inline Badge</th>
            <th>Carrier Name & Code</th>
            <th>Category</th>
            <th>Country</th>
            <th>Brand Colors</th>
            <th>Aliases</th>
            <th>Tracking Template</th>
            <th>Export</th>
          </tr>
        </thead>
        <tbody id="carriersTableBody">
          <!-- Injected via JavaScript -->
        </tbody>
      </table>
    </div>
  </main>

  <div id="toast" class="toast">Copied to clipboard!</div>

  <script>
    const CARRIERS = ${carriersJson};
    let currentCategory = 'all';

    function renderTable() {
      const tbody = document.getElementById('carriersTableBody');
      const search = document.getElementById('searchInput').value.trim().toLowerCase();
      tbody.innerHTML = '';

      const filtered = CARRIERS.filter(c => {
        const matchesCategory = currentCategory === 'all' || c.category === currentCategory;
        if (!matchesCategory) return false;

        if (!search) return true;
        const inCode = c.code.toLowerCase().includes(search);
        const inName = c.name.toLowerCase().includes(search);
        const inCountry = (c.country || '').toLowerCase().includes(search);
        const inAliases = (c.aliases || []).some(a => a.toLowerCase().includes(search));
        return inCode || inName || inCountry || inAliases;
      });

      document.getElementById('totalCount').textContent = CARRIERS.length;

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding: 40px; color: var(--text-muted);">No carriers found matching your search.</td></tr>';
        return;
      }

      for (const c of filtered) {
        const tr = document.createElement('tr');

        // Aliases chips
        const aliasesHtml = (c.aliases || []).length > 0
          ? c.aliases.map(a => '<span class="alias-item">' + escapeHtml(a) + '</span>').join('')
          : '<span style="color:var(--text-dim); font-size:0.8rem;">—</span>';

        // Tracking URL
        const trackingHtml = c.tracking && c.tracking.urlTemplate
          ? '<a class="tracking-link" href="' + escapeHtml(c.tracking.urlTemplate.replace('{trackingNumber}', '12345678')) + '" target="_blank" title="' + escapeHtml(c.tracking.urlTemplate) + '">' + escapeHtml(c.tracking.urlTemplate) + '</a>'
          : '<span style="color:var(--text-dim); font-size:0.8rem;">—</span>';

        // Category class
        const catClass = 'cat-' + (c.category || 'manual');

        // Real logo markup
        const realLogoMarkup = c.svg ? '<div class="real-logo-container">' + c.svg + '</div>' : '<span style="color:var(--text-dim);">—</span>';

        // Inline badge markup
        const inlineBadgeMarkup = c.inlineSvg ? '<div class="inline-badge-container">' + c.inlineSvg + '</div>' : '<span style="color:var(--text-dim);">—</span>';

        tr.innerHTML = \`
          <td class="logo-preview-cell">
            \${realLogoMarkup}
          </td>
          <td class="logo-preview-cell">
            \${inlineBadgeMarkup}
          </td>
          <td>
            <div class="carrier-title">\${escapeHtml(c.name)}</div>
            <span class="code-tag" onclick="copyText('\${escapeHtml(c.code)}', 'Code copied!')" title="Click to copy code" style="cursor:pointer;">
              \${escapeHtml(c.code)} 📋
            </span>
          </td>
          <td>
            <span class="category-badge \${catClass}">\${escapeHtml(c.category || 'other')}</span>
          </td>
          <td>
            <span style="font-weight:600; font-size:0.85rem;">\${escapeHtml(c.country || 'Global')}</span>
          </td>
          <td>
            <div class="color-chips">
              <span class="color-chip" style="background:\${c.colors.bg}" data-hex="\${c.colors.bg}" onclick="copyText('\${c.colors.bg}', 'Background color copied!')"></span>
              <span class="color-chip" style="background:\${c.colors.fg}" data-hex="\${c.colors.fg}" onclick="copyText('\${c.colors.fg}', 'Foreground color copied!')"></span>
              \${c.colors.border ? '<span class="color-chip" style="background:' + c.colors.border + '" data-hex="' + c.colors.border + '" onclick="copyText(\\'' + c.colors.border + '\\', \\'Border color copied!\\')"></span>' : ''}
            </div>
          </td>
          <td>
            <div class="alias-list">\${aliasesHtml}</div>
          </td>
          <td>
            \${trackingHtml}
          </td>
          <td>
            <div class="actions-cell">
              <button class="icon-action-btn" onclick="copyCarrierRealSvg('\${escapeHtml(c.code)}')" title="Copy Real Vector SVG">
                Real SVG
              </button>
              <button class="icon-action-btn" onclick="copyCarrierInlineSvg('\${escapeHtml(c.code)}')" title="Copy 100x24 Inline Badge SVG">
                Badge SVG
              </button>
              <button class="icon-action-btn" onclick="copyCarrierSnippet('\${escapeHtml(c.code)}')" title="Copy TS Import snippet">
                Import
              </button>
            </div>
          </td>
        \`;

        tbody.appendChild(tr);
      }
    }

    function filterCarriers() {
      renderTable();
    }

    function setCategory(cat, btn) {
      currentCategory = cat;
      document.querySelectorAll('#categoryFilters .filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTable();
    }

    function copyText(text, message) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(message || 'Copied to clipboard!');
      });
    }

    function copyCarrierRealSvg(code) {
      const carrier = CARRIERS.find(c => c.code === code);
      if (carrier && carrier.svg) {
        copyText(carrier.svg, 'Real Vector SVG copied!');
      }
    }

    function copyCarrierInlineSvg(code) {
      const carrier = CARRIERS.find(c => c.code === code);
      const svg = carrier ? (carrier.inlineSvg || carrier.svg) : '';
      if (svg) {
        copyText(svg, 'Inline Badge SVG copied!');
      }
    }

    function copyCarrierSnippet(code) {
      const snippet = \`import { getCarrier } from '@mediabridge-solutions/carrier-icons';\\nconst carrier = getCarrier('\${code}');\`;
      copyText(snippet, 'Import snippet copied!');
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // Dynamic Fallback Simulator
    function stringHashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    }

    function getSimulatedCarrier(input) {
      const raw = input.trim().toLowerCase();
      if (!raw) return null;

      // Check predefined
      const exact = CARRIERS.find(c => c.code === raw || (c.aliases && c.aliases.includes(raw)));
      if (exact) {
        return { carrier: exact, isFallback: false };
      }

      // Generate fallback
      const hash = stringHashCode(raw);
      const hues = [210, 220, 200, 260, 280, 340, 160, 30];
      const hue = hues[hash % hues.length];
      const bg = 'hsl(' + hue + ', 65%, 40%)';
      const label = input.split(/[\\s_-]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const initials = label.slice(0, 10).toUpperCase();

      const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24"><rect width="100" height="24" fill="' + bg + '" rx="3"/><text x="50" y="16" fill="#ffffff" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-weight="700" font-size="11" text-anchor="middle" letter-spacing="1">' + escapeHtml(initials) + '</text></svg>';

      return {
        carrier: {
          code: raw,
          name: label,
          category: 'fallback',
          colors: { bg, fg: '#ffffff' },
          svg: fallbackSvg
        },
        isFallback: true
      };
    }

    function updatePlayground() {
      const input = document.getElementById('playgroundInput').value;
      const res = getSimulatedCarrier(input);
      const out = document.getElementById('playgroundOutput');

      if (!res) {
        out.innerHTML = '<span style="color:var(--text-dim); font-size:0.85rem;">Type a carrier code to preview</span>';
        return;
      }

      const badgeType = res.isFallback
        ? '<span style="font-size:0.75rem; background:rgba(234,179,8,0.2); color:#facc15; padding:2px 6px; border-radius:4px; font-weight:600;">Fallback Generated</span>'
        : '<span style="font-size:0.75rem; background:rgba(16,185,129,0.2); color:#34d399; padding:2px 6px; border-radius:4px; font-weight:600;">Official Registry Match</span>';

      out.innerHTML = \`
        <div>\${res.carrier.svg}</div>
        <div>
          <div style="font-weight:600; color:#fff; font-size:0.9rem;">\${escapeHtml(res.carrier.name)}</div>
          <div style="font-size:0.775rem; color:var(--text-muted); display:flex; align-items:center; gap:8px; margin-top:2px;">
            <span>code: <code>\${escapeHtml(res.carrier.code)}</code></span>
            \${badgeType}
          </div>
        </div>
      \`;
    }

    // Initial render
    renderTable();
    updatePlayground();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(docsDir, 'index.html'), html, 'utf8');
console.log('[build-docs] Generated docs/index.html with', carriers.length, 'carrier definitions');
