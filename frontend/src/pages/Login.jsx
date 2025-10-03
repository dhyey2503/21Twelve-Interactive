import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password required')
}).required()

export default function Login(){
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    try{
      const res = await api.post('/auth/login', data)
      setToken(res.data.token)
      navigate('/')
    }catch(err){
      alert(err.response?.data?.msg || 'Login failed')
    }
  }

  return (
    <div className="container">
      <div className="card max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input className="input" placeholder="Email" {...register('email')} />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div>
            <input className="input" type="password" placeholder="Password" {...register('password')} />
            <p className="error">{errors.password?.message}</p>
          </div>
          <button className="btn" disabled={isSubmitting} type="submit">{isSubmitting ? 'Working...' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}
