import { REACT_APP_API_BASE_URL } from "./server.config";

export default class API {
    // static baseUrl = process.env.NODE_ENV == 'development' ? 'http://localhost:3333/api/v1' : 'https://gmx.nyusoft.in:6001/api/v1';
    static login = REACT_APP_API_BASE_URL + "/auth/login";
    static checkuser = REACT_APP_API_BASE_URL + "/auth/checkuser";
    static signIn = REACT_APP_API_BASE_URL + "/auth/login";
    static signUp = REACT_APP_API_BASE_URL + "/auth/register";
    static brandSignUp = REACT_APP_API_BASE_URL + "/brand/register";
    static changePassword = REACT_APP_API_BASE_URL + "/user/me/change-password";
    static forgotPassword = REACT_APP_API_BASE_URL + "/auth/forgot-password";
    static resetPassword = REACT_APP_API_BASE_URL + "/auth/reset-password";
    static deletAccount = REACT_APP_API_BASE_URL + "/user/delete";
    // user Profile routes start
    static userProfile = REACT_APP_API_BASE_URL + "/user/profile";
    static updateUserProfile = REACT_APP_API_BASE_URL + "/user/update/profile/:id";
    static getFile = REACT_APP_API_BASE_URL + "/get/file/";
    static getStates = REACT_APP_API_BASE_URL + "/states";
    //static getLicenseTypes = REACT_APP_API_BASE_URL + "/license-types";
    static changePassword = REACT_APP_API_BASE_URL + "/user/change-password";
    static sellerProfile = REACT_APP_API_BASE_URL + "/user/seller/profile";
    // user Profile routes end

    // products routes start
    static getCategories = REACT_APP_API_BASE_URL + "/categories";
    static getMedrec = REACT_APP_API_BASE_URL + "/medrec";
    static getStrains = REACT_APP_API_BASE_URL + "/strains";
    static getIO = REACT_APP_API_BASE_URL + "/ioro";

    // cart routes start
    static getCartItems = REACT_APP_API_BASE_URL + "/cart/get-items";
    static addToCart = REACT_APP_API_BASE_URL + "/cart/add-item";
    static removeFromCart = REACT_APP_API_BASE_URL + "/cart/remove-item";
    static updateCartItem = REACT_APP_API_BASE_URL + "/cart/update-quantity";
    static requestQuote = REACT_APP_API_BASE_URL + "/cart/request-quote";
    // cart routes end

    // quote requests start
    static getQuoteRequests = REACT_APP_API_BASE_URL + "/quote-requests";
    static getRequestedQuotes = REACT_APP_API_BASE_URL + "/quote-requests/get-requested-quotes";
    static submitProductPrice = REACT_APP_API_BASE_URL + "/quote-requests/submit-product-price";
    static cancelQuote = REACT_APP_API_BASE_URL + "/quote-requests/cancel";
    // quote requests end

    // seller product routes start
    static addProduct = REACT_APP_API_BASE_URL + "/product";
    static productImageUpload = REACT_APP_API_BASE_URL + "/product/image-upload";
    static productImageRemove = REACT_APP_API_BASE_URL + "/product/image-remove";
    static getMyProducts = REACT_APP_API_BASE_URL + "/product/my";
    static myOrdersSeller = REACT_APP_API_BASE_URL + "/orders/seller";
    static changeProductStatus = REACT_APP_API_BASE_URL + "/product/change/status";
    static productReview = REACT_APP_API_BASE_URL + "/product/review";
    static quickEditProduct = REACT_APP_API_BASE_URL + "/product/quick-edit";

    // seller product routes end

    // brand details and subscription
    static dashboardOrdersHistory = REACT_APP_API_BASE_URL + "/dashboard/orders/history";
    static dashboardProductSoldByStrain = REACT_APP_API_BASE_URL + "/dashboard/sold/by/strain";
    static dashboardProductSoldByCategory = REACT_APP_API_BASE_URL + "/dashboard/sold/by/category";
    static brandDetails = REACT_APP_API_BASE_URL + "/brand";
    static subscribedPlan = REACT_APP_API_BASE_URL + "/brand/subscription"; // brand = seller
    static invoice = REACT_APP_API_BASE_URL + "/brand/invoice/";
    static reviews = REACT_APP_API_BASE_URL + "/brand/review/"; // brand = seller
    static getProfileDetails = REACT_APP_API_BASE_URL + "/brand/profile";

    // retailer details 
    static retailerDetails = REACT_APP_API_BASE_URL + "/user";
    static userDetails = REACT_APP_API_BASE_URL + "/user/fetchById";


    // retailer product routes start
    static getMyProduct = REACT_APP_API_BASE_URL + "/product";
    static getProductList = REACT_APP_API_BASE_URL + "/product/retailer/";
    static requestOrder = REACT_APP_API_BASE_URL + "/product/order";
    static myOrdersRetailer = REACT_APP_API_BASE_URL + "/orders/retailer";
    static addToFavourite = REACT_APP_API_BASE_URL + "/favourites/handle/favourite";
    static myFavourites = REACT_APP_API_BASE_URL + "/favourites";
    // retailer product routes end

    //both users start
    static updateOrder = REACT_APP_API_BASE_URL + "/orders";
    static messages = REACT_APP_API_BASE_URL + "/messages";
    static messagesUsersList = REACT_APP_API_BASE_URL + "/messages/users-list";
    static getMessages = REACT_APP_API_BASE_URL + "/messages/all-messages";
    static getUnreadCount = REACT_APP_API_BASE_URL + "/messages/get/unread/count";
    //both users end
    // products routes end

    static getPlans = REACT_APP_API_BASE_URL + "/plan";

    // cms routes start
    static getCmsData = REACT_APP_API_BASE_URL + "/cms";
    // cms routes end

    // contact us 
    static postContactUs = REACT_APP_API_BASE_URL + "/contact-us";
    static getContactUs = REACT_APP_API_BASE_URL + "/contact-us/settings";

    static storeFile = REACT_APP_API_BASE_URL + "/axis-point";

    //Followes
    static followers = REACT_APP_API_BASE_URL + "/followers";
    static follow = REACT_APP_API_BASE_URL + "/followers/follow";
    static followings = REACT_APP_API_BASE_URL + "/followers/followings";

    //Post
    static posts = REACT_APP_API_BASE_URL + "/posts";
    static singlePost = REACT_APP_API_BASE_URL + "/posts/single/";
    static postActivity = REACT_APP_API_BASE_URL + "/posts/activity";
    static repost = REACT_APP_API_BASE_URL + "/posts/repost";
    static axisPointPosts = REACT_APP_API_BASE_URL + "/posts/axis-point";

    //Comment
    static addComment = REACT_APP_API_BASE_URL + "/comment";
    static addCommentReply = REACT_APP_API_BASE_URL + "/comment/reply";
    static commentList = REACT_APP_API_BASE_URL + "/comment/list";
    static replyList = REACT_APP_API_BASE_URL + "/comment/replyList";
    static singleCommentReplies = REACT_APP_API_BASE_URL + "/comment/singleCommentReplies";
    // axios point
    static userWiseCompany = REACT_APP_API_BASE_URL + "/user/company";

    static handlePostLike = REACT_APP_API_BASE_URL + "/posts/handlePostLike";

}
