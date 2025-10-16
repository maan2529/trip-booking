const Popup = ({
  title = "Confirmation",
  message,
  confirmLabel = "Yes",
  cancelLabel = "No",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-hidden="true"
      />

      <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 sm:p-7">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 text-center">
          {title}
        </h2>
        {message && (
          <p className="text-sm text-gray-600 text-center mb-6">{message}</p>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-center gap-3">
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;