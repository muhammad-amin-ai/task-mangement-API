<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🚀 Task Management API — Project Documentation</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg: #0a0e17;
    --bg-alt: #0d1220;
    --surface: #131928;
    --surface-2: #171f32;
    --border: #232b3f;
    --border-soft: #1c2334;
    --text: #e9ebf2;
    --text-muted: #8b93a9;
    --text-dim: #5c6478;
    --accent: #00c896;
    --accent-soft: rgba(0,200,150,.12);
    --accent-strong: #05e6ac;
    --accent-2: #ffb020;
    --accent-2-soft: rgba(255,176,32,.12);
    --blue: #5b9dff;
    --red: #ff6b6b;
    --radius: 16px;
    --radius-sm: 10px;
    --mono: 'JetBrains Mono', 'Courier New', monospace;
    --display: 'Space Grotesk', sans-serif;
    --body: 'Inter', sans-serif;
    --shadow: 0 20px 50px -20px rgba(0,0,0,.6);
  }

  *{ box-sizing: border-box; }
  html{ scroll-behavior: smooth; }

  body{
    margin:0;
    background:
      radial-gradient(circle at 15% 0%, rgba(0,200,150,.07), transparent 45%),
      radial-gradient(circle at 85% 10%, rgba(255,176,32,.06), transparent 40%),
      var(--bg);
    color: var(--text);
    font-family: var(--body);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  ::selection{ background: var(--accent-soft); color: var(--accent-strong); }

  a{ color: var(--accent); text-decoration: none; }
  a:hover{ color: var(--accent-strong); }

  img{ max-width:100%; display:block; }

  .wrap{
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 28px;
  }

  /* ---------- NAV ---------- */
  .nav{
    position: sticky; top:0; z-index: 50;
    backdrop-filter: blur(10px);
    background: rgba(10,14,23,.75);
    border-bottom: 1px solid var(--border-soft);
  }
  .nav-inner{
    max-width: 1080px; margin: 0 auto; padding: 14px 28px;
    display:flex; align-items:center; justify-content:space-between; gap: 16px;
  }
  .nav-brand{
    font-family: var(--display); font-weight:700; font-size: 15px;
    color: var(--text); display:flex; align-items:center; gap:8px;
    white-space: nowrap;
  }
  .nav-links{
    display:flex; gap: 22px; overflow-x:auto; scrollbar-width:none;
  }
  .nav-links::-webkit-scrollbar{ display:none; }
  .nav-links a{
    color: var(--text-muted); font-size: 13.5px; font-weight:500; white-space:nowrap;
    transition: color .15s ease;
  }
  .nav-links a:hover{ color: var(--text); }

  /* ---------- HERO ---------- */
  .hero{
    padding: 96px 0 64px;
    border-bottom: 1px solid var(--border-soft);
    position: relative;
  }
  .eyebrow{
    display:inline-flex; align-items:center; gap:8px;
    font-family: var(--mono); font-size: 12.5px; letter-spacing:.06em;
    color: var(--accent); background: var(--accent-soft);
    border: 1px solid rgba(0,200,150,.3);
    padding: 6px 14px; border-radius: 999px; margin-bottom: 22px;
  }
  .eyebrow .dot{
    width:6px; height:6px; border-radius:50%; background: var(--accent-strong);
    box-shadow: 0 0 0 3px rgba(0,200,150,.2);
  }
  h1.title{
    font-family: var(--display);
    font-size: clamp(34px, 5.5vw, 56px);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
    background: linear-gradient(180deg, #fff, #b9c2d6 140%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .hero-desc{
    font-size: 17px; color: var(--text-muted); max-width: 680px; margin: 0 0 36px;
  }
  .badge-grid{
    display:flex; flex-wrap:wrap; gap: 10px;
  }
  .badge{
    display:flex; align-items:center; gap:8px;
    background: var(--surface); border:1px solid var(--border);
    padding: 9px 15px; border-radius: 999px;
    font-family: var(--mono); font-size: 13px; color: var(--text);
    transition: transform .15s ease, border-color .15s ease, background .15s ease;
  }
  .badge:hover{ transform: translateY(-2px); border-color: var(--accent); background: var(--surface-2); }

  /* ---------- SECTION SHELL ---------- */
  section.block{ padding: 72px 0; border-bottom: 1px solid var(--border-soft); }
  section.block:last-of-type{ border-bottom: none; }
  .section-head{ margin-bottom: 36px; }
  .section-label{
    font-family: var(--mono); font-size: 12px; color: var(--text-dim);
    letter-spacing:.08em; text-transform: uppercase; margin: 0 0 10px;
  }
  h2.section-title{
    font-family: var(--display); font-size: clamp(24px,3.2vw,32px);
    font-weight: 700; margin: 0; letter-spacing: -0.01em;
    display:flex; align-items:center; gap: 12px;
  }
  .section-sub{ color: var(--text-muted); font-size: 15.5px; max-width: 720px; margin-top: 14px; }

  /* ---------- OVERVIEW ---------- */
  .overview-grid{ display:grid; gap: 14px; margin-top: 8px; }
  .overview-point{
    display:flex; gap: 14px; padding: 18px 20px;
    background: var(--surface); border:1px solid var(--border); border-radius: var(--radius-sm);
  }
  .overview-point .icon{
    font-size: 18px; flex-shrink:0; width: 30px; height:30px; display:flex;
    align-items:center; justify-content:center; background: var(--accent-soft);
    border-radius: 8px;
  }
  .overview-point p{ margin:0; color: var(--text-muted); font-size: 14.5px; }
  .overview-point strong{ color: var(--text); }

  /* ---------- IMAGE CARD ---------- */
  figure.shot{
    margin: 36px 0 0; background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 14px; box-shadow: var(--shadow);
  }
  figure.shot img{ border-radius: 10px; border:1px solid var(--border-soft); width:100%; }
  figure.shot figcaption{
    margin-top: 14px; text-align:center; font-size: 13.5px; color: var(--text-muted); font-style: italic;
  }

  /* ---------- FEATURE CARDS ---------- */
  .feature-grid{
    display:grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr));
    gap: 18px; margin-top: 8px;
  }
  .feature-card{
    background: var(--surface); border:1px solid var(--border); border-radius: var(--radius);
    padding: 24px; transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
  }
  .feature-card:hover{ transform: translateY(-4px); border-color: rgba(0,200,150,.4); box-shadow: var(--shadow); }
  .feature-card h3{
    font-family: var(--display); font-size: 16.5px; margin: 0 0 14px;
    display:flex; align-items:center; gap:9px;
  }
  .feature-card ul{ margin:0; padding-left: 18px; color: var(--text-muted); font-size: 14px; }
  .feature-card li{ margin-bottom: 6px; }

  /* ---------- TECH STACK GRID ---------- */
  .tech-grid{
    display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
    gap: 16px; margin-top: 8px;
  }
  .tech-col{
    background: var(--surface); border:1px solid var(--border); border-radius: var(--radius);
    padding: 20px;
  }
  .tech-col h4{
    font-family: var(--mono); font-size: 12.5px; text-transform: uppercase; letter-spacing:.07em;
    color: var(--accent-2); margin: 0 0 14px;
  }
  .tech-col ul{ list-style:none; margin:0; padding:0; }
  .tech-col li{
    font-size: 14.5px; color: var(--text); padding: 7px 0; border-bottom: 1px dashed var(--border-soft);
  }
  .tech-col li:last-child{ border-bottom:none; }

  /* ---------- TERMINAL / CODE BLOCK ---------- */
  .terminal{
    background: var(--bg-alt); border: 1px solid var(--border); border-radius: var(--radius);
    overflow:hidden; margin: 14px 0 28px; box-shadow: var(--shadow);
  }
  .terminal-bar{
    display:flex; align-items:center; gap:8px; padding: 11px 16px;
    background: var(--surface-2); border-bottom: 1px solid var(--border);
  }
  .terminal-bar span{ width:10px; height:10px; border-radius:50%; display:inline-block; }
  .dot-red{ background:#ff5f56; } .dot-yellow{ background:#ffbd2e; } .dot-green{ background:#27c93f; }
  .terminal-label{
    margin-left: 8px; font-family: var(--mono); font-size:12px; color: var(--text-dim);
  }
  .terminal pre{
    margin:0; padding: 18px 20px; overflow-x:auto;
    font-family: var(--mono); font-size: 13.5px; line-height:1.8; color: #d8f5ea;
  }
  .terminal pre .cmt{ color: var(--text-dim); }

  .step{
    display:flex; gap: 16px; align-items:flex-start; margin-bottom: 6px;
  }
  .step-num{
    font-family: var(--mono); font-size: 13px; color: var(--accent);
    background: var(--accent-soft); border:1px solid rgba(0,200,150,.3);
    width: 28px; height: 28px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    flex-shrink:0; margin-top: 2px;
  }
  .step h4{ font-family: var(--display); font-size: 15.5px; margin: 3px 0 8px; }

  /* ---------- FOLDER TREE ---------- */
  .tree{
    font-family: var(--mono); font-size: 14px; color: var(--text-muted); line-height: 2;
    white-space: pre; overflow-x:auto;
  }
  .tree .folder{ color: var(--accent-2); }
  .tree .file{ color: var(--text); }

  /* ---------- AUTH FLOW ---------- */
  .flow{
    display:flex; flex-direction:column; align-items:center; gap: 0; margin: 8px 0 0;
  }
  .flow-step{
    width: 100%; max-width: 460px;
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm);
    padding: 16px 22px; text-align:center; font-weight:600; font-size: 14.5px;
    display:flex; align-items:center; justify-content:center; gap:10px;
  }
  .flow-step .n{
    font-family: var(--mono); color: var(--accent); font-size:12px; background: var(--accent-soft);
    padding: 3px 9px; border-radius: 6px;
  }
  .flow-arrow{ color: var(--text-dim); font-size: 20px; margin: 6px 0; }
  .flow-desc{ color: var(--text-muted); font-size: 14.5px; margin-top: 28px; max-width: 700px; }

  /* ---------- API TABLE ---------- */
  .api-table-wrap{
    overflow-x:auto; border: 1px solid var(--border); border-radius: var(--radius); margin-top: 8px;
  }
  table.api-table{ width:100%; border-collapse: collapse; font-size: 14px; min-width: 560px; }
  table.api-table thead th{
    text-align:left; background: var(--surface-2); color: var(--text-dim);
    font-family: var(--mono); font-size: 11.5px; text-transform: uppercase; letter-spacing:.06em;
    padding: 14px 18px; border-bottom: 1px solid var(--border);
  }
  table.api-table td{
    padding: 14px 18px; border-bottom: 1px solid var(--border-soft); color: var(--text-muted);
  }
  table.api-table tr:last-child td{ border-bottom:none; }
  table.api-table tr:hover td{ background: var(--surface); color: var(--text); }
  .method{
    font-family: var(--mono); font-size: 12px; font-weight:600; padding: 4px 10px; border-radius: 6px;
    display:inline-block;
  }
  .m-post{ background: rgba(0,200,150,.14); color: var(--accent-strong); }
  .m-get{ background: rgba(91,157,255,.14); color: var(--blue); }
  .m-put{ background: rgba(255,176,32,.14); color: var(--accent-2); }
  .m-delete{ background: rgba(255,107,107,.14); color: var(--red); }
  code.inline{ font-family: var(--mono); color: var(--text); }

  /* ---------- DB DESIGN ---------- */
  .db-grid{ display:grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap:18px; margin-top: 8px; }
  .db-card{
    background: var(--surface); border:1px solid var(--border); border-radius: var(--radius); padding: 22px;
  }
  .db-card h4{
    font-family: var(--mono); font-size: 14px; color: var(--accent-2); margin: 0 0 12px;
    padding-bottom: 10px; border-bottom: 1px dashed var(--border-soft);
  }
  .db-card ul{ margin:0; padding-left: 18px; color: var(--text-muted); font-size: 14px; }
  .db-card li{ margin-bottom: 6px; }

  /* ---------- GALLERY ---------- */
  .gallery-grid{
    display:grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 14px; margin-top: 8px;
  }
  .gallery-item{
    background: var(--surface); border:1px solid var(--border); border-radius: var(--radius-sm);
    padding: 8px; transition: transform .18s ease, border-color .18s ease;
  }
  .gallery-item:hover{ transform: translateY(-3px); border-color: rgba(0,200,150,.4); }
  .gallery-item img{ border-radius: 6px; }
  .gallery-item span{
    display:block; margin-top: 8px; font-size: 12px; color: var(--text-dim); text-align:center;
    font-family: var(--mono);
  }

  /* ---------- FUTURE / LICENSE / AUTHOR ---------- */
  .chip-grid{ display:flex; flex-wrap:wrap; gap: 10px; margin-top: 8px; }
  .chip{
    font-size: 14px; color: var(--text); background: var(--surface); border:1px solid var(--border);
    padding: 10px 16px; border-radius: 10px; display:flex; align-items:center; gap:8px;
  }
  .chip:before{ content:"◆"; color: var(--accent); font-size: 9px; }

  .license-card{
    background: var(--surface); border:1px solid var(--border); border-radius: var(--radius);
    padding: 26px; margin-top: 8px;
  }
  .license-card .lic-title{
    font-family: var(--mono); color: var(--accent-2); font-size: 13px; letter-spacing:.05em; margin-bottom:10px;
  }
  .license-card p{ margin:0; color: var(--text-muted); font-size: 14.5px; }

  .author-card{
    display:flex; align-items:center; gap: 20px; background: var(--surface);
    border:1px solid var(--border); border-radius: var(--radius); padding: 26px; margin-top: 8px;
  }
  .avatar{
    width: 58px; height: 58px; border-radius: 50%; flex-shrink:0;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    display:flex; align-items:center; justify-content:center;
    font-family: var(--display); font-weight:700; font-size: 22px; color:#0a0e17;
  }
  .author-card h3{ margin:0 0 4px; font-family: var(--display); font-size: 18px; }
  .author-card p{ margin:0; color: var(--text-muted); font-size: 14px; }

  footer{
    text-align:center; padding: 40px 0 60px; color: var(--text-dim); font-size: 13px; font-family: var(--mono);
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 720px){
    .hero{ padding: 64px 0 44px; }
    section.block{ padding: 52px 0; }
    .nav-inner{ padding: 12px 20px; }
    .author-card{ flex-direction:column; text-align:center; }
  }
  @media (max-width: 480px){
    .wrap{ padding: 0 18px; }
    .badge{ font-size: 12px; padding: 8px 12px; }
  }
