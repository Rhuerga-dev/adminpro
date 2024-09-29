export class User {

    constructor(

        public name:      string,
        public email:     string,
        public password?: string,
        public img?:      string,
        public google?:   Boolean,
        public role?:     string,
        public uid?:      string,

    ) { }
}