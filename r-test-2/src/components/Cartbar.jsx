import React, { useEffect, useState } from "react";

import { Drawer } from "rsuite";

import { MdDeleteOutline } from "react-icons/md";
import { CART_DEC, CART_INC, REMOVE_CART } from "./reduser";
const Cartbar = ({ isOpen, onClose, cdata, dispatch }) => {
  const [ct, setct] = useState([]);
  const cart_total = ct?.reduce((acc, el) => {
    return acc + el.count * el.price;
  }, 0);
  //   {
  //     "id": 3,
  //     "title": "Samsung Universe 9",
  //     "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
  //     "price": 1249,
  //     "discountPercentage": 15.46,
  //     "rating": 4.09,
  //     "stock": 36,
  //     "brand": "Samsung",
  //     "category": "smartphones",
  //     "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  //     "images": [
  //         "https://i.dummyjson.com/data/products/3/1.jpg"
  //     ],
  //     "count": 2
  // }
  // console.log(cdata, "c-data");

  const handleproductcount = (type, id) => {
    if (type === "INC") {
      let data = ct.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            count: el.count + 1,
          };
        } else return el;
      });
      setct(data);
    } else if (type === "DEC") {
      let data = ct.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            count: el.count - 1,
          };
        } else return el;
      });
      setct(data);
    } else if (type === "DEL") {
      let data = ct.filter((el) => el.id !== id);
      setct(data);
    }
  };
  useEffect(() => {
    setct(cdata);
  }, [cdata]);
  return (
    <>
      <Drawer open={isOpen} onClose={() => onClose()}>
        <Drawer.Header>
          <Drawer.Title>Your Cart</Drawer.Title>
          <Drawer.Actions></Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <div className="cart-t-amount">
            <h5 data-testid="total-amount">Cart Total : Rs. {cart_total}</h5>
          </div>
          <div className="draweer-container">
            {ct.map((el) => {
              return (
                <div key={el.id} className="cart-item-con">
                  <img
                    src={el.thumbnail}
                    alt="caet.image"
                    width={"100px"}
                    height={"100%"}
                  />

                  <div>
                    <p> {el.brand}</p>
                    <p> price :₹ {el.price}</p>
                  </div>

                  <div className="counter-ele">
                    <button
                      data-testid="decrement-btn"
                      onClick={() => {
                        handleproductcount("DEC", el.id);
                        // dispatch({ type: CART_DEC, payload: el.id })
                      }}
                      className="cart-count"
                      disabled={el.count === 1}
                    >
                      -
                    </button>
                    <p className="cart-count-toatal">{el.count}</p>
                    <button
                      data-testid="increment-btn"
                      onClick={() => {
                        handleproductcount("INC", el.id);
                        // dispatch({ type: CART_INC, payload: el.id })
                      }}
                      className="cart-count"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <p>Toatl</p>
                    <p>₹ {el.price * el.count}</p>
                  </div>
                  <div>
                    <MdDeleteOutline
                      className="del-icon"
                      data-testid = "delete-cart-btn"
                      onClick={() => {
                        handleproductcount("DEL", el.id);
                        // dispatch({ type: REMOVE_CART, payload: el.id })
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default Cartbar;
