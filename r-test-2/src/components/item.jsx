import React from "react";
import { ADD_CART } from "./reduser";
import { ToastContainer, toast } from "react-toastify";

const Item = ({ data, dispatch }) => {
  const handleAddtocart = (data) => {

    dispatch({ type: ADD_CART, payload: data });
  };
  return (
    <>
      {data.map((props) => {
        return (
          <>
            <div
              data-testid="product-item"
              key={props.id}
              className="card"
              style={{ width: "18rem" }}
            >
              <img
                className="card-img-top"
                height={"250px"}
                src={props.thumbnail}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{props.brand}</h5>
                <p className="card-text item-discription">
                  {props.description}
                </p>
                <p> ₹{props.price}</p>
                <button
                  onClick={() => {
                    handleAddtocart(props);
                  }}
                  data-testid="addtocart"
                  className="btn btn-primary"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Item;
