import { useEffect, useState, memo } from "react";
import { Button, Figure } from "react-bootstrap";
import API from "../config/endpoints.config";
import Rest from "../config/rest.config";
import { ASSETS_URL } from "../config/server.config";
import { getSingle } from "../services/Auth";
import Notifier from "./Notifier";

const noti = new Notifier();

function FollowerListItem({ follower, ...props }) {
    const [followStatus, setFollowStatus] = useState();

    useEffect(() => {
        setFollowStatus(follower.followerUser.followers.length == '1' ? 'Following' : 'Follow')
    }, [follower]);

    const handleFollow = async () => {
        let formData = {
            slug: follower.followerUser.slug,
        };
        let response = await Rest.axiosRequest(API.follow, formData)
        response = response.data;
        if (response.status) {
            const follow = response.data.follow;
            setFollowStatus(follow ? "Following" : "Follow");
        } else {
            noti.notify(response.message, "danger");
        }
    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <Figure className="figure figure-circle figure-40 mb-0 me-3">
                    <img className="cover" src={ASSETS_URL + follower.followerUser.profilePath} alt="profile" />
                </Figure>
                <h4 className="fs-16 fw-500 my-2">{follower.followerUser.role == "2" ? follower.followerUser.brandName : follower.followerUser.businessName}</h4>
            </div>
            {getSingle('userId') != follower.followerUser.id && (followStatus == "Following" ?
                <Button variant="primary" className="btn-rounded btn-wh-130-38 btn-h-30 fs-sm" onClick={handleFollow}><span className="me-2"><i className="icon icon-add-friend"></i></span>Following</Button>
                :
                <Button variant="secondary" className="btn-rounded btn-wh-130-38 btn-h-30 fs-sm" onClick={handleFollow}><span className="me-2"><i className="icon icon-add-friend"></i></span>Follow</Button>)
            }
        </div>

    );
}

export default memo(FollowerListItem);