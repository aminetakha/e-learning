import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Content from "./Content";
import QASection from "./QASection";
import Replies from "./Replies";

const CourseVideo = () => {
	const [course, setCourse] = useState();
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filename, setFilename] = useState("");
	const [answers, setAnswers] = useState([]);
	const [loadingAnswers, setLoadingAnswers] = useState(true);
	const [showRepliesSection, setShowRepliesSection] = useState(false);
	const { title } = useParams();

	useEffect(() => {
		axios
			.get("/courses/" + title + "/files", { withCredentials: true })
			.then((res) => {
				setCourse(res.data);
				setFilename(res.data.sections[0].files[0].name);
				setQuestions(res.data.sections[0].files[0]);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [title]);

	const readFileHandler = (filename, fileIndex, sectionIndex) => {
		console.log(course.sections[sectionIndex].files[fileIndex]);
		setQuestions(course.sections[sectionIndex].files[fileIndex]);
		setFilename(filename);
	};

	const showReplies = async (questionId) => {
		setShowRepliesSection(true);
		const answers = await axios.get(`/questions/${questionId}/replies`, {
			withCredentials: true,
		});
		console.log("SHOW REPLIES", answers.data.answers);
		setAnswers(answers.data.answers);
		setLoadingAnswers(false);
	};

	const showQuestionsHandler = () => {
		setShowRepliesSection(false);
		setAnswers([]);
		setLoadingAnswers(true);
	};

	const addQuestion = (question) => {
		const newQuestions = [question, ...questions.questions];
		setQuestions({ ...questions, questions: newQuestions });
	};

	const addAnswer = (answer) => {
		const newAnswers = [answer, ...answers.answers];
		setAnswers({ ...answers, answers: newAnswers });
	};

	return (
		<>
			{loading ? (
				<p>loading...</p>
			) : (
				<>
					<div style={{ display: "flex", height: "450px" }}>
						<div style={{ flex: 3 }}>
							<video
								width="100%"
								height="100%"
								controls
								key={`/${filename}.mp4`}
							>
								<source
									src={`/${filename}.mp4`}
									type="video/mp4"
								/>
							</video>
						</div>
						<div style={{ flex: 1, height: "100%" }}>
							<Content
								course={course}
								readFile={readFileHandler}
							/>
						</div>
					</div>
					<div style={{ marginTop: "30px" }}>
						{!showRepliesSection ? (
							<QASection
								questions={questions}
								showReplies={showReplies}
								addQuestion={addQuestion}
							/>
						) : (
							<Replies
								loading={loadingAnswers}
								answers={answers}
								showQuestions={showQuestionsHandler}
								addAnswer={addAnswer}
							/>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default CourseVideo;
