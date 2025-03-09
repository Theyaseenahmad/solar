export type productState = {
    isOpen:boolean,
    CloseFn : (isOpen:boolean) => void,
    openFn : (isOpen:boolean) => void
}