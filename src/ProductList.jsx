import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: 'Flowering Plants',
      plants: [
        {
          name: 'Rose',
          description: 'A beautiful red rose',
          cost: '$10',
          image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?cs=srgb&dl=pexels-pixabay-56866.jpg&fm=jpg',
        },
        {
          name: 'Tulip',
          description: 'A lovely yellow tulip',
          cost: '$8',
          image: 'https://media.istockphoto.com/id/169977992/photo/yellow-tulips.jpg?s=612x612&w=0&k=20&c=0XGWY6p0HRlp_dAAB_eFmuXUQGcz9mVZHp5LHrNeLig=',
        },
      ],
    },
    {
      category: 'Succulents',
      plants: [
        {
          name: 'Aloe Vera',
          description: 'A soothing succulent plant',
          cost: '$12',
          image: 'https://m.media-amazon.com/images/I/61EU4UhikKL._AC_UF1000,1000_QL80_.jpg',
        },
        {
          name: 'Cactus',
          description: 'A hardy cactus plant',
          cost: '$5',
          image: 'https://cdn.britannica.com/08/100608-050-684264CB/Saguaro-cactus-Arizona.jpg',
        },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // FIXED: ensure Continue Shopping returns user to plants page
  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div
        className="navbar"
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff!important',
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '20px',
        }}
      >
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="logo"
            />
            <a href="/" onClick={(e) => handleHomeClick(e)}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '1100px',
          }}
        >
          <div>
            <a
              href="#"
              onClick={(e) => handlePlantsClick(e)}
              style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}
            >
              Plants
            </a>
          </div>
          <div>
            <a
              href="#"
              onClick={(e) => handleCartClick(e)}
              style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}
            >
              <h1 className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  height="68"
                  width="68"
                >
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>
              <div className="product-card-container">
                {category.plants.map((plant) => (
                  <div key={plant.name} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <div className="product-details">
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p>{plant.cost}</p>
                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={addedToCart[plant.name]}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
