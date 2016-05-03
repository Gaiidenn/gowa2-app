export class User {

    constructor(
        public Username: string,
        public Gender: string,
        public Likes: Array<string>,
        public Meets: Array<string>,
        public Age?: number
    ) {
        
    }
}
