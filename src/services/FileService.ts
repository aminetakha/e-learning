import { Service } from "typedi";
import { getRepository } from "typeorm";
import { File } from "../entity/File";
import { Section } from "../entity/Section";

@Service()
export class FileService {
	private sectionRepository = getRepository(Section);
	private fileRepository = getRepository(File);

	async findSectionById(id: number) {
		const section = this.sectionRepository.findOne(id, {
			relations: ["course"],
		});
		return section;
	}

	async uploadFileForSection(sectionId: number, filename: string) {
		const section = await this.findSectionById(sectionId);
		const course = section.course;
		const file = new File();
		file.name = filename;
		file.section = section;
		file.course = course;
		const created = this.fileRepository.save(file);
		return created;
	}
}
