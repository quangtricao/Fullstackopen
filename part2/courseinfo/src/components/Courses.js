const Header = (props) => {
	return (
		<>
			<h2>{props.name}</h2>
		</>
	);
};

const Part = (props) => {
	return (
		<>
			<p>
				{props.part.name} {props.part.exercises}
			</p>
		</>
	);
};

const Content = (props) => {
	const newArr = props.parts;
	return (
		<>
			{newArr.map((exercise) => {
				return <Part key={exercise.id} part={exercise} />;
			})}
		</>
	);
};

const Total = (props) => {
	const part = props.parts;

	const exerciseArr = part.map((item) => {
		return item.exercises;
	});

	const sum = exerciseArr.reduce((preVal, curVal) => {
		return preVal + curVal;
	}, 0);
	return (
		<>
			<p style={{ fontWeight: "bold" }}>total of {sum} exercises</p>
		</>
	);
};

const Course = (props) => {
	const courses = props.courses;
	return (
		<>
			{courses.map((course) => {
				return (
					<div key={course.id}>
						<Header name={course.name} />
						<Content parts={course.parts} />
						<Total parts={course.parts} />
					</div>
				);
			})}
		</>
	);
};

export default Course;
