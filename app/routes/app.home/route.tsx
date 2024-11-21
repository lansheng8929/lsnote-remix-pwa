import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllPosts } from "~/services/post";
import ballsvgString from "~/components/icon/home.svg?raw";
import React, { useRef, useState } from "react";
import "./home.css";
import { compressImage } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const posts = await getAllPosts();

  return Response.json({
    posts,
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const cardsRef = useRef<any>(null);

  React.useEffect(() => {
    let isScroll = false;
    let scrollInterval: any = null;
    let startTimeout: any = null;
    let dom = cardsRef.current;

    // 检查dom挂载
    if (!dom) return;

    const onWheel = (e: any) => {
      isScroll = true;
      e.preventDefault();

      const delta =
        Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      dom.scrollLeft += delta;
    };
    dom.addEventListener("wheel", onWheel);

    scrollInterval = setInterval(() => {
      if (isScroll) {
        if (!startTimeout) {
          startTimeout = setTimeout(() => {
            isScroll = false;
            startTimeout = null;
          }, 5000);
        }

        return;
      } else {
        dom.scrollLeft += 0.5;
      }

      if (dom.scrollLeft === dom.scrollWidth - dom.clientWidth) {
        console.log("done");

        clearInterval(scrollInterval);
        scrollInterval = null;
        clearTimeout(startTimeout);
        startTimeout = null;
      }
    }, 100);

    return () => {
      dom.removeEventListener("wheel", onWheel);
      clearInterval(scrollInterval);
      scrollInterval = null;
      clearTimeout(startTimeout);
      startTimeout = null;
    };
  }, [data.posts]);

  return (
    <>
      <section className=" home overflow-hidden">
        <div className=" recent p-5 pr-0 w-full">
          <div className=" text-white font-['Noto_Serif_SC'] pb-5">
            <div className=" text-[3vh] text-nowrap">最近文章</div>
            <div className=" text-[1.3vh] text-nowrap">recent article</div>
          </div>

          <div className=" cards flex w-full overflow-x-scroll" ref={cardsRef}>
            {data.posts.length > 0 ? (
              data.posts.map(async (post) => (
                <div
                  className=" cursor-pointer mr-5"
                  onClick={() => window.open(post.url)}
                  key={post.notionId}
                >
                  <div className=" relative h-[15vh] w-[30vw] overflow-hidden bg-black ">
                    {post.cover ? (
                      <img
                        className=" w-full h-full object-cover"
                        src={await compressImage(post.cover)}
                      />
                    ) : (
                      <div
                        className="absolute top-0 left-0 rotate-6 translate-x-10"
                        dangerouslySetInnerHTML={{ __html: ballsvgString }}
                      />
                    )}
                  </div>

                  <div className=" text-white font-['Noto_Serif_SC']">
                    <div className=" text-[2vh] text-nowrap w-[30vw] overflow-hidden">
                      {post.title ?? "最近文章"}
                    </div>
                    <div className=" text-[1.1vh] text-nowrap w-[30vw] overflow-hidden">
                      {post.content ?? "........"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <CardContainerSkeleton />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
function CardContainerSkeleton({ className }: { className?: string }) {
  const length = [1, 2, 3];

  return (
    <section className={" card-container-skeleton " + className}>
      <div className=" flex">
        {length.map((l, i) => (
          <div className=" skeleton mr-5" key={i}>
            <div className="item h-[15vh] w-[30vw] rounded-sm"></div>
            <div className="item h-[2vh] w-[15vw] rounded-sm mt-3"></div>
            <div className="item h-[1.1vh] w-[20vw] rounded-sm mt-3"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
