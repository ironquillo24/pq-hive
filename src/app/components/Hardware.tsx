'use client'
import { useState } from 'react'
import HardwareList from './HardwareList'
import AdminControls from './buttons/AdminControls'
import Data from '@/dbSchema'


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

  let searchedData: Data[]
  //filter the data, if search box is 'all', do not filter
  if (inputValue.toLowerCase()==='all'){
    searchedData = filterData(hardwareData, '')
  } else{
    searchedData = filterData(hardwareData, inputValue)
  }
  
  let isDataAvailable: boolean;
  
  //don't show data if searchbox is empty. Show all data if showAdminControl button is press or 'all' is typed in search box
  if ((searchedData.length === 0)||(inputValue===""))
    if (showAdminControls||(inputValue.toLowerCase()==='all')) isDataAvailable = true;
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
    <div className='inline-block resize pl-2 border border border-gray-200 rounded-lg'> 
      <div className="flex relative mb-4 mt-4">
        <div className={`font-bold pr-2 ${textColor}`}>Search: </div>
        <input type="text" id='searchField' value={inputValue} onChange={handleInputChange} className={`border-solid border-2 border-sky-500 mb-4 ${bgColor}s`} /> 
        { isAdmin? (
          <div className='flex gap-4 absolute right-[10px]'>
            <AdminControls handleOnAdminClick={handleOnAdminClick} showAdminControls={showAdminControls}/>
          </div>
         ) : <div></div>
        }
      </div>
      
      {isDataAvailable? (
        <div className="grid grid-cols-10 font-bold min-w-[1500px]">
           <HardwareList data={tableHeader} isButton={false} user={user} isAdminActivated={showAdminControls}/> 
        </div>
      ) :  
      <p></p>}

    { isDataAvailable? (
      
      <div>
        <ul> 
          {searchedData.map((hardwareInfo) => {
            //console.log(hardwareInfo) 
            return (
              <li key={hardwareInfo.id} className={"grid grid-cols-10 gap-0 min-w-[1500px]"}>
                <HardwareList data={hardwareInfo} isButton={true} user={user} isAdminActivated={showAdminControls}/>
            </li>
          )})
          
          
          }
   
        </ul>
      </div>)
     
     : <div>Please enter a valid search word (i.e. HardwareID, P-specs, or keywords such as generic, package, etc.) Type &ldquo;all&rdquo; to display all hardware</div>}
        
    </div>
    
  )
}

const filterData = (data: Data[], searchWord: string) => {

  let searchedData = [];

  searchWord = searchWord.toLowerCase();
  let index = 0;
  for (const row of data){
    
    const desc = row.tags?.toLowerCase()

    if (desc?.includes(searchWord)){
      
      searchedData.push(data[index])
    }
    index++;
  }
  return searchedData;
}

