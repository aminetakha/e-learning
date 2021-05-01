import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Category } from "../entity/Category";

@Service()
export class CategoryService {
	private categoryRepository = getRepository(Category);

	async getAll() {
		const categories = await this.categoryRepository.find();
		return categories;
	}

	async getByTitle(title: string) {
		const category = await this.categoryRepository.find({
			where: { title },
			relations: ["courses"],
		});
		return category;
	}
}
