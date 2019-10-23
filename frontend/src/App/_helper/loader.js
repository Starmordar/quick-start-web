export const DEFAULT_LOADER = document.querySelector('.white-back');
export const HIDE_CLASSNAME = "white-back--hide";

export class Loader {
    constructor(loaderDOM, loaderHideClassname) {
        this.loader = loaderDOM
        this.hideClass = loaderHideClassname
    }

    showLoader = () => this.loader.classList.remove(this.hideClass);

    hideLoader = () => this.loader.classList.add(this.hideClass);
}
