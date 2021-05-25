import { Service } from "typedi";
import { getRepository } from "typeorm";
import { InstructorDto } from "../dto/instructorDto";
import { Instructor } from "../entity/Instructor";

@Service()
export class InstructorService {
	private instructorRepository = getRepository(Instructor);

	async getAll(): Promise<Instructor[]> {
		return this.instructorRepository.find();
	}

	async findById(id: number): Promise<Instructor> {
		return this.instructorRepository.findOne({ id });
	}

	async findUserCourses(id: number) {
		const data = await this.instructorRepository.findOne(id, {
			relations: ["courses", "courses.reviews"],
		});
		return data;
	}

	async update(id: number, instructorDto: InstructorDto) {
		let instructor = await this.findById(id);
		instructor.username = instructorDto.username;
		instructor.about = instructorDto.about;
		instructor.website = instructorDto.website;
		instructor.github = instructorDto.github;
		instructor.twitter = instructorDto.twitter;
		instructor.youtube = instructorDto.youtube;
		instructor = await this.instructorRepository.save(instructor);
		return instructor;
	}

	async delete(id: number) {
		await this.instructorRepository.delete({ id });
	}

	async getAllInstructors() {
		const instructors = await this.instructorRepository.find({
			select: ["id", "username", "photo"],
		});
		return instructors;
	}
}
