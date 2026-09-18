import React, { useContext, useState, memo } from 'react'

import './SingleProductPage.css'
import QuantityInput from './QuantityInput';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import Loader from '../Common/Loader'
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';

// const product = {
//         id: 1,
//         title: "Product Title",
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
//         price: 9.99,
//         images: [
//             "https://placehold.co/500x500?text=Product+Image+1",
//             "https://placehold.co/500x500?text=Product+Image+2",
//             "https://placehold.co/500x500?text=Product+Image+3",
//             "https://placehold.co/500x500?text=Product+Image+4",
            
//         ],
//         stock: 10,
//     };


const SingleProductPage = () => {
    const {id} =useParams();
    

    const {data, error, isLoading} = useData(`/products/${id}`);
    const {addToCart} = useContext(CartContext);

    
    const user = useContext(UserContext);
    

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

  return (
    <section className="align_center aingle_product">
        {error && <em className='form_error'>{error}</em>}
        {isLoading && <Loader/>}
   {data && <> <div className="align_center">
            <div className="single_product_thumbnails">
                {
                  data?.images &&  data.images.map((image, index) => (
                    <img 
                         src={`http://localhost:5000/products/${image}`} 
                         alt={data.title} 
                         className={selectedImage === index ? 'selected_image' : ''}
                         onClick={() => setSelectedImage(index)}/>
                        ))
                }
            </div>
            <img src={`http://localhost:5000/products/${data.images[selectedImage]}`} 
                alt={data.title}
                className='single_product_display'
                />
        </div>
        <div className=" single_product_details">
            <h1 className="single_product_title">{data.title}</h1>
            <p className="single_product_description">{data.description}</p>
                                             {/* fiyatı iki haneye yuvarlar */}
            <p className="single_product_price">${data.price.toFixed(2)}</p>

          { user && <><h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">

                <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={data.stock}/>
            </div>

                <button className="search_button add_cart" onClick={()=> addToCart(data, quantity)}>Add to Cart

                </button></>}

        </div></>}
    </section>
  )
}

export default memo(SingleProductPage)
