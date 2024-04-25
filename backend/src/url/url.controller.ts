import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from "@nestjs/common"
import { UrlService } from "./url.service"
import { UrlDto, UrlGetDto } from "./dto/url.dto"

@Controller("url")
export class UrlController {
	constructor(private readonly urlService: UrlService) {}

	@UsePipes(new ValidationPipe())
	@Post("get-url")
	@HttpCode(200)
	async getUrl(@Body() dto: UrlGetDto) {
		return this.urlService.getUrl(dto)
	}

	@UsePipes(new ValidationPipe())
	@Post("create")
	@HttpCode(200)
	async createUid(@Body() dto: UrlDto) {
		const response = await this.urlService.createUid(dto)
		return response
	}
}
