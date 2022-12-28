import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Table, Figure, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Notifier from '../components/Notifier'
import { SkeletonOptions } from '../services/SkeletonOptions';
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';
import { customFormat, dateTimeFormat, Helper } from '../services/Helper';
import { contextCookie } from '../services/Auth';
import Meta from '../components/Meta';
import { APP_NAME, ASSETS_URL } from '../config/server.config';

function Retailers(props) {
    const noti = new Notifier();
    const router = useRouter()
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [retailers, setRetailers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState();
    const [params, setParams] = useState({
        offset: props.queryString.offset ?? 0,
    });
    const [disabled, setDisabled] = useState(false);
    useEffect(async () => {
        setShowSkeleton(true);
        router.push('/retailers', { query: { ...params } }, undefined, { shallow: true })
        const response = await Rest.axiosRequest(API.retailerDetails + "/retailers" + '?' + `limit=${limit}&` + new URLSearchParams(params).toString(), {}, 'GET')
        if (response.status === 200) {
            setRetailers(response.data.data.retailers);
            setTotalPages(response.data.data.totalPages)
        } else {
            noti.notify(response.data.message, "danger");
        }
        setShowSkeleton(false);
    }, [new URLSearchParams(params).toString()])

    const handlePageChange = (event) => {
        setParams((prevState) => ({ ...prevState, offset: event.selected }))
    };

    return <>
        <Meta title={`Retailers | ${APP_NAME}`} keywords={''} description={''} />
        <section className="bg-black p-30-0-60">
            <Container>
                <Row>
                    <Col lg={12} className="mx-auto">
                        <Card className="card-dark border-gray p-15-20-30 br-10">
                            {/* <Card.Header className="border-btm-gray mb-20 p-l-0 p-r-0 p-t-0 p-b-13">
                                <Card.Title className="fs-18 fw-600 color-white mb-0">My Favourite</Card.Title>
                            </Card.Header> */}

                            <Card.Body className="p-0">
                                <div className="table-wrap CustomScrollbar CustomScrollbarY">
                                    <Table bordered hover className="table-head-bg-000 table-td-bg-191919" variant="dark" id="seller-favourite">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th width="275px;">State</th>
                                                <th width="200px;">Zipcode</th>
                                                <th width="250px;">Registerd on</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                showSkeleton ?
                                                    [...Array(5)].map((index) => {
                                                        return (
                                                            <tr key={index}>
                                                                {
                                                                    [...Array(4)].map((i) => {
                                                                        return (<td key={i}>
                                                                            <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                                                <Skeleton />
                                                                            </SkeletonTheme>
                                                                        </td>)
                                                                    })
                                                                }
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    retailers.length ?
                                                        retailers.map((retailer) => {
                                                            return (
                                                                <tr key={retailer.id}>
                                                                    <td>

                                                                        <Link
                                                                            href={`/customer/${retailer.slug}`}
                                                                            className="color-f3772c text-decoration-none d-flex align-items-center"
                                                                            legacyBehavior>
                                                                            <Figure className='figure-40 figure-circle mb-0 me-3'>
                                                                                <Image alt="profile" height={150} src={ASSETS_URL + retailer.profilePath} className="cover" />
                                                                            </Figure>{retailer.fullName}</Link>
                                                                    </td>
                                                                    <td> {retailer?.states?.name}</td>
                                                                    <td>{retailer.zipCode}</td>
                                                                    <td>{dateTimeFormat(retailer.createdAt, customFormat)}</td>
                                                                </tr>
                                                            );
                                                        })
                                                        : <tr>
                                                            <td className="text-center" colSpan={11}>No records found!</td>
                                                        </tr>
                                            }
                                        </tbody>
                                    </Table>
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

    </>;
}

export default Retailers

export async function getServerSideProps(context) {
    return {
        props: {
            queryString: context.query
        }
    }
}