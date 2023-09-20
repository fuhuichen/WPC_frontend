import { WebPath } from '@/config/path';
import { LayoutNavModel } from '@/../components';

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
        exactPath: true,
    },
    {
        title: undefined,
        titleI18nKey: 'Router_/w-location-management',
        href: WebPath.LocationList,
        exactPath: true,
    },
    {
        title: undefined,
        titleI18nKey: 'Router_/w-user-management',
        href: WebPath.UserList,
        exactPath: true,
    },
    //#endregion
];
