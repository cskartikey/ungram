import Image from "next/image";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/footer";
import {
  faPlus,
  faArchive,
  faClapperboard,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import ungramIcon from "../static/UNgram.svg";
import fetchUsername from "@/api/getUsername";

export default function Home() {
  const [username, setUsername] = useState("");
  const [contentLoaded, setContentLoaded] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUsername();
        setUsername(response);
        setContentLoaded(true);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <main>
      <nav className="">
        <div className="px-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Image
                src={"http://127.0.0.1:8000/image/"}
                height={0}
                width={35}
                className="h-8 mr-3 rounded-full"
                alt="Profile Picture"
                fetchPriority="high"
              ></Image>
              <a
                href={`https://instagram.com/${
                  contentLoaded ? username : "Loading..."
                }`}
                className="text-texty font-mono font-bold hover:underline"
              >
                @{contentLoaded ? username : "Loading..."}
              </a>
            </div>
            <div className="title">
              <Image
                src={ungramIcon}
                alt="UNgram icon"
                height={0}
                width={250}
              ></Image>
            </div>
            <div className="flex gap-5 pt-10">
              <button className="bg-login-button rounded-xl h-12 w-28 text-white text-lg font-bold hover:border-blue-500 hover:bg-indigo-500 hover:text-white">
                Logout
              </button>
              <button className="bg-red-500 rounded-xl h-12 w-28 text-white text-lg font-bold hover:border-blue-500 hover:bg-indigo-500 hover:text-white">
                Clear
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center pt-44 space-y-9">
        <button className="bg-another h-12 w-4/12 text-white text-left font-sans font-bold rounded-lg">
          <FontAwesomeIcon
            icon={faFacebookMessenger}
            className="w-8 h-8 text-white pl-2"
            size="xl"
          />
          Delete DMs
        </button>
        <button className="bg-texty h-12 w-4/12 text-white text-left font-sans font-bold rounded-lg">
          <FontAwesomeIcon
            icon={faPlus}
            className="w-8 h-8 text-white pl-2"
            size="xl"
          />
          Delete Posts
        </button>
        <button className="bg-another h-12 w-4/12 text-white text-left font-sans font-bold rounded-lg">
          <FontAwesomeIcon
            icon={faArchive}
            className="w-8 h-8 text-white pl-2"
            size="xl"
          />
          Delete Highlights
        </button>
        <button className="bg-texty h-12 w-4/12 text-white text-left font-sans font-bold rounded-lg">
          <FontAwesomeIcon
            icon={faClapperboard}
            className="w-8 h-8 text-white pl-2"
            size="xl"
          />
          Delete Reels
        </button>
        <div className="pt-12">
          {" "}
          <button className="bg-red-500 h-16 w-52 text-white text-3xl font-sans font-extrabold rounded-xl">
            Nuke
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
