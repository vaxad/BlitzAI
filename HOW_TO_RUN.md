# How to Run FlowPro

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18 or higher) and **npm**
- **Python** (v3.9 or higher) and **pip**
- **Neo4j** database instance (local or cloud via Neo4j Aura)
- An **OpenAI API key**

---

## 1. Clone the Repository

```bash
git clone https://github.com/vaxad/flowpro.git
cd flowpro
```

---

## 2. Environment Variables

### AI Backend (FastAPI) — `backend/.env`

Create a `.env` file inside the project root (where the `backend/` folder can read it):

| Variable | Description |
|---|---|
| `NEO4J_URI` | Neo4j connection URI (e.g., `bolt://localhost:7687` or Aura URI) |
| `NEO4J_USER` | Neo4j username (default: `neo4j`) |
| `NEO4J_PASSWORD` | Neo4j password |
| `OPENAI_API_KEY` | OpenAI API key (used for GPT-4o and embeddings) |

Example `.env`:

```env
NEO4J_URI="bolt://localhost:7687"
NEO4J_USER="neo4j"
NEO4J_PASSWORD="your_password"
OPENAI_API_KEY="sk-..."
```

### Frontend (Next.js)

No `.env` file is required for the frontend by default. The FastAPI backend URL is hardcoded in `src/lib/constants.ts`:

```
FLASK_API = "https://flowpro-65lw.onrender.com"
```

To use your local backend, update this to:

```
FLASK_API = "http://127.0.0.1:5000"
```

---

## 3. Install Dependencies

### Frontend (Next.js)

```bash
cd frontend
npm install
cd ..
```

### AI Backend (Python / FastAPI)

```bash
pip install -r backend/requirements.txt
```

---

## 4. Set Up Neo4j

1. Install Neo4j Community Edition or create a free Neo4j Aura instance.
2. Start the Neo4j server and ensure it is accessible at the URI specified in your `.env`.
3. No manual schema setup is needed — FlowPro creates nodes, edges, and indexes automatically via the API.

---

## 5. Run the Services

You need to run **two services**. Open separate terminal windows for each.

### Terminal 1 — Frontend (Next.js)

```bash
cd frontend
npm run dev
```

Runs on: `http://localhost:3000`

### Terminal 2 — AI Backend (FastAPI)

```bash
uvicorn backend.app:app --reload --port 5000
```

Runs on: `http://127.0.0.1:5000`

---

## 6. Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

### Quick Start

1. **Create ER Diagram**: Navigate to `/create` and use the Flow editor, Form editor, or JSON editor to define your entities and relationships.
2. **Use AI Prompt**: Navigate to `/prompt`, enter a project description or upload a BRD/PDF, and let AI generate the ER diagram for you.
3. **Generate Backend**: Click "Generate Project" to download a fully functional Express.js backend + Next.js admin panel as ZIP files.
4. **Query Documentation**: Navigate to `/query` to ask natural-language questions about the generated code using the GraphRAG system.

---

## 7. Live Demo

A hosted version is available at:

```
https://flow-pro.vercel.app
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Neo4j connection failures | Verify `NEO4J_URI`, `NEO4J_USER`, and `NEO4J_PASSWORD` in your `.env` |
| OpenAI API errors | Ensure your `OPENAI_API_KEY` is valid and has GPT-4o access |
| CORS errors in browser | Ensure both frontend and backend are running and the `FLASK_API` constant matches your backend URL |
| Python module not found | Run `pip install -r backend/requirements.txt` from the project root |
| Frontend build errors | Run `npm install` inside the `frontend/` directory |
