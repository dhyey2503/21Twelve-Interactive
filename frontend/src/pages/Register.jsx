import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 chars').required('Password required')
}).required()

export default function Register(){
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try{
      const res = await api.post('/auth/register', data)
      setToken(res.data.token)
      navigate('/')
    }catch(err){
      alert(err.response?.data?.msg || 'Registration failed')
    }
  }

  return (
    <div className="container">
      <div className="card max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input className="input" placeholder="Full name" {...register('name')} />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div>
            <input className="input" placeholder="Email" {...register('email')} />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div>
            <input className="input" type="password" placeholder="Password" {...register('password')} />
            <p className="error">{errors.password?.message}</p>
          </div>
          <button className="btn" disabled={isSubmitting} type="submit">{isSubmitting ? 'Working...' : 'Register'}</button>
        </form>
      </div>
    </div>
  )
}
