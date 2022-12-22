import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table, Tabs, Tab } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faCalendarAlt, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import Figure from 'react-bootstrap/Figure';
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';
import Notifier from '../components/Notifier';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonOptions } from '../services/SkeletonOptions';
import { saveAs } from "file-saver";
import { Helper, customFormat } from '../services/Helper';
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment';
import ReactStars from "react-rating-stars-component";
import { APP_NAME, ASSETS_URL, REACT_APP_API_BASE_URL } from '../config/server.config';
import { useRouter } from 'next/router';
import { contextCookie } from '../services/Auth';
import Meta from '../components/Meta';
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function Profile({ profileDetails, products }) {
    const noti = new Notifier()
    const router = useRouter()
    const [tabIndex, setTabIndex] = useState(0);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [productQuality, setProductQuality] = useState([])
    const [deliveryTime, setDeliveryTime] = useState([])
    const [general, setGeneral] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState('')
    const [reviewsType, setReviewsType] = useState(1)

    const downloadLicense = () => {
        saveAs(REACT_APP_API_BASE_URL + '/get/file' + profileDetails.licensePath)
    }
    const typeChangeHandler = async (type) => {
        await setReviewsType(type)
        await setPage(0)
        await getReviews()
    }

    const fetchMoreData = () => {
        setPage(page + 1)
        getReviews();
    };

    const getReviews = async () => {
        setIsLoading(true)
        const review = await Rest.axiosRequest(API.reviews + `?slug=${profileDetails.slug
            }&page=${page}&limit=${5}`, {}, 'GET')
        if (review.status === 200) {
            const response = review.data;
            setCount(response.data[1].count)
            if (response.data[1].reviews.length) {
                setProductQuality([...productQuality, ...response.data[1].reviews]);
                setDeliveryTime([...deliveryTime, ...response.data[2].reviews]);
                setGeneral([...general, ...response.data[3].reviews]);
                setHasMore(true)
                setTimeout(() => {
                    setIsLoading(false)
                }, 200);
            } else {
                setIsLoading(false)
                setHasMore(false);
                return;
            }
        }
        else {
            setIsLoading(false)
            noti.notify(review.data.message, "danger");
        }
    }

    const handleMessage = () => {
        // if(!profileDetails.canMessage){
        //     noti.notify('You can message seller who is in your state only', "danger");
        // } else {
        router.push(`/messages/${slug}`);
        // }
    }
    return (
        <>
            <Meta title={profileDetails.brandName ? profileDetails.brandName + ` | ${APP_NAME}` : ''} keyword={''} description={''} />
            <section className="bg-black p-27-0-55">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="m-l-r-30">
                                <div className="box-dark mb-30 overflow-hidden">
                                    <ul className="d-flex justify-start flex-wrap">
                                        <li className="logo-box d-flex justify-content-center align-items-center ">
                                            <Figure className="mb-0 figure-circle figure-green-2 figure-120">
                                                <Figure.Image src={ASSETS_URL + profileDetails.brandLogo} className='cover circle' />
                                            </Figure>
                                        </li>
                                        <li className="seller-detail-wrap">
                                            <ul>
                                                <li className="seller-infor">
                                                    <h5 className='fs-24 fw-600 color-22a612 mb-2'>{Helper.niceString(profileDetails.brandName, 90, true)}</h5>
                                                    <ul className="inline-listing">
                                                        <li>
                                                            <a href={profileDetails.brandWebsite ?? ''} target="_blank" className="fs-14 fw-500 color-0598ff text-decoration-none">
                                                                {
                                                                    <><i className="icon-globe"></i>{Helper.niceString(profileDetails.brandWebsite, 20)}</>
                                                                } {!showSkeleton ? profileDetails.brandWebsite ? <FontAwesomeIcon icon={faExternalLink} /> : null : null}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a onClick={downloadLicense} className="fs-15 fw-600 color-22a612 text-decoration-none"><i className="icon-pdf-download"></i><span className="text-decoration-underline">Operating Licenses</span></a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="listing-33p">
                                                        <li>
                                                            <>
                                                                <span className="color-777777 fs-14 fw-500 text-center d-block">State</span>
                                                                <p className="fs-18 fw-600 color-white mb-0 text-center">{profileDetails.state}</p>
                                                            </>
                                                        </li>
                                                        <li>
                                                            <>
                                                                <span className="color-777777 fs-14 fw-500 text-center d-block">Year Founded</span>
                                                                <p className="fs-18 fw-600 color-white mb-0 text-center">{profileDetails.year ?? 'N/A'}</p>
                                                            </>
                                                        </li>
                                                        <li>
                                                            <>
                                                                <span className="color-777777 fs-14 fw-500 text-center d-block">Average order per month</span>
                                                                <p className="fs-18 fw-600 color-white mb-0 text-center">{profileDetails.avgOrder}</p>
                                                            </>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="listing-25p rating-listing">
                                        <li>
                                            <span className="fs-16 fw-500 color-777777 d-block mb-6">
                                                Product Quality
                                            </span>
                                            <p className="mb-0">
                                                <>
                                                    <span className="color-22a612" > <FontAwesomeIcon icon={faStar} /></span>
                                                    <span className="star-count">{profileDetails.avgProductRating}/5</span>
                                                    <span className="fs-14 fw-300 color-white"> ({profileDetails.reviewsProductCount} Reviews)</span>
                                                </>
                                            </p>
                                        </li>
                                        <li>
                                            <span className="fs-16 fw-500 color-777777 d-block mb-6">
                                                Delivers on Times
                                            </span>
                                            <p className="mb-0">
                                                <>
                                                    <span className="color-22a612"><FontAwesomeIcon icon={faStar} /></span>
                                                    <span className="star-count">{profileDetails.avgDOTRating}/5</span>
                                                    <span className="fs-14 fw-300 color-white">({profileDetails.reviewsDOTCount} Reviews)</span>
                                                </>
                                            </p>
                                        </li>
                                        <li>
                                            <span className="fs-16 fw-500 color-777777 d-block mb-6">
                                                Professionalism
                                            </span>
                                            <p className="mb-0">
                                                <>
                                                    <span className="color-22a612"><FontAwesomeIcon icon={faStar} /></span>
                                                    <span className="star-count">{profileDetails.avgGeneralRating}/5</span>
                                                    <span className="fs-14 fw-300 color-white">({profileDetails.reviewsGeneralCount} Reviews)</span>
                                                </>
                                            </p>
                                        </li>
                                        <li>
                                            <span className="fs-16 fw-500 color-white d-block mb-6">
                                                Brand Scrore
                                            </span>
                                            <p className="mb-0">
                                                <>
                                                    <span className="color-22a612"><FontAwesomeIcon icon={faStar} /></span>
                                                    <span className="fs-20 fw-600 color-22a612 m-l-10">{profileDetails.avgRating}/15</span>
                                                </>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <Card className="card-dark border-gray mb-30 overflow-hidden">
                                    <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">
                                        Description
                                    </Card.Header>
                                    <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09 p-20-20-30-20">
                                        {profileDetails.description}
                                    </Card.Body>
                                </Card>
                                <Card className="card-dark border-gray mb-30 overflow-hidden">
                                    <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">
                                        Product
                                    </Card.Header>
                                    <Card.Body className="bg-color-191919 p-0">
                                        <div className="table-wrap br-t-l-0 br-t-r-0">
                                            {/* <Table bordered hover variant="dark" id="seller_detail"> */}
                                            <ResponsiveTable className="table table-bordered table-hover table-dark" id="seller_detail">
                                                <Thead>
                                                    {
                                                        <Tr>
                                                            <Th width="180px;">Product Name</Th>
                                                            <Th className="text-center" width="180px;">Category</Th>
                                                            <Th className="text-center" width="130px;">Med/Rec</Th>
                                                            {/* <Th className="text-center" width="110px;">Price Per lb</Th> */}
                                                            <Th className="text-center" width="100px;">Stain</Th>
                                                            <Th className="text-center" width="100px;">THC%</Th>
                                                            <Th width="160px;">Dominant Terpene</Th>
                                                            <Th className="text-center" width="100px;">I/O</Th>
                                                            <Th className="text-center" width="140px;">Harvested</Th>
                                                        </Tr>
                                                    }
                                                </Thead>
                                                <Tbody>
                                                    {
                                                        products.length > 0 ?
                                                            products.map((rowData, keyIndex) => (
                                                                <Tr key={keyIndex + "product"}>
                                                                    <Td>
                                                                        <Link href={"/product/" + rowData.slug} >
                                                                            <a className="color-f3772c">{Helper.niceString(rowData.title, 15)}</a>
                                                                        </Link>
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        <Link href="#"><a className="color-white text-decoration-none">{rowData.category?.title}</a></Link>
                                                                    </Td>
                                                                    <Td className="text-center">{rowData.medRec?.title}</Td>
                                                                    {/* <Td className="text-center">{rowData.productPrice}</Td> */}
                                                                    <Td className="text-center">{rowData.strain?.title}</Td>
                                                                    <Td className="text-center">{rowData?.thc}%</Td>
                                                                    <Td>{Helper.niceString(rowData.dominant, 15)}</Td>
                                                                    <Td className="text-center">{rowData.io?.title}</Td>
                                                                    <Td className="text-center">{rowData.niceHarvested}</Td>
                                                                </Tr>
                                                            )) : <Tr>
                                                                <Td className="text-center" colSpan={10}>No records found!</Td>
                                                            </Tr>
                                                    }
                                                </Tbody>
                                            </ResponsiveTable>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <div className="custom-tabs">
                                    <Tabs
                                        defaultActiveKey="product"
                                        id="uncontrolled-tab"
                                    >
                                        <Tab eventKey="product" title="Product Quality">
                                            <ul className="comment-listing">
                                                {isLoading ?
                                                    [...Array(5)].map((d, index) => {
                                                        return (
                                                            <li className="comment-wrap" key={index}>
                                                                <Figure className="mb-0 w-60 h-60 br-50p">
                                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                        <Skeleton width={60} height={60} />
                                                                    </SkeletonTheme>
                                                                </Figure>
                                                                <div className="comment-detail">
                                                                    <h5 className="fs-16 fw-600 color-white mb-0">
                                                                        {isLoading ?
                                                                            <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                <Skeleton width={250} />
                                                                            </SkeletonTheme>
                                                                            : <>'Tina Lee' <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                <FontAwesomeIcon icon={faCalendarAlt} /> 11 Jan'22</date></>
                                                                        }
                                                                    </h5>
                                                                    {isLoading ?
                                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                            <Skeleton width={250} className="product-rating" />
                                                                        </SkeletonTheme>
                                                                        :
                                                                        <p className="product-rating">Product Quality <span>
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                        </span>
                                                                        </p>
                                                                    }
                                                                    <p className="fs-14 fw-300 color-white o-08 mt-6">{isLoading ?
                                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                            <Skeleton count={5} />
                                                                        </SkeletonTheme>
                                                                        : 'dummy text'}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                    :
                                                    <>
                                                        <InfiniteScroll
                                                            dataLength={productQuality.length}
                                                            next={fetchMoreData}
                                                            hasMore={hasMore}
                                                            loader={
                                                                isLoading ?
                                                                    [...Array(3)].map((elementInArray, index) => (
                                                                        <Card key={index}>
                                                                            <Card.Header>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <SkeletonTheme height={25} width={200} baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                            <Skeleton />
                                                                                        </SkeletonTheme>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <SkeletonTheme height={25} width={200} baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                            <Skeleton />
                                                                                        </SkeletonTheme>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Card.Header>
                                                                        </Card>
                                                                    )) : null
                                                            }
                                                        >
                                                            <>
                                                                {productQuality.length > 0 ? (
                                                                    productQuality.map((rowData, keyIndex) => (
                                                                        <li key={keyIndex + 'rview'} className="comment-wrap">
                                                                            <Figure className="mb-0 w-60 h-60 br-50p border-white-2">
                                                                                <Figure.Image src={ASSETS_URL + (rowData.retailer.profilePath ?? "/profile/no-profile-image.jpg")} className='cover circle' />
                                                                            </Figure>
                                                                            <div className="comment-detail">
                                                                                <h5 className="fs-16 fw-600 color-white mb-0">{rowData.retailer.fullName} <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10"><FontAwesomeIcon icon={faCalendarAlt} /> {moment(rowData.createdAt).format(customFormat)}</date></h5>
                                                                                <p className="product-rating">Product Quality<span>
                                                                                    <ReactStars
                                                                                        count={5}
                                                                                        size={13}
                                                                                        value={rowData.ratings}
                                                                                        isHalf={true}
                                                                                        emptyIcon={<div style={{ color: '#8c8c8c' }}> <i className="fas fa-star" /></div>}
                                                                                        halfIcon={<i className="fa fa-star-half-alt" />}
                                                                                        filledIcon={<i className="fa fa-star" />}
                                                                                        activeColor="#22a612"
                                                                                        edit={false}
                                                                                    />
                                                                                </span></p>
                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">{rowData.description}</p>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <div className="text-center"> No records found! </div>
                                                                )}
                                                            </>
                                                        </InfiniteScroll>
                                                    </>
                                                }
                                            </ul>
                                        </Tab>
                                        <Tab eventKey="deliveryTime" title="Delivery Time">
                                            <ul className="comment-listing">
                                                {isLoading ?
                                                    [...Array(5)].map((d, index) => {
                                                        return (
                                                            <li className="comment-wrap" key={index + 'dot'}>
                                                                <Figure className="mb-0 w-60 h-60 br-50p">
                                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                        <Skeleton width={60} height={60} />
                                                                    </SkeletonTheme>
                                                                </Figure>
                                                                <div className="comment-detail">
                                                                    <h5 className="fs-16 fw-600 color-white mb-0">
                                                                        {isLoading ?
                                                                            <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                <Skeleton width={250} />
                                                                            </SkeletonTheme>
                                                                            : <>'Tina Lee' <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                <FontAwesomeIcon icon={faCalendarAlt} /> 11 Jan'22</date></>
                                                                        }
                                                                    </h5>
                                                                    {isLoading ?
                                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                            <Skeleton width={250} className="product-rating" />
                                                                        </SkeletonTheme>
                                                                        :
                                                                        <p className="product-rating">Product Quality <span>
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                        </span>
                                                                        </p>
                                                                    }
                                                                    <p className="fs-14 fw-300 color-white o-08 mt-6">{isLoading ?
                                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                            <Skeleton count={5} />
                                                                        </SkeletonTheme>
                                                                        : 'dummy text'}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                    :
                                                    <>
                                                        <InfiniteScroll
                                                            dataLength={deliveryTime.length}
                                                            next={fetchMoreData}
                                                            hasMore={hasMore}
                                                            loader={
                                                                isLoading ?
                                                                    [...Array(3)].map((elementInArray, index) => (
                                                                        <Card key={index + 'infiniteScroll'}>
                                                                            <Card.Header>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <SkeletonTheme height={25} width={200} baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                            <Skeleton />
                                                                                        </SkeletonTheme>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <SkeletonTheme height={25} width={200} baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                            <Skeleton />
                                                                                        </SkeletonTheme>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Card.Header>
                                                                        </Card>
                                                                    )) : null
                                                            }
                                                        >
                                                            <>
                                                                {deliveryTime.length > 0 ? (
                                                                    deliveryTime.map((rowData, keyIndex) => (
                                                                        <li key={keyIndex + 'delivery'} className="comment-wrap">
                                                                            <Figure className="mb-0 w-60 h-60 br-50p border-white-2">
                                                                                <Figure.Image src={ASSETS_URL + (rowData.retailer.profilePath ?? "/profile/no-profile-image.jpg")} className='cover circle' />
                                                                            </Figure>
                                                                            <div className="comment-detail">
                                                                                <h5 className="fs-16 fw-600 color-white mb-0">{rowData.retailer.fullName} <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10"><FontAwesomeIcon icon={faCalendarAlt} /> {moment(rowData.createdAt).format(customFormat)}</date></h5>
                                                                                <p className="product-rating">Delivery on Time <span>
                                                                                    <ReactStars
                                                                                        count={5}
                                                                                        size={13}
                                                                                        value={rowData.ratings}
                                                                                        isHalf={true}
                                                                                        emptyIcon={<div style={{ color: '#8c8c8c' }}> <i className="fas fa-star" /></div>}
                                                                                        halfIcon={<i className="fa fa-star-half-alt" />}
                                                                                        filledIcon={<i className="fa fa-star" />}
                                                                                        activeColor="#22a612"
                                                                                        edit={false}
                                                                                    />
                                                                                </span></p>
                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">{rowData.description}</p>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <div className="text-center"> No records found! </div>
                                                                )}
                                                            </>
                                                        </InfiniteScroll>
                                                    </>
                                                }
                                            </ul>
                                        </Tab>
                                        <Tab eventKey="general" title="Professionalism">
                                            <ul className="comment-listing">
                                                {isLoading ?
                                                    [...Array(5)].map((d, index) => {
                                                        return (
                                                            <li key={index + "list"} className="comment-wrap">
                                                                <Figure className="mb-0 w-60 h-60 br-50p">
                                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                        <Skeleton width={60} height={60} />
                                                                    </SkeletonTheme>
                                                                </Figure>
                                                                <div className="comment-detail">
                                                                    <h5 className="fs-16 fw-600 color-white mb-0">
                                                                        {isLoading ?
                                                                            <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                <Skeleton width={250} />
                                                                            </SkeletonTheme>
                                                                            : <>'Tina Lee' <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10">
                                                                                <FontAwesomeIcon icon={faCalendarAlt} /> 11 Jan'22</date></>
                                                                        }
                                                                    </h5>
                                                                    {isLoading ?
                                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                            <Skeleton width={250} className="product-rating" />
                                                                        </SkeletonTheme>
                                                                        :
                                                                        <p className="product-rating">Product Quality <span>
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                            <FontAwesomeIcon icon={faStar} />
                                                                        </span>
                                                                        </p>
                                                                    }
                                                                    <p className="fs-14 fw-300 color-white o-08 mt-6">{isLoading ?
                                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                            <Skeleton count={5} />
                                                                        </SkeletonTheme>
                                                                        : 'dummy text'}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                    :
                                                    <>
                                                        <InfiniteScroll
                                                            dataLength={general.length}
                                                            next={fetchMoreData}
                                                            hasMore={hasMore}
                                                            loader={
                                                                isLoading ?
                                                                    [...Array(3)].map((elementInArray, index) => (
                                                                        <Card key={index + 'infi'}>
                                                                            <Card.Header>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <SkeletonTheme height={25} width={200} baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                            <Skeleton />
                                                                                        </SkeletonTheme>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <SkeletonTheme height={25} width={200} baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                            <Skeleton />
                                                                                        </SkeletonTheme>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Card.Header>
                                                                        </Card>
                                                                    )) : null
                                                            }
                                                        >
                                                            <>
                                                                {general.length > 0 ? (
                                                                    general.map((rowData, keyIndex) => (
                                                                        <li className="comment-wrap" key={keyIndex + "gen"}>
                                                                            <Figure className="mb-0 w-60 h-60 br-50p border-white-2">
                                                                                <Figure.Image src={ASSETS_URL + (rowData.retailer.profilePath ?? "/profile/no-profile-image.jpg")} className='cover circle' />
                                                                            </Figure>
                                                                            <div className="comment-detail">
                                                                                <h5 className="fs-16 fw-600 color-white mb-0">{rowData.retailer.fullName} <date className="fs-13 fw-500 color-8c8c8c f-style-italic p-l-10"><FontAwesomeIcon icon={faCalendarAlt} /> {moment(rowData.createdAt).format(customFormat)}</date></h5>
                                                                                <p className="product-rating">Professionalism <span>
                                                                                    <ReactStars
                                                                                        count={5}
                                                                                        size={13}
                                                                                        value={rowData.ratings}
                                                                                        isHalf={true}
                                                                                        emptyIcon={<div style={{ color: '#8c8c8c' }}> <i className="fas fa-star" /></div>}
                                                                                        halfIcon={<i className="fa fa-star-half-alt" />}
                                                                                        filledIcon={<i className="fa fa-star" />}
                                                                                        activeColor="#22a612"
                                                                                        edit={false}
                                                                                    />
                                                                                </span></p>
                                                                                <p className="fs-14 fw-300 color-white o-08 mt-6">{rowData.description}</p>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <div className="text-center"> No records found! </div>
                                                                )}
                                                            </>
                                                        </InfiniteScroll>
                                                    </>
                                                }
                                            </ul>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Profile;

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    if (!isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    try {
        let profileDetails = {};
        let products = [];
        const token = contextCookie(context, 'token');
        const response = await Rest.axiosRequest(API.getProfileDetails, {}, "GET", false, token);
        if (response.status === 200) {
            profileDetails = {
                brandName: response.data.data.brandData.brandName ?? '',
                slug: response.data.data.brandData.slug ?? '',
                brandWebsite: response.data.data.brandData.website ?? '',
                brandLogo: response.data.data.brandData.user.profilePath ?? "uploads/profile/seller-default.png",
                state: response.data.data.brandData.user.states.name ?? '',
                year: response.data.data.brandData.year ?? '',
                avgOrder: response.data.data.brandData.avgOrder ?? 0,
                avgProductRating: response.data.data.brandData.avgProductRating ?? 0,
                avgDOTRating: response.data.data.brandData.avgDOTRating ?? 0,
                avgGeneralRating: response.data.data.brandData.avgGeneralRating ?? 0,
                avgRating: response.data.data.brandData.avgRating ?? 0,
                description: response.data.data.brandData.description ?? '',
                // reviewsCount: response.data.data.brandData.reviewsCount ?? 0,
                reviewsDOTCount: response.data.data.brandData.reviewsDOTCount ?? 0,
                reviewsGeneralCount: response.data.data.brandData.reviewsGeneralCount ?? 0,
                reviewsProductCount: response.data.data.brandData.reviewsProductCount ?? 0,
                licensePath: response.data.data.brandData.user.licensePath ?? '',
            };
            products = response.data.data.products ?? [];
        } else {
            return {
                notFound: true
            };
        }
        return {
            props: {
                profileDetails,
                products,
            },
        };
    } catch (e) {
        // console.log(e.message);
        return {
            redirect: { destination: '/500' },
        };
    }
}