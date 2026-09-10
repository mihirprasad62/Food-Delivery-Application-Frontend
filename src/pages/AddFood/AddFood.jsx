import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import "./addFoodStyle.css";
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const AddFood = () => {
    const[image,setImage]=useState(null)
     const[data,setData]=useState({
        name:'',
        description:'',
        price:'',
        category:'biriyani'
     })

     const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData(data=>({...data,[name]:value}))

     }

     useEffect(()=>{
        console.log(data)
     },[data])

     const handleSubmitHandler=async (e)=>{
        e.preventDefault();
        if(!image){
            toast.error("please upload image")
        }
        const formData=new FormData()
        formData.append("food",JSON.stringify(data))
        formData.append("file",image)

        try {
            await addFood(data,image)
          
                toast.success("food added successfully")
                setData({name:'',description:'', price:'', category:'biriyani'})
                setImage(null)
            
        } catch (error) {
            console.log("Error in uploading food:::::::",error)
            toast.error("error in adding food")
        }
     }
  return (
    <>
    <div className='form'>
     <form action="" onSubmit={handleSubmitHandler}>
        <h1>ADD FOOD</h1>
        {/* image  */}
        <div>
            <label htmlFor="img">
                <img src={image? URL.createObjectURL(image):assets.upload_area} width={98} alt="" />
            </label>
            <input type="file" id='image' onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        {/* name  */}
        <div>
            <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' onChange={onChangeHandler} value={data.name} />
        </div>
        {/* description  */}
        <div>
            <label htmlFor="description">Description</label>
            <textarea  name='description' id='description' rows={4} onChange={onChangeHandler} value={data.description} />
        </div>
        {/* category  */}
        <div>
            <label htmlFor="category">Category</label>
       
       <select name="category" id="category" onChange={onChangeHandler} value={data.category}>
        <option value="Biriyani">Biriyani</option>
         <option value="Pizza">Pizza</option>
          <option value="Salad">Salad</option>

       </select>
        </div>
        {/* price  */}
        <div>
            <label htmlFor="price">price</label>
        <input type="number" name='price' id='price' onChange={onChangeHandler} value={data.price} />
        </div>
        {/* submit   */}
         <div>
           
        <input type="submit" value={"save"} />
        </div>
    </form>
    </div>
   
    </>
  )
}

export default AddFood