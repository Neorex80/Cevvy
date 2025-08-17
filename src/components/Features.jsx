import { PencilRuler, Bot, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <PencilRuler className="w-8 h-8 text-blue-600" />,
      title: "Guided Resume Creation",
      description:
        "Step-by-step guidance to build the perfect resume, section by section.",
    },
    {
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Optimization",
      description:
        "Our AI analyzes your resume to offer optimized word choices and improve impact.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Instant Downloads",
      description:
        "Get your professionally formatted resume in PDF format, ready to be sent out.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose ResumeFlow?
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Everything you need to create a winning resume.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col items-center text-center p-6">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <div className="px-6 pb-6 text-center">
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
