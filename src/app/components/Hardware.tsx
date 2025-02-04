"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import HardwareList from "./HardwareList";
import AdminControls from "./buttons/AdminControls";
import { Data } from "@/dbSchema";
import { CartData } from "@/mysqlutils";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Guide from "./Guide";

interface HardwareProps {
  hardwareData: Data[];
  user: string;
  userID: number;
  isAdmin: boolean;
  cartData: CartData[];
}

export default function Hardware({
  hardwareData,
  user,
  userID,
  isAdmin,
  cartData,
}: HardwareProps) {
  const [inputValue, setInputValue] = useState("");
  const [showAdminControls, setShowAdminControls] = useState(false);
  //const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [isScanReady, setIsScanReady] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const isDark = false;
  const textColor = isDark ? "text-white" : "text-slate-700";
  const bgColor = isDark ? "text-white bg-slate-700" : "";

  //focus curson on search input field on page load
  useEffect(() => {
    inputRef?.current?.focus();
    setIsScanReady(true);
  }, []);

  useEffect(() => {
    const changeOnBlur = () => {
     
      if (document.activeElement === inputRef.current) {
        setIsScanReady(true);
      } else {
        setIsScanReady(false);
      }
    };
    document.addEventListener("click", changeOnBlur, true);
    return document.removeEventListener("click", changeOnBlur);
  });

  useEffect(() => {
    const changeOnFocus = () => {
      if (document.activeElement === inputRef.current) {
        setIsScanReady(true);
      } else {
        setIsScanReady(false);
      }
    };
    document.addEventListener("focus", changeOnFocus, true);
    return document.removeEventListener("focus", changeOnFocus);
  }, []);

  //  let searchedData: Data[]
  //filter the data, if search box is 'all', do not filter
  const searchedData = useMemo(() => {
    let data: Data[];
    if (inputValue.toLowerCase() === "all") {
      data = filterData(hardwareData, "");
    } else {
      data = filterData(hardwareData, inputValue);
    }
    return data;
  }, [inputValue, hardwareData]);

  let isDataAvailable: boolean;

  //don't show data if searchbox is empty. Show all data if showAdminControl button is press or 'all' is typed in search box
  if (searchedData.length === 0 || inputValue === "")
    if (showAdminControls || inputValue.toLowerCase() === "all")
      isDataAvailable = true;
    else isDataAvailable = false;
  else isDataAvailable = true;

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue !== "") {
      const hardware = searchedData[0];
      if (searchedData.length === 1 && hardware.status === "IN STORAGE")
        router.push(`/?borrowItem=true&hardwareID=${hardware.hardwareid}`);
    }
  };

  const handleOnAdminClick = () => {
    showAdminControls
      ? setShowAdminControls(false)
      : setShowAdminControls(true);
  };

  const handleScan = () => {
    inputRef?.current?.focus();
  };

  const tableHeader = {
    id: 1,
    hardwareid: "Hardware ID",
    pspec: "P-Specs",
    type: "Type",
    generic: "",
    package: "",
    leadcount: 1,
    description: "Description",
    status: "Status",
    comments: "Comments",
    owner: "Owner",
    dateModified: "Last Date Modified",
    qtyRequest: 1,
    supplier: "",
    supplierPartNumber: "",
    requestor: "",
    typeAcronym: "",
    barcode: "",
    serialNumber: "",
    withTag: "",
    focusteam: "",
    tags: "",
    inUseDuration: "In Use Duration(days)",
  };

  return (
    <div className="inline-block resize border-gray-200  bg-slate-200 md:w-screen">
      <div className=" w-full bg-white pt-2 pl-2 pb-4 border-b-2">
        <div className="flex relative mt-2">
          <div className={`font-bold pr-2 ${textColor}`}>Search: </div>
          <input
            type="text"
            id="searchField"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={onEnter}
            className={`border-solid border-slate-400 mb-4 h-8 ${bgColor}s rounded-full`}
          />
          {!isDataAvailable && inputValue.length === 0 && (
            <div className="absolute p-[5px] bg-blue-500 rounded-full left-64 animate-ping"></div>
          )}
          <div className="flex gap-4 absolute right-[20px]">
            <Image
              src="/assets/PQ-Hive-logo-trans.png"
              width={120}
              height={100}
              alt="PQ Hive"
              className="p-0 ml-2 mr-4 w-[130px] h-auto scale-0 md:scale-100"
            />
            {isAdmin && (
              <AdminControls
                handleOnAdminClick={handleOnAdminClick}
                showAdminControls={showAdminControls}
              />
            )}
          </div>
        </div>
      </div>

      <div className=" bg-white relative">
        {isDataAvailable ? (
          <div className="grid grid-cols-10 font-bold min-w-[1500px] pl-2 sticky">
            <HardwareList
              data={tableHeader}
              isButton={false}
              user={user}
              userID={userID}
              isAdminActivated={showAdminControls}
            />
          </div>
        ) : (
          <p></p>
        )}

        {isDataAvailable ? (
          <div className="bg-slate-100 pl-2 ">
            <ul>
              {searchedData.map((hardwareInfo) => {
                //console.log(hardwareInfo)
                return (
                  <li
                    key={hardwareInfo.id}
                    className={
                      "resize-none grid grid-cols-10 min-w-[1500px] bg-white hover:bg-slate-200 my-[3px] rounded border-solid border-2"
                    }
                  >
                    <HardwareList
                      data={hardwareInfo}
                      isButton={true}
                      user={user}
                      userID={userID}
                      isAdminActivated={showAdminControls}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : inputValue.length > 0 ? (
          <div className="pl-4 text-red-500">
            No hardware available for the given search parameter.
          </div>
        ) : (
          <Guide isScanReady={isScanReady} handleScan={handleScan} />
        )}
      </div>
    </div>
  );
}

const filterData = (data: Data[], searchWord: string) => {
  const searchedData = data.filter((hardware) =>
    hardware.tags?.toLowerCase().includes(searchWord.toLowerCase())
  );

  return searchedData;
};
