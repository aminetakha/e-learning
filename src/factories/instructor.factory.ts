import { define } from "typeorm-seeding";
import { name, lorem } from "faker";
import { Instructor } from "../entity/Instructor";

define(Instructor, (faker) => {
	const user = new Instructor();
	user.username = name.firstName();
	user.about = lorem.sentences(4);
	user.email = lorem.sentences(1);
	user.password = faker.random.word();
	user.website = lorem.sentences(1);
	user.github = lorem.sentences(1);
	user.youtube = lorem.sentences(1);
	user.twitter = lorem.sentences(1);
	user.country = lorem.sentences(1);
	user.photo = faker.image.avatar();
	return user;
});
