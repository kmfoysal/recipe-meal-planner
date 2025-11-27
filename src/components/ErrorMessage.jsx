
const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <p className="error-text">{message || 'An unexpected error occurred.'}</p>
    </div>
  );
};

export default ErrorMessage;
