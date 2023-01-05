import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Notifier from '../../components/Notifier'
import { SkeletonOptions } from '../../services/SkeletonOptions';
import API from '../../config/endpoints.config';
import Rest from '../../config/rest.config';
import { Helper } from '../../services/Helper';
import { contextCookie } from '../../services/Auth';
import Meta from '../../components/Meta';
import { APP_NAME } from '../../config/server.config';
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function MyFavourite(props) {
    const noti = new Notifier();
    const router = useRouter()
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [favProducts, setFavProducts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [updateList, setUpdateList] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [params, setParams] = useState({
        offset: props.queryString.offset ?? 0,
    });
    const [disabled, setDisabled] = useState(false);
    useEffect(async () => {
        setShowSkeleton(true);
        router.push('/products/favourites', { query: { ...params } }, undefined, { shallow: true })
        const response = await Rest.axiosRequest(API.myFavourites + '?' + `limit=${limit}&` + new URLSearchParams(params).toString(), {}, 'GET')
        if (response.status === 200) {
            setFavProducts(response.data.data.favouriteProducts);
            setTotalPages(response.data.data.totalPages)
        } else {
            noti.notify(response.data.message, "danger");
        }
        setShowSkeleton(false);
    }, [new URLSearchParams(params).toString(), updateList])

    const handlePageChange = (event) => {
        setParams((prevState) => ({ ...prevState, offset: event.selected }))
    };

    const handleRemoveFavourite = async (slug) => {
        setDisabled(true)
        const response = await Rest.axiosRequest(API.addToFavourite + '/' + slug, {});
        setDisabled(false)
        if (response.data.status) {
            noti.notify(response.data.message, 'success')
            setUpdateList(!updateList);
        } else {
            noti.notify(response.data.message, 'danger')
        }
    }
    return <>
        <Meta title={`My Favourite | ${APP_NAME}`} keywords={''} description={''} />
        <section className="bg-black p-30-0-60">
            <Container>
                <Row>
                    <Col lg={12} className="mx-auto">
                        <Card className="card-dark border-gray p-15-20-30 br-10">
                            <Card.Header className="border-btm-gray mb-20 p-l-0 p-r-0 p-t-0 p-b-13">
                                <Card.Title className="fs-18 fw-600 color-white mb-0">My Favourite</Card.Title>
                            </Card.Header>

                            <Card.Body className="p-0">
                                <div className="table-wrap CustomScrollbar CustomScrollbarY">
                                    {/* <Table bordered hover className="table-head-bg-000 table-td-bg-191919" variant="dark" id="seller-favourite"> */}
                                    <ResponsiveTable className="table table-bordered table-hover table-dark table-head-bg-000 table-td-bg-191919" id="seller-favourite">
                                        <Thead>
                                            <Tr>
                                                <Th width="170px;">Brand Name</Th>
                                                <Th width="170px;">Product Name</Th>
                                                <Th className="text-center" width="100px;">Category</Th>
                                                <Th className="text-center" width="50px;">Med/Rec</Th>
                                                {/* <Th className="text-center" width="100px;">Price Per lb</Th> */}
                                                <Th className="text-center" width="50px;">THC%</Th>
                                                <Th className="text-center" width="150px;">Dominant<br />Terpene</Th>
                                                <Th className="text-center" width="90px;">Harvested</Th>
                                                <Th className="text-center" width="60px;">Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                showSkeleton ?
                                                    [...Array(5)].map((index) => {
                                                        return (
                                                            <Tr key={index}>
                                                                {
                                                                    [...Array(9)].map((i) => {
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
                                                    favProducts.length ?
                                                        favProducts.map((favProduct) => {
                                                            return (
                                                                <Tr key={favProduct.id}>
                                                                    <Td>
                                                                        <Link
                                                                            href={"/brand/" + favProduct.product.user.brand.slug}
                                                                            className="color-f3772c text-decoration-none"
                                                                            legacyBehavior>{favProduct.product.user && favProduct.product.user.brand ? Helper.niceString(favProduct.product.user.brand.brandName, 20, true) : 'N/A'}</Link>
                                                                    </Td>
                                                                    <Td>
                                                                        <Link
                                                                            href={"/product/" + favProduct.product.slug}
                                                                            className="color-0e9bfd text-decoration-underline"
                                                                            legacyBehavior>{Helper.niceString(favProduct.product.title, 20, true)}</Link>
                                                                    </Td>
                                                                    <Td className="text-center">
                                                                        {favProduct.product.category.title}
                                                                    </Td>
                                                                    <Td className="text-center">{favProduct.product.medRec.title}</Td>
                                                                    {/* <Td className="text-center">{favProduct.product.productPrice}</td> */}
                                                                    <Td className="text-center">{favProduct.product.thc}%</Td>
                                                                    <Td className="text-center">{Helper.niceString(favProduct.product.dominant, 15, true)}</Td>
                                                                    <Td className="text-center">{favProduct.product.niceHarvested}</Td>
                                                                    <Td className="text-center">
                                                                        <a className={'action-btn color-f32c2c bg-black ' + (disabled ? 'disabled' : '')} onClick={() => handleRemoveFavourite(favProduct.product.slug)}><FontAwesomeIcon icon={faTrashAlt} /></a>
                                                                    </Td>
                                                                </Tr>
                                                            );
                                                        })
                                                        : <Tr>
                                                            <Td className="text-center" colSpan={11}>No records found!</Td>
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

    </>;
}

export default MyFavourite

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