</style>
</head>
<body>

  <nav class="nav">
    <div class="nav-inner">
      <div class="nav-brand">🚀 Task Management API</div>
      <div class="nav-links">
        <a href="#overview">Overview</a>
        <a href="#features">Features</a>
        <a href="#stack">Stack</a>
        <a href="#structure">Structure</a>
        <a href="#setup">Setup</a>
        <a href="#auth">Auth</a>
        <a href="#api">API</a>
        <a href="#db">Database</a>
      </div>
    </div>
  </nav>

  <!-- ============ HERO ============ -->
  <header class="hero">
    <div class="wrap">
      <span class="eyebrow"><span class="dot"></span> FULL STACK · TASK MANAGEMENT · REST API</span>
      <h1 class="title">🚀 Task Management API</h1>
      <p class="hero-desc">
        A professional Task Management API built with a FastAPI backend and a connected frontend
        interface — letting users securely manage tasks through authentication, CRUD operations,
        database integration, and a clean RESTful architecture.
      </p>
      <div class="badge-grid">
        <span class="badge">🐍 Python</span>
        <span class="badge">⚡ FastAPI</span>
        <span class="badge">🗄 MySQL</span>
        <span class="badge">🔐 JWT Authentication</span>
        <span class="badge">🧩 SQLAlchemy</span>
        <span class="badge">✅ Pydantic</span>
        <span class="badge">🌐 Frontend Application</span>
        <span class="badge">📜 MIT License</span>
      </div>
    </div>
  </header>

  <!-- ============ OVERVIEW ============ -->
  <section class="block" id="overview">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">01 — Introduction</p>
        <h2 class="section-title">📌 Project Overview</h2>
        <p class="section-sub">
          A quick look at what this project does, why it exists, and how the pieces fit together.
        </p>
      </div>

      <div class="overview-grid">
        <div class="overview-point">
          <span class="icon">🎯</span>
          <p><strong>What it does —</strong> The Task Management API lets registered users create,
          view, update, and delete their own tasks through a secure, authenticated backend.</p>
        </div>
        <div class="overview-point">
          <span class="icon">💡</span>
          <p><strong>Why it was built —</strong> Created to demonstrate real-world backend engineering:
          authentication systems, database-driven design, and full-stack integration in one working project.</p>
        </div>
        <div class="overview-point">
          <span class="icon">🧑‍💻</span>
          <p><strong>How users interact —</strong> Users register and log in through the frontend dashboard,
          then manage their tasks through a simple, authenticated interface backed by the API.</p>
        </div>
        <div class="overview-point">
          <span class="icon">🔗</span>
          <p><strong>Backend + frontend integration —</strong> The frontend communicates with the FastAPI
          backend over HTTP, sending authenticated requests and rendering the returned task data.</p>
        </div>
        <div class="overview-point">
          <span class="icon">🌐</span>
          <p><strong>REST API architecture —</strong> Every action in the app — auth, task creation, updates,
          deletion — is exposed as a clean, predictable REST endpoint.</p>
        </div>
        <div class="overview-point">
          <span class="icon">🗄</span>
          <p><strong>Database-driven —</strong> All user accounts and tasks are persisted in a MySQL database
          through SQLAlchemy models, keeping data consistent and relational.</p>
        </div>
      </div>

      <figure class="shot">
        <img src="Images/02_Frontend_dashboard_overview.png" alt="Application dashboard showing the task management interface">
        <figcaption>"Application dashboard showing the task management interface."</figcaption>
      </figure>
    </div>
  </section>

  <!-- ============ FEATURES ============ -->
  <section class="block" id="features">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">02 — Capabilities</p>
        <h2 class="section-title">⚙️ Features</h2>
      </div>

      <div class="feature-grid">
        <div class="feature-card">
          <h3>🔐 Authentication</h3>
          <ul>
            <li>User registration</li>
            <li>User login</li>
            <li>JWT based authentication</li>
            <li>Protected routes</li>
          </ul>
        </div>
        <div class="feature-card">
          <h3>📝 Task Management</h3>
          <ul>
            <li>Create tasks</li>
            <li>View tasks</li>
            <li>Update tasks</li>
            <li>Delete tasks</li>
          </ul>
        </div>
        <div class="feature-card">
          <h3>🗄 Database Management</h3>
          <ul>
            <li>User data storage</li>
            <li>Task data storage</li>
            <li>Database relationships</li>
          </ul>
        </div>
        <div class="feature-card">
          <h3>📚 API Documentation</h3>
          <ul>
            <li>Swagger UI</li>
            <li>API testing</li>
          </ul>
        </div>
        <div class="feature-card">
          <h3>🎨 Frontend Interface</h3>
          <ul>
            <li>User-friendly dashboard</li>
            <li>Task interaction</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ TECH STACK ============ -->
  <section class="block" id="stack">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">03 — Tooling</p>
        <h2 class="section-title">🏗 Tech Stack</h2>
      </div>

      <div class="tech-grid">
        <div class="tech-col">
          <h4>Backend</h4>
          <ul>
            <li>Python</li>
            <li>FastAPI</li>
            <li>Uvicorn</li>
          </ul>
        </div>
        <div class="tech-col">
          <h4>Database</h4>
          <ul>
            <li>MySQL</li>
          </ul>
        </div>
        <div class="tech-col">
          <h4>ORM</h4>
          <ul>
            <li>SQLAlchemy</li>
          </ul>
        </div>
        <div class="tech-col">
          <h4>Validation</h4>
          <ul>
            <li>Pydantic</li>
          </ul>
        </div>
        <div class="tech-col">
          <h4>Authentication</h4>
          <ul>
            <li>JWT</li>
            <li>OAuth2</li>
          </ul>
        </div>
        <div class="tech-col">
          <h4>Frontend</h4>
          <ul>
            <li>Frontend Application</li>
          </ul>
        </div>
        <div class="tech-col">
          <h4>Tools</h4>
          <ul>
            <li>Git</li>
            <li>GitHub</li>
            <li>VS Code</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ PROJECT STRUCTURE ============ -->
  <section class="block" id="structure">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">04 — Layout</p>
        <h2 class="section-title">📂 Project Structure</h2>
      </div>

      <div class="terminal">
        <div class="terminal-bar">
          <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
          <span class="terminal-label">tree</span>
        </div>
        <pre class="tree">task-management-API/
