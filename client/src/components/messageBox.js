import React from "react";
import { Alert } from "react-bootstrap";

function MessageBox(props) {
  const message = props.message;
  const visible = props.visible;

  return (
    <Alert variant={message.variant} show={visible}>
      <Alert.Heading>{message.heading}</Alert.Heading>
      <p dangerouslySetInnerHTML={{ __html: message.text }} />
    </Alert>
  );
}

export default MessageBox;
