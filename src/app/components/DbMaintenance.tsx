import Image from 'next/image'

export default function DbMaintenance(){

  return(
    <>
      <div className='flex items-center justify-center min-h-[600px]'>
        <Image
        src="/assets/Maintenance.png"
        width={400}
        height={400}
        alt="PQ Hive"
      />
      </div>
    </>
  )
}