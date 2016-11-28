import {IBuilding} from "../buildings/building";
/**
 * Created by doebo on 11/27/2016.
 */
export class Room{
    constructor(
        public room_name: string,
        public room_capacity: number,
        public building: IBuilding
    ){

    }
}