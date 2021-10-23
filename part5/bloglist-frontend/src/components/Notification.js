const Notification = ({ notification }) => {
  if (notification === ["", ""]) return null;
  return <div className={notification[1]}>{notification[0]}</div>;
};

export default Notification;
