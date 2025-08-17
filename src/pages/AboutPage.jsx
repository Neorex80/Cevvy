import React from 'react';
import { Target, Users, Award, Zap, CheckCircle, Star } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: "Precision-Built Templates",
      description: "Our templates are crafted by HR professionals and designed to pass ATS systems while looking stunning to human recruiters."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create a professional resume in under 1 minute with our streamlined, intuitive builder process."
    },
    {
      icon: Award,
      title: "Industry Expertise",
      description: "Backed by career experts and recruitment professionals who understand what employers really want to see."
    },
    {
      icon: Users,
      title: "Trusted by Thousands",
      description: "Join over 1K job seekers who have successfully landed their dream jobs using our platform."
    }
  ];

  const stats = [
    { number: "5000+", label: "Resumes Created" },
    { number: "85%", label: "Success Rate" },
    // { number: "200+", label: "Companies Trust Us" },
    { number: "4.9★", label: "User Rating" }
  ];

//   const teamMembers = [
//     {
//       name: "Sarah Johnson",
//       role: "CEO & Founder",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
//       bio: "Former Google recruiter with 10+ years in talent acquisition"
//     },
//     {
//       name: "Michael Chen",
//       role: "Lead Developer",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
//       bio: "Full-stack engineer passionate about user experience"
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Career Coach",
//       image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
//       bio: "Certified career counselor helping professionals succeed"
//     }
//   ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Crafting Careers,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> One Resume</span> at a Time
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We believe everyone deserves a chance to showcase their potential. Our mission is to democratize professional opportunities by making high-quality resume building accessible to all.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 min-w-[140px]">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                In today's competitive job market, your resume is often the first impression you make. We created Resume-Craft to level the playing field, ensuring that talent shines through regardless of design skills or resources.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform combines cutting-edge technology with human expertise to help you present your best professional self.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">ATS-Optimized Templates</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Expert-Reviewed Content</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Real-Time Career Guidance</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-neutral-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why We Started</h3>
                <p className="text-blue-100 leading-relaxed">
                  After seeing talented individuals overlooked due to poor resume formatting, our founders knew there had to be a better way. We built Resume-Craft to ensure that your skills and experience get the attention they deserve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another resume builder. We're your career partner, combining technology with human insight.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-100 rounded-xl p-3 w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to helping you succeed in your career journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-2xl mx-auto object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Future?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who transformed their careers with Resume-Craft.
          </p>
          <a
            href="/build"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Building Now
            <Star className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}