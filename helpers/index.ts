import { Environment } from '@/config/env';

import { ServiceRegexClass } from '@advantech/service-regex';
export { ServiceRegexClass as Regex } from '@advantech/service-regex';
export const RegexService = new ServiceRegexClass();

import { Utility } from '@/helpers/utility/utility';
import * as UtilityNamespace from '@/helpers/utility/namespace';
export { Utility, UtilityNamespace };
export const UtilityService = new Utility();

import { User } from '@/helpers/user/user';
import * as UserNamespace from '@/helpers/user/namespace';
export { User, UserNamespace };
export const UserService = new User();

import { Server } from '@/helpers/server';
import * as ServerNamespace from '@/helpers/server/namespace';
export { Server, ServerNamespace };
export const ServerService = new Server(Environment.BaseUrl.default);
ServerService._authorization = !UserService.user ? undefined : UserService.user.sessionId;
ServerService.Initialization();

export * as ResolveTextService from './utilities/resolve-text';

import { ServiceResponseFilter } from '@/helpers/response-filter';
export const ResponseFilterService = new ServiceResponseFilter();
