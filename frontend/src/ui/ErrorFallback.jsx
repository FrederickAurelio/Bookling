function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-screen flex-col items-center bg-stone-100 pt-48 text-3xl font-semibold">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        className="mt-4 flex items-center justify-center gap-2 rounded bg-stone-200 p-2 hover:underline"
        onClick={resetErrorBoundary}
        aria-label="Try again"
      >
        {"<-- Try again"}
      </button>
    </div>
  );
}

export default ErrorFallback;
