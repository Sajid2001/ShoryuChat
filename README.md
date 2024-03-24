# ShoryuChat
## An OpenAI-powered chat app that answers your biggest Street Fighter 6 Questions
![image](https://github.com/Sajid2001/ShoryuChat/assets/60523377/d83e0c7c-e8b2-46a2-893f-2c677ecfe65d)

## Demo

### Messaging
https://github.com/Sajid2001/ShoryuChat/assets/60523377/1a5763a9-bb11-41b8-b7c9-493799ed1fe3

### Multiple Conversations
https://github.com/Sajid2001/ShoryuChat/assets/60523377/83ceddec-61f1-4be1-8567-12b3d7bb70a9

### Dark Mode
https://github.com/Sajid2001/ShoryuChat/assets/60523377/942d2795-77fa-48d7-ac0c-3aec2d55c4e9

## Stack
- React (Vite)
- TypeScript
- TailwindCSS
- Python
- Flask
- OpenAI
- Chroma
- LangChain
- SQLAlchemy (SQLite)
- AuthLib (Google, Github, Facebook)

## Dev Setup

### Install dependencies

#### Frontend
1. Run `npm install` in the `frontend` directory
#### Backend
1. Run `python -m venv venv` in the `backend` directory
    - You should get a newly generated `venv` folder in the `backend`directory
2. Run `venv/Scripts/activate` in the `backend` directory to activate the virtual environment
    - This download your dependencies in the newly generated `venv` folder instead of locally
3. Run `pip install -r requirements.txt` in the `backend` directory to install dependencies inside the virtual environment

**Note: Make sure your compiler path in your editor points to `venv/Scripts/python.exe` inside your `backend` directory or else your virtual dependencies will not be recognized**

### Environment Vars

#### Backend
```
PORT=<Backend Port Number>
DB_NAME=<Name of SQLite Database>
SECRET_KEY=<Flask Secret Key>
OPENAI_API_KEY=<OpenAI Key>


GITHUB_CLIENT_ID=<Github OAuth Client Id>
GITHUB_CLIENT_SECRET=<Github OAuth Client Secret>
GITHUB_REDIRECT_URI=<Github OAuth Redirect Uri>

GOOGLE_CLIENT_ID=<Google OAuth Client Id>
GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>

FACEBOOK_CLIENT_ID=<Facebook OAuth Client Id>
FACEBOOK_CLIENT_SECRET=<Facebook OAuth Client Secret>
```

## Roadmap
- [x] Train on all other SF Characters
- [ ] Train on Combo data
- [ ] Train on Matchups
- [x] Add mobile responsiveness to chat
- [x] Add dark mode
- [ ] Implement Chat Memory (Postponed indefinitely)
