import { define } from "typeorm-seeding";
import { Category } from "../entity/Category";

define(Category, (faker) => {
	const category = new Category();
	category.title = faker.random.word();
	category.thumbnail = faker.image.avatar();
	return category;
});
