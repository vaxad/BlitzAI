# FlowPro — Project Summary

## What is FlowPro?

**FlowPro** is a no-code backend development platform that allows developers to design ER diagrams through a visual UI, form-based editor, or JSON input, and then automatically generates fully functional Express.js backends with Prisma ORM, authentication, body validation, and a Next.js admin panel — all without writing a single line of code. It also supports AI-powered ER diagram generation from natural language prompts or PDF business requirement documents.

---

## Core Features

### 1. Visual ER Diagram Editor
- Interactive **React Flow** canvas for drag-and-drop entity-relationship diagram creation.
- Custom **entity nodes** with inline attribute editing (name, type, constraints).
- Custom **relation edges** with cardinality types (1-1, 1-m, m-1).
- Minimap, toolbar, and PNG export functionality.

### 2. Form-Based Entity Editor
- Structured form UI for defining entities, attributes, types, and constraints.
- Supports attribute types: `string`, `number`, `boolean`, `Date`, and their array variants.
- Constraint types: `required`, `unique`, `optional`, `default`.
- Zod-based validation ensures correct schema structure.

### 3. JSON Editor
- Direct JSON input for defining the full schema (entities, relations, auth toggle).
- Real-time validation against the `GenerateFormData` schema.

### 4. Express.js Backend Generation
- Generates a complete **Express.js** backend as a downloadable ZIP file containing:
  - **Prisma schema** with MongoDB provider and all entity models.
  - **CRUD API routes** (GET, POST, PUT, DELETE) for every entity.
  - **JWT authentication** with signup, login, and getMe routes (when auth is enabled).
  - **Auth middleware** for protecting routes.
  - **Body validation** and type parsing helpers.
  - **package.json**, **.env.example**, and **README.md**.

### 5. FastAPI (Python) Backend Generation
- Alternative backend generation producing a **FastAPI** backend ZIP containing:
  - **Pydantic models** for data validation.
  - **FastAPI routes** with async CRUD operations.
  - **OAuth2 + JWT authentication** (when auth is enabled).
  - **Prisma ORM** integration for database access.

### 6. Next.js Admin Panel Generation
- Generates a **Next.js admin dashboard** as a separate downloadable ZIP containing:
  - Dynamic pages for each entity with data tables.
  - Prisma client integration for direct database access.
  - Pre-built UI components (shadcn/ui, Recharts, etc.).

### 7. AI-Powered ER Diagram Generation
- **From text prompts**: Enter a project description and GPT-4o generates a structured database schema (entities, relations, constraints).
- **From PDF/BRD uploads**: Upload a business requirement document; it's parsed with PyPDFLoader, chunked, and fed to GPT-4o to extract a database schema.
- Generated schemas are loaded directly into the ER diagram editor for refinement.

### 8. Code Knowledge Graph & Documentation Queries
- Upload a generated project ZIP → FastAPI parses files → GPT-4o generates a dependency graph → stored in **Neo4j** as modules, symbols, and dependency edges.
- **Vector embeddings** (OpenAI) generated for all code modules and symbols.
- **Hybrid retrieval** (vector + fulltext indexes) via Neo4j GraphRAG.
- **Natural language Q&A** about the generated backend code using GraphRAG.
- **Cypher query** interface for direct Neo4j graph queries via LangChain.

### 9. Force-Directed Graph Visualization
- Interactive 2D **force-directed graph** (react-force-graph) displaying the Neo4j dependency graph.
- Visual representation of module dependencies, symbol exports, and code relationships.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, React Flow (@xyflow/react), react-force-graph, Framer Motion, Zustand, React Hook Form, Zod, Archiver |
| **AI Backend (Python)** | FastAPI, LangChain, LangChain-OpenAI, LangChain-Together, OpenAI GPT-4o, OpenAI Embeddings, Neo4j GraphRAG, PyPDFLoader |
| **Graph Database** | Neo4j (driver + LangChain Neo4jGraph + neo4j-graphrag) |
| **Generated Backends** | Express.js, Prisma ORM, MongoDB, JWT (bcrypt), Cookie-based auth |
| **Generated Admin Panel** | Next.js, Prisma Client, shadcn/ui, Recharts |
| **Deployment** | Vercel (frontend), Render (FastAPI backend) |

---

## Architecture Overview

FlowPro follows a **two-service architecture**:

1. **Frontend (Next.js)** — The main web application. Provides the ER diagram editors (Flow/Form/JSON), handles backend code generation via Next.js API routes, and communicates with the FastAPI backend for AI features.
2. **AI Backend (FastAPI)** — The intelligence and knowledge engine. Handles AI-powered schema generation from prompts/PDFs, code graph construction in Neo4j, embedding generation, and natural language Q&A via GraphRAG.

The **generated projects** (Express.js backend, FastAPI backend, Next.js admin panel) are produced as ZIP archives by the Next.js API routes and downloaded by the user.

