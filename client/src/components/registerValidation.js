import alertMessages from "../data/alertMessages";

export const filterRegisterForm = (newUser) => {
  let filteredMessages = [];

  if (!newUser.name || !newUser.password || !newUser.repeatPassword) {
    filteredMessages = filteredMessages.filter(
      (error) => error.text !== alertMessages.notAllInputFiledMessage.text
    );

    filteredMessages.push(alertMessages.notAllInputFiledMessage);
  } else {
    if (newUser.name.length < 5 || newUser.name.length > 50) {
      filteredMessages = filteredMessages.filter(
        (error) =>
          error.text !==
          alertMessages.wrongNumberOfLettersInUsernameMessage.text
      );

      filteredMessages.push(
        alertMessages.wrongNumberOfLettersInUsernameMessage
      );
    }

    if (newUser.password !== newUser.repeatPassword) {
      filteredMessages = filteredMessages.filter(
        (error) => error.text !== alertMessages.differentPasswordsMessage.text
      );

      filteredMessages.push(alertMessages.differentPasswordsMessage);
    }

    if (newUser.password.length < 8) {
      filteredMessages = filteredMessages.filter(
        (error) =>
          error.text !==
          alertMessages.wrongNumberOfLettersInPasswordMessage.text
      );

      filteredMessages.push(
        alertMessages.wrongNumberOfLettersInPasswordMessage
      );
    }

    if (
      newUser.name.includes(" ") ||
      newUser.password.includes(" ") ||
      newUser.repeatPassword.includes(" ")
    ) {
      filteredMessages = filteredMessages.filter(
        (error) => error.text !== alertMessages.spaceInStringMessage.text
      );

      filteredMessages.push(alertMessages.spaceInStringMessage);
    }
  }

  return filteredMessages;
};
