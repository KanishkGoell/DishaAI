
import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Task Board</h1>
          <p className="text-blue-100">Manage your tasks with drag and drop</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Board />
      </main>
      
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-600 text-center">
          Task Board App &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default App;