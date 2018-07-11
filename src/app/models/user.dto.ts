import { ClientDTO } from "./client.dto";

export interface UserDTO {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
    client: ClientDTO;
}
