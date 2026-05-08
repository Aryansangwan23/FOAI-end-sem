import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { FloatingChatbot } from './chatbot/FloatingChatbot';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <div className="dark:bg-slate-950 bg-slate-100 dark:text-slate-100 text-slate-900 font-sans min-h-screen selection:bg-cyan-500/30 transition-colors duration-300">
          <Dashboard />
          <FloatingChatbot />
        </div>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#1e293b',
              },
            },
          }} 
        />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
