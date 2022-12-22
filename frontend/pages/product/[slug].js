import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row, Button, Modal, Form, Spinner } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faCalendarAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import Figure from 'react-bootstrap/Figure';
import API from '../../config/endpoints.config';
import Rest from '../../config/rest.config';
import Notifier from '../../components/Notifier';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    Title,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonOptions } from '../../services/SkeletonOptions';
import { customFormat, Helper } from '../../services/Helper';
import InfiniteScroll from "react-infinite-scroll-component";
import ReactStars from "react-rating-stars-component";
import FavouriteBtn from '../../components/FavouriteBtn';
import { useRouter } from 'next/router';
import { APP_NAME, ASSETS_URL, REACT_APP_API_BASE_URL } from '../../config/server.config';
import { contextCookie, getSingle } from "../../services/Auth";
import Meta from '../../components/Meta';
import { addProductToCart, addToCart } from '../../app/slices/cartSlice';
import Swal from 'sweetalert2';
const moment = require('moment');
import { saveAs } from "file-saver";


// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler,
// );

// const options = {
//     responsive: true,
//     elements: {
//         point: {
//             radius: 5,
//         }
//     },
//     layout: {
//         padding: 10
//     },
//     plugins: {
//         legend: {
//             position: 'top',
//             display: false,
//         },
//         title: {
//             display: false,
//             text: 'Price chart',
//         },
//         tooltip: {
//             callbacks: {
//                 label: function (context) {
//                     let label = context.dataset.label || '';
//                     if (label) {
//                         label += ': ';
//                     }
//                     if (context.parsed.y !== null) {
//                         label += '$ ' + (Math.round(context.parsed.y * 100) / 100).toFixed(2);
//                     }
//                     return label;
//                 }
//             }
//         }
//     },
//     scales: {
//         y: {
//             display: true,
//             position: 'right',
//             grid: {
//                 color: "transparent",
//                 display: true,
//                 drawBorder: true,
//                 zeroLineColor: "#323232",
//                 zeroLineWidth: 1,
//                 lineWidth: 0,
//             },
//             ticks: {
//                 font: {
//                     size: 15,
//                     weight: "bold",
//                 },
//                 color: "white",
//                 // Include a dollar sign in the ticks
//                 callback: function (value, index, ticks) {
//                     return '$ ' + (Math.round(value * 100) / 100).toFixed(2);
//                 },
//             }
//         },
//         x: {
//             grid: {
//                 color: "transparent",
//                 display: true,
//                 drawBorder: true,
//                 zeroLineColor: "#323232",
//                 zeroLineWidth: 1,
//                 lineWidth: 0,
//             },
//             ticks: {
//                 font: {
//                     size: 15,
//                     weight: "bold",
//                 },
//                 color: "white"
//             }
//         }
//     },
// };

