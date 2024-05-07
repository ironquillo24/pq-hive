import BorrowButton from "./BorrowButton"
import BorrowFromOwner from "./BorrowFromOwner"
import AddtoCartButton from "./AddtoCartButton"
import ReturnButton from './ReturnButton'
import EditButton from "./EditButton"
import TransferButton from "./TransferButton"
interface ButtonSelectorComponents{
  data: string[],
  user: string
  isAdminActivated: boolean
}

export default function ButtonSelector({data, user, isAdminActivated}: ButtonSelectorComponents){

  const status: string = data[8].toLowerCase()
  const owner: string = data[10].toLowerCase()

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