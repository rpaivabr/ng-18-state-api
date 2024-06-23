import { ApiProperty } from "@nestjs/swagger";

export interface ICoffee {
    id: number;
    name: string;
    description: string;
    price: number;
    region: string;
    weight: number;
    flavor_profile: string[];
    grind_option: string[];
    roast_level:number;
    image_url: string;
}

export class Coffee implements ICoffee {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    region: string;
    @ApiProperty()
    weight: number;
    @ApiProperty()
    flavor_profile: string[];
    @ApiProperty()
    grind_option: string[];
    @ApiProperty()
    roast_level: number;
    @ApiProperty()
    image_url: string;
}
