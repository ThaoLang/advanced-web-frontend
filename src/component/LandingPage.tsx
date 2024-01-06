import React from "react";
import Hero from "./Hero";
import { useTranslations } from "next-intl";

import Image from "next/image";

export default function LandingPage() {
  const t = useTranslations("LandingPage");
  return (
    <div className="bg-white">
      <Hero />
      <div className="flex flex-col w-5/6 mx-auto">
        <div className="mt-10 lg:w-3/4 mx-auto text-center">
          <div className="text-5xl">
            <b>
              {t("header_1")} <span className="text-yellow-400">LightHub?</span>
            </b>
          </div>
          <p className="mt-5 text-lg lg:text-xl">{t("header_description_1")}</p>
        </div>

        <div className="divider lg:hidden"></div>

        <div className="lg:mt-20 lg:flex-row flex flex-col lg:justify-center space-x-4">
          <div className="lg:mt-10 mx-10 lg:w-1/2">
            <div className="text-3xl lg:text-5xl">
              <b>{t("header_2")}</b>
            </div>
            <p className="mt-5 text-lg lg:text-xl">
              {t("header_description_2")}{" "}
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              alt="info image"
              className="rounded-xl w-screen"
              src="https://corp.kaltura.com/wp-content/uploads/2021/11/shutterstock_1760879942.jpg"
            ></img>
            {/* <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Image
                alt="info image"
                className="rounded-xl w-screen"
                src="https://img.freepik.com/free-photo/child-wearing-headphones-attending-online-courses_23-2148766723.jpg?size=626&ext=jpg"
                fill
              />
            </div> */}
          </div>
        </div>

        <div className="divider lg:hidden"></div>

        <div className="lg:mt-20 lg:flex-row flex flex-col lg:justify-center space-x-4">
          <div className="lg:w-1/2">
            {/* Image */}
            <img
              alt="info image"
              className="rounded-xl w-screen "
              src="https://www.graduateprogram.org/wp-content/uploads/2020/07/July-9-Online-Courses-for-Teachers-this-Summer_web-1024x683.jpg.webp"
            ></img>
            {/* <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Image
                alt="info image"
                className="rounded-xl w-screen" 
                src="https://www.graduateprogram.org/wp-content/uploads/2020/07/July-9-Online-Courses-for-Teachers-this-Summer_web-1024x683.jpg.webp"
                fill
              />
            </div> */}
          </div>
          <div className="lg:mt-10 mx-10 lg:w-1/2 text-right">
            <div className="text-3xl lg:text-5xl">
              <b>{t("header_3")}</b>
            </div>
            <p className="mt-5 text-lg lg:text-xl">
              {t("header_description_3")}
            </p>
          </div>
        </div>

        <div className="divider lg:hidden"></div>

        <div className="lg:mt-20 lg:flex-row flex flex-col lg:justify-center space-x-4">
          <div className="lg:mt-10 mx-10 lg:w-1/2">
            <div className="text-3xl lg:text-5xl">
              <b>{t("header_4")}</b>
            </div>
            <p className="mt-5 text-lg lg:text-xl">
              {t("header_description_4")}{" "}
            </p>
          </div>
          <div className="lg:w-1/2">
            {/* Image */}
            <img
              alt="info image"
              className="rounded-xl w-screen"
              src="https://www.westend61.de/images/0001481557pw/boys-looking-at-laptop-while-e-learning-in-living-room-VABF04028.jpg"
            ></img>
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              {/* <Image
                alt="info image"
                className="rounded-xl w-screen"
                src="https://www.westend61.de/images/0001481557pw/boys-looking-at-laptop-while-e-learning-in-living-room-VABF04028.jpg"
                layout="fill"
                objectFit="contain"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center bg-[#365338]">
        <div className="h-10"></div> {/* Why i can't use mt-10??? */}
        <div className="text-4xl lg:text-5xl text-white">
          <b>
            {t("header_5")} <span className="text-yellow-400"> LightHub</span>
          </b>
        </div>
        <div className="mt-10 flex lg:flex-row flex-col lg:justify-center">
          <button className="mb-5 lg:w-80 btn btn-info text-uppercase">
            {t("get_started_btn")}
          </button>
          <button className="mb-5 lg:w-80 lg:ml-5 btn btn-info text-uppercase ">
            {t("learn_more_btn")}
          </button>
        </div>
        <div className="h-10"></div> {/* Why i can't use mt-10??? */}
      </div>
    </div>
  );
}
