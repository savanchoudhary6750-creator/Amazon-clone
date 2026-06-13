import React from "react";

/**
 * Terms & Conditions Page
 * Terms of service and conditions
 */
export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Terms & Conditions</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-600">
              Welcome to Amazon Clone. By using our website and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing or using Amazon Clone, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Account Registration</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>You must be at least 18 years old to create an account</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You are responsible for all activities under your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          {/* Products and Services */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Products and Services</h2>
            <div className="space-y-3 text-gray-600">
              <p><strong>Product Descriptions:</strong> We strive to provide accurate product descriptions, but we do not warrant that descriptions are error-free.</p>
              <p><strong>Pricing:</strong> Prices are subject to change without notice. We reserve the right to modify prices at any time.</p>
              <p><strong>Availability:</strong> Product availability is not guaranteed. We may limit quantities available for purchase.</p>
              <p><strong>Images:</strong> Product images are for illustrative purposes and may not exactly represent the actual product.</p>
            </div>
          </section>

          {/* Orders and Payment */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Orders and Payment</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>All orders are subject to acceptance and availability</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Payment must be received before order fulfillment</li>
              <li>We use secure payment processing services</li>
              <li>You confirm that payment information is accurate</li>
            </ul>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping and Delivery</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Shipping times are estimates and not guaranteed</li>
              <li>We are not liable for delays caused by shipping carriers</li>
              <li>Risk of loss transfers to you upon delivery</li>
              <li>International shipping may be subject to customs fees</li>
            </ul>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Returns and Refunds</h2>
            <p className="text-gray-600 mb-4">
              Our return policy is outlined in the Returns page. By placing an order, you agree to our return policy terms.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Returns must be made within 30 days of purchase</li>
              <li>Items must be in original condition</li>
              <li>Refunds are processed to original payment method</li>
              <li>Shipping costs may be deducted from refunds</li>
            </ul>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold mb-4">User Conduct</h2>
            <p className="text-gray-600 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Use the website for any illegal purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit viruses or malicious code</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Interfere with website operation</li>
              <li>Harass or abuse other users</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on Amazon Clone, including text, graphics, logos, and software, is owned by us or our licensors and is protected by copyright laws.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>You may not reproduce, distribute, or create derivative works</li>
              <li>You may not use our content for commercial purposes</li>
              <li>You may not remove any copyright notices</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              To the fullest extent permitted by law, Amazon Clone shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
            <p className="text-gray-600">
              You agree to indemnify and hold Amazon Clone harmless from any claims arising from your use of the website or violation of these Terms & Conditions.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these Terms & Conditions at any time. Continued use of the website after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
            <p className="text-gray-600">
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the courts of India.
            </p>
          </section>

          {/* Contact Us */}
          <section className="p-4 bg-orange-50 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about these Terms & Conditions, please contact us.
            </p>
            <p className="text-gray-600">
              Email: legal@amazonclone.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
