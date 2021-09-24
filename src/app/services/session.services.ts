export class SessionBase {
    dropSession() {
        localStorage.removeItem('cursession');
    }
    public setLocalStorage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }
    public getLocalStorage(key: string): any {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }
}