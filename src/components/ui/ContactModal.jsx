import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

const InputField = ({ label, name, type = 'text', required = false, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      value={value || ''}
      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors"
    />
  </div>
);

const TextAreaField = ({ label, name, required = false, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      required={required}
      placeholder={placeholder}
      rows={4}
      onChange={onChange}
      value={value || ''}
      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 transition-colors resize-none"
    />
  </div>
);

export function ContactModal({ isOpen, onClose, context, onSuccess }) {
  const [activeContext, setActiveContext] = useState(context);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'error' | null
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    setActiveContext(context);
    setSubmitStatus(null);
    setFormData({});
  }, [context, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'projectType' && value !== 'Other') {
        next.otherProjectType = '';
      }
      if (name === 'purpose' && value !== 'Other') {
        next.otherPurpose = '';
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (!apiKey) {
      console.error('Web3Forms API key is missing');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append('access_key', apiKey);
      payload.append('subject', `Portfolio Inquiry (${activeContext.toUpperCase()}) from ${formData.name}`);
      payload.append('from_name', formData.name);
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          payload.append(key, value);
        }
      });

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus(null);
        setFormData({});
        onClose();
        if (onSuccess) onSuccess();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFreelancerForm = () => (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col flex-grow overflow-hidden min-h-0">
      <div className="flex-grow overflow-y-auto min-h-0 pr-2 pb-4 space-y-2">
        <InputField label="Name" name="name" required value={formData.name} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" required value={formData.email} onChange={handleChange} />
        <InputField label="Company / Organization" name="company" value={formData.company} onChange={handleChange} />
        
        <div className="mb-4">
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Project Type <span className="text-red-500">*</span></label>
          <select 
            name="projectType" 
            required 
            onChange={handleChange}
            value={formData.projectType || ''}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 appearance-none"
          >
            <option value="" disabled>Select project type</option>
            <option value="Personal Portfolio">Personal Portfolio</option>
            <option value="Business Website">Business Website</option>
            <option value="Web Application">Web Application</option>
            <option value="SaaS Application">SaaS Application</option>
            <option value="Dashboard / Admin Panel">Dashboard / Admin Panel</option>
            <option value="E-commerce Website">E-commerce Website</option>
            <option value="AI Application">AI Application</option>
            <option value="API / Backend Solution">API / Backend Solution</option>
            <option value="Automation / Integration">Automation / Integration</option>
            <option value="Bug Fixing / Existing Project">Bug Fixing / Existing Project</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.projectType === 'Other' && (
          <InputField label="Other project type" name="otherProjectType" placeholder="Tell me what you want to build" required value={formData.otherProjectType} onChange={handleChange} />
        )}

        <TextAreaField label="What do you want to build?" name="description" required value={formData.description} onChange={handleChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Budget Range" name="budget" placeholder="$1000 - $5000" value={formData.budget} onChange={handleChange} />
          <InputField label="Timeline" name="timeline" placeholder="e.g. 1 month, Q4" value={formData.timeline} onChange={handleChange} />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-4 bg-gray-900 dark:bg-white text-white dark:text-black py-4 font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
      >
        {isSubmitting ? 'Sending...' : 'Send Project Inquiry'} <Send size={16} />
      </button>
    </form>
  );

  const renderDeveloperForm = () => (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col flex-grow overflow-hidden min-h-0">
      <div className="flex-grow overflow-y-auto min-h-0 pr-2 pb-4 space-y-2">
        <InputField label="Name" name="name" required value={formData.name} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" required value={formData.email} onChange={handleChange} />
        <InputField label="Company / Organization" name="company" required value={formData.company} onChange={handleChange} />
        
        <div className="mb-4">
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Purpose <span className="text-red-500">*</span></label>
          <select 
            name="purpose" 
            required 
            onChange={handleChange}
            value={formData.purpose || ''}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white px-4 py-3 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 appearance-none"
          >
            <option value="" disabled>Select an option...</option>
            <option value="Full-Time Opportunity">Full-Time Opportunity</option>
            <option value="Internship Opportunity">Internship Opportunity</option>
            <option value="Freelance / Contract Discussion">Freelance / Contract Discussion</option>
            <option value="Technical Discussion">Technical Discussion</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Open Source">Open Source</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.purpose === 'Other' && (
          <InputField label="Other Purpose" name="otherPurpose" placeholder="Please specify..." required value={formData.otherPurpose} onChange={handleChange} />
        )}

        <TextAreaField label="Message" name="message" required value={formData.message} onChange={handleChange} />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-4 bg-gray-900 dark:bg-white text-white dark:text-black py-4 font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
      </button>
    </form>
  );

  const renderNeutralSelection = () => (
    <div className="mt-8 space-y-4">
      <button 
        onClick={() => setActiveContext('freelancer')}
        className="w-full text-left p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors group flex items-center justify-between"
      >
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">Work on a Project</h4>
          <p className="text-sm text-gray-500 mt-1">Hire me to build your next web application.</p>
        </div>
        <ArrowRight className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
      </button>
      
      <button 
        onClick={() => setActiveContext('developer')}
        className="w-full text-left p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors group flex items-center justify-between"
      >
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">Career / Engineering</h4>
          <p className="text-sm text-gray-500 mt-1">Recruitment, internships, or technical collaboration.</p>
        </div>
        <ArrowRight className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
      </button>

      <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Or use direct email</p>
        <a href="mailto:shivansh54mishra@gmail.com" className="text-gray-900 dark:text-white hover:underline underline-offset-4">shivansh54mishra@gmail.com</a>
      </div>
    </div>
  );

  let title = "How would you like to connect?";
  let subtitle = "Select an option below to ensure your message goes to the right place.";
  
  if (activeContext === 'freelancer') {
    title = "Start a Project";
    subtitle = "Tell me what you want to build, improve, or solve.";
  } else if (activeContext === 'developer') {
    title = "Let's Connect";
    subtitle = "For engineering teams, recruiters, or technical collaboration.";
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-2xl relative flex flex-col pointer-events-auto max-h-[90vh]"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
                {title && (
                  <div className="shrink-0">
                    <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2 pr-8">{title}</h2>
                    {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
                  </div>
                )}
                
                <div className="flex-grow overflow-hidden flex flex-col">
                  {submitStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
                      Unable to send your message. Please try again.
                    </div>
                  )}

                  {activeContext === 'neutral' && renderNeutralSelection()}
                  {activeContext === 'freelancer' && renderFreelancerForm()}
                  {activeContext === 'developer' && renderDeveloperForm()}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
