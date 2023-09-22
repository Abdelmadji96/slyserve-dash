import React from "react";
import DOMPurify from "dompurify";

const myHTML = "";//require('../../assets/html/policy.html');//`<h1>John Doe</h1>`;
const mySafeHTML = DOMPurify.sanitize(myHTML);

const HtmlPolicy = () => {
  return <div dangerouslySetInnerHTML={{ __html: mySafeHTML }} />;
};

export default HtmlPolicy;
