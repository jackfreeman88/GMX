import Link from "next/link";
import { useRouter } from 'next/router'
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import Rest from '../../config/rest.config';
import API from '../../config/endpoints.config';
import { logout } from "../../services/Auth";
import Notifier from "../../components/Notifier";

export default function Delete(){
	const router = useRouter();
	const noti = new Notifier();
	const handleDelete  = () => {
      Swal.fire({
     	title: 'Are you sure?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#22a612',
        cancelButtonColor: '#d93737',
        confirmButtonText: 'Yes, delete it!',
		background: '#191919',
		customClass: {
			popup: 'swal2-dark',
		}		
      }).then(async (result) => {
        if (result.isConfirmed) {
        	const response = await Rest.axiosRequest(API.deletAccount, {});
	        if(response.data.status){
	            noti.notify(response.data.message, "success");
				logout();
	            router.replace('/sign-in')
	        } else{
	            noti.notify(response.data.message, "danger");
	        }
        }
      })
    }
	return (
		<section className="bg-black p-30-0-60">
			<Container>
				<Row>
					<Col lg={12} className="mx-auto">
						<Card className="card-dark border-gray p-15-20-20 br-10 mh-275">
							<Card.Header className="border-btm-gray mb-20 p-l-0 p-r-0 p-t-0 p-b-13">
								<Card.Title className="fs-18 fw-700 color-dcdcdc mb-0">Delete Account</Card.Title>
							</Card.Header>
							<Card.Body className="p-0">
								<Row>
									<Col lg={12}>
										<Form.Group className="mb-3">
											<Form.Label className="color-dcdcdc">Are you sure you want to delete the account?</Form.Label>
										</Form.Group>
										<Form.Group className="mb-3">
											<Button variant="primary" className="btn-wh-184-51 btn-rounded" onClick={handleDelete}>Delete</Button>											
										</Form.Group>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	)
}