import React from "react";
import "./svg-with-hover-effect.css";

function SvgWithHoverEffect({
  svgString,
  className,
  ...props
}: {
  svgString: string;
  className: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={"svg-container " + className}
      dangerouslySetInnerHTML={{ __html: svgString }}
      {...props}
    />
  );
}

export default SvgWithHoverEffect;
