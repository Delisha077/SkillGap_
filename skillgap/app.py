from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os
from io import BytesIO

try:
    from PyPDF2 import PdfReader
except Exception:
    PdfReader = None

try:
    import docx  # python-docx
except Exception:
    docx = None


DB_PATH = os.path.join(os.path.dirname(__file__), 'app.db')


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        # Seed a default demo account for quick login
        try:
            demo_password_hash = generate_password_hash('demo123')
            conn.execute(
                'INSERT OR IGNORE INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                ('Demo User', 'demo@student.com', demo_password_hash)
            )
        except Exception:
            pass
        conn.commit()


def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-change-me')

    # Initialize DB on startup
    init_db()

    @app.route('/')
    def home():
        return render_template('webpage.html')

    @app.route('/login')
    def login():
        return render_template('log.html')

    # --- Auth APIs ---
    @app.post('/api/signup')
    def api_signup():
        data = request.get_json(silent=True) or {}
        name = (data.get('name') or '').strip()
        email = (data.get('email') or '').strip().lower()
        password = data.get('password') or ''
        if not name or not email or not password:
            return jsonify({"ok": False, "message": "Missing required fields"}), 400

        password_hash = generate_password_hash(password)
        try:
            with get_db_connection() as conn:
                conn.execute(
                    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                    (name, email, password_hash)
                )
                conn.commit()
        except sqlite3.IntegrityError:
            return jsonify({"ok": False, "message": "Email already registered"}), 409

        return jsonify({"ok": True, "message": "Account created"})

    @app.post('/api/login')
    def api_login():
        data = request.get_json(silent=True) or {}
        email = (data.get('email') or '').strip().lower()
        password = data.get('password') or ''
        if not email or not password:
            return jsonify({"ok": False, "message": "Email and password are required"}), 400

        with get_db_connection() as conn:
            user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()

        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({"ok": False, "message": "Invalid email or password"}), 401

        session['user_id'] = int(user['id'])
        session['email'] = user['email']
        session['name'] = user['name']
        return jsonify({"ok": True, "message": "Logged in", "user": {"id": user['id'], "name": user['name'], "email": user['email']}})

    @app.post('/api/forgot')
    def api_forgot():
        data = request.get_json(silent=True) or {}
        email = (data.get('email') or '').strip().lower()
        if not email:
            return jsonify({"ok": False, "message": "Email is required"}), 400
        # Demo: pretend to send email
        return jsonify({"ok": True, "message": "Password reset link sent (demo)"})

    @app.get('/api/session')
    def api_session():
        if 'user_id' in session:
            return jsonify({"ok": True, "user": {"id": session['user_id'], "name": session.get('name'), "email": session.get('email')}})
        return jsonify({"ok": False})

    @app.post('/api/parse-resume')
    def api_parse_resume():
        uploaded = request.files.get('file')
        if not uploaded or not uploaded.filename:
            return jsonify({"ok": False, "message": "No file uploaded"}), 400

        filename = uploaded.filename.lower()
        data = uploaded.read()
        text = ''

        try:
            if filename.endswith('.txt'):
                text = data.decode(errors='ignore')
            elif filename.endswith('.pdf'):
                if not PdfReader:
                    return jsonify({"ok": False, "message": "PDF parsing not available on server"}), 500
                reader = PdfReader(BytesIO(data))
                pages = []
                for page in reader.pages:
                    try:
                        pages.append(page.extract_text() or '')
                    except Exception:
                        pages.append('')
                text = "\n".join(pages)
            elif filename.endswith('.docx'):
                if not docx:
                    return jsonify({"ok": False, "message": "DOCX parsing not available on server"}), 500
                document = docx.Document(BytesIO(data))
                text = "\n".join([p.text for p in document.paragraphs])
            else:
                return jsonify({"ok": False, "message": "Unsupported file type. Upload .txt, .pdf, or .docx"}), 415
        except Exception as e:
            return jsonify({"ok": False, "message": f"Failed to read file: {e}"}), 500

        return jsonify({"ok": True, "text": text})

    @app.post('/logout')
    def logout():
        session.clear()
        return redirect(url_for('home'))

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='127.0.0.1', port=5000, debug=True)


