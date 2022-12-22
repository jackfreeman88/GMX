import { useEffect, useState } from "react";
import { Button, Figure } from "react-bootstrap";
import API from "../config/endpoints.config";
import Rest from "../config/rest.config";
import { ASSETS_URL } from "../config/server.config";
import { getSingle } from "../services/Auth";
import Notifier from "./Notifier";

const noti = new Notifier();

function FollowingListItem({ following, deleteFollowing }) {
    const [followStatus, setFollowStatus] = useState();
    useEffect(() => {
        setFollowStatus(following.followingUser.followers?.length == '1' ? 'Following' : 'Follow')
    }, [following]);
    const handleFollow = async () => {
        let formData = {
            slug: following.followingUser.slug,
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
                    <img className="cover" src={ASSETS_URL + following.followingUser.profilePath} alt="profile" />
                </Figure>
                <h4 className="fs-16 fw-500 my-2">{following.followingUser.role == "2" ? following.followingUser.brandName : following.followingUser.businessName}</h4>
            </div>
            {getSingle('userId') != following.followingUser.id && (followStatus == "Following" ?
                <Button variant="primary" className="btn-rounded btn-wh-130-38 btn-h-30 fs-sm" onClick={handleFollow}><span className="me-2"><i className="icon icon-add-friend"></i></span>Following</Button>
                :
                <Button variant="secondary" className="btn-rounded btn-wh-130-38 btn-h-30 fs-sm" onClick={handleFollow}><span className="me-2"><i className="icon icon-add-friend"></i></span>Follow</Button>)
            }
        </div>
    );
}

export default FollowingListItem;