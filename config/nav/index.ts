import { WebPath } from '@/config/path';
import { LayoutNavModel } from '@/../components';
import { EUserRole } from '@/enums';

/**
 *
 */
export const NavSystemAdministratorListOriginal: LayoutNavModel.IList[] = [
    //#region Download
    {
        title: undefined,
        titleI18nKey: 'Router_/w-download',
        href: undefined,
        exactPath: true,
        child: [
            {
                title: undefined,
                titleI18nKey: 'Router_/w-download/course',
                href: WebPath.CourseDownload,
                exactPath: true,
            },
            {
                title: undefined,
                titleI18nKey: 'Router_/w-download/location',
                href: WebPath.LocationDownload,
                exactPath: true,
            },
            {
                title: undefined,
                titleI18nKey: 'Router_/w-download/member',
                href: WebPath.MemberDownload,
                exactPath: true,
            },
        ],
    },
    //#endregion

    //#region Management
    {
        title: undefined,
        titleI18nKey: 'Router_/w-course-management',
        href: WebPath.CourseList,
        isLock: true,
        exactPath: true,
        auth: [EUserRole.Administrator, EUserRole.Manager],
    },
    {
        title: undefined,
        titleI18nKey: 'Router_/w-location-management',
        href: WebPath.LocationList,
        isLock: true,
        exactPath: true,
        auth: [EUserRole.Administrator, EUserRole.Manager],
    },
    {
        title: undefined,
        titleI18nKey: 'Router_/w-user-management',
        href: WebPath.UserList,
        isLock: true,
        exactPath: true,
        auth: [EUserRole.Administrator],
    },
    //#endregion
];
