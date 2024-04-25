import { Module } from "@nestjs/common"
import { UrlModule } from "./url/url.module"
import { ConfigModule } from "@nestjs/config"

@Module({
	imports: [ConfigModule.forRoot(), UrlModule]
})
export class AppModule {}
