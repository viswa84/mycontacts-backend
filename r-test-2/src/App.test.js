import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Item from "./components/item";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cartbar from "./components/Cartbar";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { ADD_CART } from "./components/reduser";
Enzyme.configure({ adapter: new Adapter() });

const mockdata = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    count: 2,
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    count: 2,
  },
];
// total amount
const expectedTotalAmount = mockdata.reduce(
  (acc, el) => acc + el.count * el.price,
  0
);

const mockfun = jest.fn();

describe("checking app component", () => {
  it("render without crashing ", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('[data-testid="my-element"]')).toBe(true);
    expect(wrapper.find('[data-testid="header-content"]').text()).toBe(
      "Products Page"
    );
  });
  it("check api call working or not ", async () => {
    let res = await fetch("https://dummyjson.com/products");
    let data = res.status;
    expect(data).toBe(200);
  });

  it("checking product item content", () => {
    const wrapper = shallow(<Item data={mockdata} />);
    expect(wrapper.exists('[data-testid="product-item"]')).toBe(true);
    expect(wrapper.find('[data-testid="product-item"]').length).toBe(2);
  });

  // data-testid ="btn-addtocart"
  it("checking  Add to cart button working or not", () => {
    const wrapper = shallow(<Item data={mockdata} dispatch={mockfun} />);

    expect(wrapper.find('[data-testid="addtocart"]').length).toBe(2);

    wrapper.find('[data-testid="addtocart"]').first().simulate("click");

    expect(mockfun).toHaveBeenCalled();
  });
});

test("renders total amount correctly", () => {
  render(<Cartbar isOpen={true} onClose={() => {}} cdata={mockdata} />);

  // Calculate the expected total amount
  const expectedTotalAmount = mockdata.reduce(
    (acc, el) => acc + el.count * el.price,
    0
  );

  // Find the total amount element in the rendered component
  const totalAmountElement = screen.getByTestId("total-amount");

  // Assert that the total amount matches the expected total amount
  expect(totalAmountElement).toHaveTextContent(
    `Cart Total : Rs. ${expectedTotalAmount}`
  );
});

test("clicking  + button the total price should be change", () => {
  render(<Cartbar isOpen={true} onClose={() => {}} cdata={mockdata} />);

  // Find the increment button in the rendered component
  const incrementButton = screen.getAllByTestId("increment-btn");

  // Click the increment button
  // console.log(incrementButton,'inc')
  userEvent.click(incrementButton[0]);
  // Find the updated price element in the rendered component
  const updatedPriceElement = screen.getByTestId("total-amount").textContent;
  // Assert that the updated price element is present in the DOM
  expect(updatedPriceElement).toBe(
    `Cart Total : Rs. ${expectedTotalAmount + mockdata[0].price}`
  );
});

test("clicking  - button the total price should be change", () => {
  render(<Cartbar isOpen={true} cdata={mockdata} />);

  const decbutton = screen.getAllByTestId("decrement-btn");
  userEvent.click(decbutton[0]);
  const updatedPriceElement = screen.getByTestId("total-amount").textContent;
  expect(updatedPriceElement).toBe(
    `Cart Total : Rs. ${expectedTotalAmount - mockdata[0].price}`
  );
});

test("clicking  delete button in cart drawer the element shoud be delteted in the  dom", () => {
  render(<Cartbar isOpen={true} cdata={mockdata} />);

  const deletebutton = screen.getAllByTestId("delete-cart-btn");
  // cheking the length of delete buttons
  expect(deletebutton.length).toBe(2);

  //clicking the delete button
  userEvent.click(deletebutton[0]);
  const updated_del_btn_count = screen.getAllByTestId("delete-cart-btn").length;
  const updatedPriceElement = screen.getByTestId("total-amount").textContent;
  // the initaal  2 elements have when we cleck th first element the

  expect(updated_del_btn_count).toBe(1);
});

test("check the add to cart button is working or not ", () => {
  render(<Item data={mockdata} dispatch={mockfun} />);
  const product_items = screen.getAllByTestId("product-item");
  expect(product_items.length).toBe(2);

  const Add_cart_btns = screen.getAllByTestId("addtocart");
  expect(Add_cart_btns.length).toBe(2);

  // Click the first "Add to cart" button
  userEvent.click(Add_cart_btns[0]);

  // Verify that mockfun (dispatch) has been called with the correct arguments
  expect(mockfun).toHaveBeenCalledWith({
    type: ADD_CART,
    payload: mockdata[0],
  });
});
