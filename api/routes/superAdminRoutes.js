'use strict';

module.exports = function(app) {

var user = require('../controllers/userCtrl');
   app.route('/addUser')
     .post(user.signup)
    

var user = require('../controllers/userCtrl');
   app.route('/resetPassword')
     .post(user.reset_password);
     
var userdrag = require('../controllers/userCtrl');
   app.route('/serviceproviderdrag')
     .post(userdrag.dragdrop);

var userAdmin = require('../controllers/userCtrl');
   app.route('/addUserAdmin')
     .post(userAdmin.create_user_admin);

var updateId = require('../controllers/userCtrl');
   app.route('/updateregId')
    .post(updateId.update_reg_id);


var customerdelete = require('../controllers/userCtrl');
    app.route('/deleteCustomer/:id')
    .delete(customerdelete.delete_customer)
    .put(customerdelete.update_customer);


var customerstatusupdate = require('../controllers/userCtrl');
    app.route('/updateStatus/:id/:status')
    .put(customerstatusupdate.update_customer_status);


var userlogin = require('../controllers/userCtrl');
   app.route('/loginUser')
     .post(userlogin.user_login);


var adminlogin = require('../controllers/adminCtrl');
   app.route('/loginAdmin')
     .post(adminlogin.admin_login);


var fblogin = require('../controllers/userCtrl');
   app.route('/loginWithFb')
     .post(fblogin.login_with_fb);


var admindetail = require('../controllers/userCtrl');
  app.route('/adminDetail/:id')
     .get(admindetail.admin_Detail)
     .put(admindetail.update_admin_detail);


var adminData = require('../controllers/userCtrl');
  app.route('/getAdminData')
     .get(adminData.admin_Detail_help);


var checkUserLoggin = require('../controllers/userCtrl');
    app.route('/CheckUserStatus/:id')
     .get(checkUserLoggin.check_user_status)
     


var admindetailpassword = require('../controllers/userCtrl');
  app.route('/adminPassword/:id')
     .put(admindetailpassword.update_admin_password);


var serviceProviderDetail = require('../controllers/userCtrl');
  app.route('/getprofileData/:id')
     .get(serviceProviderDetail.get_service_provider_profile)
     .put(serviceProviderDetail.update_service_provider_password);


var userDetail = require('../controllers/userCtrl');
  app.route('/getuserprofileData/:id')
     .get(userDetail.get_user_profile_data)
     .put(userDetail.update_user_password);


var userprofileUpdate = require('../controllers/userCtrl');
    app.route('/updateuserprofileData/:id')
    .put(userprofileUpdate.update_user_profile);


var useraddressUpdate = require('../controllers/userCtrl');
    app.route('/updateUserAddress/:id')
    .put(useraddressUpdate.update_user_address);


var updateUserImage = require('../controllers/userCtrl');
    app.route('/updateUserProfile')
    .post(updateUserImage.update_User_Image);


var addUserAddress = require('../controllers/userCtrl');
    app.route('/addAddress')
    .post(addUserAddress.add_address_user);



var getuseraddress = require('../controllers/userCtrl');
  app.route('/getuserAddressData/:id')
     .get(getuseraddress.get_user_address_data)
     .put(getuseraddress.update_user_address_data);


var deletegetuseraddress = require('../controllers/userCtrl');
  app.route('/deletegetuserAddressData/:id')
     .post(deletegetuseraddress.delete_address_user);


var makeaddressdefualt = require('../controllers/userCtrl');
  app.route('/makeAddressDefualt/:id')
     .put(makeaddressdefualt.make_address_defualt);





    
     

//********************* ForGot password ************************
var forgotPassword = require('../controllers/userCtrl');
    app.route('/forgotpassword')
    .post(forgotPassword.forgot_password);

    

var otpVerfication = require('../controllers/userCtrl');
    app.route('/verifyOtp')
    .post(otpVerfication.otp_verification);
     

var updateForgotPassword = require('../controllers/userCtrl');
    app.route('/forgotPasswordData/:id')
    .put(updateForgotPassword.update_forgor_password);


//********************* singup OTP verification ******************
var otpverification = require('../controllers/userCtrl');
    app.route('/verifyaccount')
    .post(otpverification.signUp_verification);

// 

var otpVerficationForProfile = require('../controllers/userCtrl');
    app.route('/verifyOtpForProfile')
    .post(otpVerficationForProfile.otp_verification_for_profile);

//******************** Service Provider Route ********************
var serviceProvider = require('../controllers/serviceProvider');
   app.route('/addServiceProvider')
     .post(serviceProvider.add_service_provider)
     .get(serviceProvider.get_service_provider_list);

var serviceProvider1 = require('../controllers/serviceProvider');
   app.route('/addServiceProvider1')
  .get(serviceProvider.get_service_provider_list1);
     
var updateImageProvider = require('../controllers/serviceProvider');
    app.route('/updateProfile')
    .post(updateImageProvider.update_UserImage);


var profileUpdate = require('../controllers/serviceProvider');
    app.route('/updateprofileData/:id')
    .put(profileUpdate.update_service_provider_profile);


var serviceProviderdelete = require('../controllers/serviceProvider');
    app.route('/deleteServiceProvider/:id')
    .delete(serviceProviderdelete.delete_service_provider)
    .put(serviceProviderdelete.update_service_provider);


var serviceSettingUpdate = require('../controllers/serviceProvider');
    app.route('/serviceSetting')
    .post(serviceSettingUpdate.update_service_provider_setting);


var updateServiceWithoutlogo = require('../controllers/serviceProvider');
   app.route('/updateServiceWithoutLogo/:id')
     .put(updateServiceWithoutlogo.update_service_without_logo);


var addReviewdata = require('../controllers/serviceProvider');
   app.route('/addReview/:id')
     .put(addReviewdata.add_review);


 var getreviewbyuser = require('../controllers/serviceProvider');
   app.route('/getReviewbyUser/:id')
     .get(getreviewbyuser.get_user_by_review);    




//******************** category Route *************************
var addcategory = require('../controllers/categoryCtrl');
   app.route('/addCategory')
     .post(addcategory.add_category)
     .get(addcategory.get_category_list);
     

var categorydelete = require('../controllers/categoryCtrl');
    app.route('/deleteCategory/:id')
    .delete(categorydelete.delete_category)
    .put(categorydelete.update_category);




//******************* add service *****************************
var addservice = require('../controllers/addServiceCtrl');
   app.route('/addService')
     .post(addservice.add_service);


var addServiceWithImage = require('../controllers/addServiceCtrl');
    app.route('/addserviceImage')
    .post(addServiceWithImage.add_service_with_Image);

var updateWithImage = require('../controllers/addServiceCtrl');
    app.route('/updateserrviceImageURL')
    .post(updateWithImage.update_service_with_Image);


    


var getaddservice = require('../controllers/addServiceCtrl');
   app.route('/getServiceData/:id')
     .get(getaddservice.get_service_data)
     .delete(getaddservice.delete_service)
     .put(getaddservice.update_service);


var updatestatus = require('../controllers/addServiceCtrl');
   app.route('/updateStatus/:id')
     .put(updatestatus.update_status);




//******************* Get In Touch Route **********************
var getInTouch = require('../controllers/getInTouchCtrl');
   app.route('/getInTouchData')
     .post(getInTouch.add_get_in_touch);

var getintouchdata = require('../controllers/getInTouchCtrl');
   app.route('/getInTouchListData')
     .get(getintouchdata.get_in_touch_data)


//***************** About us page ************************ 
var aboutusdata = require('../controllers/getInTouchCtrl');
   app.route('/addAboutUsData')
     .post(aboutusdata.add_about_us_data); 

var aboutusdatafetch = require('../controllers/getInTouchCtrl');
   app.route('/getaboutusdata')
     .get(aboutusdatafetch.get_about_us_data);

var updateaboutus = require('../controllers/getInTouchCtrl');
   app.route('/editaboutusdata/:id')
     .put(updateaboutus.update_about_us_data);


var termsdatafetch = require('../controllers/getInTouchCtrl');
   app.route('/gettermsData')
     .get(termsdatafetch.get_terms_data);

var termsdataserprofetch = require('../controllers/getInTouchCtrl');
   app.route('/gettermSerProData')
     .get(termsdataserprofetch.get_terms_ser_pro_data);


var updateterms = require('../controllers/getInTouchCtrl');
   app.route('/editTermsData/:id')
     .put(updateterms.update_terms_data);

var updatetermserpro = require('../controllers/getInTouchCtrl');
   app.route('/editTermsDataSevPro/:id')
     .put(updatetermserpro.update_terms_data_ser_pro);

     


//****************** Service Setting *******************************
var updateServiceRate = require('../controllers/serviceSettingCtrl');
   app.route('/updateServiceBooking/:id')
     .put(updateServiceRate.update_rate_setting);


var updateServiceSchedule = require('../controllers/serviceSettingCtrl');
   app.route('/updateServiceSchdule/:id')
     .put(updateServiceSchedule.update_schdeule_setting);


var updateServicePaymnt = require('../controllers/serviceSettingCtrl');
   app.route('/updateServicePayment/:id')
     .put(updateServicePaymnt.update_payment_setting);



var updateServiceSlot = require('../controllers/serviceSettingCtrl');
   app.route('/updateServiceSlots/:id')
     .put(updateServiceSlot.update_slot_setting);

var updateSloatsData = require('../controllers/serviceSettingCtrl');
   app.route('/updateSloatsdata/:id')
     .put(updateSloatsData.update_slot_remove_settings);


var getRemoveSlotsData = require('../controllers/serviceSettingCtrl');
   app.route('/getRemoveSlots/:id')
     .get(getRemoveSlotsData.get_remove_slots_data)




//****************** Booking Order ******************************
var bookingOrder = require('../controllers/bookingOrderCtrl');
   app.route('/saveBookingOrder')
     .post(bookingOrder.save_booking_order);  


var getBookingOrder = require('../controllers/bookingOrderCtrl');
   app.route('/getBookingData/:id')
     .get(getBookingOrder.get_booking_data);
 
   app.route('/deleteBooking/:id')
     .get(getBookingOrder.delete_booking);
     

var getAllBookingOrder = require('../controllers/bookingOrderCtrl');
   app.route('/getAllBookingData/:id')
     .get(getAllBookingOrder.get_booking_data_by_service_provider)
     .put(getAllBookingOrder.update_approved_disappoved_status);


var cancelorderbyuser = require('../controllers/bookingOrderCtrl');
   app.route('/cancelOrderByUser/:id')
     .put(cancelorderbyuser.cancel_order_status);


var dashboardAllOrder = require('../controllers/adminDashboardCtrl');
   app.route('/getorderlist')
     .get(dashboardAllOrder.get_dashboard_booking_data);


var dashboardusers = require('../controllers/adminDashboardCtrl');
   app.route('/getorderAllList')
     .get(dashboardusers.get_all_user_count);


var updateStatusbyAdmin = require('../controllers/adminDashboardCtrl');
   app.route('/updataOrderStatusByAdmin/:id')
     .put(updateStatusbyAdmin.update_status_by_admin);


var allOrderList = require('../controllers/adminDashboardCtrl');
   app.route('/GetAllorderlist')
     .get(allOrderList.get_all_order_admin_data);


     
var getPayment = require('../controllers/adminDashboardCtrl');
  app.route('/getAllPaymentData')
     .get(getPayment.get_all_payments_data_for_admin)

     
// var getAdmin = require('../controllers/adminDashboardCtrl');
//   app.route('/getAdminData')
//      .get(getAdmin.get_admin_data)



// var checkMaidService = require('../controllers/bookingOrderCtrl');
//    app.route('/checkMaid/:id')
//      .get(checkMaidService.check_maid_service);



//********************* Notification Routes **************************
var notificationdata = require('../controllers/notificationCtrl');
   app.route('/getAllNotification/:id')
     .get(notificationdata.get_service_provider_notification);


var userNotificationdata = require('../controllers/notificationCtrl');
   app.route('/getAllNotificationUser/:id')
     .get(userNotificationdata.get_user_notification);


var updateReadystatus = require('../controllers/notificationCtrl');
   app.route('/UpdateReadyStatus/:id')
     .put(updateReadystatus.update_ready_status);


var adminNotificationdata = require('../controllers/notificationCtrl');
   app.route('/getAdminNotification')
     .get(adminNotificationdata.get_admin_notification);


var updateNotification = require('../controllers/notificationCtrl');
   app.route('/updatenotificationStatus/:id')
     .put(updateNotification.update_notification_read_status);

var updateAllNotification = require('../controllers/notificationCtrl');
   app.route('/updateallnotificationStatus')
     .post(updateAllNotification.update_allnotification_read_status);

var pushNotificationDatasev = require('../controllers/bookingOrderCtrl');
   app.route('/getNotificationOrder/:id')
     .get(pushNotificationDatasev.get_order_push_ser_prov);


     

    
//******************* Promo Code *******************************
var addpromocode = require('../controllers/promoCodeCtrl');
   app.route('/addPromoCode')
     .post(addpromocode.add_promo_code);  

var getPromoCodeData = require('../controllers/promoCodeCtrl');
   app.route('/getpromoCodeData/:id')
     .get(getPromoCodeData.get_promo_code_data)
     .delete(getPromoCodeData.delete_promo_code)
     .put(getPromoCodeData.update_promo_code);


//*******************  Add Deals *******************************  
var addDeals = require('../controllers/addDealsCtrl');
   app.route('/addDealsData')
     .post(addDeals.add_deals); 


var getAllDeals = require('../controllers/addDealsCtrl');
   app.route('/getDealByServiceProvider/:id')
     .get(getAllDeals.get_all_deals)
     .delete(getAllDeals.delete_deal)
     .put(getAllDeals.update_deal);


var getAllDealsByAdmin = require('../controllers/addDealsCtrl');
   app.route('/getAllDealsOfAdmin')
     .get(getAllDealsByAdmin.get_all_deals_by_admin);


var deleteDealbyAdmin = require('../controllers/addDealsCtrl');
   app.route('/deleteDeal/:id')
     .delete(deleteDealbyAdmin.delete_deal_by_admin)
     .put(deleteDealbyAdmin.update_deal_by_admin);


var BookNewOrderByUserByDeals = require('../controllers/addDealsCtrl');
   app.route('/bookDealByUser')
     .post(BookNewOrderByUserByDeals.save_deal_booking_order); 


var getAllBookingDeals = require('../controllers/addDealsCtrl');
   app.route('/getAllBookDeal')
     .get(getAllBookingDeals.get_all_booking_deals);


var getAllDealsForUsers = require('../controllers/addDealsCtrl');
   app.route('/getDealByUser/:id')
     .get(getAllDealsForUsers.get_all_deals_by_user);


var getAllDealsForserviceProvider = require('../controllers/addDealsCtrl');
   app.route('/getDealByservpro/:id')
     .get(getAllDealsForserviceProvider.get_all_deals_by_service_provider);

var approveDeals = require('../controllers/addDealsCtrl');
   app.route('/approveDisapproveDeal/:id')
     .put(approveDeals.approve_disapprove_deals);





    
};