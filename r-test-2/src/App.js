import React, { useEffect, useReducer, useState } from "react";

import * as types from "./components/reduser";
import { ToastContainer, toast } from "react-toastify";

import { IoBagOutline } from "react-icons/io5";
import Item from "./components/item";
import Cartbar from "./components/Cartbar";
import { Container } from "react-bootstrap";
import "./App.css";
// import axios from "axios";
const cartdata = {
  cdata: [],
};
const cart_reduser = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_CART: {
      const item = state.cdata.find((el) => el?.id === payload?.id);
      if (item?.id) {
        const cart_item = { ...item, count: item.count + 1 };
        const updateed_data = state.cdata.map((el) => {
          if (el.id === item.id) {
            return cart_item;
          } else return el;
        });

        return {
          ...state,
          cdata: updateed_data,
        };
      } else
        return {
          ...state,
          cdata: [...state.cdata, { ...payload, count: 1 }],
        };
    }
    case types.REMOVE_CART: {
      // console.log(payload, "rem");
      const data = state.cdata.filter((el) => el.id !== payload);

      return {
        ...state,
        cdata: data,
      };
    }
    case types.CART_INC: {
      const data = state.cdata.map((el) => {
        if (el.id === payload) {
          return {
            ...el,
            count: el.count + 1,
          };
        } else return el;
      });
      console.log(payload, data, "redu");
      return {
        ...state,
        cdata: data,
      };
    }
    case types.CART_DEC: {
      const data = state.cdata.map((el) => {
        if (el.id === payload) {
          return {
            ...el,
            count: el.count - 1,
          };
        } else return el;
      });
      return {
        ...state,
        cdata: data,
      };
    }
    default:
      return state;
  }
};
const App = () => {
  const [data, setData] = useState([]);
  const [header, setheader] = useState("Products Page");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cdata, dispatch] = useReducer(cart_reduser, cartdata);

  console.log(cdata.cdata, "cdata");
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const fetchproductsdata = async () => {
    // let res = await axios.get("https://dummyjson.com/products");
    // let data = await res.data.products
    // setData(data);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
      });
  };
  useEffect(() => {
    fetchproductsdata();
  }, []);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div data-testid="my-element" className="conatiner">
      <Container>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a data-testid="header-content" className="navbar-brand">
              {header}
            </a>
            <form className="d-flex">
              <span>
                <IoBagOutline
                  data-testid="cart-button"
                  onClick={openDrawer}
                  className="cart-btn"
                />
              </span>
            </form>
          </div>
        </nav>
        <div className="products-container">
          <Item data={data} dispatch={dispatch} />
        </div>
        <div>
          <Cartbar
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            cdata={cdata.cdata}
            dispatch={dispatch}
          />
        </div>
      </Container>
    </div>
  );
};

export default App;
