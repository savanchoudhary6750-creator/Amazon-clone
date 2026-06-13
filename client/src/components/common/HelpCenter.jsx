import React, { useState } from "react";

/**
 * Help Center Page
 * FAQ and support information
 */
export default function HelpCenter() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I create an account?",
      answer: "Click on the 'Register' button in the header, fill in your details, and submit the form. You'll receive a confirmation email once your account is created."
    },
    {
      id: 2,
      question: "How do I track my order?",
      answer: "Log in to your account, go to 'Orders' in the navigation, and click on the order you want to track. You'll see the current status and tracking information."
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and UPI payments."
    },
    {
      id: 4,
      question: "How do I return an item?",
      answer: "Go to 'Orders', select the order with the item you want to return, and click on 'Return Item'. Follow the instructions to complete the return process."
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in their original condition with tags attached. Some items may have different return policies."
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer: "You can reach us through the Contact page, email us at support@amazonclone.com, or call us at +1 (555) 123-4567."
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Help Center</h1>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Track Order</h3>
            <p className="text-gray-600 text-sm mb-4">Check your order status</p>
            <button className="text-orange-500 font-semibold">Go to Orders →</button>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Return Item</h3>
            <p className="text-gray-600 text-sm mb-4">Start a return request</p>
            <button className="text-orange-500 font-semibold">Return Policy →</button>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-600 text-sm mb-4">Get help from our team</p>
            <button className="text-orange-500 font-semibold">Contact Support →</button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left py-4 flex justify-between items-center"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span className="text-orange-500">
                    {expandedFaq === faq.id ? "−" : "+"}
                  </span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