├── <span class="folder">backend/</span>
├── <span class="folder">frontend/</span>
├── <span class="folder">Images/</span>
│   ├── <span class="file">01_Frontend_login_page.png</span>
│   ├── <span class="file">02_Frontend_dashboard_overview.png</span>
│   ├── <span class="file">03_FastAPI_Swagger_UI.png</span>
│   ├── <span class="file">04_console_preview_backend.png</span>
│   ├── <span class="file">05_console_preview_frontend.png</span>
│   └── <span class="file">06_database_schemas.png</span>
└── <span class="file">.gitignore</span></pre>
      </div>
    </div>
  </section>

  <!-- ============ INSTALLATION ============ -->
  <section class="block" id="setup">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">05 — Getting Started</p>
        <h2 class="section-title">🚀 Installation &amp; Setup</h2>
      </div>

      <div class="step">
        <span class="step-num">1</span>
        <div style="width:100%">
          <h4>Clone the repository</h4>
          <div class="terminal">
            <div class="terminal-bar"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span><span class="terminal-label">bash</span></div>
            <pre>git clone https://github.com/your-username/task-management-API.git
cd task-management-API</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <span class="step-num">2</span>
        <div style="width:100%">
          <h4>Create a virtual environment</h4>
          <div class="terminal">
            <div class="terminal-bar"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span><span class="terminal-label">bash</span></div>
            <pre>python -m venv venv
