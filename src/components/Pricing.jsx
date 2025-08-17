import { CheckCircle } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Get started for free. Upgrade when you're ready.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-center text-2xl font-semibold text-gray-900">
                Pro Plan
              </h3>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold text-gray-900">$10</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited Resumes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">AI-Powered Suggestions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Multiple Templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">PDF Downloads</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
