import React, { useEffect, useState, createContext } from 'react'
import { Card, Col, Container, Row, Form, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faCirclePlus, faEdit, faEye, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import API from '../../config/endpoints.config';
import Rest from '../../config/rest.config';
import moment from 'moment';
import Notifier from '../../components/Notifier'
import Select from "react-select";
import { DropdownIndicator, react_select_xs_Styles } from "../../components/DropDown";
import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Helper } from '../../services/Helper';
import { contextCookie } from '../../services/Auth';
import Meta from '../../components/Meta';
import { APP_NAME } from '../../config/server.config';
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import ProductRow from '../../components/ProductRow';

const baseColor = "#202020";
const highlightColor = "#444";
export const CategoriesContext = createContext()

function MyProducts(props) {
    const noti = new Notifier();
    const router = useRouter();
    const [params, setParams] = useState({
        category: props.queryString.category ?? '',
        sortBy: props.queryString.sortBy ?? '',
        keyword: props.queryString.keyword ?? '',
        offset: props.queryString.offset ?? 0,
    });
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [medrecData, setMedrecData] = useState([]);
    const [strainsData, setStrainsData] = useState([]);
    const [ioData, setIoData] = useState([]);
    const [keyword, setKeyword] = useState(props.queryString.keyword ?? '');
    const sortBy = [
        { id: 'desc', value: 'desc', name: 'Newest to Oldest', label: 'Newest to Oldest' },
        { id: 'asc', value: 'asc', name: 'Oldest to Newest', label: 'Oldest to Newest' },
    ];
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState();

    useEffect(async () => {
        setShowSkeleton(true);
        router.push('/product/list', { query: { ...params } }, undefined, { shallow: true })
        const response = await Rest.axiosRequest(API.getMyProducts + '?' + `limit=${limit}&` + new URLSearchParams(params).toString(), {}, 'GET')
        if (response.status === 200) {
            setProducts(response.data.data.product);
            setTotalPages(response.data.data.totalPages)
        } else {
            noti.notify(response.data.message, "danger");
        }
        if (!categories.length) {
            const categoriesData = await Rest.axiosRequest(API.getCategories, {}, 'GET')
            if (categoriesData.status === 200) {
                const categories = [];
                categoriesData.data.data.map((category) => {
                    categories.push({ id: category.id, value: category.id, name: category.title, label: category.title });
                })
                setCategories(categories);
            } else {
                noti.notify(categoriesData.data.message, "danger");
            }
        }
        setShowSkeleton(false);
    }, [new URLSearchParams(params).toString()])

    useEffect(async () => {
        try {
            const medrecData = await Rest.axiosRequest(API.getMedrec, {}, 'GET', false)
            if (medrecData.status === 200) {
                const medrec = [];
                medrecData.data.data.map((value) => {
                    medrec.push({ id: value.id, value: value.id, name: value.title, label: value.title });
                })
                setMedrecData(medrec);
            }

            const strainsData = await Rest.axiosRequest(API.getStrains, {}, 'GET', false)
            if (strainsData.status === 200) {
                const strains = [];
                strainsData.data.data.map((value) => {
                    strains.push({ id: value.id, value: value.id, name: value.title, label: value.title });
                })
                setStrainsData(strains);
            }

            const ioData = await Rest.axiosRequest(API.getIO, {}, 'GET', false)
            if (ioData.status === 200) {
                const ioroData = [];
                ioData.data.data.map((value) => {
                    ioroData.push({ id: value.id, value: value.id, name: value.title, label: value.title });
                })
                setIoData(ioroData);
            }
        } catch (e) {
            console.log(e.message)
        }
    }, []);

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
    const handleStatusChange = async (slug) => {
        const response = await Rest.axiosRequest(API.changeProductStatus + '/' + slug, {})
        if (response.data.status) {
            if (+response.data.data.isActive === 1) {
                document.getElementById('action-' + slug).classList.remove('fa-check')
                document.getElementById('action-' + slug).classList.add('fa-ban')
            } else {
                document.getElementById('action-' + slug).classList.add('fa-check')
                document.getElementById('action-' + slug).classList.remove('fa-ban')
            }
            noti.notify(response.data.message, 'success')
        } else {
            noti.notify(response.data.message, 'danger')
        }
    }

    const handleCategoryFilter = (catId) => {
        setParams((prevState) => ({ ...prevState, category: catId }))
    }
    return (
        <>
            <CategoriesContext.Provider value={{ categories, medrecData, strainsData, ioData }}>
                <Meta title={`My Products | ${APP_NAME}`} keywords={'My Products'} description={'My Products'} />
                <section className="bg-black p-30-0-60">
                    <Container>
                        <Row>
                            <Col lg={12} className="mx-auto">
                                <Card className="card-dark border-gray p-8-21-30 br-10">
                                    <Card.Header className="d-flex justify-content-between align-items-center border-btm-gray mb-20 p-l-0 p-r-0 p-t-0 p-b-6">
                                        <Card.Title className="fs-18 fw-600 color-dcdcdc mb-0">My Product</Card.Title>
                                        <Link href='/product/add'><a className="btn btn-primary btn-wh-130-38 br-6"><span className='me-2'><FontAwesomeIcon icon={faCirclePlus} /></span>Add Product</a></Link>
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
                                            {/* <Table bordered hover variant="dark" id="seller-product" className='form-dark'> */}
                                            <ResponsiveTable className="table table-bordered table-hover table-dark form-dark" id="seller-product">
                                                <Thead>
                                                    <Tr>
                                                        <Th width="200px">Product Name</Th>
                                                        <Th width="100px">Category</Th>
                                                        <Th width="130px">Med/Rec</Th>
                                                        {/* <Th width="100px">Price Per lb</Th> */}
                                                        <Th width="70px">Strain</Th>
                                                        <Th width="70px">THC%</Th>
                                                        <Th width="150px">Flavor</Th>
                                                        <Th width="150px">Dominant Terpene</Th>
                                                        <Th width="100px">I/O</Th>
                                                        <Th width="100px">Harvested</Th>
                                                        <Th width="100px">Unit Size</Th>
                                                        <Th width="180px">Action</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {
                                                        showSkeleton ?
                                                            [...Array(5)].map((arrayData, index) => {
                                                                return (
                                                                    <Tr key={index + 'loader'}>
                                                                        {
                                                                            [...Array(11)].map((data, sIndex) => {
                                                                                return (<Td key={sIndex + "skeleton"}>
                                                                                    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                                                                                        <Skeleton />
                                                                                    </SkeletonTheme>
                                                                                </Td>)
                                                                            })
                                                                        }
                                                                    </Tr>
                                                                )
                                                            })
                                                            :
                                                            products.length ?
                                                                products.map((product, i) => {
                                                                    return (<ProductRow key={i} product={product} handleStatusChange={handleStatusChange} categories={categories} handleCategoryFilter={handleCategoryFilter} isLastRow={i === products.length - 1 && products.length > 1} />)
                                                                })
                                                                : <Tr>
                                                                    <Td className="text-center" colSpan={10}>No records found!</Td>
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
                                                        //marginPagesDisplayed={1}
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
            </CategoriesContext.Provider>
        </>
    )
}

export default MyProducts

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
        },
    };
}