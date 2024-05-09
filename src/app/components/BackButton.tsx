'use client'
import { useRouter } from 'next/navigation';

const BackButton = () => {

  const router = useRouter()

  const onCancel = () => {
    router.back()
  }

  return(
    <button type='button' className="bg-red-500 text-white p-2 ml-[150px] rounded"
    onClick={onCancel}>
      Cancel
    </button>
  )
}

export default BackButton;