import {create} from 'zustand'
import { productState } from '../types/ProductState'

const useProductStore = create<productState>((set)=>({
    isOpen:false,
    CloseFn: (isOpen)=>set(()=>({isOpen:false})),
    openFn: (isOpen)=>set(()=>({isOpen:true}))
}))


export default useProductStore