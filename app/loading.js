"use client";
import { ThreeCircles } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-[200px]">
      <ThreeCircles
        height="80"
        width="80"
        color="#90e0ef"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
