interface ErrorMessageProps {
  message: string;
  statusCode?: number;
}

export function ErrorMessage({ message, statusCode }: ErrorMessageProps) {
  const display =
    statusCode === 404
      ? 'City not found — check the spelling and try again.'
      : statusCode === 401
      ? 'API key is not configured. Please add your OpenWeatherMap key.'
      : message || 'Something went wrong. Please try again.';

  return (
    <div className="error-message">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{display}</span>
    </div>
  );
}
