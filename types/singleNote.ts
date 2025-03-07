export type SingleNoteType = {
    _id: string ;
    noteName: string ;
    noteContent: string ;
    dateCreation: Date ;
    categories: string[] ;
    createdAt: Date ;
    updatedAt: Date ;
    __v:  number;
    isPinned: boolean ;
}