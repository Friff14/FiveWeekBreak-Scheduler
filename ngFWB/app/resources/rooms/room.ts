import { IBuilding } from '../buildings/building';

export interface IRoom {
    room_id: number;
    room_name: string;
    room_capacity: number;
    building: IBuilding;
}