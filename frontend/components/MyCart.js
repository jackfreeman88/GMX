import { useEffect } from "react";
import { Offcanvas, Card, Row, Col, Button, Form } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartProducts, resetCart } from "../app/slices/cartSlice";
import API from "../config/endpoints.config";
import Rest from "../config/rest.config";
import { SkeletonOptions } from "../services/SkeletonOptions";
import CartItem from "./CartItem";
import Notifier from "./Notifier";

function OffCanvasMyCart({ name, ...props }) {
    const noti = new Notifier();
    const cartProducts = useSelector(state => state.cart.products);
    const productsStatus = useSelector(state => state.cart.status)
    const dispatch = useDispatch();
    useEffect(() => {
        if (productsStatus === 'idle') {
            dispatch(fetchCartProducts())
        }
    }, [productsStatus, dispatch])
    const handleRequestQuote = async () => {
        const response = await Rest.axiosRequest(API.requestQuote, {});
        if (response.data.status) {
            dispatch(resetCart());
            noti.notify('Quote has been requested successfully', "success");
        } else {
            noti.notify(response.data.message, "danger");
        }
    }
    return (
        <>
            <Offcanvas show={props.show} onHide={props.hideShowCartModal} {...props} className="dark-canvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        productsStatus === 'loading' ?
                            [...Array(3)].map((element, index) => (
                                < Card className="card-dark bs-none mb-4" key={index}>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <h3 className="fs-22 fw-600 color-22a612">
                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                        <Skeleton />
                                                    </SkeletonTheme>
                                                </h3>
                                                <h4 className="fs-16 fw-600 color-dcdcdc">
                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                        <Skeleton />
                                                    </SkeletonTheme>
                                                </h4>
                                                {/* <div className="d-flex align-items-center"> */}
                                                <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                    <Skeleton />
                                                </SkeletonTheme>
                                                {/* </div>
                                                <div className="d-flex align-items-center"> */}
                                                <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                    <Skeleton />
                                                </SkeletonTheme>
                                                {/* </div> */}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                            :
                            cartProducts && cartProducts.length ?
                                <>{
                                    cartProducts.map(product => (
                                        <CartItem product={product} />
                                    ))}
                                    <div className="text-end">
                                        <Button variant="primary" className="btn-wh-220-46 btn-rounded" onClick={handleRequestQuote}>Request Quote</Button>
                                    </div>
                                </>
                                : <Card className="card-dark bs-none mb-4">
                                    <Card.Body>
                                        <div className="text-center">
                                            <h4 className="fs-18 fw-600 color-dcdcdc">Your cart is empty!</h4>
                                            <p>Looks like you haven't added anything in your cart yet.</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                    }
                </Offcanvas.Body>
            </Offcanvas >
        </>
    );
}

function MyCart(props) {
    return (
        <>
            <OffCanvasMyCart
                placement={"end"}
                name={"end"}
                show={props.hideShowCart}
                {...props}
            />
        </>
    )
}

export default MyCart
