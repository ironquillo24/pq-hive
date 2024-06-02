import BorrowButton from "./buttons/BorrowButton"
import BorrowFromOwner from "./buttons/BorrowFromOwner"
import AddtoCartButton from "./buttons/AddtoCartButton"
import ReturnButton from './buttons/ReturnButton'
import EditButton from "./buttons/EditButton"
import TransferButton from "./buttons/TransferButton"
import { Data } from "@/dbSchema"

interface ButtonSelectorComponents{
  data: Data,
  user: string,
  userID?: number,
  isAdminActivated: boolean
}

export default function ButtonSelector({data, user, userID, isAdminActivated}: ButtonSelectorComponents){

  const status = data.status.toLowerCase()
  const owner = data.owner.toLowerCase()

  if (isAdminActivated){
    return <EditButton data={data} />
  } else{
    if (status.includes("storage")){
      return <>
        <BorrowButton data={data} />
        <AddtoCartButton data={data} userID={userID!}/>
      </>
    } else if (status.includes("in use")) {
        if (owner === user.toLowerCase()) {
          return <>
            <ReturnButton data={data} />
            <TransferButton data={data} />
          </>
        } else {
          return <BorrowFromOwner />
        }
    } else {
      return <></>
    }
  }
}