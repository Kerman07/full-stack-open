const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "VOTE_NOTIF": {
      return `you voted "${action.data.message}"`;
    }
    case "NEW_NOTIF": {
      return `you created "${action.data.message}"`;
    }
    case "RESET_NOTIF": {
      return "";
    }
    default:
      return state;
  }
};

export const notifyVote = (message) => {
  return {
    type: "VOTE_NOTIF",
    data: {
      message,
    },
  };
};

export const notifyNew = (message) => {
  return {
    type: "NEW_NOTIF",
    data: {
      message,
    },
  };
};

export const notifyReset = () => {
  return {
    type: "RESET_NOTIF",
  };
};

export default notificationReducer;
