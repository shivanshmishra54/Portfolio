import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "What is your typical process for a new project?",
    answer: "We start with a discovery call to understand your requirements, followed by a proposal and timeline. Once approved, I begin the design and development phases, keeping you updated with regular milestones."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, I work with clients globally. I am flexible with time zones and ensure smooth communication regardless of where you are located."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in modern web technologies including React, Node.js, Next.js, and cloud infrastructure like AWS and Google Cloud. I choose the best stack based on the project's specific needs."
  },
  {
    question: "Do you provide maintenance after the project is completed?",
    answer: "Yes, I offer ongoing maintenance and support packages to ensure your application remains secure, up-to-date, and continues to perform optimally."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white uppercase mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Common questions about my freelance services, process, and technical capabilities.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-black p-8 border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
