import React from "react";

/**
 * Privacy Policy Page
 * Privacy policy and data handling information
 */
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-600">
              At Amazon Clone, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name and contact information</li>
                  <li>Email address and phone number</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Account Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Username and password</li>
                  <li>Purchase history</li>
                  <li>Wishlist items</li>
                  <li>Shopping cart contents</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and browser type</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring websites</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>SSL encryption for all data transmission</li>
              <li>Secure payment processing</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Data backup and recovery systems</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We may share your information with trusted third parties for specific purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Payment processors for transaction processing</li>
              <li>Shipping carriers for order delivery</li>
              <li>Analytics services to improve our website</li>
              <li>Email service providers for communications</li>
            </ul>
            <p className="text-gray-600 mt-4">
              We never sell your personal information to third parties for marketing purposes.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies to enhance your browsing experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand user behavior</li>
              <li>Marketing cookies for personalized content</li>
            </ul>
            <p className="text-gray-600 mt-4">
              You can manage cookie preferences through your browser settings.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="p-4 bg-orange-50 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or your personal information, please contact us.
            </p>
            <p className="text-gray-600">
              Email: privacy@amazonclone.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
