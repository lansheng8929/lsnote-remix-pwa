import React from "react";
import Leaf from "./Leaf";
import "./header-style.css";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import SvgWithHoverEffect from "~/components/svg-with-hover-effect/svg-with-hover-effect";
import homesvgString from "~/components/icon/home.svg?raw";
import starsvgString from "~/components/icon/star.svg?raw";
import { useNavigate } from "@remix-run/react";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const Icon = React.memo(
    ({ svgString, to }: { svgString: string; to: string }) => {
      return (
        <SvgWithHoverEffect
          className="h-full cursor-pointer stroke-black fill-none"
          svgString={svgString}
          onPointerDown={(e) => {
            e.currentTarget.style.stroke = "gray";
            navigate(to);
          }}
          onPointerUp={(e) => {
            e.currentTarget.style.stroke = "black";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.stroke = "black";
          }}
        />
      );
    }
  );

  return (
    <header className=" header overflow-hidden">
      <div id="banner" className=" relative overflow-hidden font-sc">
        <section className=" banner-container">
          <div className="">
            <div className="flex gap-5 h-[2vh] px-8 py-[2vh] box-content">
              <Icon svgString={homesvgString} to="/app" />
              <Icon svgString={starsvgString} to="/app/jstots" />
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
