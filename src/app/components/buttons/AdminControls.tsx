import AddHardwareButton from "./AddHardwareButton";
interface AdminControlsComponents{
  handleOnAdminClick: () => void;
  showAdminControls: boolean
}

export default function AdminControls({handleOnAdminClick, showAdminControls}: AdminControlsComponents){

  const adminButtonColor = (showAdminControls? 'bg-slate-500 hover:bg-slate-700' : 'bg-green-500 hover:bg-green-700' )
  const adminButtonText = (showAdminControls? 'Hide Custodian Controls' : 'Show Custodian Controls')
  
  return (<>
          { showAdminControls &&(
            <>
            <div>
              <AddHardwareButton/>
             </div>
            </>
            )
          }

          <div>
            <button type="button" className={`flex items-center justify-center ${adminButtonColor} w-[100px] text-white font-medium py-[4px] px-[2px] rounded text-xs`}onClick={handleOnAdminClick}>{adminButtonText}</button>
          </div>
          
  </>

  )
}