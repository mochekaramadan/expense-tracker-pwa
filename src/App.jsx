import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionForm from './components/Transaction/TransactionForm';
import TransactionList from './components/Transaction/TransactionList';
import { ExpenseProvider } from './context/ExpenseContext';
import { ThemeProvider } from './context/ThemeContext';
import PWAInstallPrompt from './components/PWA/InstallPrompt';
import OfflineIndicator from './components/PWA/OfflineIndicator';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
          <Layout>
            {/* PWA Components */}
            <PWAInstallPrompt />
            <OfflineIndicator />
            
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
              <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Dashboard />
                  </motion.div>
                )}
                
                {activeTab === 'transactions' && (
                  <motion.div
                    key="transactions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TransactionList />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating Action Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowForm(true)}
              className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-2xl z-50"
            >
              +
            </motion.button>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 px-6 py-3">
              <div className="flex justify-around max-w-md mx-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Transaction Form Modal */}
            <AnimatePresence>
              {showForm && (
                <TransactionForm
                  onClose={() => setShowForm(false)}
                  isOpen={showForm}
                />
              )}
            </AnimatePresence>
          </Layout>
          
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            }}
          />
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;