import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { CryptoService } from "../../domain/interfaces/crypto.service";
import { RequestLoginDto } from "../../application/dto/requestLogin.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterCompanyDto } from "../../application/dto/registerCompany.dto";
import { LoginResponseDto } from "../../application/dto/responseLogin.dto";


@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cryptoService: CryptoService,
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autenticación del usuario' })
    @ApiBody({ type: RequestLoginDto })
    @ApiResponse({ status: 200, description: 'Token JWT', type: LoginResponseDto })
    async login(
        @Body() body: RequestLoginDto): Promise<any> {
            try {
                return await this.authService.login(body);

            } catch (error) {
                throw new HttpException(
                    `Error en autenticación: ${error.message}`,
                    error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
                  );
                              }
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Creación de empresa' })
    @ApiResponse({ status: 200, description: 'Empresa registrada exitosamente', })
    @ApiBody({ type: RegisterCompanyDto })
    async register(@Body() body: RegisterCompanyDto):Promise<any> {
        try {
            return this.authService.registerCompany(body);
        } catch (error) {
            throw new HttpException(`Error en la Creación de empresa: ${error.message}`, error.status);  
        }
    }

}
