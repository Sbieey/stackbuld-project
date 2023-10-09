import {atom} from "jotai";

const sliceStartAtom = atom(0)
const sliceEndAtom = atom(6)
const currentPageAtom = atom(1)

export{
    sliceEndAtom,
    sliceStartAtom,
    currentPageAtom
}