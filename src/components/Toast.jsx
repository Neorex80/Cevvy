import React from "react";
import { Save } from "lucide-react";

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed top-4 right-4 bg-white border rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center gap-2">
        <Save className="h-5 w-5 text-gray-500" />
        <div>
          <p className="font-medium">{toast.title}</p>
          <p className="text-sm text-gray-600">{toast.description}</p>
        </div>
      </div>
    </div>
  );
}
