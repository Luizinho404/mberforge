import { useEmberStore } from './store';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Jogador } from './components/Jogador';
import { Inventario } from './components/Inventario';
import { Mundo } from './components/Mundo';
import { Construcao } from './components/Construcao';
import { Profiles } from './components/Profiles';
import { Settings } from './components/Settings';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { view } = useEmberStore();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-background)] text-[var(--color-on-surface)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto relative custom-scroll">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto custom-scroll"
            >
              {view === 'dashboard' && <Dashboard />}
              {view === 'jogador' && <Jogador />}
              {view === 'inventario' && <Inventario />}
              {view === 'mundo' && <Mundo />}
              {view === 'construcao' && <Construcao />}
              {view === 'perfis' && <Profiles />}
              {view === 'configuracoes' && <Settings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