venv\Scripts\activate      <span class="cmt"># Windows</span>
source venv/bin/activate   <span class="cmt"># Mac / Linux</span></pre>
          </div>
        </div>
      </div>

      <div class="step">
        <span class="step-num">3</span>
        <div style="width:100%">
          <h4>Install backend dependencies</h4>
          <div class="terminal">
            <div class="terminal-bar"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span><span class="terminal-label">bash</span></div>
            <pre>cd backend
pip install -r requirements.txt</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <span class="step-num">4</span>
        <div style="width:100%">
          <h4>Configure environment variables</h4>
          <div class="terminal">
            <div class="terminal-bar"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span><span class="terminal-label">.env</span></div>
            <pre>DATABASE_URL=mysql+pymysql://user:password@localhost/db_name
SECRET_KEY=your_secret_key
ALGORITHM=HS256</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <span class="step-num">5</span>
        <div style="width:100%">
          <h4>Set up the database</h4>
          <div class="terminal">
            <div class="terminal-bar"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span><span class="terminal-label">bash</span></div>
            <pre>mysql -u root -p
CREATE DATABASE db_name;</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <span class="step-num">6</span>
        <div style="width:100%">
          <h4>Start the backend server</h4>
          <div class="terminal">
            <div class="terminal-bar"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span><span class="terminal-label">bash</span></div>
            <pre>uvicorn main:app --reload</pre>
          </div>
          <figure class="shot">
            <img src="Images/04_console_preview_backend.png" alt="Backend server running successfully">
            <figcaption>"Backend server running successfully."</figcaption>
          </figure>
        </div>
      </div>

      <div class="step">
        <span class="step-num">7</span>
        <div style="width:100%">
          <h4>Start the frontend application</h4>
          <div class="terminal">
            <div class="terminal-bar"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span><span class="terminal-label">bash</span></div>
            <pre>cd frontend
