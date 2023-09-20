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
    //#endregion

    //#region Router
    'Router_/create': {
        'en-US': 'Create',
        'zh-TW': '建立',
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
        'en-US': 'Activity data download',
        'zh-TW': '活動資料下載',
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

    //#region Detect List
    Detect_StartDate: {
        'en-US': 'Start Date',
        'zh-TW': '開始日期',
    },
    Detect_EndDate: {
        'en-US': 'End Date',
        'zh-TW': '結束日期',
    },
    Detect_StartTime: {
        'en-US': 'Start Time',
        'zh-TW': '開始時間',
    },
    Detect_Endtime: {
        'en-US': 'End Time',
        'zh-TW': '結束時間',
    },
    Detect_Date_Time: {
        'en-US': 'Date Time',
        'zh-TW': '日期時間',
    },
    Detect_Picture: {
        'en-US': 'Picture',
        'zh-TW': '照片',
    },
    Detect_Object_Name: {
        'en-US': 'Object Name',
        'zh-TW': '物件名稱',
    },
    Detect_Snapshot: {
        'en-US': 'Snapshot',
        'zh-TW': '快照',
    },
    Detect_Source: {
        'en-US': 'Video Source',
        'zh-TW': '影像來源',
    },
    Detect_Source_Type: {
        'en-US': 'Type',
        'zh-TW': '類型',
    },
    Detect_Source_Name: {
        'en-US': 'Source Name',
        'zh-TW': '來源名稱',
    },
    Detect_KeywordPlaceholder: {
        'en-US': 'Search for object name or video source name',
        'zh-TW': '搜尋物件名稱或影像來源名稱',
    },
    Detect_DateFilter_ErrorMessage_StartDateGreaterEndDate: {
        'en-US': 'End date should be greater than or equal to start date',
        'zh-TW': '結束日期必須大於或等於開始日期',
    },
    //#endregion

    //#region Source Camera
    Source_Camera_Button_Delete: {
        'en-US': 'Delete',
        'zh-TW': '刪除',
    },
    Source_Camera_Button_Create: {
        'en-US': 'Create',
        'zh-TW': '新增',
    },
    Source_Camera_Action: {
        'en-US': 'Action',
        'zh-TW': '動作',
    },
    Source_Camera_Device: {
        'en-US': 'Device',
        'zh-TW': '設備',
    },
    Source_Camera_Note: {
        'en-US': 'Note',
        'zh-TW': '備註',
    },
    Source_Camera_Inference_Modal: {
        'en-US': 'Inference Modal',
        'zh-TW': '辨識模型',
    },
    Source_Camera_Name: {
        'en-US': 'Name',
        'zh-TW': '名稱',
    },
    Source_Camera_Type: {
        'en-US': 'Type',
        'zh-TW': '類型',
    },
    Source_Camera_Remark: {
        'en-US': 'Remark',
        'zh-TW': '註解',
    },
    Source_Camera_Create: {
        'en-US': 'Create Camera',
        'zh-TW': '建立相機',
    },
    Source_Camera_Edit: {
        'en-US': 'Edit Camera',
        'zh-TW': '編輯相機',
    },
    Source_Camera_RTSP_Placeholder: {
        'en-US': 'e.g. rtsp://username.password@192.168.0.100/rtsp_url',
        'zh-TW': '範例：rtsp://username.password@192.168.0.100/rtsp_url',
    },
    Source_Camera_RTSP_Regex_Error: {
        'en-US': 'RTSP format error',
        'zh-TW': 'RTSP 格式錯誤',
    },
    Source_Camera_Dropdown_SelectAll: {
        'en-US': 'All',
        'zh-TW': '全部',
    },
    Source_Camera_Dropdown_MaxElements: {
        'en-US': 'Options be selected, please remove selected item before select a new item',
        'zh-TW': '已選擇選項，選擇新項目之前請移除所選選項',
    },
    Source_Camera_Dropdown_NoResult: {
        'en-US': "Can't find select item , please search again",
        'zh-TW': '無資料，請再搜尋一次',
    },
    Source_Camera_Dropdown_NoOptions: {
        'en-US': 'Option lists is empty',
        'zh-TW': '無選項',
    },
    Source_Camera_DropdownPlaceholder: {
        'en-US': 'Please select options',
        'zh-TW': '請選擇選項',
    },
    Source_Camera_Dropdown_SearchPlaceholder: {
        'en-US': 'Search',
        'zh-TW': '搜尋',
    },
    Source_Camera_DialogDelete_Title: {
        'en-US': 'Inquire',
        'zh-TW': '詢問',
    },
    Source_Camera_DialogDelete_Message_item: {
        'en-US': 'Are you sure to delete this item?',
        'zh-TW': '你確定要刪除所選項目嗎？',
    },
    Source_Camera_DialogDelete_Message_items: {
        'en-US': 'Are you sure to delete these items?',
        'zh-TW': '你確定要刪除所選項目嗎？',
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
    Download_Member_AttendenceData: {
        'en-US': 'Attendence Data',
        'zh-TW': '活動數據',
    },
    //#endregion

    //#region Management Member
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
    //#endregion

    //#region Role Enum UserRole
    Role_Enum_EUserRole_SystemAdministrator: {
        'en-US': 'System Administrator',
        'zh-TW': '最高系統管理員',
    },
    Role_Enum_EUserRole_Administrator: {
        'en-US': 'Super User',
        'zh-TW': '超級使用者',
    },
    //#endregion

    //#region Source Camera Enum ECameraType
    Source_Camera_Enum_ECameraType_RTSP: {
        'en-US': 'RTSP',
        'zh-TW': 'RTSP',
    },
    Source_Camera_Enum_ECameraType_Webcam: {
        'en-US': 'Webcam',
        'zh-TW': 'Webcam',
    },
    //#endregion
};
