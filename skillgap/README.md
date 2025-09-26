# Skill Gap Analyzer (Flask + SQLite)

## Run locally

1. Create venv and install deps
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the app
```powershell
$env:FLASK_APP="app.py"
$env:FLASK_ENV="development"
python app.py
```

3. Open in browser
- Home: `http://127.0.0.1:5000/`
- Login: `http://127.0.0.1:5000/login`

## Notes
- SQLite DB file: `app.db` (auto-created)
- Templates: `templates/webpage.html`, `templates/log.html`
- Static: `static/style.css`, `static/stylelog.css`, `static/app.js`, `static/applog.js`
- APIs: `/api/signup`, `/api/login`, `/api/forgot`

