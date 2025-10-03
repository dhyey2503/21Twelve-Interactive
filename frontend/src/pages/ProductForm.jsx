import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../api'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  price: yup.number().typeError('Price must be a number').positive('Price must be > 0').required('Price is required'),
  shopId: yup.string().required('Select shop')
}).required()

export default function ProductForm(){
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  })
  const [shops, setShops] = useState([])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { id } = useParams()

  useEffect(() => {
    api.get('/shops/all').then(res => setShops(res.data))
    const sp = searchParams.get('shopId')
    if(sp) setValue('shopId', sp)

    if(id){
      api.get('/shops/all').then(res => {
        for(const s of res.data){
          const p = s.products?.find(x => x._id === id)
          if(p){
            setValue('name', p.name)
            setValue('description', p.description || '')
            setValue('price', p.price)
            setValue('shopId', s._id)
            break
          }
        }
      })
    }
  }, [])

  const onSubmit = async (data) => {
    try{
      if(id) await api.put(`/products/${id}`, { name: data.name, description: data.description, price: data.price })
      else await api.post('/products', { name: data.name, description: data.description, price: data.price, shopId: data.shopId })
      navigate('/')
    }catch(err){
      alert(err.response?.data?.msg || 'Operation failed')
    }
  }

  return (
    <div className="container">
      <div className="card max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit Product' : 'Create Product'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input className="input" placeholder="Product name" {...register('name')} />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div>
            <textarea className="input" placeholder="Description" {...register('description')}></textarea>
            <p className="error">{errors.description?.message}</p>
          </div>
          <div>
            <input className="input" placeholder="Price" {...register('price')} />
            <p className="error">{errors.price?.message}</p>
          </div>
          <div>
            <select className="input" {...register('shopId')}>
              <option value="">Select Shop</option>
              {shops.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
            <p className="error">{errors.shopId?.message}</p>
          </div>
          <button className="btn" disabled={isSubmitting} type="submit">{isSubmitting ? 'Working...' : id ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  )
}
