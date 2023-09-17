"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import image from "../public/headphoe.png";
import Link from "next/link";

import React from "react";

export default function main() {
  const [data, setData] = useState();
  const [check, setCheck] = useState();

  console.log("check", check);
  console.log("data", data);

  const onSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search",
      params: { q: check },
      headers: {
        "X-RapidAPI-Key": "6da5927398mshaafb33e5cf71809p15c104jsn0346fa02ee32",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      const res = async () => {
        const response = await axios.request(options);

        setData(response.data);
        return response;
      };
      res();
    } catch (error) {
      console.error(error);
    }
  };

  const handleType = (e) => {
    setCheck(e.target.value);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search",
      params: { q: "eminem" },
      headers: {
        "X-RapidAPI-Key": "6da5927398mshaafb33e5cf71809p15c104jsn0346fa02ee32",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      const res = async () => {
        const response = await axios.request(options);
        setData(response.data);

        console.log(response.data);
        return response;
      };
      res();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleaudioblur = (e) => {
    e.target.pause();
  };

  return (
    <>
      <div className="h-40 bg-slate-800 flex justify-center align-middle">
        <Image src={image} className="w-40 h-40"></Image>
        <h2 className=" text-white text-center self-center">
          Search your Favorite musician here
        </h2>
      </div>
      <div className="p-20">
        <form onSubmit={onSubmit}>
          <div className=" grid justify-center ">
            <div className="border border-black pl-5 rounded-md w-80 gap-5 flex">
              <input
                placeholder="Search bar"
                className=" focus:border-none outline-none"
                onChange={handleType}
              />
              <button className=" border rounded-md bg-slate-500 text-white ml-3 ">
                Search
              </button>
            </div>
          </div>
        </form>
        <div className=" flex justify-center">
          <div className="border w-40 h-40 mt-20 mb-10 justify-center grid rounded-md">
            <img
              src={data && data.data[0].artist.picture}
              className="rounded-md"
            />
            <p className=" text-center">{data && data.data[0].artist.name}</p>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 md:grid-cols-5 gap-y-40 mb-80">
        {data &&
          data.data.map((item) => {
            return (
              <>
                <div className=" grid">
                  <div
                    className="w-40 h-40 border border-black rounded-lg p-5 hover:border-amber-400"
                    key={crypto.randomUUID()}
                  >
                    <img src={item.album.cover_medium} loading="lazy" />
                    <div className=" mt-10 grid justify-center align-middle gap-5">
                      <audio
                        controls
                        className=" w-40 "
                        src={item.preview}
                        onBlur={handleaudioblur}
                      ></audio>
                      <p className=" text-center text-base">{item.title}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="h-30 bg-slate-800 p-10 justify-center flex">
        <Link
          className=" text-center text-white"
          href={"https://www.instagram.com/adityamms_/?hl=id"}
        >
          @adityamms
        </Link>
      </div>
    </>
  );
}
