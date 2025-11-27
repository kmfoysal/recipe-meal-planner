import React from "react";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        &copy; {new Date().getFullYear()} Meal Planner | All Rights Reserved |
        Develop by{" "}
        <a
          href="https://github.com/kmfoysal"
          target="_blank"
          rel="noopener noreferrer"
        >
          K M FOYSAL
        </a>
      </p>
    </footer>
  );
};

export default Footer;
