import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Card, Col, Container, Row, Form, Button, Table, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faMagnifyingGlass, faTimes, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Select from "react-select";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import ReactStars from "react-rating-stars-component";
import Notifier from '../components/Notifier';
import Rest from '../config/rest.config';
import API from '../config/endpoints.config';
import { DropdownIndicator, react_select_xs_Styles } from '../components/DropDown';
import { SkeletonOptions } from '../services/SkeletonOptions';
import FormValidator from '../components/FormValidator';
import { Helper } from '../services/Helper';
import { CustomLadda } from '../components/CustomLadda';
import { contextCookie } from '../services/Auth';
import { APP_NAME } from '../config/server.config';
import Meta from '../components/Meta';
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function MyOrdersRetailer(props) {
    const [show, setShow] = useState(false);
    const noti = new Notifier();
    const router = useRouter();
    const [params, setParams] = useState({
        category: props.queryString.category ?? '',
        sortBy: props.queryString.sortBy ?? '',
        keyword: props.queryString.keyword ?? '',
        offset: props.queryString.offset ?? 0,
    });
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState(props.queryString.keyword ?? '');
    const sortBy = [
        { id: 'desc', value: 'desc', name: 'Newest to Oldest', label: 'Newest to Oldest' },
        { id: 'asc', value: 'asc', name: 'Oldest to Newest', label: 'Oldest to Newest' },
    ];
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState();
    const [updateList, setUpdateList] = useState(false);
    const [productDetails, setProductDetails] = useState('');
    const validator = new FormValidator([
        {
            field: "quality_rating",
            method: "isEmpty",
            validWhen: false,
            message: "Please give rating",
        },
        {
            field: "quality_review",
            method: "isEmpty",
            validWhen: false,
            message: "Please write your review",
        },
        {
            field: "dot_rating",
            method: "isEmpty",
            validWhen: false,
            message: "Please give rating",
        },
        {
            field: "dot_review",
            method: "isEmpty",
            validWhen: false,
            message: "Please write your review",
        },
        {
            field: "general_rating",
            method: "isEmpty",
            validWhen: false,
            message: "Please give rating",
        },
        {
            field: "general_review",
            method: "isEmpty",
            validWhen: false,
            message: "Please write your review",
        },
    ]);
    const [showLoading, setShowLoading] = useState(false);
    const [validation, setValidation] = useState(validator.valid());
    const [submitted, setSubmitted] = useState(false)
    const [reviewData, setReviewData] = useState({
        quality_rating: 0,
        quality_review: '',
        dot_rating: 0,
        dot_review: '',
        general_rating: 0,
        general_review: '',
    })
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [disableAllBtn, setDisableAllBtn] = useState(false);

    useEffect(async () => {
        setShowSkeleton(true);
        router.push('/my-orders', { query: { ...params } }, undefined, { shallow: true })
        const response = await Rest.axiosRequest(API.myOrdersRetailer + '?' + `limit=${limit}&` + new URLSearchParams(params).toString(), {}, 'GET')
        if (response.status === 200) {
            setOrders(response.data.data.orders);
            setTotalPages(response.data.data.totalPages);
        } else {
            noti.notify(response.data.message, "danger");
        }
        if (!categories.length) {
            const categoriesData = await Rest.axiosRequest(API.getCategories, {}, 'GET')
            if (categoriesData.status === 200) {
                const categories = [];
                categoriesData.data.data.map((category) => {
                    categories.push({ id: category.id, value: category.id, name: category?.title, label: category?.title });
                })
                setCategories(categories);
            } else {
                noti.notify(categoriesData.data.message, "danger");
            }
        }
        setShowSkeleton(false);
    }, [new URLSearchParams(params).toString(), updateList])

    const handleFilterChange = (val, e) => {
        if (val) {
            setParams((prevState) => ({ ...prevState, [e.name]: val.value }))
        } else {
            setParams((prevState) => ({ ...prevState, [e.name]: '' }))
        }
    }
    const onChangeSearch = (e) => {
        if (e.target.value) {
            setKeyword(e.target.value)
        } else {
            setKeyword('')
        }
    }
    const handlePageChange = (event) => {
        setParams((prevState) => ({ ...prevState, offset: event.selected }))
    };

    const handleClose = () => {
        setShow(false);
        setSelectedOrderId('');
        setReviewData({
            quality_rating: 0,
            quality_review: '',
            dot_rating: 0,
            dot_review: '',
            general_rating: 0,
            general_review: '',
        });
    }
    const handleShow = async (orderId, slug) => {
        const response = await Rest.axiosRequest(API.getMyProduct + `/${slug}`, {}, 'GET')
        if (response.data.status) {
            setProductDetails(response.data.data);
            setSelectedOrderId(orderId);
            setShow(true);
        } else {
            noti.notify(response.data.message, "danger");
        }
    }

    const qualityRatingChanged = (nextValue, prevValue, name) => {
        setReviewData((prevState) => ({ ...prevState, quality_rating: nextValue }))
    };
    const dotRatingChanged = (nextValue, prevValue, name) => {
        setReviewData((prevState) => ({ ...prevState, dot_rating: nextValue }))
    };
    const generalRatingChanged = (nextValue, prevValue, name) => {
        setReviewData((prevState) => ({ ...prevState, general_rating: nextValue }))
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target
        setReviewData((prevState) => ({ ...prevState, [name]: value }))
    };

    const handleAction = async (orderId, action) => {
        setDisableAllBtn(true);
        const response = await Rest.axiosRequest(API.updateOrder + '/' + orderId + '/' + action, {});
        if (response.data.status) {
            setDisableAllBtn(false);
            noti.notify(response.data.message, "success");
            setUpdateList(!updateList)
        } else {
            noti.notify(response.data.message, "danger");
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const validation = validator.validate(reviewData)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid) {
            setShowLoading(true)
            const response = await Rest.axiosRequest(API.updateOrder + '/' + selectedOrderId + '/review', reviewData)
            if (response.data.status) {
                noti.notify(response.data.message, 'success')
                setSubmitted(false);
                handleClose();
                setUpdateList(!updateList)
            } else {
                noti.notify(response.data.message, 'danger')
            }
            setShowLoading(false)
        }
    }

    let checkValidation = submitted ? validator.validate(reviewData) : validation
    return <>
        <Meta title={`My Orders | ${APP_NAME}`} keywords={''} description={''} />
        <section className="bg-black p-30-0-60">
            <Container>
                <Row>
                    <Col lg={12} className="mx-auto">
                        <Card className="card-dark border-gray p-15-20-20 br-10 card">
                            <Card.Header className="border-btm-gray mb-20 px-0">
                                <Card.Title className="fs-18 fw-600 color-dcdcdc">My Orders</Card.Title>
                            </Card.Header>

                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between flex-wrap mb-20">
                                    <Form className="d-flex justify-content-flex-start align-items-center filter-form flex-md-nowrap flex-wrap filter-form order-filter">
                                        <Form.Group className="form-inline form-dark form-group-h-33 me-md-3 me-0 mb-sm-2 flex-fill">
                                            <Form.Label className="my-2">Category:</Form.Label>
                                            <Select
                                                classNamePrefix="react-select"
                                                className="react-select-lg maxw-200"
                                                styles={react_select_xs_Styles}
                                                options={categories.map(({ id, name }) => ({
                                                    value: id,
                                                    label: name,
                                                }))}
                                                value={categories.filter((item) => item.id == params.category)}
                                                onChange={(val, e) => handleFilterChange(val, e)}
                                                placeholder="Category"
                                                components={{
                                                    DropdownIndicator,
                                                    IndicatorSeparator: () => null,
                                                }}
                                                name="category"
                                                isClearable={true}
                                            />
                                        </Form.Group>
                                        <Form.Group className="form-inline form-dark form-group-h-33 me-md-3 me-0 mb-2 flex-fill">
                                            <Form.Label className="my-2">Sort By:</Form.Label>
                                            <Select
                                                classNamePrefix="react-select"
                                                className="react-select-lg maxw-150"
                                                styles={react_select_xs_Styles}
                                                options={sortBy.map(({ value, name }) => ({
                                                    value: value,
                                                    label: name,
                                                }))}
                                                value={sortBy.filter((item) => item.value == params.sortBy)}
                                                onChange={(val, e) => handleFilterChange(val, e)}
                                                placeholder="Sort By"
                                                components={{
                                                    DropdownIndicator,
                                                    IndicatorSeparator: () => null,
                                                }}
                                                name="sortBy"
                                                isClearable={true}
                                            />
                                        </Form.Group>
                                    </Form>
                                    <Form className="mb-7 d-flex search-form-main">
                                        <Form.Group className="search-form form-dark maxw-150 mb-3">
                                            <Form.Control type="search" placeholder="Search by Keywords" name="keyword" onChange={onChangeSearch} value={keyword} />
                                            <Button variant="primary" className="btn-wh-35 br-8 bg-f3772c" onClick={() => setParams((prevState) => ({ ...prevState, ['keyword']: keyword }))}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                                        </Form.Group>
                                        {
                                            params.category !== '' || params.sortBy !== '' || params.keyword !== '' ?
                                                <Form.Group className="form-inline form-dark form-group-h-33 mb-3">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>Clear All</Tooltip>}
                                                    >
                                                        <Button variant="secondary" className="btn-wh-35 br-8 bg-f3772c" onClick={() => { setParams({ category: '', sortBy: '', keyword: '', offset: 0, }); setKeyword(''); }}><FontAwesomeIcon icon={faTimes} /></Button>
                                                    </OverlayTrigger>
                                                </Form.Group>
                                                : null
                                        }
                                    </Form>
                                </div>

                                <div className="table-wrap CustomScrollbar CustomScrollbarY">
                                    {/* <Table bordered hover variant="dark" id="seller-order"> */}
                                    <ResponsiveTable className="table table-bordered table-hover table-dark" id="seller-order">
                                        <Thead>
                                            <Tr>
                                                <Th className="text-center" width="85px;">Order ID</Th>
                                                <Th className="text-start" width="145px;">Product & Category</Th>
                                                <Th className="text-center" width="40px;">Qty</Th>
                                                {/* <Th className="text-center" width="100px;">Price per lb</Th> */}
                                                <Th className="text-center" width="100px;">Total</Th>
                                                <Th className="text-center" width="90px;">Status</Th>
                                                <Th className="text-center" width="240px;">Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                showSkeleton ?
                                                    [...Array(5)].map((value, index) => {
                                                        return (
                                                            <Tr key={index}>
                                                                {
                                                                    [...Array(6)].map((v, i) => {
                                                                        return (<Td key={i}>
                                                                            <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                <Skeleton />
                                                                            </SkeletonTheme>
                                                                        </Td>)
                                                                    })
                                                                }
                                                            </Tr>
                                                        )
                                                    })
                                                    :
                                                    orders.length ?
                                                        orders.map((order) => {
                                                            return (
                                                                <Tr key={order.id}>
                                                                    <Td className="text-center">
                                                                        <p className="fs-14 color-dcdcdc fw-500">#{order.orderId ?? ''}</p>
                                                                        <p className="fs-14 color-dcdcdc fw-400 o-08">{moment(order.createdAt).format("DD MMM 'YY")}</p>
                                                                    </Td>
                                                                    <Td className="text-start">
                                                                        <Link
                                                                            href={`/product/${order.product.slug}`}
                                                                            className="fs-16 fw-600 color-f3772c"
                                                                            legacyBehavior>{order.product?.title ? Helper.niceString(order.product?.title, 15, true) : ''}</Link>
                                                                        <p className="fs-14 fw-400 color-bfbfbf">{order.category?.title ?? ''}</p>
                                                                        <Link
                                                                            href={`/brand/${order.brand.slug}`}
                                                                            className="color-0e9bfd text-decoration-underline"
                                                                            legacyBehavior>{order.brand ? Helper.niceString(order.brand.brandName, 20, true) : ''}</Link>
                                                                    </Td>
                                                                    <Td className="text-center">{order.quantity ?? ''}</Td>
                                                                    {/* <Td className="text-center">{order.product.productPrice ?? ''}</Td> */}
                                                                    <Td className="text-center">{order.totalPrice ?? ''}</Td>
                                                                    <Td className="text-center">
                                                                        {order.status === '1' ?
                                                                            <p className="placed">Placed</p>
                                                                            : order.status === '2' ?
                                                                                <p className="placed">Accepted</p>
                                                                                : order.status === '3' ?
                                                                                    <p className="cancel">Cancelled</p>
                                                                                    : order.status === '5' ?
                                                                                        <p className="received">Received</p>
                                                                                        : order.status === '6' ?
                                                                                            <p className="completed">Completed</p>
                                                                                            : ''
                                                                        }
                                                                    </Td>
                                                                    <Td className="text-right">
                                                                        <div className="d-flex justify-content-end align-items-center">
                                                                            <Link
                                                                                href={`/messages/${order.brand.slug}`}
                                                                                className="btn-rounded w-30 h-30 btn-outline-secondary-transparent table-chat-btn text-center me-auto"
                                                                                legacyBehavior>

                                                                                <span className="icon"><FontAwesomeIcon icon={faCommentDots} /></span>

                                                                            </Link>
                                                                            {order.status === '1' ?
                                                                                <CustomLadda className="btn-outline-red-transparent w-30 h-30 btn-circle close-btn m-l-10" onClick={() => handleAction(order.orderId, 'cancelled')} disabled={disableAllBtn}>
                                                                                    <span className="icon"><FontAwesomeIcon icon={faTimes} /></span>
                                                                                </CustomLadda>
                                                                                : order.status === '2' ?
                                                                                    <CustomLadda className="btn-outline-red-transparent w-30 h-30 btn-circle close-btn m-l-10" onClick={() => handleAction(order.orderId, 'cancelled')} disabled={disableAllBtn}>
                                                                                        <span className="icon"><FontAwesomeIcon icon={faTimes} /></span>
                                                                                    </CustomLadda>
                                                                                    : order.status === '3' ? null
                                                                                        : order.status === '4' ?
                                                                                            <>
                                                                                                <CustomLadda className="btn-outline-secondary-transparent br-30 p-7-15 fs-13 text-decoration-none" onClick={() => handleAction(order.orderId, 'received')} disabled={disableAllBtn}>
                                                                                                    Received
                                                                                                </CustomLadda>
                                                                                                <CustomLadda className="btn-outline-red-transparent w-30 h-30 btn-circle close-btn m-l-10" onClick={() => handleAction(order.orderId, 'cancelled')} disabled={disableAllBtn}>
                                                                                                    <span className="icon"><FontAwesomeIcon icon={faTimes} /></span>
                                                                                                </CustomLadda>
                                                                                            </>
                                                                                            : order.status === '5' ?
                                                                                                <a className="btn-outline-secondary-transparent br-30 p-7-25 fs-13 text-decoration-none" onClick={() => handleShow(order.orderId, order.product.slug)} disabled={disableAllBtn}>
                                                                                                    Completed and Review
                                                                                                </a>
                                                                                                : null
                                                                            }
                                                                        </div>
                                                                    </Td>
                                                                </Tr>
                                                            );
                                                        })
                                                        : <Tr>
                                                            <Td className="text-center" colSpan={8}>No records found!</Td>
                                                        </Tr>
                                            }
                                        </Tbody>
                                    </ResponsiveTable>
                                </div>
                                <div className='mt-5 d-flex justify-content-center'>
                                    {
                                        totalPages > 1 ?
                                            <ReactPaginate
                                                previousLabel={<i className="fas fa-long-arrow-alt-left"></i>}
                                                nextLabel={<i className="fas fa-long-arrow-alt-right"></i>}
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item prev-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item next-item"
                                                nextLinkClassName="page-link"
                                                breakLabel="..."
                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                pageCount={totalPages}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageChange}
                                                containerClassName="pagination"
                                                activeClassName="active"
                                                forcePage={parseInt(params.offset)}
                                            />
                                            : null
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
        <Modal show={show} onHide={handleClose} centered className="modal-dark">
            <Modal.Header closeButton>
                <Modal.Title>Review Product & Brand</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="fs-14 fw-500 color-white">Product Name : <span className="o-08">{productDetails?.title}</span></p>
                <Row>
                    <Col lg={6}>
                        <Form.Group className="form-label-top form-dark form-rating mb-15">
                            <Form.Label>Product Quality</Form.Label>
                            <div className="form-control">
                                <ReactStars
                                    name="quality_rating"
                                    emptyIcon={<i className="fal fa-star"></i>}
                                    halfIcon={<i class="fas fa-star-half-alt"></i>}
                                    filledIcon={<i className="fas fa-star"></i>}
                                    size={30}
                                    count={5}
                                    color="#656565"
                                    activeColor="#22a612"
                                    value={reviewData.quality_rating}
                                    a11y={true}
                                    isHalf={true}
                                    editing={true}
                                    onChange={qualityRatingChanged}
                                />
                            </div>
                            <div className={checkValidation.quality_rating.isInvalid ? 'animated fadeIn' : ''} >
                                <div className="error">
                                    {checkValidation.quality_rating.message}
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Form.Group className="form-dark">
                            <Form.Label>Write Review</Form.Label>
                            <Form.Control as="textarea" name="quality_review" placeholder="Write Review" style={{ height: '85px' }} onChange={handleReviewChange} value={reviewData.quality_review} />
                            <div className={checkValidation.quality_review.isInvalid ? 'animated fadeIn' : ''} >
                                <div className="error">
                                    {checkValidation.quality_review.message}
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <p className="fs-14 fw-400 color-white border-top-4b4b4b mt-20 p-t-15 p-b-6">Brand : <span className="o-08">{productDetails.user && productDetails.user.brand ? productDetails.user.brand.brandName : ''}</span></p>
                <Row>
                    <Col lg={6}>
                        <Form.Group className="form-label-top form-dark form-rating mb-15">
                            <Form.Label>Delivery On Time</Form.Label>
                            <div className="form-control">
                                <ReactStars
                                    name="dot_rating"
                                    count={5}
                                    size={30}
                                    value={reviewData.dot_rating}
                                    isHalf={true}
                                    a11y={true}
                                    onChange={dotRatingChanged}
                                    emptyIcon={<i className="fal fa-star"></i>}
                                    halfIcon={<i class="fas fa-star-half-alt"></i>}
                                    filledIcon={<i className="fas fa-star"></i>}
                                    activeColor="#22a612"
                                    editing={true}
                                />
                            </div>
                            <div className={checkValidation.dot_rating.isInvalid ? 'animated fadeIn' : ''} >
                                <div className="error">
                                    {checkValidation.dot_rating.message}
                                </div>
                            </div>
                        </Form.Group>
                    </Col>

                    <Col lg={6}>
                        <Form.Group className="form-label-top form-dark form-rating mb-15">
                            <Form.Label>General</Form.Label>
                            <div className="form-control">
                                <ReactStars
                                    name="general_rating"
                                    count={5}
                                    size={30}
                                    value={reviewData.general_rating}
                                    isHalf={true}
                                    onChange={generalRatingChanged}
                                    emptyIcon={<i className="fal fa-star"></i>}
                                    halfIcon={<i class="fas fa-star-half-alt"></i>}
                                    filledIcon={<i className="fas fa-star"></i>}
                                    activeColor="#22a612"
                                    editing={true}
                                />
                            </div>
                            <div className={checkValidation.general_rating.isInvalid ? 'animated fadeIn' : ''} >
                                <div className="error">
                                    {checkValidation.general_rating.message}
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group className="form-dark mb-30">
                            <Form.Label>Write Review</Form.Label>
                            <Form.Control as="textarea" name="dot_review" placeholder="Write Review" style={{ height: '85px' }} onChange={handleReviewChange} value={reviewData.dot_review} />
                            <div className={checkValidation.dot_review.isInvalid ? 'animated fadeIn' : ''} >
                                <div className="error">
                                    {checkValidation.dot_review.message}
                                </div>
                            </div>
                        </Form.Group>
                    </Col>

                    <Col lg={6}>
                        <Form.Group className="form-dark  mb-30">
                            <Form.Label>Write Review</Form.Label>
                            <Form.Control as="textarea" name="general_review" placeholder="Write Review" style={{ height: '85px' }} onChange={handleReviewChange} value={reviewData.general_review} />
                            <div className={checkValidation.general_review.isInvalid ? 'animated fadeIn' : ''} >
                                <div className="error">
                                    {checkValidation.general_review.message}
                                </div>
                            </div>
                        </Form.Group>
                    </Col>

                    <Col lg={12}>
                        <Form.Group className="text-center">
                            <Button variant="primary" type="submit" className="btn-wh-180-54 btn-rounded btn-right-icons m-10" onClick={!showLoading ? handleReviewSubmit : null} disabled={showLoading}>{showLoading ? <Spinner animation="border" /> : "Submit"}<span className="color-22a612"><FontAwesomeIcon icon={faAngleRight} /></span></Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    </>;
}

export default MyOrdersRetailer

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    if (!isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: {
            queryString: context.query
        }
    }
}