<span class="cmt"># run the frontend using its respective start command</span></pre>
          </div>
          <figure class="shot">
            <img src="Images/05_console_preview_frontend.png" alt="Frontend application running successfully">
            <figcaption>"Frontend application running successfully."</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ AUTH FLOW ============ -->
  <section class="block" id="auth">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">06 — Security</p>
        <h2 class="section-title">🔑 Authentication Flow</h2>
      </div>

      <div class="flow">
        <div class="flow-step"><span class="n">01</span> User Registration</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step"><span class="n">02</span> User Login</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step"><span class="n">03</span> JWT Token Generated</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step"><span class="n">04</span> Authorization Header</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step"><span class="n">05</span> Protected API Access</div>
      </div>

      <p class="flow-desc">
        When a user registers, their credentials are securely stored in the database. On login,
        the API verifies the credentials and issues a signed JWT token. This token is then sent
        with every subsequent request inside the <code class="inline">Authorization: Bearer &lt;token&gt;</code>
        header, allowing the API to verify the user's identity and grant access to protected
        task endpoints without requiring the user to log in again on every request.
      </p>

      <figure class="shot">
        <img src="Images/01_Frontend_login_page.png" alt="Login interface demonstrating user authentication">
        <figcaption>"Login interface demonstrating user authentication."</figcaption>
      </figure>
    </div>
  </section>

  <!-- ============ API DOCUMENTATION ============ -->
  <section class="block" id="api">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">07 — Reference</p>
        <h2 class="section-title">📘 API Documentation</h2>
        <p class="section-sub">
          FastAPI automatically generates interactive Swagger documentation for every endpoint,
          available at:
          <code class="inline">http://127.0.0.1:8000/docs</code> — where each route can be tested
          directly from the browser.
        </p>
      </div>

      <div class="api-table-wrap">
        <table class="api-table">
          <thead>
            <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="method m-post">POST</span></td><td><code class="inline">/auth/register</code></td><td>Register user</td></tr>
            <tr><td><span class="method m-post">POST</span></td><td><code class="inline">/auth/login</code></td><td>Login user</td></tr>
            <tr><td><span class="method m-get">GET</span></td><td><code class="inline">/tasks</code></td><td>Retrieve tasks</td></tr>
            <tr><td><span class="method m-post">POST</span></td><td><code class="inline">/tasks</code></td><td>Create task</td></tr>
            <tr><td><span class="method m-put">PUT</span></td><td><code class="inline">/tasks/{id}</code></td><td>Update task</td></tr>
            <tr><td><span class="method m-delete">DELETE</span></td><td><code class="inline">/tasks/{id}</code></td><td>Delete task</td></tr>
          </tbody>
        </table>
      </div>

      <figure class="shot">
        <img src="Images/03_FastAPI_Swagger_UI.png" alt="FastAPI Swagger UI documentation and API testing interface">
        <figcaption>"FastAPI Swagger UI documentation and API testing interface."</figcaption>
      </figure>
    </div>
  </section>

  <!-- ============ DATABASE DESIGN ============ -->
  <section class="block" id="db">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">08 — Data Layer</p>
        <h2 class="section-title">🗄 Database Design</h2>
        <p class="section-sub">
          Data is modeled with SQLAlchemy across two related tables, keeping user accounts and
          their tasks properly connected.
        </p>
      </div>

      <div class="db-grid">
        <div class="db-card">
          <h4>Users Table</h4>
          <ul>
            <li>User information</li>
            <li>Authentication details</li>
          </ul>
        </div>
        <div class="db-card">
          <h4>Tasks Table</h4>
          <ul>
            <li>Task information</li>
            <li>User relationship</li>
          </ul>
        </div>
      </div>

      <figure class="shot">
        <img src="Images/06_database_schemas.png" alt="MySQL database schema showing application tables">
        <figcaption>"MySQL database schema showing application tables."</figcaption>
      </figure>
    </div>
  </section>

  <!-- ============ SCREENSHOTS ============ -->
  <section class="block" id="screenshots">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">09 — Gallery</p>
        <h2 class="section-title">🖥 Project Screenshots</h2>
      </div>

      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="Images/01_Frontend_login_page.png" alt="Login page">
          <span>Login Page</span>
        </div>
        <div class="gallery-item">
          <img src="Images/02_Frontend_dashboard_overview.png" alt="Dashboard overview">
          <span>Dashboard</span>
        </div>
        <div class="gallery-item">
          <img src="Images/03_FastAPI_Swagger_UI.png" alt="Swagger UI">
          <span>Swagger UI</span>
        </div>
        <div class="gallery-item">
          <img src="Images/04_console_preview_backend.png" alt="Backend console">
          <span>Backend Console</span>
        </div>
        <div class="gallery-item">
          <img src="Images/05_console_preview_frontend.png" alt="Frontend console">
          <span>Frontend Console</span>
        </div>
        <div class="gallery-item">
          <img src="Images/06_database_schemas.png" alt="Database schema">
          <span>Database Schema</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ FUTURE IMPROVEMENTS ============ -->
  <section class="block" id="future">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">10 — Roadmap</p>
        <h2 class="section-title">🔮 Future Improvements</h2>
      </div>

      <div class="chip-grid">
        <span class="chip">Task priorities</span>
        <span class="chip">Deadlines</span>
        <span class="chip">Notifications</span>
        <span class="chip">Docker support</span>
        <span class="chip">Cloud deployment</span>
        <span class="chip">Automated testing</span>
      </div>
    </div>
  </section>

  <!-- ============ LICENSE ============ -->
  <section class="block" id="license">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">11 — Legal</p>
        <h2 class="section-title">📜 License</h2>
      </div>

      <div class="license-card">
        <div class="lic-title">MIT LICENSE © 2026 ABDULLAH AMIN</div>
        <p>
          This project is licensed under the MIT License — meaning it can be freely used, copied,
          modified, and distributed, including for commercial purposes, as long as the original
          copyright notice is retained.
        </p>
      </div>
    </div>
  </section>

  <!-- ============ AUTHOR ============ -->
  <section class="block" id="author" style="border-bottom:none;">
    <div class="wrap">
      <div class="section-head">
        <p class="section-label">12 — Credits</p>
        <h2 class="section-title">👨‍💻 Author</h2>
      </div>

      <div class="author-card">
        <div class="avatar">AA</div>
        <div>
          <h3>Abdullah Amin</h3>
          <p>Backend Developer · Python · FastAPI · AI Enthusiast</p>
        </div>
      </div>
    </div>
  </section>

  <footer>
    Built with FastAPI, MySQL &amp; SQLAlchemy — © 2026 Abdullah Amin
  </footer>

</body>
</html>
