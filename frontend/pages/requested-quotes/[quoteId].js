import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Card, Form, Spinner, } from "react-bootstrap";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import { contextCookie } from '../../services/Auth';
import Notifier from '../../components/Notifier';
import Link from 'next/link';
import { nicePrice } from '../../services/Helper';

function QuoteRequestsBrand(props) {
    const router = useRouter()
    const noti = new Notifier();
    const [showLoading, setShowLoading] = useState(false);
    var totalPrice = 0;
    let productData = []
    props.productQuoteItems.forEach(element => {
        productData.push({
            'productId': element.productId, 'price': element.price, 'quantity': element.quantity
        })
    })

    const handleSubmitProductsPrice = async () => {
        setShowLoading(true)
        const response = await Rest.axiosRequest(API.requestOrder, { productData, productQuoteId: props.id })
        if (response.data.status) {
            noti.notify('Order has been placed successfully', "success");
            router.push('/my-orders')
        } else {
            noti.notify(response.data.message, "danger");
        }
        setShowLoading(false);
    }

    const cancelQuote = async () => {
        setShowLoading(true)
        const response = await Rest.axiosRequest(API.cancelQuote, { productQuoteId: props.id })
        if (response.data.status) {
            noti.notify('Quote has been cancelled', "success");
            router.push('/requested-quotes')
        } else {
            noti.notify(response.data.message, "danger");
        }
        setShowLoading(false);
    }
    return <>
        <section className="bg-black p-27-0-55">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="m-l-r-30">
                            <Card className="card-dark border-gray mb-30 overflow-hidden">
                                <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span>Quote Details</span>
                                        <Button variant="primary" className="btn-rounded btn-wh-130-38 ms-auto" onClick={() => router.back()}>
                                            <span className="me-2 fs-18"><FontAwesomeIcon icon={faArrowLeftLong} /></span> Back
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body className="p-md-4 p-3">
                                    <div className="box-dark mb-30 overflow-hidden ">
                                        <ul className="listing-33p rating-listing">
                                            <li className='text-center'>
                                                <span className="fs-16 fw-500 color-777777 d-block mb-6">Quote Id</span>
                                                <p className="fs-16 fw-500 color-white mb-0">#{props.quoteId}</p>
                                            </li>
                                            <li className='text-center'>
                                                <span className="fs-16 fw-500 color-777777 d-block mb-6">Brand Name</span>
                                                <p className="fs-16 fw-500 color-white mb-0">{props.brand.brandName}</p>
                                            </li>
                                            <li className='text-center'>
                                                <span className="fs-16 fw-500 color-777777 d-block mb-6">Status</span>
                                                <p className="fs-16 fw-500 color-white mb-0">{props.status === '1' ? 'Requested' : props.status === '2' ? 'Quoted' : 'Cancelled'}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='mw-480 m-auto form-dark'>
                                        <div className="table-wrap CustomScrollbar CustomScrollbarY">
                                            <Table bordered hover variant="dark">
                                                <thead>
                                                    <tr>
                                                        <th width="200px">Product Name</th>
                                                        <th>Price/Unit </th>
                                                        <th>Unit Size </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.productQuoteItems.length ?
                                                        props.productQuoteItems.map((item, index) => {
                                                            totalPrice += item.price * item.quantity;
                                                            return (
                                                                <tr key={item.id}>
                                                                    <td>
                                                                        <Link
                                                                            href={"/product/" + item.product.slug}
                                                                            passHref
                                                                            target="_blank"
                                                                            className='color-f3772c'
                                                                            legacyBehavior>
                                                                            {item.product.title}
                                                                        </Link>
                                                                        <p>QTY: {item.quantity}</p>
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            props.status === '1' ?
                                                                                '-'
                                                                                : <Form.Label>{nicePrice(item.price)} </Form.Label>
                                                                        }
                                                                    </td>
                                                                    <td>{item.product?.unit}</td>
                                                                </tr>
                                                            );
                                                        })
                                                        : null}
                                                    <tr>
                                                        <td className="text-end"><b>Total</b></td>
                                                        <td><b>{nicePrice(totalPrice)}</b></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                                {props.status === '2' ?
                                                    <tfoot>
                                                        <tr>
                                                            <td>
                                                                <Button variant="danger" className="btn-rounded btn-wh-130-38" onClick={!showLoading ? cancelQuote : null} disabled={showLoading}>{showLoading ? <Spinner animation="border" /> : "Cancel"}</Button>
                                                            </td>
                                                            <td> </td>
                                                            <td>
                                                                <Button variant="primary" className="btn-rounded btn-wh-130-38" onClick={!showLoading ? handleSubmitProductsPrice : null} disabled={showLoading}>{showLoading ? <Spinner animation="border" /> : "Place order"}</Button>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                    : null}
                                            </Table>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>;
}

export default QuoteRequestsBrand

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    const role = contextCookie(context, 'role');
    if (!isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    } else if (+role !== 3) {
        return {
            notFound: true
        };
    }
    try {
        const { quoteId } = context.params;
        const token = contextCookie(context, 'token');
        const response = await Rest.axiosRequest(`${API.getQuoteRequests}/${quoteId}`, {}, "GET", false, token);
        if (response.status === 200) {
            return {
                props: response.data.data,
            };
        } else {
            return {
                notFound: true
            };
        }
    } catch (e) {
        console.log(e.message);
        return {
            redirect: { destination: '/500' },
        };
    }
}
