import * as UserNamespace from './namespace';

export class User {
    /**
     * Storage User Key
     */
    private _storageUserKey: string = '_User';

    /**
     * Storage Product Key
     */
    private _storageProductKey: string = '_Product';

    /**
     * User
     */
    private _user: UserNamespace.IUser = undefined;

    /**
     * Get User
     * @returns IUser
     */
    public get user(): UserNamespace.IUser {
        let storage = this.GetStorage();

        return !storage ? undefined : JSON.parse(JSON.stringify(storage));
    }

    /**
     * Set User
     * @param value IUser
     */
    public set user(value: UserNamespace.IUser) {
        this.SetStorage(value);
    }

    /**
     * Product
     */
    private _product: string = undefined;

    /**
     * Get Product
     * @returns string
     */
    public get product(): string {
        return this._product;
    }

    /**
     * Set Product
     * @param value IUser
     */
    public set product(value: string) {
        let storage: string = localStorage.getItem(this._storageProductKey);
        if (storage !== value) {
            this.SetStorage(undefined);
        }

        localStorage.setItem(this._storageProductKey, value);
        this._product = value;
    }

    /**
     * constructor
     */
    public constructor() {
        let storage = this.GetStorage();
    }

    /**
     * Get Storage
     * @returns IUser
     */
    private GetStorage(): UserNamespace.IUser {
        let storage: UserNamespace.IUser = undefined;
        try {
            storage = JSON.parse(localStorage.getItem(this._storageUserKey));
            if (typeof storage === 'string') {
                storage = undefined;
                throw '';
            }
        } catch (e) {}

        this.SetStorage(storage);

        return storage;
    }

    /**
     * Set Storage
     * @param storage IUser
     */
    private SetStorage(storage: UserNamespace.IUser): void {
        if (!storage) {
            localStorage.removeItem(this._storageUserKey);
            this._user = undefined;
        } else {
            storage = JSON.parse(JSON.stringify(storage));

            localStorage.setItem(this._storageUserKey, JSON.stringify(storage));
            this._user = storage;
        }
    }
}

export default new User();
