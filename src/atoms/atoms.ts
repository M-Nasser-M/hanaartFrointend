import { Session } from "@/types/sharedTypes";
import { atom } from "jotai";

export const sessionAtom = atom<Session | null>(null);
