import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/footer";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import login from "@/api/login";
// import '@/css/globals.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    login(email, password);
  };

  return (
    <main>
      <div className="flex flex-col items-center text-center justify-center">
        <div className="pt-60 pb-10">
          <h1 className="text-texty font-extrabold font-sans text-7xl">
            UNgram
          </h1>
        </div>

        <label
          htmlFor="email-address-icon"
          className="pt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <div className="relative w-3/12">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon
              icon={faUser}
              className="w-8 h-8 text-accent"
              size="xl"
            />
          </div>
          <input
            type="email"
            required
            id="email-address-icon"
            className="rounded-full h-14 block w-full pl-14 p-2.5  dark:bg-login-purple dark:border-gray-600 dark:placeholder-gray-400 dark:text-dk-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please enter your email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <label
          htmlFor="password-icon"
          className="pt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <div className="relative w-3/12">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon
              icon={faLock}
              className="w-8 h-8 text-accent"
              size="xl"
            />
          </div>
          <input
            type="password"
            required
            id="password-icon"
            className="rounded-full h-14 block w-full pl-14 p-2.5  dark:bg-login-purple dark:border-gray-600 dark:placeholder-gray-400 dark:text-dk-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please enter your password  "
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="pt-9 relative w-3/12" id="login">
          <button
            className="bg-login-button rounded-lg h-12 w-32 text-dk-gray text-lg font-bold hover:border-blue-500 hover:bg-indigo-500 hover:text-white"
            type="submit"
            onClick={handleFormSubmit}
          >
            Login
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
