'use client'

import { updateProfile } from '@/server/actions/members'
import { Member } from '../../../../generated/prisma/client'
import { profileEditSchema, ProfileEditSchema } from '@/lib/profileEditSchema'
import { Button, FieldError, Input, Label, TextArea, TextField, toast } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Path, useForm } from 'react-hook-form'

type Props = {
  member: Member
}

export default function ProfileForm({ member }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty
    }
  } = useForm<ProfileEditSchema>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: member.name,
      description: member.description,
      city: member.city,
      country: member.country
    }
  })

  const onSubmit = async (data: ProfileEditSchema) => {
    const result = await updateProfile(data)
    
    if (result.status === 'success') {      
      toast.success('Profile has been updated')
      reset(data)
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach(e => {
          setError(e.path as Path<unknown>, {message: e.message})
        })
      } else {
        toast.danger(result.error)
      } 
    }
  }
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-3 w-full'
    >
      <TextField
        defaultValue={member.name}
        aria-label='name'
        isInvalid={!!errors.name}
      >
        <Label>
          Display Name
        </Label>
        <Input
          placeholder='Enter your name'  
          {...register('name')}
        />
        <FieldError>
          {errors.name?.message}
        </FieldError>
      </TextField>
      <TextField
        defaultValue={member.description}
        aria-label='description'
        isInvalid={!!errors.description}
      >
        <Label>
          Description
        </Label>
        <TextArea
          rows={4}
          placeholder='Enter your description'  
          {...register('description')}
        />
        <FieldError>
          {errors.description?.message}
        </FieldError>
      </TextField>
      <div className='flex items-center justify-between gap-3 w-full'>
        <TextField
          className='w-full'
          defaultValue={member.city}
          aria-label='city'
          isInvalid={!!errors.city}
          >
          <Label>
            City
          </Label>
          <Input
            placeholder='Enter your city'  
            {...register('city')}
            />
          <FieldError>
            {errors.city?.message}
          </FieldError>
        </TextField>
        <TextField
          className='w-full'
          defaultValue={member.country}
          aria-label='country'
          isInvalid={!!errors.country}
          >
          <Label>
            Country
          </Label>
          <Input
            placeholder='Enter your country'  
            {...register('country')}
            />
          <FieldError>
            {errors.country?.message}
          </FieldError>
        </TextField>
      </div>
      <Button
        type='submit'
        className='flex self-end mt-3'
        isPending={isSubmitting}
        isDisabled={!isDirty}
      >
        Update Profile
      </Button>
    </form>
  )
}