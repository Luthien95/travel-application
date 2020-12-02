import alertMessages from "../data/alertMessages";

export const filterLoginForm = (user) => {
  let filteredMessages = [];

  if (!user.name || !user.password) {
    filteredMessages = filteredMessages.filter(
      (error) => error.text !== alertMessages.notAllInputFiledMessage.text
    );

    filteredMessages.push(alertMessages.notAllInputFiledMessage);
  }

  return filteredMessages;
};
