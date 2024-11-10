import { useLoaderData } from "react-router-dom";
import Course from "./course.jsx";

const CourseList = ({courses}) => {

    return (
        <>
            <div className="row">
                {
                    courses?.length > 0 ? (
                        courses.map((course) => (
                            <div className="col-4" key={course.id}>
                                <Course {...course} />
                            </div>
                        ))
                    ) : (
                        <p>No courses available.</p>
                    )
                }
            </div>
        </>
    );
};

export default CourseList;