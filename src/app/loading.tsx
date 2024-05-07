"use client"
import GridLoader from "react-spinners/GridLoader";

export default function Loading() {


  return (
    <div className="flex items-center min-h-[500px] justify-center">
      <div>
        <GridLoader
          color="#36d0d6"
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>  
    </div>
  );
}

