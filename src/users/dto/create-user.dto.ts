import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({example: 'use@gmail.com', description: 'E-mail'})
    readonly email: string;
    @ApiProperty({example: 'password', description: 'Password'})
    readonly password: string;
}
