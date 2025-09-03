import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import "animate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ bug fix: toastify CSS import missing

const data = [
  {
    lable: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    lable: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    lable: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },
  {
    lable: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    lable: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    lable: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men",
  },
  {
    lable: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women",
  },
];

const App = () => {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("male");

  const grnrateNumForPerson = () => {
    const r = Math.floor(Math.random() * 99);
    return r;
  };

  const Genrate = () => {
    const obj = data.find((item) => item.value === option);
    const url = obj.url;
    const uniqueValue = Date.now();

    if (option === "male" || option === "female") {
      const imageUrl = `${url}/${grnrateNumForPerson()}.jpg`;
      setSrc(imageUrl);
    } else {
      const imgUrl = `${url}${uniqueValue}`;
      setSrc(imgUrl);
    }
  };

  const onOptionChange = (e) => {
    const option = e.target.value;
    setOption(option);
  };

  const download = () => {
    if (!src) return; 
    const a = document.createElement("a");
    a.href = src; 
    a.download = `${Date.now()}.jpg`;
    document.body.appendChild(a); 
    a.click();
    a.remove();
  };

  const copy = () => {
    if (!src) return; //  
    navigator.clipboard.writeText(src);
    toast.success("Image url copied !!", { position: "top-center" });
  };

  useEffect(() => {
    Genrate();
  }, [option]);

  return (
    <div className="animate__animated animate__fadeIn animate__faster overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white p-4"> 
      <div className="animate__animated animate__slideInUp animate__faster gap-4 flex flex-col items-center w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border-slate-700 border p-6 sm:p-10"> 
        
        <img
          src={src || "/avt.png"}
          alt="avatar"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover" 
        />
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">Avtar Generator</h1> 
          <p className="text-slate-300 text-sm sm:text-base">
            Generate unlimited avatars for your website...
          </p>
        </div>
        <div className="gap-4 flex flex-col w-full">
          <select
            value={option}
            onChange={onOptionChange}
            className="bg-slate-900/60 shadow-2xl w-full p-3 rounded-xl border-slate-900 border cursor-pointer text-sm sm:text-base"
          >
            {data.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.lable}
                </option>
              );
            })}
          </select>
          <div className="bg-slate-900/60 shadow-2xl w-full p-3 rounded-xl border-slate-900 border text-xs sm:text-sm break-all"> 
            {src}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4"> 
          <button
            className="flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base"
            onClick={Genrate}
          >
            <i className="ri-arrow-right-up-fill mr-1"></i>Change
          </button>
          <button
            onClick={download}
            className="flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base"
          >
            <i className="ri-download-line mr-1"></i>Download
          </button>
          <button
            onClick={copy}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base"
          >
            <i className="ri-file-copy-fill"></i>Copy
          </button>
        </div>

        {/* Name and GitHub link */}
        <div className="text-center mt-4 space-y-1">
          <p className="text-slate-500 text-xs">Made by Satyam Sharma</p>
          <a 
            href="https://github.com/sharmasatyam121104-devloper" // <-- apna github link daalna
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1"
          >
            <i className="ri-github-fill text-base"></i> GitHub
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
