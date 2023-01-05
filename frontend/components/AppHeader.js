import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cookie from 'react-cookies';
import { Container, Figure, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCommentDots, faStar, faAddressCard, faCalendarAlt, faFileLines, faBell, faHeart } from '@fortawesome/free-solid-svg-icons';
import { logout, isLoggedIn, getSingle } from '../services/Auth';
import { ASSETS_URL } from "../config/server.config";
import Rest from '../config/rest.config';
import API from '../config/endpoints.config';
import Notifier from './Notifier';
import MyCart from './MyCart';

function AppHeader(props) {
    const totalCartItems = useSelector(state => state.cart ? state.cart.totalItems : 0)
    const router = useRouter();
    const noti = new Notifier();
    const [isNavOpen, setIsNaveOpen] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        setLoggedInUser(isLoggedIn());
    }, [cookie.load('gmx')])

    useEffect(async () => {
        if (isLoggedIn()) {
            const { data } = await Rest.axiosRequest(API.getUnreadCount, {}, 'GET');
            if (data?.status) {
                setUnreadCount(data.data)
            } else {
                noti.notify(data.message, "danger");
            }
        }
    }, [isLoggedIn()])

    const openNav = () => {
        setIsNaveOpen(true);
    }

    const closeNav = () => {
        setIsNaveOpen(false);
    }

    const handleLogOut = () => {
        logout();
        // signOut();
        router.replace('/sign-in');
    }

    const [hideShowCart, setHideShowCart] = useState(false);
    const hideShowCartModal = async () => {
        setHideShowCart((prevState) => !prevState);
    }

    return <>
        <header>
            <Navbar collapseOnSelect expand="lg" variant="dark" expanded={isNavOpen}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" id="toggleBtn" onClick={isNavOpen ? closeNav : openNav} />
                    <Link href="/" passHref legacyBehavior>
                        <Navbar.Brand>
                            <img alt="logo" src="/assets/images/main-logo.png" />
                        </Navbar.Brand>
                    </Link>
                    {loggedInUser ?
                        <div className='nav_profile d-lg-none d-flex'>
                            <Figure className='figure-circle mb-0'>
                                <Image alt="profile" src={ASSETS_URL + getSingle('userImage')} className="cover" />
                            </Figure>
                            <NavDropdown title={getSingle('userName')} align="end" id="basic-nav-dropdown">
                                {getSingle('role') === '2' ?
                                    <>
                                        <Link href="/dashboard" passHref legacyBehavior>
                                            <NavDropdown.Item active={(router.pathname === '/dashboard')} eventKey='/dashboard' onClick={closeNav}>
                                                <span className='me-2'><i className='icon icon-dashboard'></i></span>Dashboard
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/product/list" passHref legacyBehavior>
                                            <NavDropdown.Item active={(router.pathname === '/product/list' || router.pathname === '/edit-product' || router.pathname === '/add-product')} eventKey='/product' onClick={closeNav}>
                                                <span className='me-2'><i className='icon icon-product'></i></span>Products
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/quote-requests" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/quote-requests'} eventKey='/quote-requests' onClick={closeNav}>
                                                <span className='me-2'><i className='icon icon-order'></i></span>Quotes
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/orders" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/orders'} eventKey='/orders' onClick={closeNav}>
                                                <span className='me-2'><i className='icon icon-order'></i></span>Orders
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/messages" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/messages/[[...slug]]'} eventKey='/messages' onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faCommentDots} /></span>Messages
                                                {unreadCount ?
                                                    <span className="msg-count">{unreadCount}</span>
                                                    : null}
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/#reviews" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/#reviews'} eventKey='/#reviews' onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faStar} /></span>Reviews
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/manage-subscription" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/manage-subscription'} eventKey='/manage-subscription' onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faAddressCard} /></span>Manage Subscription
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/#transaction-history" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/#transaction-history'} eventKey='/#transaction-history' onClick={closeNav}>
                                                <span className='me-2'><i className='icon icon-transaction'></i></span>Transaction History
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/account/seller" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/account/seller'} eventKey="/account/seller" onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faUser} /></span>Account
                                            </NavDropdown.Item>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link href="/account" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/account'} eventKey="/account" onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faUser} /></span>Account
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/products/favourites" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/products/favourites'} eventKey="/products/favourites" onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faHeart} /></span>Favourite
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/products" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/products' || router.pathname === '/product'} eventKey="/products" onClick={closeNav}>
                                                <span className='me-2'><i className='icon icon-product'></i></span>Products
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/requested-quotes" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/requested-quotes'} eventKey="/requested-quotes" onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faFileLines} /></span>Requested Quotes
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/my-orders" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/my-orders'} eventKey="/my-orders" onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faFileLines} /></span>Orders
                                            </NavDropdown.Item>
                                        </Link>
                                        <Link href="/messages" passHref legacyBehavior>
                                            <NavDropdown.Item active={router.pathname === '/messages/[[...slug]]'} eventKey="/messages" onClick={closeNav}>
                                                <span className='me-2'><FontAwesomeIcon icon={faCommentDots} /></span>Messages
                                                {unreadCount ?
                                                    <span className="msg-count">{unreadCount}</span>
                                                    : null}
                                            </NavDropdown.Item>
                                        </Link>
                                        {/* <Link href="/#email-notification" passHref>
                                    <NavDropdown.Item active={router.pathname === '/#email-notification'} eventKey="/#email-notification" onClick={closeNav}>
                                        <span  className='me-2'><FontAwesomeIcon icon={faBell} /></span>Email Notifications
                                    </NavDropdown.Item>
                                </Link> */}
                                    </>
                                }
                                {/* <Link href="/axis-point" passHref>
                                    <NavDropdown.Item active={router.pathname === '/axis-point'} eventKey="/axis-point" onClick={closeNav}><span className='me-2'><FontAwesomeIcon icon={faUser} /></span>Axis Point</NavDropdown.Item>
                                </Link> */}
                                <NavDropdown.Item onClick={handleLogOut}><span className='me-2'><FontAwesomeIcon icon={faSignOutAlt} /></span>Logout</NavDropdown.Item>
                            </NavDropdown>
                            {
                                loggedInUser && getSingle('role') === '3' ?
                                    <a className="cart-items btn btn-outline-primary btn-circle btn-wh-42" onClick={hideShowCartModal}>
                                        <i className="far fa-shopping-cart"></i>
                                        <span>{totalCartItems > 99 ? '99+' : totalCartItems}</span>
                                    </a>
                                    : null
                            }
                        </div>
                        : null}

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Link href="/" passHref legacyBehavior><Nav.Link eventKey='/' onClick={closeNav} active={router.pathname === '/'}>Home <span></span> </Nav.Link></Link>
                            <Link href="/about-us" passHref legacyBehavior><Nav.Link active={router.pathname === '/about-us'} onClick={closeNav}>About Us <span></span></Nav.Link></Link>
                            <Link href={"/products"} passHref legacyBehavior><Nav.Link active={(router.pathname === '/products' || router.pathname === '/product/[slug]')} onClick={closeNav}>Products <span></span></Nav.Link></Link>
                            {/* <Link href='/blogs' passHref><Nav.Link onClick={closeNav}>Blogs</Nav.Link></Link> */}
                            <Link href="/brands" passHref legacyBehavior><Nav.Link onClick={closeNav} active={(router.pathname === '/brands' || router.pathname === '/brand/[slug]')}>Brands<span></span></Nav.Link></Link>
                            <Link href="/retailers" passHref legacyBehavior><Nav.Link onClick={closeNav} active={(router.pathname === '/retailers' || router.pathname === '/customer/[slug]')}>Retailers<span></span></Nav.Link></Link>
                            {
                                loggedInUser ?
                                    <Link href={"/axis-point"} passHref legacyBehavior><Nav.Link active={(router.pathname === '/axis-point')} onClick={closeNav}>Axis Point <span></span></Nav.Link></Link>
                                    : null
                            }
                            <Link href="/contact-us" passHref legacyBehavior><Nav.Link onClick={closeNav} active={router.pathname === '/contact-us'}>Contact Us <span></span></Nav.Link></Link>
                        </Nav>
                        {
                            !loggedInUser
                                ?
                                <>
                                    <Nav className="btn-group">
                                        <Link href="/sign-in" className="btn btn-secondary" onClick={closeNav}>Sign In</Link>
                                        <Link href="/sign-up" className="btn btn-secondary" onClick={closeNav}>Sign Up</Link>
                                    </Nav>
                                </>
                                :
                                <div className='nav_profile d-lg-flex d-none' >
                                    <Figure className='figure-circle mb-0'>
                                        <Image alt="profile" src={ASSETS_URL + getSingle('userImage')} className="cover" />
                                    </Figure>
                                    <NavDropdown title={getSingle('userName')} align="end" id="basic-nav-dropdown">
                                        {getSingle('role') === '2' ?
                                            <>
                                                <Link href="/dashboard" passHref legacyBehavior>
                                                    <NavDropdown.Item active={(router.pathname === '/dashboard')} eventKey='/dashboard'>
                                                        <span className='me-2'><i className='icon icon-dashboard'></i></span>Dashboard
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/product/list" passHref legacyBehavior>
                                                    <NavDropdown.Item active={(router.pathname === '/product/list' || router.pathname === '/edit-product' || router.pathname === '/add-product')} eventKey='/product'>
                                                        <span className='me-2'><i className='icon icon-product'></i></span>Products
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/quote-requests" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/quote-requests'} eventKey='/quote-requests'>
                                                        <span className='me-2'><i className='icon icon-order'></i></span>Quotes
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/orders" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/orders'} eventKey='/orders'>
                                                        <span className='me-2'><i className='icon icon-order'></i></span>Orders
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/messages" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/messages/[[...slug]]'} eventKey='/messages'>
                                                        <span className='me-2'><FontAwesomeIcon icon={faCommentDots} /></span>Messages
                                                        {unreadCount ?
                                                            <span className="msg-count">{unreadCount}</span>
                                                            : null}
                                                    </NavDropdown.Item>
                                                </Link>
                                                {/* <Link href="/#reviews" passHref>
                                                <NavDropdown.Item active={router.pathname === '/#reviews'} eventKey='/#reviews'>
                                                    <span  className='me-2'><FontAwesomeIcon icon={faStar} /></span>Reviews
                                                </NavDropdown.Item>
                                            </Link> */}
                                                <Link href="/manage-subscription" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/manage-subscription'} eventKey='/manage-subscription'>
                                                        <span className='me-2'><FontAwesomeIcon icon={faAddressCard} /></span>Subscription
                                                    </NavDropdown.Item>
                                                </Link>
                                                {/* <Link href="/#transaction-history" passHref>
                                                <NavDropdown.Item active={router.pathname === '/#transaction-history'} eventKey='/#transaction-history'>
                                                    <span  className='me-2'><i className='icon icon-transaction'></i></span>Transaction History
                                                </NavDropdown.Item>
                                            </Link> */}
                                                <Link href="/account/seller" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/account/seller'} eventKey="/account/seller">
                                                        <span className='me-2'><FontAwesomeIcon icon={faUser} /></span>Account
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href={`/profile`} passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/profile'} eventKey='/profile'>
                                                        <span className='me-2'><FontAwesomeIcon icon={faUser} /></span>View Profile
                                                    </NavDropdown.Item>
                                                </Link>
                                            </>
                                            :
                                            <>
                                                <Link href="/account" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/account'} eventKey="/account">
                                                        <span className='me-2'><FontAwesomeIcon icon={faUser} /></span>Account
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/products/favourites" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/products/favourites'} eventKey="/products/favourites">
                                                        <span className='me-2'><FontAwesomeIcon icon={faHeart} /></span>Favourite
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/requested-quotes" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/requested-quotes'} eventKey='/requested-quotes'>
                                                        <span className='me-2'><i className='icon icon-order'></i></span>Requested Quotes
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/my-orders" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/my-orders'} eventKey="/my-orders">
                                                        <span className='me-2'><FontAwesomeIcon icon={faFileLines} /></span>Orders
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href="/messages" passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/messages/[[...slug]]'} eventKey="/messages">
                                                        <span className='me-2'><FontAwesomeIcon icon={faCommentDots} /></span>Messages
                                                        {unreadCount ?
                                                            <span className="msg-count">{unreadCount}</span>
                                                            : null}
                                                    </NavDropdown.Item>
                                                </Link>
                                                <Link href={`/customer/${getSingle('slug')}`} passHref legacyBehavior>
                                                    <NavDropdown.Item active={router.pathname === '/customer'} eventKey='/profile'>
                                                        <span className='me-2'><FontAwesomeIcon icon={faUser} /></span>View Profile
                                                    </NavDropdown.Item>
                                                </Link>
                                                {/* <Link href="/#email-notification" passHref>
                                                <NavDropdown.Item active={router.pathname === '/#email-notification'} eventKey="/#email-notification">
                                                    <span  className='me-2'><FontAwesomeIcon icon={faBell} /></span>Email Notifications
                                                </NavDropdown.Item>
                                            </Link> */}
                                            </>
                                        }
                                        {/* <Link href="/axis-point" passHref>
                                            <NavDropdown.Item active={router.pathname === '/axis-point'} eventKey="/axis-point" onClick={closeNav}><span className='me-2'><FontAwesomeIcon icon={faUser} /></span>Axis Point</NavDropdown.Item>
                                        </Link> */}
                                        <NavDropdown.Item onClick={handleLogOut}><span className='me-2'><FontAwesomeIcon icon={faSignOutAlt} /></span>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    {
                                        loggedInUser && getSingle('role') === '3' ?
                                            <a className="cart-items btn btn-outline-primary btn-circle btn-wh-42" onClick={hideShowCartModal}>
                                                <i className="far fa-shopping-cart"></i>
                                                <span>{totalCartItems > 99 ? '99+' : totalCartItems}</span>
                                            </a>
                                            : null
                                    }
                                </div>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        {
            getSingle('role') === '3' ?
                <MyCart
                    hideShowCart={hideShowCart}
                    hideShowCartModal={hideShowCartModal}
                />
                : null
        }
    </>;
}

export default AppHeader;