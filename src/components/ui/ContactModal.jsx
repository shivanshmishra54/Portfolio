'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ArrowRight } from 'lucide-react';

const InputField = ({ label, name, type = 'text', required = false, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1.5">
      {label} {required && <span className="text-[#f97316]">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
      value={value || ''}
      className="w-full bg-white/[0.03] border border-white/[0.08] text-[#f1eee8] placeholder-white/20 px-4 py-2.5 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-colors text-sm font-sans"
    />
  </div>
);

const TextAreaField = ({ label, name, required = false, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1.5">
      {label} {required && <span className="text-[#f97316]">*</span>}
    </label>
    <textarea
      name={name}
      required={required}
      placeholder={placeholder}
      rows={4}
      onChange={onChange}
      value={value || ''}
      className="w-full bg-white/[0.03] border border-white/[0.08] text-[#f1eee8] placeholder-white/20 px-4 py-2.5 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-colors resize-none text-sm font-sans"
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

    const apiKey = 
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      (typeof process !== 'undefined' && process.env?.VITE_WEB3FORMS_ACCESS_KEY) ||
      (typeof process !== 'undefined' && process.env?.VITE_WEB3FORMS_KEY) ||
      '319cf23f-b091-4f65-8a31-920030bdde78';
    
    if (!apiKey) {
      console.error('Web3Forms API key is missing');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const subjectTag = (activeContext || 'general').toUpperCase();
      const payload = {
        access_key: apiKey,
        subject: `Portfolio Inquiry (${subjectTag}) from ${formData.name || 'Visitor'}`,
        from_name: formData.name || 'Portfolio Visitor',
        ...formData,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) {
        setSubmitStatus(null);
        setFormData({});
        onClose();
        if (onSuccess) onSuccess();
      } else {
        console.error('Web3Forms submission failed:', data?.message || response.statusText);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
          <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1.5">Project Type <span className="text-[#f97316]">*</span></label>
          <select 
            name="projectType" 
            required 
            onChange={handleChange}
            value={formData.projectType || ''}
            className="w-full bg-[#080808] border border-white/[0.08] text-[#f1eee8] px-4 py-2.5 rounded-xl focus:outline-none focus:border-white/30 transition-colors text-sm font-sans"
          >
            <option value="" disabled className="bg-[#080808]">Select project type</option>
            <option value="Personal Portfolio" className="bg-[#080808]">Personal Portfolio</option>
            <option value="Business Website" className="bg-[#080808]">Business Website</option>
            <option value="Web Application" className="bg-[#080808]">Web Application</option>
            <option value="SaaS Application" className="bg-[#080808]">SaaS Application</option>
            <option value="Dashboard / Admin Panel" className="bg-[#080808]">Dashboard / Admin Panel</option>
            <option value="E-commerce Website" className="bg-[#080808]">E-commerce Website</option>
            <option value="AI Application" className="bg-[#080808]">AI Application</option>
            <option value="API / Backend Solution" className="bg-[#080808]">API / Backend Solution</option>
            <option value="Automation / Integration" className="bg-[#080808]">Automation / Integration</option>
            <option value="Bug Fixing / Existing Project" className="bg-[#080808]">Bug Fixing / Existing Project</option>
            <option value="Other" className="bg-[#080808]">Other</option>
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
        className="w-full mt-4 bg-[#f1eee8] text-[#030303] py-3.5 rounded-full font-medium tracking-wider uppercase text-xs hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Project Inquiry'} <Send size={14} />
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
          <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1.5">Purpose <span className="text-[#f97316]">*</span></label>
          <select 
            name="purpose" 
            required 
            onChange={handleChange}
            value={formData.purpose || ''}
            className="w-full bg-[#080808] border border-white/[0.08] text-[#f1eee8] px-4 py-2.5 rounded-xl focus:outline-none focus:border-white/30 transition-colors text-sm font-sans"
          >
            <option value="" disabled className="bg-[#080808]">Select an option...</option>
            <option value="Full-Time Opportunity" className="bg-[#080808]">Full-Time Opportunity</option>
            <option value="Internship Opportunity" className="bg-[#080808]">Internship Opportunity</option>
            <option value="Freelance / Contract Discussion" className="bg-[#080808]">Freelance / Contract Discussion</option>
            <option value="Technical Discussion" className="bg-[#080808]">Technical Discussion</option>
            <option value="Collaboration" className="bg-[#080808]">Collaboration</option>
            <option value="Open Source" className="bg-[#080808]">Open Source</option>
            <option value="Other" className="bg-[#080808]">Other</option>
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
        className="w-full mt-4 bg-[#f1eee8] text-[#030303] py-3.5 rounded-full font-medium tracking-wider uppercase text-xs hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={14} />
      </button>
    </form>
  );

  const renderNeutralSelection = () => (
    <div className="mt-8 space-y-4">
      <button 
        onClick={() => setActiveContext('freelancer')}
        className="w-full text-left p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101010] transition-all group flex items-center justify-between"
      >
        <div>
          <h4 className="text-lg font-serif text-[#f1eee8] group-hover:text-white transition-colors">Work on a Project</h4>
          <p className="text-sm text-[#aaa9a4] font-light mt-1">Hire me for full-stack engineering, API architecture, or custom web apps.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#aaa9a4] group-hover:text-white transition-all">
          <ArrowRight size={14} />
        </div>
      </button>
      
      <button 
        onClick={() => setActiveContext('developer')}
        className="w-full text-left p-6 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101010] transition-all group flex items-center justify-between"
      >
        <div>
          <h4 className="text-lg font-serif text-[#f1eee8] group-hover:text-white transition-colors">Career / Engineering</h4>
          <p className="text-sm text-[#aaa9a4] font-light mt-1">Recruitment, full-time roles, internships, or open-source collaboration.</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#aaa9a4] group-hover:text-white transition-all">
          <ArrowRight size={14} />
        </div>
      </button>

      <div className="pt-6 mt-6 border-t border-white/[0.06]">
        <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono mb-2">Direct Inquiry</p>
        <a href="mailto:shivansh54mishra@gmail.com" className="text-sm font-mono text-[#f1eee8] hover:underline underline-offset-4">shivansh54mishra@gmail.com</a>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-[#0c0c0c] border border-white/[0.1] rounded-3xl shadow-2xl relative flex flex-col pointer-events-auto max-h-[90vh]"
            >
              <button 
                onClick={onClose}
                className="absolute top-5 right-5 p-2 text-[#aaa9a4] hover:text-white transition-colors z-10 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-full"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>

              <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
                {title && (
                  <div className="shrink-0">
                    <h2 className="text-2xl md:text-3xl font-serif text-[#f1eee8] mb-1.5 pr-8">{title}</h2>
                    {subtitle && <p className="text-xs md:text-sm text-[#aaa9a4] font-light">{subtitle}</p>}
                  </div>
                )}
                
                <div className="flex-grow overflow-hidden flex flex-col">
                  {submitStatus === 'error' && (
                    <div className="mt-4 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-xs font-mono">
                      Unable to send your message. Please email directly to shivansh54mishra@gmail.com.
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
