import * as React from "react";
import CartItem from "../cart-item";
import "./cart.css";

interface ItemCart {
  _id: string;
  name: string;
  price: string;
  discount: number;
}

interface ICart extends React.Props<any> {
  cart: any;
  sCart: any;
  totalPrice: any;
  onClickDeleteFromCart: any;
  orderCreate: any;
}

export default class Cart extends React.Component<ICart> {
  state = {
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    notification: false,
    notificationText: "",
    notificationClassName: "",
    fieldNameClassName: "",
    fieldLastNameClassName: "",
    fieldEmailClassName: "",
    fieldPhoneClassName: "",
    orderButton: true
  };

  onNameBoxChange = (e: any) => {
    if (e.target.value.length >= 2) {
      this.setState({
        name: e.target.value,
        fieldNameClassName: "uk-form-success"
      });
    } else {
      this.setState({
        name: e.target.value,
        fieldNameClassName: "uk-form-danger"
      });
    }
  };

  onLastNameBoxChange = (e: any) => {
    if (e.target.value.length >= 3) {
      this.setState({
        lastName: e.target.value,
        fieldLastNameClassName: "uk-form-success"
      });
    } else {
      this.setState({
        lastName: e.target.value,
        fieldLastNameClassName: "uk-form-danger"
      });
    }
  };

  onEmailBoxChange = (e: any) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        e.target.value
      )
    ) {
      this.setState({
        email: e.target.value,
        fieldEmailClassName: "uk-form-success"
      });
    } else {
      this.setState({
        email: e.target.value,
        fieldEmailClassName: "uk-form-danger"
      });
    }
  };

  onPhoneNumberBoxChange = (e: any) => {
    if (/^[0-9\-\+]{9,15}$/.test(e.target.value)) {
      this.setState({
        phoneNumber: e.target.value,
        fieldPhoneClassName: "uk-form-success"
      });
    } else {
      this.setState({
        phoneNumber: e.target.value,
        fieldPhoneClassName: "uk-form-danger"
      });
    }
  };

  onSubmit = () => {
    this.setState({ orderButton: false });
    if (!this.props.totalPrice) {
      this.setState({
        notificationText: "Your cart is empty,please fill it to make order",
        notificationClassName: "uk-alert-warning",
        notification: true,
        orderButton: true
      });
    } else if (this.state.name.length <= 2) {
      this.setState({
        notificationText: "Please fill First Name field",
        notificationClassName: "uk-alert-warning",
        fieldNameClassName: "uk-form-danger",
        notification: true,
        orderButton: true
      });
    } else if (this.state.lastName.length <= 3) {
      this.setState({
        notificationText: "Please fill Last Name field",
        notificationClassName: "uk-alert-warning",
        fieldLastNameClassName: "uk-form-danger",
        notification: true,
        orderButton: true
      });
    } else if (this.state.email.length < 1) {
      this.setState({
        notificationText: "Please fill Email field",
        notificationClassName: "uk-alert-warning",
        fieldEmailClassName: "uk-form-danger",
        notification: true,
        orderButton: true
      });
    } else if (this.state.phoneNumber.length < 8) {
      this.setState({
        notificationText: "Please fill Phone Number field",
        notificationClassName: "uk-alert-warning",
        fieldPhoneClassName: "uk-form-danger",
        notification: true,
        orderButton: true
      });
    } else {
      let order = {
        customer_first_name: this.state.name,
        customer_last_name: this.state.lastName,
        customer_email_adress: this.state.email,
        customer_phone_number: this.state.phoneNumber,
        order_price: this.props.totalPrice
      };
      this.props.orderCreate(order);
      this.setState({
        notificationText:
          "Your order is successfully created.Check your email adress!",
        notificationClassName: "uk-alert-success",
        notification: true,
        orderButton: false
      });
    }
  };

  createCartList = (res: any) => {
    return res.map((itemCart: ItemCart) => {
      return (
        <div key={itemCart._id}>
          <CartItem
            _id={itemCart._id}
            discount={itemCart.discount}
            price={itemCart.price}
            name={itemCart.name}
            onClickDeleteFromCart={this.props.onClickDeleteFromCart}
          />
        </div>
      );
    });
  };

  render() {
    const cartList = this.createCartList(this.props.sCart);
    const orderButton = this.state.orderButton ? (
      <button
        type="submit"
        onClick={() => this.onSubmit()}
        className="order-sub uk-button uk-button-default"
      >
        Submit order
      </button>
    ) : (
      <button
        type="submit"
        onClick={() => this.onSubmit()}
        className="order-sub uk-button uk-button-default"
        disabled
      >
        Submit order
      </button>
    );
    const notification = this.state.notification ? (
      <div className={this.state.notificationClassName} uk-alert="true">
        <a
          className="uk-alert-close"
          uk-close="true"
          onClick={() => {
            this.setState({ notification: false });
          }}
        />
        <p className="notification-text">{this.state.notificationText}</p>
      </div>
    ) : null;
    return (
      <div>
        <h1>CartCart</h1>
        <div className="cart-list">
          {cartList}
          <div className="to-pay">
            <div className="price-str">Total price to pay</div>
            <div className="total-price">{this.props.totalPrice}$</div>
          </div>
        </div>

        <div className="order">
          <h3>Make order</h3>
          <form className="uk-grid-form " uk-grid="true">
            <div className="uk-width-1-3">
              <label className="uk-form-label">First Name</label>
              <div className="uk-form-controls">
                <input
                  className={`uk-input ${this.state.fieldNameClassName}`}
                  id="form-stacked-text"
                  type="text"
                  placeholder="First name..."
                  autoComplete="off"
                  onChange={this.onNameBoxChange}
                />
              </div>
            </div>
            <div className="uk-width-1-3">
              <label className="uk-form-label">Last Name</label>
              <div className="uk-form-controls">
                <input
                  className={`uk-input ${this.state.fieldLastNameClassName}`}
                  id="form-stacked-text"
                  type="text"
                  autoComplete="off"
                  placeholder="Last name..."
                  onChange={this.onLastNameBoxChange}
                />
              </div>
            </div>
            <div className="uk-width-1-3">
              <label className="uk-form-label">Email</label>
              <div className="uk-form-controls">
                <input
                  className={`uk-input ${this.state.fieldEmailClassName}`}
                  id="form-stacked-text"
                  type="email"
                  autoComplete="off"
                  placeholder="Email..."
                  onChange={this.onEmailBoxChange}
                  required
                />
              </div>
            </div>
            <div className="uk-width-1-3">
              <label className="uk-form-label">Phone number</label>
              <div className="uk-form-controls">
                <input
                  className={`uk-input ${this.state.fieldPhoneClassName}`}
                  id="form-stacked-text"
                  autoComplete="off"
                  placeholder="Phone number..."
                  onChange={this.onPhoneNumberBoxChange}
                />
              </div>
            </div>
          </form>
          {orderButton}
        </div>
        {notification}
      </div>
    );
  }
}
