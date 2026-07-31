'use client'

import { Button, Card, CardHeader, FieldError, Input, TextField } from '@heroui/react'
import { RegisterSchema, registerSchema } from '@/lib/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LiaDoveSolid } from 'react-icons/lia'

export default function RegisterForm() {
  const { register, handleSubmit, formState: {errors} } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })
 
  const onSubmit = (data: RegisterSchema) => {
    console.log({data})
  }
 
  return (
    <Card className='w-md shadow'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='flex flex-row items-center gap-1 text-main'>
            <LiaDoveSolid size={30} />
            <h1 className='text-3xl font-bold logo'>
              Register
            </h1>
          </div>
          <p className='text-foreground/60'>
            Welcome to Lumina
          </p>
        </div>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}  
        className='flex flex-col gap-4 px-6 py-4'
      >
        <TextField
          defaultValue=''
          aria-label='namel'
          isInvalid={!!errors.name}
        >
          <Input
            placeholder='Enter your name'  
            {...register('name')}
          />
          <FieldError>
            {errors.name?.message}
          </FieldError>
        </TextField>
        <TextField
          defaultValue=''
          aria-label='email'
          isInvalid={!!errors.email}
        >
          <Input
            placeholder='Enter your email'  
            {...register('email')}
          />
          <FieldError>
            {errors.email?.message}
          </FieldError>
        </TextField>
        <TextField
          defaultValue=''
          aria-label='password'
          isInvalid={!!errors.password}
        >
          <Input
            type='password'
            placeholder='Enter your password'
            {...register('password')}
          />
          <FieldError>
            {errors.password?.message}
          </FieldError>
        </TextField>
        <TextField
          defaultValue=''
          aria-label='confirmPassword'
          isInvalid={!!errors.confirmPassword}
        >
          <Input
            type='password'
            placeholder='Confirm your password'
            {...register('confirmPassword')}
          />
          <FieldError>
            {errors.confirmPassword?.message}
          </FieldError>
        </TextField>
        <Button
          type='submit'
          className='w-full'
        >
          Register          
        </Button>
      </form>
    </Card>    
  )
}