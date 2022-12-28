import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
/* global google */
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLocation } from '@fortawesome/free-solid-svg-icons';
import API from '../../config/endpoints.config';
import Rest from '../../config/rest.config';
import { saveAs } from 'file-saver'
import Select from "react-select";
import { DropdownIndicator, react_select_lg_Styles } from "../../components/DropDown";
// import Datetime from "react-datetime";
import CustomDatePicker from '../../components/CustomDatePicker';
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import FormValidator from "../../components/FormValidator";
import Notifier from '../../components/Notifier';
import { contextCookie, updateSingle } from '../../services/Auth';
import { Helper } from '../../services/Helper';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { APP_NAME, ASSETS_URL, REACT_APP_API_BASE_URL } from "../../config/server.config";
import Meta from '../../components/Meta';

const baseColor = "#202020";
const highlightColor = "#444";
function MyAccountSeller() {
	const noti = new Notifier();
	const locationRef = useRef(null);
	const router = useRouter();
	const validator = new FormValidator([
		{
			field: "businessName",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter name.",
		},
		{
			field: "phoneNumber",
			method: "isEmpty",
			validWhen: false,
			message: "Please select phone number.",
		},
		{
			field: "brandName",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter brand name.",
		},
		// {
		// field: "website",
		// method: "isEmpty",
		// validWhen: false,
		// message: "Please enter website url.",
		// }
		{
			field: "year",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter business establishment year.",
		},
		{
			field: "licenseNumber",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter license number.",
		},
		{
			field: "medRecId",
			method: "isEmpty",
			validWhen: false,
			message: "Please select license type.",
		},
		{
			field: "expirationDate",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter expiration date.",
		},
		{
			field: "stateId",
			method: "isEmpty",
			validWhen: false,
			message: "Please select state.",
		},
		{
			field: "zipCode",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter zip code.",
		},
		{
			field: 'zipCode',
			method: 'isLength',
			args: [5, 5],
			validWhen: true,
			message: 'Zipcode should be 5 characters long.'
		},
		{
			field: "address",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter address.",
		},
		{
			field: "description",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter description.",
		},
	]);

	const passwordMatch = (confirmation, state) => {
		if ((changePasswordState.newPassword !== "" && changePasswordState.confirmNewPassword !== "") && changePasswordState.newPassword === changePasswordState.confirmNewPassword) {
			return false;
		} else {
			return true;
		}
	}

	const changePasswordValidator = new FormValidator([
		{
			field: "currentPassword",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter current password.",
		},
		{
			field: 'currentPassword',
			method: 'isLength',
			args: [6, 20],
			validWhen: true,
			message: 'Current password should be minimum 6 and maximum 20 characters.'
		},
		{
			field: "newPassword",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter new password.",
		},
		{
			field: 'newPassword',
			method: 'isLength',
			args: [6, 20],
			validWhen: true,
			message: 'New password should be minimum 6 and maximum 20 characters.'
		},
		{
			field: "confirmNewPassword",
			method: "isEmpty",
			validWhen: false,
			message: "Please enter confirm new password.",
		},
		{
			field: 'confirmNewPassword',
			method: 'isLength',
			args: [6, 20],
			validWhen: true,
			message: 'Confirm new password should be minimum 6 and maximum 20 characters.'
		},
		{
			field: 'confirmNewPassword',
			method: passwordMatch,
			validWhen: false,
			message: 'Please enter same as new password.'
		}
	]);

	const [profileData, setProfileData] = useState({
		profilePath: "uploads/profile/seller-default.png",
		profileDocument: "",
		businessName: "",
		phoneNumber: "",
		brandName: "",
		website: null,
		year: "",
		avgOrder: "",
		licenseNumber: "",
		medRecId: "",
		expirationDate: "",
		licenseDocument: "",
		licensePath: "",
		stateId: "",
		zipCode: "",
		address: "",
		description: "",
	});
	const [showSkeleton, setShowSkeleton] = useState(true);
	const [showLoading, setShowLoading] = useState(false);
	const [states, setStates] = useState([]);
	const [medRecs, setMedRecs] = useState([]);
	const [validation, setValidation] = useState(validator.valid());
	const [submitted, setSubmitted] = useState(false)
	const [showChangePassLoading, setChangePassShowLoading] = useState(false);
	const [changePasswordState, setChangePasswordState] = useState({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	})
	const [changePasswordValidation, setChangePasswordValidation] = useState(changePasswordValidator.valid());
	const [changePasswordsubmitted, setChangePasswordSubmitted] = useState(false)
	useEffect(async () => {
		const response = await Rest.axiosRequest(API.sellerProfile, {}, 'GET')
		if (response && response.status === 200) {
			const data = {
				profilePath: response.data.data.profilePath !== null ? response.data.data.profilePath : profileData.profilePath,
				businessName: response.data.data.businessName,
				email: response.data.data.email,
				phoneNumber: response.data.data.phoneNumber,
				brandName: response.data.data.brand.brandName,
				website: response.data.data.brand.website ?? '',
				year: response.data.data.brand.year,
				avgOrder: response.data.data.brand.avgOrder !== null ? response.data.data.brand.avgOrder : '',
				licenseNumber: response.data.data.licenseNumber,
				medRecId: response.data.data.medRecId,
				expirationDate: response.data.data.expirationDate,
				licenseDocument: response.data.data.licenseDocument,
				licensePath: response.data.data.licensePath !== null ? response.data.data.licensePath : '',
				stateId: response.data.data.stateId,
				zipCode: response.data.data.zipCode,
				address: response.data.data.brand.address,
				description: response.data.data.brand.description,
			}
			locationRef.current.value = response.data.data.brand.address;
			setProfileData(data)
			setShowSkeleton(false);
		} else {
			noti.notify(response.data.message, "danger")
		}

		const statesData = await Rest.axiosRequest(API.getStates, {}, 'GET')
		if (statesData.status === 200) {
			const states = [];
			statesData.data.data.map((state) => {
				states.push({ id: state.id, value: state.id, name: state.name, label: state.name });
			})
			setStates(states);
		} else {
			noti.notify(statesData.data.message, "danger")
		}

		const medRecData = await Rest.axiosRequest(API.getMedrec, {}, 'GET')
		if (medRecData && medRecData.status === 200) {
			const medRecs = [];
			medRecData.data.data.map((medRec) => {
				medRecs.push({ id: medRec.id, value: medRec.id, name: medRec.title, label: medRec.title });
			})
			setMedRecs(medRecs);
		} else {
			noti.notify(medRecData.data.message, "danger")
		}

		const autoCompleteAddress = new google.maps.places.Autocomplete(document.getElementById("address"), { componentRestrictions: { 'country': ['US'] } });
		google.maps.event.addListener(autoCompleteAddress, 'place_changed', function () {
			setProfileData((prevState) => ({ ...prevState, address: locationRef.current.value }))
		});
	}, [])

	const downloadFile = (filePath) => {
		saveAs(REACT_APP_API_BASE_URL + '/get/file' + filePath)
	}

	const onChangeHandler = async (event) => {
		const { name, value } = event.target;
		if (name === 'zipCode' && value < 1) {
			return;
		}
		setProfileData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleChangeSelectState = (val) => {
		if (val) {
			setProfileData((prevState) => ({ ...prevState, stateId: val.value }));
		} else {
			setProfileData((prevState) => ({ ...prevState, stateId: "" }));
		}
	};

	const handleChangeSelectLicenseType = (val) => {
		if (val) {
			setProfileData((prevState) => ({ ...prevState, medRecId: val.value }));
		} else {
			setProfileData((prevState) => ({ ...prevState, medRecId: '' }));
		}
	};

	const documentHandler = (event) => {
		let selectedFile = event.target.files[0];
		if (selectedFile) {
			let fileType = selectedFile.type;
			let fileCheck = fileType.match(/image\/[A-Za-z]*/g);
			const { name, files } = event.target;
			if (fileType === 'application/pdf' || (fileCheck && fileCheck.length > 0)) {
				setProfileData((prevState) => ({ ...prevState, [name]: files[0] }));
				if (name == 'profileDocument' && (fileCheck && fileCheck.length > 0)) {
					var file = event.target.files[0];
					var reader = new FileReader();
					var url = reader.readAsDataURL(file);
					reader.onloadend = function (e) {
						document.getElementById('preview_image').src = reader.result
					}.bind(this);
				}
			} else {
				event.target.value = null;
				setProfileData((prevState) => ({ ...prevState, [name]: '' }));
				noti.notify(name == "profileDocument" ? "Please upload Image file only." : "Please upload Image or PDF file only.", "danger");
			}
		}
	};

	const handleChangeDate = (date) => {
		setProfileData((prevState) => ({ ...prevState, expirationDate: date.format("YYYY-MM-DD") }));
	};

	const updateProfileDetails = async (e) => {
		e.preventDefault();
		const validation = validator.validate(profileData)
		setValidation(validation)
		setSubmitted(true)
		if (validation.isValid) {
			setShowLoading(true)
			let formData = new FormData();
			for (let key in profileData) {
				formData.append(key, profileData[key])
			}
			const response = await Rest.axiosRequest(API.sellerProfile, formData, 'PUT', true)
			setShowLoading(false)
			if (response.status === 200) {
				updateSingle('userImage', response.data.data.profilePath);
				updateSingle('userName', response.data.data.businessName);
				const updatedData = {
					profilePath: response.data.data.profilePath,
					profileDocument: response.data.data.profileDocument,
					businessName: response.data.data.businessName,
					phoneNumber: response.data.data.phoneNumber,
					brandName: response.data.data.brandName,
					website: response.data.data.website ?? '',
					year: response.data.data.year,
					avgOrder: response.data.data.avgOrder,
					licenseNumber: response.data.data.licenseNumber,
					medRecId: response.data.data.medRecId,
					expirationDate: response.data.data.expirationDate,
					licenseDocument: response.data.data.licenseDocument,
					licensePath: response.data.data.licensePath,
					stateId: response.data.data.stateId,
					zipCode: response.data.data.zipCode,
					address: response.data.data.address,
					description: response.data.data.description,
				}
				setProfileData(updatedData);
				noti.notify(response.data.message, "success")
				setSubmitted(false)
				router.replace('/account/seller');
			} else {
				noti.notify(response.data.message, "danger")
			}
		}
	}

	let inputProps = {
		placeholder: "Select Expiration Date",
		readOnly: true
	};

	const changePassOnChangeHandler = (event) => {
		const { name, value } = event.target;
		setChangePasswordState((prevState) => ({ ...prevState, [name]: value.trim() }));
	}

	const handleChangePasswordSubmit = async (e) => {
		e.preventDefault();
		const validation = changePasswordValidator.validate(changePasswordState)
		setChangePasswordValidation(validation)
		setChangePasswordSubmitted(true)
		if (validation.isValid) {
			setChangePassShowLoading(true)
			const response = await Rest.axiosRequest(API.changePassword, changePasswordState)
			setChangePassShowLoading(false)
			if (response.data.status) {
				noti.notify(response.data.message, "success")
				setChangePasswordState({
					currentPassword: '',
					newPassword: '',
					confirmNewPassword: '',
				});
				setChangePasswordSubmitted(false)
			} else {
				noti.notify(response.data.message instanceof Array ? response.data.message[0] : response.data.message, "danger")
			}
		}
	}

	const handleAddressKeyUp = (e) => {
		setProfileData((prevState) => ({ ...prevState, address: e.target.value }))
	}

	let checkValidation = submitted ? validator.validate(profileData) : validation
	let checkChangePasswordValidation = changePasswordsubmitted ? changePasswordValidator.validate(changePasswordState) : changePasswordValidation
	return <>
        <Meta title={`My Account | ${APP_NAME}`} keywords={''} description={''} />
        <section className="bg-black p-30-0-60">
            <Container>
                <Row>
                    <Col lg={12} className="mx-auto">
                        <Card className="card-dark border-gray p-15-20-20 br-10">
                            <Card.Header className="border-btm-gray mb-20 d-flex align-items-center">
                                <Card.Title className="fs-18 fw-600 color-dcdcdc mb-0">My Account</Card.Title>
                                <div className="ms-auto">
                                    <Link href="/account/delete" className="btn btn-primary br-6">
                                        Delete Account
                                    </Link>
                                </div>
                            </Card.Header>

                            <Card.Body className="p-0">
                                <Row>
                                    <Col lg={3}>
                                        <Form.Group className="mb-4 profile-box br-10 bg-color-333 border-gray">
                                            <Form.Label>Logo</Form.Label>
                                            <div className="userimg-wrap">
                                                {showSkeleton ?
                                                    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
                                                        <Skeleton height={96} circle={true} className='cover circle d-inline-block' />
                                                    </SkeletonTheme>
                                                    :
                                                    <>
                                                        <img src={ASSETS_URL + profileData.profilePath} id="preview_image" className='cover circle' />
                                                        <div className="form-control upload_file br-50p w-28 h-28 bg-color-22a612" placeholder="">
                                                            <Form.Label htmlFor="logo" className=" profile-edit-btn"><span><FontAwesomeIcon icon={faEdit} /></span></Form.Label>
                                                            <Form.Control type="file" id="logo" name="profileDocument" onChange={(e) => documentHandler(e)} accept="image/*" />
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={9}>
                                        <Row>
                                            <Col lg={12}>
                                                <Form.Group className="mb-4 form-dark">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}><Skeleton height={50} /></SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Name</Form.Label>
                                                            <Form.Control type="text" name="businessName" placeholder="Enter First Name" value={profileData.businessName} onChange={onChangeHandler} />
                                                            <div className={checkValidation.businessName.isInvalid ? 'animated fadeIn' : ''} >
                                                                <div className="error">
                                                                    {checkValidation.businessName.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}><Skeleton height={50} /></SkeletonTheme>
                                                        :
                                                        <><Form.Label>Email</Form.Label>
                                                            <Form.Control type="email" name="email" placeholder="Enter Email" value={profileData.email} disabled /></>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}><Skeleton height={50} /></SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Form.Control type="number" name="phoneNumber" placeholder="Enter Phone Number" value={profileData.phoneNumber} onChange={onChangeHandler} min="0" />
                                                            <div
                                                                className={
                                                                    checkValidation.phoneNumber.isInvalid
                                                                        ? 'animated fadeIn'
                                                                        : ''
                                                                }
                                                            >
                                                                <div className="error">
                                                                    {checkValidation.phoneNumber.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12}>
                                        <h4 className="fs-16 fw-600 color-dcdcdc mb-20 p-b-10 border-btm-gray">Brand Details</h4>
                                    </Col>

                                    <Col lg={12}>
                                        <Form.Group className="mb-4 form-dark">
                                            {showSkeleton ?
                                                <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}><Skeleton height={50} /></SkeletonTheme>
                                                :
                                                <>
                                                    <Form.Label>Brand Name</Form.Label>
                                                    <Form.Control type="text" name="brandName" placeholder="Enter Brand Name" value={profileData.brandName} onChange={onChangeHandler} />
                                                    <div
                                                        className={
                                                            checkValidation.brandName.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.brandName.message}
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </Form.Group>
                                    </Col>
                                    {showSkeleton ?
                                        <Col lg={12}>
                                            <Form.Group className="mb-4 form-dark">
                                                <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}><Skeleton height={50} /></SkeletonTheme>
                                            </Form.Group>
                                        </Col>
                                        :
                                        <>
                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    <Form.Label>Website<span>(optional)</span></Form.Label>
                                                    <Form.Control type="text" name="website" placeholder="Enter Website" value={profileData.website} onChange={onChangeHandler} />
                                                    {/*<div
                                                        className={
                                                            checkValidation.website.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.website.message}
                                                        </div>
                                                    </div>*/}
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    <Form.Label>Business Establishment Year</Form.Label>
                                                    <Form.Control type="number" name="year" placeholder="Enter Business Establishment Year" value={profileData.year} onChange={onChangeHandler} />
                                                    <div
                                                        className={
                                                            checkValidation.year.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.year.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </>
                                    }
                                    {showSkeleton ?
                                        <Col lg={12}>
                                            <Form.Group className="mb-4 form-dark">
                                                <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}><Skeleton height={50} /></SkeletonTheme>
                                            </Form.Group>
                                        </Col>
                                        :
                                        <>
                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    <Form.Label>Average Order Per Month<span>(optional)</span></Form.Label>
                                                    <Form.Control type="number" name="avgOrder" placeholder="Enter Average Order Per Month" value={profileData.avgOrder} onChange={onChangeHandler} />
                                                </Form.Group>
                                            </Col>

                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    <Form.Label>License Number</Form.Label>
                                                    <Form.Control type="text" name="licenseNumber" placeholder="Enter License Number" value={profileData.licenseNumber} onChange={onChangeHandler} />
                                                    <div
                                                        className={
                                                            checkValidation.licenseNumber.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.licenseNumber.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </>
                                    }
                                    {showSkeleton ?
                                        <Col lg={12}>
                                            <Form.Group className="mb-4 form-dark">
                                                <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}><Skeleton height={50} /></SkeletonTheme>
                                            </Form.Group>
                                        </Col>
                                        :
                                        <>
                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    <Form.Label>License Type</Form.Label>
                                                    <Select
                                                        classNamePrefix="react-select"
                                                        className="react-select-lg"
                                                        styles={react_select_lg_Styles}
                                                        value={medRecs.filter((item) => item.id == profileData.medRecId)}
                                                        options={medRecs.map(({ id, name }) => ({
                                                            value: id,
                                                            label: name,
                                                        }))}
                                                        onChange={(val) => handleChangeSelectLicenseType(val)}
                                                        placeholder="Select License Type"
                                                        components={{
                                                            DropdownIndicator,
                                                            IndicatorSeparator: () => null,
                                                        }}
                                                        name="medRecId"
                                                        isClearable={true}
                                                    />
                                                    <div
                                                        className={
                                                            checkValidation.medRecId.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.medRecId.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <Col lg={6}>
                                                <Form.Group className="mb-4 form-dark">
                                                    <Form.Label>License Expire Date</Form.Label>
                                                    {/* <Datetime
                                                        dateFormat="DD MMM, YYYY"
                                                        timeFormat={false}
                                                        closeOnSelect={true}
                                                        inputProps={inputProps}
                                                        isValidDate={Helper.valid}
                                                        value={profileData.expirationDate ? moment(profileData.expirationDate).format(
                                                            "DD MMM, YYYY"
                                                        ) : ''}
                                                        onChange={(date) => handleChangeDate(date)}
                                                        closeOnTab={true}
                                                        utc={true}
                                                        className="date_picker"
                                                    /> */}
                                                    <CustomDatePicker
                                                        responsive={true}
                                                        selectedDate={profileData.expirationDate ? moment(profileData.expirationDate).format(
                                                            "DD MMM, YYYY"
                                                        ) : ''}
                                                        handleOnChange={(date) => handleChangeDate(date)}
                                                        disableFutureDates={false}
                                                        disablePastDates={true}
                                                    />
                                                    <div
                                                        className={
                                                            checkValidation.expirationDate.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.expirationDate.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </>
                                    }
                                    <Col lg={12}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>License Document </Form.Label>
                                            {profileData.licensePath ? <a className="color-f3772c curser-pointer ms-2" onClick={() => downloadFile(profileData.licensePath)}>(Download File)</a> : ''}
                                            <div className="form-control upload_file" placeholder="Choose File">
                                                <Form.Label htmlFor="document_upload" className="btn btn-primary bs-none">Choose File</Form.Label>
                                                <Form.Control type="file" accept='image/*,application/pdf' id="document_upload" name="licenseDocument" onChange={(e) => documentHandler(e)} />
                                                <div className='my-3'>{profileData.licenseDocument ? profileData.licenseDocument.name : null}</div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>State</Form.Label>
                                            <Select
                                                classNamePrefix="react-select"
                                                className="react-select-lg"
                                                styles={react_select_lg_Styles}
                                                value={states.filter((item) => item.id == profileData.stateId)}
                                                options={states.map(({ id, name }) => ({
                                                    value: id,
                                                    label: name,
                                                }))}
                                                onChange={(val) => handleChangeSelectState(val)}
                                                placeholder="Select State"
                                                components={{
                                                    DropdownIndicator,
                                                    IndicatorSeparator: () => null,
                                                }}
                                                name="state_id"
                                                isClearable={true}
                                            />
                                            <div
                                                className={
                                                    checkValidation.stateId.isInvalid
                                                        ? 'animated fadeIn'
                                                        : ''
                                                }
                                            >
                                                <div className="error">
                                                    {checkValidation.stateId.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>Zip Code</Form.Label>
                                            <Form.Control type="number" name="zipCode" placeholder="Enter Zip Code" value={profileData.zipCode} onChange={onChangeHandler} min="1" />
                                            <div
                                                className={
                                                    checkValidation.zipCode.isInvalid
                                                        ? 'animated fadeIn'
                                                        : ''
                                                }
                                            >
                                                <div className="error">
                                                    {checkValidation.zipCode.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>Address</Form.Label>
                                            <div className="form-icon form-icon-right">
                                                <Form.Control type="text" name="address" placeholder="Enter Address" ref={locationRef} onChange={handleAddressKeyUp} id='address' />
                                                <span className="icon"><FontAwesomeIcon icon={faLocation} /></span>
                                            </div>
                                            <div
                                                className={
                                                    checkValidation.address.isInvalid
                                                        ? 'animated fadeIn'
                                                        : ''
                                                }
                                            >
                                                <div className="error">
                                                    {checkValidation.address.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" name="description" placeholder="Enter Description" onChange={onChangeHandler} style={{ height: '100px' }} value={profileData.description} />
                                            <div
                                                className={
                                                    checkValidation.description.isInvalid
                                                        ? 'animated fadeIn'
                                                        : ''
                                                }
                                            >
                                                <div className="error">
                                                    {checkValidation.description.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="text-center m-0-0-45">
                                            <Button variant="primary" type="submit" className="btn-wh-184-51 btn-rounded" onClick={!showLoading ? updateProfileDetails : null} disabled={showLoading}>{showLoading ? <Spinner animation="border" /> : "Update"}</Button>
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <h4 className="fs-16 fw-600 color-dcdcdc mb-45 p-b-10 border-btm-gray">Change Password</h4>
                                    </Col>
                                    <Col lg={4}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>Current Password</Form.Label>
                                            <Form.Control type="password" name="currentPassword" placeholder="Enter Current Password" value={changePasswordState.currentPassword} onChange={changePassOnChangeHandler} />
                                            <div className={checkChangePasswordValidation.currentPassword.isInvalid ? 'animated fadeIn' : ''} >
                                                <div className="error">
                                                    {checkChangePasswordValidation.currentPassword.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type="password" name="newPassword" placeholder="Enter New Password" value={changePasswordState.newPassword} onChange={changePassOnChangeHandler} />
                                            <div className={checkChangePasswordValidation.newPassword.isInvalid ? 'animated fadeIn' : ''} >
                                                <div className="error">
                                                    {checkChangePasswordValidation.newPassword.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4}>
                                        <Form.Group className="mb-4 form-dark">
                                            <Form.Label>Confirm New Password</Form.Label>
                                            <Form.Control type="password" name="confirmNewPassword" placeholder="Enter New Password" value={changePasswordState.confirmNewPassword} onChange={changePassOnChangeHandler} />
                                            <div className={checkChangePasswordValidation.confirmNewPassword.isInvalid ? 'animated fadeIn' : ''} >
                                                <div className="error">
                                                    {checkChangePasswordValidation.confirmNewPassword.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={12}>
                                        <div className="text-center m-4-0-25">
                                            <Button variant="primary" type="submit" className="btn-wh-184-51 btn-rounded" onClick={!showChangePassLoading ? handleChangePasswordSubmit : null} disabled={showChangePassLoading}>{showChangePassLoading ? <Spinner animation="border" /> : "Change"}</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    </>;
}

export default MyAccountSeller

export async function getServerSideProps(context) {
	const isLoggedIn = contextCookie(context, 'isLogin');
	if (!isLoggedIn) {
		return {
			redirect: { destination: "/" },
		};
	}

	return {
		props: {},
	};
}