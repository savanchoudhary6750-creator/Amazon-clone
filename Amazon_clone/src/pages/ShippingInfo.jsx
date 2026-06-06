import React from "react";

/**
 * Shipping Info Page
 * Shipping policies and delivery information
 */
export default function ShippingInfo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Shipping Information</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          {/* Shipping Options */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Standard Shipping</h3>
                  <span className="text-orange-500 font-bold">FREE (orders over ₹500)</span>
                </div>
                <p className="text-gray-600 text-sm">5-7 business days</p>
                <p className="text-gray-600 text-sm">₹40 for orders under ₹500</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Express Shipping</h3>
                  <span className="text-orange-500 font-bold">₹99</span>
                </div>
                <p className="text-gray-600 text-sm">2-3 business days</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Next Day Delivery</h3>
                  <span className="text-orange-500 font-bold">₹149</span>
                </div>
                <p className="text-gray-600 text-sm">1 business day (order by 2 PM)</p>
              </div>
            </div>
          </section>

          {/* Delivery Areas */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Delivery Areas</h2>
            <p className="text-gray-600 mb-4">
              We deliver to most locations across India. Some remote areas may have longer delivery times.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Metro cities: 2-3 business days</li>
              <li>Tier 2 cities: 3-5 business days</li>
              <li>Remote areas: 5-7 business days</li>
            </ul>
          </section>

          {/* Order Processing */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Order Processing</h2>
            <div className="space-y-3 text-gray-600">
              <p><strong>Processing Time:</strong> Orders are processed within 1-2 business days.</p>
              <p><strong>Order Confirmation:</strong> You'll receive an email confirmation when your order is placed.</p>
              <p><strong>Shipment Notification:</strong> You'll receive tracking information once your order ships.</p>
              <p><strong>Weekend Orders:</strong> Orders placed on weekends are processed on the next business day.</p>
            </div>
          </section>

          {/* International Shipping */}
          <section>
            <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
            <p className="text-gray-600 mb-4">
              Currently, we only ship within India. We're working on expanding our international shipping options.
            </p>
          </section>

          {/* Shipping Restrictions */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Restrictions</h2>
            <div className="space-y-3 text-gray-600">
              <p><strong>PO Boxes:</strong> We cannot deliver to PO boxes. Please provide a physical address.</p>
              <p><strong>Large Items:</strong> Some large items may require special shipping arrangements.</p>
              <p><strong>Hazardous Materials:</strong> We cannot ship hazardous or flammable materials.</p>
            </div>
          </section>

          {/* Tracking Your Order */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Tracking Your Order</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>Log in to your account</li>
              <li>Go to Orders page</li>
              <li>Click on the order you want to track</li>
              <li>View real-time tracking information</li>
            </ol>
          </section>

          {/* Contact Support */}
          <section className="p-4 bg-orange-50 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Shipping Questions?</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about shipping, our customer support team is here to help.
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
