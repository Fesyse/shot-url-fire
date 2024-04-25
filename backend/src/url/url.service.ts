import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { generate } from "randomstring"
import { UrlDto, UrlGetDto } from "./dto/url.dto"

@Injectable()
export class UrlService {
	constructor(private prisma: PrismaService) {}

	async createUid(dto: UrlDto) {
		const { url } = dto
		const existingUrl = await this.prisma.url.findUnique({ where: { url } })
		if (existingUrl) return existingUrl

		const newUid = generate(7)
		return this.prisma.url.create({
			data: {
				uid: newUid,
				url
			}
		})
	}

	getUrl(dto: UrlGetDto) {
		const { uid } = dto
		return this.prisma.url.findUnique({
			where: { uid }
		})
	}
}
