import PropTypes from "prop-types";
import React from "react";

const Notification = ({ notification }) => {
  if (notification === ["", ""]) return null;
  return <div className={notification[1]}>{notification[0]}</div>;
};

Notification.propTypes = {
  notification: PropTypes.array.isRequired,
};

export default Notification;
