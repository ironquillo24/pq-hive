"use client"
import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";
import {editItem} from '../../../actions'
import SubmitButton from "../buttons/SubmitButton";
import '../components.css';

import { useGetAllUserFullnames, useGetDataById } from "@/get-client-data";

interface ModalEditHardwareProps{
  user: string
}
export default function ModalEditHardware({user}:ModalEditHardwareProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const modalEditHardware = searchParams.get("editHardware");

    const isEnabled = modalEditHardware === 'true'
    
    const hardwareid = searchParams.get("hardwareid") as string

    const {data: allUsers} = useGetAllUserFullnames(isEnabled)

    const {data: hardware} = useGetDataById(hardwareid,'edit',isEnabled)
    
      
    let fullNameArr: string[] =[]
    allUsers?.map((user) => fullNameArr.push(user.fullname))
  
    return (
        <>
            {modalEditHardware &&
                (
                
                <form action={editItem} //borrowItem 
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' id="dataID" name="dataID" value={hardware?.id} />
                    <div className="bg-white">
                      <div className="flex justify-center text-[20px] font-bold py-[10px]">Editting Form</div>
                      <div className="grid grid-cols-[450px_450px] bg-white pl-[50px] pb-[10px]">
                        <div className="grid grid-cols-[150px_300px] grid-rows-10">
                          <div className="editForm-labels">Hardware ID:</div>
                          <div>
                            <input id="hardwareID" name="hardwareID" defaultValue={hardware?.hardwareid} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">P-Specs:</div>
                          <div>
                            <input id="pSpecs" name="pSpecs" defaultValue={hardware?.pspec} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Type:</div>
                          <div>
                            <input id="type" name="type" defaultValue={hardware?.type} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Generic:</div>
                          <div>
                            <input id="generic" name="generic" defaultValue={hardware?.generic} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">package:</div>
                          <div>
                            <input id="devicePackage" name="devicePackage" defaultValue={hardware?.package} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Lead Count:</div>
                          <div>
                            <input id="leadCount" name="leadCount" defaultValue={hardware?.leadcount} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Status:</div>
                          <div>
                            <select id="status" name="status" defaultValue={hardware?.status} className="editForm-inputBox">
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
                            <input id="comments" name="comments" defaultValue={hardware?.comments} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Owner:</div>
                          <div>
                            <select id="owner" name="owner" defaultValue={hardware?.owner} className="editForm-inputBox">
                            {
                              fullNameArr?.map((name,ind) => <option value={name} key={ind}>{name}</option>)
                             }
                            </select>
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
                            <input id="qtyRequest" name="qtyRequest" defaultValue={hardware?.qtyRequest} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Supplier:</div>
                          <div>
                            <input id="supplier" name="supplier" defaultValue={hardware?.supplier} className="editForm-inputBox" />
                          </div>
                          <div className="editForm-labels">Supplier Part Number:</div>
                          <div>
                            <input id="supplierPartNumber" name="supplierPartNumber" defaultValue={hardware?.supplierPartNumber} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Requestor:</div>
                          <div>
                            <input id="requestor" name="requestor" defaultValue={hardware?.requestor} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Type Acronym:</div>
                          <div>
                            <input id="typeAcronym" name="typeAcronym" defaultValue={hardware?.typeAcronym} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Barcode:</div>
                          <div>
                            <input id="barcode" name="barcode" defaultValue={hardware?.barcode} className="editForm-inputBox"/>
                          </div>
                          <div className="editForm-labels">Serial Number:</div>
                          <div>
                            <input id="serialNumber" name="serialNumber" defaultValue={hardware?.serialNumber} className="editForm-inputBox" />
                          </div>
                          <div className="editForm-labels">With Tag:</div>
                          <div>
                            <input id="withTag" name="withTag" defaultValue={hardware?.withTag} className="editForm-inputBox" />
                          </div>
                          <div className="editForm-labels">Focus Team:</div>
                          <div>
                            <input id="focusTeam" name="focusTeam" defaultValue={hardware?.focusteam} className="editForm-inputBox" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-[150px_600px] pl-[50px]">
                        <div className="editForm-labels">Description:</div>
                        <div>
                          <textarea id="description" name="description" defaultValue={hardware?.description} maxLength={200}
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