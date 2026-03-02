# FlowPro — Detailed Working

This document provides an in-depth explanation of how every component of FlowPro works, including data flows, code generation pipelines, AI integrations, and service communication.

---

## Table of Contents

- [1. System Architecture](#1-system-architecture)
- [2. Frontend (Next.js)](#2-frontend-nextjs)
- [3. AI Backend — FastAPI](#3-ai-backend--fastapi)
- [4. Code Generation Pipelines](#4-code-generation-pipelines)
- [5. AI & LLM Pipelines](#5-ai--llm-pipelines)
- [6. Neo4j Knowledge Graph](#6-neo4j-knowledge-graph)
- [7. End-to-End User Flows](#7-end-to-end-user-flows)

---

## 1. System Architecture

```
┌─────────────────────┐         ┌──────────────────────┐
│   Frontend           │         │  FastAPI AI Backend    │
│   (Next.js)          │────────▶│  (Python)              │
│   Port 3000          │         │  Port 5000             │
│                      │         └──────────┬─────────────┘
│  ┌─────────────────┐ │                    │
│  │ API Routes       │ │                    │
│  │ /api/generate    │ │              ┌─────┴─────┐
│  │ /api/generate_py │ │              │   Neo4j    │
│  │ /api/frontend    │ │              │  (Graph DB)│
│  └─────────────────┘ │              └───────────┘
└─────────────────────┘
         │
         ▼
   ┌───────────────┐
   │ Downloaded ZIP │
   │ (Express.js /  │
   │  FastAPI /     │
   │  Admin Panel)  │
   └───────────────┘
```

- The **Frontend** handles all UI interactions and code generation locally via Next.js API routes.
- The **Frontend** communicates with the **FastAPI backend** for AI-powered features (schema generation from prompts/PDFs, NLP queries, graph operations).
- The **FastAPI backend** connects to **Neo4j** for storing and querying code dependency graphs.
- Generated backends are **downloaded as ZIP files** — they are not deployed or hosted by FlowPro.

---

## 2. Frontend (Next.js)

### Technology

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives) for the component library
- **@xyflow/react** (React Flow) for the interactive ER diagram canvas
- **react-force-graph** for 2D force-directed graph visualization
- **Zustand** for global form state management
- **React Hook Form** + **Zod** for form validation
- **Archiver** (Node.js) for ZIP file generation in API routes
- **Framer Motion** for animations
- **Lenis** for smooth scrolling
- **html-to-image** for exporting the ER diagram as PNG
- **prism-react-renderer** for syntax-highlighted code blocks

### Key Routes

| Route | Purpose |
|---|---|
| `/` | Landing page with animated marquees and feature tabs |
| `/create` | Main editor with three tabs: Flow (visual ER diagram), Form (structured editor), JSON (raw input) |
| `/prompt` | AI-powered schema generation from text prompts or PDF upload |
| `/query` | Natural language Q&A about generated backend code (via GraphRAG) |
| `/docs` | Static documentation for the generated Express.js backend |
| `/test` | Force-directed graph visualization of the Neo4j code graph |

### State Management

- **FormProvider** (React Context) wraps the entire app, providing a shared `react-hook-form` instance with the `GenerateFormData` schema.
- All three editor tabs (Flow, Form, JSON) read from and write to the same form state, so changes in one tab are reflected in the others.
- **Zustand store** (`useFormStore`) provides an additional lightweight store for the form data.

### Data Types

```typescript
// Core schema types
interface Entity {
  name: string;
  attributes: Array<{
    name: string;
    type: "string" | "number" | "boolean" | "Date" | "string[]" | "number[]" | "boolean[]" | "Date[]";
    constraint?: { value?: string; type: "required" | "unique" | "optional" | "default" };
  }>;
}

interface Relation {
  from: string;
  to: string;
  type: "1-?1" | "1-m" | "m-1" | "1?-1";
  name: string;
  attributes?: Array<{ name: string; type: Attribute; constraint?: Constraint }>;
}

interface GenerateFormData {
  name: string;
  description?: string;
  entities: Entity[];
  relations: Relation[];
  auth: boolean;
}
```

### Next.js API Routes (Code Generation)

| Route | Purpose |
|---|---|
| `POST /api/generate` | Generates an Express.js backend ZIP |
| `POST /api/generate_py` | Generates a FastAPI (Python) backend ZIP |
| `POST /api/frontend` | Generates a Next.js admin panel ZIP |

All three routes accept a `GenerateFormData` JSON body and return a streamed ZIP file using the `archiver` library.

---

## 3. AI Backend — FastAPI

### Technology

- **FastAPI** with CORS middleware (allows all origins)
- **LangChain** for LLM chain composition (GPT-4o)
- **Neo4j** driver for direct graph database operations
- **LangChain Neo4jGraph** for Cypher query generation
- **Neo4j GraphRAG** for hybrid retrieval (vector + fulltext)
- **OpenAI Embeddings** for code vectorization
- **PyPDFLoader** for PDF document parsing

### API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/add_nodes` | Add module and symbol nodes to Neo4j |
| POST | `/add_exports` | Add symbol export edges to Neo4j |
| POST | `/add_symbol_dependency` | Add symbol dependency edges |
| POST | `/add_module_dependency` | Add module dependency edges |
| POST | `/add_nodes_source_code` | Parse and store source code for symbol nodes |
| POST | `/add_graph` | Full pipeline: nodes → exports → dependencies → source code → embeddings → indexes |
| POST | `/add_embeddings` | Generate and store embeddings for all modules and symbols |
| POST | `/add_indexes` | Create vector and fulltext indexes in Neo4j |
| POST | `/generate_module_embeddings` | Generate OpenAI embeddings for module source code |
| POST | `/generate_symbol_embeddings` | Generate OpenAI embeddings for symbol code |
| POST | `/create_vector_indexes` | Create cosine similarity vector indexes |
| POST | `/create_fulltext_indexes` | Create fulltext search indexes |
| POST | `/generate_schema` | Upload a PDF → AI generates a database schema |
| POST | `/query_schema` | Submit a text prompt → AI generates a database schema |
| POST | `/create_graph_from_zip` | Upload a ZIP of source code → AI generates dependency graph |
| POST | `/cypher_query` | Natural language → Cypher query → Neo4j → answer |
| POST | `/nlp` | Natural language → GraphRAG hybrid retrieval → answer |
| POST | `/understanding_symbols` | Deep symbol explanation via Cypher + RAG chain |
| GET | `/get_graph_data` | Fetch all nodes and edges from Neo4j for visualization |
| GET | `/` | Health check |

### Pydantic Models

```python
class ModuleNode:        # moduleName, modulePath, moduleSourceCode
class SymbolNode:        # symbolName, symbolModulePath, symbolCode, symbolType
class SymbolDependencyEdge:  # dependentModulePath, dependencySymbolPath, dependencySymbolName
class ModuleDependencyEdge:  # dependentModulePath, dependencyModulePath
class GraphData:         # Lists of all above (optional)
class QueryRequest:      # query: str
class EmbeddingsResponse:  # message, processed_count
class DatabaseSchema:    # name, description, entities[], relations[], auth
```

---

## 4. Code Generation Pipelines

### Express.js Backend Generation (`/api/generate`)

```
GenerateFormData → Next.js API Route → Archiver ZIP Stream
```

The route generates:

1. **`prisma/schema.prisma`** — MongoDB-backed Prisma schema with:
   - Auto-generated `id` field (ObjectId)
   - All entity attributes mapped to Prisma types (String, Int, Boolean, DateTime, arrays)
   - Relation fields based on cardinality (1-1, 1-m, m-1)
   - `fpca` timestamp field on every model

2. **`src/routes/{entity}.js`** — Express router per entity with:
   - GET `/` — Fetch all records
   - POST `/` — Create a record (with body parsing + optional auth)
   - PUT `/:id` — Update a record
   - DELETE `/:id` — Delete a record
   - For `user` entity with auth: `POST /signup`, `POST /login`, `GET /getMe`

3. **`src/middleware/auth.js`** — JWT middleware (when auth enabled):
   - Reads token from cookies
   - Verifies with `JWT_SECRET`
   - Attaches `req.user` to the request

4. **`src/structure/entities.js`** — Entity definitions for runtime validation
5. **`src/lib/helpers.js`** — `parseBody()` function for type coercion and validation
6. **`src/app.js`** — Express app setup with routes, CORS, cookie-parser
7. **`package.json`** — Dependencies (Express, Prisma, bcryptjs, JWT, etc.)
8. **`.env.example`** — Template with DATABASE_URL, JWT_SECRET, PORT
9. **`README.md`** — Setup and usage instructions

### FastAPI Backend Generation (`/api/generate_py`)

Same input, generates a Python backend ZIP with:

1. **`prisma/schema.prisma`** — Same Prisma schema
2. **`backend/app.py`** — FastAPI app with CRUD routes, CORS, Prisma async client
3. **`backend/models.py`** — Pydantic models (Base, Create, and full model per entity)
4. **`backend/utils.py`** — Password hashing (passlib/bcrypt), JWT creation/verification, OAuth2 scheme
5. **`backend/constants.py`** — SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES from env
6. **`requirements.txt`** — FastAPI, uvicorn, prisma, python-jose, passlib, etc.
7. **`.env.example`** — Template with DATABASE_URL, SECRET_KEY, ALGORITHM
8. **`README.md`** — Setup instructions

### Admin Panel Generation (`/api/frontend`)

Generates a Next.js admin dashboard ZIP by:

1. Reading all files from the `src/lib/sample/` template directory (pre-built admin components)
2. Generating a **Prisma schema** matching the entity definitions
3. Generating **`src/lib/entities.ts`** — Typed entity definitions
4. Generating **dynamic route pages** — `src/app/(routes)/{entity}/page.tsx` for each entity, with a Dashboard component that fetches data via Prisma and renders a data table

### Type Mapping

| Schema Type | Prisma Type | Python Type |
|---|---|---|
| `string` | `String` | `str` |
| `number` | `Int` | `int` |
| `boolean` | `Boolean` | `bool` |
| `Date` | `DateTime` | `datetime` |
| `string[]` | `String[]` | `List[str]` |

---

## 5. AI & LLM Pipelines

### Schema Generation from PDF

```
PDF Upload → PyPDFLoader → Text Extraction → CharacterTextSplitter (2000 chars) →
SCHEMA_PROMPT + GPT-4o → OutputFixingParser → DatabaseSchema (JSON) →
Returned to frontend → Loaded into ER diagram editor
```

The `SCHEMA_PROMPT` instructs GPT-4o to:
- Identify entities and their attributes from the document text
- Assign appropriate types (string, number, boolean, Date)
- Define relationships with cardinality types
- Set constraints (required, unique, optional, default)
- Output strict JSON matching the `DatabaseSchema` Pydantic model

### Schema Generation from Text Prompt

```
User prompt → SCHEMA_PROMPT + GPT-4o → OutputFixingParser → DatabaseSchema (JSON) →
Returned to frontend → Loaded into ER diagram editor
```

Same pipeline as PDF but skips the PDF parsing step.

### Code Graph Generation from ZIP

```
ZIP Upload → Extract files (.js, .json, .md, .txt) → Concatenate with file paths →
CharacterTextSplitter → JS_PARSER prompt + GPT-4o → OutputFixingParser →
GraphData (modules, symbols, dependencies) → Returned as JSON
```

The `JS_PARSER` prompt instructs GPT-4o to analyze source code and produce:
- `moduleNodes` — File modules with paths and source code
- `symbolNodes` — Exported symbols (functions, classes, variables)
- `moduleDependencyEdges` — Import/require relationships between modules
- `symbolDependencyEdges` — Symbol-level import relationships

### Natural Language Code Query (GraphRAG)

```
User query → HybridRetriever (vector + fulltext search on Neo4j) →
Top-5 matching code snippets → GPT-4o generates answer →
Returned to frontend
```

### Cypher Query Chain

```
User query (natural language) → GraphCypherQAChain →
GPT-4o generates Cypher query → Executes on Neo4j →
GPT-4o interprets results → Returns answer
```

### Symbol Understanding Pipeline

```
User query → GraphCypherQAChain → Extracts relevant file names →
For each file: GraphRAG search for symbol explanations →
Concatenated detailed explanation → Returned to frontend
```

---

## 6. Neo4j Knowledge Graph

### Node Types

| Label | Properties | Description |
|---|---|---|
| `Module` | moduleName, modulePath, moduleSourceCode, moduleSourceCodeEmbeddings | Source code file |
| `Module:Package` | moduleName, modulePath | External npm package |
| `Module:RegularModule` | moduleName, modulePath, moduleSourceCode | Local source file |
| `Symbol` | symbolName, symbolModulePath, symbolCode, symbolType, symbolCodeEmbeddings | Function, class, or variable |

### Edge Types

| Type | From → To | Description |
|---|---|---|
| `DEPENDS_ON` | Module → Symbol | Module imports a symbol |
| `DEPENDS_ON` | Module → Module | Module imports another module |
| `EXPORTS` | Module → Symbol | Module exports a symbol |

### Indexes

| Index | Type | On | Property |
|---|---|---|---|
| `symbolEmbeddings` | Vector (cosine) | Symbol | symbolCodeEmbeddings |
| `moduleEmdeddings` | Vector (cosine) | Module | moduleSourceCodeEmbeddings |
| `symbolFullText` | Fulltext | Symbol | symbolCode |
| `moduleFullText` | Fulltext | Module | moduleSourceCode |

### Symbol Source Code Extraction

For regular modules (not packages), FlowPro uses Python's `ast` module to parse the source code and extract individual symbol definitions:
- **Functions** (`ast.FunctionDef`) — Extracts the full function source
- **Classes** (`ast.ClassDef`) — Extracts the full class source
- **Variables** (`ast.Assign`) — Extracts the assignment statement

---

## 7. End-to-End User Flows

### Flow 1: Visual ER Diagram → Express.js Backend

1. User navigates to `/create` and selects the **Flow** tab.
2. User drags entity nodes on the React Flow canvas, adds attributes inline.
3. User connects entities with relation edges, sets cardinality.
4. User toggles authentication on/off.
5. User clicks **"Generate Project"**.
6. Frontend collects all node/edge data, builds a `GenerateFormData` object.
7. Calls `POST /api/generate` → Next.js API route generates Express.js backend ZIP.
8. Calls `POST /api/frontend` → Generates Next.js admin panel ZIP.
9. Both ZIPs are downloaded automatically to the user's machine.
10. User is redirected to `/query` for documentation queries.

### Flow 2: AI Prompt → ER Diagram → Backend

1. User navigates to `/prompt`.
2. User types a project description (e.g., "E-commerce platform with users, products, orders, and reviews").
3. Frontend sends `POST` to FastAPI `/query_schema` with the text.
4. FastAPI feeds the text through `SCHEMA_PROMPT + GPT-4o → OutputFixingParser`.
5. Returns a structured `DatabaseSchema` JSON.
6. Frontend loads the schema into the form context via `formContext.reset(data)`.
7. User is redirected to `/create` where the ER diagram is pre-populated.
8. User refines the diagram and generates the backend.

### Flow 3: PDF/BRD Upload → ER Diagram → Backend

1. User navigates to `/prompt`.
2. User clicks the attachment button and uploads a PDF (business requirement document).
3. Frontend sends the file via `POST` (multipart) to FastAPI `/generate_schema`.
4. FastAPI saves the file temporarily, parses it with `PyPDFLoader`, extracts text.
5. Text is split into chunks (2000 chars) with `CharacterTextSplitter`.
6. Chunks are fed through `SCHEMA_PROMPT + GPT-4o → OutputFixingParser`.
7. Returns a structured `DatabaseSchema` JSON.
8. Same flow as Flow 2 from step 6 onwards.

### Flow 4: Code Knowledge Graph + Q&A

1. A generated project ZIP is uploaded via `POST /create_graph_from_zip`.
2. FastAPI extracts `.js`, `.json`, `.md`, `.txt` files from the ZIP.
3. File contents are concatenated and fed through `JS_PARSER + GPT-4o`.
4. AI generates a dependency graph (modules, symbols, edges).
5. Graph data is inserted into Neo4j via sequential calls:
   - `add_nodes` → `add_exports` → `add_module_dependency` → `add_symbol_dependency` → `add_nodes_source_code`
6. Embeddings are generated for all module and symbol code.
7. Vector and fulltext indexes are created.
8. User navigates to `/query` and asks a natural language question.
9. Frontend sends `POST /nlp` with the query.
10. FastAPI uses `HybridRetriever` (vector + fulltext) to find relevant code.
11. `GraphRAG` generates an answer using GPT-4o.
12. Answer is displayed in the frontend.

### Flow 5: Graph Visualization

1. User navigates to `/test`.
2. Next.js server component fetches `GET /get_graph_data` from FastAPI.
3. FastAPI queries Neo4j: `MATCH p=()-[]->() RETURN p LIMIT 1000`.
4. Returns all nodes and edges with their properties (excluding embeddings).
5. Frontend renders the data using `react-force-graph` (ForceGraph2D).
6. Nodes represent modules/symbols; edges represent dependencies/exports.
