import React from "react";

/**
 * Returns Page
 * Return policy and process information
 */
export default function Returns() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Return Policy</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          {/* Return Policy Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Return Policy</h2>
            <p className="text-gray-600 mb-4">
              We want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>30-day return policy for most items</li>
              <li>Items must be in original condition with tags attached</li>
              <li>Free returns for defective or damaged items</li>
              <li>Refund processed within 5-7 business days</li>
            </ul>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-2xl font-bold mb-4">How to Return an Item</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Go to Orders:</strong> Log in to your account and navigate to the Orders page
              </li>
              <li>
                <strong>Select Order:</strong> Find the order containing the item you want to return
              </li>
              <li>
                <strong>Initiate Return:</strong> Click on "Return Item" and select the reason for return
              </li>
              <li>
                <strong>Print Label:</strong> Download and print the return shipping label
              </li>
              <li>
                <strong>Package Item:</strong> Pack the item securely in its original packaging if possible
              </li>
              <li>
                <strong>Ship Item:</strong> Drop off the package at the designated shipping location
              </li>
              <li>
                <strong>Receive Refund:</strong> Once we receive and inspect the item, your refund will be processed
              </li>
            </ol>
          </section>

          {/* Return Conditions */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Return Conditions</h2>
            <div className="space-y-4 text-gray-600">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✓ Eligible for Return</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Items in original condition with tags</li>
                  <li>Unused and unworn clothing</li>
                  <li>Defective or damaged items</li>
                  <li>Wrong item received</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">✗ Not Eligible for Return</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Items used or damaged by customer</li>
                  <li>Items without original tags or packaging</li>
                  <li>Personal care items (opened)</li>
                  <li>Final sale items</li>
                  <li>Items returned after 30 days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Refund Information</h2>
            <div className="space-y-3 text-gray-600">
              <p><strong>Refund Method:</strong> Refunds are issued to the original payment method used for purchase.</p>
              <p><strong>Processing Time:</strong> Refunds are processed within 5-7 business days after we receive the returned item.</p>
              <p><strong>Shipping Costs:</strong> Return shipping is free for defective items. For other returns, shipping costs may be deducted from the refund.</p>
              <p><strong>Partial Refunds:</strong> Items returned in used condition may receive a partial refund.</p>
            </div>
          </section>

          {/* Contact Support */}
          <section className="p-4 bg-orange-50 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about returns, our customer support team is here to help.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
              Contact Support
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
