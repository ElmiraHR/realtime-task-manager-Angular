🇬🇧 English
Realtime Task Manager

A web application for managing tasks, built with Angular. It supports creating, editing, deleting, filtering, and drag-and-drop between columns. Authentication and real-time updates via WebSockets are planned.

Features
Create, edit, and delete tasks

Filter tasks by status and title

Drag & drop tasks between columns

Edit tasks in a modal window

Responsive layout

Uses Angular standalone components

🔜 Coming soon: authentication and real-time updates via WebSockets

Getting Started
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
ng serve
Open your browser at http://localhost:4200

Project Structure
components: reusable UI components (TaskForm, TaskList)

pages: main pages (Home)

core: services (TaskService, WebSocketService)

models: interfaces (Task model)

Build
To build the project for production:

bash
Copy
Edit
ng build


🇩🇪 Deutsch
Realtime Task Manager

Eine Webanwendung zur Aufgabenverwaltung, entwickelt mit Angular. Sie unterstützt das Erstellen, Bearbeiten, Löschen, Filtern und das Verschieben von Aufgaben per Drag & Drop. Geplant sind Authentifizierung und Echtzeit-Aktualisierung über WebSockets.

Funktionen
Aufgaben erstellen, bearbeiten und löschen

Filtern nach Status und Titel

Aufgaben per Drag & Drop zwischen Spalten verschieben

Bearbeiten im Modal-Fenster

Responsives Design

Verwendung von Angular Standalone-Komponenten

🔜 Demnächst: Authentifizierung und Echtzeit-Updates über WebSockets

Schnellstart
Abhängigkeiten installieren:

bash
Copy
Edit
npm install
Entwicklungsserver starten:

bash
Copy
Edit
ng serve
Im Browser öffnen: http://localhost:4200

Projektstruktur
components: wiederverwendbare UI-Komponenten (TaskForm, TaskList)

pages: Hauptseiten (Home)

core: Services (TaskService, WebSocketService)

models: Schnittstellen (Task-Modell)

Build
Für den Produktions-Build:

bash
Copy
Edit
ng build