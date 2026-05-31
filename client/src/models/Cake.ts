export class Cake {
    id: number
    tags: string[]
    photo: string
    constructor(
        id: number,
        tags: string[],
        photo: string
    ) {
        this.id = id;
        this.tags = tags;
        this.photo = photo
    }
}
