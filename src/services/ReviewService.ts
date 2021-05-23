import Container, { Service } from "typedi";
import { getRepository } from "typeorm";
import { Review } from "../entity/Review";
import { CourseService } from "./CourseService";
import { StudentService } from "./StudentService";

@Service()
export class ReviewService {
	private reviewRepository = getRepository(Review);

	async addReview(rating, review, courseId, studentId) {
		const courseService = Container.get(CourseService);
		const studentService = Container.get(StudentService);
		const course = await courseService.getCourseById(parseInt(courseId));
		const student = await studentService.getStudentById(
			parseInt(studentId)
		);
		const mReview = new Review();
		mReview.rating = rating;
		mReview.review = review;
		mReview.course = course;
		mReview.student = student;
		await this.reviewRepository.save(mReview);
		return { success: "Review Added Successfully" };
	}
}
