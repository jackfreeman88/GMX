import { useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateItemQuantity } from "../app/slices/cartSlice";
const moment = require('moment');

function CartItem({ product }) {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const updateStatus = useSelector(state => state.cart.updateStatus)
    const quantityRef = useRef(null); // ref => { current: null }
    const isInt = (n) => {
        if (n.length == 0) {
            return false
        }
        return !isNaN(n % 1) && n % 1 == 0;
    }

    const handleUpdateQuantity = async ({ cartId, action, quantity, currentProductQuantity }) => {
        if ((action === 'manual' && quantity >= 1 && quantity <= 99999 && isInt(quantity)) || (action === 'decrement' && currentProductQuantity >= 1) || (action === 'increment' && currentProductQuantity < 99999)) {
            setIsLoading(true)
            await dispatch(updateItemQuantity({ cartId, action, quantity }))
            setIsLoading(false)
            quantityRef.current?.focus();
        }
    }
    return (
        <Card className="card-dark bs-none mb-4" key={product.productId}>
            <Card.Body>
                <Row>
                    <Col>
                        <h3 className="fs-22 fw-600 color-22a612">{product.title}</h3>
                        <h4 className="fs-16 fw-600 color-dcdcdc">{product.categoryTitle}</h4>
                        <div className="d-flex align-items-center">
                            <label className="form-label my-1 me-3">Harvested :</label>
                            <div className="color-dcdcdc my-1">{moment(product.harvested).format("DD MMM 'YY")}</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <label className="form-label my-1 me-3">Qty :</label>
                            <a className={`action-btn color-dcdcdc me-2 ${product.quantity <= 1 || isLoading ? "disabled" : ""}`} onClick={() => handleUpdateQuantity({ cartId: product.cartId, action: "decrement", quantity: -1, currentProductQuantity: product.quantity })}><i className="fas fa-minus"></i></a>
                            <div className="color-dcdcdc my-1 fw-600 form-dark">
                                <input className='form-control form-control-sm maxw-100' type="number" min={1} max={99999} value={product.quantity} ref={quantityRef} onChange={(e) => handleUpdateQuantity({ cartId: product.cartId, action: "manual", quantity: e.target.value, currentProductQuantity: product.quantity })} disabled={isLoading ? true : false} />
                            </div>
                            <a className={`action-btn color-dcdcdc ms-2 ${product.quantity >= 99999 || isLoading ? "disabled" : ""}`} onClick={() => handleUpdateQuantity({ cartId: product.cartId, action: "increment", quantity: 1, currentProductQuantity: product.quantity })}><i className="fas fa-plus"></i></a>
                        </div>
                    </Col>
                    <Col sm="auto">
                        <a className={`action-btn color-dcdcdc ${isLoading ? 'disabled' : ''}`} onClick={() => dispatch(removeFromCart(product.cartId))}><i className="fas fa-trash-alt"></i></a>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default CartItem;