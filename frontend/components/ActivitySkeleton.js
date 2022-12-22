import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const baseColor = "#202020";
const highlightColor = "#444"

const ActivitySkeleton = () => {
    return (
        <Row>
            <Col sm="auto" >
                <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                    <div className="d-flex align-items-center">
                        <Skeleton circle={true} height={62} width={62} className="mb-0 me-3" />
                    </div>
                </SkeletonTheme>
            </Col>
            <Col>
                <div>
                    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                        <h3 className="text-white fs-18"><Skeleton width={200} /></h3>
                        <p className="color-bfbfbf"><Skeleton count={3} /></p>
                    </SkeletonTheme>
                </div>
            </Col>
        </Row >
    )
}

export default ActivitySkeleton