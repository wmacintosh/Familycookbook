import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const ResetDataButton: React.FC = () => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReset = () => {
        // Clear all recipe data from localStorage
        localStorage.removeItem('shirleys_kitchen_recipes');
        localStorage.removeItem('shirleys_kitchen_favorites');

        // Show success message
        alert('Recipe data has been reset! The page will now reload with fresh recipes.');

        // Reload the page
        window.location.reload();
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!showConfirm ? (
                <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
                    title="Reset recipe data to remove duplicates"
                >
                    <RefreshCw size={18} />
                    Reset Data
                </button>
            ) : (
                <div className="bg-white border-2 border-red-600 rounded-lg shadow-xl p-4 max-w-sm">
                    <p className="text-sm font-medium text-gray-900 mb-3">
                        This will clear all stored recipe data and reload fresh recipes. Are you sure?
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                        >
                            Yes, Reset
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
