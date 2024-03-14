from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from authlib.integrations.flask_client import OAuth
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()
oauth = OAuth()
ma = Marshmallow()
DB_NAME = os.getenv('DB_NAME')

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    oauth.init_app(app)

    from .views.messages import messages
    from .views.conversations import conversations
    from .views.auth.auth import auth
    from .views.auth.github import github_auth
    from .views.auth.google import google_auth
    from .views.auth.facebook import facebook_auth

    app.register_blueprint(messages, url_prefix='/api')
    app.register_blueprint(conversations, url_prefix='/api')
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(github_auth, url_prefix='/auth')
    app.register_blueprint(google_auth, url_prefix='/auth')
    app.register_blueprint(facebook_auth, url_prefix='/auth')

    with app.app_context():
        db.create_all()

    return app

def create_database(app):
    if not os.path.exists('app/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database')