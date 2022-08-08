import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import {RiDeleteBin2Fill} from  'react-icons/ri';
import {AiFillStar } from 'react-icons/ai';
import {AiFillEye} from 'react-icons/ai';

const Messages = () => {
    const [loading,setLoading] = useState(true);
    const[review,setReview] = useState([]);

    useEffect(()=>{
        fetch("https://mighty-garden-92013.herokuapp.com/message")
        .then(res=>res.json())
        .then(data=>
       {
        setReview(data);
        setLoading(false);
        console.log(data)
       });
        
    },[review]);


    if(loading){
        return <Loading/>
    }
    

    const handleDelete = async id =>{
      await fetch(`https://mighty-garden-92013.herokuapp.com/message/${id}`,{
        method:'DELETE',
      })
      .then(res=>res.json())
      .then(data=>{
        // console.log(data);
        if(data.deletedCount > 0){
          toast.success("message deleted Successfully");
        }
        else{
          toast.error("Failed to Delete this message");
        }
      })
    }
    return (
        <div>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                <tr>
                    <th>Image</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>email</th>
                    <th>watch</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {
                       review.map(review=>
                            <tr key={review._id}>
                    <td>
                    <div className="flex items-center space-x-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={review.img} alt={review.name} />
                    </div>
                    </div>
                    </div>
                    </td>
                    <td>
                    {review.firstName}
                    </td>
                    <td>
                    {review.lastName}
                    </td>
                    <td>
                    {review.email}
                    </td>
                    
                    <th>
                    <label htmlFor="my-modal-3" className=" modal-button text-blue-500 text-2xl "><AiFillEye className=''/></label>
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal">
                    <div className="modal-box relative w-96">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <p>{review.message}</p>
                    </div>
                    </div>
                    </th>
                    <th>
                    <button onClick={()=>handleDelete(review._id)} className="text-red-500 text-2xl"><RiDeleteBin2Fill/></button>
                    </th>
                </tr>)
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Messages;