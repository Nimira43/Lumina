import { addImage } from '@/server/actions/members'
import { toast } from '@heroui/react'
import { CldUploadButton } from 'next-cloudinary'
import { HiPhoto } from 'react-icons/hi2'

export default function PhotoUpload() {
  return (
    <CldUploadButton
      options={{
        maxFiles: 1,
        folder: 'lumina'
      }}
      onSuccess={async (result) => {
        if (result.info && typeof result.info === 'object') {
          await addImage(result.info.secure_url, result.info.public_id)
        }
      }}
      onError={e => { 
        if (e && typeof e === 'object') toast.danger(e.statusText)
        else toast.danger('Problem adding image')
      }}
      signatureEndpoint='/api/sign-image'
      className='flex items-center bg-accent text-white gap-2 rounded py-2 px-4 hover:bg-accent/70 cursor-pointer'
    >
      <HiPhoto size={28} />
      Upload New Image
    </CldUploadButton>
  )
}