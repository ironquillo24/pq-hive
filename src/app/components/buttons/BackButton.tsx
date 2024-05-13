'use client'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

const BackButton = () => {

  const router = useRouter()
  const path = usePathname();

  const onCancel = () => {

    router.replace(path, {scroll: false})
  }

  return(
    <button type='button' className="bg-red-500 text-white p-2 ml-[150px] rounded"
    onClick={onCancel}>
      Cancel
    </button>
  )
}

export default BackButton;