function ProductDetails(props) {
    // let labels = [];
    // let data = [];
    // props.productPriceHistory.map((history) => {
    //     labels = [...labels, moment(history['createdAt']).format("DD MMM")]
    //     data = [...data, history['price']]
    // })
    const router = useRouter()
    const dispatch = useDispatch();
    const productStatus = useSelector(state => state.cart.status)
    const currentBrandId = useSelector(state => state.cart.brandId)
    const { slug } = router.query;
    const noti = new Notifier();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [quantityError, setQuantityError] = useState(false);
    const [productReviews, setProductReviews] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState('')
    const [skeletonLoading, setSkeletonLoading] = useState(true);
    const [photoIndex, setPhotoIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    // state for displaying total amount and chart
    // const [totalAmount, setTotalAmount] = useState(0);
    // const [chartLabels, setChartLabels] = useState(labels)
    // const [chartData, setChartData] = useState(data)
    // const [gradient, setGradient] = useState('')

    //useEffect for creating chart gradient
    // useEffect(() => {
    //     if (document.getElementById('canvas')) {
    //         const ctx = document.getElementById('canvas').getContext("2d")
    //         const gradientData = ctx.createLinearGradient(0, 0, 0, 400)
    //         gradientData.addColorStop(0, 'rgba(53, 100, 48, 1)');
    //         gradientData.addColorStop(1, 'rgba(65, 65, 65, 1)');
    //         setGradient(gradientData)
    //     }
    // }, [])
    useEffect(() => {
        if (productStatus === 'loading') {
            setIsLoading(true)
        } else if (productStatus === 'succeeded') {
            setIsLoading(false)
            setQuantity('');
            setShowModal(false);
        } else if (productStatus === 'failed') {
            setIsLoading(false)
        }
    }, [productStatus])

    const closeModal = () => {
        setShowModal(false);
    }
    const handleShowModal = async () => {
        // if(!props.productDetail.canOrder){
        //     noti.notify('You can order products from seller who is in your state only', "danger");
        // } else {
        setShowModal(true);
        // }
    }

    const isInt = (n) => {
        if (n.length == 0) {
            return false
        }
        return !isNaN(n % 1) && n % 1 == 0;
    }

    const handleQuantity = (e) => {
        const { value } = e.target;
        if (value <= 99999) {
            setQuantity(value);
            if (value !== '' && value > 0 && isInt(value)) {
                setQuantityError(false);
                // setTotalAmount(props.price * value);
            } else if (value === '') {
                // setTotalAmount(0);
                setQuantityError('Please enter quantity');
            } else if (value !== parseInt(value)) {
                setQuantityError('Please enter valid quantity of product');
            } else {
                // setTotalAmount(0);
                setQuantityError('Please enter valid quantity of product');
            }
        }
    }

    const handleRequestOrder = async () => {
        if (quantity > 0 && !quantityError) {
            setQuantityError(false);
            // setIsLoading(true)
            // const response = await Rest.axiosRequest(API.requestOrder + '/' + slug, { quantity })
            // if (response.data.status) {
            //     setQuantity('');
            //     setTotalAmount(0);
            //     setShowModal(false);
            //     noti.notify('Order requested successfully', "success");
            // } else {
            //     noti.notify(response.data.message, "danger");
            // }
            // setIsLoading(false);
            // dispatch(addToCart({ product: { ...props.productDetail, quantity: parseInt(quantity) } }))
            if (currentBrandId !== '' && currentBrandId !== props.productDetail.brandId) {
                Swal.fire({
                    title: '',
                    text: "The product you've chosen is from a different brand; adding it to your cart will remove the items you've already added. Do you want to proceed?",
                    color: '#fff',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#22a612',
                    cancelButtonColor: '#d93737',
                    confirmButtonText: 'Yes, confirm!',
                    customClass: {
                        popup: 'swal2-dark',
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        dispatch(addProductToCart({ productSlug: slug, quantity: parseInt(quantity) }))
                    }
                })
            } else {
                dispatch(addProductToCart({ productSlug: slug, quantity: parseInt(quantity) })).unwrap()
                    .then((originalPromiseResult) => {
                        noti.notify('Product added to cart', "success");
                    })
                    .catch((rejectedValueOrSerializedError) => {
                        setIsLoading(false)
                        setQuantity('');
                        setShowModal(false);
                        noti.notify(rejectedValueOrSerializedError.message, "danger");
                    })
            }
        } else if (quantity === '') {
            // setTotalAmount(0);
            setQuantityError('Please enter your required quantity of product');
        } else {
            // setTotalAmount(0);
            setQuantityError('Please enter valid quantity of product');
        }
    }

    const fetchMoreData = () => {
        setPage(page + 1)
        getReviews();
    };

    const getReviews = async () => {
        setSkeletonLoading(true)
        const review = await Rest.axiosRequest(API.productReview + `?slug=${slug
            }&page=${page}&limit=${5}`, {}, 'GET')
        if (review.status === 200) {
            const response = review.data;
            setCount(response.data.count)
            if (response.data.productReviews.length) {
                await setProductReviews([...productReviews, ...response.data.productReviews]);
                setHasMore(true)
                setSkeletonLoading(false)
            } else {
                setSkeletonLoading(false)
                setHasMore(false);
                return;
            }
        } else {
            setSkeletonLoading(false)
            noti.notify(response.data.message, 'danger')
        }

    }

    const lightboxHandler = (index) => {
        setIsOpen(true)
        setPhotoIndex(index)
    }

    const downloadLicense = () => {
        saveAs(REACT_APP_API_BASE_URL + '/get/file' + props.productDetail.labResultsPath)
    }

    return (
        <>
            <Meta title={props.productDetail.title ? props.productDetail.title + ` | ${APP_NAME}` : ''} keyword={''} description={''} />
            <section className="bg-black p-27-0-55">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="m-l-r-30">
                                <div className="box-dark mb-30 overflow-hidden">
                                    <ul className="listing-w-100 d-flex justify-start flex-wrap p-20">
                                        <li className="product-detail-wrap d-flex align-items-start justify-content-between flex-wrap border-bottom-greenlight">
                                            <div className="product-name">
                                                <h5 className="fs-24 fw-600 color-22a612 mb-0">
                                                    {Helper.niceString(props.productDetail?.title, 30, true)}
                                                </h5>
                                                <p className="fs-16 fw-500 color-white">
                                                    {props.productDetail.categoryTitle}
                                                </p>
                                            </div>
                                            <a onClick={downloadLicense} className="fs-15 fw-600 color-22a612 text-decoration-none"><i className="icon-pdf-download"></i><span className="text-decoration-underline"> Lab Results</span></a>
                                            <div className="product-price d-flex align-items-center justify-content-between flex-wrap">
                                                <span className="fs-14 fw-500 color-white product-price">
                                                    Total Unit Sold:
                                                    <strong className="m-l-r-20 fs-24 fw-700 color-white">
                                                        {props.productDetail.totalUnitSold}
                                                    </strong>
                                                </span>
                                                {/* <span className="fs-14 fw-500 color-white product-price">
                                                    Price per lb:
                                                    <strong className="m-l-r-20 fs-24 fw-700 color-white">
                                                        {props.productDetail.productPrice}
                                                    </strong>
                                                </span> */}
                                                {props.isLoggedIn && getSingle('role') !== '2' ?
                                                    <>
                                                        <Button variant="primary" className="btn-wh-188-51 btn br-30" onClick={handleShowModal}>
                                                            <span>
                                                                <i className="icon-user-view"></i>
                                                            </span> Request Quote
                                                        </Button>
                                                        <ul className="d-flex align-items-center justify-content-between flex-wrap border-left-greenlight m-l-20">
                                                            <li>
                                                                <span className='btn-favorite m-l-20'>
                                                                    <FavouriteBtn isFavourite={props.productDetail.isProductFavourited} productSlug={slug} />
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <Link href={"/messages/" + props.productDetail.brandSlug}>
                                                                    <a className="w-37 h-37 b-w-2 btn-circle color-f3772c b-c-f3772c d-inline-b text-center m-l-20"> <span><FontAwesomeIcon icon={faCommentDots} /></span> </a>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </>
                                                    :
                                                    getSingle('role') !== '2' ?
                                                        <Link href="/sign-in"><a className="btn-primary btn-wh-188-51 btn br-30"><span><i className="icon-user-view"></i></span> Request Quote</a></Link>
                                                        : null
                                                }
                                            </div>
                                        </li>
                                        <li className="p-19-0-10">
                                            <ul className="product-detail-listing-wrap">
                                                <li>
                                                    <ul className="listing-33p product-detail-listing border-none">
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">Brand <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400" >{Helper.niceString(props.productDetail.brandName, 15, true)}</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">Starin <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{props.productDetail.strainTitle}</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">Dominant Terpene <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{Helper.niceString(props.productDetail.dominant, 15, true)}</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">Med/Rec <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{props.productDetail.medRecTitle}</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">THC% <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{props.productDetail.thc}%</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">Harvested <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{props.productDetail.harvested ? moment(props.productDetail.harvested).format("DD MMM 'YY") : 'N/A'}</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">I/O <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{props.productDetail.ioTitle}</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">Flavor <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{props.productDetail.flavor}</p>
                                                        </li>
                                                        <li>
                                                            <span className="fs-14 color-777777 fw-500">Unit Size <text className='float-end me-3'>:</text></span>
                                                            <p className="fs-14 color-white fw-400">{Helper.niceString(props.productDetail.unit, 15, true)}</p>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="product-quality-wrap text-right">
                                                    <div className="d-flex justify-content-end flex-wrap">
                                                        <p className="fs-16 fw-500 color-white mb-0 d-flex align-items-center justify-content-end w-100">Product Quality<span className="color-22a612 p-l-10"><FontAwesomeIcon icon={faStar} /></span><span className="fs-18 fw-500 color-22a612 m-l-10">{props.productDetail.avgProductRating}/5 </span><span className="fs-13 fw-300 color-white o-05"> ({props.productDetail.reviewsProductCount} Reviews)</span></p>
                                                        {props.isLoggedIn ?
                                                            <Link href={"/brand/" + props.productDetail.brandSlug} >
                                                                <a className="btn-wh-188-38 btn br-30 btn-gray mt-15"> <span><i className="icon-user-view"></i></span> View Brand</a>
                                                            </Link>
                                                            :
                                                            <Link href="/sign-in">
                                                                <a className="btn-wh-188-38 btn br-30 btn-gray mt-15">
                                                                    <span>
                                                                        <i className="icon-user-view"></i>
                                                                    </span> View Brand
                                                                </a>
                                                            </Link>
                                                        }
                                                        {/* <Link href={"/brand/" + props.productDetail.brandSlug} > <Button href={"/brand/" + props.productDetail.brandSlug} className="btn-wh-188-38 btn br-30 btn-gray mt-15"><span><i className="icon-user-view"></i></span> View Brand </Button></Link> */}
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                {/* <div className={"box-dark mb-30 overflow-hidden" + (chartLabels.length && chartLabels.length === 1 ? ' d-none' : '')}>
                                    <Line id="canvas"
                                        options={options}
                                        data={
                                            {
                                                labels: chartLabels,
                                                datasets: [
                                                    {
                                                        fill: true,
                                                        data: chartData,
                                                        tension: 0.2,
                                                        backgroundColor: gradient,
                                                        borderColor: '#090',
                                                        borderWidth: 2,
                                                        pointBackgroundColor: '#fff',
                                                        pointBorderColor: '#090',
                                                        pointHoverBackgroundColor: '#fff',
                                                        pointHoverBorderColor: 'rgb(54, 162, 235)',
                                                    }
                                                ],
                                            }
                                        } />
                                </div> */}
                                <Card className="card-dark border-gray mb-30 overflow-hidden">
                                    <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">
                                        Description
                                    </Card.Header>
                                    <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09 p-20-20-30-20">
                                        {props.productDetail.description}
                                    </Card.Body>
                                </Card>
                                {
                                    props.productDetail.productImages && props.productDetail.productImages.length ?
                                        <Card className="card-dark border-gray mb-30 overflow-hidden">
                                            <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">
                                                Gallery
                                            </Card.Header>
                                            <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09 p-20">
                                                <ul className="img-listing img-listing-5">
                                                    {
                                                        props.productDetail.productImages.map((row, keyIndex) => (
                                                            <li key={keyIndex + 'product-image'}>
                                                                <Figure className="listing-img cursor-pointer" onClick={() => lightboxHandler(keyIndex)}>
                                                                    <Figure.Image width={60} height={60} src={ASSETS_URL + row.image} />
                                                                </Figure>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                        : null}
                                {isOpen && (
                                    <Lightbox
                                        mainSrc={ASSETS_URL + props.productDetail.productImages[photoIndex].image}
                                        nextSrc={ASSETS_URL + props.productDetail.productImages[(photoIndex + 1) % props.productDetail.productImages.length]}
                                        prevSrc={ASSETS_URL + props.productDetail.productImages[(photoIndex + props.productDetail.productImages.length - 1) % props.productDetail.productImages.length]}
                                        onCloseRequest={() => setIsOpen(false)}
                                        onMovePrevRequest={() =>
                                            setPhotoIndex((photoIndex + props.productDetail.productImages.length - 1) % props.productDetail.productImages.length)
                                        }
                                        onMoveNextRequest={() =>
                                            setPhotoIndex(
                                                (photoIndex + 1) % props.productDetail.productImages.length
                                            )
                                        }
                                    />
                                )}
                                <Card className="card-dark border-gray mb-30 overflow-hidden">
                                    <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">
                                        Reviews
                                    </Card.Header>
                                    <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09 p-25-28">
                                        <ul className="comment-listing">
                                            <InfiniteScroll
                                                dataLength={productReviews.length}
                                                next={fetchMoreData}
                                                hasMore={hasMore}
                                                scrollThreshold={0.45}
                                                loader={
                                                    [...Array(3)].map((elementInArray, index) => (
                                                        <li key={index + 'abc'} className="comment-wrap">
                                                            <Figure className="mb-0 w-60 h-60 br-50p">
                                                                <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                    <Skeleton width={60} height={60} />
                                                                </SkeletonTheme>
                                                            </Figure>
                                                            <div className="comment-detail">
                                                                <h5 className="fs-16 fw-600 color-white mb-0">
                                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                        <Skeleton width={250} />
                                                                    </SkeletonTheme>
                                                                </h5>
                                                                <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                    <Skeleton width={250} className="product-rating" />
                                                                </SkeletonTheme>
                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">
                                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                        <Skeleton count={5} />
                                                                    </SkeletonTheme>
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            >
                                                {
                                                    !skeletonLoading ?
                                                        productReviews.length > 0 ?
                                                            productReviews.map((rowData, keyIndex) => {
                                                                return <li key={keyIndex + 'preview'} className="comment-wrap">
                                                                    <Figure className="mb-0 w-60 h-60 br-50p border-white-2">
                                                                        <Figure.Image src={ASSETS_URL + (rowData.retailer.profilePath ?? "/profile/no-profile-image.jpg")} className='cover circle' />
                                                                    </Figure>
                                                                    <div className="comment-detail">
                                                                        <h5 className="fs-16 fw-600 color-white mb-0">{rowData.retailer.fullName} <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10"><FontAwesomeIcon icon={faCalendarAlt} /> {moment(rowData.createdAt).format(customFormat)}</date></h5>
                                                                        <p className="product-rating">Product Quality <span>
                                                                            <ReactStars
                                                                                count={5}
                                                                                size={13}
                                                                                value={rowData.ratings}
                                                                                isHalf={true}
                                                                                emptyIcon={<div style={{ color: '#8c8c8c' }}> <i className="fas fa-star" /></div>}
                                                                                halfIcon={<i className="fa fa-star-half-alt" />}
                                                                                filledIcon={<i className="fa fa-star" />}
                                                                                activeColor="#22a612"
                                                                                color="#656565"
                                                                                edit={false}
                                                                            />
                                                                        </span></p>
                                                                        <p className="fs-14 fw-300 color-white o-08 mt-6">{rowData.description}</p>
                                                                    </div>
                                                                </li>
                                                            }) : <div className="text-center"> No records found! </div>
                                                        : null
                                                }
                                            </InfiniteScroll>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Modal size="md" show={showModal} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered className='modal-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Request Quote</Modal.Title>
                </Modal.Header>
                <Modal.Body className='py-4'>
                    <Row>
                        <Col lg={12}>
                            {/* <Form.Group className="mb-3 form-dark">
                                <Form.Label>Price per lb: {props.productDetail.productPrice}</Form.Label>
                            </Form.Group> */}
                            <Form.Group className="mb-3 form-dark">
                                <Form.Label>Required QTY</Form.Label>
                                <Form.Control type="number" className='form-control-lg' placeholder="Please enter quantity" onChange={handleQuantity} value={quantity} min='1' />
                                {
                                    quantityError
                                        ? <label className="text-danger"> {quantityError}</label>
                                        : <></>
                                }
                            </Form.Group>
                            {/* {totalAmount > 0 ?
                                <Form.Group className="mb-3 form-dark">
                                    <Form.Label>Total Amount: $ {(Math.round(totalAmount * 100) / 100).toFixed(2)}</Form.Label>
                                </Form.Group>
                                : null} */}
                        </Col>
                        <Col lg={12}>
                            <Form.Group className="text-center">
                                <Button variant="primary" className='btn-wh-184-51 btn-rounded' onClick={handleRequestOrder} disabled={isLoading ? true : false}>
                                    {isLoading ? <Spinner animation="border" /> : "Add to cart"}
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductDetails;

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    // if (!isLoggedIn) {
    //     return {
    //         redirect: { destination: "/" },
    //     };
    // }
    try {
        const { slug } = context.params;
        let productDetail = {};
        let price = "";
        const token = contextCookie(context, 'token');
        let response;
        if (token) {
            response = await Rest.axiosRequest(`${API.getMyProduct}/${slug}`, {}, "GET", false, token);
        } else {
            response = await Rest.axiosRequest(`${API.getMyProduct}/${slug}/admin`, {}, "GET", false);
        }
        if (response.status === 200) {
            productDetail = {
                id: response.data.data.id ?? "",
                avgProductRating: response.data.data.avgProductRating ?? "",
                categoryTitle: response.data.data.category?.title ?? "",
                description: response.data.data.description ?? "",
                dominant: response.data.data.dominant ?? "",
                harvested: response.data.data.harvested ?? "",
                ioTitle: response.data.data.io?.title ?? "",
                medRecTitle: response.data.data.medRec?.title ?? "",
                productImages: response.data.data.productImages ?? [],
                productPrice: response.data.data.productPrice ?? "",
                reviewsProductCount: response.data.data.reviewsProductCount ?? "",
                strainTitle: response.data.data.strain?.title ?? "",
                thc: response.data.data.thc ?? '',
                flavor: response.data.data.flavor,
                title: response.data.data?.title ?? '',
                brandId: response.data.data.user?.brand.id ?? '',
                brandName: response.data.data.user?.brand.brandName ?? '',
                brandSlug: response.data.data.user?.brand.slug ?? '',
                canOrder: response.data.data.canOrder ?? '',
                userId: response.data.data.user?.id ?? '',
                totalUnitSold: response.data.data?.totalUnitSold ?? 0,
                labResultsPath: response.data.data?.labResultsPath ?? '',
                unit: response.data.data?.unit,
            };
            price = response.data.data.price
            productDetail.isProductFavourited = response.data.data.productFavourites ? response.data.data.productFavourites.length : false;
            return {
                props: {
                    productDetail,
                    price,
                    productPriceHistory: response.data.data.productPriceHistory,
                    isLoggedIn
                },
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