import { II18n } from '@/../helpers/i18n/namespace.gen';

export const I18n = {
    //#region Common
    Common_NO: {
        'en-US': 'NO',
        'zh-TW': '編號',
    },
    Common_Account: {
        'en-US': 'Account',
        'zh-TW': '帳號',
    },
    Common_Role: {
        'en-US': 'Role',
        'zh-TW': '角色',
    },
    Common_Email: {
        'en-US': 'Email',
        'zh-TW': '電子郵件',
    },
    Common_PersonName: {
        'en-US': 'Name',
        'zh-TW': '姓名',
    },
    Common_Keyword: {
        'en-US': 'Keyword',
        'zh-TW': '關鍵字',
    },
    Common_Status_Error: {
        'en-US': 'Error',
        'zh-TW': '錯誤',
    },
    Common_SuccessCount: {
        'en-US': 'Success count',
        'zh-TW': '成功筆數',
    },
    Common_Edit: {
        'en-US': 'Edit',
        'zh-TW': '編輯',
    },
    Common_Create: {
        'en-US': 'Create',
        'zh-TW': '新增',
    },
    Common_Action: {
        'en-US': 'Action',
        'zh-TW': '動作',
    },
    Common_ErrorFormat_Password: {
        'en-US': 'At least 3 characters',
        'zh-TW': '至少3 個字符',
    },
    Common_ErrorFormat_ConfirmPassword: {
        'en-US': 'Password and confirm password do not match',
        'zh-TW': '密碼和確認密碼不匹配',
    },
    Common_PasswordPrevious: {
        'en-US': 'Previous Password',
        'zh-TW': '原始密碼',
    },
    Common_Password: {
        'en-US': 'Password',
        'zh-TW': '密碼',
    },
    Common_PasswordConfirm: {
        'en-US': 'Confirm Password',
        'zh-TW': '確認密碼',
    },
    Common_Date: {
        'en-US': 'Data',
        'zh-TW': '日期',
    },
    Common_Time: {
        'en-US': 'Time',
        'zh-TW': '時間',
    },
    Common_ErrorFormat_Email: {
        'en-US': 'Email format is incorrect',
        'zh-TW': '不符合Email格式',
    },
    //#endregion

    //#region Form
    Form_ValueRequire: {
        'en-US': 'is Required Field',
        'zh-TW': '為必填欄位',
    },
    //#endregion

    //#region Button
    Button_Cancel: {
        'en-US': 'Cancel',
        'zh-TW': '取消',
    },
    Button_Save: {
        'en-US': 'Save',
        'zh-TW': '儲存',
    },
    Button_Confirm: {
        'en-US': 'Confirm',
        'zh-TW': '確認',
    },
    Button_Reset: {
        'en-US': 'Reset',
        'zh-TW': '重置',
    },
    Button_Search: {
        'en-US': 'Search',
        'zh-TW': '搜尋',
    },
    Button_Export: {
        'en-US': 'Export',
        'zh-TW': '匯出',
    },
    Button_Edit: {
        'en-US': 'Edit',
        'zh-TW': '編輯',
    },
    Button_Delete: {
        'en-US': 'Delete',
        'zh-TW': '刪除',
    },
    //#endregion

    //#region Dialog
    Dialog_Warning: {
        'en-US': 'Warning',
        'zh-TW': '警告',
    },
    Dialog_Question: {
        'en-US': 'Question',
        'zh-TW': '詢問',
    },
    Dialog_ErrorMessage: {
        'en-US': 'Error Message',
        'zh-TW': '錯誤訊息',
    },
    Dialog_Error_ShowMoreDetail: {
        'en-US': 'Show More Detail',
        'zh-TW': '顯示更多細節',
    },
    Dialog_Error_Detail: {
        'en-US': 'Detail',
        'zh-TW': '細節',
    },
    Dialog_DeleteMessage_items: {
        'en-US': 'Are you sure to delete these items?',
        'zh-TW': '你確定要刪除所選項目嗎？',
    },
    //#endregion

    //#region Table
    Table_Total: {
        'en-US': 'Total Data : ',
        'zh-TW': '全部資料：',
    },
    Table_NowAtPage: {
        'en-US': 'Now at page',
        'zh-TW': '現在頁數',
    },
    Table_DisplayRowCount: {
        'en-US': 'Display row count',
        'zh-TW': '每頁顯示筆數',
    },
    Table_Privious5Page: {
        'en-US': 'Privious 5 page',
        'zh-TW': '前5頁',
    },
    Table_Next5Page: {
        'en-US': 'Next 5 page',
        'zh-TW': '後5頁',
    },
    //#endregion

    //#region Form
    Form_Value_Required: {
        'en-US': 'is Required Field',
        'zh-TW': '為必填欄位',
    },
    //#endregion

    //#region Server_Exception_xxx
    Server_Exception_Response_Fail: {
        'en-US': "We can't connect to server, please try again",
        'zh-TW': '無法連線至伺服器，請重試',
    },
    Server_Exception_400: {
        'en-US': 'Error in submission, please try again',
        'zh-TW': '提交資料錯誤，請再次嘗試',
    },
    Server_Exception_401: {
        'en-US': 'Identity verification failed, please login again',
        'zh-TW': '身分驗證失敗，請重新登入',
    },
    Server_Exception_403: {
        'en-US': 'Permission denied',
        'zh-TW': '權限被拒絕',
    },
    Server_Exception_500: {
        'en-US': 'Some errors have occurred, please contact the system administrator, thank you',
        'zh-TW': '發生了某些錯誤，請聯絡系統管理員，謝謝',
    },
    Server_ERR_ITEM_NOT_EXIST: {
        'en-US': 'account is not existed',
        'zh-TW': '使用者不存在',
    },
    Server_ERR_INVALID_PARAMETER: {
        'en-US': 'Invalid parameter',
        'zh-TW': '參數缺少或錯誤',
    },
    Server_ERR_AUTH_FAIL: {
        'en-US': 'account or password is wrong',
        'zh-TW': '密碼錯誤',
    },
    Server_ERR_INVALID_PERMSSION: {
        'en-US': 'No permission',
        'zh-TW': '無權限',
    },
    Server_ERR_INVALID_TOKEN: {
        'en-US': 'please log in',
        'zh-TW': '登入過期，請重新登入',
    },
    Server_ERR_ITEM_EXIST: {
        'en-US': 'User already exists',
        'zh-TW': '使用者已存在',
    },
    //#endregion

    //#region Router
    'Router_/create': {
        'en-US': 'Create',
        'zh-TW': '建立',
    },
    'Router_/data': {
        'en-US': 'Data',
        'zh-TW': '數據',
    },
    'Router_/edit': {
        'en-US': 'Edit',
        'zh-TW': '編輯',
    },
    'Router_/view': {
        'en-US': 'View',
        'zh-TW': '檢視',
    },
    'Router_/w-home': {
        'en-US': 'Home',
        'zh-TW': '首頁',
    },
    'Router_/w-download': {
        'en-US': 'Activity data',
        'zh-TW': '活動數據',
    },
    'Router_/w-download/course': {
        'en-US': 'Course attendance',
        'zh-TW': '課程參與數據',
    },
    'Router_/w-download/location': {
        'en-US': 'Location visit data',
        'zh-TW': '地點參觀數據',
    },
    'Router_/w-download/member': {
        'en-US': 'Memebr data',
        'zh-TW': '會員活動數據',
    },
    'Router_/w-course-management': {
        'en-US': 'Course management',
        'zh-TW': '課程資料管理',
    },
    'Router_/w-course-management/list': {
        'en-US': 'List',
        'zh-TW': '清單',
    },
    'Router_/w-location-management': {
        'en-US': 'Location management',
        'zh-TW': '地點資料管理',
    },
    'Router_/w-location-management/list': {
        'en-US': 'List',
        'zh-TW': '清單',
    },
    'Router_/w-user-management': {
        'en-US': 'User management',
        'zh-TW': '使用者資料管理',
    },
    'Router_/w-user-management/list': {
        'en-US': 'List',
        'zh-TW': '清單',
    },
    'Router_/w-change-password': {
        'en-US': 'Change Password',
        'zh-TW': '更改密碼',
    },
    //#endregion

    //#region View Login
    View_Login_Welcome: {
        'en-US': 'Welcome',
        'zh-TW': '歡迎',
    },
    View_Login_Title: {
        'en-US': 'WPC iEvent System',
        'zh-TW': 'WPC iEvent System',
    },
    View_Login_RememberMe: {
        'en-US': 'Remember Me',
        'zh-TW': '記住登入資訊',
    },
    View_Login_ForgotPassword: {
        'en-US': 'Forgot Password',
        'zh-TW': '忘記密碼',
    },
    View_Login_LoginButtonText: {
        'en-US': 'Login',
        'zh-TW': '登入',
    },
    View_Login_AccountPlaceholder: {
        'en-US': 'Email',
        'zh-TW': '電子郵件',
    },
    View_Login_PasswordPlaceholder: {
        'en-US': 'Password',
        'zh-TW': '密碼',
    },
    //#endregion

    //#region Password
    Password_PasswordRule: {
        'en-US': 'Password rules: ',
        'zh-TW': '密碼規則：',
    },
    Password_AtLeast8Characters: {
        'en-US': 'At least 3 characters',
        'zh-TW': '至少3 個字符',
    },
    Password_AtLeastCapital: {
        'en-US': 'At least 1 capital english alphabet',
        'zh-TW': '至少1 個大寫英文字母',
    },
    Password_AtLeastLowercase: {
        'en-US': 'At least 1 lowercase english alphabet',
        'zh-TW': '至少1 個小寫英文字母',
    },
    Password_AtLeastNumber: {
        'en-US': 'At least 1 number',
        'zh-TW': '至少1 個數字',
    },
    Password_AtLeastSpecial: {
        'en-US': 'Recommended to use at least 1 special symbol',
        'zh-TW': '建議至少使用1 個特殊符號',
    },
    Password_ChangePassword: {
        'en-US': 'Change Password',
        'zh-TW': '更改密碼',
    },
    User_ChangePassword: {
        'en-US': 'Change Password',
        'zh-TW': '更改密碼',
    },
    //#endregion

    //#region Multiselect
    Multiselect_ListIsEmpty: {
        'en-US': 'Option list is Empty',
        'zh-TW': '選項清單為空',
    },
    Multiselect_NoResult: {
        'en-US': 'No data found. Consider changing the search query',
        'zh-TW': '找不到資料，請更改搜尋條件後再次查詢',
    },
    Multiselect_MaxElements: {
        'en-US': 'Maximum options selected. First remove a selected option to select another',
        'zh-TW': '已達選擇數量上限，請先移除選定項目後再選擇新項目',
    },
    Multiselect_SelectAll: {
        'en-US': 'Select All',
        'zh-TW': '全選',
    },
    Multiselect_SearchPlaceholder: {
        'en-US': 'Search',
        'zh-TW': '搜尋',
    },
    Multiselect_DropdownPlaceholder: {
        'en-US': 'Please select options',
        'zh-TW': '請選擇選項',
    },
    Multiselect_Dropdown_SearchPlaceholder: {
        'en-US': 'Search',
        'zh-TW': '搜尋',
    },
    //#endregion

    //#region User
    User_Language: {
        'en-US': 'Language',
        'zh-TW': '語言',
    },
    User_Logout: {
        'en-US': 'Logout',
        'zh-TW': '登出',
    },
    //#endregion

    //#region Download Course
    Download_Course_BgName: {
        'en-US': 'BG Name',
        'zh-TW': 'BG Name',
    },
    Download_Course_SectorName: {
        'en-US': 'Sector Name',
        'zh-TW': 'Sector Name',
    },
    Download_Course_CourseName: {
        'en-US': 'Course Name',
        'zh-TW': 'Course Name',
    },
    Download_Course_AttendenceName: {
        'en-US': 'Attendence Name',
        'zh-TW': 'Attendence Name',
    },
    Download_Course_AttendenceEmail: {
        'en-US': 'Attendence Email',
        'zh-TW': 'Attendence Email',
    },
    Download_Course_CheckTime: {
        'en-US': 'Check Time',
        'zh-TW': 'Check Time',
    },
    //#endregion

    //#region Download Location
    Download_Location_LocationName: {
        'en-US': 'Location Name',
        'zh-TW': 'Location Name',
    },
    Download_Location_Type: {
        'en-US': 'Type',
        'zh-TW': 'Type',
    },
    Download_Location_SiteType: {
        'en-US': 'Site type',
        'zh-TW': 'Site type',
    },
    Download_Location_SiteName: {
        'en-US': 'Site Name',
        'zh-TW': 'Site Name',
    },
    Download_Location_AttendenceName: {
        'en-US': 'Attendence Name',
        'zh-TW': 'Attendence Name',
    },
    Download_Location_AttendenceEmail: {
        'en-US': 'Attendence Email',
        'zh-TW': 'Attendence Email',
    },
    Download_Location_CheckTime: {
        'en-US': 'Check Time',
        'zh-TW': 'Check Time',
    },
    //#endregion

    //#region Download Member
    Download_Member_KeywordPlaceholder: {
        'en-US': "Please enter member's Email",
        'zh-TW': '會員Email輸入',
    },
    Download_Member_QRCodeNumber: {
        'en-US': 'QR Code Number',
        'zh-TW': 'QR Code Number',
    },
    Download_Member_AttendenceName: {
        'en-US': 'Attendence Name',
        'zh-TW': 'Attendence Name',
    },
    Download_Member_AttendenceEmail: {
        'en-US': 'Attendence Email',
        'zh-TW': 'Attendence Email',
    },
    Download_Member_CheckTime: {
        'en-US': 'Check Time',
        'zh-TW': 'Check Time',
    },
    Download_Member_ActionType: {
        'en-US': 'Action Type',
        'zh-TW': 'Action Type',
    },
    Download_Member_WPCPoint: {
        'en-US': 'WPC Point',
        'zh-TW': 'WPC Point',
    },
    Download_Member_TotalWPCPoint: {
        'en-US': 'Total WPC Point',
        'zh-TW': 'Total WPC Point',
    },
    Download_Member_qty: {
        'en-US': 'qty',
        'zh-TW': 'qty',
    },
    Download_Member_CourseName: {
        'en-US': 'Course Name',
        'zh-TW': 'Course Name',
    },
    Download_Member_SiteName: {
        'en-US': 'Site Name',
        'zh-TW': 'Site Name',
    },
    Download_Member_ItemName: {
        'en-US': 'Item Name',
        'zh-TW': 'Item Name',
    },
    Download_Member_AttendenceData: {
        'en-US': 'Attendence Data',
        'zh-TW': '活動數據',
    },
    //#endregion

    //#region Management Member
    Management_Member_Type: {
        'en-US': 'Type',
        'zh-TW': 'Type',
    },
    Management_Member_Name: {
        'en-US': 'Name',
        'zh-TW': 'Name',
    },
    Management_Member_Email: {
        'en-US': 'Email',
        'zh-TW': 'Email',
    },
    Management_Member_Password: {
        'en-US': 'Password',
        'zh-TW': 'Password',
    },
    Management_Member_Note: {
        'en-US': 'Note',
        'zh-TW': 'Note',
    },
    Management_Member_Point: {
        'en-US': 'Point',
        'zh-TW': 'Point',
    },
    //#endregion

    //#region Management Course
    Management_Course_Date: {
        'en-US': 'Date',
        'zh-TW': 'Date',
    },
    Management_Course_Time: {
        'en-US': 'Time',
        'zh-TW': 'Time',
    },
    //#endregion

    //#region Role Enum UserRole
    Role_Enum_EUserRole_SystemAdministrator: {
        'en-US': 'System Administrator',
        'zh-TW': '最高系統管理員',
    },
    Role_Enum_EUserRole_admin: {
        'en-US': 'Admin',
        'zh-TW': 'Admin',
    },
    Role_Enum_EUserRole_manager: {
        'en-US': 'Manager',
        'zh-TW': 'Manager',
    },
    Role_Enum_EUserRole_user: {
        'en-US': 'user',
        'zh-TW': 'user',
    },
    //#endregion
};
