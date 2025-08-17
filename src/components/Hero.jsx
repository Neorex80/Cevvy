export default function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-gray-900">
          Build a Resume That Gets Noticed
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Create a professional resume in minutes with our intuitive builder.
          Land your dream job with a resume that stands out.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200">
          Build My Resume
        </button>
        <div className="mt-12">
          <img
            src="https://placehold.co/1200x600.png"
            alt="ResumeFlow dashboard preview"
            width={1200}
            height={600}
            className="rounded-lg shadow-2xl mx-auto max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
