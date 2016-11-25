import { IBuilding } from '../buildings/building';

export interface IRoom {
    room_id: Number;
    room_name: string;
    room_capacity: Number;
    building: IBuilding;
}