import { PlusCircle } from "lucide-react";

// Separate ResumeCard into its own small component
const ResumeCard = ({ resume }) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">{resume.title}</h3>
      <p className="text-gray-500 text-sm">Updated {resume.updatedAt}</p>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
          Edit
        </button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
          View
        </button>
      </div>
    </div>
  );
};

const mockResumes = [
  { id: "1", title: "Software Engineer Resume", updatedAt: "2 days ago" },
  { id: "2", title: "Product Manager Application", updatedAt: "1 week ago" },
  { id: "3", title: "UX Designer Portfolio CV", updatedAt: "3 weeks ago" },
];

export default function DashboardPage() {
  const handleCreateNew = () => {
    // In a real app, you would navigate to /builder/new
    alert("Navigate to create new resume page");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Create New Resume
        </button>
      </div>

      {/* Grid of resumes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockResumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>

      {/* Empty state if no resumes */}
      {mockResumes.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold">No Resumes Yet</h2>
          <p className="text-gray-500 mt-2">
            Click "Create New Resume" to get started.
          </p>
        </div>
      )}
    </div>
  );
}
