import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Card, Form, } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import { contextCookie } from '../../services/Auth';
import Notifier from '../../components/Notifier';
import { nicePrice } from '../../services/Helper';

function QuoteRequestsBrand(props) {
    const router = useRouter()
    const noti = new Notifier();
    let productItemsIds = {}
    var totalPrice = 0;
    props.productQuoteItems.forEach(element => {
        // ((item) => ({ [item.id]: '' }))
        productItemsIds = { ...productItemsIds, [element.id]: '' }
    });
    const [productsPrice, setProductsPrice] = useState(productItemsIds);
    const [priceError, setPriceError] = useState(false);

    const valdateFields = () => {
        let formIsValid = true;
        if (Object.keys(productsPrice).length) {
            for (const product in productsPrice) {
                if (productsPrice[product] === '' || productsPrice[product] < 1) {
                    formIsValid = false;
                }
            }
        } else {
            formIsValid = false;
        }
        return formIsValid;
    }
    const handleSubmitProductsPrice = async () => {
        if (valdateFields()) {
            setPriceError(false)
            const response = await Rest.axiosRequest(API.submitProductPrice, { productsPrice });
            if (response.data.status) {
                noti.notify('Product prices have been submitted', 'success')
                router.push('/quote-requests')
            } else {
                noti.notify(response.data.message, "danger")
            }
        } else {
            setPriceError(true)
        }
    }
    return (
        <>
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
                                                    <span className="fs-16 fw-500 color-777777 d-block mb-6">Retailer Name</span>
                                                    <p className="fs-16 fw-500 color-white mb-0">{props.retailer.businessName}</p>
                                                </li>
                                                <li className='text-center'>
                                                    <span className="fs-16 fw-500 color-777777 d-block mb-6">Status</span>
                                                    <p className="fs-16 fw-500 color-white mb-0">{props.status === '1' ? 'Requested' : props.status === '2' ? 'Quoted' : 'Cancelled'}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='mw-375 m-auto form-dark'>
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
                                                                            <Link href={'/product/' + item.product.slug} passhref>
                                                                                <a target="_blank" className='color-f3772c'>{item.product.title}</a>
                                                                            </Link>
                                                                            <p>QTY: {item.quantity}</p>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                props.status === '1' ?
                                                                                    <input type="number" className='form-control form-control-sm maxw-100' min={1} onChange={(e) => setProductsPrice((prevState) => ({ ...prevState, [item.id]: e.target.value }))} />
                                                                                    : <Form.Label>{nicePrice(item.price)} </Form.Label>
                                                                            }
                                                                        </td>
                                                                        <td>{item.product?.unit}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                            : null
                                                        }
                                                        {
                                                            props.status === '2' ?
                                                                <tr>
                                                                    <td className="text-end"><b>Total</b></td>
                                                                    <td><b>{nicePrice(totalPrice)}</b></td>
                                                                </tr>
                                                                : null
                                                        }
                                                    </tbody>
                                                    {props.status === '1' ?
                                                        <tfoot>
                                                            <tr>
                                                                <td ></td>
                                                                <td>
                                                                    <Button variant="primary" className="btn-rounded btn-wh-130-38" onClick={handleSubmitProductsPrice}>Submit</Button>
                                                                    {priceError ?
                                                                        <div className="error text-center">
                                                                            Please enter price for all the products
                                                                        </div>
                                                                        : null}
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
        </>
    )
}

export default QuoteRequestsBrand

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    const role = contextCookie(context, 'role');
    if (!isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    } else if (+role !== 2) {
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
