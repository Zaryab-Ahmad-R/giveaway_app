
import React, { useEffect } from "react";

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        margin: "auto",
        maxWidth: "350px",
        width: "100%",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    ></blockquote>
  );
};

export default InstagramEmbed;

