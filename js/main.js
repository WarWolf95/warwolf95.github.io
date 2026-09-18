// ==========================================================================
// Maulik Parmar Portfolio Scripts: Terminal Simulator, SVG Metrics, Filters
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Interactive Terminal Simulator
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');

  const commands = {
    help: `Available commands:
  - <span class="t-accent">about</span>       : Overview of profile and background
  - <span class="t-accent">skills</span>      : Technical arsenal and tools
  - <span class="t-accent">projects</span>    : Production repository directory
  - <span class="t-accent">experience</span>  : Enterprise career history
  - <span class="t-accent">contact</span>     : Direct contact details and location
  - <span class="t-accent">clear</span>       : Reset terminal screen`,

    about: `<span class="t-success">Maulik Parmar</span> - Data Analyst & BI Developer based in London, UK.
Over 6.5 years of enterprise experience at Numerator delivering Power BI reporting suites, writing complex SQL across multi-million-row transactional datasets, and automating operational ETL in Python. MSc Data Science graduate from Coventry University.`,

    skills: `<span class="t-accent">BI & Visualization:</span> Power BI, Advanced DAX, Star Schema, Power Query, Excel
<span class="t-accent">Databases & SQL   :</span> MySQL, PostgreSQL, SQLite, DuckDB, Query Tuning
<span class="t-accent">Python & Analytics:</span> Polars, Pandas, NumPy, Statsmodels, SciPy, Scikit-Learn
<span class="t-accent">Governance & QA   :</span> UK GDPR / DPA 2018, Data Leakage Prevention, pytest, CI/CD`,

    projects: `<span class="t-accent">1. consumer-duty-analytics</span>   : 4-Page Power BI Suite | FCA PS22/9 | 50k Profiles
<span class="t-accent">2. pricing-ab-test</span>           : A/B Pricing Trial | +0.60 pp Lift | 124k Sessions
<span class="t-accent">3. workforce-intelligence</span>    : Power BI Dashboard | ONS ASHE Benchmark | SQL
<span class="t-accent">4. credit-risk-scorecard</span>     : 2.26M Loans | WoE Binning | PDO Scorecard Scaling
<span class="t-accent">5. uk-electricity-pricing</span>    : 96k Intervals | Elexon BMRS | FinBERT Sentiment`,

    experience: `<span class="t-success">Numerator (US Consumer Intelligence)</span>
Role: Data Associate Lead - Analytics & Client Operations (2018 - 2024, 6.5+ yrs)
- Automated Python/MySQL workflows, cutting turnaround by 35%
- Built Power BI dashboards improving client retention by 12% across 15 accounts
- Mentored team of 4 junior analysts raising throughput by 25%
- Recipient of Star Performer, Spot Award, and High Impact Award`,

    contact: `<span class="t-accent">Location:</span> London, United Kingdom
<span class="t-accent">GitHub  :</span> github.com/WarWolf95
<span class="t-accent">LinkedIn:</span> linkedin.com/in/ (via profile)
<span class="t-accent">Status  :</span> Full-Time UK Work Rights (Immediate Start)`
  };

  const printLine = (html, isPrompt = false, cmdText = '') => {
    const div = document.createElement('div');
    div.className = 't-line';
    if (isPrompt) {
      div.innerHTML = `<span class="t-prompt">analyst@parmar:~$</span> <span class="t-cmd">${cmdText}</span>`;
    } else {
      div.innerHTML = `<div class="t-res">${html}</div>`;
    }
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const input = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (!input) return;

        printLine('', true, input);

        if (input === 'clear') {
          terminalBody.innerHTML = '';
          return;
        }

        if (commands[input]) {
          printLine(commands[input]);
        } else {
          printLine(`<span class="t-warn">Command not recognized: '${input}'. Type '<span class="t-accent">help</span>' for a list of valid commands.</span>`);
        }
      }
    });
  }

  // 2. Interactive SVG Chart Switcher
  const chartPath = document.getElementById('chartDataPath');
  const chartArea = document.getElementById('chartAreaPath');
  const chartTitle = document.getElementById('chartActiveTitle');
  const chartStat = document.getElementById('chartActiveStat');
  const metricBtns = document.querySelectorAll('.metric-btn');

  const chartDatasets = {
    latency: {
      title: 'ETL Operational Pipeline Latency (Turnaround Hours)',
      stat: '-35% Processing Time',
      path: 'M 30,170 Q 180,165 320,130 T 600,90 T 900,45 T 1150,25',
      area: 'M 30,170 Q 180,165 320,130 T 600,90 T 900,45 T 1150,25 L 1150,200 L 30,200 Z'
    },
    retention: {
      title: 'Enterprise Account Contract Retention Index',
      stat: '+12% Renewal Rate',
      path: 'M 30,150 Q 200,130 350,110 T 650,75 T 920,40 T 1150,15',
      area: 'M 30,150 Q 200,130 350,110 T 650,75 T 920,40 T 1150,15 L 1150,200 L 30,200 Z'
    },
    scorecard: {
      title: 'Scorecard Regulatory Explainability vs ML Power Capture',
      stat: '98% AUC Benchmark Parity',
      path: 'M 30,180 Q 220,140 400,90 T 700,45 T 950,25 T 1150,20',
      area: 'M 30,180 Q 220,140 400,90 T 700,45 T 950,25 T 1150,20 L 1150,200 L 30,200 Z'
    }
  };

  metricBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      metricBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const metric = btn.getAttribute('data-metric');
      const data = chartDatasets[metric];
      if (data && chartPath && chartArea) {
        chartPath.setAttribute('d', data.path);
        chartArea.setAttribute('d', data.area);
        chartTitle.textContent = data.title;
        chartStat.textContent = data.stat;
      }
    });
  });

  // 3. Technical Stack Matrix Filtering
  const stackFilterBtns = document.querySelectorAll('.stack-filter-btn');
  const stackItems = document.querySelectorAll('.stack-item');

  stackFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stackFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-stack-filter');
      stackItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Projects Category Filter
  const projectFilterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Modal Lightbox
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const thumbs = document.querySelectorAll('.project-thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('src');
      const alt = thumb.getAttribute('alt') || '';
      lightboxImg.setAttribute('src', src);
      lightboxCaption.textContent = alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

});
