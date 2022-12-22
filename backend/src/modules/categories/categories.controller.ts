import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ResponseSuccess } from "src/common/dto/response.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CategoriesService } from "./categories.service";

@UseGuards(JwtAuthGuard)
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    const categories = await this.categoriesService.getAllCategories();
    return new ResponseSuccess("Categories", categories);
  }
}
