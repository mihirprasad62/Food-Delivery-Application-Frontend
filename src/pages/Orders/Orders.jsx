import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'

const Orders = () => {
  const [data,setData]=useState([])

  const fetchOrders=async ()=>{
   const response=await axios.get("http://localhost:8080/api/orders/all")
   setData(response.data)
  }

  const updateStatus=async (e,orderId)=>{
   const response=await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${e.target.value}`)
   if(response.status==200){
    await fetchOrders()
   }
  }

  useEffect(()=>{
    fetchOrders()
  },[])
  return (
    <>
    <table>
                <thead>
                  
                </thead>
                <tbody>
                    {
                        data.map((order, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={assets.bag_icon} height={48} width={48} alt="" />
                                </td>
                                <td>
                                    <div>
                                      {
                                        order.orderedItems.map((item,index)=>{
                                            if(index===order.orderedItems.length-1){
                                                return item.name+" x "+item.quantity; 
                                            }else{
                                                 return item.name+" x "+item.quantity + " "; 
                                            }
                                        })
                                    }
                                    </div>
                                    <div>
                                      {
                                        order.userAddress
                                      }
                                    </div>
                                </td>
                                <td>
                                    {
                                        order.amount
                                    }
                                </td>
                                <td>Items : {order.orderedItems.length}</td>

                                

                                <td>
                                    <form action="">
                                      <select onChange={(event)=>updateStatus(event,order.id)} value={order.orderStatus}>
                                        <option value="food preparing">Food Preparing</option>
                                        <option value="out for delivery">out for delivery</option>
                                        <option value="delivered">delivered</option>
                                      </select>
                                    </form>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </>
  )
}

export default Orders