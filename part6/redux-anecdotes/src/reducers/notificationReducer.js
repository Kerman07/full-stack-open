let timer;

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data.content;
    }
    default:
      return state;
  }
};

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { content },
    });
    clearTimeout(timer);
    timer = setTimeout(
      () =>
        dispatch({
          type: "SET_NOTIFICATION",
          data: { content: "" },
        }),
      time
    );
  };
};

export default notificationReducer;
