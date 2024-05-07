"use client"
import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";
import {editItem} from '../../actions'
import SubmitButton from "./SubmitButton";
import './components.css'

interface ModalEditHardwareComponents{
  data: string[]
  user: string
}
export default function ModalEditHardware({data, user}:ModalEditHardwareComponents) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const modalEditHardware = searchParams.get("editHardware");
    
    const dataID= Number(searchParams.get("dataID"))
    
    const hardwareID: string = data[dataID][1]
    const pSpecs: string = data[dataID][2]
    const type: string = data[dataID][3]
    const generic: string = data[dataID][4]
    const devicePackage: string = data[dataID][5]
    const leadCount: string = data[dataID][6]
    const description: string = data[dataID][7]
    const status: string = data[dataID][8]
    const comments: string = data[dataID][9]
    const owner:string = data[dataID][10]
    const lastDateModified:string = data[dataID][11]
    const inUseDuration: string = data[dataID][12]
    const qtyRequest: string = data[dataID][13]
    const supplier:string = data[dataID][14]
    const supplierPartNumber: string = data[dataID][15]
    const requestor: string = data[dataID][16]
    const typeAcronym: string = data[dataID][17]
    const barcode: string = data[dataID][18]
    const serialNumber: string = data[dataID][19]
    const withTag: string = data[dataID][20]
    const focusTeam: string = data[dataID][21]
  
    return (
        <>
            {modalEditHardware &&
                (
                
                <form action={editItem} //borrowItem 
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' id="dataID" name="dataID" value={dataID} />
                    <div className="bg-white">
                      <div className="flex justify-center text-[20px] font-bold py-[10px]">Editting Form</div>
                      <div className="grid grid-cols-[450px_450px] bg-white pl-[50px] pb-[10px]">
                        <div className="grid grid-cols-[150px_300px] grid-rows-10">
                          <div className="editForm-labels">Hardware ID:</div>
                          <div>
                            <input id="hardwareID" name="hardwareID" defaultValue={hardwareID} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">P-Specs:</div>
                          <div>
                            <input id="pSpecs" name="pSpecs" defaultValue={pSpecs} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Type:</div>
                          <div>
                            <input id="type" name="type" defaultValue={type} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Generic:</div>
                          <div>
                            <input id="generic" name="generic" defaultValue={generic} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">package:</div>
                          <div>
                            <input id="devicePackage" name="devicePackage" defaultValue={devicePackage} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Lead Count:</div>
                          <div>
                            <input id="leadCount" name="leadCount" defaultValue={leadCount} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Status:</div>
                          <div>
                            <select id="status" name="status" defaultValue={status} className="editForm-inputBox">
                              <option value="IN STORAGE">IN STORAGE</option>
                              <option value="IN USE">IN USE</option>
                              <option value="RETURNED">RETURNED</option>
                              <option value="FLOATING">FLOATING</option>
                              <option value="DEBUG">DEBUG</option>
                              <option value="CONSUMED">CONSUMED</option>
                              <option value="FOR REPAIR">FOR REPAIR</option>
                              <option value="FOR TAGGING">FOR TAGGING</option>
                              <option value="TERMINAL">TERMINAL</option>
                              <option value="TEST QUAL">TEST QUAL</option>
                              <option value="TGCAL">TGCAL</option>

                            </select>
                          </div>
                          <div className="editForm-labels">Comments:</div>
                          <div>
                            <input id="comments" name="comments" defaultValue={comments} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Owner:</div>
                          <div>
                            <input id="owner" name="owner" defaultValue={owner} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Last Date Modified:</div>
                          <div>
                            <input id="lastDateModified" name="lastDateModified" value={` will automatically update to current date`} className="editForm-inputBox text-xs"/>
                          </div>
                        </div>
                        <div className="grid grid-cols-[150px_300px] grid-rows-10">
                          
                          <div className="editForm-labels">In Use Duration:</div>
                          <div>
                            <input id="inUseDuration" name="inUseDuration" value={"will auto-populate"} className="editForm-inputBox text-slate-500"/>
                          </div>
                          <div className="editForm-labels">QTY Requested:</div>
                          <div>
                            <input id="qtyRequest" name="qtyRequest" defaultValue={qtyRequest} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Supplier:</div>
                          <div>
                            <input id="supplier" name="supplier" defaultValue={supplier} className="editForm-inputBox" />
                          </div>
                          <div className="editForm-labels">Supplier Part Number:</div>
                          <div>
                            <input id="supplierPartNumber" name="supplierPartNumber" defaultValue={supplierPartNumber} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Requestor:</div>
                          <div>
                            <input id="requestor" name="requestor" defaultValue={requestor} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Type Acronym:</div>
                          <div>
                            <input id="typeAcronym" name="typeAcronym" defaultValue={typeAcronym} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Barcode:</div>
                          <div>
                            <input id="barcode" name="barcode" defaultValue={barcode} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Serial Number:</div>
                          <div>
                            <input id="serialNumber" name="serialNumber" defaultValue={serialNumber} className="editForm-inputBox" />
                          </div>
                          <div className="editForm-labels">With Tag:</div>
                          <div>
                            <input id="withTag" name="withTag" defaultValue={withTag} className="editForm-inputBox" />
                          </div>
                          <div className="editForm-labels">Focus Team:</div>
                          <div>
                            <input id="focusTeam" name="focusTeam" defaultValue={focusTeam} className="editForm-inputBox" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-[150px_600px] pl-[50px]">
                        <div className="editForm-labels">Description:</div>
                        <div>
                          <textarea id="description" name="description" defaultValue={description} maxLength={200}
                            className="border-solid border-slate-200 border-2 w-[600px] max-h-[100px] resize-none"/>
                        </div>
                      </div>
                      
                      <div className="flex w-[900px] justify-center gap-[100px] pb-[20px]">
                        <div><SubmitButton buttonText="Edit"/></div>
                        <div><Link href={pathname}>
                            <button type="button" className="bg-red-500 text-white p-2 rounded">Cancel</button>
                          </Link></div> 
                      </div>
                    </div>
                </form>
                )  
            }
        </>
    );
}