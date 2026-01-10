import React, { useCallback } from "react";

interface ConfirmationPopupProps {
  message: string;
  importantMessage?: string;
  showImportantMessage?: boolean;
  confirmButtonRed?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmationPopup({
  message,
  importantMessage,
  showImportantMessage = false,
  confirmButtonRed = false,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationPopupProps) {
  const handleBackdropClick = useCallback(() => {
    if (!isLoading) onCancel();
  }, [isLoading, onCancel]);

  const isButtonDisabled = isLoading;
  const confirmButtonClass = isLoading
    ? "bg-red-400 cursor-not-allowed"
    : confirmButtonRed
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue hover:bg-blue-700";

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
      >
        <div className="p-6 pb-2">
          <h3 id="confirmation-title" className="text-2xl font-bold text-gray-800">
            Are you sure?
          </h3>
        </div>

        <div className="px-6 py-2">
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            {message}
          </p>
          {showImportantMessage && importantMessage && !isLoading && (
            <div className="flex gap-1 mt-2">
              <p className="text-lg text-blue font-bold leading-relaxed">
                Important:
              </p>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                {importantMessage}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isButtonDisabled}
            className="px-5 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isButtonDisabled}
            className={`px-5 py-2.5 rounded-xl text-white font-medium shadow-sm transition-all duration-200 hover:shadow-md ${confirmButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
