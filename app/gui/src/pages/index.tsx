import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/footer";
import { faPlus, faArchive, faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export default function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const handleFormSubmit = (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();

    //     login(email, password);
    //   };
    const imageSrc = () => {
        const[profilePic, setProfilePic] = useState("")
    }
    const username = "@cskartikey"
  return (
    <main>
    
        <nav className="">
            <div className="pt-6 px-4">
                <div className="flex justify-between">
                    <div className="flex items-center"> 
                        <img src="" crossOrigin="anonymous" className="h-8 mr-3 rounded-full" alt="Profile Picture"></img> 
                        <p className="text-texty font-mono font-bold">{username}</p>
                    </div>
                    <div className="title"> 
                        <h1 className="text-5xl text-center text-texty font-extrabold font-sans">UNgram</h1>
                    </div>
                    <div className="flex gap-5"> 
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

        <div className="flex flex-col items-center pt-52 space-y-9">
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
            <div className="pt-12">            <button className="bg-red-500 h-16 w-52 text-white text-3xl font-sans font-extrabold rounded-xl">
            Nuke
            </button></div>

        </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
