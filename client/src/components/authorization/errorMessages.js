import React from "react";

const ErrorMessages = ({ errorMessages }) => {
  if (errorMessages.length > 0) {
    return errorMessages.map((error, id) => {
      return (
        <p className="error-text" key={id}>
          {error.text}
        </p>
      );
    });
  }

  return null;
};

export default ErrorMessages;
