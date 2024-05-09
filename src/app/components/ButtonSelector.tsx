import BorrowButton from "./BorrowButton"
import BorrowFromOwner from "./BorrowFromOwner"
import AddtoCartButton from "./AddtoCartButton"
import ReturnButton from './ReturnButton'
import EditButton from "./EditButton"
import TransferButton from "./TransferButton"
import Data from "@/dbSchema"

interface ButtonSelectorComponents{
  data: Data,
  user: string
  isAdminActivated: boolean
}

export default function ButtonSelector({data, user, isAdminActivated}: ButtonSelectorComponents){

  const status = data.status.toLowerCase()
  const owner = data.owner.toLowerCase()

  if (isAdminActivated){
    return <EditButton data={data} user={user} />
  } else{
    if (status.includes("storage")){
      return <>
        <BorrowButton data={data} user={user} />
        <AddtoCartButton />
      </>
    } else if (status.includes("in use")) {
        if (owner === user.toLowerCase()) {
          return <>
            <ReturnButton data={data} user={user}/>
            <TransferButton data={data} user={user}/>
          </>
        } else {
          return <BorrowFromOwner />
        }
    } else {
      return <></>
    }
  }
}