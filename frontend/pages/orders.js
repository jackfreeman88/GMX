import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Form, Button, Table, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faCommentDots, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import Notifier from '../components/Notifier';
import Link from "next/link";
import { useRouter } from 'next/router'
import Rest from '../config/rest.config';
import API from '../config/endpoints.config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonOptions } from '../services/SkeletonOptions';
import moment from 'moment';
import Select from 'react-select';
import { DropdownIndicator, react_select_xs_Styles } from '../components/DropDown';
import ReactPaginate from 'react-paginate';
import { Helper } from '../services/Helper';
import { CustomLadda } from '../components/CustomLadda';
import { contextCookie } from '../services/Auth';
import Meta from '../components/Meta';
import { APP_NAME } from '../config/server.config';
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function MyOrdersSeller(props) {
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
    const [disableAllBtn, setDisableAllBtn] = useState(false);

    useEffect(async () => {
        setShowSkeleton(true);
        router.push('/orders', { query: { ...params } }, undefined, { shallow: true })
        const response = await Rest.axiosRequest(API.myOrdersSeller + '?' + `limit=${limit}&` + new URLSearchParams(params).toString(), {}, 'GET')
        if (response.status === 200) {
            setOrders(response.data.data.orders);
            setTotalPages(response.data.data.totalPages)
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

    const handleAction = async (buttonId, orderId, action) => {
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
    return (
        <>
            <Meta title={`My Orders | ${APP_NAME}`} keywords='My Orders' description='My Orders' />
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
                                            <Form.Group className="search-form form-dark maxw-150 ">
                                                <Form.Control type="search" placeholder="Search by Keywords" name="keyword" onChange={onChangeSearch} value={keyword} />
                                                <Button variant="primary" className="btn-wh-35 br-8 bg-f3772c" onClick={() => setParams((prevState) => ({ ...prevState, ['keyword']: keyword }))}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                                            </Form.Group>
                                            {
                                                params.category !== '' || params.sortBy !== '' || params.keyword !== '' ?
                                                    <Form.Group className="form-inline form-dark form-group-h-33 mr-10">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip>Clear All</Tooltip>}
                                                        >
                                                            <Button variant="secondary" className="btn-wh-35 br-8 bg-f3772c ms-3" onClick={() => { setParams({ category: '', sortBy: '', keyword: '', offset: 0, }); setKeyword(''); }}><FontAwesomeIcon icon={faTimes} /></Button>
                                                        </OverlayTrigger>
                                                    </Form.Group>
                                                    : null
                                            }
                                        </Form>
                                    </div>
                                    <div className="table-wrap CustomScrollbar CustomScrollbarY">
                                        {/* <Table bordered hover variant="dark" id="seller-my-order"> */}
                                        <ResponsiveTable className="table table-bordered table-hover table-dark" id="seller-my-order">
                                            <Thead>
                                                <Tr>
                                                    <Th className="text-center" width="85px;">Order ID</Th>
                                                    <Th className="text-start" width="145px;">Product & Category</Th>
                                                    <Th className="text-center" width="130px;">Customer Name</Th>
                                                    <Th className="text-center" width="40px;">Qty</Th>
                                                    {/* <Th className="text-center" width="100px;">Price per lb</Th> */}
                                                    <Th className="text-center" width="70px;">Total</Th>
                                                    <Th className="text-center" width="70px;">Status</Th>
                                                    <Th className="text-center" width="150px;">Action</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {
                                                    showSkeleton ?
                                                        [...Array(5)].map((index) => {
                                                            return (
                                                                <Tr key={index}>
                                                                    {
                                                                        [...Array(7)].map((i) => {
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
                                                                return (<Tr>
                                                                    <Td className="text-center">
                                                                        <p className="fs-14 color-dcdcdc fw-500">#{order.orderId ?? ''}</p>
                                                                        <p className="fs-14 color-dcdcdc fw-400 o-08">{moment(order.createdAt).format("DD MMM 'YY")}</p>
                                                                    </Td>
                                                                    <Td className='text-start'>
                                                                        <p className="fs-16 fw-600">{order.product?.title ? Helper.niceString(order.product?.title, 15, true) : ''}</p>
                                                                        <p className="fs-14 fw-400 color-bfbfbf">{order.category?.title ?? ''}</p>
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        <p className="fs-14 color-dcdcdc fw-500">
                                                                            <Link href={"/customer/" + order.retailer.slug}><a className="color-f3772c">{order.retailer.fullName ? Helper.niceString(order.retailer.fullName, 20, true) : ''}</a></Link></p>
                                                                        <Link href={`/messages/${order.retailer.slug}`}>
                                                                            <a className="btn-rounded w-30 h-30 btn-outline-secondary-transparent d-block table-chat-btn mx-auto">
                                                                                <span className="icon"><FontAwesomeIcon icon={faCommentDots} /></span></a>
                                                                        </Link>
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
                                                                                    : order.status === '4' ?
                                                                                        <p className="received">Delivered</p>
                                                                                        : order.status === '5' ?
                                                                                            <p className="received">Received</p>
                                                                                            : order.status === '6' ?
                                                                                                <p className="completed">Completed</p>
                                                                                                : ''
                                                                        }
                                                                    </Td>
                                                                    <Td className="text-right">
                                                                        <p className="d-flex justify-content-end align align-items-center">
                                                                            {order.status === '1' ?
                                                                                <>
                                                                                    <CustomLadda className="btn-outline-secondary-transparent br-30 p-7-15 fs-13 text-decoration-none" onClick={() => handleAction('accept-' + order.id, order.orderId, 'accepted')} disabled={disableAllBtn}>
                                                                                        Accept
                                                                                    </CustomLadda>
                                                                                    <CustomLadda className="btn-outline-red-transparent w-30 h-30 btn-circle close-btn m-l-10"
                                                                                        id={'cancelled-' + order.id}
                                                                                        onClick={() => handleAction('cancelled-' + order.id, order.orderId, 'cancelled')} disabled={disableAllBtn}>
                                                                                        <span className="icon">
                                                                                            <FontAwesomeIcon icon={faTimes} />
                                                                                        </span>
                                                                                    </CustomLadda>
                                                                                </>
                                                                                : order.status === '2' ?
                                                                                    <>
                                                                                        <CustomLadda className="btn-outline-secondary-transparent br-30 p-7-15 fs-13 text-decoration-none" onClick={() => handleAction('delivered-' + order.id, order.orderId, 'delivered')} disabled={disableAllBtn}>
                                                                                            Order Delivered
                                                                                        </CustomLadda>
                                                                                        <CustomLadda className="btn-outline-red-transparent w-30 h-30 btn-circle close-btn m-l-10" id={'cancelled-' + order.id} onClick={() => handleAction('cancelled-' + order.id, order.orderId, 'cancelled')} disabled={disableAllBtn}>
                                                                                            <span className="icon">
                                                                                                <FontAwesomeIcon icon={faTimes} />
                                                                                            </span>
                                                                                        </CustomLadda>
                                                                                    </>
                                                                                    : null
                                                                            }
                                                                        </p>
                                                                    </Td>
                                                                </Tr>)
                                                            })
                                                            : <Tr>
                                                                <Td className="text-center" colSpan={9}>No records found!</Td>
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
        </>
    )
}

export default MyOrdersSeller

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