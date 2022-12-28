import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Col, Container, Row, Form, Card } from "react-bootstrap";
import Select from "react-select";
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonOptions } from '../../services/SkeletonOptions';
import Notifier from '../../components/Notifier';
import { Helper } from '../../services/Helper';
import { contextCookie, getSingle } from '../../services/Auth';
import Meta from '../../components/Meta';
import { APP_NAME } from '../../config/server.config';
import { DropdownIndicator, react_select_xs_Styles } from '../../components/DropDown';
import moment from 'moment';

function RequestedQuotes(props) {
    const router = useRouter()
    const noti = new Notifier();
    const [isLoading, setIsLoading] = useState(false);
    const [requestedQuotes, setRequestedQuotes] = useState([])
    const [params, setParams] = useState({
        offset: props.queryString.offset ?? 0,
        sortBy: props.queryString.sortBy ?? '',
    });
    const [totalPages, setTotalPages] = useState();
    const sortBy = [
        { id: 'desc', value: 'desc', name: 'Newest to Oldest', label: 'Newest to Oldest' },
        { id: 'asc', value: 'asc', name: 'Oldest to Newest', label: 'Oldest to Newest' },
    ];
    const handleChangeSort = (val, e) => {
        if (val) {
            setParams((prevState) => ({ ...prevState, [e.name]: val.value }))
        } else {
            setParams((prevState) => ({ ...prevState, [e.name]: '' }))
        }
    }
    const handlePageChange = (event) => {
        setParams({
            ...params, offset: event.selected
        })
    };
    useEffect(() => {
        setIsLoading(true)
        router.push('/requested-quotes/', { query: { ...params } }, undefined, { shallow: true })
        const getRequestedQuotes = async () => {
            const result = await Rest.axiosRequest(API.getRequestedQuotes + `?limit=10&` + new URLSearchParams(params).toString(), {}, 'GET')
            if (result.status === 200) {
                setIsLoading(false)
                const response = result.data;
                setRequestedQuotes(response.data.requestedQuotes)
                setTotalPages(response.data.totalPages)
            } else {
                setIsLoading(false)
                noti.notify(result.data.message, "danger")
            }
        }
        getRequestedQuotes()
    }, [new URLSearchParams(params).toString()])

    return <>
        <Meta title={`Quote Requests | ${APP_NAME}`} keywords={''} description={''} />
        <section className="bg-black p-20-0-50">
            <Container>
                <Row>
                    <Col lg={12} className="mx-auto">
                        <Card className="card-dark border-gray p-8-21-30 br-10">
                            <Card.Header className="d-flex justify-content-between align-items-center border-btm-gray mb-20 p-l-0 p-r-0 p-t-0 p-b-6">
                                <Card.Title className="fs-18 fw-600 color-dcdcdc mb-0">My Requested Quotes</Card.Title>
                            </Card.Header>

                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between flex-wrap mb-20">
                                    <Form className="d-flex justify-content-flex-start align-items-center filter-form flex-md-nowrap flex-wrap filter-form order-filter">
                                        <Form.Group className="form-inline form-dark form-group-h-33 me-md-3 me-0 mb-sm-2 flex-fill">
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
                                </div>
                                <div className="table-wrap CustomScrollbar CustomScrollbarY">
                                    <ResponsiveTable className="table table-bordered table-hover table-dark form-dark" id="Quotes-list">
                                        {/* <Table bordered hover variant="dark" id="requested-quotes"> */}
                                        <Thead>
                                            <Tr>
                                                <Th width="250px;">Quote ID</Th>
                                                <Th width="250px;">Date</Th>
                                                <Th width="250px;">Brand Name</Th>
                                                <Th width="250px;">Quantity</Th>
                                                <Th className="text-center" width="70px;">Status</Th>
                                                <Th className="text-center" width="300px;">Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                isLoading ?
                                                    [...Array(10)].map((value, key) => (
                                                        <Tr key={'tr-' + key}>
                                                            {
                                                                [...Array(6)].map((v, k) => {
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
                                                    requestedQuotes.length > 0 ?
                                                        requestedQuotes.map((row, index) => (
                                                            <Tr key={index + 'product'}>
                                                                <Td>
                                                                    <Link
                                                                        href={"/requested-quotes/" + row.quoteId}
                                                                        className="fs-14 fw-500 color-f3772c"
                                                                        legacyBehavior>#{row.quoteId ?? ''}</Link>
                                                                </Td>
                                                                <Td>
                                                                    <p className="fs-14 color-dcdcdc fw-500">{moment(row.createdAt).format("DD MMM 'YY")}</p>
                                                                </Td>
                                                                <Td>
                                                                    <Link href={"/brand/" + row.brand.slug} className="color-22a612" legacyBehavior> {Helper.niceString(row.brand.brandName, 20, true)} </Link>
                                                                </Td>
                                                                <Td>
                                                                    {row.totalQuantity}
                                                                </Td>
                                                                <Td className="text-center">{row.status === '1' ? 'Requested' : row.status === '2' ? 'Quoted' : 'Cancelled'}</Td>
                                                                <Td className="text-center">
                                                                    <Link
                                                                        href={"/requested-quotes/" + row.quoteId}
                                                                        className="action-btn color-white text-decoration-none"
                                                                        legacyBehavior> <FontAwesomeIcon icon={faEye} /></Link>
                                                                </Td>
                                                            </Tr>
                                                        ))
                                                        :
                                                        <Tr>
                                                            <Td className="text-center" colSpan={11}>No records found!</Td>
                                                        </Tr>
                                            }
                                        </Tbody>
                                        {/* </Table> */}
                                    </ResponsiveTable>
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    </>;
}

export default RequestedQuotes;

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
    return {
        props: {
            queryString: context.query
        },
    };
}