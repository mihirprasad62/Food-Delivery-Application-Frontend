import React, { useEffect, useState } from 'react'
import "./listFood.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { deleteFood, getFoodList } from '../../services/foodService'

const ListFood = () => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const data = await getFoodList()
      setList(data)
    } catch (error) {
      toast.error("error while reading the foods.")
    }
  }

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId)
      if (success) {
        toast.success('food removed')
        await fetchList()
      } else {
        toast.error('error occured removing the food.')
      }
    } catch (error) {
      toast.error('error occured removing the food.')
    }

  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <div className='table'>
        <table border={2}>
          <thead>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>price</th>
            <th>Action</th>
          </thead>
          <tbody>
            {
              list.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.imageUrl} alt="" height={48} width={48} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => removeFood(item.id)}>delete </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListFood