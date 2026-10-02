import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ContactModal } from './ContactModal';

const ContactContext = createContext({
  openModal: () => {},
  closeModal: () => {},
  triggerSuccessToast: () => {}
});

export const useContactModal = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState('neutral'); // 'freelancer', 'developer', 'neutral'
  const [toastVisible, setToastVisible] = useState(false);

  const openModal = (ctx = 'neutral') => {
    setContext(ctx);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const triggerSuccessToast = useCallback(() => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }, []);

  return (
    <ContactContext.Provider value={{ openModal, closeModal, triggerSuccessToast }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeModal} context={context} onSuccess={triggerSuccessToast} />
      
      {/* Success Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } }}
            exit={{ opacity: 0, x: 100, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed bottom-8 right-8 z-[100] bg-gray-900 dark:bg-white border border-gray-800 dark:border-gray-200 shadow-2xl flex items-center gap-3 px-6 py-4"
          >
            <CheckCircle2 size={20} className="text-white dark:text-gray-900" />
            <span className="text-sm font-bold tracking-wide text-white dark:text-gray-900">
              Message sent successfully
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactContext.Provider>
  );
};
