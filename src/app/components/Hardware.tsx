'use client'
import { useState, useMemo } from 'react'
import HardwareList from './HardwareList'
import AdminControls from './buttons/AdminControls'
import {Data} from '@/dbSchema'


interface HardwareProps {
  hardwareData: Data[]
  user: string
  isAdmin: boolean
}

export default function Hardware({hardwareData, user, isAdmin}: HardwareProps){

  const [inputValue, setInputValue] = useState('');
  const [showAdminControls, setShowAdminControls] = useState(false)

  const isDark = false
  const textColor =  isDark? 'text-white' : 'text-slate-700'
  const bgColor = isDark? 'text-white bg-slate-700' : ''

//  let searchedData: Data[]
  //filter the data, if search box is 'all', do not filter
   const searchedData = useMemo(() =>{
    let data: Data[]
    if (inputValue.toLowerCase()==='all'){
      data = filterData(hardwareData, '')
    } else{
      data = filterData(hardwareData, inputValue)
    }
    return data;
  },[inputValue,hardwareData])  

/*   if (inputValue.toLowerCase()==='all'){
    searchedData = filterData(hardwareData, '')
  } else{
    searchedData = filterData(hardwareData, inputValue)
  }
   */
  let isDataAvailable: boolean;
  
  //don't show data if searchbox is empty. Show all data if showAdminControl button is press or 'all' is typed in search box
  if ((searchedData.length === 0)||(inputValue===""))
    if (showAdminControls||(inputValue.toLowerCase()==='all')) 
      isDataAvailable = true;
    else isDataAvailable = false;
  else
    isDataAvailable = true;


  const handleInputChange = (e:any) =>{
    return setInputValue(e.target.value)
  }

  const handleOnAdminClick = () => {
    showAdminControls? setShowAdminControls(false) : setShowAdminControls(true)
  }
  

  const tableHeader = {
    id : 1,
    hardwareid : 'Hardware ID',
    pspec : 'P-Specs',
    type : 'Type',
    generic: '',
    package: '',
    leadcount: 1,
    description: 'Description',
    status: 'Status',
    comments: 'Comments',
    owner: 'Owner',
    dateModified: 'Last Date Modified',
    qtyRequest: 1,
    supplier: '',
    supplierPartNumber: '',
    requestor: '',
    typeacronym: '',
    barcode: '',
    serialnumber: '',
    withtag: '',
    focusteam: '',
    tags: '',
    inUseDuration: 'In Use Duration(days)' 
  }

  return (
    <div className='inline-block resize border-gray-200 max-w-[1500px] bg-slate-200' > 
      <div className="fixed w-full bg-white pt-2 pl-2">
        <div className="flex relative mt-2">
          <div className={`font-bold pr-2 ${textColor}`}>Search: </div>
          <input type="text" id='searchField' value={inputValue} onChange={handleInputChange} className={`border-solid border-2 border-slate-400 mb-4 ${bgColor}s`} /> 
          { isAdmin? (
            <div className='flex gap-4 absolute right-[20px]'>
              <AdminControls handleOnAdminClick={handleOnAdminClick} showAdminControls={showAdminControls}/>
            </div>
          ) : <div></div>
          }
        </div>
      </div>

      <div className='pt-[60px]'>
        {isDataAvailable? (
          <div className="grid grid-cols-10 font-bold min-w-[1500px] pl-2">
            <HardwareList data={tableHeader} isButton={false} user={user} isAdminActivated={showAdminControls}/> 
          </div>
        ) :  
        <p></p>}

      { isDataAvailable? (
        
        <div className='bg-slate-100 pl-2'>
          <ul> 
            {searchedData.map((hardwareInfo) => {
              //console.log(hardwareInfo) 
              return (
                <li key={hardwareInfo.id} className={"grid grid-cols-10 gap-0 min-w-[1500px] bg-white hover:bg-slate-200 my-[3px] rounded border-solid border-2"}>
                  <HardwareList data={hardwareInfo} isButton={true} user={user} isAdminActivated={showAdminControls}/>
              </li>
            )})
            
            
            }
    
          </ul>
        </div>)
      
      : <div className='bg-white'>
        Please enter a valid search word (i.e. HardwareID, P-specs, or keywords such as generic, package, etc.) Type &ldquo;all&rdquo; to display all hardware
        </div>} 
        
      </div>
 
    </div>
    
  )
}

const filterData = (data: Data[], searchWord: string) => {

  const searchedData = data.filter((hardware) => hardware.description.toLowerCase().includes(searchWord.toLowerCase()))

  return searchedData;
}

