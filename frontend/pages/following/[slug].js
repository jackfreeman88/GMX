import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Button, Figure, ListGroup, Card } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { contextCookie, getSingle } from '../../services/Auth';
import FollowingListItem from '../../components/FollowingListItem';
import FollowerListItem from '../../components/FollowerListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
const baseColor = "#202020";
const highlightColor = "#444";

function Following({ slug }) {
    const router = useRouter();
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [followings, setFollowings] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    const handleSelect = (eventKey) => {
        switch (eventKey) {
            case 'followers':
                return router.push({
                    pathname: '/followers/[slug]',
                    query: { slug: slug },
                })
                break;
            case 'following':
                return router.push({
                    pathname: '/following/[slug]',
                    query: { slug: slug },
                })
                break;
            default:
                return router.reload();
        }
    }

    const handlePageChange = (event) => {
        router.push('?offset=' + event.selected, undefined, { shallow: true });
    };

    const deleteFollowing = (followingId) => {
        const data = followings.filter(i => i.id !== followingId);
        setFollowings(data);
    }

    useEffect(() => {
        const getFollowings = async () => {
            setShowSkeleton(true);
            let response = await Rest.axiosRequest(`${API.followings}/${slug}` + `?` + new URLSearchParams({ limit: limit, offset: '0', ...router.query }).toString(), {}, "GET", false, getSingle('token'));
            response = response.data;
            if (response.status) {
                setFollowings(response.data.followings);
                setTotalPages(response.data.totalPages);
            }
            setShowSkeleton(false);
        }
        getFollowings();
    }, [limit, router.query]);

    return (
        <>
            <section className="bg-black p-27-0-55">
                <Container>
                    <Row>
                        <Col lg={10} className="mx-auto">
                            <Card className="card-dark card-post card-axis-point border-gray-1">
                                <Card.Header>
                                    <div className="d-flex align-items-center">
                                        <a className="d-flex align-items-center" onClick={() => router.back()}>
                                            <span className="text-white fs-20 me-3" >
                                                <FontAwesomeIcon icon={faArrowLeft} />
                                            </span>
                                        </a>
                                        <h3 className="text-white fs-18 mb-0">{getSingle('fullName')}</h3>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                            <div className="custom-tabs theme-dark">
                                <Tabs defaultActiveKey="following" onSelect={handleSelect}>
                                    <Tab eventKey="followers" title="Followers">
                                    </Tab>
                                    <Tab eventKey="following" title="Following">
                                        <ListGroup variant="flush" className="list-black">
                                            {showSkeleton ?
                                                [...Array(10)].map((arrayData, index) => {
                                                    return (
                                                        <div key={index + "skeleton"} className="d-flex justify-content-between align-items-center px-5 list-group-item">
                                                            <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                                                                <div className="d-flex align-items-center">
                                                                    <Skeleton circle={true} height={40} width={40} className="mb-0 me-3" />
                                                                    <Skeleton width={200} height={20} />
                                                                </div>
                                                                <Skeleton width={100} height={30} className="me-2" />
                                                            </SkeletonTheme>
                                                        </div>
                                                    )
                                                })
                                                : followings.length > 0
                                                    ? followings.map((following, index) =>
                                                        <ListGroup.Item key={index}>
                                                            <FollowingListItem key={index} following={following} />
                                                        </ListGroup.Item>
                                                    )
                                                    :
                                                    <div className="d-flex justify-content-center align-items-center fs-16 fw-500 p-2">
                                                        No records found!
                                                    </div>}
                                        </ListGroup>
                                    </Tab>
                                </Tabs>
                                <div className='mt-5 d-flex justify-content-center'>
                                    {
                                        totalPages > 1 &&
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
                                        />
                                    }
                                </div>
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
export default Following

export async function getServerSideProps(context) {
    const { slug } = context.params
    return {
        props: {
            slug
        },
    }
}

