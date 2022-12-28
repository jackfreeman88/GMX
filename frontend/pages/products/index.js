import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Col, Container, Row, Form, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faFilter, faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import ReactPaginate from 'react-paginate';
import Select from "react-select";
import { DropdownIndicator, react_select_xs_Styles, react_select_sm_Styles, } from "../../components/DropDown";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonOptions } from '../../services/SkeletonOptions';
import Notifier from '../../components/Notifier';
import { Helper } from '../../services/Helper';
import { Range } from 'react-range';
import FavouriteBtn from '../../components/FavouriteBtn';
import { contextCookie, getSingle } from '../../services/Auth';
import Meta from '../../components/Meta';
import { APP_NAME } from '../../config/server.config';
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
const moment = require('moment');

function ProductList(props) {
    const router = useRouter()
    const noti = new Notifier();
    const categoryRef = useRef(null);
    //const medRecRef = useRef(null);
    const strainRef = useRef(null);
    const ioRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    //  const [medRec, setMedRec] = useState([])
    const [strain, setStrain] = useState([])
    const [iO, setIO] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)
    const sortBy = [
        { id: 'desc', value: 'desc', name: 'Newest to Oldest', label: 'Newest to Oldest' },
        { id: 'asc', value: 'asc', name: 'Oldest to Newest', label: 'Oldest to Newest' },
    ];
    const [params, setParams] = useState({
        offset: props.queryString.offset ?? 0,
        sortBy: props.queryString.sortBy ?? '',
        keyword: props.queryString.keyword ?? '',
        category: props.queryString.category ?? '',
        // medRec: props.queryString.medRec ?? '',
        // priceMin: props.queryString.priceMin ?? '',
        // priceMax: props.queryString.priceMax ?? '',
        thcMin: props.queryString.thcMin ?? '',
        thcMax: props.queryString.thcMax ?? '',
        thc: props.queryString.thc ?? '',
        strain: props.queryString.strain ?? '',
        io: props.queryString.io ?? '',
    });
    const [filters, setFilters] = useState({
        filterKeyword: props.queryString.keyword ?? '',
        filterCategory: props.queryString.category ?? '',
        //filterMedRec: props.queryString.medRec ?? '',
        filterStrain: props.queryString.strain ?? '',
        filterIorO: props.queryString.io ?? '',
    })
    const [maxPrice, setMaxPrice] = useState(props.queryString.priceMax ?? '');
    const [maxThc, setMaxThc] = useState(props.queryString.thcMax ?? '');
    // const [priceRange, setPriceRange] = useState([props.queryString.priceMin ?? '', props.queryString.priceMax ?? ''])
    const [thcRange, setThcRange] = useState([props.queryString.thcMin ?? 0, props.queryString.thcMax ?? 0])
    const [totalPages, setTotalPages] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlePageChange = (event) => {
        setParams({
            ...params, offset: event.selected
        })
    };
    const handleChangeSort = (val, e) => {
        if (val) {
            setParams((prevState) => ({ ...prevState, [e.name]: val.value }))
        } else {
            setParams((prevState) => ({ ...prevState, [e.name]: '' }))
        }
    }
    const handleFilterChange = (val, e) => {
        if (val) {
            setFilters((prevState) => ({ ...prevState, [e.name]: val.value }))
        } else {
            setFilters((prevState) => ({ ...prevState, [e.name]: '' }))
        }
    }
    useEffect(() => {
        setIsLoading(true)
        router.push('/products/', { query: { ...params } }, undefined, { shallow: true })
        const getProducts = async () => {
            const result = await Rest.axiosRequest(API.getProductList + `?limit=10&` + new URLSearchParams(params).toString(), {}, 'GET')
            if (result.status === 200) {
                setIsLoading(false)
                const response = result.data;
                setProducts(response.data.products)
                setTotalPages(response.data.totalPages)
                setMaxPrice(response.data.maxValue.price)
                setMaxThc(response.data.maxValue.thc)

                // if (
                //     !isFiltered &&
                //     !router.query.priceMin &&
                //     !router.query.priceMax &&
                //     !router.query.thcMin &&
                //     !router.query.thcMax
                // ) {
                //     setPriceRange([
                //         0, response.data.maxValue.price,
                //     ])
                //     setThcRange([0, response.data.maxValue.thc])
                // }
                if (
                    !isFiltered &&
                    !router.query.thcMin &&
                    !router.query.thcMax
                ) {
                    setThcRange([0, response.data.maxValue.thc])
                }
            } else {
                setIsLoading(false)
                noti.notify(result.data.message, "danger")
            }
        }
        getProducts()
    }, [new URLSearchParams(params).toString()])

    useEffect(() => {
        Promise.all([Rest.axiosRequest(API.getCategories, {}, 'GET'),/* Rest.axiosRequest(API.getMedrec, {}, 'GET'),*/ Rest.axiosRequest(API.getStrains, {}, 'GET'), Rest.axiosRequest(API.getIO, {}, 'GET')])
            .then(function (results) {
                const categoriesData = results[0].data.data;
                //const medRecData = results[1].data.data;
                const strainData = results[1].data.data;
                const ioData = results[2].data.data;
                setCategories(categoriesData)
                //  setMedRec(medRecData)
                setStrain(strainData)
                setIO(ioData)
            });
    }, [])

    const onChangeSearch = (e) => {
        if (e.target.value) {
            setFilters((prevState) => ({ ...prevState, filterKeyword: e.target.value }))
        } else {
            setParams((prevState) => ({ ...prevState, keyword: '' }))
        }
    }
    const onHandleSearch = (e) => {
        setShow(false)
        setParams((prevState) => ({ ...prevState, keyword: filters.filterKeyword }))
    }
    const filterSubmit = () => {
        setShow(false)
        setParams((prevState) => ({ ...prevState, category: filters.filterCategory }))
        //setParams((prevState) => ({ ...prevState, medRec: filters.filterMedRec }))
        setParams((prevState) => ({ ...prevState, strain: filters.filterStrain }))
        setParams((prevState) => ({ ...prevState, io: filters.filterIorO }))
        // setParams((prevState) => ({ ...prevState, priceMin: priceRange[0] }))
        // setParams((prevState) => ({ ...prevState, priceMax: priceRange[1] }))
        setParams((prevState) => ({ ...prevState, thcMax: thcRange[1] }))
        setParams((prevState) => ({ ...prevState, thcMin: thcRange[0] }))
        setParams((prevState) => ({ ...prevState, keyword: filters.filterKeyword }))
        setIsFiltered(true)
    }
    const resetFilter = () => {
        setShow(false)
        setIsFiltered(false)
        setParams({
            offset: 0,
            sortBy: '',
            keyword: '',
            category: '',
            // medRec: '',
            // priceMin: '',
            // priceMax: '',
            thc: '',
            strain: '',
            io: '',
        })
        setFilters({
            filterKeyword: '',
            filterCategory: '',
            filterMedRec: '',
            filterStrain: '',
            filterIorO: '',
        })
        // setPriceRange([0, maxPrice])
        setThcRange([0, maxThc])
        categoryRef.current.clearValue()
        // medRecRef.current.clearValue()
        strainRef.current.clearValue()
        ioRef.current.clearValue()
    }

    const handleCategoryFilter = (catId) => {
        setFilters((prevState) => ({ ...prevState, filterCategory: catId }))
        setParams((prevState) => ({ ...prevState, category: catId }))
    }
    const onHandleSearchReset = (e) => {
        setParams((prevState) => ({ ...prevState, keyword: '' }))
        setFilters((prevState) => ({ ...prevState, filterKeyword: '' }))
    }
    return <>
        <Meta title={`Products | ${APP_NAME}`} keywords={''} description={''} />
        <section className="bg-black p-20-0-50">
            <Container>
                <Row>
                    <Col lg={12} className="mx-auto">
                        <div className="tabel-with-filetr">
                            <div className="d-flex justify-content-between flex-wrap bg-color-282828 p-10-20-10-20 table-top-filter">
                                <Form className="d-flex justify-content-flex-start align-items-center filter-form mb-0">
                                    <Form.Group className="form-inline form-dark form-group-h-33 mr-10">
                                        <Form.Label>Sort By:</Form.Label>
                                        <Select
                                            classNamePrefix="react-select"
                                            className="react-select-lg maxw-150"
                                            styles={react_select_xs_Styles}
                                            options={sortBy.map(({ value, name }) => ({
                                                value: value,
                                                label: name,
                                            }))}
                                            value={sortBy.filter((item) => item.value == params.sortBy)}
                                            onChange={(val, e) => handleChangeSort(val, e)}
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
                                <Button varient="primary" onClick={handleShow} className="btn btn-wh-110-28 br-6 "><span className='fs-14 me-2'><FontAwesomeIcon icon={faFilter} /></span> Filter</Button>

                                <Offcanvas show={show} onHide={handleClose} placement={'end'} className="dark-canvas">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>Filter</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Row>
                                            <Col md={12}>
                                                <div className='d-flex align-items-start'>
                                                    <Form.Group className="search-form form-dark">
                                                        <Form.Control onChange={onChangeSearch} type="text" value={filters.filterKeyword} placeholder="Search by Keywords" />
                                                        <Button varient="primary" onClick={onHandleSearch} className="btn-wh-35 br-8 bg-f3772c"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                                                    </Form.Group>
                                                    {
                                                        filters.filterKeyword !== '' ?
                                                            <Form.Group className="mb-3 ms-3">
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={<Tooltip>Clear</Tooltip>}
                                                                >
                                                                    <Button variant="secondary" className="btn-wh-42 br-8 bg-f3772c" onClick={onHandleSearchReset} ><FontAwesomeIcon icon={faTimes} /></Button>
                                                                </OverlayTrigger>
                                                            </Form.Group> : null
                                                    }
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="form-dark mb-4">
                                                    <Form.Label>Category</Form.Label>
                                                    {params.category ? (
                                                        <Select
                                                            ref={categoryRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={categories.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            value={
                                                                categories.map((data) => (
                                                                    data.id == filters.filterCategory
                                                                        ? { 'value': data.id, 'label': data.title }
                                                                        : null
                                                                ))
                                                            }
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select category"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterCategory"
                                                            isClearable={true}
                                                        />
                                                    ) : (
                                                        <Select
                                                            ref={categoryRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={categories.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select category"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterCategory"
                                                            isClearable={true}
                                                        />
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            {/* <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    <Form.Label>Med/Rec</Form.Label>
                                                    {params.medRec ? (
                                                        <Select
                                                            ref={medRecRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={medRec.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            value={
                                                                medRec.map((data) => (
                                                                    data.id == filters.filterMedRec
                                                                        ? { 'value': data.id, 'label': data.title }
                                                                        : null
                                                                ))
                                                            }
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select Med / Rec"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterMedRec"
                                                            isClearable={true}
                                                        />
                                                    ) : (
                                                        <Select
                                                            ref={medRecRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={medRec.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select Med/Rec"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterMedRec"
                                                            isClearable={true}
                                                        />
                                                    )}
                                                </Form.Group>
                                            </Col> */}
                                            {/* <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    <Form.Label>Price</Form.Label>
                                                    <Form.Label className='float-end'>${priceRange[0] == '' ? 0 : priceRange[0]} - ${priceRange[1]}</Form.Label>
                                                    <div className="form-control">

                                                        <Range
                                                            values={priceRange}
                                                            step={1}
                                                            min={0}
                                                            max={maxPrice}
                                                            onChange={(priceRange) => {
                                                                setPriceRange(priceRange);
                                                            }}
                                                            renderTrack={({ props, children }) => (
                                                                <div
                                                                    onMouseDown={props.onMouseDown}
                                                                    onTouchStart={props.onTouchStart}
                                                                    style={{
                                                                        ...props.style,
                                                                        height: '40px',
                                                                        display: 'flex',
                                                                        width: '100%'
                                                                    }}
                                                                >
                                                                    <div
                                                                        ref={props.ref}
                                                                        style={{
                                                                            height: '5px',
                                                                            width: '100%',
                                                                            borderRadius: '4px',
                                                                            backgroundColor: '#575757',
                                                                            alignSelf: 'center'
                                                                        }}
                                                                    >
                                                                        {children}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            renderThumb={({ props, isDragged }) => (
                                                                <div
                                                                    {...props}
                                                                    style={{
                                                                        ...props.style,
                                                                        height: '16px',
                                                                        width: '16px',
                                                                        borderRadius: '25px',
                                                                        backgroundColor: '#FFF',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        border: '3px solid #f3772c'
                                                                    }}
                                                                >
                                                                </div>
                                                            )}
                                                            allowOverlap={true}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col> */}
                                            <Col md={12}>
                                                <Form.Group className="form-dark mb-4">
                                                    <Form.Label>THC%</Form.Label>
                                                    <Form.Label className='float-end'>{thcRange[0] == '' ? 0 : thcRange[0]}% - {thcRange[1]}%</Form.Label>
                                                    <div className="form-control">
                                                        <Range
                                                            values={thcRange}
                                                            step={1}
                                                            min={0}
                                                            max={maxThc ?? 5}
                                                            onChange={(thcRange) => {
                                                                setThcRange(thcRange);
                                                            }}
                                                            renderTrack={({ props, children }) => (
                                                                <div
                                                                    onMouseDown={props.onMouseDown}
                                                                    onTouchStart={props.onTouchStart}
                                                                    style={{
                                                                        ...props.style,
                                                                        height: '40px',
                                                                        display: 'flex',
                                                                        width: '100%'
                                                                    }}
                                                                >
                                                                    <div
                                                                        ref={props.ref}
                                                                        style={{
                                                                            height: '5px',
                                                                            width: '100%',
                                                                            borderRadius: '4px',
                                                                            backgroundColor: '#575757',
                                                                            alignSelf: 'center'
                                                                        }}
                                                                    >
                                                                        {children}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            renderThumb={({ props, isDragged }) => (
                                                                <div
                                                                    {...props}
                                                                    style={{
                                                                        ...props.style,
                                                                        height: '16px',
                                                                        width: '16px',
                                                                        borderRadius: '25px',
                                                                        backgroundColor: '#FFF',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        border: '3px solid #f3772c'
                                                                    }}
                                                                >
                                                                </div>
                                                            )}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    <Form.Label>Strain</Form.Label>
                                                    {params.strain ? (
                                                        <Select
                                                            ref={strainRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={strain.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            value={
                                                                strain.map((data) => (
                                                                    data.id == filters.filterStrain
                                                                        ? { 'value': data.id, 'label': data.title }
                                                                        : null
                                                                ))
                                                            }
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select strain"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterStrain"
                                                            isClearable={true}
                                                        />
                                                    ) : (
                                                        <Select
                                                            ref={strainRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={strain.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select strain"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterStrain"
                                                            isClearable={true}
                                                        />
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    <Form.Label>I/O</Form.Label>
                                                    {params.io ? (
                                                        <Select
                                                            ref={ioRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={iO.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            value={
                                                                iO.map((data) => (
                                                                    data.id == filters.filterIorO
                                                                        ? { 'value': data.id, 'label': data.title }
                                                                        : null
                                                                ))
                                                            }
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select strain"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterIorO"
                                                            isClearable={true}
                                                        />
                                                    ) : (
                                                        <Select
                                                            ref={ioRef}
                                                            classNamePrefix="react-select"
                                                            className="react-select-lg"
                                                            styles={react_select_sm_Styles}
                                                            options={iO.map(({ id, title }) => ({
                                                                value: id,
                                                                label: title,
                                                            }))}
                                                            onChange={(val, e) => handleFilterChange(val, e)}
                                                            placeholder="Select I/O"
                                                            components={{
                                                                DropdownIndicator,
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                            name="filterIorO"
                                                            isClearable={true}
                                                        />
                                                    )}
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <div className="d-flex justify-content-between align-item-center">
                                                    <Button onClick={resetFilter} className="btn-wh-120-41 btn-outline-secondary-transparent br-6 bs-none">Clear</Button>

                                                    <Button variant="primary" onClick={filterSubmit} className="btn-wh-120-41 br-6  bs-none"><span className='me-2'><FontAwesomeIcon icon={faFilter} /></span>Filter</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                            <div className="table-wrap CustomScrollbar CustomScrollbarY">
                                {/* <Table bordered hover id="list_table" className="table-head-bg-101010" variant="dark"> */}
                                <ResponsiveTable id="list_table" className="table table-bordered table-hover table-dark table-head-bg-101010">
                                    <Thead>
                                        <Tr>
                                            <Th width="250px;">Brand Name</Th>
                                            <Th width="250px;">Product Name</Th>
                                            {/* <Th className="text-center" width="100px;">Med/Rec</Th>
                                            <Th className="text-center" width="140px;">Price Per lb</Th> */}
                                            <Th className="text-center" width="70px;">Strain</Th>
                                            <Th className="text-center" width="90px;">THC%</Th>
                                            <Th className="text-center" width="200px;">Flavor</Th>
                                            <Th className="text-center" width="200px;">Dominant<br />Terpene</Th>
                                            <Th className="text-center" width="90px;">I/O</Th>
                                            <Th className="text-center" width="100px;">Harvested</Th>
                                            <Th className="text-center" width="100px;">Unit Size</Th>
                                            <Th className="text-center" width="300px;">Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            isLoading ?
                                                [...Array(10)].map((value, key) => (
                                                    <Tr key={'tr-' + key}>
                                                        {
                                                            [...Array(12)].map((v, k) => {
                                                                return (<Td key={'td-' + k}>
                                                                    <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                        <Skeleton />
                                                                    </SkeletonTheme>
                                                                </Td>)
                                                            })
                                                        }
                                                    </Tr>
                                                )
                                                ) :
                                                products.length > 0 ?
                                                    products.map((productRow, index) => (
                                                        <Tr key={index + 'product'}>
                                                            <Td>
                                                                <Link
                                                                    href={"/brand/" + productRow.user.brand.slug}
                                                                    className="color-22a612"
                                                                    legacyBehavior> {Helper.niceString(productRow.user.brand.brandName, 20, true)} </Link>
                                                            </Td>
                                                            <Td>
                                                                <Link
                                                                    href={"/product/" + productRow.slug}
                                                                    className="color-f3772c"
                                                                    legacyBehavior>{Helper.niceString(productRow.title, 15, true)}</Link>
                                                                <br />
                                                                {Helper.niceString(productRow.category?.title, 14, true)}
                                                            </Td>
                                                            {/* <Td className="text-center">{productRow.medRec.title}</Td>
                                                            <Td className="text-center">{productRow.productPrice}</Td> */}
                                                            <Td className="text-center">{productRow.strain?.title}</Td>
                                                            <Td className="text-center">{productRow?.thc}%</Td>
                                                            <Td className="text-center">{productRow.flavor}</Td>
                                                            <Td className="text-center">{Helper.niceString(productRow.dominant, 15, true)}</Td>
                                                            <Td className="text-center">{productRow.io?.title}</Td>
                                                            <Td className="text-center">{productRow.niceHarvested}</Td>
                                                            <Td className="text-center">{productRow.unit}</Td>
                                                            <Td className="text-center">
                                                                {getSingle('role') !== '2' ?
                                                                    <>
                                                                        {
                                                                            props.isLoggedIn ?
                                                                                <FavouriteBtn isFavourite={productRow.productFavourites.length} productSlug={productRow.slug} />
                                                                                :
                                                                                <Link href={'/sign-in'} legacyBehavior>

                                                                                    <FavouriteBtn isFavourite={false} productSlug={productRow.slug} />

                                                                                </Link>
                                                                        }
                                                                        {
                                                                            props.isLoggedIn ?
                                                                                <Link
                                                                                    href={`/messages/${productRow.user?.brand?.slug}`}
                                                                                    className="action-btn color-f3772c"
                                                                                    legacyBehavior><FontAwesomeIcon icon={faCommentDots} /></Link>
                                                                                :
                                                                                <Link href={`/sign-in`} className="action-btn color-f3772c" legacyBehavior><FontAwesomeIcon icon={faCommentDots} /></Link>

                                                                        }
                                                                    </>
                                                                    : null}
                                                                <Link
                                                                    href={"/brand/" + productRow.user?.brand?.slug}
                                                                    className="action-btn color-white text-decoration-none"
                                                                    legacyBehavior> <i className="icon-user-view"></i></Link>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                    :
                                                    <Tr>
                                                        <Td className="text-center" colSpan={11}>No records found!</Td>
                                                    </Tr>
                                        }
                                    </Tbody>
                                </ResponsiveTable>
                            </div>
                        </div>
                        <div className='mt-5 d-flex justify-content-center'>
                            {totalPages > 1 ?
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
                                    forcePage={parseInt(router.query.offset ?? 0)}
                                /> : null}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>;
}

export default ProductList;

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    // if (!isLoggedIn) {
    //     return {
    //         redirect: { destination: "/" },
    //     };
    // }
    return {
        props: {
            queryString: context.query,
            isLoggedIn
        },
    };
}