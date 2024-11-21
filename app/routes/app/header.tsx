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
          className="h-full cursor-pointer stroke-white fill-none"
          svgString={svgString}
          onPointerDown={(e) => {
            e.currentTarget.style.stroke = "gray";
            navigate(to);
          }}
          onPointerUp={(e) => {
            e.currentTarget.style.stroke = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.stroke = "white";
          }}
        />
      );
    }
  );

  return (
    <header className=" header overflow-hidden">
      <div id="banner" className=" relative bg-black overflow-hidden font-sc">
        <section className=" banner-container">
          <div className=" bg-black text-white ">
            {/* <Leaf className="leaf "></Leaf> */}
            <div
              className={` relative pl-10 transition-[height] overflow-hidden phone:hidden ${
                open ? "h-[15vw]" : "h-[4vw]"
              }`}
            >
              {open ? (
                <>
                  <div className="flex justify-between h-[15vw] py-[1vw] ">
                    <div className=" flex flex-col justify-between">
                      <div>
                        <p className=" leading-none text-[4vw] font-sc">岚笙</p>
                        <p className=" text-[1.5vw] font-sc pt-1">的小站</p>
                      </div>

                      <p className=" text-[1vw] font-sc pt-1">访问量：0</p>
                    </div>

                    <div className=" text-white ">
                      <p className=" text-[1vw] font-sc">•自我介绍</p>
                      <p className=" text-[1vw] font-sc">•个人能力</p>
                      <p className=" text-[1vw] ml-[1vw]">...</p>
                    </div>

                    <div className=" flex flex-col items-end justify-between text-white pr-10">
                      <div>
                        <p className=" text-[1vw] font-sc">
                          •分享技术设计和生活
                        </p>
                        <p className="  text-[1vw] font-sc">
                          •美学和技术结合探索
                        </p>
                        <p className="  text-[1vw] ml-[1vw]">...</p>
                      </div>

                      <div className=" text-[1vw] inline-block font-sc">
                        article & technology
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-5 h-[4vw] py-[1vw]">
                    <Icon svgString={homesvgString} to="/app/home" />
                    <Icon svgString={starsvgString} to="/app/posts" />
                  </div>
                </>
              )}
            </div>

            <div className=" relative pl-10 transition-[height] overflow-hidden sm:hidden ">
              <div className="flex gap-5 h-[8vh] py-[2vh]">
                <Icon svgString={homesvgString} to="/app/home" />
                <Icon svgString={starsvgString} to="/app/posts" />
              </div>
            </div>

            <div
              className=" relative flex gap-3 text-[1vw] phone:text-[2vh] font-sc pb-5 pt-1 border-0 border-t-[1px] border-white border-solid pl-10 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <div>lansheng's blog</div>
              <HoverCard openDelay={0}>
                <HoverCardTrigger>@岚笙Space</HoverCardTrigger>
                <HoverCardContent className="w-80 HoverCardContent">
                  <img
                    className=" w-full h-full"
                    src="/wechat.png"
                    alt="wechat.png"
                  />
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
