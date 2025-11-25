export type SingleNoteType = {
    id: string ;
    noteName: string | null | undefined;
    noteContent: string | null | undefined;
    dateCreation: Date | null | undefined;
    categories: string[];
    createdAt: Date ;
    updatedAt: Date ;
    __v?:  number;
    isPinned: boolean | null | undefined ;
    isLocked: boolean | null | undefined ;
    emailRef: string;
    listId: string | null | undefined;
    lockedPassword: string | null | undefined;
}