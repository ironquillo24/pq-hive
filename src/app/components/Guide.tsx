import { BadgeHelp, ArrowBigUp, CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";

type GuideProps = {
  isScanReady: boolean;
  handleScan: () => void;
};
const Guide = ({ isScanReady, handleScan }: GuideProps) => {
  return (
    <div className="grid grid-cols-2 *:h-[500px] w-auto pt-4">
      <div className="flex justify-center items-center min-w-[200px] border-r-4 border-r-slate-200">
        <div className=" text-3xl">Enter a search word</div>
        <div className="flex items-center relative group">
          <div className="pl-1 hover:-translate-y-0.1">
            <BadgeHelp
              color="#586AF9"
              className=" stroke-2 hover:size-7 hover:translate-y-0.5 hover:-translate-x-0.5"
            />
          </div>
          <span className="absolute -left-10 top-10 p-2 rounded-lg border border-black scale-0 transition-all group-hover:scale-100 duration-700 text-black w-[300px]">
            i.e. HardwareID, P-specs, or keywords such as generic, package, etc.{" "}
            <br></br>
            <span className="font-bold italic">hint:</span> Type &ldquo;
            <span className="italic font-medium">all</span>&rdquo; to display
            all hardware
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center  min-w-[700px] ">
        <div className="pl-12">
          <Image
            src="/assets/scanner2.png"
            width={350}
            height={350}
            alt="scanner"
            className="p-0 ml-2 mr-4 w-auto h-[250px] resize-none"
          />
          {isScanReady ? (
            <div className="flex items-center pl-2 -translate-x-10">
              <CircleCheck
                color="#ffffff"
                fill="#00ff00"
                size={35}
                className="animate-pulse"
              />
              <div className="pl-1 text-nowrap">Ready to scan</div>
            </div>
          ) : (
            <div className="flex items-center pl-2 -translate-x-20">
              <CircleX
                color="#ffffff"
                fill="#BB1616"
                size={35}
                className="animate-pulse"
              />
              <button
                type="button"
                className="ml-1 text-nowrap hover:underline"
                onClick={handleScan}
              >
                Click here to start scanning
              </button>
              <div className="flex relative group">
                <div className="pl-1 hover:-translate-y-0.1">
                  <BadgeHelp
                    color="#586AF9"
                    className=" stroke-2 hover:size-7 hover:-translate-y-0.5 hover:-translate-x-0.5"
                    size={25}
                  />
                </div>
                <span className="absolute left-10 -top-7 p-2 rounded-lg border border-black scale-0 transition-all group-hover:scale-100 duration-700 text-black w-[300px]">
                  Cursor must be in the search field position to enable
                  scanning.
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="text-4xl flex items-center text-nowrap ">
          Scan your hardware
        </div>
      </div>
    </div>
  );
};

export default Guide;

{
  /* <div className="flex pl-28 pt-4">
        <div className="-translate-y-2 text-3xl">Enter a search word</div>
        <div className="flex relative group">
          <div className="pl-1 hover:-translate-y-0.1">
            <BadgeHelp
              color="#586AF9"
              className=" stroke-2 hover:size-7 hover:-translate-y-0.5 hover:-translate-x-0.5"
            />
          </div>
          <span className="absolute left-10 -top-7 p-2 rounded-lg border border-black scale-0 transition-all group-hover:scale-100 duration-700 text-black w-[300px]">
            i.e. HardwareID, P-specs, or keywords such as generic, package, etc.{" "}
            <br></br>
            <span className="font-bold italic">hint:</span> Type &ldquo;
            <span className="italic font-medium">all</span>&rdquo; to display
            all hardware
          </span>
        </div>
      </div>
      <div className="flex pl-56">
        <div className="flex place-items-end text-4xl pr-4 -translate-y-12">
          or
        </div>
        <div className="flex">
          <Image
            src="/assets/scanner2.png"
            width={350}
            height={350}
            alt="scanner"
            className="p-0 ml-2 mr-4 w-auto"
          />
          <div className="text-4xl -translate-x-44 flex items-center text-nowrap translate-y-4 ">
            Scan your hardware
          </div>
          {isScanReady ? (
            <div className="flex items-center pl-2 translate-y-5  -translate-x-44">
              <CircleCheck color="#ffffff" fill="#00ff00" size={35} />
              <div className="pl-1 text-nowrap">Ready to scan</div>
            </div>
          ) : (
            <div className="flex items-center pl-2 translate-y-5  -translate-x-44 ">
              <CircleX
                color="#ffffff"
                fill="#BB1616"
                size={35}
                className="animate-pulse"
              />
              <button
                type="button"
                className="ml-1 text-nowrap hover:underline"
                onClick={handleScan}
              >
                Click here to start scanning
              </button>
              <div className="flex relative group">
                <div className="pl-1 hover:-translate-y-0.1">
                  <BadgeHelp
                    color="#586AF9"
                    className=" stroke-2 hover:size-7 hover:-translate-y-0.5 hover:-translate-x-0.5"
                    size={25}
                  />
                </div>
                <span className="absolute left-10 -top-7 p-2 rounded-lg border border-black scale-0 transition-all group-hover:scale-100 duration-700 text-black w-[300px]">
                  Cursor must be in the search field position to enable
                  scanning.
                </span>
              </div>
            </div>
          )}
        </div>
      </div> */
}
