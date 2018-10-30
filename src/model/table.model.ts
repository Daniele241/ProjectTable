export class TableModel { 
    constructor(
        public plant: string,
        public competitorCode: string,
        public competitor: string,
        public productCode: number,
        public product: string,
        public Date: Date,
        public document: number,
        public id?: number
    ) {}
}