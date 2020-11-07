export class BasicDescriptions {
    constructor(
        public Name: string,
        public Email: string,
        public MobileNumber: string,
        public ItemTitle:string,
        public ItemCategory:string,
        public Count:number,
        public Desc:string,
        public Latitude:number,
        public Longitude: number,
        public PricePerItem: number,
        public ImageFilenames=[]
        
    ){
    }
}
