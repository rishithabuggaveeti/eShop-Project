import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../ProductDetailPage/ProductDetailPage.css'
const ProductDetailPage = () => {
  const Navigate= useNavigate();
  const { id }  = useParams();
  const Change = ()=>{
Navigate(`/OrderPage/${id}`)
  }

   
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/products/${id}`);
        const { data } = response;
        setProduct(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      {product ? (
        <div className='container'>
        <div className='check'>
        <img className='image' src={product.imageURL} alt="images"/>

        </div>
        <div className='section'>
        <div>name : <span className='changes'>{product.name}</span></div>
          <div>Description :<span className='changes'> {product.description}</span> </div>
         
          <div>price :<span className='changes'>{product.price}rs</span> </div>
          <div>category :<span className='changes'>{product.category}</span> </div>
          <br></br>
          <button onClick={Change}>
    Place Order 
</button>
        </div>
   

   
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
