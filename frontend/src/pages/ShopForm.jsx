import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../api'
import { useNavigate, useParams } from 'react-router-dom'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string()
}).required()

export default function ShopForm(){
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if(id){
      api.get('/shops/all').then(res => {
        const shop = res.data.find(s => s._id === id)
        if(shop){
          setValue('name', shop.name)
          setValue('description', shop.description)
        }
      })
    }
  }, [id])

  const onSubmit = async (data) => {
    try{
      if(id) await api.put(`/shops/${id}`, data)
      else await api.post('/shops', data)
      navigate('/')
    }catch(err){
      alert(err.response?.data?.msg || 'Operation failed')
    }
  }

  return (
    <div className="container">
      <div className="card max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit Shop' : 'Create Shop'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input className="input" placeholder="Shop name" {...register('name')} />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div>
            <textarea className="input" placeholder="Description" {...register('description')}></textarea>
            <p className="error">{errors.description?.message}</p>
          </div>
          <button className="btn" disabled={isSubmitting} type="submit">{isSubmitting ? 'Working...' : id ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  )
}
