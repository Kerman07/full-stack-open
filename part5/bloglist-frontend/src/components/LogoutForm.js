import React from "react";

const LogoutForm = ({ handleLogout }) => {
  return (
    <>
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogoutForm;
