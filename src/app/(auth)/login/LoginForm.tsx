'use client'

import { Button, Card, CardHeader, FieldError, Input, TextField } from '@heroui/react'
import { LoginSchema, loginSchema } from '@/lib/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LiaDoveSolid } from 'react-icons/lia'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
 
  const onSubmit = async (data: LoginSchema) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.password
    }, {
      onSuccess: () => {
        router.push('/members')
      },
      onError: (ctx) => {
        console.log(ctx.error.message)
      }
    })
  }
 
  return (
    <Card className='w-md shadow'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div className='flex flex-row items-center gap-1 text-main'>
            <LiaDoveSolid size={30} />
            <h1 className='text-3xl font-bold logo'>
              Login
            </h1>
          </div>
          <p className='text-foreground/60'>
            Welcome back to Lumina
          </p>
        </div>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}  
        className='flex flex-col gap-4 px-6 py-4'
      >
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
        <Button
          isPending={isSubmitting}
          type='submit'
          className='w-full'
        >
          Login          
        </Button>
      </form>
    </Card>    
  )
}